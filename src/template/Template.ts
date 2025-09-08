import { Debug } from "../core/Debug";
import { _state } from "../core/State";
import { Performance } from "../utils/Performance";
import { AttributeMatcher } from "../dom/AttributeMatcher";
import { compileTemplate } from "./TemplateCompiler";
import { PluginManager } from "../core/PluginManager";
import { FlowPlaterElement } from "../types";

export function render({
  template,
  data,
  target,
  returnHtml = false,
  instanceName,
  recompile = false,
}: {
  template: string;
  data: any;
  target: FlowPlaterElement | string;
  returnHtml?: boolean;
  instanceName?: string;
  recompile?: boolean;
}) {
  Performance.start("render:" + (instanceName || "anonymous"));

  // Simple validation
  if (!template || !target) {
    Debug.error("Template and target are required for render");
    Performance.end("render:" + (instanceName || "anonymous"));
    return null;
  }

  // Resolve target elements
  let targetElements: FlowPlaterElement[] = [];
  if (target instanceof NodeList) {
    targetElements = Array.from(target) as FlowPlaterElement[];
  } else if (typeof target === "string") {
    targetElements = Array.from(document.querySelectorAll(target));
  } else if (target instanceof Element) {
    targetElements = [target];
  }

  if (targetElements.length === 0) {
    Debug.error("No target elements found for render");
    Performance.end("render:" + (instanceName || "anonymous"));
    return null;
  }

  // Determine instance name
  if (!instanceName) {
    if (AttributeMatcher._hasAttribute(targetElements[0], "instance")) {
      instanceName = AttributeMatcher._getRawAttribute(targetElements[0], "instance") || undefined;
    } else if (targetElements[0].id) {
      instanceName = targetElements[0].id;
    } else {
      instanceName = "anonymous_" + Date.now();
    }
  }

  // Get existing instance or return null
  const instance = instanceName ? _state.instances[instanceName] : null;
  if (!instance) {
    Debug.error("Instance not found for render:", instanceName);
    Performance.end("render:" + (instanceName || "anonymous"));
    return null;
  }

  // Compile template if needed
  const compiledTemplate = compileTemplate(template, recompile);
  if (!compiledTemplate) {
    Debug.error("Failed to compile template:", template);
    Performance.end("render:" + (instanceName || "anonymous"));
    return null;
  }

  // Update instance data if provided
  if (data && typeof data === "object") {
    Object.assign(instance.data, data);
  }

  // Handle return HTML case
  if (returnHtml) {
    const transformedData = PluginManager.applyTransformations(
      instance,
      instance.getData(),
      "transformDataBeforeRender",
      "json"
    );
    const result = compiledTemplate(transformedData);
    Performance.end("render:" + (instanceName || "anonymous"));
    return result;
  }

  // Trigger DOM update
  if (instance._updateDOM) {
    instance._updateDOM();
  } else {
    Debug.warn(`Instance ${instanceName} missing _updateDOM method`);
  }

  Performance.end("render:" + (instanceName || "anonymous"));
  return instance;
}
