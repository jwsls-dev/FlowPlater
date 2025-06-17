export function memoize<T extends (...args: any[]) => any>(fn: T): T & { original: T; cache: Map<string, any> } {
  const cache = new Map<string, any>();
  const memoized = (...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
  memoized.original = fn;
  memoized.cache = cache;
  return memoized as T & { original: T; cache: Map<string, any> };
}
