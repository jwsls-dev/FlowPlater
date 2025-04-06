import { Debug } from "./Debug";
import { _state } from "./State";
import PluginManager from "./PluginManager";
import { instanceMethods } from "./InstanceMethods";

export const InstanceManager = {
  /**
   * Gets an existing instance or creates a new one.
   * The data proxy should be assigned by the caller AFTER getting the instance.
   * @param {HTMLElement} element - The DOM element
   * @param {Object} initialData - Initial data object (will be replaced by proxy later)
   * @returns {Object} The instance
   */
  getOrCreateInstance(element, initialData = {}) {
    const instanceName = element.getAttribute("fp-instance") || element.id;
    if (!instanceName) {
      Debug.error("No instance name found for element");
      return null;
    }

    let instance = _state.instances[instanceName];
    if (!instance) {
      instance = {
        elements: new Set([element]),
        template: null, // Template will be assigned by caller
        templateId: element.getAttribute("fp-template"),
        data: initialData, // Assign initial data, caller MUST replace with Proxy
        cleanup: () => {
          instance.elements.clear(); // Use instance scope
        },
      };

      // Add instance methods
      Object.assign(instance, instanceMethods(instanceName));

      // Add plugin instance methods
      const methods = PluginManager.instanceMethods;
      for (const [methodName] of methods.entries()) {
        // Add method to instance
        instance[methodName] = (...args) =>
          PluginManager.executeInstanceMethod(methodName, instance, ...args);
      }

      _state.instances[instanceName] = instance;
      // Execute newInstance hook
      PluginManager.executeHook("newInstance", instance);
      Debug.info(`Created new instance: ${instanceName}`);
    } else {
      // If instance exists, add the new element to its set
      instance.elements.add(element);
      Debug.debug(`Added element to existing instance: ${instanceName}`);
    }

    // REMOVED internal proxy creation and assignment
    // REMOVED localStorage saving here (should be handled by proxy setter)

    return instance;
  },

  /**
   * Updates an instance's data via the proxy. USE WITH CAUTION.
   * Prefer direct proxy manipulation.
   * @param {Object} instance - The instance to update
   * @param {Object} newData - New data for the instance
   */
  updateInstanceData(instance, newData) {
    if (!instance || !instance.data) {
      Debug.error("Cannot update data: Instance or instance.data is invalid.");
      return;
    }
    // Update data through the proxy to trigger reactivity
    Object.assign(instance.data, newData);
    // No explicit re-render needed here, proxy handler should trigger _updateDOM
    // No explicit save needed here, proxy handler should save
  },
};
