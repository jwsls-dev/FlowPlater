import { Debug, FlowPlaterError } from "./Debug";
import { _state } from "./State";
import { _readyState } from "./ReadyState";
import { AttributeMatcher } from "../dom/AttributeMatcher";
import { 
  FlowPlaterPlugin, 
  FlowPlaterInstance, 
  FlowPlaterPluginTransformers, 
  FlowPlaterPluginHooks,
  TransformerFunction,
  RequestTransformerFunction,
  TransformerDataType,
  NamedTransformer,
} from "../types";

// Version management utilities
const VersionManager = {
  parseVersion(version: string) {
    return version.split(".").map(Number);
  },

  compareVersions(v1: string, v2: string) {
    const v1Parts = this.parseVersion(v1);
    const v2Parts = this.parseVersion(v2);

    for (let i = 0; i < 3; i++) {
      if (v1Parts[i] > v2Parts[i]) return 1;
      if (v1Parts[i] < v2Parts[i]) return -1;
    }
    return 0;
  },

  satisfiesVersion(required: string, actual: string) {
    if (!required || !actual) return false;

    // Handle @ syntax (e.g., "plugin@2.1")
    // @ts-ignore
    const [pluginName, version] = required.split("@");
    if (!version) return true; // No version requirement

    return this.compareVersions(actual, version) >= 0;
  },
};

