var ExamplePlugin = (function () {
    'use strict';

    const ExamplePlugin = (customConfig = {}) => {
        const config = {
            name: "example",
            enabled: true,
            priority: 0,
            version: "1.0.0",
            dependencies: [],
            optionalDependencies: [],
            settings: {
                debug: false,
                autoSave: true,
            },
            description: "Example plugin demonstrating plugin functionality",
            author: "Your Name",
        };
        Object.assign(config, customConfig);
        let state = {
            initialized: false,
            data: {},
        };
        const globalMethods = {
            exampleGetInstances(plugin) {
                return Object.values(plugin.state?.data || {});
            },
            exampleGetStats(plugin) {
                return {
                    totalInstances: Object.keys(plugin.state?.data || {}).length,
                    enabled: plugin.config.enabled,
                    settings: plugin.config.settings,
                };
            },
        };
        const instanceMethods = {
            exampleGetData(instance) {
                return instance.data;
            },
            exampleUpdateData(instance, newData) {
                instance.update({
                    ...instance.data,
                    pluginData: {
                        ...instance.data.pluginData,
                        ...newData,
                    },
                });
                return instance;
            },
        };
        const hooks = {
            beforeRequest: function (instance, evt) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "beforeRequest", instance, evt);
                return instance;
            },
            afterRequest: function (instance, evt) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "afterRequest", instance, evt);
                return instance;
            },
            beforeSwap: function (instance, evt) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "beforeSwap", instance, evt);
                return instance;
            },
            beforeDomUpdate: function (instance, context) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "beforeDomUpdate", instance, context);
                return instance;
            },
            afterDomUpdate: function (instance, context) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "afterDomUpdate", instance, context);
                return instance;
            },
            afterSwap: function (instance, evt) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "afterSwap", instance, evt);
                return instance;
            },
            newInstance: function (instance) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "newInstance", instance);
                return instance;
            },
            updateForm: function (instance, form) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "updateForm", instance, form);
                return instance;
            },
            updateData: function (instance, data) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "updateData", instance, data);
                return instance;
            },
            initComplete: function (flowplater, instances) {
                if (config.enabled) {
                    FlowPlater.log(FlowPlater.logLevels.INFO, `${config.name} plugin performing post-init setup. Instances: ${instances.length}`);
                }
                return flowplater;
            },
            afterSettle: function (instance, evt) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "afterSettle", instance, evt);
                return instance;
            },
            destroy: function (instance) {
                FlowPlater.log(FlowPlater.logLevels.INFO, "destroy", instance);
                return instance;
            },
        };
        const transformers = {
            transformRequest: function (instance, evt) {
                if (evt && evt.detail && evt.detail.parameters) {
                    evt.detail.parameters["request_timestamp"] = Date.now();
                }
                return evt;
            },
            transformResponse: function (instance, response, dataType) {
                if (response) {
                    response.metadata = {
                        processedAt: Date.now(),
                        instanceName: instance.instanceName,
                        dataType: dataType,
                    };
                }
                return response;
            },
            transformDataBeforeRender: function (instance, data, dataType) {
                if (data) {
                    return {
                        ...data,
                        renderedAt: new Date().toISOString(),
                        dataType: dataType,
                    };
                }
                return data;
            },
        };
        const helpers = {
            inarray(value, array) {
                if (!Array.isArray(array))
                    return false;
                return array.includes(value);
            },
            uppercase(options) {
                return options.fn(this).toUpperCase();
            },
        };
        return {
            config,
            state,
            globalMethods,
            instanceMethods,
            hooks,
            transformers,
            helpers,
        };
    };

    return ExamplePlugin;

})();
