import { FlowPlaterInstance, FlowPlaterObj, FlowPlaterPlugin } from "../types";
/**
 * @module ExamplePlugin
 * @description Example plugin demonstrating how to create a FlowPlater plugin
 */
/**
 * Example plugin for FlowPlater demonstrating plugin architecture and functionality
 * FlowPlater expects an immediately-invoked function expression (IIFE) to be returned from the plugin function.
 *
 * @function ExamplePlugin
 * @returns {Object} Plugin object containing configuration, state, methods, hooks, transformers, and helpers
 */
declare const ExamplePlugin: (customConfig?: {}) => {
    config: {
        name: string;
        enabled: boolean;
        priority: number;
        version: string;
        dependencies: never[];
        optionalDependencies: never[];
        settings: {
            debug: boolean;
            autoSave: boolean;
        };
        description: string;
        author: string;
    };
    state: {
        initialized: boolean;
        data: {};
    };
    globalMethods: {
        /**
         * Get all instances using this plugin
         * @param {Object} plugin - The plugin instance
         * @returns {Array} Array of all instances using this plugin
         */
        exampleGetInstances(plugin: FlowPlaterPlugin): any[];
        /**
         * Get plugin statistics
         * @param {Object} plugin - The plugin instance
         * @returns {Object} Statistics about the plugin
         */
        exampleGetStats(plugin: FlowPlaterPlugin): {
            totalInstances: number;
            enabled: boolean;
            settings: Record<string, any>;
        };
    };
    instanceMethods: {
        /**
         * Get instance-specific data
         * @param {Object} instance - The FlowPlater instance
         * @returns {Object} Instance data
         */
        exampleGetData(instance: FlowPlaterInstance): ProxyConstructor & Record<string, any>;
        /**
         * Update instance with plugin-specific data
         * @param {Object} instance - The FlowPlater instance
         * @param {Object} newData - New data to update the instance with
         * @returns {Object} Updated instance
         */
        exampleUpdateData(instance: FlowPlaterInstance, newData: any): FlowPlaterInstance;
    };
    hooks: {
        /**
         * Called before an htmx request is made
         * @param {Object} instance - The FlowPlater instance making the request
         * @param {Object} evt - The HTMX event object
         * @returns {Object} The instance
         */
        beforeRequest: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
        /**
         * Called after an htmx request is made
         * @param {Object} instance - The FlowPlater instance that made the request
         * @param {Object} evt - The HTMX event object
         * @returns {Object} The instance
         */
        afterRequest: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
        /**
         * Called before the response is swapped into the DOM
         * @param {Object} instance - The FlowPlater instance that will receive the swap
         * @param {Object} evt - The HTMX event object
         * @returns {Object} The instance
         */
        beforeSwap: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
        /**
         * Called before a DOM update begins
         * @param {Object} instance - The FlowPlater instance being updated
         * @param {Object} context - Object containing update context
         * @param {HTMLElement} context.element - The target element being updated
         * @param {string} context.newHTML - The new HTML content
         * @param {boolean} context.animate - Whether animation is enabled
         * @param {Object} context.formStates - The captured form states (if any)
         * @returns {Object} The instance
         */
        beforeDomUpdate: (instance: FlowPlaterInstance, context: any) => FlowPlaterInstance;
        /**
         * Called after a DOM update is complete
         * @param {Object} instance - The FlowPlater instance that was updated
         * @param {Object} context - Object containing update context
         * @param {HTMLElement} context.element - The target element that was updated
         * @param {string} context.newHTML - The new HTML content
         * @param {boolean} context.animate - Whether animation was enabled
         * @param {Object} context.formStates - The captured form states (if any)
         * @returns {Object} The instance
         */
        afterDomUpdate: (instance: FlowPlaterInstance, context: any) => FlowPlaterInstance;
        /**
         * Called after the response is swapped into the DOM
         * @param {Object} instance - The FlowPlater instance that received the swap
         * @param {Object} evt - The HTMX event object
         * @returns {Object} The instance
         */
        afterSwap: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
        /**
         * Called when a new instance is created
         * @param {Object} instance - The newly created FlowPlater instance
         * @returns {Object} The instance
         */
        newInstance: (instance: FlowPlaterInstance) => FlowPlaterInstance;
        /**
         * Called when a form is updated
         * @param {Object} instance - The FlowPlater instance containing the form
         * @param {Object} form - Object containing form information
         * @param {HTMLElement} form.element - The form DOM element
         * @param {string} form.id - The form's ID
         * @param {Object} form.data - The form's state data
         * @param {HTMLElement} form.changedElement - The element that triggered the change
         * @returns {Object} The instance
         */
        updateForm: (instance: FlowPlaterInstance, form: any) => FlowPlaterInstance;
        /**
         * Called when the instance data is updated
         * @param {Object} instance - The FlowPlater instance being updated
         * @param {Object} data - Object containing update information
         * @param {Object} data.data - The updated instance data
         * @param {Object} data.changes - The changes made to the data
         * @param {string} data.source - The source of the update
         * @returns {Object} The instance
         */
        updateData: (instance: FlowPlaterInstance, data: any) => FlowPlaterInstance;
        /**
         * Called after FlowPlater has fully initialized
         * @param {Object} flowplater - The full FlowPlater object
         * @param {Array} instances - An array of all instances that were created
         * @returns {Object} The FlowPlater object
         */
        initComplete: (flowplater: FlowPlaterObj, instances: any) => FlowPlaterObj;
        /**
         * Called after HTMX settles (all animations complete)
         * @param {Object} instance - The FlowPlater instance
         * @param {Object} evt - The HTMX event object
         * @returns {Object} The instance
         */
        afterSettle: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
        /**
         * Called when an instance is destroyed
         * @param {Object} instance - The FlowPlater instance
         * @returns {Object} The instance
         */
        destroy: (instance: FlowPlaterInstance) => FlowPlaterInstance;
    };
    transformers: {
        /**
         * Transform an HTMX request before it's made
         * This runs during the htmx:configRequest event
         *
         * @param {Object} instance - The FlowPlater instance making the request
         * @param {Object} evt - The HTMX event object containing:
         *   - detail.parameters - The parameters that will be submitted in the request
         *   - detail.unfilteredParameters - The parameters before filtering by hx-params
         *   - detail.headers - The request headers
         *   - detail.elt - The element that triggered the request
         *   - detail.target - The target of the request
         *   - detail.verb - The HTTP verb in use
         * @returns {Object} The modified event object
         */
        transformRequest: (instance: FlowPlaterInstance, evt: any) => any;
        /**
         * Transform an HTMX response after it's received
         * This runs at the start of the transformResponse in the HTMX extension
         *
         * @param {Object} instance - The FlowPlater instance that made the request
         * @param {Object} response - The HTMX response object
         * @param {string} dataType - The type of data being transformed ("html", "xml", or "json")
         * @returns {Object} The modified response object
         */
        transformResponse: (instance: FlowPlaterInstance, response: any, dataType: string) => any;
        /**
         * Transform data before it's passed to the instance for rendering
         * This allows you to modify the data structure before it's used in templates
         *
         * @param {Object} instance - The FlowPlater instance that made the request
         * @param {Object} data - The data object to be rendered
         * @param {string} dataType - The type of data being transformed (always "json" for this transformation)
         * @returns {Object} The modified data object
         */
        transformDataBeforeRender: (instance: FlowPlaterInstance, data: any, dataType: string) => any;
    };
    helpers: {
        /**
         * Custom helper that checks if a value is in an array
         * @param {*} value - The value to check
         * @param {Array} array - The array to check against
         * @returns {boolean} True if the value is in the array, false otherwise
         */
        inarray(value: any, array: any[]): boolean;
        /**
         * Block helper that converts text to uppercase
         * @param {Object} options - Handlebars options object
         * @returns {string} The uppercase text
         */
        uppercase(options: any): string;
    };
};
export default ExamplePlugin;
