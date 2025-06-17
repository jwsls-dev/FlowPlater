import { FlowPlaterInstance, FlowPlaterObj } from "../types";
/**
 * @module ProxyPlugin
 * @description Plugin for handling CORS proxy functionality in FlowPlater
 */
declare const ProxyPlugin: (customConfig?: {}) => {
    config: {
        name: string;
        enabled: boolean;
        priority: number;
        version: string;
        settings: {
            defaultProxyUrl: string;
            debug: boolean;
        };
        description: string;
        author: string;
    };
    state: {
        initialized: boolean;
        data: {};
    };
    transformers: {
        /**
         * Transform an HTMX request before it's made
         * This runs during the htmx:configRequest event
         *
         * @param {Object} instance - The FlowPlater instance making the request
         * @param {Object} evt - The HTMX event object containing:
         *   - detail.elt - The element that triggered the request
         *   - detail.path - The path of the request
         *   - detail.parameters - The request parameters
         *   - detail.headers - The request headers
         * @returns {Object} The modified event object
         */
        transformRequest: (instance: FlowPlaterInstance, evt: any) => any;
    };
    hooks: {
        /**
         * Called after FlowPlater has fully initialized
         * @param {Object} flowplater - The full FlowPlater object
         * @param {Array} instances - An array of all instances that were created
         * @returns {Object} The FlowPlater object
         */
        initComplete: (flowplater: FlowPlaterObj, instances: FlowPlaterInstance[]) => FlowPlaterObj;
    };
};
export default ProxyPlugin;
