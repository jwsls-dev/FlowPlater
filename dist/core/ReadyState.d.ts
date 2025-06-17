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
export declare const _readyState: {
    isReady: boolean;
    queue: (() => void)[];
    plugins: Set<unknown>;
    hasPluginsRegistered: boolean;
    /**
     * Process all queued functions in order
     */
    processQueue(): void;
    /**
     * Add a function to the queue or execute immediately if ready
     * @param {Function} fn - Function to queue or execute
     */
    enqueue(fn: () => void): void;
    /**
     * Mark FlowPlater as ready and process queue
     */
    markReady(): void;
    /**
     * Register a plugin and mark that we have plugins
     * @param {string} pluginName - Name of the plugin being registered
     */
    registerPlugin(pluginName: string): void;
    /**
     * Unregister a plugin from the ready state
     * @param {string} pluginName - Name of the plugin to unregister
     * @returns {boolean} True if the plugin was unregistered, false if it wasn't registered
     */
    unregisterPlugin(pluginName: string): boolean;
    /**
     * Reset the ready state completely
     * @param {boolean} [maintainReadyStatus=true] - Whether to maintain the ready status
     */
    reset(maintainReadyStatus?: boolean): void;
    /**
     * Complete cleanup of FlowPlater state
     * This should only be called when completely shutting down FlowPlater
     */
    cleanup(): void;
};
