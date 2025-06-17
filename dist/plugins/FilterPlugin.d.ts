/**
 * @module FilterPlugin
 * @description Plugin for filtering data based on form inputs
 */
import { FlowPlaterInstance } from "../types";
/**
 * Filter plugin for FlowPlater that filters data based on form inputs
 *
 * @function FilterPlugin
 * @returns {Object} Plugin object containing configuration, state, methods, hooks, transformers, and helpers
 */
declare const FilterPlugin: (customConfig?: {}) => {
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
        formTemplates: Map<any, any>;
        formObservers: Map<any, any>;
    };
    hooks: {
        /**
         * Called when instance data is updated
         */
        updateData: (instance: FlowPlaterInstance, context: any) => FlowPlaterInstance;
        /**
         * Clean up when plugin is disabled
         */
        cleanup: () => void;
    };
    transformers: {
        /**
         * Transform data before it's passed to the instance for rendering
         * This allows us to filter the data based on form inputs
         *
         * @param {Object} instance - The FlowPlater instance that made the request
         * @param {Object} data - The data object to be rendered
         * @param {string} dataType - The type of data being transformed (always "json" for this transformation)
         * @returns {Object} The modified data object
         */
        transformDataBeforeRender: (instance: FlowPlaterInstance, data: any, dataType: string) => any;
    };
};
export default FilterPlugin;
