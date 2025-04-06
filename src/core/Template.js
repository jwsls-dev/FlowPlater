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

    // 1. Get or create the instance shell
    const instance = InstanceManager.getOrCreateInstance(
      elements[0],
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

    // 2. Create the proxy with the final merged data and DEBOUNCED update handler
    const DEBOUNCE_DELAY = 50; // ms - slightly longer to avoid duplicate updates
    proxy = createDeepProxy(finalInitialData, (target) => {
      if (instance) {
        // -- Debounce Logic --
        // Capture state *before* the first change in this debounce cycle
        // This is crucial for comparing changes accurately after the debounce.
        if (instance._updateTimer === null) {
          // Only capture if no timer is currently set
          try {
            // Use a deep clone to prevent the captured state from being mutated
            // before the setTimeout callback runs.
            instance._stateBeforeDebounce = JSON.parse(JSON.stringify(proxy));
            Debug.debug(
              `[Debounce Start] Captured pre-debounce state for ${instanceName}:`,
              instance._stateBeforeDebounce, // Log the actual captured object
            );
          } catch (e) {
            Debug.error(
              `[Debounce Start] Failed to capture pre-debounce state for ${instanceName}:`,
              e,
            );
            // If cloning fails, set to null to potentially prevent errors in trackChanges
            // though trackChanges might still fail if it receives null.
            instance._stateBeforeDebounce = null;
          }
        }

        // Clear existing timer
        clearTimeout(instance._updateTimer);

        // Schedule the update
        instance._updateTimer = setTimeout(() => {
          // ** USE STATE CAPTURED BEFORE DEBOUNCE **
          const stateBefore = instance._stateBeforeDebounce;
          const stateAfter = proxy;

          const jsonStateBefore = JSON.parse(JSON.stringify(stateBefore));
          const jsonStateAfter = JSON.parse(JSON.stringify(stateAfter));

          // 1. Basic Change Check (Optional but Recommended)
          // Avoid firing hooks if state hasn't actually changed.
          // Using simple stringify comparison - replace with deepEqual if needed & imported.
          const stateChanged =
            JSON.stringify(jsonStateBefore) !== JSON.stringify(jsonStateAfter);

          // 2. Execute Hooks/Events with Full States
          if (stateChanged) {
            Debug.info(
              `[Debounced Update] State changed for ${instanceName}. Firing updateData hook.`,
            );
            // Pass the full old and new states
            PluginManager.executeHook("updateData", instance, {
              newData: jsonStateAfter, // Current state
              oldData: jsonStateBefore, // State before changes
              source: "proxy",
            });
            EventSystem.publish("updateData", {
              instanceName,
              newData: jsonStateAfter,
              oldData: jsonStateBefore,
              source: "proxy",
            });
          } else {
            Debug.debug(
              `[Debounced Update] No state change detected for ${instanceName}. Skipping updateData hook.`,
            );
          }

          // 3. Update DOM
          Debug.debug(
            `[Debounced Update] Triggering _updateDOM for ${instanceName}`,
          );

          instance._updateDOM();

          // 4. Save to storage
          // Get the correct instance name and sanitize it for the key
          const storageId = instance.instanceName.replace("#", "");
          Debug.debug(
            `[Debounced Update] Saving root proxy object for ${storageId}.`,
          );
          if (_state.config?.storage?.enabled) {
            saveToLocalStorage(
              storageId,
              stateAfter, // Save the data directly, not wrapped in an object
              "instance",
            );
          }

          // Clear timer and pre-debounce state reference after execution
          instance._updateTimer = null;
          instance._stateBeforeDebounce = null;
        }, DEBOUNCE_DELAY);
        // -- End Debounce Logic --
      }
    });

    // 3. Assign the proxy and template to the instance
    instance.elements = new Set(elements);
    instance.template = compiledTemplate;
    instance.templateId = elements[0].getAttribute("fp-template") || template;
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
    if (_state.config?.storage?.enabled && !persistedData) {
      // Only save if not loaded
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
    // Create/get instance and set up proxy regardless of skipRender
    const instance = InstanceManager.getOrCreateInstance(
      elements[0],
      finalInitialData,
    );

    // Set up the instance but don't render automatically
    instance.elements = new Set(elements);
    instance.template = compiledTemplate; // Always store the template
    instance.templateId = elements[0].getAttribute("fp-template") || template;
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

        elements.forEach((element) => {
          // Apply plugin transformations to the data before rendering
          const transformedData = PluginManager.applyTransformations(
            finalInstance,
            finalInstance.data,
            "transformDataBeforeRender",
            "json",
          );
          updateDOM(
            element,
            compiledTemplate(transformedData),
            animate,
            finalInstance,
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
