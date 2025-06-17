import { Debug } from "../core/Debug";
import { PluginManager } from "../core/PluginManager";
import { FlowPlaterPlugin } from "../types";

/**
 * Checks if a string looks like a CSS selector
 * @param {string} str - String to check
 * @returns {boolean} True if the string looks like a CSS selector
 */
function isCssSelector(str: string): boolean {
  // If it starts with # or . it's definitely a selector
  if (str.startsWith("#") || str.startsWith(".")) {
    return true;
  }
  // Other CSS selector patterns
  return (
    /[[]>+~:()]/.test(str) || // Other CSS characters
    /^[a-z]+[a-z-]+$/i.test(str)
  ); // Element names like div, custom-element
}

/**
 * Extracts data from a local variable or DOM element
 * @param {string} varName - Variable name or CSS selector
 * @param {boolean} [wrapPrimitive=true] - Whether to wrap primitive values in an object
 * @returns {Object|null} The extracted data or null if not found/error
 */
export function extractLocalData(varName: string, wrapPrimitive: boolean = true): Record<string, any> | null {
  if (!varName) return null;

  try {
    // If it looks like a CSS selector, try DOM first
    if (isCssSelector(varName)) {
      const element = document.querySelector(varName);
      if (element) {
        // Check if DataExtractor plugin is available
        const dataExtractor = PluginManager.getPlugin("data-extractor");
        if (
          dataExtractor &&
          typeof dataExtractor.globalMethods?.processHtml === "function"
        ) {
          try {
            const extractedData = dataExtractor.globalMethods?.processHtml?.(
              element.outerHTML as unknown as FlowPlaterPlugin,
            ) as Record<string, any>;
            Debug.debug(
              `Extracted data from element "${varName}":`,
              extractedData,
            );
            return extractedData;
          } catch (e: any) {
            Debug.error(`DataExtractor failed for "${varName}": ${e.message}`);
            return null;
          }
        } else {
          Debug.warn(
            "DataExtractor plugin not available for element extraction",
          );
          return null;
        }
      }
    }

    // If not a selector or element not found, try window scope
    const value = window[varName as keyof Window];
    if (value !== undefined) {
      // If value is not an object and wrapping is enabled, wrap it
      if (
        wrapPrimitive &&
        (typeof value !== "object" || value === null || Array.isArray(value))
      ) {
        let wrappedValue = { [varName]: value };
        Debug.info(`Wrapped primitive value "${varName}":`, wrappedValue);
        return wrappedValue;
      }
      Debug.info(`Extracted value "${varName}":`, value);
      return value;
    }

    // If we get here, neither variable nor element was found
    Debug.warn(`Neither variable nor element found for "${varName}"`);
    return null;
  } catch (e: any) {
    Debug.info(`Error extracting local data "${varName}": ${e.message}`);
    return null;
  }
}
