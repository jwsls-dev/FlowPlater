import { EventSystem } from "./EventSystem";
import { Debug, FlowPlaterError, TemplateError } from "./Debug";
import { Performance } from "../utils/Performance";
import { _state, getInstance, getInstances } from "./State";
import { _readyState } from "./ReadyState";

import { InstanceManager } from "./InstanceManager";
import { GroupManager } from "./GroupManager";
import { PluginManager } from "./PluginManager";

import { loadFromLocalStorage } from "../utils/LocalStorage";
import { AttributeMatcher } from "../utils/AttributeMatcher";
import { ConfigManager } from "./ConfigManager";
import { deepMerge } from "../utils/DeepMerge";

import { compileTemplate, render } from "./Template";
import {
  replaceCustomTags,
  setCustomTags,
  customTagList,
} from "./ReplaceCustomTags";
import { registerHelpers } from "../helpers/index";
import { RequestHandler } from "./RequestHandler";
import { defineHtmxExtension } from "./DefineHtmxExtension";
import { processPreload } from "./ProcessPreload";
import { translateCustomHTMXAttributes } from "./TranslateHtmxAttributes";
import { processUrlAffixes } from "./ProcessUrlAffixes";
import { setupAnimation } from "./SetupAnimation";
import { addHtmxExtensionAttribute } from "./AddHtmxExtensionAttribute";

/* -------------------------------------------------------------------------- */
/* ANCHOR                      FlowPlater module                              */
/* -------------------------------------------------------------------------- */

/**
 * @namespace FlowPlater
 * @description Core FlowPlater module that provides template processing and dynamic content management.
 * Integrates with HTMX and Handlebars to provide a seamless templating and interaction experience.
 * @author JWSLS
 */

const VERSION = "1.4.32";
const AUTHOR = "JWSLS";
const LICENSE = "Flowplater standard licence";

/**
 * @typedef {Object} FlowPlaterConfig
 * @property {Object} debug - Debug configuration settings
 * @property {number} debug.level - Debug level (0-3, 0 = error, 1 = warning, 2 = info, 3 = debug)
 * @property {Object} selectors - DOM selector configurations
 * @property {string} selectors.fp - Main FlowPlater element selector
 * @property {Object} templates - Template handling configuration
 * @property {number} templates.cacheSize - Maximum number of cached templates
 * @property {boolean} templates.precompile - Whether to precompile templates
 * @property {Object} animation - Animation settings
 * @property {boolean} animation.enabled - Enable/disable animations
 * @property {number} animation.duration - Animation duration in milliseconds
 * @property {Object} htmx - HTMX configuration
 * @property {number} htmx.timeout - Request timeout in milliseconds
 * @property {string} htmx.swapStyle - Default content swap style
 * @property {Object} customTags - Custom tag definitions
 * @property {Object} storage - Storage configuration
 * @property {boolean} storage.enabled - Whether to persist instance data
 * @property {number} storage.ttl - Time to live in seconds (default: 30 days in seconds, -1 for infinite)
 * @property {boolean} persistForm - Whether to persist form states
 */
const defaultConfig = {
  debug: {
    level:
      window.location.hostname.endsWith(".webflow.io") ||
      window.location.hostname.endsWith(".canvas.webflow.com") ||
      window.location.hostname.endsWith("localhost")
        ? 3
        : 1,
  },
  selectors: {
    fp: [
      "template",
      "get",
      "post",
      "put",
      "delete",
      "patch",
      "persist",
      "instance",
    ],
  },
  templates: {
    cacheSize: 100,
    precompile: true,
  },
  animation: {
    enabled: true,
    duration: 300,
  },
  htmx: {
    timeout: 10000,
    swapStyle: "innerHTML",
    selfRequestsOnly: false,
    ignoreTitle: true,
  },
  customTags: customTagList,
  storage: {
    enabled: false,
    ttl: 30 * 24 * 60 * 60, // 30 days in seconds
  },
  persistForm: true,
};

