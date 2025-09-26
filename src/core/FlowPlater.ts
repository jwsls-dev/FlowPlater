import { EventSystem } from "../events/EventSystem";
import { Debug, FlowPlaterError, TemplateError } from "./Debug";
import { Performance } from "../utils/Performance";
import { _state, getInstance, getInstances, setInitialized } from "./State";
import { _readyState } from "./ReadyState";

import { InstanceManager } from "../instance/InstanceManager";
import { DataStore } from "./DataStore";
import { PluginManager } from "./PluginManager";

import { AttributeMatcher } from "../dom/AttributeMatcher";
import { ConfigManager } from "./ConfigManager";

import { compileTemplate } from "../template/TemplateCompiler";
import { render } from "../template/Template";
import { replaceCustomTags, setCustomTags } from "../template/ReplaceCustomTags";
import { TemplateCache } from "../template/TemplateCache";
import { registerHelpers } from "../helpers/index";
import { RequestHandler } from "../events/RequestHandler";
import { 
  defineHtmxExtension, 
  processPreload, 
  translateCustomHTMXAttributes, 
  processUrlAffixes, 
  addHtmxExtensionAttribute 
} from "../htmx";
import { setupAnimation } from "../dom/SetupAnimation";
import { 
  FlowPlaterElement, 
  ProcessingResult, 
  Processor, 
  FlowPlaterObj, 
  TransformerFunction, 
  RequestTransformerFunction,
  TransformationType,
  FlowPlaterWindow,
  NamedTransformer,
  FlowPlaterInstance,
  FlowPlaterConfig,
  FlowPlaterGroup,
  FlowPlaterPlugin,
  FlowPlaterPluginConfig
} from "../types";

import htmxLib from "htmx.org";
import Handlebars from "handlebars";

import "../types";

const __FP_EXISTING__ = (typeof window !== 'undefined' ? (window as unknown as FlowPlaterWindow).FlowPlater : undefined) as any;
const __FP_ALREADY_LOADED = !!(__FP_EXISTING__ && __FP_EXISTING__.VERSION);

/* -------------------------------------------------------------------------- */
/* ANCHOR                    Double Loading Protection                        */
/* -------------------------------------------------------------------------- */

const htmx = htmxLib;
if (typeof window !== 'undefined' && !__FP_ALREADY_LOADED) {
  // Ensure HTMX and Handlebars are available globally
  window.htmx = htmx;
  window.Handlebars = Handlebars;
  registerHelpers();
} else {
  Debug.warn('HTMX and Handlebars are already loaded. Skipping duplicate load to prevent state loss and conflicts.');
}

/* -------------------------------------------------------------------------- */
/* ANCHOR                      FlowPlater module                              */
/* -------------------------------------------------------------------------- */

/**
 * @namespace FlowPlater
 * @description Core FlowPlater module that provides template processing and dynamic content management.
 * Integrates with HTMX and Handlebars to provide a seamless templating and interaction experience.
 * @author JWSLS
 */

const VERSION = "1.5.1";
const AUTHOR = "JWSLS";
const LICENSE = "Flowplater standard licence";

// One-time runtime initializer for side effects
function initializeRuntime() : void {
  // Set default configuration without logging
  ConfigManager.setDefaultConfig(ConfigManager.getDefaultConfig());

  // Queue meta tag config if present
  const metaElement: HTMLMetaElement | null = document.querySelector('meta[name="fp-config"]');
  if (metaElement) {
    try {
      const metaConfig = JSON.parse(metaElement.content);
      // Queue the meta config - will be applied with other queued configs
      ConfigManager.setConfig(metaConfig);
    } catch (e) {
      Debug.error(
        "Error parsing fp-config meta tag content:",
        metaElement.content,
        e,
      );
    }
  }

  // Initialize request handling and HTMX extension
  RequestHandler.setupEventListeners();
  defineHtmxExtension();

  // Initialize centralized data flow
  DataStore.init();
}

/* -------------------------------------------------------------------------- */
/* ANCHOR                 process(element = document)                         */
/* -------------------------------------------------------------------------- */

/**
 * @namespace ProcessingChain
 * @description Handles the sequential processing of FlowPlater elements through various transformation phases.
 * Each processor in the chain performs a specific modification or setup task on the element.
 */
