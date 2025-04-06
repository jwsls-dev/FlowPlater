import { Debug } from "../core/Debug";

/**
 * @module DataExtractorPlugin
 * @description Plugin for transforming HTML with fp-data attributes into JSON data
 */

/**
 * DataExtractor plugin for FlowPlater that transforms HTML with fp-data attributes into JSON
 *
 * @function DataExtractorPlugin
 * @returns {Object} Plugin object containing configuration, state, methods, hooks, transformers, and helpers
 */
const DataExtractorPlugin = () => {
  const config = {
    name: "data-extractor",
    enabled: true,
    priority: 0,
    version: "1.0.0",
    dependencies: [],
    optionalDependencies: [],
    settings: {
      debug: false,
    },
    description: "Transforms HTML with fp-data attributes into JSON data",
    author: "FlowPlater Team",
  };

  const state = {
    instances: new Map(),
  };

  const globalMethods = {
    /**
     * Process HTML string and extract data
     * @param {string} html - HTML string to process
     * @returns {Object} Extracted data as JSON
     */
    processHtml(html) {
      FlowPlater.log(
        FlowPlater.logLevels.DEBUG,
        "[DataExtractor] Processing HTML:",
        html,
      );
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const result = instanceMethods.extractData(doc.body) || {};
      FlowPlater.log(
        FlowPlater.logLevels.DEBUG,
        "[DataExtractor] Extraction result:",
        result,
      );
      return result;
    },
  };

  const instanceMethods = {
    /**
     * Extracts data from HTML element based on fp-data attributes
     * @param {HTMLElement} element - The HTML element to process
     * @returns {Object} The extracted data as a JSON object
     */
    extractData(element) {
      if (!element) {
        FlowPlater.log(
          FlowPlater.logLevels.DEBUG,
          "[DataExtractor] No element provided",
        );
        return null;
      }

      // First handle if this element has fp-data
      if (element.hasAttribute("fp-data")) {
        const key = element.getAttribute("fp-data");

        // Check for span children with fp-data
        const spans = element.querySelectorAll("span[fp-data]");
        if (spans.length > 0) {
          // Process all spans
          const data = {};
          spans.forEach((span) => {
            const spanKey = span.getAttribute("fp-data");
            data[spanKey] = span.textContent.trim();
          });
          return { [key]: data };
        }

        // No spans, return the element's text content
        return { [key]: element.textContent.trim() };
      }

      // Look for any elements with fp-data
      const dataElements = element.querySelectorAll("[fp-data]");

      if (dataElements.length === 0) {
        FlowPlater.log(
          FlowPlater.logLevels.INFO,
          "[DataExtractor] No data elements found",
        );
        return {};
      }

      // Process root level elements with fp-data
      const result = {};
      dataElements.forEach((el) => {
        if (el.parentElement.hasAttribute("fp-data")) {
          // Skip nested elements, they'll be handled by their parent
          return;
        }
        const extracted = this.extractData(el);
        if (extracted) {
          Object.assign(result, extracted);
        }
      });

      return result;
    },
  };

  const hooks = {
    /**
     * Called after FlowPlater has fully initialized
     * @param {Object} flowplater - The full FlowPlater object
     * @param {Array} instances - An array of all instances that were created
     * @returns {Object} The FlowPlater object
     */
    initComplete: function (flowplater, instances) {
      if (config.enabled && config.settings.debug) {
        FlowPlater.log(
          FlowPlater.logLevels.INFO,
          `${config.name} plugin initialized`,
        );
      }
      return flowplater;
    },
  };

  const transformers = {
    /**
     * Transform an HTMX response after it's received
     * This runs at the start of the transformResponse in the HTMX extension
     *
     * @param {Object} instance - The FlowPlater instance that made the request
     * @param {Object} response - The HTMX response object
     * @param {string} dataType - The type of data being transformed ("html", "xml", or "json")
     * @returns {Object} The modified response object
     */
    transformResponse: function (instance, response, dataType) {
      if (response && dataType === "html") {
        // Check if the instance element has fp-extract-data attribute
        if (
          instance.element &&
          instance.element.hasAttribute("fp-extract-data")
        ) {
          return globalMethods.processHtml(response);
        }
      }
      return response;
    },
  };

  return {
    config,
    state,
    globalMethods,
    instanceMethods,
    hooks,
    transformers,
  };
};

export default DataExtractorPlugin;