export const PluginManager = {
  plugins: new Map(),
  globalMethods: new Map(),
  instanceMethods: new Map(),
  customTransformers: new Map(), // Store custom transformers by type (Map<string, NamedTransformer[]>)

  // Helper method to execute initComplete hook for a plugin
  _executeInitCompleteHook(pluginInstance: FlowPlaterPlugin) {
    if (pluginInstance.hooks?.initComplete) {
      try {
        pluginInstance.hooks.initComplete(
          window.FlowPlater ? window.FlowPlater : undefined,
          Object.values(_state.instances),
        );
      } catch (error) {
        Debug.error(
          `Plugin ${pluginInstance.config.name} failed executing initComplete:`,
          error,
        );
      }
    }
  },

  registerPlugin(plugin: FlowPlaterPlugin | string | Function, config = {}) {
    let pluginFunction: Function;
    
    if (typeof plugin === "string") {
      pluginFunction = window[plugin];
    } else {
      pluginFunction = plugin as Function;
    }

    if (!pluginFunction) {
      throw new FlowPlaterError(`Plugin not found: ${plugin}`);
    }

    if (typeof pluginFunction !== "function") {
      throw new FlowPlaterError("Plugin must be a valid function");
    }

    const pluginInstance = pluginFunction(config);

    // Validate required config fields
    const requiredFields = ["name", "enabled", "priority", "version"];
    for (const field of requiredFields) {
      if (!(field in pluginInstance.config)) {
        throw new FlowPlaterError(`Plugin config must contain '${field}'`);
      }
    }

    // Validate version format
    if (!/^\d+\.\d+\.\d+$/.test(pluginInstance.config.version)) {
      throw new FlowPlaterError(
        `Plugin version must be in format 'x.y.z' (got ${pluginInstance.config.version})`,
      );
    }

    if (this.plugins.has(pluginInstance.config.name)) {
      throw new FlowPlaterError(
        `Plugin ${pluginInstance.config.name} already registered`,
      );
    }

    // Check dependencies
    if (pluginInstance.config.dependencies) {
      for (const dep of pluginInstance.config.dependencies) {
        const [depName, depVersion] = dep.split("@");
        const depPlugin = this.getPlugin(depName);

        if (!depPlugin) {
          throw new FlowPlaterError(
            `Required dependency '${depName}' not found for plugin ${pluginInstance.config.name}`,
          );
        }

        if (!VersionManager.satisfiesVersion(dep, depPlugin.config.version)) {
          throw new FlowPlaterError(
            `Plugin ${pluginInstance.config.name} requires ${depName} version ${
              depVersion || "any"
            }, but found version ${depPlugin.config.version}`,
          );
        }
      }
    }

    // Check optional dependencies
    if (pluginInstance.config.optionalDependencies) {
      for (const dep of pluginInstance.config.optionalDependencies) {
        const [depName, depVersion] = dep.split("@");
        const depPlugin = this.getPlugin(depName);

        if (
          depPlugin &&
          !VersionManager.satisfiesVersion(dep, depPlugin.config.version)
        ) {
          Debug.warn(
            `Optional dependency '${depName}' version mismatch for plugin ${
              pluginInstance.config.name
            }. Required: ${depVersion || "any"}, Found: ${
              depPlugin.config.version
            }`,
          );
        }
      }
    }

    // Handle inheritable attributes
    if (
      pluginInstance.inheritableAttributes &&
      Array.isArray(pluginInstance.inheritableAttributes)
    ) {
      pluginInstance.inheritableAttributes.forEach((attributeName: string) => {
        AttributeMatcher.addInheritableAttribute("fp-", attributeName);
      });
    }

    // Add to ready state tracking
    _readyState.registerPlugin(pluginInstance.config.name);

    // Register methods and helpers immediately
    if (pluginInstance.globalMethods) {
      for (const [methodName, method] of Object.entries(
        pluginInstance.globalMethods,
      )) {
        if (typeof method !== "function") {
          throw new FlowPlaterError(
            `Global method ${methodName} must be a function`,
          );
        }
        if (this.globalMethods.has(methodName)) {
          const existing = this.globalMethods.get(methodName);
          throw new FlowPlaterError(
            `Global method ${methodName} already registered by plugin ${existing.plugin}`,
          );
        }
        this.globalMethods.set(methodName, {
          method,
          plugin: pluginInstance.config.name,
        });
        if (window.FlowPlater) {
          window.FlowPlater[methodName] = (...args: any[]) =>
            this.executeGlobalMethod(methodName, ...args);
        }
      }
    }

    if (pluginInstance.instanceMethods) {
      for (const [methodName, method] of Object.entries(
        pluginInstance.instanceMethods,
      )) {
        if (typeof method !== "function") {
          throw new FlowPlaterError(
            `Instance method ${methodName} must be a function`,
          );
        }
        if (this.instanceMethods.has(methodName)) {
          const existing = this.instanceMethods.get(methodName);
          throw new FlowPlaterError(
            `Instance method ${methodName} already registered by plugin ${existing.plugin}`,
          );
        }
        this.instanceMethods.set(methodName, {
          method,
          plugin: pluginInstance.config.name,
        });
      }
    }

    if (pluginInstance.helpers && typeof pluginInstance.helpers === "object") {
      for (const [helperName, helper] of Object.entries(
        pluginInstance.helpers,
      )) {
        if (typeof helper !== "function") {
          Debug.warn(
            `Plugin ${pluginInstance.config.name} contains invalid helper ${helperName}:`,
            helper,
          );
          continue;
        }
        try {
          Handlebars.registerHelper(helperName.toLowerCase(), helper as Handlebars.HelperDelegate);
        } catch (error) {
          Debug.error(
            `Plugin ${pluginInstance.config.name} failed registering helper ${helperName}:`,
            error,
          );
        }
      }
    }

    // Store the plugin instance
    this.plugins.set(pluginInstance.config.name, pluginInstance);

    // Queue initialization if FlowPlater isn't ready yet
    if (!_readyState.isReady) {
      _readyState.queue.push(() => {
        if (
          pluginInstance.config?.enabled &&
          typeof pluginInstance.init === "function"
        ) {
          pluginInstance.init();
        }
        // Update existing instances with new plugin methods
        this.updateExistingInstances();
        // Execute initComplete hook
        this._executeInitCompleteHook(pluginInstance);
      });
    } else {
      // Initialize immediately if FlowPlater is ready
      if (
        pluginInstance.config?.enabled &&
        typeof pluginInstance.init === "function"
      ) {
        pluginInstance.init();
      }
      this.updateExistingInstances();
      this._executeInitCompleteHook(pluginInstance);
    }

    return pluginInstance;
  },

  updateExistingInstances() {
    // Get all instances
    const instances = Object.values(_state.instances);

    // For each instance, add any missing plugin methods
    instances.forEach((instance) => {
      // @ts-ignore
      for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
        if (!instance[methodName as keyof FlowPlaterInstance]) {
          instance[methodName as keyof FlowPlaterInstance] = (...args: any[]) =>
            this.executeInstanceMethod(methodName, instance, ...args);
        }
      }
    });
  },

  getPlugin(name: string): FlowPlaterPlugin | undefined {
    return this.plugins.get(name);
  },

  getAllPlugins(): FlowPlaterPlugin[] {
    return Array.from(this.plugins.values());
  },

  getEnabledPlugins() {
    return this.getAllPlugins().filter((plugin) => plugin.config?.enabled);
  },

  removePlugin(name: string) {
    const plugin = this.getPlugin(name);
    if (!plugin) {
      return false;
    }

    // Remove inheritable attributes
    if (
      plugin.inheritableAttributes &&
      Array.isArray(plugin.inheritableAttributes)
    ) {
      plugin.inheritableAttributes.forEach((attributeName) => {
        AttributeMatcher.removeInheritableAttribute("fp-", attributeName);
      });
    }

    // Store methods to remove before deleting from maps
    const methodsToRemove = new Set();
    for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
      if (methodInfo.plugin === name) {
        methodsToRemove.add(methodName);
      }
    }

    // Remove global methods
    for (const [methodName, methodInfo] of this.globalMethods.entries()) {
      if (methodInfo.plugin === name) {
        this.globalMethods.delete(methodName);
        // Remove method from FlowPlater object
        if (window.FlowPlater) {
          delete window.FlowPlater[methodName];
        }
      }
    }

    // Remove instance methods from the manager
    for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
      if (methodInfo.plugin === name) {
        this.instanceMethods.delete(methodName);
      }
    }

    // Remove instance methods from all instances
    const instances = Object.values(_state.instances);
    instances.forEach((instance) => {
      methodsToRemove.forEach((methodName) => {
        delete instance[methodName as keyof FlowPlaterInstance];
      });
    });

    // Unregister from ready state
    _readyState.unregisterPlugin(name);

    return this.plugins.delete(name);
  },

  disablePlugin(name: string) {
    const plugin = this.getPlugin(name);
    if (!plugin) return false;
    plugin.config.enabled = false;
    return true;
  },

  enablePlugin(name: string) {
    const plugin = this.getPlugin(name);
    if (!plugin) return false;
    plugin.config.enabled = true;
    // Initialize if not already initialized
    if (typeof plugin.init === "function" && !plugin.state?.initialized) {
      plugin.init();
      plugin.state!.initialized = true;
    }
    return true;
  },

  pluginConfig(name: string) {
    const plugin = this.getPlugin(name);
    if (!plugin) return null;
    return plugin.config;
  },

  // Helper method to sort plugins by priority
  getSortedPlugins() {
    return this.getEnabledPlugins().sort((a, b) => {
      const priorityA = a.config?.priority || 0;
      const priorityB = b.config?.priority || 0;
      return priorityB - priorityA; // Higher priority first
    });
  },

  // Helper function to determine if data is JSON or HTML
  _determineDataType(data: any) {
    // If it's already an object, it's JSON
    if (typeof data === "object" && data !== null) {
      return "json";
    }

    // If it's a string, try to parse it as JSON
    if (typeof data === "string") {
      try {
        JSON.parse(data);
        return "json";
      } catch (e) {
        // If it's not parseable as JSON, assume it's HTML
        return "html";
      }
    }

    // For any other type, assume it's JSON
    return "json";
  },

  // Apply transformations from all enabled plugins in priority order
  applyTransformations(instance: FlowPlaterInstance, data: any, transformationType: string, dataType: TransformerDataType = "json") {
    // Validate instance
    if (!instance || typeof instance !== "object") {
      Debug.error("Invalid instance provided to applyTransformations");
      return data;
    }

    Debug.debug(`[Transform] Starting ${transformationType}`, {
      instance: instance.instanceName,
      isEvent: data instanceof Event,
      dataType: typeof data,
      isProxy: data && typeof data === "object" && "toJSON" in data,
    });

    // Get plugins in priority order
    const plugins = this.getSortedPlugins();

    // Apply each plugin's transformation if it exists
    let transformedData = plugins.reduce((transformedData, plugin) => {
      // Check if plugin has transformers and the specific transformation type
      if (
        plugin.transformers &&
        typeof plugin.transformers[transformationType as keyof FlowPlaterPluginTransformers] === "function"
      ) {
        try {
          Debug.debug(
            `[Transform] Applying ${plugin.config.name}'s ${transformationType}`,
            {
              dataType: typeof transformedData,
              isEvent: transformedData instanceof Event,
            },
          );

          // Apply the transformation
          const transformerFn = plugin.transformers[transformationType as keyof FlowPlaterPluginTransformers];
          const result = transformerFn?.(
            instance,
            transformedData,
            dataType,
          );

          // If the result is undefined or null, return the original data
          if (result === undefined || result === null) {
            Debug.warn(
              `Plugin ${plugin.config.name} returned undefined/null for ${transformationType}, using original data`,
            );
            return transformedData;
          }

          // For event transformations, ensure we preserve the event object structure
          if (transformedData instanceof Event && result instanceof Event) {
            // For events, we want to preserve the event object but update its properties
            Object.assign((transformedData as any).detail, (result as any).detail);
            return transformedData;
          }

          Debug.debug(`[Transform] ${plugin.config.name}'s transform result:`, {
            resultType: typeof result,
            isEvent: result instanceof Event,
            isProxy: result && typeof result === "object" && "toJSON" in result,
          });

          return result;
        } catch (error) {
          Debug.error(
            `Plugin ${plugin.config.name} failed executing ${transformationType} transformation:`,
            error,
          );
          return transformedData; // Return unmodified data if transformation fails
        }
      }
      return transformedData;
    }, data);

    // Apply custom transformers after plugin transformers
    const customTransformers =
      this.customTransformers.get(transformationType) as NamedTransformer[] || [];

    if (customTransformers.length > 0) {
      Debug.debug(
        `[Transform] Applying ${customTransformers.length} custom transformers for ${transformationType}`,
      );
    }

    transformedData = customTransformers.reduce(
      (transformedData: any, namedTransformer: NamedTransformer, index: number) => {
        try {
          Debug.debug(
            `[Transform] Applying custom transformer '${namedTransformer.name}' (${index + 1}/${
              customTransformers.length
            })`,
            {
              dataType: typeof transformedData,
              isEvent: transformedData instanceof Event,
            },
          );

          // Apply the custom transformation with the instance context
          const result = namedTransformer.fn.call(
            null,
            instance,
            transformedData,
            dataType,
          );

          // If the result is undefined or null, return the original data
          if (result === undefined || result === null) {
            Debug.warn(
              `Custom transformer '${namedTransformer.name}' returned undefined/null for ${transformationType}, using original data`,
            );
            return transformedData;
          }

          // For event transformations, ensure we preserve the event object structure
          if (transformedData instanceof Event && result instanceof Event) {
            // For events, we want to preserve the event object but update its properties
            Object.assign((transformedData as any).detail, (result as any).detail);
            return transformedData;
          }

          Debug.debug(`[Transform] Custom transformer '${namedTransformer.name}' result:`, {
            resultType: typeof result,
            isEvent: result instanceof Event,
            isProxy: result && typeof result === "object" && "toJSON" in result,
          });

          return result;
        } catch (error) {
          Debug.error(
            `Custom transformer '${namedTransformer.name}' failed executing ${transformationType} transformation:`,
            error,
          );
          return transformedData; // Return unmodified data if transformation fails
        }
      },
      transformedData,
    );

    Debug.debug(`[Transform] Completed ${transformationType}`, {
      finalDataType: typeof transformedData,
      isEvent: transformedData instanceof Event,
      isProxy:
        transformedData &&
        typeof transformedData === "object" &&
        "toJSON" in transformedData,
    });

    return transformedData;
  },

  // Add a custom transformer function for a specific transformation type
  addTransformer(transformationType: string, transformerFn: TransformerFunction | RequestTransformerFunction, transformerName?: string) {
    if (typeof transformerFn !== "function") {
      throw new FlowPlaterError("Transformer must be a function");
    }

    // Generate automatic name if not provided
    if (!transformerName) {
      // Get existing transformer count for this type
      const existingTransformers = this.customTransformers.get(transformationType) || [];
      transformerName = `${transformationType}_${existingTransformers.length + 1}_${Date.now()}`;
    }

    // Validate transformer function signature based on type
    const fnStr = transformerFn.toString();
    if (transformationType === "transformRequest") {
      if (!fnStr.includes("instance") || !fnStr.includes("evt")) {
        Debug.warn(
          "Request transformer function should accept (instance, evt) parameters",
        );
      }
    } else if (transformationType === "transformResponse") {
      if (!fnStr.includes("instance") || !(fnStr.includes("response") || fnStr.includes("data"))) {
        Debug.warn(
          "Response transformer function should accept (instance, response, dataType) parameters",
        );
      }
    } else {
      if (!fnStr.includes("instance") || !fnStr.includes("data")) {
        Debug.warn(
          "Transformer function should accept (instance, data, dataType) parameters",
        );
      }
    }

    // Initialize array for this transformation type if it doesn't exist
    if (!this.customTransformers.has(transformationType)) {
      this.customTransformers.set(transformationType, []);
    }

    // Check if a transformer with this name already exists
    const existingTransformers = this.customTransformers.get(transformationType) as NamedTransformer[];
    const existingIndex = existingTransformers.findIndex((t: NamedTransformer) => t.name === transformerName);
    
    if (existingIndex !== -1) {
      // Replace existing transformer with same name
      existingTransformers[existingIndex] = { name: transformerName, fn: transformerFn };
      Debug.debug(`Replaced custom transformer '${transformerName}' for ${transformationType}`);
    } else {
      // Add new transformer
      existingTransformers.push({ name: transformerName, fn: transformerFn });
      Debug.debug(`Added custom transformer '${transformerName}' for ${transformationType}`);
    }

    return this; // For method chaining
  },

  // Remove a custom transformer function by name
  removeTransformer(transformationType: string, transformerName: string) {
    if (!this.customTransformers.has(transformationType)) {
      return false;
    }

    const transformers = this.customTransformers.get(transformationType) as NamedTransformer[];
    const index = transformers.findIndex((t: NamedTransformer) => t.name === transformerName);

    if (index === -1) {
      Debug.warn(`Transformer '${transformerName}' not found for type '${transformationType}'`);
      return false;
    }

    transformers.splice(index, 1);

    // Remove the transformation type if no transformers left
    if (transformers.length === 0) {
      this.customTransformers.delete(transformationType);
    }

    Debug.debug(`Removed custom transformer '${transformerName}' for ${transformationType}`);
    return true;
  },

  // Clear all custom transformers for a specific type
  clearTransformers(transformationType: string) {
    if (!transformationType) {
      // Clear all transformers if no type specified
      this.customTransformers.clear();
      Debug.debug("Cleared all custom transformers");
    } else {
      this.customTransformers.delete(transformationType);
      Debug.debug(`Cleared custom transformers for ${transformationType}`);
    }
    return this;
  },

  // List all custom transformers
  listTransformers(transformationType?: string): Record<string, NamedTransformer[]> | NamedTransformer[] {
    if (transformationType) {
      return this.customTransformers.get(transformationType) as NamedTransformer[] || [];
    } else {
      const result: Record<string, NamedTransformer[]> = {};
      for (const [type, transformers] of this.customTransformers.entries()) {
        result[type] = transformers as NamedTransformer[];
      }
      return result;
    }
  },

  executeHook(hookName: string, ...args: any[]) {
    Debug.debug("[PLUGIN] Executing hook:", hookName, args);

    const plugins = this.getSortedPlugins();
    let result = args[0]; // Store initial value

    for (const plugin of plugins) {
      if (plugin.hooks?.[hookName as keyof FlowPlaterPluginHooks]) {
        try {
          const hookFn = plugin.hooks?.[hookName as keyof FlowPlaterPluginHooks] as any;
          const hookResult = hookFn?.(...args);
          // Allow hooks to modify the value
          if (hookResult !== undefined) {
            result = hookResult;
            args[0] = result; // Update for next plugin
          } else {
            // If hook returns undefined, use the previous result
            Debug.warn(
              `Plugin ${plugin.config.name} returned undefined for ${hookName}`,
              args[0],
            );
            result = args[0];
          }
        } catch (error) {
          Debug.error(
            `Plugin ${plugin.config.name} failed executing ${hookName}:`,
            error,
          );
          // Continue with other plugins
        }
      }
    }

    return result;
  },

  // Execute a global method
  executeGlobalMethod(methodName: string, ...args: any[]) {
    const methodInfo = this.globalMethods.get(methodName);
    if (!methodInfo) {
      throw new FlowPlaterError(`Global method ${methodName} not found`);
    }

    const plugin = this.getPlugin(methodInfo.plugin);
    if (!plugin || !plugin.config?.enabled) {
      throw new FlowPlaterError(`Plugin ${methodInfo.plugin} is not enabled`);
    }

    return methodInfo.method.call(plugin, ...args);
  },

  // Execute an instance method
  executeInstanceMethod(methodName: string, instance: FlowPlaterInstance, ...args: any[]) {
    const methodInfo = this.instanceMethods.get(methodName);
    if (!methodInfo) {
      throw new FlowPlaterError(`Instance method ${methodName} not found`);
    }

    const plugin = this.getPlugin(methodInfo.plugin);
    if (!plugin || !plugin.config?.enabled) {
      throw new FlowPlaterError(`Plugin ${methodInfo.plugin} is not enabled`);
    }

    return methodInfo.method(instance, ...args);
  },

  async destroyPlugin(name: string) {
    const plugin = this.getPlugin(name);
    if (!plugin) return false;

    if (typeof plugin.destroy === "function") {
      await plugin.destroy();
    }
    return this.removePlugin(name);
  },

  async destroyAll() {
    const plugins = this.getAllPlugins();
    await Promise.all(
      plugins.map((plugin) =>
        typeof plugin.destroy === "function" ? plugin.destroy() : null,
      ),
    );

    plugins.forEach((plugin) =>
      _readyState.unregisterPlugin(plugin.config.name),
    );

    // Clear plugin manager state
    this.plugins.clear();
    this.globalMethods.clear();
    this.instanceMethods.clear();

    Debug.info(
      "All plugins destroyed, FlowPlater remains ready for new plugins",
    );
  },
};