const ProcessingChain = {
  /**
   * @type {Array<Object>}
   * @property {string} name - Name of the processor
   * @property {Function} process - Processing function
   */
  processors: [
    {
      /* Replaces custom tags with Handlebars helpers. 
      This is needed because some tags like <select> do not allow nested helper elements (bc of the HTML spec).
      To avoid this, we allow users to use tags like <fpselect> instead of <select>, and then replace them with <select> in this processor.
      */
      name: "customTags",
      process: replaceCustomTags,
    },
    {
      /* For ease of use, we allow users to use the fp- prefix for HTMX attributes.
      This processor translates them to the hx- prefix.
      */
      name: "htmxAttributes",
      process: translateCustomHTMXAttributes,
    },
    {
      /* Adds the flowplater htmx-extension attribute to the element.
      The extension (file: defineHtmxExtension.ts) allows us to hijack the htmx request and process it with FlowPlater.
      */
      name: "htmxExtensionAttribute",
      process: addHtmxExtensionAttribute,
    },
    {
      /* Allows users to use the prepend and append attributes to modify the URL of the request.
      This is useful for things like pagination, or use in Webflow, where only part of the URL can be linked to a CMS field.
      */
      name: "urlAffixes",
      process: processUrlAffixes,
    },
    {
      /* Allows users to use the animation attribute to enable or disable animations. This uses the viewTransition api.
      */
      name: "animation",
      process: setupAnimation,
    },
    {
      /* Allows users to use the preload attribute to enable or disable preloading.
      When a user hovers over an element with the preload attribute, the URL is preloaded in the background.
      */
      name: "preload",
      process: processPreload,
    },
    {
      /* Finally, process the element with htmx. If the element has something like hx-trigger="load", it will be processed by htmx.
      NOTE: elements without htmx attributes will be rendered manually by FlowPlater (via init(), calls InstanceManager.renderAll())
      */
      name: "htmxProcess",
      process: (element: FlowPlaterElement) => {
        htmx.process(element);
        return element;
      },
    },
  ] as Processor[],

  /**
   * @function FP_SELECTOR
   * @description
   *   Computes the CSS selector string used to identify all FlowPlater elements in the DOM.
   *   This selector is dynamically generated based on the current configuration, specifically the list of attribute selectors defined in `ConfigManager`.
   *   For each configured selector (e.g., "fp-template", "fp-group"), all possible attribute name variants (such as data-*, camelCase, etc.) are resolved using `AttributeMatcher._getAllAttributeNames`.
   *   The resulting selector is a comma-separated list of attribute selectors, e.g.:
   *     [fp-template],[data-fp-template],[fpGroup],[data-fp-group]
   *   This enables FlowPlater to robustly match elements regardless of attribute naming conventions or HTML attribute normalization.
   *
   *   Example:
   *     If ConfigManager.getConfig().selectors.fp = ["fp-template", "fp-group"],
   *     and AttributeMatcher._getAllAttributeNames("fp-template") returns ["fp-template", "data-fp-template"],
   *     and AttributeMatcher._getAllAttributeNames("fp-group") returns ["fp-group", "data-fp-group"],
   *     then FP_SELECTOR will return:
   *       "[fp-template],[data-fp-template],[fp-group],[data-fp-group]"
   *
   * @returns {string} The computed selector string for FlowPlater elements.
   */
  get FP_SELECTOR(): string {
    return ConfigManager.getConfig()
      .selectors.fp
      .map((selector: string) =>
        AttributeMatcher._getAllAttributeNames(selector)
          .map((name: string) => `[${name}]`)
          .join(",")
      )
      .join(",");
  },

  /**
   * @function processElement
   * @param {HTMLElement} element - The DOM element to process
   * @returns {HTMLElement} The processed element
   * @description Processes a single FlowPlater element through all registered processors.
   * Handles errors and maintains processing state throughout the chain.
   * Returns the processed element to allow for chaining.
   */
  processElement: function (element: FlowPlaterElement) : FlowPlaterElement {
    // Clean up any existing preload listeners
    if (element._preloadCleanup) {
      element._preloadCleanup();
    }

    let processingResults: ProcessingResult = {
      success: true,
      errors: [],
      warnings: [],
      finalElement: element,
    };

    // Run through all processors
    processingResults.finalElement = this.processors.reduce(
      (currentElement, processor, index) => {
        if (!currentElement) {
          processingResults.errors.push({
            phase: processor.name,
            error: `Element became undefined at processor index ${index}`,
            processor: this.processors[index - 1],
          });
          processingResults.success = false;
          return element; // Return original element to allow chain to continue
        }

        try {
          const result = processor.process(currentElement);
          return result;
        } catch (error: unknown) {
          const err = error as Error;
          processingResults.errors.push({
            phase: processor.name,
            error: err.message,
            stack: err.stack,
          });

          // Log the error
          Debug.error(
            `Error in processor ${processor.name}: ${err.message}`,
            err,
          );

          // Attempt recovery based on error type
          if (error instanceof TemplateError) {
            // Template errors might need special handling
            processingResults.warnings.push({
              phase: processor.name,
              message: "Falling back to original template",
            });
            return currentElement;
          }

          // For other errors, return the current element state
          return currentElement;
        }
      },
      element,
    );

    // Emit events based on processing results
    if (processingResults.errors.length > 0) {
      EventSystem.publish("processingChain:error", processingResults);
    }
    if (processingResults.warnings.length > 0) {
      EventSystem.publish("processingChain:warning", processingResults);
    }

    return processingResults.finalElement;
  },
};

