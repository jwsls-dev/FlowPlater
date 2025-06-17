/**
 * Extracts data from a local variable or DOM element
 * @param {string} varName - Variable name or CSS selector
 * @param {boolean} [wrapPrimitive=true] - Whether to wrap primitive values in an object
 * @returns {Object|null} The extracted data or null if not found/error
 */
export declare function extractLocalData(varName: string, wrapPrimitive?: boolean): Record<string, any> | null;
