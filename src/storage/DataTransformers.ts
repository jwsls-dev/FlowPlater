/**
 * Data transformation utilities for FlowPlater
 */

// Cache to ensure a single proxy per target and to detect already-proxied values
const targetToProxy = new WeakMap<object, any>();
const proxyToTarget = new WeakMap<any, object>();

function isObject(value: any): value is object {
  return typeof value === "object" && value !== null;
}

function isProxiedByUs(value: any): boolean {
  return proxyToTarget.has(value);
}

function unwrapProxy<T>(value: T): T {
  if (isProxiedByUs(value)) {
    return proxyToTarget.get(value as any) as unknown as T;
  }
  return value;
}

function unwrapDeep<T>(value: T): T {
  const unwrapped = unwrapProxy(value);
  if (!isObject(unwrapped)) return unwrapped;

  if (Array.isArray(unwrapped)) {
    return (unwrapped as unknown as any[]).map((item) => unwrapDeep(item)) as unknown as T;
  }

  // For plain objects, create a shallow clone with deeply unwrapped values
  const result: Record<string, any> = {};
  for (const key in unwrapped as Record<string, any>) {
    if (Object.prototype.hasOwnProperty.call(unwrapped, key)) {
      result[key] = unwrapDeep((unwrapped as Record<string, any>)[key]);
    }
  }
  return result as unknown as T;
}

/**
 * Creates a deep proxy that tracks nested object changes.
 * - Returns the same proxy for the same target via WeakMap caching
 * - If passed a proxy previously created by this function, returns it as-is
 * - Unwraps proxies in set operations to avoid storing proxies inside proxies
 */
export function createDeepProxy(target: any, handler: (target: any) => void) {
  // Non-objects are returned as-is
  if (!isObject(target)) return target;

  // If caller passes an existing proxy from us, return it unchanged
  if (isProxiedByUs(target)) return target;

  // If we've already created a proxy for this target, reuse it
  const existing = targetToProxy.get(target as object);
  if (existing) return existing;

  const proxyHandler = {
    get(target: any, property: string | number | symbol) {
      const value = Reflect.get(target, property);
      if (!isObject(value)) return value;

      // If already proxied by us, return as-is
      if (isProxiedByUs(value)) return value;

      // If we have a cached proxy for this nested target, reuse it
      const cached = targetToProxy.get(value as object);
      if (cached) return cached;

      return createDeepProxy(value, handler);
    },
    set(target: any, property: string | number | symbol, value: any) {
      // Unwrap if someone sets a proxied value
      const unwrapped = unwrapProxy(value);
      const ok = Reflect.set(target, property, unwrapped);
      // Execute handler but don't block on it
      Promise.resolve().then(() => handler(target));
      return ok;
    },
    deleteProperty(target: any, property: string | number | symbol) {
      const ok = Reflect.deleteProperty(target, property);
      // Execute handler but don't block on it
      Promise.resolve().then(() => handler(target));
      return ok;
    },
  } as ProxyHandler<any>;

  const proxy = new Proxy(target, proxyHandler);
  targetToProxy.set(target as object, proxy);
  proxyToTarget.set(proxy, target as object);
  return proxy;
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
      // Always unwrap the source value so we never copy proxies into target
      const sourceValue: any = unwrapProxy((source as any)[key]);

      // Handle arrays specially - replace entire array
      if (Array.isArray((target as any)[key]) && Array.isArray(sourceValue)) {
        (target as any)[key] = unwrapDeep(sourceValue);
      }
      // If property exists in target and both are objects, merge recursively
      else if (
        key in target &&
        typeof (target as any)[key] === "object" &&
        typeof sourceValue === "object" &&
        (target as any)[key] !== null &&
        sourceValue !== null &&
        !Array.isArray((target as any)[key]) &&
        !Array.isArray(sourceValue)
      ) {
        deepMerge((target as any)[key] as Record<string, any>, sourceValue as Record<string, any>);
      } else {
        // Otherwise just copy the value
        (target as any)[key] = isObject(sourceValue) ? unwrapDeep(sourceValue) : sourceValue;
      }
    }
  }

  return target;
} 