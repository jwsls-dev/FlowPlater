import { Debug, TemplateError } from "./Debug";
import { EventSystem } from "./EventSystem";
import { _state } from "./State";
import { Performance } from "../utils/Performance";
import { InstanceManager } from "./InstanceManager";
import { extractLocalData } from "../utils/LocalVariableExtractor";

import { updateDOM } from "../utils/UpdateDom";
import { loadFromLocalStorage } from "../utils/LocalStorage";
import { saveToLocalStorage } from "../utils/LocalStorage";
import { compileTemplate, memoizedCompile } from "./TemplateCompiler";
import { createDeepProxy } from "../utils/CreateDeepProxy";
import PluginManager from "./PluginManager";
import { GroupManager } from "./GroupManager";
import { deepMerge } from "../utils/DeepMerge";

export { compileTemplate, memoizedCompile };

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
  } else if (target instanceof Element && target.hasAttribute("fp-instance")) {
    derivedInstanceName = target.getAttribute("fp-instance");
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
    const targetElement =
      typeof target === "string" ? document.querySelector(target) : target;
    template = "#" + targetElement.id;
  }

  // Normalize target to array
  let elements = [];
  if (target instanceof NodeList) {
    elements = Array.from(target);
  } else if (typeof target === "string") {
    elements = Array.from(document.querySelectorAll(target));
  } else if (target instanceof Element) {
    elements = [target];
  }

  if (elements.length === 0) {
    Debug.error("No target elements found");
    return;
  }

  if (elements.length === undefined) {
    elements = [elements];
  }

  // Get the instance name
  if (instanceName) {
    instanceName = instanceName;
  } else if (elements[0].hasAttribute("fp-instance")) {
    instanceName = elements[0].getAttribute("fp-instance");
  } else if (elements[0].id) {
    instanceName = elements[0].id;
  } else {
    instanceName = _state.length;
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

  if (elements.length === 0) {
    Debug.error("Target not found: " + target);
    return;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Proxy creation                               */
  /* -------------------------------------------------------------------------- */

  // Initialize finalInitialData outside the if block so it's available throughout the function
  let finalInitialData = data || {};
  let persistedData = null;
  let proxy = null; // Initialize proxy at function level

  // Check for local variable at instance level first
  const localVarName = elements[0].getAttribute("fp-local");
  let localData = null;
  if (localVarName) {
    localData = extractLocalData(localVarName);
    if (localData) {
      finalInitialData = { ...finalInitialData, ...localData };
    }
  }

  if (!_state.instances[instanceName] || !_state.instances[instanceName].data) {
    // Load persisted data if available and not skipped
    if (!skipLocalStorageLoad && _state.config?.storage?.enabled) {
      persistedData = loadFromLocalStorage(instanceName, "instance");
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
          const swapSpec = {
            swapStyle:
              elements[0].getAttribute("hx-swap")?.split(" ")[0] || "innerHTML",
            swapDelay: 0,
            settleDelay: 0,
            transition:
              elements[0]
                .getAttribute("hx-swap")
                ?.includes("transition:true") || false,
          };

          // Use htmx.swap with proper swap specification
          if (returnHtml) {
            return persistedData; // HTML string is now stored directly
          }
          elements.forEach((element) => {
            htmx.swap(element, persistedData, swapSpec);
          });
          return _state.instances[instanceName];
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
    const templateElement = elements.find((el) =>
      el.hasAttribute("fp-template"),
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

    // Store local variable name if present
    if (localVarName) {
      instance.localVarName = localVarName;
    }

    // If instance couldn't be created, exit
    if (!instance) {
      Debug.error("Failed to get or create instance: " + instanceName);
      return null;
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
    const groupName = templateElement.getAttribute("fp-group");

    if (groupName) {
      // Check for persisted group data
      let groupData = finalInitialData; // Start with the current data

      if (!skipLocalStorageLoad && _state.config?.storage?.enabled) {
        const persistedGroupData = loadFromLocalStorage(
          `group_${groupName}`,
          "group",
        );
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

      proxy = createDeepProxy(finalInitialData, (target) => {
        if (instance) {
          // Skip if we're currently evaluating a template
          if (instance._isEvaluating) {
            return;
          }

          // Clear existing timer
          clearTimeout(instance._updateTimer);

          // Schedule the update
          instance._updateTimer = setTimeout(() => {
            try {
              // Set flag to prevent recursive updates during evaluation
              instance._isEvaluating = true;

              // Get the current rendered output
              const transformedData = PluginManager.applyTransformations(
                instance,
                proxy,
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
                if (_state.config?.storage?.enabled) {
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
      templateElement.getAttribute("fp-template") || template;
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
      _state.config?.storage?.enabled &&
      !persistedData &&
      !instance.groupName
    ) {
      // Only save if not loaded and not in a group (groups handle their own saving)
      const storageId = instanceName.replace("#", "");
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
  const finalInstance = _state.instances[instanceName];
  Debug.info("Final instance data: ", finalInstance.data);

  /* -------------------------------------------------------------------------- */
  /*                               Render template                              */
  /* -------------------------------------------------------------------------- */

  // Only create/setup instance if proxy is defined
  if (proxy) {
    // Find the template element (must have fp-template attribute)
    const templateElement = elements.find((el) =>
      el.hasAttribute("fp-template"),
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

    // Set up the instance but don't render automatically
    instance.template = compiledTemplate; // Always store the template
    instance.templateId =
      templateElement.getAttribute("fp-template") || template;
    instance.data = proxy;

    // At this point do NOT call instance._updateDOM() to avoid automatic rendering

    // Only perform actual rendering if explicitly requested
    if (!skipRender) {
      Debug.debug(`[Render Template] Executing render for ${instanceName}`);

      try {
        if (returnHtml) {
          // Apply plugin transformations to the data before rendering
          const transformedData = PluginManager.applyTransformations(
            finalInstance,
            finalInstance.data,
            "transformDataBeforeRender",
            "json",
          );
          return compiledTemplate(transformedData);
        }

        // Update all elements in the instance
        Array.from(instance.elements).forEach((element) => {
          // Apply plugin transformations to the data before rendering
          const transformedData = PluginManager.applyTransformations(
            finalInstance,
            finalInstance.data,
            "transformDataBeforeRender",
            "json",
          );
          const forceFullUpdate = element.hasAttribute("fp-force-full-update");
          updateDOM(
            element,
            compiledTemplate(transformedData),
            animate,
            finalInstance,
            forceFullUpdate,
          );
        });
      } catch (error) {
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
