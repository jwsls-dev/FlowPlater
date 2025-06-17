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
