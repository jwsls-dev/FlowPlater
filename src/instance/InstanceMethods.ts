import { _state } from "../core/State";
import { Debug } from "../core/Debug";
import { EventSystem } from "../events/EventSystem";
import { compileTemplate } from "../template/TemplateCompiler";
import { updateDOM } from "../dom/UpdateDom";
import { domBatcher } from "../dom/DomBatcher";
import { saveToLocalStorage } from "../storage/LocalStorage";
import { deepMerge } from "../storage/DataTransformers";
import { Performance } from "../utils/Performance";
import { extractLocalData } from "../forms/LocalVariableExtractor";
import { PluginManager } from "../core/PluginManager";
import { ConfigManager } from "../core/ConfigManager";

import { FlowPlaterInstance } from "../types";

export function instanceMethods(instanceName: string): Partial<FlowPlaterInstance> {
  // Helper function to resolve a path within the data
  function _resolvePath(path: string): any {
    const instance = _state.instances[instanceName];
    if (!instance) {
      Debug.error("Instance not found: " + instanceName);
      return undefined;
    }

    const pathParts = path.split(/[\.\[\]'"]/);
    let current = instance.data;
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (part === "") continue;
      if (
        current === undefined ||
        current === null ||
        !current.hasOwnProperty(part)
      ) {
        return undefined;
      }
      current = current[part];
    }
    return current;
  }

  function _validateData(data: any) {
    if (typeof data === "string" && data.trim().startsWith("<!DOCTYPE")) {
      Debug.debug("Data is HTML, skipping validation", instanceName);
      return { valid: true, isHtml: true };
    }

    if (
      (typeof data === "object" && data !== null) ||
      Array.isArray(data) ||
      typeof data === "number" ||
      typeof data === "boolean"
    ) {
      return { valid: true, isHtml: false };
    }

    Debug.error("Invalid data type: " + typeof data);
    return { valid: false, isHtml: false };
  }

  return {
    instanceName,
    animate: _state.defaults.animation,

    _updateDOM: async function () {
      const instance = _state.instances[instanceName];
      if (!instance) {
        Debug.error("Instance not found: " + instanceName);
        return;
      }

      try {
        // Prevent re-entrancy during evaluation
        if (instance._isEvaluating) {
          Debug.debug("_updateDOM skipped during evaluation", instance.instanceName);
          // Ensure we mark there is pending work to process right after
          (instance as any)._hasPendingUpdate = true;
          return;
        }
        instance._isEvaluating = true;
        // Clear pending flag at start; new writes during eval will set it again
        (instance as any)._hasPendingUpdate = false;

        let rendered;
        if (instance.templateId === "self" || instance.templateId === null) {
          // For "self" template, use the first element as the template
          const templateElement = Array.from(instance.elements)[0];
          if (!templateElement) {
            Debug.error(
              "No template element found for self template",
              instance.instanceName,
            );
            return;
          }
          rendered = templateElement.innerHTML;
        } else if (!instance.template) {
          Debug.error("No template found for instance", instance.instanceName);
          return;
        } else {
          // Check if data is valid
          const { valid, isHtml } = _validateData(instance.data);

          if (!valid) {
            Debug.error(
              "Invalid data type for instance",
              instance.instanceName,
            );
            return;
          }

          if (isHtml) {
            Debug.debug("Data is HTML, using as is", instance.instanceName);
            rendered = instance.data;
          } else {
            // Apply plugin transformations to the data before rendering
            Debug.debug("Before transformation - instance data:", {
              instanceName: instance.instanceName,
              rawData: instance.data,
              getData: instance.getData(),
            });

            const transformedData = PluginManager.applyTransformations(
              instance,
              instance.getData(),
              "transformDataBeforeRender",
              "json",
            );

            Debug.debug("After transformation - transformed data:", {
              instanceName: instance.instanceName,
              transformedData,
              isNull: transformedData === null,
              isUndefined: transformedData === undefined,
              type: typeof transformedData,
            });

            // Use transformed data for reactive rendering
            rendered = instance.template(transformedData);
            
            Debug.debug(
              `[InstanceMethods] Template rendered result`,
              {
                instanceName: instance.instanceName,
                template: instance.templateId,
                renderedLength: rendered ? rendered.length : 0,
                renderedPreview: rendered ? rendered.substring(0, 200) + '...' : 'null/undefined',
                hasContent: rendered && rendered.trim().length > 0
              }
            );
          }
        }

        // Change detection: skip DOM work if output hasn't changed
        if (rendered === instance._lastRenderedOutput) {
          Debug.debug(`[InstanceMethods] No output change for ${instance.instanceName}. Skipping DOM update.`);
          return;
        }

        // Filter out elements that are no longer in the DOM
        const activeElements = Array.from(instance.elements).filter((el) =>
          document.body.contains(el),
        );

        if (activeElements.length === 0) {
          Debug.error(
            "No active elements found for instance",
            instance.instanceName,
          );
          return;
        }

        // Before DOM update, for non-grouped instances emit hooks and events
        if (!instance.groupName) {
          try {
            PluginManager.executeHook("updateData", instance, {
              newData: instance.data,
              source: "proxy",
            });
            EventSystem.publish("updateData", {
              instanceName: instance.instanceName,
              newData: instance.data,
              source: "proxy",
            });
          } catch (e) {
            Debug.error("Error executing updateData hooks/events", e);
          }
        }

        // Batch DOM updates to reduce layout thrashing
        const updatePromises = activeElements.map((element) =>
          domBatcher.write(
            () => updateDOM(element, rendered, instance.animate, instance),
            `update-${instance.instanceName}-${Date.now()}`
          )
        );

        // Wait for all batched element updates to complete
        const results = await Promise.all(updatePromises);

        // Persist last rendered output and optionally save to storage (for non-grouped instances)
        instance._lastRenderedOutput = rendered;
        if (!instance.groupName && ConfigManager.getConfig().storage?.enabled) {
          const storageId = instance.instanceName.replace("#", "");
          saveToLocalStorage(storageId, instance.data, "instance");
        }

        return results;
      } catch (error) {
        Debug.error(
          "Error updating DOM for instance",
          instance.instanceName,
          error,
        );
      } finally {
        // Clear evaluation flag
        instance._isEvaluating = false;
        // If updates occurred during evaluation, schedule another pass
        if ((instance as any)._hasPendingUpdate) {
          Debug.debug("Pending updates detected post-eval, scheduling another _updateDOM", instance.instanceName);
          (instance as any)._hasPendingUpdate = false;
          if (instance._updateTimer) clearTimeout(instance._updateTimer);
          // Reuse debounce delay semantics by invoking the debounced path via timer 0
          instance._updateTimer = setTimeout(() => {
            instance._updateDOM();
            instance._updateTimer = null;
          }, 0);
        }
      }
    },

    /**
     * Replaces the entire instance data with newData,
     * removing keys not present in newData.
     * Triggers reactive updates via the proxy.
     * @param {Object} newData The new data object.
     */
    setData: function (newData) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        Debug.error("Instance not found: " + instanceName);
        return this;
      }

      // If newData is an unnamed root object (no data property), wrap it
      if (
        typeof newData === "string" ||
        typeof newData === "number" ||
        Array.isArray(newData)
      ) {
        Debug.warn(
          `[setData] Received raw value or unnamed root object, automatically wrapping in 'data' property`,
        );
        newData = { data: newData };
      }

      // Validate newData type (allow empty objects)
      if (
        typeof newData !== "object" ||
        newData === null ||
        Array.isArray(newData)
      ) {
        Debug.error(
          "Invalid newData type provided to setData: " + typeof newData,
        );
        return this;
      }

      const currentData = instance.data; // The proxy's target

      Debug.debug(
        `[setData] Replacing data for ${instanceName}. Current keys: ${Object.keys(
          currentData,
        ).join(", ")}, New keys: ${Object.keys(newData).join(", ")}`,
      );

      // Delete keys not present in newData
      let deletedKeys = [];
      for (const key in currentData) {
        if (
          Object.hasOwnProperty.call(currentData, key) &&
          !Object.hasOwnProperty.call(newData, key)
        ) {
          deletedKeys.push(key);
          delete currentData[key]; // Triggers proxy delete trap
        }
      }
      if (deletedKeys.length > 0) {
        Debug.debug(
          `[setData] Deleted stale keys for ${instanceName}: ${deletedKeys.join(
            ", ",
          )}`,
        );
      }

      // Update with new data - use deepMerge for proper handling of nested objects
      deepMerge(currentData, newData);

      Debug.debug(`[setData] Data replacement complete for ${instanceName}.`);

      return this;
    },

    remove: function () {
      const instance = _state.instances[instanceName];
      if (!instance) {
        throw new Error("Instance not found: " + instanceName);
      }

      EventSystem.publish("beforeRemove", {
        instanceName,
        elements: instance.elements,
      });

      try {
        // Remove from localStorage if storage is enabled
        if (ConfigManager.getConfig().storage?.enabled) {
          localStorage.removeItem(`fp_${instanceName}`);
        }

        // Clear elements and remove from DOM
        instance.elements.forEach(function (element) {
          try {
            element.innerHTML = "";
          } catch (error) {
            Debug.error("Error removing instance: " + (error as Error).message);
          }
        });

        // Clear the elements array
        instance.elements = [];

        // Remove from state
        delete _state.instances[instanceName];
        delete _state.templateCache[instance.templateId];

        EventSystem.publish("afterRemove", {
          instanceName,
          elements: [],
        });

        Debug.info("Removed instance: " + instanceName);
        return true;
      } catch (error) {
        throw error;
      }
    },

    refresh: async function (
      options = { remote: true, recompile: false, ignoreLocalData: false },
    ) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        Debug.error("Instance not found: " + instanceName);
        return Promise.reject(new Error("Instance not found: " + instanceName));
      }

      // Apply transformations before checking template
      const transformedData = PluginManager.applyTransformations(
        instance,
        instance.data,
        "transformDataBeforeRender",
        "json",
      );

      // If recompile is true, recompile the template
      const compiledTemplate = instance.template(transformedData);
      const shouldRecompile =
        options.recompile || (!compiledTemplate && instance.data);

      if (shouldRecompile) {
        instance.template = compileTemplate(instance.templateId, true);
      }

      Debug.debug("Refresh - Template check:", {
        templateId: instance.templateId,
        templateElement: document.querySelector(instance.templateId),
        compiledTemplate: instance.template(transformedData),
      });

      // Check for local variable at instance level first
      let hasLocalVarUpdate = false;
      if (instance.localVarName && !options.ignoreLocalData) {
        const localData = extractLocalData(instance.localVarName);
        if (localData) {
          deepMerge(instance.data, localData);
          hasLocalVarUpdate = true;
          Debug.debug(
            `Refreshed data from local variable "${instance.localVarName}"`,
          );
        }
      }

      const promises: Promise<any>[] = [];

      instance.elements.forEach(async function (element) {
        try {
          if (options.remote && !hasLocalVarUpdate) {
            const htmxMethods = ["get", "post", "put", "patch", "delete"];
            const hasHtmxMethod = htmxMethods.some((method) =>
              element.getAttribute(`hx-${method}`),
            );

            if (hasHtmxMethod) {
              const method = htmxMethods.find((method) =>
                element.getAttribute(`hx-${method}`),
              );
              const url = element.getAttribute(`hx-${method}`);
              const promise = fetch(url as string, { method: method?.toUpperCase() as string })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json();
                })
                .then((data) => {
                  // Update data which will trigger render - use deepMerge instead of Object.assign
                  deepMerge(instance.data, data);

                  // Store data if storage is enabled
                  if (ConfigManager.getConfig().storage?.enabled) {
                    saveToLocalStorage(instanceName, instance.data, "instance");
                  }

                  return data;
                });
              promises.push(promise);
            }
          } else {
            Debug.debug(
              "Instance.refresh - Using _updateDOM for proper data flow",
              { instanceName, elementId: element.id || 'no-id' }
            );

            // Use the instance's _updateDOM method for proper data transformation pipeline
            promises.push(instance._updateDOM());
          }
        } catch (error) {
          element.innerHTML = `<div class="fp-error">Error refreshing template: ${(error as Error).message}</div>`;
          Debug.error(`Failed to refresh template: ${(error as Error).message}`);
          promises.push(Promise.reject(error));
        }
      });

      return Promise.all(promises);
    },

    getData: function () {
      const proxy = _state.instances[instanceName].data;
      try {
        // Prefer structuredClone when available for performance and correctness
        // @ts-ignore - structuredClone is available in modern browsers
        if (typeof structuredClone === 'function') {
          // Avoid cloning proxies directly by reading through JSON if necessary
          return structuredClone(proxy);
        }
      } catch (_) {
        // Fallback below
      }
      // Fallback: JSON deep clone
      return JSON.parse(JSON.stringify(proxy));
    },

    getElements: function () {
      return _state.instances[instanceName].elements;
    },

    getTemplateElement: function () {
      return _state.instances[instanceName].templateElement;
    },

    get: function (path: string) {
      return !path ? this.getData?.() : _resolvePath.call(this, path);
    },

    refreshTemplate: function (templateId: string, recompile = false): boolean {
      Performance.start("refreshTemplate:" + templateId);
      const compiledTemplate = compileTemplate(templateId, recompile);
      if (!compiledTemplate) {
        Debug.error("Failed to compile template: " + templateId);
        Performance.end("refreshTemplate:" + templateId);
        return false;
      }
      return true;
    },
  };
}

export default instanceMethods;
