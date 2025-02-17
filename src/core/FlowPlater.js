import { EventSystem } from "./EventSystem";
import {
  Debug,
  log,
  errorLog,
  FlowPlaterError,
  RenderError,
  TemplateError,
} from "./Debug";
import { _state, getInstance, getInstances } from "./State";
import { compileTemplate, render } from "./Template";
import { Performance } from "../utils/Performance";
import {
  replaceCustomTags,
  setCustomTags,
  customTagList,
} from "./ReplaceCustomTags";
import { registerHelpers } from "../helpers/index";
import { RequestHandler } from "./RequestHandler";
import { defineHtmxExtension } from "./DefineHtmxExtension";
import { setupProxy } from "./SetupProxy";
import { processPreload } from "./ProcessPreload";
import { translateCustomHTMXAttributes } from "./TranslateHtmxAttributes";
import { processUrlAffixes } from "./ProcessUrlAffixes";
import { animate } from "./Animate";
import { setupAnimation } from "./SetupAnimation";
import { addHtmxExtensionAttribute } from "./AddHtmxExtensionAttribute";

/* -------------------------------------------------------------------------- */
/* ANCHOR                      FlowPlater module                              */
/* -------------------------------------------------------------------------- */

/**
 * @namespace FlowPlater
 * @description Core FlowPlater module that provides template processing and dynamic content management.
 * Integrates with HTMX and Handlebars to provide a seamless templating and interaction experience.
 * @version 1.4.19
 * @author JWSLS
 * @license Flowplater standard licence
 */
