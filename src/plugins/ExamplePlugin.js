import { Debug } from "../core/Debug";

/**
 * @module ExamplePlugin
 * @description Example plugin demonstrating how to create a FlowPlater plugin
 */
const ExamplePlugin = () => {
  // Plugin configuration
  const config = {
    // Name of the plugin. No special characters or spaces.
    name: "example",

    // If false, the plugin will not be loaded when FlowPlater is initialized.
    // Plugins can be enabled/disabled at runtime.
    enabled: true,

    // The priority of the plugin. The higher the number, the earlier the plugin will be initialized.
    priority: 0,

    // The version of the plugin.
    version: "1.0.0",

    // The dependencies of the plugin.
    dependencies: [
      //"other-plugin@2.1.0", -> Requires other-plugin version 2.1.0 or higher
      //"base-plugin", -> Requires base-plugin (any version)
    ],
    optionalDependencies: [
      //"nice-to-have-plugin@1.0.0", -> Optional dependency with version requirement
    ],
    settings: {
      debug: false,
      autoSave: true,
    },
    description: "Example plugin demonstrating plugin functionality",
    author: "Your Name",
  };

  // Plugin state
  let state = {
    initialized: false,
    data: {},
  };

  // Global methods that can be called from FlowPlater
  const globalMethods = {
    // Example: Get all instances using this plugin
    // usage: FlowPlater.exampleGetInstances(plugin)
    exampleGetInstances(plugin) {
      return Object.values(plugin.state.data);
    },

    // Example: Get plugin statistics
    // usage: FlowPlater.exampleGetStats(plugin)
    exampleGetStats(plugin) {
      return {
        totalInstances: Object.keys(plugin.state.data).length,
        enabled: plugin.config.enabled,
        settings: plugin.config.settings,
      };
    },
  };

  // Instance methods that can be called from instances
  const instanceMethods = {
    // Example: Get instance-specific data
    // usage: FlowPlater.getInstance("example").exampleGetData()
    exampleGetData(instance) {
      return instance.data;
    },

    // Example: Update instance with plugin-specific data
    // usage: FlowPlater.getInstance("example").exampleUpdateData(newData)
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

  // Plugin hooks
  const hooks = {
    // hooks are functions that are called throughout the flow of the library.
    // they are called with the data object as the argument and should return the data object.
    beforeRequest: function (instance, evt) {
      // Called before an htmx request is made.
      // instance: The FlowPlater instance making the request
      // evt: The HTMX event object
      FlowPlater.log(FlowPlater.logLevels.INFO, "beforeRequest", instance, evt);
      return instance;
    },
    afterRequest: function (instance, evt) {
      // Called after an htmx request is made.
      // instance: The FlowPlater instance that made the request
      // evt: The HTMX event object
      FlowPlater.log(FlowPlater.logLevels.INFO, "afterRequest", instance, evt);
      return instance;
    },
    beforeSwap: function (instance, evt) {
      // Called before the response is swapped into the DOM.
      // instance: The FlowPlater instance that will receive the swap
      // evt: The HTMX event object
      FlowPlater.log(FlowPlater.logLevels.INFO, "beforeSwap", instance, evt);
      return instance;
    },
    afterSwap: function (instance, evt) {
      // Called after the response is swapped into the DOM.
      // instance: The FlowPlater instance that received the swap
      // evt: The HTMX event object
      FlowPlater.log(FlowPlater.logLevels.INFO, "afterSwap", instance, evt);
      return instance;
    },
    newInstance: function (instance) {
      // Called when a new instance is created.
      // instance: The newly created FlowPlater instance
      FlowPlater.log(FlowPlater.logLevels.INFO, "newInstance", instance);
      return instance;
    },
    updateForm: function (instance, form) {
      // Called when a form is updated.
      // instance: The FlowPlater instance containing the form
      // form: Object containing:
      //   - element: The form DOM element
      //   - id: The form's ID
      //   - data: The form's state data
      //   - changedElement: The element that triggered the change
      FlowPlater.log(FlowPlater.logLevels.INFO, "updateForm", instance, form);
      return instance;
    },
    updateData: function (instance, data) {
      // Called when the instance data is updated.
      // instance: The FlowPlater instance being updated
      // data: Object containing:
      //   - data: The updated instance data
      //   - changes: The changes made to the data
      //   - path?: The path where the change occurred (for set/merge operations)
      //   - criteria?: The criteria used for the update (for updateWhere)
      //   - updates?: The updates applied (for updateWhere)
      FlowPlater.log(FlowPlater.logLevels.INFO, "updateData", instance, data);
      return instance;
    },
    initComplete: function (flowplater, instances) {
      // Called after FlowPlater has fully initialized
      // flowplater: The full FlowPlater object
      // instances: An array of all instances that were created
      if (config.enabled) {
        FlowPlater.log(
          FlowPlater.logLevels.INFO,
          `${config.name} plugin performing post-init setup`,
        );
        // Perform any post-initialization setup
        // For example:
        // - Set up event listeners
        // - Initialize third-party libraries
        // - Process existing instances
        // - etc.
      }
      return flowplater;
    },
    afterSettle: function (instance, evt) {
      // Called after HTMX settles (all animations complete)
      // instance: The FlowPlater instance
      // evt: The HTMX event object
      FlowPlater.log(FlowPlater.logLevels.INFO, "afterSettle", instance, evt);
      return instance;
    },
    destroy: function (instance) {
      // Called when an instance is destroyed
      // instance: The FlowPlater instance
      FlowPlater.log(FlowPlater.logLevels.INFO, "destroy", instance);
      return instance;
    },
  };

  // Plugin methods
  const methods = {
    // ... existing methods ...
  };

  return {
    config,
    state,
    globalMethods,
    instanceMethods,
    hooks,
    ...methods,
  };
};

export default ExamplePlugin;
