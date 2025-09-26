import { Debug } from "../core/Debug";
import { _state } from "../core/State";
import { DataStore } from "../core/DataStore";
import { PluginManager } from "../core/PluginManager";
import { createInstance, setupInstanceProxy } from "./Instance";
import { deepMerge } from "../storage/DataTransformers";
import { AttributeMatcher } from "../dom/AttributeMatcher";
import { FlowPlaterElement, FlowPlaterInstance } from "../types";
import { ConfigService } from "../core/ConfigService";
import { loadFromLocalStorage } from "../storage/IDBStorage";
import { Performance } from "../utils/Performance";
// Removed eager compilation in favor of lazy compilation
import { DEFAULTS } from "../core/DefaultConfig";
// import { EventSystem } from "../events/EventSystem";

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

    // Prepare initial data; async stored data will be merged after instance creation
    let finalInitialData = { ...initialData };

    // Check if this element belongs to a group
    const groupName = AttributeMatcher._getRawAttribute(element, "group");

    let instance = _state.instances[instanceName];
    if (!instance) {
      if (!AttributeMatcher._hasAttribute(element, "template")) {
        const parentTemplateElement = this._findTemplateElementForInstance(instanceName);
        if (parentTemplateElement) {
          Debug.debug(`Found parent template element for instance ${instanceName}`);
          return this.getOrCreateInstance(parentTemplateElement, finalInitialData);
        }
        Debug.error(`No template element found for instance ${instanceName}`);
        return null;
      }

      instance = createInstance({
        instanceName,
        templateElement: element,
        templateId: AttributeMatcher._getRawAttribute(element, "template") || "",
        initialData: finalInitialData,
        groupName: groupName || undefined,
        elements: [element]
      });

      _state.instances[instanceName] = instance;

      this._mergeStoredData(instanceName, instance, "new");

      PluginManager.executeHook("newInstance", instance);
      Debug.info(`Created new instance: ${instanceName}`);

      const matchingElements = cachedElements || AttributeMatcher.findMatchingElements(
        "instance",
        instanceName,
      );

      this._addMatchingElementsToInstance(instance, element, matchingElements as FlowPlaterElement[]);

      element.setAttribute("fp-indexed", "true");
    } else {
      this._indexElement(instance, element);
      Debug.debug(`Added element to existing instance: ${instanceName}`);

      if (groupName && !instance.groupName) {
        instance.groupName = groupName;
        // Ensure centralized membership handling on existing instances
        try {
          const group = DataStore.getOrCreateGroup(groupName);
          if (group) {
            DataStore.addInstanceToGroup(instance, groupName);
          }
        } catch (e) {
          Debug.error(`Failed to add existing instance ${instanceName} to group ${groupName}:`, e);
        }
        Debug.info(`Added existing instance ${instanceName} to group ${groupName}`);
      }

      this._mergeStoredData(instanceName, instance, "existing");
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
        
        // Create instance with cached elements to avoid DOM queries
        const instance = this.getOrCreateInstance(template, {}, elementCache.get(instanceName));
        
        // Set up the instance with template and proxy
        if (instance) {
          setupInstanceProxy(instance, templateId);
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
   * Find the template element corresponding to an instance name
   * @private
   */
  _findTemplateElementForInstance(instanceName: string): FlowPlaterElement | null {
    const templates = AttributeMatcher.findMatchingElements("template") as HTMLElement[];
    if (!Array.isArray(templates)) return null;
    const result = templates.find((el: FlowPlaterElement) =>
      AttributeMatcher._getRawAttribute(el, "instance") === instanceName,
    );
    return (result || null) as FlowPlaterElement | null;
  },

  /**
   * Non-blocking merge of stored data into an instance if storage is enabled
   * @private
   */
  _mergeStoredData(instanceName: string, instance: FlowPlaterInstance, context: "new" | "existing" = "new") {
    if (!ConfigService.isStorageEnabled()) return;
    loadFromLocalStorage(instanceName, "instance")
      .then((storedData: any) => {
        if (storedData) {
          const message = context === "new"
            ? `Merging stored data for instance: ${instanceName}`
            : `Merging stored data into existing instance: ${instanceName}`;
          Debug.info(message);
          deepMerge(instance.data, storedData);
        }
      })
      .catch((e: any) => {
        const message = context === "new"
          ? `Error loading stored data for ${instanceName}: ${e?.message || e}`
          : `Error loading stored data for existing ${instanceName}: ${e?.message || e}`;
        Debug.error(message);
      });
  },

  /**
   * Add and index all matching elements for an instance
   * @private
   */
  _addMatchingElementsToInstance(instance: FlowPlaterInstance, templateElement: FlowPlaterElement, matchingElements: FlowPlaterElement[]) {
    (matchingElements || []).forEach((matchingElement: FlowPlaterElement) => {
      if (matchingElement === templateElement) return;

      const targetSelector = AttributeMatcher.findInheritedAttribute(matchingElement, "target");
      if (targetSelector) {
        const targetElements = this._getTargetElementsForElement(matchingElement, targetSelector);
        targetElements.forEach((targetElement: FlowPlaterElement) => this._indexElement(instance, targetElement));
      } else {
        this._indexElement(instance, matchingElement);
      }

      matchingElement.setAttribute("fp-indexed", "true");
    });
  },

  /**
   * Compute target elements for a matching element based on a selector
   * @private
   */
  _getTargetElementsForElement(matchingElement: FlowPlaterElement, targetSelector: string): FlowPlaterElement[] {
    if (targetSelector === "this") return [matchingElement];

    if (targetSelector.startsWith("closest ")) {
      const closest = matchingElement.closest(targetSelector.substring(8));
      return closest ? [closest as FlowPlaterElement] : [];
    }

    if (targetSelector.startsWith("find ")) {
      const found = matchingElement.querySelector(targetSelector.substring(5));
      return found ? [found as FlowPlaterElement] : [];
    }

    if (targetSelector === "next" || targetSelector.startsWith("next ")) {
      const nextSelector = targetSelector === "next" ? undefined : targetSelector.substring(5);
      return this._findSiblingElement(matchingElement, "next", nextSelector);
    }

    if (targetSelector === "previous" || targetSelector.startsWith("previous ")) {
      const prevSelector = targetSelector === "previous" ? undefined : targetSelector.substring(9);
      return this._findSiblingElement(matchingElement, "previous", prevSelector);
    }

    return Array.from(document.querySelectorAll(targetSelector)) as FlowPlaterElement[];
  },

  /**
   * Find a sibling element in a direction, optionally matching a selector
   * @private
   */
  _findSiblingElement(matchingElement: FlowPlaterElement, direction: "next" | "previous", selector?: string): FlowPlaterElement[] {
    const prop = direction === "next" ? "nextElementSibling" : "previousElementSibling";
    let current: Element | null = (matchingElement as any)[prop] as Element | null;
    if (!selector) return current ? [current as FlowPlaterElement] : [];
    while (current) {
      if (current.matches(selector)) return [current as FlowPlaterElement];
      current = (current as any)[prop] as Element | null;
    }
    return [];
  },

  /**
   * Ensure element is registered on instance and marked as indexed
   * @private
   */
  _indexElement(instance: FlowPlaterInstance, element: FlowPlaterElement) {
    if (!instance.elements.includes(element)) {
      instance.elements.push(element);
    }
    element.setAttribute("fp-indexed", "true");
  },

  // Proxy setup is centralized in src/instance/Instance.ts
};
