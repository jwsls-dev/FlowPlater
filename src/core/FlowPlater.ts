import { EventSystem } from "../events";
import { Debug, FlowPlaterError, TemplateError } from "./Debug";
import { Performance } from "../utils/Performance";
import { _state, getInstance, getInstances } from "./State";
import { _readyState } from "./ReadyState";

import { InstanceManager, GroupManager } from "../instance";
import { PluginManager } from "./PluginManager";

import { loadFromLocalStorage } from "../storage";
import { AttributeMatcher } from "../dom";
import { ConfigManager } from "./ConfigManager";

import { compileTemplate, render, replaceCustomTags, setCustomTags } from "../template";
import { registerHelpers } from "../helpers/index";
import { RequestHandler } from "../events";
import { 
  defineHtmxExtension, 
  processPreload, 
  translateCustomHTMXAttributes, 
  processUrlAffixes, 
  addHtmxExtensionAttribute 
} from "../htmx";
import { setupAnimation } from "../dom";
import { 
  FlowPlaterElement, 
  ProcessingResult, 
  Processor, 
  FlowPlaterObj, 
  TransformerFunction, 
  RequestTransformerFunction
} from "../types";

import htmxLib from "htmx.org";
import Handlebars from "handlebars";

import "../types";

const htmx = htmxLib;
if (typeof window !== 'undefined') {
  (window as any).htmx = htmx;
  (window as any).Handlebars = Handlebars;
  registerHelpers();
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

// Initialize request handling
RequestHandler.setupEventListeners();
defineHtmxExtension();

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
      name: "customTags",
      process: replaceCustomTags,
    },
    {
      name: "htmxAttributes",
      process: translateCustomHTMXAttributes,
    },
    {
      name: "htmxExtensionAttribute",
      process: addHtmxExtensionAttribute,
    },
    {
      name: "urlAffixes",
      process: processUrlAffixes,
    },
    {
      name: "animation",
      process: setupAnimation,
    },
    {
      name: "preload",
      process: processPreload,
    },
    {
      name: "htmxProcess",
      process: (element: FlowPlaterElement) => {
        htmx.process(element);
        return element;
      },
    },
  ] as Processor[],

  get FP_SELECTOR() {
    return ConfigManager.getConfig()
      .selectors.fp.map((selector: string) =>
        AttributeMatcher._getAllAttributeNames(selector)
          .map((name: string) => `[${name}]`)
          .join(","),
      )
      .join(",");
  },

  /**
   * @function processElement
   * @param {HTMLElement} element - The DOM element to process
   * @returns {HTMLElement} The processed element
   * @description Processes a single FlowPlater element through all registered processors.
   * Handles errors and maintains processing state throughout the chain.
   */
  processElement: function (element: FlowPlaterElement) {
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
function process(element: Document | FlowPlaterElement = document) {
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

  getOrCreateInstance(instanceName: string, initialData: Record<string, any> = {}) {
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
  getGroup(groupName: string) {
    return GroupManager.getGroup(groupName);
  },

  /**
   * Get or create a group
   * @param {string} groupName - The name of the group to retrieve
   * @returns {Object} The group object. This will be a proxy to the group data.
   */
  getOrCreateGroup(groupName: string, initialData: Record<string, any> = {}) {
    return GroupManager.getOrCreateGroup(groupName, initialData);
  },

  /**
   * Get all groups
   * @returns {Object} All groups
   */
  getGroups() {
    return GroupManager.getAllGroups();
  },

  /**
   * Update data for a group
   * @param {string} groupName - Name of the group to update
   * @param {Object} data - Data to merge into the group
   * @returns {Object|null} The updated group or null if not found
   */
  updateGroup(groupName: string, data: Record<string, any>) {
    return GroupManager.updateGroup(groupName, data);
  },

  /**
   * Remove a group
   * @param {string} groupName - Name of the group to remove
   */
  removeGroup(groupName: string) {
    return GroupManager.removeGroup(groupName);
  },

  /**
   * Remove all groups
   */
  removeAllGroups() {
    return GroupManager.removeAllGroups();
  },

  // Logging API
  log(level: number, ...args: any[]) {
    args.unshift(`[PLUGIN]`);
    Debug.log(level, ...args);
    return this;
  },

  // Log levels for use with the log method
  logLevels: Debug.levels,

  // Plugin management methods
  registerPlugin(plugin: any, config: Record<string, any> = {}) {
    return PluginManager.registerPlugin(plugin, config);
  },

  removePlugin(name: string) {
    return PluginManager.removePlugin(name);
  },

  removeAllPlugins() {
    return PluginManager.destroyAll();
  },

  getPlugin(name: string) {
    return PluginManager.getPlugin(name);
  },

  getAllPlugins() {
    return PluginManager.getSortedPlugins();
  },

  enablePlugin(name: string) {
    return PluginManager.enablePlugin(name);
  },

  disablePlugin(name: string) {
    return PluginManager.disablePlugin(name);
  },

  pluginConfig(name: string) {
    return PluginManager.pluginConfig(name);
  },

  on: (...args: any[]) => EventSystem.subscribe(...(args as [string, Function])),
  off: (...args: any[]) => EventSystem.unsubscribe(...(args as [string, Function])),
  emit: (...args: any[]) => EventSystem.publish(...(args as [string, any])),

  debug(level: number) {
    ConfigManager.setConfig({ debug: { level } });
    return this;
  },

  templateCache: {
    set(templateId: string, template: any) {
      const cacheSize = ConfigManager.getConfig().templates.cacheSize;
      const cache = _state.templateCache;

      // If cache is at limit, remove oldest entry
      if (Object.keys(cache).length >= cacheSize) {
        const oldestKey = Object.keys(cache)[0];
        delete cache[oldestKey];
        Debug.info(`Cache limit reached. Removed template: ${oldestKey}`);
      }

      cache[templateId] = template;
      return template;
    },

    /**
     * Get a template from the cache
     * @param {string} templateId - The ID of the template to get
     * @returns {Object} The template object or all templates if no ID is provided
     */
    get(templateId?: string) {
      if (templateId) {
        return _state.templateCache[templateId];
      }
      return _state.templateCache;
    },

    /**
     * Check if a template is cached
     * @param {string} templateId - The ID of the template to check
     * @returns {boolean} True if the template is cached, false otherwise
     */
    isCached(templateId: string) {
      return !!_state.templateCache[templateId];
    },

    /**
     * Clear a template from the cache
     * @param {string} templateId - The ID of the template to clear
     */
    clear(templateId?: string) {
      if (templateId) {
        delete _state.templateCache[templateId];
        Debug.info(`Cleared template cache for: ${templateId}`);
      } else {
        _state.templateCache = {};
        Debug.info("Cleared entire template cache");
      }
    },

    /**
     * Get the size of the template cache
     * @returns {number} The number of templates in the cache
     */
    size() {
      return Object.keys(_state.templateCache).length;
    },
  },

  /**
   * @function init
   * @param {HTMLElement} [element=document] - Root element to initialize
   * @param {Object} [options={ render: true }] - Initialization options
   * @returns {FlowPlaterObj} The FlowPlater instance
   * @description Initializes FlowPlater functionality for the given element or entire document.
   * Processes templates, loads configuration, and sets up event handling.
   */
  init(element: Document | FlowPlaterElement = document, options: { render: boolean } = { render: true }) {
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

    // Find all templates
    const templatesResult = AttributeMatcher.findMatchingElements("template");
    const templates = Array.isArray(templatesResult) ? templatesResult.filter(Boolean) : (templatesResult ? [templatesResult] : []);

    // Initialize each template
    templates.forEach((template) => {
      let templateId = AttributeMatcher._getRawAttribute(template, "template");
      if (templateId === "self" || templateId === "") {
        templateId = template.id;
      }

      if (templateId) {
        // Transform template content before compiling
        const templateElement = document.querySelector(templateId);
        if (templateElement) {
          Debug.info("replacing template content", templateElement);

          const scriptTags = templateElement.getElementsByTagName("script");
          const scriptContents: string[] = Array.from(scriptTags).map(
            (script) => (script as HTMLScriptElement).innerHTML,
          );

          // Temporarily replace script contents with placeholders
          Array.from(scriptTags).forEach((script, i) => {
            (script as HTMLScriptElement).innerHTML = `##FP_SCRIPT_${i}##`;
          });

          // Do the replacement on the template
          templateElement.innerHTML = templateElement.innerHTML.replace(
            /\[\[(.*?)\]\]/g,
            "{{$1}}",
          );

          // Restore script contents
          Array.from(templateElement.getElementsByTagName("script")).forEach(
            (script, i) => {
              (script as HTMLScriptElement).innerHTML = scriptContents[i];
            },
          );
        }

        // Compile the template using the templateId from the attribute for the template cache
        compileTemplate(templateId, true);

        // Only render if options.render is true AND element doesn't have HTMX/FP methods
        if (options.render) {
          // Enhanced method detection - check for any fp- or hx- attribute that would trigger requests
          const methods = ["get", "post", "put", "patch", "delete"];

          // More comprehensive check for request-triggering attributes
          let hasRequestMethod = false;

          // Check for specific HTTP method attributes
          hasRequestMethod = methods.some((method) =>
            AttributeMatcher._hasAttribute(template, method),
          );

          // Also check for other trigger attributes that would cause loading
          if (!hasRequestMethod) {
            // Check for any attribute that would trigger an HTTP request
            const httpTriggerAttributes = ["trigger", "boost", "ws", "sse"];

            hasRequestMethod = httpTriggerAttributes.some((attr) =>
              AttributeMatcher._hasAttribute(template, attr),
            );
          }

          Debug.debug(
            `[Template ${templateId}] Has request method: ${hasRequestMethod}`,
            template,
          );

          // Create/update instance with template regardless of render decision
          // Important: skipRender should be true when hasRequestMethod is true
          render({
            template: templateId,
            data: {},
            target: template,
            skipRender: hasRequestMethod, // Skip render if has HTMX/FP methods
          });

          // Use ConfigManager to check storage config
          if (hasRequestMethod && ConfigManager.getConfig().storage?.enabled) {
            const instanceName =
              AttributeMatcher._getRawAttribute(template, "instance") ||
              template.id ||
              templateId;
            const storedData = loadFromLocalStorage(instanceName, "instance");
            if (storedData) {
              Debug.info(
                `Found stored data for instance: ${instanceName}, rendering with stored data`,
              );
              // Instead of directly setting data, use render with the stored data
              // This ensures proper rendering with the stored data
              render({
                template: templateId,
                data: storedData,
                target: template,
                instanceName: instanceName,
                skipRender: false, // Explicitly render with stored data
                isStoredDataRender: true, // Flag to bypass redundant init check
              });
            } else {
              Debug.debug(
                `Skipping initial render for instance: ${instanceName} - no stored data found`,
              );
            }
          }
        }
      } else {
        Debug.error(
          `No template ID found for element: ${template.id}`,
          template,
          "Make sure your template has an ID attribute",
        );
      }
    });

    process(element);

    // Mark as initialized and ready
    _state.initialized = true;
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
  ready(callback: (instance: typeof FlowPlaterObj) => void) {
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
  cleanup(instanceName?: string) {
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
      _state.initialized = false;
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
  config: function (newConfig = {}) {
    // Delegate to ConfigManager
    ConfigManager.setConfig(newConfig);
    return this;
  },

  /**
   * Get the current configuration
   * @returns {Object} The current configuration
   */
  getConfig: function () {
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
  registerTag: function (name: string, helperFn: Handlebars.HelperDelegate) {
    // Register the helper with Handlebars
    Handlebars.registerHelper(name, helperFn);

    // Clear the template cache to ensure all templates are recompiled
    this.templateCache.clear();

    // Clear compiled templates stored in instances
    Object.keys(_state.instances).forEach((instanceName) => {
      const instance = _state.instances[instanceName];
      if (instance.templateId) {
        // Recompile the template for this instance
        instance.template = compileTemplate(instance.templateId, true);
      }
    });

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
  trigger: function (name: string, element: string | FlowPlaterElement | Document = document, detail: Record<string, any> = {}) {
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
  destroy: function () {
    // Clean up all instances
    Object.keys(_state.instances).forEach((name) => {
      this.cleanup(name);
    });

    // Clean up template cache
    _state.templateCache = {};
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
  create: function (instanceName: string, options: { refresh: boolean } = { refresh: true }) {
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
  findAttribute(element: FlowPlaterElement, attributeName: string) {
    return AttributeMatcher.findAttribute(element, attributeName);
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
  addTransformer(transformationType: string, transformerFn: TransformerFunction | RequestTransformerFunction, transformerName?: string) {
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
  removeTransformer(transformationType: string, transformerName: string) {
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
  clearTransformers(transformationType?: string) {
    PluginManager.clearTransformers(transformationType || "");
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
  listTransformers(transformationType?: string) {
    return PluginManager.listTransformers(transformationType);
  },
};

EventSystem.publish("loaded");

/* -------------------------------------------------------------------------- */
/* ANCHOR                          Auto init                                  */
/* -------------------------------------------------------------------------- */

/**
 * @description Automatically initializes FlowPlater when the DOM is ready.
 * Uses the ready state system to ensure proper initialization order.
 */
if (document.readyState === "complete" || document.readyState === "interactive") {
  FlowPlaterObj.init();
} else {
  document.addEventListener("DOMContentLoaded", () => FlowPlaterObj.init());
}

export default FlowPlaterObj;