var FlowPlater = (function () {
  "use strict";

  const VERSION = "1.4.19";
  const AUTHOR = "JWSLS";
  const LICENSE = "Flowplater standard licence";

  /**
   * @typedef {Object} FlowPlaterConfig
   * @property {Object} debug - Debug configuration settings
   * @property {number} debug.level - Debug level (0-3, 0 = error, 1 = warning, 2 = info, 3 = debug)
   * @property {boolean} debug.enabled - Enable/disable debug mode
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
   */
  const defaultConfig = {
    debug: {
      level: window.location.hostname.endsWith(".webflow.io") ? 3 : 1,
      enabled: true,
    },
    selectors: {
      fp: "[fp-template], [fp-get], [fp-post], [fp-put], [fp-delete], [fp-patch]",
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
    },
    customTags: customTagList,
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
  _state.config = JSON.parse(JSON.stringify(defaultConfig));

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
        name: "proxy",
        process: setupProxy,
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

    /**
     * @type {string}
     * @description Selector used to identify FlowPlater elements in the DOM
     */
    FP_SELECTOR: "[fp-template], [fp-get], [fp-post], [fp-delete], [fp-patch]",

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
            Debug.log(
              Debug.levels.ERROR,
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
    // If processing document or non-matching element, find and process all matching children
    if (element === document || !element.matches(ProcessingChain.FP_SELECTOR)) {
      const fpElements = element.querySelectorAll(ProcessingChain.FP_SELECTOR);
      fpElements.forEach((el) => ProcessingChain.processElement(el));
      return;
    }

    // Process single matching element
    ProcessingChain.processElement(element);
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

    on: (...args) => EventSystem.subscribe(...args),
    off: (...args) => EventSystem.unsubscribe(...args),
    emit: (...args) => EventSystem.publish(...args),

    debug: function (level) {
      Debug.level = level;
      return this;
    },

    templateCache: {
      set: function (templateId, template) {
        const cacheSize = _state.config.templates.cacheSize;
        const cache = _state.templateCache;

        // If cache is at limit, remove oldest entry
        if (Object.keys(cache).length >= cacheSize) {
          const oldestKey = Object.keys(cache)[0];
          delete cache[oldestKey];
          Debug.log(
            Debug.levels.INFO,
            `Cache limit reached. Removed template: ${oldestKey}`,
          );
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
          Debug.log(
            Debug.levels.INFO,
            `Cleared template cache for: ${templateId}`,
          );
        } else {
          _state.templateCache = {};
          Debug.log(Debug.levels.INFO, "Cleared entire template cache");
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
      Performance.start("init");
      Debug.log(Debug.levels.INFO, "Initializing FlowPlater...");

      // Process any templates on the page
      const templates = document.querySelectorAll("[fp-template]");
      templates.forEach((template) => {
        let templateId = template.getAttribute("fp-template");
        if (templateId === "self" || templateId === "") {
          templateId = template.id;
        }

        if (templateId) {
          // Compile the template using the templateId from the attribute
          compileTemplate(templateId, true);

          // Only render if options.render is true AND element doesn't have HTMX/FP methods
          if (options.render) {
            const methods = ["get", "post", "put", "patch", "delete"];
            const hasHtmxMethod = methods.some(
              (method) =>
                template.hasAttribute(`hx-${method}`) ||
                template.hasAttribute(`fp-${method}`),
            );

            if (!hasHtmxMethod) {
              render({
                template: templateId,
                data: {},
                target: template,
              });
            } else {
              Debug.log(
                Debug.levels.INFO,
                `Skipping initial render for template with HTMX/FP methods: ${templateId}`,
              );
            }
          }
        } else {
          errorLog(
            `No template ID found for element: ${template.id}`,
            template,
            "Make sure your template has an ID attribute",
          );
        }
      });

      // Load configuration from meta tag if present
      const metaConfig = document.querySelector('meta[name="fp-config"]');
      if (metaConfig) {
        try {
          const config = JSON.parse(metaConfig.content);
          FlowPlater.config(config);
        } catch (e) {
          errorLog(
            "Error parsing fp-config meta tag:",
            metaConfig,
            "Make sure your meta tag is valid",
          );
        }
      }

      process(element);
      Debug.log(Debug.levels.INFO, "FlowPlater initialized successfully");
      Performance.end("init");
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
          log(`Cleaned up instance: ${instanceName}`);
        }
      } else {
        // Clean up all instances
        Object.keys(_state.instances).forEach((name) => {
          this.cleanup(name);
        });
        log("Cleaned up all instances");
      }
      return this;
    },

    // Public version info
    version: VERSION,
    author: AUTHOR,
    license: LICENSE,

    // Add method to modify custom tags
    setCustomTags: setCustomTags,

    /**
     * @function config
     * @param {FlowPlaterConfig} [newConfig={}] - Configuration options to apply
     * @returns {FlowPlaterObj} The FlowPlater instance
     * @description Configures FlowPlater with new settings. Deep merges with existing configuration.
     */
    config: function (newConfig = {}) {
      // Deep merge configuration
      function deepMerge(target, source) {
        for (const key in source) {
          if (source[key] instanceof Object && key in target) {
            deepMerge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
        return target;
      }

      // Merge with current config in state
      _state.config = deepMerge(
        JSON.parse(JSON.stringify(_state.config)),
        newConfig,
      );

      // Apply configuration
      Debug.level = _state.config.debug.level;
      Debug.debugMode = _state.config.debug.enabled;
      ProcessingChain.FP_SELECTOR = _state.config.selectors.fp;

      // Configure HTMX defaults if needed
      if (typeof htmx !== "undefined") {
        htmx.config.timeout = _state.config.htmx.timeout;
        htmx.config.defaultSwapStyle = _state.config.htmx.swapStyle;
      }

      // Set custom tags
      if (newConfig.customTags) {
        setCustomTags(newConfig.customTags);
      }

      Debug.log(
        Debug.levels.INFO,
        "FlowPlater configured with:",
        _state.config,
      );

      return this;
    },

    /**
     * Get the current configuration
     * @returns {Object} The current configuration
     */
    getConfig: function () {
      return JSON.parse(JSON.stringify(_state.config));
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

      log("Cleaned up all instances");
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
      Debug.log(
        Debug.levels.INFO,
        `Creating FlowPlater instance: ${instanceName}`,
      );

      // Find the element
      let element;
      if (instanceName.startsWith("#")) {
        element = document.getElementById(instanceName.slice(1));
      } else {
        element = document.querySelector(`[fp-instance="${instanceName}"]`);
      }

      if (!element) {
        throw new FlowPlaterError(
          `Could not find element for instance: ${instanceName}`,
        );
      }

      // Clear any existing template cache for this instance
      const templateId = element.getAttribute("fp-template");
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

      if (options.refresh) {
        instance.refresh();
      }

      Debug.log(
        Debug.levels.INFO,
        `Instance created successfully: ${instanceName}`,
      );
      Performance.end(`createInstance:${instanceName}`);

      return instance;
    },
  };

  // Initialize with default configuration
  FlowPlaterObj.config();

  return FlowPlaterObj;
})();

/* -------------------------------------------------------------------------- */
/* ANCHOR                          Auto init                                  */
/* -------------------------------------------------------------------------- */

/**
 * @description Automatically initializes FlowPlater when the DOM is ready.
 * Uses a small timeout to ensure proper initialization after other scripts.
 */
if (document.readyState === "complete" || document.readyState !== "loading") {
  setTimeout(() => {
    try {
      FlowPlater.init();
    } catch (error) {
      errorLog("FlowPlater initialization failed:", error);
    }
  }, 1);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
      try {
        FlowPlater.init();
      } catch (error) {
        errorLog("FlowPlater initialization failed:", error);
      }
    }, 1);
  });
}
