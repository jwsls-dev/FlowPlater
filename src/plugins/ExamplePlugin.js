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
    beforeDomUpdate: function (instance, context) {
      // Called before a DOM update begins.
      // instance: The FlowPlater instance being updated
      // context: Object containing:
      //   - element: The target element being updated
      //   - newHTML: The new HTML content
      //   - animate: Whether animation is enabled
      //   - formStates: The captured form states (if any)
      FlowPlater.log(
        FlowPlater.logLevels.INFO,
        "beforeDomUpdate",
        instance,
        context,
      );
      return instance;
    },
    afterDomUpdate: function (instance, context) {
      // Called after a DOM update is complete.
      // instance: The FlowPlater instance that was updated
      // context: Object containing:
      //   - element: The target element that was updated
      //   - newHTML: The new HTML content
      //   - animate: Whether animation was enabled
      //   - formStates: The captured form states (if any)
      FlowPlater.log(
        FlowPlater.logLevels.INFO,
        "afterDomUpdate",
        instance,
        context,
      );
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
      //   - source: The source of the update
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

  // apply changes to data in various points in the FlowPlater lifecycle
  const transformers = {
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
    transformRequest: function (instance, evt) {
      // Example: Add a timestamp to every request
      if (evt && evt.detail && evt.detail.parameters) {
        evt.detail.parameters["request_timestamp"] = Date.now();
      }
      return evt;
    },

    /**
     * Transform an HTMX response after it's received
     * This runs at the start of the transformResponse in the HTMX extension
     *
     * @param {Object} instance - The FlowPlater instance that made the request
     * @param {Object} response - The HTMX response object
     * @param {string} dataType - The type of data being transformed ("html", "xml", or "json")
     * @returns {Object} The modified response object
     */
    transformResponse: function (instance, response, dataType) {
      // Example: Add processing metadata to the response
      if (response) {
        response.metadata = {
          processedAt: Date.now(),
          instanceId: instance.id,
          dataType: dataType,
        };
      }
      return response;
    },

    /**
     * Transform data before it's passed to the instance for rendering
     * This allows you to modify the data structure before it's used in templates
     *
     * @param {Object} instance - The FlowPlater instance that made the request
     * @param {Object} data - The data object to be rendered
     * @param {string} dataType - The type of data being transformed (always "json" for this transformation)
     * @returns {Object} The modified data object
     */
    transformDataBeforeRender: function (instance, data, dataType) {
      // Example: Add a timestamp to the data
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

  // Custom Handlebars helpers
  // IMPORTANT: The helper name must be lowercase for Webflow compatibility!
  // Arguments are passed in the order they are defined in the helper function.

  const helpers = {
    // Example: Custom helper that checks if a value is in an array
    // usage: {{inarray value array}}
    // can also be used inside an if statement: <if fp="inarray value array"> ... </if>
    inarray(value, array) {
      if (!Array.isArray(array)) return false;
      return array.includes(value);
    },
    // You can also create block helpers by using the block helper syntax.
    // Example: setting all text within a block to uppercase:
    // usage: {{#uppercase}}
    //        {{content}}
    //        {{/uppercase}}
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

export default ExamplePlugin;
