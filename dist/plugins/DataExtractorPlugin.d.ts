import { FlowPlaterObj } from "../types";
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
declare const DataExtractorPlugin: (customConfig?: {}) => {
    config: {
        name: string;
        enabled: boolean;
        priority: number;
        version: string;
        dependencies: never[];
        optionalDependencies: never[];
        settings: {
            debug: boolean;
        };
        description: string;
        author: string;
    };
    state: {
        instances: Map<any, any>;
    };
    globalMethods: {
        /**
         * Process HTML string and extract data
         * @param {string} htmlToProcess - HTML string to process
         * @returns {Object} Extracted data as JSON
         */
        processHtml(htmlToProcess: string): {
            [key: string]: any;
        };
    };
    instanceMethods: {
        /**
         * Extracts data from elements with fp-data within a given scope element.
         * @param {HTMLElement} scopeElement - The HTML element to extract data from.
         * @returns {Object} The aggregated extracted data as a JSON object.
         */
        extractData(scopeElement: HTMLElement): {
            [key: string]: any;
        };
        /**
         * Sets up observation for a data element
         * @param {HTMLElement} element - The element to observe
         * @param {string} localVarName - The local variable name to update
         * @param {Object} instance - The instance to update
         */
        observeDataElement(element: HTMLElement, localVarName: string, instance: any): void;
    };
    hooks: {
        /**
         * Called after FlowPlater has fully initialized
         * @param {Object} flowplater - The full FlowPlater object
         * @param {Array} instances - An array of all instances that were created
         * @returns {Object} The FlowPlater object
         */
        initComplete: (flowplater: FlowPlaterObj, instances: any) => FlowPlaterObj;
    };
    transformers: {
        /**
         * Transform an HTMX response after it's received
         * This runs at the start of the transformResponse in the HTMX extension
         *
         * @param {Object} instance - The FlowPlater instance that made the request
         * @param {Object} response - The HTMX response object
         * @param {string} dataType - The type of data being transformed ("html", "xml", or "json")
         * @returns {Object} The modified response object
         */
        transformResponse: (instance: any, response: any, dataType: string) => any;
    };
};
export default DataExtractorPlugin;
