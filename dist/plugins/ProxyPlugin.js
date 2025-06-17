var ProxyPlugin = (function () {
    'use strict';

    const Debug = (function () {
        return {
            level: 1,
            levels: {
                ERROR: 0,
                WARN: 1,
                INFO: 2,
                DEBUG: 3,
            },
            log: function (level, ...args) {
                if (level <= this.level) {
                    const prefix = ["ERROR", "WARN", "INFO", "DEBUG"][level];
                    switch (prefix) {
                        case "ERROR":
                            console.error(`FlowPlater [${prefix}]:`, ...args);
                            break;
                        case "WARN":
                            console.warn(`FlowPlater [${prefix}]:`, ...args);
                            break;
                        case "DEBUG":
                            console.debug(`FlowPlater [${prefix}]:`, ...args);
                            break;
                        default:
                            console.log(`FlowPlater [${prefix}]:`, ...args);
                    }
                }
            },
            error: function (...args) {
                this.log(this.levels.ERROR, ...args);
            },
            warn: function (...args) {
                this.log(this.levels.WARN, ...args);
            },
            info: function (...args) {
                this.log(this.levels.INFO, ...args);
            },
            debug: function (...args) {
                this.log(this.levels.DEBUG, ...args);
            },
        };
    })();

    /**
     * @module ProxyPlugin
     * @description Plugin for handling CORS proxy functionality in FlowPlater
     */
    const ProxyPlugin = (customConfig = {}) => {
        /**
         * Plugin configuration object
         * @type {Object}
         * @property {string} name - Name of the plugin
         * @property {boolean} enabled - Whether the plugin is enabled
         * @property {number} priority - Plugin priority (higher numbers run first)
         * @property {string} version - Plugin version
         * @property {Object} settings - Plugin settings
         * @property {string} settings.defaultProxyUrl - Default proxy URL to use
         * @property {boolean} settings.debug - Whether to enable debug logging
         */
        const config = {
            name: "proxy",
            enabled: true,
            priority: 100,
            version: "1.0.0",
            settings: {
                defaultProxyUrl: "https://corsproxy.io/?url=",
                debug: false,
            },
            description: "Handles CORS proxy functionality for HTMX requests",
            author: "FlowPlater Team",
        };
        // Merge custom config with default config
        Object.assign(config, customConfig);
        /**
         * Plugin state object
         * @type {Object}
         * @property {boolean} initialized - Whether the plugin has been initialized
         * @property {Object} data - Plugin-specific data
         */
        let state = {
            initialized: false,
            data: {},
        };
        /**
         * Transformers that apply changes to data in various points in the FlowPlater lifecycle
         * @type {Object}
         */
        const transformers = {
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
            transformRequest: function (instance, evt) {
                const elt = evt.detail.elt;
                if (!elt || !elt.hasAttribute("fp-proxy")) {
                    return evt;
                }
                try {
                    // Get the proxy URL from the element or use default
                    const proxyUrl = elt.getAttribute("fp-proxy-url") || config.settings.defaultProxyUrl;
                    // Get the original path from the event detail
                    const originalPath = evt.detail.path;
                    // Create the proxied URL
                    const proxiedUrl = proxyUrl + encodeURIComponent(originalPath);
                    // Update the path in the event detail
                    evt.detail.path = proxiedUrl;
                    if (config.settings.debug) {
                        Debug.debug(`[ProxyPlugin] Proxying request from ${originalPath} to ${proxiedUrl}`);
                    }
                    return evt;
                }
                catch (error) {
                    Debug.error("[ProxyPlugin] Error in transformRequest transformer:", error);
                    return evt;
                }
            },
        };
        /**
         * Plugin hooks that are called throughout the FlowPlater lifecycle
         * @type {Object}
         */
        const hooks = {
            /**
             * Called after FlowPlater has fully initialized
             * @param {Object} flowplater - The full FlowPlater object
             * @param {Array} instances - An array of all instances that were created
             * @returns {Object} The FlowPlater object
             */
            initComplete: function (flowplater, instances) {
                if (config.enabled) {
                    Debug.info(`${config.name} plugin initialized`);
                }
                return flowplater;
            },
        };
        /**
         * Return the plugin object
         * @returns {Object} Plugin object containing configuration, state, transformers, and hooks
         */
        return {
            config,
            state,
            transformers,
            hooks,
        };
    };

    return ProxyPlugin;

})();