/**
 * @function process
 * @param {HTMLElement} [element=document] - The root element to process
 * @description Processes FlowPlater elements within the given element or document.
 * If the element itself matches FlowPlater selectors, processes just that element.
 * Otherwise, finds and processes all matching child elements.
 */
function process(element: Document | FlowPlaterElement = document) : void {
  Debug.debug("Processing with FP_SELECTOR:", ProcessingChain.FP_SELECTOR);
  if (element === document || !(element as FlowPlaterElement).matches(ProcessingChain.FP_SELECTOR)) {
    const fpElements = element.querySelectorAll(ProcessingChain.FP_SELECTOR);
    Debug.debug("Found elements to process:", fpElements.length);
    fpElements.forEach((el) => ProcessingChain.processElement(el as FlowPlaterElement));
  } else {
    ProcessingChain.processElement(element as FlowPlaterElement);
  }
}

/* -------------------------------------------------------------------------- */
/* ANCHOR                      Handlebars integration                         */
/* -------------------------------------------------------------------------- */

// Note: Handlebars integration is now handled after making it globally available
// See the window availability check above where we unregister and register helpers

/* -------------------------------------------------------------------------- */
/* ANCHOR                          Public API                                 */
/* -------------------------------------------------------------------------- */

// Create the base FlowPlater object
const FlowPlaterObj: FlowPlaterObj = {
  compileTemplate,
  render,
  getInstance,
  getInstances,

  getOrCreateInstance(instanceName: string, initialData: Record<string, any> = {}) : FlowPlaterInstance | null {
    // Try to find any element with this instance name first
    const element = AttributeMatcher.findElementByInstanceName(instanceName);
    if (!element) {
      Debug.error(`Element not found for instance: ${instanceName}`);
      return null;
    }
    // InstanceManager will handle finding the template element if this isn't one
    return InstanceManager.getOrCreateInstance(element, initialData);
  },

  /**
   * Get a group by name
   * @param {string} groupName - The name of the group to retrieve
   * @returns {Object|null} The group object or null if not found
   */
  getGroup(groupName: string) : FlowPlaterGroup | null {
    return DataStore.getGroup(groupName);
  },

  /**
   * Get or create a group
   * @param {string} groupName - The name of the group to retrieve
   * @returns {Object} The group object. This will be a proxy to the group data.
   */
  getOrCreateGroup(groupName: string, initialData: Record<string, any> = {}) : FlowPlaterGroup {
    return DataStore.getOrCreateGroup(groupName, initialData);
  },

  /**
   * Get all groups
   * @returns {Object} All groups
   */
  getGroups() : Record<string, FlowPlaterGroup> {
    return DataStore.getAllGroups();
  },

  /**
   * Update data for a group
   * @param {string} groupName - Name of the group to update
   * @param {Object} data - Data to merge into the group
   * @returns {Object|null} The updated group or null if not found
   */
  updateGroup(groupName: string, data: Record<string, any>) : FlowPlaterGroup | null {
    return DataStore.updateGroup(groupName, data);
  },

  /**
   * Remove a group
   * @param {string} groupName - Name of the group to remove
   */
  removeGroup(groupName: string) : void {
    return DataStore.removeGroup(groupName);
  },

  /**
   * Remove all groups
   */
  removeAllGroups() : void {
    return DataStore.removeAllGroups();
  },

  // Logging API
  log(level: number, ...args: any[]) : FlowPlaterObj {
    args.unshift(`[PLUGIN]`);
    Debug.log(level, ...args);
    return this;
  },

  // Log levels for use with the log method
  logLevels: Debug.levels,

  // Plugin management methods
  registerPlugin(plugin: any, config: Record<string, any> = {}) : FlowPlaterPlugin {
    return PluginManager.registerPlugin(plugin, config);
  },

  removePlugin(name: string) : boolean {
    return PluginManager.removePlugin(name);
  },

  removeAllPlugins() : Promise<void> {
    return PluginManager.destroyAll();
  },

  getPlugin(name: string) : FlowPlaterPlugin | undefined {
    return PluginManager.getPlugin(name);
  },

  getAllPlugins() : FlowPlaterPlugin[] {
    return PluginManager.getSortedPlugins();
  },

  /**
   * Invoke a registered global method (from MethodRegistry)
   * @param {string} name - Global method name
   * @param {...any} args - Arguments to pass
   * @returns {any} Result of the method call
   */
  callGlobal(name: string, ...args: any[]) : any {
    return PluginManager.executeGlobalMethod(name, ...args);
  },

  enablePlugin(name: string) : boolean {
    return PluginManager.enablePlugin(name);
  },

  disablePlugin(name: string) : boolean {
    return PluginManager.disablePlugin(name);
  },

  pluginConfig(name: string) : FlowPlaterPluginConfig | null {
    return PluginManager.pluginConfig(name);
  },

  on: (...args: any[]) : () => void => EventSystem.subscribe(...(args as [string, Function])),
  once: (...args: any[]) : () => void => EventSystem.once(...(args as [string, Function])),
  off: (...args: any[]) : void => EventSystem.unsubscribe(...(args as [string, Function])),
  emit: (...args: any[]) : void => EventSystem.publish(...(args as [string, any])),

  debug(level: number) : FlowPlaterObj {
    ConfigManager.setConfig({ debug: { level } });
    return this;
  },

  templateCache: TemplateCache,

  /**
   * @function init
   * @param {HTMLElement} [element=document] - Root element to initialize
   * @param {Object} [options={ render: true }] - Initialization options
   * @returns {FlowPlaterObj} The FlowPlater instance
   * @description Initializes FlowPlater functionality for the given element or entire document.
   * Processes templates, loads configuration, and sets up event handling.
   */
  init(element: Document | FlowPlaterElement = document, options: { render: boolean } = { render: true }) : FlowPlaterObj {
    // If already initialized, just process the element
    if (_state.initialized) {
      if (element !== document) {
        Performance.start("init-element");
        Debug.info("Re-initializing FlowPlater for element:", element);
        process(element);
        Performance.end("init-element");
      } else {
        Debug.debug("FlowPlater already initialized, skipping document re-initialization");
      }
      return this;
    }

    // Submit any queued configuration changes before initialization begins
    ConfigManager.submitQueuedConfig();

    Performance.start("init");
    Debug.info("Initializing FlowPlater...");

    // Process forms and other elements FIRST
    // This ensures filters and other components are initialized before any rendering
    process(element);

    // Create all instances from templates
    InstanceManager.createAllInstances(element);

    // Perform initial rendering if requested
    if (options.render) {
      InstanceManager.renderAll();
    }

    // Mark as initialized and ready
    setInitialized(true);
    _readyState.isReady = true;

    Debug.info("FlowPlater initialized successfully");
    Performance.end("init");

    // Process any queued operations
    _readyState.processQueue();

    EventSystem.publish("initialized");
    PluginManager.executeHook("initComplete", this, _state.instances);

    return this;
  },

  /**
   * @function ready
   * @param {Function} callback - Function to execute when FlowPlater is ready
   * @returns {FlowPlaterObj} The FlowPlater instance
   */
  ready(callback: (instance: typeof FlowPlaterObj) => void) : FlowPlaterObj {
    if (_readyState.isReady) {
      callback(this);
    } else {
      _readyState.queue.push(() => callback(this));
    }
    return this;
  },

  /**
   * @function cleanup
   * @param {string} [instanceName] - Name of instance to clean up
   * @returns {FlowPlaterObj} The FlowPlater instance
   * @description Cleans up FlowPlater instances and their associated resources.
   * If no instanceName is provided, cleans up all instances.
   */
  cleanup(instanceName?: string) : FlowPlaterObj {
    if (instanceName) {
      const instance = _state.instances[instanceName];
      if (instance) {
        // Clean up preload listeners
        instance.elements.forEach((element: FlowPlaterElement) => {
          if (element._preloadCleanup) {
            element._preloadCleanup();
          }
          if (element.removeEventListeners) {
            element.removeEventListeners();
          }
        });

        // Remove instance
        delete _state.instances[instanceName];
        Debug.info(`Cleaned up instance: ${instanceName}`);
      }
    } else {
      // Clean up all instances
      Object.keys(_state.instances).forEach((name) => {
        this.cleanup(name);
      });
      setInitialized(false);
      Debug.info("Cleaned up all instances");
    }
    return this;
  },

  // Public version info
  VERSION: VERSION,
  AUTHOR: AUTHOR,
  LICENSE: LICENSE,

  // Use ConfigManager for setting custom tags
  setCustomTags: setCustomTags,

  /**
   * @function config
   * @param {FlowPlaterConfig} [newConfig={}] - Configuration options to apply
   * @returns {FlowPlaterObj} The FlowPlater instance
   * @description Configures FlowPlater with new settings. Deep merges with existing configuration.
   */
  config: function (newConfig: Partial<FlowPlaterConfig> = {}) : FlowPlaterObj {
    // Delegate to ConfigManager
    ConfigManager.setConfig(newConfig);
    return this;
  },

  /**
   * Get the current configuration
   * @returns {Object} The current configuration
   */
  getConfig: function () : FlowPlaterConfig {
    // Delegate to ConfigManager
    return ConfigManager.getConfig();
  },

  /**
   * Register a Handlebars helper
   * @param {string} name - The name of the helper
   * @param {Handlebars.HelperDelegate} helperFn - The helper function
   * @returns {FlowPlaterObj} The FlowPlater instance
   * @description Registers a new Handlebars helper and clears the template cache
   * to ensure all templates are recompiled with the new helper.
   */
  registerTag: function (name: string, helperFn: Handlebars.HelperDelegate) : FlowPlaterObj {
    // Register the helper with Handlebars
    Handlebars.registerHelper(name, helperFn);

    // Clear the template cache to ensure all templates are recompiled
    this.templateCache.clear();

    // Compiled templates are lazy-resolved now; simply clear cache and let instances pick up new versions

    // Log the registration
    Debug.info(`Registered Handlebars helper: ${name}`);

    return this;
  },

  /**
   * @function trigger
   * @param {string} name - The name of the event to trigger
   * @param {string | FlowPlaterElement | Document} element - The element(s) to trigger the event on
   * @param {Object} detail - The detail object to pass to the event
   */
  trigger: function (name: string, element: string | FlowPlaterElement | Document = document, detail: Record<string, any> = {}) : void {
    if (typeof element === "string") {
      const elements = document.querySelectorAll(element);
      elements.forEach(el => {
        const htmlElement = el as HTMLElement;
        EventSystem.publish(name, { element: htmlElement, detail });
        htmx.trigger(htmlElement, name, detail);
      });
      return;
    }
    EventSystem.publish(name, { element, detail });
    if (element) {
      htmx.trigger(element, name, detail);
    }
  },

  /**
   * Destroy the FlowPlater instance
   * @description Cleans up all instances and their associated resources.
   * Also clears the template cache and event listeners.
   */
  destroy: function () : void {
    // Clean up all instances
    Object.keys(_state.instances).forEach((name) => {
      this.cleanup(name);
    });

    // Clean up template cache
    TemplateCache.clear();
    _state.instances = {};

    // Clean up event listeners
    EventSystem.unsubscribeAll();

    Debug.info("Cleaned up all instances");
  },

  /**
   * @function create
   * @param {string} instanceName - Name or selector for the new instance
   * @param {Object} [options={ refresh: true }] - Creation options
   * @returns {Object} The created FlowPlater instance
   * @throws {FlowPlaterError} If element cannot be found or instance creation fails
   * @description Creates a new FlowPlater instance for the specified element.
   */
  create: function (instanceName: string, options: { refresh: boolean } = { refresh: true }) : FlowPlaterInstance {
    Performance.start(`createInstance:${instanceName}`);
    Debug.info(`Creating FlowPlater instance: ${instanceName}`);

    // Find any element with the instance name - InstanceManager will find the template element
    const element = AttributeMatcher.findElementByInstanceName(instanceName);

    if (!element) {
      throw new FlowPlaterError(
        `Could not find element for instance: ${instanceName}`,
      );
    }

    // Clear any existing template cache for this instance
    const templateId = AttributeMatcher._getRawAttribute(element, "template");
    if (templateId) {
      this.templateCache.clear(templateId);
    }

    // Use init() to process the element, but skip initial render
    this.init(element);

    // Get the instance from state
    const instance = getInstance(instanceName);
    if (!instance) {
      throw new FlowPlaterError(`Failed to create instance: ${instanceName}`);
    }

    // Execute newInstance hook
    PluginManager.executeHook("newInstance", instance);

    if (options.refresh) {
      instance.refresh();
    }

    Debug.info(`Instance created successfully: ${instanceName}`);
    Performance.end(`createInstance:${instanceName}`);

    return instance;
  },

  /**
   * Finds an attribute value on an element, checking both direct attributes and inheritance
   * @param {HTMLElement} element - The element to search on
   * @param {string} attributeName - The name of the attribute (with or without prefix)
   * @returns {string|null} The attribute value or null if not found
   */
  findAttribute(element: FlowPlaterElement, attributeName: string) : string | null {
    return AttributeMatcher.findAttribute(element, attributeName);
  },

  /**
   * Invalidate cached rendered HTML for one instance or all instances
   * @param {string} [instanceName] - The instance to invalidate; omit to invalidate all
   * @returns {FlowPlaterObj}
   */
  invalidateHtmlCache(instanceName?: string) : FlowPlaterObj {
    if (instanceName) {
      const instance = _state.instances[instanceName];
      if (instance && typeof instance.invalidateHtmlCache === "function") {
        instance.invalidateHtmlCache();
      } else if (instance) {
        // Fallback: directly clear if method not present
        (instance as any)._lastRenderedOutput = undefined;
      } else {
        Debug.warn(`invalidateHtmlCache: instance not found: ${instanceName}`);
      }
      return this;
    }

    Object.keys(_state.instances).forEach((name) => {
      const instance = _state.instances[name];
      if (instance && typeof instance.invalidateHtmlCache === "function") {
        instance.invalidateHtmlCache();
      } else if (instance) {
        (instance as any)._lastRenderedOutput = undefined;
      }
    });
    Debug.debug("[FlowPlater] Invalidated HTML cache for all instances");
    return this;
  },

  /**
   * Add a custom transformer function for a specific transformation type
   * @param {string} transformationType - The type of transformation (e.g. 'transformDataBeforeRender', 'transformResponse', 'transformRequest')
   * @param {TransformerFunction | RequestTransformerFunction} transformerFn - The transformer function with signature (instance, data, dataType) => transformedData
   *                                  - instance: The FlowPlater instance that triggered the transformation
   *                                  - data: The data to transform
   *                                  - dataType: The type of data being transformed ('json', 'html', or 'xml')
   * @param {string} [transformerName] - Optional name for the transformer. If not provided, one will be auto-generated.
   * @returns {FlowPlaterObj} The FlowPlater instance for chaining
   * @example
   * FlowPlater.addTransformer('transformDataBeforeRender', (instance, data, dataType) => {
   *   // Transform the data before it's rendered
   *   return { ...data, timestamp: Date.now() };
   * }, 'myCustomTransformer');
   */
  addTransformer(transformationType: TransformationType, transformerFn: TransformerFunction | RequestTransformerFunction, transformerName?: string) : FlowPlaterObj {
    if (typeof transformerFn !== "function") {
      throw new FlowPlaterError("Transformer must be a function");
    }
    PluginManager.addTransformer(transformationType, transformerFn, transformerName);
    return this;
  },

  /**
   * Remove a custom transformer function by name
   * @param {string} transformationType - The type of transformation
   * @param {string} transformerName - The name of the transformer to remove
   * @returns {boolean} True if the transformer was found and removed, false otherwise
   * @example
   * FlowPlater.addTransformer('transformDataBeforeRender', myTransformer, 'myCustomTransformer');
   * // Later...
   * FlowPlater.removeTransformer('transformDataBeforeRender', 'myCustomTransformer');
   */
  removeTransformer(transformationType: TransformationType, transformerName: string) : boolean {
    return PluginManager.removeTransformer(transformationType, transformerName);
  },

  /**
   * Clear all custom transformers for a specific type or all types
   * @param {string} [transformationType] - The type of transformation to clear. If not provided, clears all transformers.
   * @returns {FlowPlaterObj} The FlowPlater instance for chaining
   * @example
   * // Clear all transformDataBeforeRender transformers
   * FlowPlater.clearTransformers('transformDataBeforeRender');
   *
   * // Clear all transformers of all types
   * FlowPlater.clearTransformers();
   */
  clearTransformers(transformationType?: TransformationType) : FlowPlaterObj {
    // Passing undefined clears all transformers
    PluginManager.clearTransformers(transformationType as any);
    return this;
  },

  /**
   * List all custom transformers for a specific type or all types
   * @param {string} [transformationType] - The type of transformation to list. If not provided, lists all transformers.
   * @returns {Object|Array} Object with transformer types as keys and arrays of NamedTransformers as values, or array of NamedTransformers for specific type
   * @example
   * // List all transformDataBeforeRender transformers
   * const transformers = FlowPlater.listTransformers('transformDataBeforeRender');
   *
   * // List all transformers of all types
   * const allTransformers = FlowPlater.listTransformers();
   */
  listTransformers(transformationType?: TransformationType): Record<string, NamedTransformer[]> | NamedTransformer[] {
    return PluginManager.listTransformers(transformationType);
  },

  /**
   * Register a method on the global API, all instances, or all groups
   * @param {"global"|"instance"|"group"} type - Where to register the method
   * @param {string} name - The method name
   * @param {Function} fn - The function implementation
   */
  registerMethod(type: "global" | "instance" | "group", name: string, fn: Function, override: boolean = false) : FlowPlaterObj {
    PluginManager.registerMethod(type, name, fn, override);
    return this;
  },
};

