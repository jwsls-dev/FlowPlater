/**
 * Deep merges source objects into target object.
 * Mutates the target object.
 *
 * @param {Object} target - The target object to merge into
 * @param {Object} source - The source object to merge from
 * @returns {Object} The merged object (same as target)
 */
export function deepMerge(target, source) {
  // Handle edge cases
  if (!source) return target;
  if (!target) return source;

  // Iterate through source properties
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      // Handle arrays specially - replace entire array
      if (Array.isArray(target[key]) && Array.isArray(source[key])) {
        target[key] = source[key];
      }
      // If property exists in target and both are objects, merge recursively
      else if (
        key in target &&
        typeof target[key] === "object" &&
        typeof source[key] === "object" &&
        target[key] !== null &&
        source[key] !== null
      ) {
        deepMerge(target[key], source[key]);
      } else {
        // Otherwise just copy the value
        target[key] = source[key];
      }
    }
  }

  return target;
}
