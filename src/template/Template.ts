import { Debug, TemplateError } from "../core/Debug";
import { EventSystem } from "../events";
import { _state } from "../core/State";
import { Performance } from "../utils/Performance";
import { InstanceManager, GroupManager } from "../instance";
import { extractLocalData } from "../forms";
import { updateDOM, AttributeMatcher } from "../dom";
import { loadFromLocalStorage, saveToLocalStorage, createDeepProxy, deepMerge } from "../storage";
import { compileTemplate } from "./TemplateCompiler";
import { PluginManager } from "../core/PluginManager";
import { ConfigManager } from "../core/ConfigManager";
import { FlowPlaterElement, FlowPlaterInstance } from "../types";

declare const htmx: any;

export function render({
  template,
  data,
  target,
  returnHtml = false,
  instanceName,
  animate = _state.defaults.animation,
  recompile = false,
  skipLocalStorageLoad = false,
  skipRender = false,
  isStoredDataRender = false,
}: {
  template: string;
  data: any;
  target: FlowPlaterElement | string;
  returnHtml?: boolean;
  instanceName?: string;
  animate?: boolean;
  recompile?: boolean;
  skipLocalStorageLoad?: boolean;
  skipRender?: boolean;
  isStoredDataRender?: boolean;
}) {
  Performance.start("render:" + (instanceName || "anonymous"));

  // Track initialization to prevent redundant initialization of the same instance
  if (!_state._initTracking) {
    _state._initTracking = {};
  }

  // Derive instance name early to use for tracking
  let derivedInstanceName;
  if (instanceName) {
    derivedInstanceName = instanceName;
  } else if (
    target instanceof Element &&
    AttributeMatcher._hasAttribute(target, "instance")
  ) {
    derivedInstanceName = AttributeMatcher._getRawAttribute(target, "instance");
  } else if (target instanceof Element && target.id) {
    derivedInstanceName = target.id;
  } else if (typeof target === "string" && target.startsWith("#")) {
    derivedInstanceName = target.substring(1);
  }

  // If this instance was recently initialized (within 100ms), skip
  // BUT ONLY if this is not an explicit render with stored data
  if (
    derivedInstanceName &&
    _state._initTracking[derivedInstanceName] &&
    !isStoredDataRender
  ) {
    const timeSinceLastInit =
      Date.now() - _state._initTracking[derivedInstanceName];
    if (timeSinceLastInit < 100) {
      // 100ms window to prevent duplicate initializations
      Debug.warn(
        `[Template] Skipping redundant initialization for ${derivedInstanceName}, last init was ${timeSinceLastInit}ms ago`,
      );
      // Still return the existing instance
      return _state.instances[derivedInstanceName] || null;
    }
  }

  // Update tracking timestamp
  if (derivedInstanceName) {
    _state._initTracking[derivedInstanceName] = Date.now();
  }

  EventSystem.publish("beforeRender", {
    instanceName,
    template,
    data,
    target,
    returnHtml,
    recompile,
  });

  /* -------------------------------------------------------------------------- */
  /*                                initial setup                               */
  /* -------------------------------------------------------------------------- */

  // Handle empty or "self" template
  if (!template || template === "self") {
    const targetElement = typeof target === "string" ? document.querySelector(target) : target;
    if (targetElement) {
      template = "#" + (targetElement as HTMLElement).id;
    }
  }

  // First check for target attributes
  let targetElements: FlowPlaterElement[] = [];
  if (target instanceof Element) {
    // Check for hx-target or fp-target attributes
    const targetSelector = AttributeMatcher._getRawAttribute(target, "target");
    if (targetSelector) {
      if (targetSelector === "this") {
        targetElements = [target as FlowPlaterElement];
      } else {
        targetElements = Array.from(document.querySelectorAll(targetSelector));
      }
    }
  }

  // If no target elements found from attributes, use the normal target handling
  if (targetElements.length === 0) {
    if (target instanceof NodeList) {
      targetElements = Array.from(target) as FlowPlaterElement[];
    } else if (typeof target === "string") {
      targetElements = Array.from(document.querySelectorAll(target));
    } else if (target instanceof Element) {
      targetElements = [target];
    }
  }

  if (targetElements.length === 0) {
    Debug.error("No target elements found");
    return;
  }

  // Get the instance name
  if (instanceName) {
    instanceName = instanceName;
  } else if (AttributeMatcher._hasAttribute(targetElements[0], "instance")) {
    instanceName = AttributeMatcher._getRawAttribute(
      targetElements[0],
      "instance",
    ) || undefined;
  } else if (targetElements[0].id) {
    instanceName = targetElements[0].id;
  } else {
    instanceName = _state.length.toString();
  }

  /* -------------------------------------------------------------------------- */
  /*                              Compile template                              */
  /* -------------------------------------------------------------------------- */

  var compiledTemplate = compileTemplate(template, recompile);
  _state.length++;

  if (!compiledTemplate) {
    Debug.error("Template not found: " + template);
    return;
  }

  if (targetElements.length === 0) {
    Debug.error("Target not found: " + target);
    return;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Proxy creation                               */
  /* -------------------------------------------------------------------------- */

  // Initialize finalInitialData outside the if block so it's available throughout the function
  let finalInitialData = data || {};
  let persistedData: any = null;
  let proxy: any = null; // Initialize proxy at function level

  // Check for local variable at instance level first
  const localVarName = AttributeMatcher._getRawAttribute(
    targetElements[0],
    "local",
  );
  let localData = null;
  if (localVarName) {
    // First check if it's a global variable
    localData = extractLocalData(localVarName);

    // If no global variable found, try as a selector
    if (!localData) {
      try {
        const selectorElement = document.querySelector(localVarName);
        if (selectorElement) {
          // Check if the element or its children have fp-data
          const hasDataElement = AttributeMatcher.findMatchingElements(
            "data",
            null,
            false,
            selectorElement as FlowPlaterElement,
          );

          if (hasDataElement) {
            const dataExtractor = PluginManager.getPlugin("data-extractor");
            if (dataExtractor) {
              localData =
                dataExtractor.instanceMethods?.extractData?.(selectorElement as unknown as FlowPlaterInstance);
            }
          }
        }
      } catch (e) {
        Debug.warn(`[Template] Invalid selector for fp-local: ${localVarName}`);
      }
    }

    if (localData) {
      finalInitialData = { ...finalInitialData, ...localData };
    }

    // Check if we should observe this local data
    if (AttributeMatcher._hasAttribute(targetElements[0], "local-observe")) {
      // Find all data elements within the instance
      const dataElements = AttributeMatcher.findMatchingElements("data");

      // Delegate observation to the DataExtractorPlugin
      (dataElements as HTMLElement[])?.forEach((element: FlowPlaterElement) => {
        PluginManager.getPlugin(
          "data-extractor",
        )?.instanceMethods?.observeDataElement?.(element as any, localVarName, instanceName ? _state.instances[instanceName] as FlowPlaterInstance : undefined);
      });
    }
  }

  if (!instanceName || !_state.instances[instanceName] || !_state.instances[instanceName].data) {
    // Load persisted data if available and not skipped
    if (!skipLocalStorageLoad && ConfigManager.getConfig().storage?.enabled) {
      persistedData = loadFromLocalStorage(instanceName || "", "instance");
      if (persistedData) {
        // Check if stored data is HTML
        if (
          persistedData.isHtml === true ||
          (typeof persistedData === "string" &&
            typeof persistedData.trim === "function" &&
            (persistedData.trim().startsWith("<!DOCTYPE html") ||
              persistedData.trim().startsWith("<html")))
        ) {
          // Get swap specification from element
          const swapStyle = AttributeMatcher._getRawAttribute(
            targetElements[0],
            "swap",
            "innerHTML",
          );
          const swapSpec = {
            swapStyle: swapStyle || "innerHTML",
            swapDelay: 0,
            settleDelay: 0,
            transition: swapStyle?.includes("transition:true") || false,
          };

          // Use htmx.swap with proper swap specification
          if (returnHtml) {
            return persistedData; // HTML string is now stored directly
          }
          targetElements.forEach((element) => {
            htmx.swap(element, persistedData, swapSpec);
          });
          return instanceName ? _state.instances[instanceName] : undefined;
        }
        // Extract actual data - if persistedData has a 'data' property, use that
        const actualData = persistedData?.data || persistedData;
        finalInitialData = { ...actualData, ...finalInitialData };
        Debug.debug(
          `[Template] Merged persisted data for ${instanceName}:`,
          finalInitialData,
        );
      }
    }

    // Find the template element (must have fp-template attribute)
    const templateElement = targetElements.find((el) =>
      AttributeMatcher._hasAttribute(el, "template"),
    );
    if (!templateElement) {
      Debug.error("No template element found in target elements");
      return null;
    }

    // 1. Get or create the instance shell using the template element
    const instance = InstanceManager.getOrCreateInstance(
      templateElement,
      finalInitialData,
    );

    // If instance couldn't be created, exit
    if (!instance) {
      Debug.error("Failed to get or create instance: " + instanceName);
      return null;
    }

    // Store local variable name if present
    if (localVarName) {
      instance.localVarName = localVarName;
    }

    // --- Debounce and Change Tracking Setup ---
    // Store the timer ID on the instance
    if (!instance._updateTimer) {
      instance._updateTimer = null;
    }
    // Store the 'state before changes' within the current debounce cycle
    if (!instance._stateBeforeDebounce) {
      instance._stateBeforeDebounce = null;
    }
    // --- End Setup ---

    // Check if this instance is part of a group
    const groupName = AttributeMatcher._getRawAttribute(
      templateElement,
      "group",
    );

    if (groupName) {
      // Check for persisted group data
      let groupData = finalInitialData; // Start with the current data

      if (!skipLocalStorageLoad && ConfigManager.getConfig().storage?.enabled) {
        const persistedGroupData = loadFromLocalStorage(groupName, "group");
        if (persistedGroupData) {
          // Merge persisted group data with any instance-specific data
          groupData = deepMerge(persistedGroupData, finalInitialData);
          Debug.debug(
            `Loaded persisted data for group ${groupName}`,
            groupData,
          );
        }
      }

      // Get or create the group and add this instance
      const group = GroupManager.getOrCreateGroup(groupName, groupData);

      // Use the group's proxy for this instance
      proxy = group.data;

      // Add instance to the group
      GroupManager.addInstanceToGroup(instance, groupName);

      Debug.info(`Instance ${instanceName} is using group ${groupName} data`);
    } else {
      // 2. Create the proxy with the final merged data and DEBOUNCED update handler
      const DEBOUNCE_DELAY = 0;

      proxy = createDeepProxy(finalInitialData, () => {
        if (instance) {
          // Skip if we're currently evaluating a template
          if (instance._isEvaluating) {
            return;
          }

          // Clear existing timer
          if (instance._updateTimer) {
            clearTimeout(instance._updateTimer);
          }

          // Schedule the update
          instance._updateTimer = setTimeout(() => {
            try {
              // Set flag to prevent recursive updates during evaluation
              instance._isEvaluating = true;

              // Get the current rendered output
              const transformedData = PluginManager.applyTransformations(
                instance,
                instance.getData(),
                "transformDataBeforeRender",
                "json",
              );

              const newRenderedOutput = instance.template(transformedData);

              // Compare with previous render
              if (instance._lastRenderedOutput !== newRenderedOutput) {
                Debug.info(
                  `[Debounced Update] Output changed for ${instanceName}. Firing updateData hook.`,
                );

                // Execute hooks with current state
                PluginManager.executeHook("updateData", instance, {
                  newData: proxy,
                  source: "proxy",
                });
                EventSystem.publish("updateData", {
                  instanceName,
                  newData: proxy,
                  source: "proxy",
                });

                // Update DOM since output changed
                Debug.debug(
                  `[Debounced Update] Triggering _updateDOM for ${instanceName}`,
                );
                instance._updateDOM();

                // Save the new rendered output
                instance._lastRenderedOutput = newRenderedOutput;

                // Save to storage if enabled
                if (ConfigManager.getConfig().storage?.enabled) {
                  const storageId = instance.instanceName.replace("#", "");
                  Debug.debug(
                    `[Debounced Update] Saving data for ${storageId}`,
                  );
                  saveToLocalStorage(storageId, proxy, "instance");
                }
              } else {
                Debug.debug(
                  `[Debounced Update] No output change for ${instanceName}. Skipping update.`,
                );
              }
            } finally {
              // Always clear the evaluation flag
              instance._isEvaluating = false;
              // Clear timer
              instance._updateTimer = null;
            }
          }, DEBOUNCE_DELAY);
        }
      });
    }

    // 3. Assign the proxy and template to the instance
    instance.template = compiledTemplate;
    instance.templateId =
      AttributeMatcher._getRawAttribute(templateElement, "template") ||
      template;
    instance.data = proxy; // Assign the proxy!

    // 4. Trigger initial render - This should be OUTSIDE the debounce logic
    Debug.debug(
      `[Initial Render] ${
        skipRender ? "Skipping" : "Triggering"
      } _updateDOM for ${instanceName}`,
    );

    // Only call _updateDOM if not skipRender
    if (!skipRender) {
      instance._updateDOM();
    }

    // Optional: Initial save if needed, OUTSIDE debounce
    if (
      ConfigManager.getConfig().storage?.enabled &&
      !persistedData &&
      !instance.groupName
    ) {
      // Only save if not loaded and not in a group (groups handle their own saving)
      const storageId = instanceName?.replace("#", "") || "";
      Debug.debug(`[Initial Save] Saving initial data for ${storageId}`);
      saveToLocalStorage(
        storageId,
        finalInitialData, // Save the data directly, not wrapped in an object
        "instance",
      ); // Save the raw initial merged data
    }
  } else {
    // If the instance already exists, get its proxy
    proxy = _state.instances[instanceName].data;
  }

  // Return the instance from the state (might be the one just created or an existing one)
  const finalInstance = instanceName ? _state.instances[instanceName] : undefined;
  if (finalInstance) {
    Debug.info("Final instance data: ", finalInstance.data);
  }

  /* -------------------------------------------------------------------------- */
  /*                               Render template                              */
  /* -------------------------------------------------------------------------- */

  // Only create/setup instance if proxy is defined
  if (proxy) {
    // Find the template element (must have fp-template attribute)
    const templateElement = targetElements.find((el) =>
      AttributeMatcher._hasAttribute(el, "template"),
    );
    if (!templateElement) {
      Debug.error("No template element found in target elements");
      return null;
    }

    // Create/get instance and set up proxy regardless of skipRender
    const instance = InstanceManager.getOrCreateInstance(
      templateElement,
      finalInitialData,
    );

    if (!instance) {
      Debug.error("Failed to get or create instance: " + instanceName);
      return null;
    }

    // Set up the instance but don't render automatically
    instance.template = compiledTemplate; // Always store the template
    instance.templateId =
      AttributeMatcher._getRawAttribute(templateElement, "template") ||
      template;
    instance.data = proxy;

    // At this point do NOT call instance._updateDOM() to avoid automatic rendering

    // Only perform actual rendering if explicitly requested
    if (!skipRender) {
      Debug.debug(`[Render Template] Executing render for ${instanceName}`);

      try {
        if (returnHtml) {
          // Apply plugin transformations to the data before rendering
          const transformedData = PluginManager.applyTransformations(
            instance,
            instance.getData(),
            "transformDataBeforeRender",
            "json",
          );
          return compiledTemplate(transformedData);
        }

        // Update all elements in the instance
        Array.from(instance.elements).forEach((element) => {
          // Apply plugin transformations to the data before rendering
          const transformedData = PluginManager.applyTransformations(
            instance,
            instance.getData(),
            "transformDataBeforeRender",
            "json",
          );
          updateDOM(
            element as HTMLElement,
            compiledTemplate(transformedData),
            animate,
            instance,
          );
        });
      } catch (error: any) {
        if (!(error instanceof TemplateError)) {
          Debug.error(`Failed to render template: ${error.message}`);
        }
        throw error;
      }
    } else {
      Debug.debug(
        `[Render Template] Skipping render for ${instanceName} as requested`,
      );
    }
  } else if (!skipRender) {
    // Log a debug message that we're skipping render due to no data
    Debug.debug(
      `[Template] Skipping render for ${instanceName} because no data is available yet.`,
    );
  }

  return finalInstance || null;
}
