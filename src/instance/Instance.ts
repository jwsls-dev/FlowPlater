import { instanceMethods } from "./InstanceMethods";
import { PluginManager } from "../core/PluginManager";
import { GroupManager } from "./GroupManager";
import { DEFAULTS } from "../core/DefaultConfig";
import { createDeepProxy } from "../storage/DataTransformers";
import { FlowPlaterElement, FlowPlaterInstance } from "../types";

export function createInstance(params: {
  instanceName: string;
  templateElement: FlowPlaterElement;
  templateId: string;
  initialData: Record<string, any>;
  groupName?: string;
  elements?: FlowPlaterElement[];
}): FlowPlaterInstance {
  const { instanceName, templateElement, templateId, initialData, groupName, elements } = params;

  const baseInstance = {
    instanceName,
    elements: elements && elements.length ? elements.slice() : [templateElement],
    template: null,
    templateId: templateId || "",
    templateElement,
    data: initialData as unknown as ProxyConstructor & Record<string, any>,
    cleanup: () => {
      if (instance.groupName) {
        GroupManager.removeInstanceFromGroup(instance);
      }
      instance.elements = [];
    },
  } as unknown as FlowPlaterInstance;

  // Attach instance methods
  const methods = instanceMethods(instanceName);
  const instance = Object.assign(baseInstance, methods) as FlowPlaterInstance;

  // Add plugin-provided instance methods as dynamic dispatchers
  const pluginMethods = PluginManager.instanceMethods;
  for (const [methodName] of pluginMethods.entries()) {
    (instance as any)[methodName] = (...args: any[]) =>
      PluginManager.executeInstanceMethod(methodName, instance, ...args);
  }

  // Optional group reference (no proxy setup here)
  if (groupName) {
    instance.groupName = groupName;
  }

  return instance;
}

export function setupInstanceProxy(instance: FlowPlaterInstance, compiledTemplate: any, templateId: string) {
  // Set compiled template
  instance.template = compiledTemplate;
  instance.templateId = templateId;

  const currentData = instance.data || {};

  if (instance.groupName) {
    const group = GroupManager.getOrCreateGroup(instance.groupName, currentData);
    instance.data = group.data;
    GroupManager.addInstanceToGroup(instance, instance.groupName);
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


