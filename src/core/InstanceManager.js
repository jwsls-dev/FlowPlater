import { Debug } from "./Debug";
import { _state } from "./State";
import { PluginManager } from "./PluginManager";
import { instanceMethods } from "./InstanceMethods";
import { GroupManager } from "./GroupManager";
import { deepMerge } from "../utils/DeepMerge";
import { AttributeMatcher } from "../utils/AttributeMatcher";

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
    if (AttributeMatcher._hasAttribute(element, "indexed")) {
      Debug.debug(
        `Element already indexed: ${
          element.id || AttributeMatcher._getRawAttribute(element, "instance")
        }`,
      );
      return _state.instances[
        AttributeMatcher._getRawAttribute(element, "instance") || element.id
      ];
    }

    const instanceName =
      AttributeMatcher._getRawAttribute(element, "instance") || element.id;
    if (!instanceName) {
      Debug.error("No instance name found for element");
      return null;
    }

    // Check if this element belongs to a group
    const groupName = AttributeMatcher._getRawAttribute(element, "group");

    let instance = _state.instances[instanceName];
    if (!instance) {
      // If this is not a template element, look for a parent template element
      if (!AttributeMatcher._hasAttribute(element, "template")) {
        const parentTemplateElement = AttributeMatcher.findMatchingElements(
          "template",
        ).find(
          (el) =>
            AttributeMatcher._getRawAttribute(el, "instance") === instanceName,
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
        templateId: AttributeMatcher._getRawAttribute(element, "template"),
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

      // Find all elements with matching fp-instance attribute
      const matchingElements = AttributeMatcher.findMatchingElements(
        "instance",
        instanceName,
      );

      // Add matching elements to the instance's elements Set
      matchingElements.forEach((matchingElement) => {
        if (matchingElement !== element) {
          // Check for target attributes, including inherited ones
          const targetSelector = AttributeMatcher.findInheritedAttribute(
            matchingElement,
            "target",
          );

          if (targetSelector) {
            let targetElements = [];

            switch (true) {
              case targetSelector === "this":
                targetElements = [matchingElement];
                break;

              case targetSelector.startsWith("closest "):
                const closestSelector = targetSelector.substring(8);
                const closestElement = matchingElement.closest(closestSelector);
                if (closestElement) targetElements = [closestElement];
                break;

              case targetSelector.startsWith("find "):
                const findSelector = targetSelector.substring(5);
                const foundElement =
                  matchingElement.querySelector(findSelector);
                if (foundElement) targetElements = [foundElement];
                break;

              case targetSelector === "next":
                const nextElement = matchingElement.nextElementSibling;
                if (nextElement) targetElements = [nextElement];
                break;

              case targetSelector.startsWith("next "):
                const nextSelector = targetSelector.substring(5);
                let currentNext = matchingElement.nextElementSibling;
                while (currentNext) {
                  if (currentNext.matches(nextSelector)) {
                    targetElements = [currentNext];
                    break;
                  }
                  currentNext = currentNext.nextElementSibling;
                }
                break;

              case targetSelector === "previous":
                const prevElement = matchingElement.previousElementSibling;
                if (prevElement) targetElements = [prevElement];
                break;

              case targetSelector.startsWith("previous "):
                const prevSelector = targetSelector.substring(9);
                let currentPrev = matchingElement.previousElementSibling;
                while (currentPrev) {
                  if (currentPrev.matches(prevSelector)) {
                    targetElements = [currentPrev];
                    break;
                  }
                  currentPrev = currentPrev.previousElementSibling;
                }
                break;

              default:
                // Regular CSS selector
                targetElements = document.querySelectorAll(targetSelector);
            }

            // Add all found target elements to the instance
            targetElements.forEach((targetElement) => {
              instance.elements.add(targetElement);
              targetElement.setAttribute("fp-indexed", "true");
            });
          } else {
            instance.elements.add(matchingElement);
          }
          // Mark the element as indexed
          matchingElement.setAttribute("fp-indexed", "true");
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
