import { Debug } from "../../core/Debug";
import { ConfigManager } from "../../core/ConfigManager";

// Registry for user-allowed functions
const ALLOWED_FUNCTIONS: Map<string, Function> = new Map<string, Function>();

// Functions that cannot be registered for security reasons
const FORBIDDEN_REGISTRATIONS = new Set([
  'registerExecutableFunction',
  'unregisterExecutableFunction', 
  'clearExecutableFunctions',
  'getRegisteredFunctions',
  'executeHelper',
  'eval',
  'Function',
  'setTimeout',
  'setInterval',
  'fetch',
  'XMLHttpRequest',
  'import',
  'require',
  'globalThis',
  'window',
  'document',
  'location',
  'history',
  'navigator',
  'localStorage',
  'sessionStorage',
  'indexedDB',
  'console',
  'process',
  'global',
  'self',
  'parent',
  'top',
  'frames',
  // FlowPlater specific methods
  'FlowPlater',
  'flowplater',
  'compileTemplate',
  'render',
  'getInstance',
  'getInstances',
  'getOrCreateInstance',
  'getGroup',
  'getOrCreateGroup',
  'getGroups',
  'updateGroup',
  'removeGroup',
  'removeAllGroups',
  'registerPlugin',
  'removePlugin',
  'removeAllPlugins',
  'getPlugin',
  'getAllPlugins',
  'enablePlugin',
  'disablePlugin',
  'pluginConfig',
  'templateCache',
  'init',
  'cleanup',
  'setCustomTags',
  'config',
  'getConfig',
  'registerTag',
  'trigger',
  'destroy',
  'create',
  'findAttribute',
  'addTransformer',
  'removeTransformer',
  'clearTransformers'
]);

export function registerExecutableFunction(name: string, fn: Function): void {
  if (typeof fn !== 'function') {
    Debug.error(`Cannot register ${name}: not a function`);
    return;
  }
  
  // Check if the function name is forbidden
  const normalizedName = name.toLowerCase().trim();
  if (FORBIDDEN_REGISTRATIONS.has(name) || FORBIDDEN_REGISTRATIONS.has(normalizedName)) {
    Debug.error(`Cannot register ${name}: function name is forbidden for security reasons`);
    return;
  }
  
  // Additional pattern checks for dangerous function names
  const dangerousPatterns = [
    /^(window|globalThis|global|self|document|location|history|navigator|parent|top|frames)\./i,
    /^(FlowPlater|flowplater)\./i,
    /eval|function|script|import|require|process/i,
    /innerHTML|outerHTML|insertAdjacentHTML/i,
    /localStorage|sessionStorage|indexedDB|cookie/i,
    /setTimeout|setInterval|requestAnimationFrame/i,
    /fetch|XMLHttpRequest|WebSocket/i,
    /addEventListener|removeEventListener|postMessage/i,
    /Object\.(defineProperty|setPrototypeOf|assign)/i,
    /Reflect\.(defineProperty|setPrototypeOf|set)/i,
    /constructor|prototype|__proto__/i,
    /compileTemplate|getInstance|getGroup|registerPlugin|templateCache|config|destroy|init/i
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(name)) {
      Debug.error(`Cannot register ${name}: function name matches dangerous pattern`);
      return;
    }
  }
  
  // Prevent registration of the function itself to avoid circular references
  if (fn === registerExecutableFunction || 
      fn === unregisterExecutableFunction || 
      fn === clearExecutableFunctions || 
      fn === getRegisteredFunctions) {
    Debug.error(`Cannot register ${name}: cannot register system functions`);
    return;
  }
  
  ALLOWED_FUNCTIONS.set(name, fn);
}

export function unregisterExecutableFunction(name: string): boolean {
  return ALLOWED_FUNCTIONS.delete(name);
}

export function clearExecutableFunctions(): void {
  ALLOWED_FUNCTIONS.clear();
}

export function getRegisteredFunctions(): string[] {
  return Array.from(ALLOWED_FUNCTIONS.keys());
}

export function executeHelper() {
  const Handlebars = (window as any).Handlebars;
  Handlebars.registerHelper("execute", function (this: any, fn: string, ...args: any[]) {

    if (!ConfigManager.getConfig().allowExecute) {
      Debug.error("execute is disabled. Cannot execute functions.");
      return '';
    }

    // Accepts a function name and arguments
    // Only executes functions that have been explicitly registered by the user
    // Example: {{execute myFunction arg1 arg2 arg3}} returns myFunction(arg1, arg2, arg3)
    args.pop();

    const fnName = String(fn).trim();
    
    // Check if the function is in the allowed registry
    const registeredFunction = ALLOWED_FUNCTIONS.get(fnName);
    if (registeredFunction) {
      try {
        return registeredFunction.apply(this, args);
      } catch (error) {
        Debug.error("Error executing registered function " + fnName + ": " + (error as Error).message);
        return '';
      }
    }
    
    // Also check the current context (this) for functions - safer than global scope
    const contextFunction = (this as any)[fnName];
    if (typeof contextFunction === "function") {
      try {
        return contextFunction.apply(this, args);
      } catch (error) {
        Debug.error("Error executing context function " + fnName + ": " + (error as Error).message);
        return '';
      }
    }
    
    // Function not found in allowed registry or context
    Debug.error("Function not found or not allowed: " + fnName + ". Please register the function using registerExecutableFunction() before using it in a template.");
    return '';
  });
}
