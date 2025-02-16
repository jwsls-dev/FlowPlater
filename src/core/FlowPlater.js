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

var FlowPlater = (function () {
  "use strict";

  const VERSION = "1.4.19";
  const AUTHOR = "JWSLS";
  const LICENSE = "Flowplater standard licence";

  // Default configuration
  const defaultConfig = {
    debug: {
      level: 3,
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
  /* ANCHOR                    setupAnimation(element)                          */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                 process(element = document)                         */
  /* -------------------------------------------------------------------------- */

  const ProcessingChain = {
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

    FP_SELECTOR:
      "[fp-template], [fp-get], [fp-post], [fp-put], [fp-delete], [fp-patch]",

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
      get: function (templateId) {
        if (templateId) {
          return _state.templateCache[templateId];
        }
        return _state.templateCache;
      },
      isCached: function (templateId) {
        return !!_state.templateCache[templateId];
      },
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
      size: function () {
        return Object.keys(_state.templateCache).length;
      },
    },

    init: function (element = document, options = { render: true }) {
      Performance.start("init");
      Debug.log(Debug.levels.INFO, "Initializing FlowPlater...");

      // Process any templates on the page
      const templates = document.querySelectorAll("[fp-template]");
      templates.forEach((template) => {
        const templateId = template.getAttribute("fp-template");
        if (templateId) {
          // Compile the template using the templateId from the attribute
          compileTemplate(templateId, true);
          // Only render if options.render is true
          if (options.render) {
            render({
              template: templateId,
              data: {},
              target: template,
            });
          }
        }
      });

      // Load configuration from meta tag if present
      const metaConfig = document.querySelector('meta[name="fp-config"]');
      if (metaConfig) {
        try {
          const config = JSON.parse(metaConfig.content);
          FlowPlater.configure(config);
        } catch (e) {
          console.error("Error parsing fp-config meta tag:", e);
        }
      }

      // Re-run process to apply potentially updated FP_SELECTOR
      process(element);
      Debug.log(Debug.levels.INFO, "FlowPlater initialized successfully");
      Performance.end("init");
      return this;
    },

    cleanup: function (instanceName) {
      if (instanceName) {
        const instance = _state.instances[instanceName];
        if (instance) {
          // Clean up preload listeners
          instance.elements.forEach((element) => {
            if (element._preloadCleanup) {
              element._preloadCleanup();
            }
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

    getConfig: function () {
      return JSON.parse(JSON.stringify(_state.config));
    },

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

if (document.readyState === "complete" || document.readyState !== "loading") {
  setTimeout(() => {
    try {
      FlowPlater.init();
    } catch (error) {
      console.error("FlowPlater initialization failed:", error);
    }
  }, 1);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
      try {
        FlowPlater.init();
      } catch (error) {
        console.error("FlowPlater initialization failed:", error);
      }
    }, 1);
  });
}
