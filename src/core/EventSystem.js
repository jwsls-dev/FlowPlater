// Export the EventSystem module
export const EventSystem = (function () {
  const subscribers = new Map();

  return {
    subscribe(event, callback, context = null) {
      if (!subscribers.has(event)) {
        subscribers.set(event, []);
      }
      subscribers.get(event).push({ callback, context });
      return () => this.unsubscribe(event, callback);
    },

    unsubscribe(event, callback) {
      if (!subscribers.has(event)) return;
      const subs = subscribers.get(event);
      subscribers.set(
        event,
        subs.filter((sub) => sub.callback !== callback),
      );
    },

    unsubscribeAll() {
      subscribers.clear();
    },

    publish(event, data) {
      if (!subscribers.has(event)) return;

      // Call subscribers for this specific event
      subscribers.get(event).forEach(({ callback, context }) => {
        callback.call(context, data);
      });

      // If data contains instanceName, also trigger instance-specific event
      if (data && data.instanceName) {
        const instanceEvent = `${data.instanceName}:${event}`;
        if (subscribers.has(instanceEvent)) {
          subscribers.get(instanceEvent).forEach(({ callback, context }) => {
            callback.call(context, data);
          });
        }
      }
    },
  };
})();
