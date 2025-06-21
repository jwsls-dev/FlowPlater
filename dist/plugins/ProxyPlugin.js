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

    const ProxyPlugin = (customConfig = {}) => {
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
        Object.assign(config, customConfig);
        let state = {
            initialized: false,
            data: {},
        };
        const transformers = {
            transformRequest: function (instance, evt) {
                const elt = evt.detail.elt;
                if (!elt || !elt.hasAttribute("fp-proxy")) {
                    return evt;
                }
                try {
                    const proxyUrl = elt.getAttribute("fp-proxy-url") || config.settings.defaultProxyUrl;
                    const originalPath = evt.detail.path;
                    const proxiedUrl = proxyUrl + encodeURIComponent(originalPath);
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
        const hooks = {
            initComplete: function (flowplater) {
                if (config.enabled) {
                    Debug.info(`${config.name} plugin initialized`);
                }
                return flowplater;
            },
        };
        return {
            config,
            state,
            transformers,
            hooks,
        };
    };

    return ProxyPlugin;

})();
