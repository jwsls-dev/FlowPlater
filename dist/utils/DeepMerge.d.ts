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
export declare function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T;
