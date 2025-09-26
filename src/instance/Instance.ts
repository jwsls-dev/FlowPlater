import { PluginManager } from "../core/PluginManager";
import { DataStore } from "../core/DataStore";
import { DEFAULTS } from "../core/DefaultConfig";
import { createDeepProxy } from "../storage/DataTransformers";
import { FlowPlaterElement, FlowPlaterInstance } from "../types";
import { compileTemplate } from "../template/TemplateCompiler";
import { MethodRegistry } from "../core/MethodRegistry";
import { InstanceClass } from "./InstanceClass";

/**
 * @module Instance
 * @exports createInstance
 * @exports setupInstanceProxy
 * 
 * @description Creates a new instance and sets up the instance proxy.
 */

/**
 * Creates a new instance.
 * @param {Object} params - The parameters for creating the instance
 * @param {string} params.instanceName - The name of the instance
 * @param {FlowPlaterElement} params.templateElement - The template element
 * @param {string} params.templateId - The template ID
 * @param {Record<string, any>} params.initialData - The initial data for the instance
 * @param {string} [params.groupName] - The name of the group
 * @param {FlowPlaterElement[]} [params.elements] - The elements to add to the instance
 * @returns {FlowPlaterInstance} The created instance
 */
export function createInstance(params: {
  instanceName: string;
  templateElement: FlowPlaterElement;
  templateId: string;
  initialData: Record<string, any>;
  groupName?: string;
  elements?: FlowPlaterElement[];
}): FlowPlaterInstance {
  const { instanceName, templateElement, templateId, initialData, groupName, elements } = params;

  // base instance handled by InstanceClass

  // Prefer class-based instance for improved IDE navigation
  const instance = new InstanceClass({ instanceName, templateElement, templateId, initialData, groupName, elements });

  // Attach all registered instance methods (plugins + custom) via registry
  for (const [methodName] of MethodRegistry.instanceMethods.entries()) {
    (instance as any)[methodName] = (...args: any[]) =>
      PluginManager.executeInstanceMethod(methodName, instance, ...args);
  }

  // Optional group reference (no proxy setup here)
  if (groupName) {
    instance.groupName = groupName;
  }

  return instance;
}

/**
 * Sets up the instance proxy. The proxy is used to track changes to the instance data and provides reactivity.
 * @param {FlowPlaterInstance} instance - The instance to setup the proxy for
 * @param {any} compiledTemplate - The compiled template
 * @param {string} templateId - The template ID
 */
export function setupInstanceProxy(instance: FlowPlaterInstance, templateId: string) : void {
  // Set template info and lazy renderer
  instance.templateId = templateId;
  instance.template = function renderWithLazyCompile(data: Record<string, any>) {
    const compiled = compileTemplate(instance.templateId);
    return compiled ? compiled(data) : "";
  };

  const currentData = instance.data || {};

  if (instance.groupName) {
    const group = DataStore.getOrCreateGroup(instance.groupName, currentData);
    instance.data = group.data;
    DataStore.addInstanceToGroup(instance, instance.groupName);
    return;
  }

  const DEBOUNCE_DELAY = DEFAULTS.PERFORMANCE.DEBOUNCE_DELAY;

  if (!instance._updateTimer) instance._updateTimer = null;
  if (!instance._stateBeforeDebounce) instance._stateBeforeDebounce = null;

  const proxy = createDeepProxy(currentData, () => {
    if (!instance) return;
    // Mark that we have pending changes during/after evaluation
    (instance as any)._hasPendingUpdate = true;
    // If currently evaluating, defer to the completion handler in _updateDOM
    if ((instance as any)._isEvaluating) {
      return;
    }
    // Otherwise debounce an update now
    if (instance._updateTimer) clearTimeout(instance._updateTimer);
    instance._updateTimer = setTimeout(() => {
      instance._updateDOM();
      instance._updateTimer = null;
    }, DEBOUNCE_DELAY);
  });

  instance.data = proxy;
}


