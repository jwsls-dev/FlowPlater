import { Debug } from "./Debug";

/**
 * @typedef {Object} ReadyState
 * @property {boolean} isReady - Whether FlowPlater is ready
 * @property {Function[]} queue - Queue of functions to execute when ready
 * @property {Set<string>} plugins - Set of registered plugin names
 * @property {Function} processQueue - Process all queued functions
 */

/**
 * Manages FlowPlater's ready state and initialization queue
 */
export const _readyState = {
  isReady: false,
  queue: [],
  plugins: new Set(),
  hasPluginsRegistered: false,

  /**
   * Process all queued functions in order
   */
  processQueue() {
    Debug.debug(`Processing ${this.queue.length} queued operations`);
    while (this.queue.length > 0) {
      const fn = this.queue.shift();
      try {
        fn();
      } catch (error) {
        Debug.error("Error processing queued operation:", error);
      }
    }
  },

  /**
   * Add a function to the queue or execute immediately if ready
   * @param {Function} fn - Function to queue or execute
   */
  enqueue(fn) {
    if (this.isReady) {
      try {
        fn();
      } catch (error) {
        Debug.error("Error executing operation:", error);
      }
    } else {
      this.queue.push(fn);
    }
  },

  /**
   * Mark FlowPlater as ready and process queue
   */
  markReady() {
    // If no plugins have been registered at all, that's fine
    if (this.plugins.size === 0 && !this.hasPluginsRegistered) {
      Debug.info("No plugins registered, proceeding with initialization");
    }

    this.isReady = true;
    this.processQueue();
  },

  /**
   * Register a plugin and mark that we have plugins
   * @param {string} pluginName - Name of the plugin being registered
   */
  registerPlugin(pluginName) {
    this.hasPluginsRegistered = true;
    this.plugins.add(pluginName);
    Debug.debug(
      `Plugin registered: ${pluginName}, total plugins: ${this.plugins.size}`,
    );
  },

  /**
   * Unregister a plugin from the ready state
   * @param {string} pluginName - Name of the plugin to unregister
   * @returns {boolean} True if the plugin was unregistered, false if it wasn't registered
   */
  unregisterPlugin(pluginName) {
    const wasRemoved = this.plugins.delete(pluginName);
    if (wasRemoved) {
      Debug.debug(
        `Plugin unregistered: ${pluginName}, remaining plugins: ${this.plugins.size}`,
      );

      // If this was the last plugin and we're resetting, update hasPluginsRegistered
      if (this.plugins.size === 0) {
        this.hasPluginsRegistered = false;
        Debug.debug(
          "All plugins unregistered, reset plugin registration state",
        );
      }
    } else {
      Debug.warn(`Attempted to unregister non-existent plugin: ${pluginName}`);
    }
    return wasRemoved;
  },

  /**
   * Reset the ready state completely
   * @param {boolean} [maintainReadyStatus=true] - Whether to maintain the ready status
   */
  reset(maintainReadyStatus = true) {
    const wasReady = this.isReady;
    this.queue = [];
    this.plugins.clear();
    this.hasPluginsRegistered = false;

    // Only reset ready status if explicitly requested
    if (!maintainReadyStatus) {
      this.isReady = false;
      Debug.info(
        "ReadyState completely reset, FlowPlater needs re-initialization",
      );
    } else {
      Debug.info("ReadyState reset but maintains ready status for new plugins");
    }
  },

  /**
   * Complete cleanup of FlowPlater state
   * This should only be called when completely shutting down FlowPlater
   */
  cleanup() {
    this.reset(false);
    Debug.info("FlowPlater ReadyState cleaned up completely");
  },
};
