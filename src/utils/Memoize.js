import { Debug } from "../core/Debug";

class Memoized {
  constructor(fn) {
    this.cache = new Map();
    this.original = fn;
  }

  apply(...args) {
    const key = JSON.stringify(args);
    if (this.cache.has(key)) {
      Debug.log(Debug.levels.DEBUG, "Cache hit:", key);
      return this.cache.get(key);
    }
    Debug.log(Debug.levels.DEBUG, "Cache miss:", key);
    const result = this.original.apply(this, args);
    this.cache.set(key, result);
    return result;
  }
}

export function memoize(fn) {
  const memoized = new Memoized(fn);
  const wrapper = (...args) => memoized.apply(...args);
  wrapper.original = memoized.original;
  wrapper.cache = memoized.cache;
  return wrapper;
}
