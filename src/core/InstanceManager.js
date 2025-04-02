import { Debug, log, errorLog } from "./Debug";
import { _state } from "./State";
import PluginManager from "./PluginManager";
import { instanceMethods } from "./InstanceMethods";
import { updateDOM } from "../utils/UpdateDom";

export const InstanceManager = {
  /**
   * Gets an existing instance or creates a new one
   * @param {HTMLElement} element - The DOM element
   * @param {Object} data - Initial data for the instance
   * @returns {Object} The instance
   */
  getOrCreateInstance(element, data = {}) {
    const instanceName = element.getAttribute("fp-instance") || element.id;
    if (!instanceName) {
      errorLog("No instance name found for element");
      return null;
    }

    let instance = _state.instances[instanceName];
    if (!instance) {
      instance = {
        elements: new Set([element]),
        template: null,
        templateId: element.getAttribute("fp-template"),
        proxy: null,
        data: data,
        cleanup: () => {
          this.elements.clear();
        },
      };

      // Add instance methods
      Object.assign(instance, instanceMethods(instanceName));

      // Add plugin instance methods
      const methods = PluginManager.instanceMethods;
      for (const [methodName, methodInfo] of methods.entries()) {
        // Add method to instance
        instance[methodName] = (...args) =>
          PluginManager.executeInstanceMethod(methodName, instance, ...args);
      }

      _state.instances[instanceName] = instance;
      // Execute newInstance hook
      PluginManager.executeHook("newInstance", instance);
    }

    return instance;
  },

  /**
   * Updates an instance with new data
   * @param {Object} instance - The instance to update
   * @param {Object} data - New data for the instance
   */
  updateInstance(instance, data) {
    if (!instance) return;

    instance.data = { ...instance.data, ...data };
    instance.proxy = new Proxy(instance.data, {
      get: (target, property) => {
        const value = target[property];
        return value && typeof value === "object"
          ? new Proxy(value, this.proxyHandler)
          : value;
      },
      set: (target, property, value) => {
        target[property] = value;
        instance._updateDOM();
        return true;
      },
      deleteProperty: (target, property) => {
        delete target[property];
        instance._updateDOM();
        return true;
      },
    });
  },

  /**
   * Proxy handler for deep reactivity
   */
  proxyHandler: {
    get(target, property) {
      const value = target[property];
      return value && typeof value === "object"
        ? new Proxy(value, this)
        : value;
    },
    set(target, property, value) {
      target[property] = value;
      return true;
    },
    deleteProperty(target, property) {
      delete target[property];
      return true;
    },
  },

  /**
   * Updates the DOM for an instance
   * @param {Object} instance - The instance to update
   */
  _updateDOM(instance) {
    // Check if data is HTML
    if (
      typeof instance.data === "string" &&
      instance.data.trim().startsWith("<!DOCTYPE")
    ) {
      Debug.log(
        Debug.levels.DEBUG,
        "Data is HTML, skipping DOM update",
        instance.instanceName,
      );
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
        rendered = instance.template(instance.data);
      }

      instance.elements.forEach((element) => {
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
};
