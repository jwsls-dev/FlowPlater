import { _state } from "./State";
import { Debug, log, errorLog } from "./Debug";
import { EventSystem } from "./EventSystem";
import { compileTemplate, memoizedCompile } from "./TemplateCompiler";
import { updateDOM } from "../utils/UpdateDom";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/LocalStorage";
import { Performance } from "../utils/Performance";
import { extractLocalData } from "../utils/LocalVariableExtractor";
import PluginManager from "./PluginManager";

export function instanceMethods(instanceName) {
  // Helper function to resolve a path within the data
  function _resolvePath(path) {
    const instance = _state.instances[instanceName];
    if (!instance) {
      errorLog("Instance not found: " + instanceName);
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

  function _validateData(data) {
    if (typeof data === "string" && data.trim().startsWith("<!DOCTYPE")) {
      Debug.log(
        Debug.levels.DEBUG,
        "Data is HTML, skipping validation",
        instanceName,
      );
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

    errorLog("Invalid data type: " + typeof data);
    return { valid: false, isHtml: false };
  }

  return {
    instanceName,
    animate: _state.defaults.animation,

    _updateDOM: function () {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog("Instance not found: " + instanceName);
        return;
      }

      // Check if data is valid
      const { valid, isHtml } = _validateData(instance.data);
      if (!valid || isHtml) {
        return;
      }

      try {
        let rendered;
        if (instance.templateId === "self" || instance.templateId === null) {
          // For "self" template, use the first element as the template
          const templateElement = Array.from(instance.elements)[0];
          if (!templateElement) {
            Debug.log(
              Debug.levels.ERROR,
              "No template element found for self template",
              instance.instanceName,
            );
            return;
          }
          rendered = templateElement.innerHTML;
        } else if (!instance.template) {
          Debug.log(
            Debug.levels.ERROR,
            "No template found for instance",
            instance.instanceName,
          );
          return;
        } else {
          // Apply plugin transformations to the data before rendering
          const transformedData = PluginManager.applyTransformations(
            instance,
            instance.data,
            "transformDataBeforeRender",
            "json",
          );

          // Use transformed data for reactive rendering
          rendered = instance.template(transformedData);
          Debug.log(Debug.levels.DEBUG, "Rendered template with data:", {
            template: instance.templateId,
            data: transformedData,
            rendered: rendered,
          });
        }

        // Filter out elements that are no longer in the DOM
        const activeElements = Array.from(instance.elements).filter((el) =>
          document.body.contains(el),
        );

        if (activeElements.length === 0) {
          Debug.log(
            Debug.levels.ERROR,
            "No active elements found for instance",
            instance.instanceName,
          );
          return;
        }

        activeElements.forEach((element) => {
          updateDOM(element, rendered, instance.animate, instance);
        });
      } catch (error) {
        Debug.log(
          Debug.levels.ERROR,
          "Error updating DOM for instance",
          instance.instanceName,
          error,
        );
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
        errorLog("Instance not found: " + instanceName);
        return this;
      }

      // If newData is an unnamed root object (no data property), wrap it
      if (!("data" in newData)) {
        Debug.log(
          Debug.levels.WARN,
          `[setData] Received unnamed root object, automatically wrapping in 'data' property`,
        );
        newData = { data: newData };
      }

      // Validate newData type (allow empty objects)
      if (
        typeof newData !== "object" ||
        newData === null ||
        Array.isArray(newData)
      ) {
        errorLog("Invalid newData type provided to setData: " + typeof newData);
        return this;
      }

      const currentData = instance.data; // The proxy's target

      Debug.log(
        Debug.levels.DEBUG,
        `[setData] Replacing data for ${instanceName}. Current keys: ${Object.keys(
          currentData,
        ).join(", ")}, New keys: ${Object.keys(newData).join(", ")}`,
      );

      // --- Reconciliation Logic ---
      // 1. Delete keys
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
        Debug.log(
          Debug.levels.DEBUG,
          `[setData] Deleted stale keys for ${instanceName}: ${deletedKeys.join(
            ", ",
          )}`,
        );
      }

      // 2. Assign/update properties
      Object.assign(currentData, newData); // Triggers proxy set traps
      // --- End Reconciliation Logic ---

      Debug.log(
        Debug.levels.DEBUG,
        `[setData] Data replacement processing complete for ${instanceName}.`,
      );

      // Return raw data
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
        if (_state.config?.storage?.enabled) {
          localStorage.removeItem(`fp_${instanceName}`);
        }

        // Clear elements and remove from DOM
        instance.elements.forEach(function (element) {
          try {
            element.innerHTML = "";
          } catch (error) {
            errorLog("Error removing instance: " + error.message);
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

        log("Removed instance: " + instanceName);
        return true;
      } catch (error) {
        throw error;
      }
    },

    refresh: async function (
      options = { remote: true, recompile: false, ignoreLocalVar: false },
    ) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog("Instance not found: " + instanceName);
        return Promise.reject(new Error("Instance not found: " + instanceName));
      }

      // If recompile is true, recompile the template
      const compiledTemplate = instance.template(instance.data);
      const shouldRecompile =
        options.recompile || (!compiledTemplate && instance.data);

      if (shouldRecompile) {
        instance.template = compileTemplate(instance.templateId, true);
      }

      Debug.log(Debug.levels.DEBUG, "Refresh - Template check:", {
        templateId: instance.templateId,
        templateElement: document.querySelector(instance.templateId),
        compiledTemplate: instance.template(instance.data),
      });

      // Check for local variable at instance level first
      let hasLocalVarUpdate = false;
      if (instance.localVarName && !options.ignoreLocalVar) {
        const localData = extractLocalData(instance.localVarName);
        if (localData) {
          Object.assign(instance.data, localData);
          hasLocalVarUpdate = true;
          Debug.log(
            Debug.levels.DEBUG,
            `Refreshed data from local variable "${instance.localVarName}"`,
          );
        }
      }

      const promises = [];

      instance.elements.forEach(function (element) {
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
              const promise = fetch(url, { method: method.toUpperCase() })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json();
                })
                .then((data) => {
                  // Update data which will trigger render
                  Object.assign(instance.data, data);

                  // Store data if storage is enabled
                  if (_state.config?.storage?.enabled) {
                    saveToLocalStorage(instanceName, instance.data, "instance");
                  }

                  return data;
                });
              promises.push(promise);
            }
          } else {
            updateDOM(
              element,
              instance.template(instance.data),
              instance.animate,
              instance,
            );
          }
        } catch (error) {
          element.innerHTML = `<div class="fp-error">Error refreshing template: ${error.message}</div>`;
          errorLog(`Failed to refresh template: ${error.message}`);
          promises.push(Promise.reject(error));
        }
      });

      await Promise.all(promises);
      return this;
    },

    getData: function () {
      const proxy = _state.instances[instanceName].data;
      return JSON.parse(JSON.stringify(proxy));
    },

    getElements: function () {
      return _state.instances[instanceName].elements;
    },

    get: function (path) {
      return !path ? this.getData() : _resolvePath.call(this, path);
    },

    refreshTemplate: function (templateId, recompile = false) {
      Performance.start("refreshTemplate:" + templateId);
      const compiledTemplate = compileTemplate(templateId, recompile);
      if (!compiledTemplate) {
        errorLog("Failed to compile template: " + templateId);
        Performance.end("refreshTemplate:" + templateId);
        return false;
      }
      // ... rest of refreshTemplate implementation ...
    },
  };
}

export default instanceMethods;
