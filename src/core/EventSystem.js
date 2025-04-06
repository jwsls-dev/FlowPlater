import { Debug, FlowPlaterError } from "./Debug";

/**
 * @module EventSystem
 * @description A pub/sub event system that supports both global and instance-specific events
 */
export const EventSystem = (function () {
  /** @type {Map<string, Array<{callback: Function, context: any}>>} */
  const subscribers = new Map();

  return {
    /**
     * Subscribe to an event
     * @param {string} event - The event name to subscribe to
     * @param {Function} callback - The callback function to execute when the event is published
     * @param {any} [context=null] - The context (this) to use when executing the callback
     * @returns {Function} Unsubscribe function
     * @throws {Error} If event name is empty or callback is not a function
     */
    subscribe(event, callback, context = null) {
      // Validate event name
      if (!event || typeof event !== "string") {
        FlowPlaterError(
          "Invalid event name. Event name must be a non-empty string.",
        );
      }

      // Validate callback
      if (!callback || typeof callback !== "function") {
        FlowPlaterError(
          `Invalid callback for event "${event}". Callback must be a function.`,
        );
      }

      if (!subscribers.has(event)) {
        subscribers.set(event, []);
      }
      subscribers.get(event).push({ callback, context });
      Debug.debug(`Subscribed to event: ${event}`);
      return () => this.unsubscribe(event, callback);
    },

    /**
     * Unsubscribe from an event
     * @param {string} event - The event name to unsubscribe from
     * @param {Function} callback - The callback function to remove
     */
    unsubscribe(event, callback) {
      if (!event || typeof event !== "string") {
        FlowPlaterError(
          "Invalid event name. Event name must be a non-empty string. If you are trying to unsubscribe from all events, use unsubscribeAll() instead.",
        );
      }

      if (!subscribers.has(event)) return;

      const subs = subscribers.get(event);
      subscribers.set(
        event,
        subs.filter((sub) => sub.callback !== callback),
      );
    },

    /**
     * Remove all event subscribers
     */
    unsubscribeAll() {
      subscribers.clear();

      Debug.info("Cleared all event subscribers");
    },

    /**
     * Publish an event with data
     * @param {string} event - The event name to publish
     * @param {Object} [data] - Data to pass to subscribers
     */
    publish(event, data) {
      if (!subscribers.has(event)) return;

      // Call subscribers for this specific event
      subscribers.get(event).forEach(({ callback, context }) => {
        try {
          callback.call(context, data);
        } catch (error) {
          Debug.error(`Error in event subscriber for ${event}:`, error);
        }
      });

      // If data contains instanceName, also trigger instance-specific event
      if (data && data.instanceName) {
        const instanceEvent = `${data.instanceName}:${event}`;
        if (subscribers.has(instanceEvent)) {
          subscribers.get(instanceEvent).forEach(({ callback, context }) => {
            try {
              callback.call(context, data);
            } catch (error) {
              Debug.error(
                `Error in instance event subscriber for ${instanceEvent}:`,
                error,
              );
            }
          });
        }
      }
    },
  };
})();