EventSystem.publish("loaded");

/* -------------------------------------------------------------------------- */
/* ANCHOR                   Process Pre-loaded Queue                          */
/* -------------------------------------------------------------------------- */

/**
 * @description Processes any callbacks that were queued before FlowPlater loaded.
 * This supports the pattern: FlowPlater = FlowPlater || []; FlowPlater.push(callback);
 */
function processPreloadedQueue() : void {
  const queuedCallbacks = (window as unknown as FlowPlaterWindow).FlowPlater;
  if (Array.isArray(queuedCallbacks) && queuedCallbacks.length > 0) {
    Debug.info(`Processing ${queuedCallbacks.length} pre-loaded FlowPlater callbacks`);
    
    // Process each queued callback
    queuedCallbacks.forEach((callback: any) => {
      if (typeof callback === 'function') {
        // Add to ready queue - will be processed after initialization
        _readyState.queue.push(() => callback(FlowPlaterObj));
      } else {
        Debug.warn('Invalid callback in FlowPlater queue:', callback);
      }
    });
  }
}

/* -------------------------------------------------------------------------- */
/* ANCHOR                          Auto init                                  */
/* -------------------------------------------------------------------------- */

/**
 * @description Automatically initializes FlowPlater when the DOM is ready.
 * Uses the ready state system to ensure proper initialization order.
 */
if (!__FP_ALREADY_LOADED && typeof window !== 'undefined') {
  processPreloadedQueue();
  (window as unknown as FlowPlaterWindow).FlowPlater = FlowPlaterObj;
  initializeRuntime();
  if (document.readyState === "complete" || document.readyState === "interactive") {
    FlowPlaterObj.init();
  } else {
    document.addEventListener("DOMContentLoaded", () => FlowPlaterObj.init());
  }
} else {
  Debug.warn('FlowPlater is already loaded. Skipping duplicate load to prevent state loss and conflicts.');
}

export default FlowPlaterObj;
