import { Debug } from "../../core/Debug";

/**
 * Checks if a property exists in the current context when it doesn't exist in the global context
 * and provides a helpful warning message to guide developers to use 'this.property' syntax
 * 
 * @param propertyName - The property name being accessed
 * @param currentValue - The current value being checked (should be dataContext for root level checks)
 * @param dataContext - The root/global data context
 * @param currentContext - The current template context (this)
 */
export function verifyContext(
  propertyName: string,
  currentValue: any,
  dataContext: any,
  currentContext: any
): void {
  // Only check if we're at the root level of property resolution
  if (currentValue === dataContext && 
      currentContext && 
      typeof currentContext === "object" && 
      Object.prototype.hasOwnProperty.call(currentContext, propertyName)) {
    Debug.warn(`The '${propertyName}' property does not exist in the global context. Did you mean 'this.${propertyName}'?`);
  }
} 