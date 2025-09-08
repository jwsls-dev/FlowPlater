import { Debug } from "../core/Debug";
import { _state } from "../core/State";
import { PluginManager } from "../core/PluginManager";
import { instanceMethods } from "./InstanceMethods";
import { GroupManager } from "./GroupManager";
import { deepMerge, createDeepProxy } from "../storage/DataTransformers";
import { AttributeMatcher } from "../dom/AttributeMatcher";
import { FlowPlaterElement, FlowPlaterInstance } from "../types";
import { ConfigManager } from "../core/ConfigManager";
import { loadFromLocalStorage, saveToLocalStorage } from "../storage/LocalStorage";
import { Performance } from "../utils/Performance";
import { compileTemplate } from "../template/TemplateCompiler";
import { DEFAULTS } from "../core/DefaultConfig";
import { EventSystem } from "../events/EventSystem";

export const InstanceManager = {
  /**
   * Gets an existing instance or creates a new one.
   * The data proxy should be assigned by the caller AFTER getting the instance.
   * @param {HTMLElement} element - The DOM element
   * @param {Object} initialData - Initial data object (will be replaced by proxy later)
   * @param {FlowPlaterElement[]} [cachedElements] - Pre-cached elements to avoid DOM queries
   * @returns {Object} The instance
   */
  getOrCreateInstance(element: FlowPlaterElement, initialData: Record<string, any> = {}, cachedElements?: FlowPlaterElement[]) : FlowPlaterInstance | null {
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

      // Use cached elements if provided, otherwise find all elements with matching fp-instance attribute
      const matchingElements = cachedElements || AttributeMatcher.findMatchingElements(
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

            // Helper function for sibling traversal
            const findSibling = (direction: 'next' | 'previous', selector?: string) => {
              const prop = direction === 'next' ? 'nextElementSibling' : 'previousElementSibling';
              let current = matchingElement[prop];
              
              if (!selector) return current ? [current as FlowPlaterElement] : [];
              
              while (current) {
                if (current.matches(selector)) return [current as FlowPlaterElement];
                current = current[prop];
              }
              return [];
            };

            switch (true) {
              case targetSelector === "this":
                targetElements = [matchingElement];
                break;

              case targetSelector.startsWith("closest "):
                const closest = matchingElement.closest(targetSelector.substring(8));
                if (closest) targetElements = [closest as FlowPlaterElement];
                break;

              case targetSelector.startsWith("find "):
                const found = matchingElement.querySelector(targetSelector.substring(5));
                if (found) targetElements = [found as FlowPlaterElement];
                break;

              case targetSelector === "next" || targetSelector.startsWith("next "):
                const nextSelector = targetSelector === "next" ? undefined : targetSelector.substring(5);
                targetElements = findSibling('next', nextSelector);
                break;

              case targetSelector === "previous" || targetSelector.startsWith("previous "):
                const prevSelector = targetSelector === "previous" ? undefined : targetSelector.substring(9);
                targetElements = findSibling('previous', prevSelector);
                break;

              default:
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

  /**
   * Discovers and creates all instances from template elements
   * @param {Document | FlowPlaterElement} rootElement - Root element to search within
   */
  createAllInstances(rootElement: Document | FlowPlaterElement = document) {
    Performance.start("createAllInstances");
    
    // Pre-cache all instance elements in one DOM query to avoid redundant searches
    const elementCache = this._cacheInstanceElements(rootElement);
    
    // Find all templates using AttributeMatcher
    const templatesResult = AttributeMatcher.findMatchingElements("template", null, true, rootElement);
    const templates = (Array.isArray(templatesResult) ? templatesResult : [templatesResult]).filter(el => 
      el && !AttributeMatcher._hasAttribute(el as FlowPlaterElement, "indexed")
    ) as FlowPlaterElement[];

    Debug.info(`Found ${templates.length} templates to process`);

    templates.forEach((template) => {
      let templateId = AttributeMatcher._getRawAttribute(template, "template");
      if (templateId === DEFAULTS.TEMPLATE.SELF_TEMPLATE_ID || templateId === "") {
        templateId = template.id;
      }

      if (templateId) {
        const instanceName = AttributeMatcher._getRawAttribute(template, "instance") || template.id;
        
        // Transform template content (moved from init)
        this._transformTemplateContent(templateId);
        
        // Compile template
        const compiledTemplate = compileTemplate(templateId, true);
        
        // Create instance with cached elements to avoid DOM queries
        const instance = this.getOrCreateInstance(template, {}, elementCache.get(instanceName));
        
        // Set up the instance with template and proxy
        if (instance && compiledTemplate) {
          this._setupInstanceProxy(instance, compiledTemplate, templateId);
        }
        
        Debug.debug(`Created instance for template: ${templateId}`);
      } else {
        Debug.error(`No template ID found for element: ${template.id}`, template);
      }
    });

    Performance.end("createAllInstances");
  },

  /**
   * Pre-cache all instance elements to avoid redundant DOM queries
   * @private
   */
  _cacheInstanceElements(rootElement: Document | FlowPlaterElement = document): Map<string, FlowPlaterElement[]> {
    const cache = new Map<string, FlowPlaterElement[]>();
    
    // Use AttributeMatcher to properly find all instance elements
    const allInstanceElements = AttributeMatcher.findMatchingElements("instance", null, true, rootElement) as FlowPlaterElement[];
    
    // Group by instance name
    allInstanceElements.forEach((element) => {
      const instanceName = AttributeMatcher._getRawAttribute(element, "instance") || element.id;
      if (instanceName) {
        if (!cache.has(instanceName)) {
          cache.set(instanceName, []);
        }
        cache.get(instanceName)!.push(element);
      }
    });
    
    return cache;
  },

  /**
   * Performs initial rendering for all instances based on their configuration
   */
  renderAll() {
    Performance.start("renderAll");
    
    const instances = Object.values(_state.instances);
    Debug.info(`Rendering ${instances.length} instances`);

    instances.forEach((instance) => {
      if (this._shouldSkipInitialRender(instance)) {
        Debug.debug(`Skipping initial render for ${instance.instanceName} (has request method)`);
        return;
      }

      // Use existing _updateDOM which handles all the transformation pipeline
      if (instance._updateDOM) {
        instance._updateDOM();
        Debug.debug(`Rendered instance: ${instance.instanceName}`);
      } else {
        Debug.warn(`Instance ${instance.instanceName} missing _updateDOM method`);
      }
    });

    Performance.end("renderAll");
  },

  /**
   * Determines if an instance should skip initial rendering
   * @private
   */
  _shouldSkipInitialRender(instance: FlowPlaterInstance): boolean {
    const template = instance.templateElement;
    if (!template) return false;

    // Check for HTTP method attributes that would trigger requests
    const methods = ["get", "post", "put", "patch", "delete"];
    const hasRequestMethod = methods.some((method) =>
      AttributeMatcher._hasAttribute(template, method)
    );

    if (hasRequestMethod) return true;

    // Check for other trigger attributes
    const httpTriggerAttributes = ["trigger", "boost", "ws", "sse"];
    return httpTriggerAttributes.some((attr) =>
      AttributeMatcher._hasAttribute(template, attr)
    );
  },

  /**
   * Transforms template content (moved from init method)
   * @private
   */
  _transformTemplateContent(templateId: string) {
    const templateElement = document.querySelector(templateId);
    if (!templateElement) return;

    Debug.info("Transforming template content", templateElement);

    const scriptTags = templateElement.getElementsByTagName("script");
    const scriptContents: string[] = Array.from(scriptTags).map(
      (script) => (script as HTMLScriptElement).innerHTML
    );

    // Temporarily replace script contents with placeholders
    Array.from(scriptTags).forEach((script, i) => {
      (script as HTMLScriptElement).innerHTML = `##FP_SCRIPT_${i}##`;
    });

    // Do the replacement on the template
    templateElement.innerHTML = templateElement.innerHTML.replace(
      /\[\[(.*?)\]\]/g,
      "{{$1}}"
    );

    // Restore script contents
    Array.from(templateElement.getElementsByTagName("script")).forEach(
      (script, i) => {
        (script as HTMLScriptElement).innerHTML = scriptContents[i];
      }
    );
  },

  /**
   * Sets up the instance with compiled template and data proxy
   * @private
   */
  _setupInstanceProxy(instance: FlowPlaterInstance, compiledTemplate: any, templateId: string) {
    // Set the compiled template
    instance.template = compiledTemplate;
    instance.templateId = templateId;

    // Get the current data (which may already include stored data from getOrCreateInstance)
    const currentData = instance.data || {};

    // Check if this instance is part of a group
    const groupName = instance.groupName;

    if (groupName) {
      // Get or create the group and add this instance
      const group = GroupManager.getOrCreateGroup(groupName, currentData);
      
      // Use the group's proxy for this instance
      instance.data = group.data;
      
      // Add instance to the group
      GroupManager.addInstanceToGroup(instance, groupName);
      
      Debug.info(`Instance ${instance.instanceName} is using group ${groupName} data`);
    } else {
      // Create individual proxy with debounced update handler
      const DEBOUNCE_DELAY = DEFAULTS.PERFORMANCE.DEBOUNCE_DELAY;

      // Set up debounce tracking properties
      if (!instance._updateTimer) {
        instance._updateTimer = null;
      }
      if (!instance._stateBeforeDebounce) {
        instance._stateBeforeDebounce = null;
      }

      const proxy = createDeepProxy(currentData, () => {
        if (instance) {
          // Skip if we're currently evaluating a template
          if (instance._isEvaluating) {
            return;
          }

          // Clear existing timer
          if (instance._updateTimer) {
            clearTimeout(instance._updateTimer);
          }

          // Schedule the update
          instance._updateTimer = setTimeout(() => {
            try {
              // Set flag to prevent recursive updates during evaluation
              instance._isEvaluating = true;

              // Get the current rendered output
              const transformedData = PluginManager.applyTransformations(
                instance,
                instance.getData(),
                "transformDataBeforeRender",
                "json",
              );

              const newRenderedOutput = instance.template(transformedData);

              // Compare with previous render
              if (instance._lastRenderedOutput !== newRenderedOutput) {
                Debug.info(
                  `[Debounced Update] Output changed for ${instance.instanceName}. Firing updateData hook.`,
                );

                // Execute hooks with current state
                PluginManager.executeHook("updateData", instance, {
                  newData: proxy,
                  source: "proxy",
                });
                EventSystem.publish("updateData", {
                  instanceName: instance.instanceName,
                  newData: proxy,
                  source: "proxy",
                });

                // Update DOM since output changed
                Debug.debug(
                  `[Debounced Update] Triggering _updateDOM for ${instance.instanceName}`,
                );
                instance._updateDOM();

                // Save the new rendered output
                instance._lastRenderedOutput = newRenderedOutput;

                // Save to storage if enabled
                if (ConfigManager.getConfig().storage?.enabled) {
                  const storageId = instance.instanceName.replace("#", "");
                  Debug.debug(
                    `[Debounced Update] Saving data for ${storageId}`,
                  );
                  saveToLocalStorage(storageId, proxy, "instance");
                }
              } else {
                Debug.debug(
                  `[Debounced Update] No output change for ${instance.instanceName}. Skipping update.`,
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

      // Assign the proxy to the instance
      instance.data = proxy;
    }

    Debug.debug(`Set up proxy for instance: ${instance.instanceName}`);
  }
};
