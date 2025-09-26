import { Debug, FlowPlaterError } from "./Debug";

export interface RegisteredMethodInfo {
  method: Function;
  origin: "plugin" | "custom";
  plugin?: string;
}

export const MethodRegistry = {
  globalMethods: new Map<string, RegisteredMethodInfo>(),
  instanceMethods: new Map<string, RegisteredMethodInfo>(),
  groupMethods: new Map<string, RegisteredMethodInfo>(),

  /**
   * Register a method on the global API, all instances, or all groups.
   * @param {"global"|"instance"|"group"} type - Where to register the method 
   * @param {string} name - The method name
   * @param {Function} fn - The function implementation. Inside the function, `this` will be the instance, group, or global object.
   * @param {boolean} override - Whether to override an existing method. Use with caution. Default is false.
   */
  registerMethod(type: "global" | "instance" | "group", name: string, fn: Function, override: boolean = false) : void {
    if (!name || typeof name !== "string") {
      throw new FlowPlaterError("Method name must be a non-empty string");
    }
    if (typeof fn !== "function") {
      throw new FlowPlaterError("Method must be a function");
    }
    const info: RegisteredMethodInfo = { method: fn, origin: "custom" };
    switch (type) {
      case "global":
        if (this.globalMethods.has(name)) {
          if (!override) {
            throw new FlowPlaterError(`Global method '${name}' already exists. Pass override=true to replace.`);
          }
          Debug.warn(`[MethodRegistry] Overriding existing global method: ${name}`);
        }
        this.globalMethods.set(name, info);
        break;
      case "instance":
        if (this.instanceMethods.has(name)) {
          if (!override) {
            throw new FlowPlaterError(`Instance method '${name}' already exists. Pass override=true to replace.`);
          }
          Debug.warn(`[MethodRegistry] Overriding existing instance method: ${name}`);
        }
        this.instanceMethods.set(name, info);
        break;
      case "group":
        if (this.groupMethods.has(name)) {
          if (!override) {
            throw new FlowPlaterError(`Group method '${name}' already exists. Pass override=true to replace.`);
          }
          Debug.warn(`[MethodRegistry] Overriding existing group method: ${name}`);
        }
        this.groupMethods.set(name, info);
        break;
      default:
        throw new FlowPlaterError(`Unknown method type: ${type}`);
    }
  },

  /**
   * Register a method on the global API, or all instances.   
   * This method is used by plugins to register methods on the global API or all instances.
   * @param {"global"|"instance"} type - Where to register the method
   * @param {string} name - The method name
   * @param {Function} fn - The function implementation. Inside the function, `this` will be the instance or global object.
   * @param {string} pluginName - The name of the plugin registering the method
   */
  registerPluginMethod(type: "global" | "instance" | "group", name: string, fn: Function, pluginName: string) : void {
    if (!name || typeof name !== "string") {
      throw new FlowPlaterError("Method name must be a non-empty string");
    }
    if (typeof fn !== "function") {
      throw new FlowPlaterError("Method must be a function");
    }
    const info: RegisteredMethodInfo = { method: fn, origin: "plugin", plugin: pluginName };
    if (type === "global") {
      if (this.globalMethods.has(name)) {
        const existing = this.globalMethods.get(name);
        throw new FlowPlaterError(
          `Global method ${name} already registered by plugin ${existing?.plugin || "unknown"}`,
        );
      }
      this.globalMethods.set(name, info);
      return;
    }
    if (type === "instance") {
      if (this.instanceMethods.has(name)) {
        const existing = this.instanceMethods.get(name);
        throw new FlowPlaterError(
          `Instance method ${name} already registered by plugin ${existing?.plugin || "unknown"}`,
        );
      }
      this.instanceMethods.set(name, info);
      return;
    }
    if (type === "group") {
      if (this.groupMethods.has(name)) {
        const existing = this.groupMethods.get(name);
        throw new FlowPlaterError(
          `Group method ${name} already registered by plugin ${existing?.plugin || "unknown"}`,
        );
      }
      this.groupMethods.set(name, info);
      return;
    }
    throw new FlowPlaterError(`Unsupported plugin method type: ${type}`);
  },

  /**
   * Remove all methods registered by a plugin.
   * @param {string} pluginName - The name of the plugin to remove methods for
   * @returns {Object} Object with global and instance method arrays
   */
  removePluginMethods(pluginName: string) : { global: string[], instance: string[] } {
    const removed = { global: [] as string[], instance: [] as string[], group: [] as string[] } as any;

    for (const [name, info] of Array.from(this.globalMethods.entries())) {
      if (info.origin === "plugin" && info.plugin === pluginName) {
        this.globalMethods.delete(name);
        removed.global.push(name);
      }
    }

    for (const [name, info] of Array.from(this.instanceMethods.entries())) {
      if (info.origin === "plugin" && info.plugin === pluginName) {
        this.instanceMethods.delete(name);
        removed.instance.push(name);
      }
    }

    for (const [name, info] of Array.from(this.groupMethods.entries())) {
      if (info.origin === "plugin" && info.plugin === pluginName) {
        this.groupMethods.delete(name);
        removed.group.push(name);
      }
    }

    return removed;
  },
};

export default MethodRegistry;


