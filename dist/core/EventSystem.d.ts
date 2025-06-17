/**
 * @module EventSystem
 * @description A pub/sub event system that supports both global and instance-specific events
 */
export declare const EventSystem: {
    /**
     * Subscribe to an event
     * @param {string} event - The event name to subscribe to
     * @param {Function} callback - The callback function to execute when the event is published
     * @param {any} [context=null] - The context (this) to use when executing the callback
     * @returns {Function} Unsubscribe function
     * @throws {Error} If event name is empty or callback is not a function
     */
    subscribe(event: string, callback: Function, context?: any): () => void;
    /**
     * Unsubscribe from an event
     * @param {string} event - The event name to unsubscribe from
     * @param {Function} callback - The callback function to remove
     */
    unsubscribe(event: string, callback: Function): void;
    /**
     * Remove all event subscribers
     */
    unsubscribeAll(): void;
    /**
     * Publish an event with data
     * @param {string} event - The event name to publish
     * @param {Object} [data] - Data to pass to subscribers
     */
    publish(event: string, data?: any | null): void;
};
