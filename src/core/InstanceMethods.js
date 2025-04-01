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
import PluginManager from "./PluginManager";
import { trackChanges } from "../utils/DataChanges";

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
        if (this.templateId === "self" || this.templateId === null) {
          // For "self" template, use the first element as the template
          const templateElement = Array.from(this.elements)[0];
          if (!templateElement) {
            Debug.log(
              Debug.levels.ERROR,
              "No template element found for self template",
              this.instanceName,
            );
            return;
          }
          rendered = templateElement.innerHTML;
        } else if (!this.template) {
          Debug.log(
            Debug.levels.ERROR,
            "No template found for instance",
            this.instanceName,
          );
          return;
        } else {
          rendered = this.template(this.data);
        }

        this.elements.forEach((element) => {
          updateDOM(element, rendered, this.animate);
        });
      } catch (error) {
        Debug.log(
          Debug.levels.ERROR,
          "Error updating DOM for instance",
          this.instanceName,
          error,
        );
      }
    },

    update: function (newData) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog("Instance not found: " + instanceName);
        return this;
      }

      const { valid, isHtml } = _validateData(newData);
      if (!valid || isHtml) {
        return this;
      }

      // Track changes before updating data
      const oldData = { ...instance.data };

      Object.assign(instance.data, newData);
      Object.assign(instance.proxy, newData);

      // Calculate changes
      const changes = trackChanges(oldData, instance.data);

      // Execute updateData hook
      PluginManager.executeHook("updateData", instance, {
        data: instance.data,
        changes,
        source: "update",
      });

      // Save to localStorage if enabled
      if (_state.config?.storage?.enabled) {
        const storageId = instanceName.replace("#", "");
        saveToLocalStorage(storageId, instance.data, "instance");
      }

      return this._updateDOM();
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

    refresh: async function (options = { remote: true, recompile: false }) {
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

      const promises = [];

      instance.elements.forEach(function (element) {
        try {
          if (options.remote) {
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
                  Object.assign(instance.data, data);
                  Object.assign(instance.proxy, data);
                  const rendered = instance.template(instance.proxy);
                  Debug.log(Debug.levels.DEBUG, "Refresh - Template render:", {
                    data: instance.data,
                    rendered,
                  });

                  // Execute updateData hook
                  PluginManager.executeHook("updateData", instance, {
                    data: instance.data,
                    changes: data,
                    source: "refresh",
                  });

                  updateDOM(element, rendered, instance.animate);
                  return data;
                });
              promises.push(promise);
            }
          } else {
            updateDOM(
              element,
              instance.template(instance.proxy),
              instance.animate,
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
      return _state.instances[instanceName].data;
    },

    getProxy: function () {
      return _state.instances[instanceName].proxy;
    },

    getElements: function () {
      return _state.instances[instanceName].elements;
    },

    merge: function (path, value) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog("Instance not found: " + instanceName);
        return this;
      }

      let newData = value !== undefined ? value : path;
      const { valid, isHtml } = _validateData(newData);
      if (!valid || isHtml) {
        return this;
      }

      try {
        // Track old state
        const oldData = { ...instance.data };

        // Deep merge function
        function deepMerge(target, source) {
          for (const key in source) {
            if (source.hasOwnProperty(key)) {
              if (Array.isArray(source[key]) && Array.isArray(target[key])) {
                const targetMap = new Map(
                  target[key].map((item) => [item.id, item]),
                );
                source[key].forEach((sourceItem) => {
                  if (sourceItem.id && targetMap.has(sourceItem.id)) {
                    deepMerge(targetMap.get(sourceItem.id), sourceItem);
                  } else {
                    target[key].push(sourceItem);
                  }
                });
              } else if (
                source[key] &&
                typeof source[key] === "object" &&
                !Array.isArray(source[key])
              ) {
                target[key] = target[key] || {};
                deepMerge(target[key], source[key]);
              } else {
                target[key] = source[key];
              }
            }
          }
          return target;
        }

        if (path && value !== undefined) {
          let target = this.getData();
          const pathParts = path.split(/[\.\[\]'"]/);
          for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i];
            if (part === "") continue;
            if (!target[part]) target[part] = {};
            target = target[part];
          }
          const lastPart = pathParts[pathParts.length - 1];
          if (lastPart !== "") {
            if (!target[lastPart]) {
              target[lastPart] = Array.isArray(value) ? [] : {};
            }
            if (Array.isArray(value)) {
              if (!Array.isArray(target[lastPart])) {
                target[lastPart] = [];
              }
              const targetArray = target[lastPart];
              value.forEach((item) => {
                if (item.id) {
                  const existingIndex = targetArray.findIndex(
                    (existing) => existing.id === item.id,
                  );
                  if (existingIndex >= 0) {
                    deepMerge(targetArray[existingIndex], item);
                  } else {
                    targetArray.push(item);
                  }
                } else {
                  targetArray.push(item);
                }
              });
            } else if (typeof value === "object") {
              deepMerge(target[lastPart], value);
            } else {
              target[lastPart] = value;
            }
          }
        } else {
          deepMerge(this.getData(), newData);
        }

        // Calculate changes
        const changes = trackChanges(oldData, instance.data, path);

        // Execute updateData hook
        PluginManager.executeHook("updateData", instance, {
          data: instance.data,
          changes,
          path: path,
          source: "merge",
        });

        // Save to localStorage if enabled
        if (_state.config?.storage?.enabled) {
          const storageId = instanceName.replace("#", "");
          saveToLocalStorage(storageId, instance.data, "instance");
        }

        return this._updateDOM();
      } catch (error) {
        errorLog(error.message);
        return this;
      }
    },

    set: function (path, value) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog("Instance not found: " + instanceName);
        return this;
      }

      const { valid, isHtml } = _validateData(value);
      if (!valid || isHtml) {
        return this;
      }

      try {
        // Track old state
        const oldData = { ...instance.data };

        const parts = path.split(/[\.\[\]'"]/g).filter(Boolean);
        const last = parts.pop();
        const target = parts.reduce((acc, part) => {
          if (!acc[part]) acc[part] = {};
          return acc[part];
        }, instance.data);

        target[last] = value;
        Object.assign(instance.proxy, instance.data);

        // Calculate changes
        const changes = trackChanges(oldData, instance.data, path);

        // Execute updateData hook
        PluginManager.executeHook("updateData", instance, {
          data: instance.data,
          changes,
          path: path,
          source: "set",
        });

        // Save to localStorage if enabled
        if (_state.config?.storage?.enabled) {
          const storageId = instanceName.replace("#", "");
          saveToLocalStorage(storageId, instance.data, "instance");
        }

        return this._updateDOM();
      } catch (error) {
        errorLog(error.message);
        return this;
      }
    },

    push: function (arrayPath, value) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog("Instance not found: " + instanceName);
        return this;
      }

      const { valid, isHtml } = _validateData(value);
      if (!valid || isHtml) {
        return this;
      }

      let array = _resolvePath(arrayPath);
      if (!Array.isArray(array)) {
        errorLog("Target at path is not an array: " + arrayPath);
        return this;
      }

      try {
        // Track old state
        const oldData = JSON.parse(JSON.stringify(instance.data));

        array.push(value);

        // Calculate changes
        const changes = trackChanges(oldData, instance.data, arrayPath);

        // Execute updateData hook
        PluginManager.executeHook("updateData", instance, {
          data: instance.data,
          changes,
          path: arrayPath,
          source: "push",
        });

        // Save to localStorage if enabled
        if (_state.config?.storage?.enabled) {
          const storageId = instanceName.replace("#", "");
          saveToLocalStorage(storageId, instance.data, "instance");
        }

        return this._updateDOM();
      } catch (error) {
        errorLog(error.message);
        return this;
      }
    },

    updateWhere: function (arrayPath, criteria, updates) {
      const instance = _state.instances[instanceName];
      if (!instance) {
        errorLog("Instance not found: " + instanceName);
        return this;
      }

      const { valid, isHtml } = _validateData(updates);
      if (!valid || isHtml) {
        return this;
      }

      let array = _resolvePath(arrayPath);
      if (!Array.isArray(array)) {
        errorLog("Target at path is not an array: " + arrayPath);
        return this;
      }

      try {
        // Track old state
        const oldData = JSON.parse(JSON.stringify(instance.data));

        array.forEach((item) => {
          const matches = Object.entries(criteria).every(
            ([key, value]) => item[key] === value,
          );
          if (matches) {
            Object.assign(item, updates);
          }
        });

        // Calculate changes
        const changes = trackChanges(oldData, instance.data, arrayPath);

        // Execute updateData hook
        PluginManager.executeHook("updateData", instance, {
          data: instance.data,
          changes,
          path: arrayPath,
          criteria,
          updates,
          source: "updateWhere",
        });

        // Save to localStorage if enabled
        if (_state.config?.storage?.enabled) {
          const storageId = instanceName.replace("#", "");
          saveToLocalStorage(storageId, instance.data, "instance");
        }

        return this._updateDOM();
      } catch (error) {
        errorLog(error.message);
        return this;
      }
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
