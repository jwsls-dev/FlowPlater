export function createDeepProxy(target, handler) {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  const proxyHandler = {
    get(target, property) {
      const value = target[property];
      return value && typeof value === "object"
        ? createDeepProxy(value, handler)
        : value;
    },
    set(target, property, value) {
      target[property] = value;
      handler(target);
      return true;
    },
    deleteProperty(target, property) {
      delete target[property];
      handler(target);
      return true;
    },
  };

  return new Proxy(target, proxyHandler);
}
