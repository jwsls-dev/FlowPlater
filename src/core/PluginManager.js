import { Debug, FlowPlaterError } from "./Debug";
import { _state } from "./State";
import { _readyState } from "./ReadyState";

// Version management utilities
const VersionManager = {
  parseVersion(version) {
    return version.split(".").map(Number);
  },

  compareVersions(v1, v2) {
    const v1Parts = this.parseVersion(v1);
    const v2Parts = this.parseVersion(v2);

    for (let i = 0; i < 3; i++) {
      if (v1Parts[i] > v2Parts[i]) return 1;
      if (v1Parts[i] < v2Parts[i]) return -1;
    }
    return 0;
  },

  satisfiesVersion(required, actual) {
    if (!required || !actual) return false;

    // Handle @ syntax (e.g., "plugin@2.1")
    const [pluginName, version] = required.split("@");
    if (!version) return true; // No version requirement

    return this.compareVersions(actual, version) >= 0;
  },
};

const PluginManager = {
  plugins: new Map(),
  globalMethods: new Map(),
  instanceMethods: new Map(),

  registerPlugin(plugin) {
    if (typeof plugin === "string") {
      plugin = window[plugin];
    }

    if (!plugin) {
      throw new FlowPlaterError(`Plugin not found: ${plugin}`);
    }

    if (typeof plugin !== "function") {
      throw new FlowPlaterError("Plugin must be a valid function");
    }

    const pluginInstance = plugin();

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
        if (typeof window !== "undefined" && window.FlowPlater) {
          window.FlowPlater[methodName] = (...args) =>
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
          Handlebars.registerHelper(helperName.toLowerCase(), helper);
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
        if (pluginInstance.hooks?.initComplete) {
          try {
            pluginInstance.hooks.initComplete(
              window.FlowPlater,
              Object.values(_state.instances),
            );
          } catch (error) {
            Debug.error(
              `Plugin ${pluginInstance.config.name} failed executing initComplete:`,
              error,
            );
          }
        }
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
      if (pluginInstance.hooks?.initComplete) {
        try {
          pluginInstance.hooks.initComplete(
            window.FlowPlater,
            Object.values(_state.instances),
          );
        } catch (error) {
          Debug.error(
            `Plugin ${pluginInstance.config.name} failed executing initComplete:`,
            error,
          );
        }
      }
    }

    return pluginInstance;
  },

  updateExistingInstances() {
    // Get all instances
    const instances = Object.values(_state.instances);

    // For each instance, add any missing plugin methods
    instances.forEach((instance) => {
      for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
        if (!instance[methodName]) {
          instance[methodName] = (...args) =>
            this.executeInstanceMethod(methodName, instance, ...args);
        }
      }
    });
  },

  getPlugin(name) {
    return this.plugins.get(name);
  },

  getAllPlugins() {
    return Array.from(this.plugins.values());
  },

  getEnabledPlugins() {
    return this.getAllPlugins().filter((plugin) => plugin.config?.enabled);
  },

  removePlugin(name) {
    const plugin = this.getPlugin(name);
    if (!plugin) return false;

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
        if (typeof window !== "undefined" && window.FlowPlater) {
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
        delete instance[methodName];
      });
    });

    // Unregister from ready state
    _readyState.unregisterPlugin(name);

    return this.plugins.delete(name);
  },

  disablePlugin(name) {
    const plugin = this.getPlugin(name);
    if (!plugin) return false;
    plugin.config.enabled = false;
    return true;
  },

  enablePlugin(name) {
    const plugin = this.getPlugin(name);
    if (!plugin) return false;
    plugin.config.enabled = true;
    // Initialize if not already initialized
    if (typeof plugin.init === "function" && !plugin.state.initialized) {
      plugin.init();
      plugin.state.initialized = true;
    }
    return true;
  },

  pluginConfig(name) {
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
  _determineDataType(data) {
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
  applyTransformations(instance, data, transformationType, dataType = "json") {
    // Get plugins in priority order
    const plugins = this.getSortedPlugins();

    // Apply each plugin's transformation if it exists
    return plugins.reduce((transformedData, plugin) => {
      // Check if plugin has transformers and the specific transformation type
      if (
        plugin.transformers &&
        typeof plugin.transformers[transformationType] === "function"
      ) {
        try {
          // Apply the transformation
          const result = plugin.transformers[transformationType](
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
            Object.assign(transformedData.detail, result.detail);
            return transformedData;
          }

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
  },

  executeHook(hookName, ...args) {
    Debug.debug("[PLUGIN] Executing hook:", hookName, args);

    const plugins = this.getSortedPlugins();
    let result = args[0]; // Store initial value

    for (const plugin of plugins) {
      if (plugin.hooks?.[hookName]) {
        try {
          const hookResult = plugin.hooks[hookName](...args);
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
  executeGlobalMethod(methodName, ...args) {
    const methodInfo = this.globalMethods.get(methodName);
    if (!methodInfo) {
      throw new FlowPlaterError(`Global method ${methodName} not found`);
    }

    const plugin = this.getPlugin(methodInfo.plugin);
    if (!plugin || !plugin.config?.enabled) {
      throw new FlowPlaterError(`Plugin ${methodInfo.plugin} is not enabled`);
    }

    return methodInfo.method(plugin, ...args);
  },

  // Execute an instance method
  executeInstanceMethod(methodName, instance, ...args) {
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

  async destroyPlugin(name) {
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

export default PluginManager;
