/**
 * Data transformation utilities for FlowPlater
 */

/**
 * Creates a deep proxy that tracks nested object changes
 * @param target - The object to proxy
 * @param handler - Function to call when changes occur
 * @returns Proxied object that tracks deep changes
 */
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

/**
 * Deep merges source objects into target object.
 * Mutates the target object.
 *
 * @param target - The target object to merge into
 * @param source - The source object to merge from
 * @returns The merged object (same as target)
 * @description
 * - Arrays are replaced entirely rather than merged
 * - Objects are merged recursively
 * - Primitive values are copied directly
 * - The target object is mutated in place
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  // Handle edge cases
  if (!source) return target;
  if (!target) return source as T;

  // Iterate through source properties
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      // Handle arrays specially - replace entire array
      if (Array.isArray(target[key]) && Array.isArray(source[key])) {
        (target as any)[key] = source[key];
      }
      // If property exists in target and both are objects, merge recursively
      else if (
        key in target &&
        typeof target[key] === "object" &&
        typeof source[key] === "object" &&
        target[key] !== null &&
        source[key] !== null
      ) {
        deepMerge(target[key] as Record<string, any>, source[key] as Record<string, any>);
      } else {
        // Otherwise just copy the value
        (target as any)[key] = source[key];
      }
    }
  }

  return target;
} 