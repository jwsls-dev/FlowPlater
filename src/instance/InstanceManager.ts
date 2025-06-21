import { Debug } from "../core/Debug";
import { _state } from "../core/State";
import { PluginManager } from "../core/PluginManager";
import { instanceMethods } from "./InstanceMethods";
import { GroupManager } from "./GroupManager";
import { deepMerge } from "../storage/DataTransformers";
import { AttributeMatcher } from "../dom/AttributeMatcher";
import { FlowPlaterElement, FlowPlaterInstance } from "../types";
import { ConfigManager } from "../core/ConfigManager";
import { loadFromLocalStorage } from "../storage/LocalStorage";

export const InstanceManager = {
  /**
   * Gets an existing instance or creates a new one.
   * The data proxy should be assigned by the caller AFTER getting the instance.
   * @param {HTMLElement} element - The DOM element
   * @param {Object} initialData - Initial data object (will be replaced by proxy later)
   * @returns {Object} The instance
   */
  getOrCreateInstance(element: FlowPlaterElement, initialData: Record<string, any> = {}) : FlowPlaterInstance | null {
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

    // Check for stored data and merge with initialData
    let finalInitialData = { ...initialData };
    if (ConfigManager.getConfig().storage?.enabled) {
      const storedData = loadFromLocalStorage(instanceName, "instance");
      if (storedData) {
        Debug.info(`Found stored data for instance: ${instanceName}, merging with initial data`);
        finalInitialData = { ...storedData, ...initialData };
      }
    }

    // Check if this element belongs to a group
    const groupName = AttributeMatcher._getRawAttribute(element, "group");

    let instance = _state.instances[instanceName];
    if (!instance) {
      // If this is not a template element, look for a parent template element
      if (!AttributeMatcher._hasAttribute(element, "template")) {
        const parentTemplateElement = (AttributeMatcher.findMatchingElements(
          "template",
        ) as HTMLElement[])?.find(
          (el: FlowPlaterElement) =>
            AttributeMatcher._getRawAttribute(el, "instance") === instanceName,
        );
        if (parentTemplateElement) {
          Debug.debug(
            `Found parent template element for instance ${instanceName}`,
          );
          return this.getOrCreateInstance(parentTemplateElement, finalInitialData);
        } else {
          Debug.error(`No template element found for instance ${instanceName}`);
          return null;
        }
      }

      // Create new instance with the template element
      const baseInstance = {
        instanceName: instanceName,
        elements: [element],
        template: null, // Template will be assigned by caller
        templateId: AttributeMatcher._getRawAttribute(element, "template") || "",
        templateElement: element, // Store direct reference to the template element
        data: finalInitialData as ProxyConstructor & Record<string, any>, // Assign initial data (including stored data), caller MUST replace with Proxy
        cleanup: () => {
          // Remove from group if part of one
          if (instance.groupName) {
            GroupManager.removeInstanceFromGroup(instance);
          }

          instance.elements = [];
        },
      };

      // Add instance methods to complete the FlowPlaterInstance interface
      const instanceMethodsObj = instanceMethods(instanceName);
      
      // Create the complete instance by merging base properties with methods
      instance = Object.assign(baseInstance, instanceMethodsObj) as FlowPlaterInstance;

      // Add plugin instance methods
      const methods = PluginManager.instanceMethods;
      for (const [methodName] of methods.entries()) {
        // Add method to instance
        (instance as any)[methodName] = (...args: any[]) =>
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

      // Add matching elements to the instance's elements Array
      (matchingElements as FlowPlaterElement[]).forEach((matchingElement) => {
        if (matchingElement !== element) {
          // Check for target attributes, including inherited ones
          const targetSelector = AttributeMatcher.findInheritedAttribute(
            matchingElement,
            "target",
          );

          if (targetSelector) {
            let targetElements: FlowPlaterElement[] = [];

            switch (true) {
              case targetSelector === "this":
                targetElements = [matchingElement];
                break;

              case targetSelector.startsWith("closest "):
                const closestSelector = targetSelector.substring(8);
                const closestElement = matchingElement.closest(closestSelector);
                if (closestElement) targetElements = [closestElement as FlowPlaterElement];
                break;

              case targetSelector.startsWith("find "):
                const findSelector = targetSelector.substring(5);
                const foundElement =
                  matchingElement.querySelector(findSelector);
                if (foundElement) targetElements = [foundElement as FlowPlaterElement];
                break;

              case targetSelector === "next":
                const nextElement = matchingElement.nextElementSibling;
                if (nextElement) targetElements = [nextElement as FlowPlaterElement];
                break;

              case targetSelector.startsWith("next "):
                const nextSelector = targetSelector.substring(5);
                let currentNext = matchingElement.nextElementSibling;
                while (currentNext) {
                  if (currentNext.matches(nextSelector)) {
                    targetElements = [currentNext as FlowPlaterElement];
                    break;
                  }
                  currentNext = currentNext.nextElementSibling;
                }
                break;

              case targetSelector === "previous":
                const prevElement = matchingElement.previousElementSibling;
                if (prevElement) targetElements = [prevElement as FlowPlaterElement];
                break;

              case targetSelector.startsWith("previous "):
                const prevSelector = targetSelector.substring(9);
                let currentPrev = matchingElement.previousElementSibling;
                while (currentPrev) {
                  if (currentPrev.matches(prevSelector)) {
                    targetElements = [currentPrev as FlowPlaterElement];
                    break;
                  }
                  currentPrev = currentPrev.previousElementSibling;
                }
                break;

              default:
                // Regular CSS selector
                targetElements = Array.from(document.querySelectorAll(targetSelector)) as FlowPlaterElement[];
            }

            // Add all found target elements to the instance
            targetElements.forEach((targetElement: FlowPlaterElement) => {
              if (!instance.elements.includes(targetElement)) {
                instance.elements.push(targetElement);
              }
              targetElement.setAttribute("fp-indexed", "true");
            });
          } else {
            if (!instance.elements.includes(matchingElement)) {
              instance.elements.push(matchingElement);
            }
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
      // If instance exists, add the new element to its array (if not already present)
      if (!instance.elements.includes(element)) {
        instance.elements.push(element);
      }
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
  updateInstanceData(instance: FlowPlaterInstance, newData: Record<string, any>) {
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
