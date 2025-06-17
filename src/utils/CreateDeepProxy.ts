export function createDeepProxy(target: any, handler: (target: any) => void) {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  const proxyHandler = {
    get(target: any, property: string | number | symbol) {
      const value = target[property];
      return value && typeof value === "object"
        ? createDeepProxy(value, handler)
        : value;
    },
    set(target: any, property: string | number | symbol, value: any) {
      target[property] = value;
      // Execute handler but don't block on it
      Promise.resolve().then(() => handler(target));
      return true;
    },
    deleteProperty(target: any, property: string | number | symbol) {
      delete target[property];
      // Execute handler but don't block on it
      Promise.resolve().then(() => handler(target));
      return true;
    },
  };

  return new Proxy(target, proxyHandler);
}