/* -------------------------------------------------------------------------- */
/* ANCHOR                      Errors and dependencies                        */
/* -------------------------------------------------------------------------- */

if (typeof Handlebars === "undefined") {
  throw new FlowPlaterError(
    "FlowPlater requires Handlebars. Get it at https://handlebarsjs.com/",
  );
}
if (typeof htmx === "undefined") {
  throw new FlowPlaterError(
    "FlowPlater requires htmx. Get it at https://htmx.org/",
  );
}

// Initialize state with default config
ConfigManager.setConfig(defaultConfig);

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
      process: (element) => {
        htmx.process(element);
        return element;
      },
    },
  ],

  get FP_SELECTOR() {
    return ConfigManager.getConfig()
      .selectors.fp.map((selector) =>
        AttributeMatcher._getAllAttributeNames(selector)
          .map((name) => `[${name}]`)
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
  processElement: function (element) {
    // Clean up any existing preload listeners
    if (element._preloadCleanup) {
      element._preloadCleanup();
    }

    let hasErrors = false;
    let processingResults = {
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
        } catch (error) {
          processingResults.errors.push({
            phase: processor.name,
            error: error.message,
            stack: error.stack,
          });

          // Log the error
          Debug.error(
            `Error in processor ${processor.name}: ${error.message}`,
            error,
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
function process(element = document) {
  Debug.debug("Processing with FP_SELECTOR:", ProcessingChain.FP_SELECTOR);
  if (element === document || !element.matches(ProcessingChain.FP_SELECTOR)) {
    const fpElements = element.querySelectorAll(ProcessingChain.FP_SELECTOR);
    Debug.debug("Found elements to process:", fpElements.length);
    fpElements.forEach((el) => ProcessingChain.processElement(el));
  } else {
    ProcessingChain.processElement(element);
  }
}

/* -------------------------------------------------------------------------- */
/* ANCHOR                      Handlebars integration                         */
/* -------------------------------------------------------------------------- */

// * Unrister default each/if helpers
Handlebars.unregisterHelper("each");
Handlebars.unregisterHelper("if");

registerHelpers(Handlebars);

/* -------------------------------------------------------------------------- */
/* ANCHOR                          Public API                                 */
/* -------------------------------------------------------------------------- */

// Create the base FlowPlater object
const FlowPlaterObj = {
  compileTemplate,
  render,
  getInstance,
  getInstances,

  getOrCreateInstance(instanceName, initialData = {}) {
    return InstanceManager.getOrCreateInstance(instanceName, initialData);
  },

  PluginManager,

  /**
   * Get a group by name
   * @param {string} groupName - The name of the group to retrieve
   * @returns {Object|null} The group object or null if not found
   */
  getGroup(groupName) {
    return GroupManager.getGroup(groupName);
  },

  /**
   * Get or create a group
   * @param {string} groupName - The name of the group to retrieve
   * @returns {Object} The group object. This will be a proxy to the group data.
   */
  getOrCreateGroup(groupName, initialData = {}) {
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
  updateGroup(groupName, data) {
    return GroupManager.updateGroup(groupName, data);
  },

  /**
   * Remove a group
   * @param {string} groupName - Name of the group to remove
   */
  removeGroup(groupName) {
    return GroupManager.removeGroup(groupName);
  },

  /**
   * Remove all groups
   */
  removeAllGroups() {
    return GroupManager.removeAllGroups();
  },

  // Logging API
  log: function (level, ...args) {
    // add '[PLUGIN]' before the first argument
    args.unshift(`[PLUGIN]`);
    Debug.log(level, ...args);
    return this;
  },

  // Log levels for use with the log method
  logLevels: Debug.levels,

  // Plugin management methods
  registerPlugin(plugin, config = {}) {
    return this.PluginManager.registerPlugin(plugin, config);
  },

  removePlugin(name) {
    return this.PluginManager.removePlugin(name);
  },

  removeAllPlugins() {
    return this.PluginManager.destroyAll();
  },

  getPlugin(name) {
    return this.PluginManager.getPlugin(name);
  },

  getAllPlugins() {
    return this.PluginManager.getSortedPlugins();
  },

  enablePlugin(name) {
    return this.PluginManager.enablePlugin(name);
  },

  disablePlugin(name) {
    return this.PluginManager.disablePlugin(name);
  },

  pluginConfig(name) {
    return this.PluginManager.pluginConfig(name);
  },

  on: (...args) => EventSystem.subscribe(...args),
  off: (...args) => EventSystem.unsubscribe(...args),
  emit: (...args) => EventSystem.publish(...args),

  debug: function (level) {
    ConfigManager.setConfig({ debug: { level: level } });
    return this;
  },

  templateCache: {
    set: function (templateId, template) {
      const cacheSize = ConfigManager.getConfig().templates.cacheSize;
      const cache = _state.templateCache;

      // If cache is at limit, remove oldest entry
      if (Object.keys(cache).length >= cacheSize) {
        const oldestKey = Object.keys(cache)[0];
        delete cache[oldestKey];
        Debug.info(`Cache limit reached. Removed template: ${oldestKey}`);
      }

      // Add new template to cache
      cache[templateId] = template;
      return template;
    },

    /**
     * Get a template from the cache
     * @param {string} templateId - The ID of the template to get
     * @returns {Object} The template object or all templates if no ID is provided
     */
    get: function (templateId) {
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
    isCached: function (templateId) {
      return !!_state.templateCache[templateId];
    },

    /**
     * Clear a template from the cache
     * @param {string} templateId - The ID of the template to clear
     */
    clear: function (templateId) {
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
    size: function () {
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
  init: function (element = document, options = { render: true }) {
    // If already initialized, just process the element
    if (_state.initialized) {
      Performance.start("init-element");
      Debug.info("Re-initializing FlowPlater for element:", element);
      if (element !== document) {
        process(element);
      }
      Performance.end("init-element");
      return this;
    }

    Performance.start("init");
    Debug.info("Initializing FlowPlater...");

    // Find all templates
    const templates = AttributeMatcher.findMatchingElements("template");

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
          const scriptContents = Array.from(scriptTags).map(
            (script) => script.innerHTML,
          );

          // Temporarily replace script contents with placeholders
          Array.from(scriptTags).forEach((script, i) => {
            script.innerHTML = `##FP_SCRIPT_${i}##`;
          });

          // Do the replacement on the template
          templateElement.innerHTML = templateElement.innerHTML.replace(
            /\[\[(.*?)\]\]/g,
            "{{$1}}",
          );

          // Restore script contents
          Array.from(templateElement.getElementsByTagName("script")).forEach(
            (script, i) => {
              script.innerHTML = scriptContents[i];
            },
          );
        }

        // Compile the template using the templateId from the attribute
        const compiledTemplate = compileTemplate(templateId, true);

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
          const instance = render({
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
    this.PluginManager.executeHook("initComplete", this, _state.instances);

    return this;
  },

  /**
   * @function ready
   * @param {Function} callback - Function to execute when FlowPlater is ready
   * @returns {FlowPlaterObj} The FlowPlater instance
   */
  ready: function (callback) {
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
  cleanup: function (instanceName) {
    if (instanceName) {
      const instance = _state.instances[instanceName];
      if (instance) {
        // Clean up preload listeners
        instance.elements.forEach((element) => {
          if (element._preloadCleanup) {
            element._preloadCleanup();
          }
          // Remove DOM event listeners
          element.removeEventListeners();
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
  version: VERSION,
  author: AUTHOR,
  license: LICENSE,

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
   * @param {Function} helperFn - The helper function
   * @returns {FlowPlaterObj} The FlowPlater instance
   * @description Registers a new Handlebars helper and clears the template cache
   * to ensure all templates are recompiled with the new helper.
   */
  registerTag: function (name, helperFn) {
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
   * @param {HTMLElement} element - The element to trigger the event on
   * @param {Object} detail - The detail object to pass to the event
   */
  trigger: function (name, element = document, detail = {}) {
    if (typeof element === "string") {
      element = document.querySelectorAll(element);
    }
    EventSystem.publish(name, { element, detail });

    if (
      element &&
      !(element instanceof HTMLElement) &&
      !(element instanceof Document)
    ) {
      throw new FlowPlaterError("Invalid element provided to trigger");
    }
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
  create: function (instanceName, options = { refresh: true }) {
    Performance.start(`createInstance:${instanceName}`);
    Debug.info(`Creating FlowPlater instance: ${instanceName}`);

    // Find the element
    let element;
    if (instanceName.startsWith("#")) {
      element = document.getElementById(instanceName.slice(1));
    } else {
      element = AttributeMatcher.findMatchingElements(
        "instance",
        instanceName,
        false,
        document,
        false,
        true,
      );
    }

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
    this.PluginManager.executeHook("newInstance", instance);

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
  findAttribute(element, attributeName) {
    return AttributeMatcher.findAttribute(element, attributeName);
  },

  /**
   * Add a custom transformer function for a specific transformation type
   * @param {string} transformationType - The type of transformation (e.g. 'transformDataBeforeRender', 'transformResponse', 'transformRequest')
   * @param {Function} transformerFn - The transformer function with signature (instance, data, dataType) => transformedData
   *                                  - instance: The FlowPlater instance that triggered the transformation
   *                                  - data: The data to transform
   *                                  - dataType: The type of data being transformed ('json' or 'html')
   * @returns {FlowPlaterObj} The FlowPlater instance for chaining
   * @example
   * FlowPlater.addTransformer('transformDataBeforeRender', (instance, data, dataType) => {
   *   // Transform the data before it's rendered
   *   return { ...data, timestamp: Date.now() };
   * });
   */
  addTransformer(transformationType, transformerFn) {
    this.PluginManager.addTransformer(transformationType, transformerFn);
    return this;
  },

  /**
   * Remove a custom transformer function
   * @param {string} transformationType - The type of transformation
   * @param {Function} transformerFn - The transformer function to remove (must be the same reference as added)
   * @returns {boolean} True if the transformer was found and removed, false otherwise
   * @example
   * const myTransformer = (instance, data, dataType) => ({ ...data, timestamp: Date.now() });
   * FlowPlater.addTransformer('transformDataBeforeRender', myTransformer);
   * // Later...
   * FlowPlater.removeTransformer('transformDataBeforeRender', myTransformer);
   */
  removeTransformer(transformationType, transformerFn) {
    return this.PluginManager.removeTransformer(
      transformationType,
      transformerFn,
    );
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
  clearTransformers(transformationType) {
    this.PluginManager.clearTransformers(transformationType);
    return this;
  },
};

// Read initial config from meta tag and apply it using ConfigManager
let initialConfig = ConfigManager.getDefaultConfig(); // Start with defaults
const metaElement = document.querySelector('meta[name="fp-config"]');
if (metaElement) {
  try {
    const metaConfig = JSON.parse(metaElement.content);
    // Use the imported deepMerge utility, remove the local definition
    initialConfig = deepMerge(initialConfig, metaConfig);
  } catch (e) {
    Debug.error(
      "Error parsing fp-config meta tag content:",
      metaElement.content,
      e,
    );
  }
}
ConfigManager.setConfig(initialConfig); // Apply the combined initial config

EventSystem.publish("loaded");

/* -------------------------------------------------------------------------- */
/* ANCHOR                          Auto init                                  */
/* -------------------------------------------------------------------------- */

/**
 * @description Automatically initializes FlowPlater when the DOM is ready.
 * Uses the ready state system to ensure proper initialization order.
 */
if (document.readyState === "complete" || document.readyState !== "loading") {
  FlowPlaterObj.init();
} else {
  document.addEventListener("DOMContentLoaded", () => FlowPlaterObj.init());
}

export default FlowPlaterObj;
