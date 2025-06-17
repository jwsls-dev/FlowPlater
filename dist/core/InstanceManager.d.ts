import { FlowPlaterElement, FlowPlaterInstance } from "../types";
export declare const InstanceManager: {
    /**
     * Gets an existing instance or creates a new one.
     * The data proxy should be assigned by the caller AFTER getting the instance.
     * @param {HTMLElement} element - The DOM element
     * @param {Object} initialData - Initial data object (will be replaced by proxy later)
     * @returns {Object} The instance
     */
    getOrCreateInstance(element: FlowPlaterElement, initialData?: Record<string, any>): FlowPlaterInstance | null;
    /**
     * Updates an instance's data via the proxy. USE WITH CAUTION.
     * Prefer direct proxy manipulation.
     * @param {Object} instance - The instance to update
     * @param {Object} newData - New data for the instance
     */
    updateInstanceData(instance: FlowPlaterInstance, newData: Record<string, any>): void;
};
