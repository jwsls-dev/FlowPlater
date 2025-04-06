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
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return instanceMethods.extractData(doc.body) || {};
    },
  };

  const instanceMethods = {
    /**
     * Extracts data from HTML element based on fp-data attributes
     * @param {HTMLElement} element - The HTML element to process
     * @returns {Object} The extracted data as a JSON object
     */
    extractData(element) {
      if (!element) return null;

      // Get all direct children with fp-data attribute
      const dataElements = Array.from(element.children).filter((child) =>
        child.hasAttribute("fp-data"),
      );

      // If no data elements found, return null
      if (dataElements.length === 0) return null;

      // Group elements by their fp-data value
      const groupedElements = dataElements.reduce((acc, elem) => {
        const key = elem.getAttribute("fp-data") || "";
        if (!acc[key]) acc[key] = [];
        acc[key].push(elem);
        return acc;
      }, {});

      // Process each group
      const result = {};
      for (const [key, elements] of Object.entries(groupedElements)) {
        if (elements.length === 1) {
          // Single element - process as object
          const element = elements[0];
          const children = Array.from(element.children).filter((child) =>
            child.hasAttribute("fp-data"),
          );

          if (children.length > 0) {
            // Has children with fp-data - process recursively
            result[key] = this.extractData(element);
          } else {
            // Leaf node - get text content
            result[key] = element.textContent.trim();
          }
        } else {
          // Multiple elements with same key - process as array
          result[key] = elements.map((elem) => {
            const children = Array.from(elem.children).filter((child) =>
              child.hasAttribute("fp-data"),
            );
            return children.length > 0
              ? this.extractData(elem)
              : elem.textContent.trim();
          });
        }
      }

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
