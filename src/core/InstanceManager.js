import { Debug } from "./Debug";
import { _state } from "./State";
import PluginManager from "./PluginManager";
import { instanceMethods } from "./InstanceMethods";
import { GroupManager } from "./GroupManager";
import { deepMerge } from "../utils/DeepMerge";

export const InstanceManager = {
  /**
   * Gets an existing instance or creates a new one.
   * The data proxy should be assigned by the caller AFTER getting the instance.
   * @param {HTMLElement} element - The DOM element
   * @param {Object} initialData - Initial data object (will be replaced by proxy later)
   * @returns {Object} The instance
   */
  getOrCreateInstance(element, initialData = {}) {
    // Skip if element is already indexed
    if (element.hasAttribute("fp-indexed")) {
      Debug.debug(
        `Element already indexed: ${
          element.id || element.getAttribute("fp-instance")
        }`,
      );
      return _state.instances[
        element.getAttribute("fp-instance") || element.id
      ];
    }

    const instanceName = element.getAttribute("fp-instance") || element.id;
    if (!instanceName) {
      Debug.error("No instance name found for element");
      return null;
    }

    // Check if this element belongs to a group
    const groupName = element.getAttribute("fp-group");

    let instance = _state.instances[instanceName];
    if (!instance) {
      // If this is not a template element, look for a parent template element
      if (!element.hasAttribute("fp-template")) {
        const parentTemplateElement = document.querySelector(
          `[fp-template][fp-instance="${instanceName}"]`,
        );
        if (parentTemplateElement) {
          Debug.debug(
            `Found parent template element for instance ${instanceName}`,
          );
          return this.getOrCreateInstance(parentTemplateElement, initialData);
        } else {
          Debug.error(`No template element found for instance ${instanceName}`);
          return null;
        }
      }

      // Create new instance with the template element
      instance = {
        elements: new Set([element]),
        template: null, // Template will be assigned by caller
        templateId: element.getAttribute("fp-template"),
        data: initialData, // Assign initial data, caller MUST replace with Proxy
        cleanup: () => {
          // Remove from group if part of one
          if (instance.groupName) {
            GroupManager.removeInstanceFromGroup(instance);
          }

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

      // Find and add all elements with matching fp-instance attribute
      const matchingElements = document.querySelectorAll(
        `[fp-instance="${instanceName}"]`,
      );
      matchingElements.forEach((matchingElement) => {
        if (matchingElement !== element) {
          instance.elements.add(matchingElement);
          // Mark the element as indexed
          matchingElement.setAttribute("fp-indexed", "true");
          Debug.debug(`Added matching element to instance: ${instanceName}`);
        }
      });

      // Mark the template element as indexed
      element.setAttribute("fp-indexed", "true");

      // Handle group membership, but don't set data proxy here - that happens in Template.js
      if (groupName) {
        instance.groupName = groupName;
        Debug.info(
          `Instance ${instanceName} will be added to group ${groupName}`,
        );
      }
    } else {
      // If instance exists, add the new element to its set
      instance.elements.add(element);
      // Mark the element as indexed
      element.setAttribute("fp-indexed", "true");
      Debug.debug(`Added element to existing instance: ${instanceName}`);

      // Check for group membership
      if (groupName && !instance.groupName) {
        instance.groupName = groupName;
        Debug.info(
          `Added existing instance ${instanceName} to group ${groupName}`,
        );
      }
    }

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
    deepMerge(instance.data, newData);
    // No explicit re-render needed here, proxy handler should trigger _updateDOM
    // No explicit save needed here, proxy handler should save
  },
};
