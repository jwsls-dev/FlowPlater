import { Debug, FlowPlaterError } from "../../core/Debug";
import { compileTemplate } from "../../template/TemplateCompiler";
import { extractLocalData } from "../../forms/LocalVariableExtractor";
import { deepMerge } from "../../storage/DataTransformers";
import { PluginManager } from "../../core/PluginManager";
import { ConfigService } from "../../core/ConfigService";
import { saveToLocalStorage } from "../../storage/IDBStorage";
import type { FlowPlaterInstance } from "../../types";

export async function refresh(this: FlowPlaterInstance, options = { remote: true, recompile: false, ignoreLocalData: false }) {
  const instance = this;

  if (!instance) {
    return Promise.reject(new FlowPlaterError("Instance not found"));
  }

  const transformedData = PluginManager.applyTransformations(
    instance,
    instance.data,
    "transformDataBeforeRender",
    "json",
  );

  const compiledTemplateOutput = instance.template(transformedData);
  const shouldRecompile = options.recompile || (!compiledTemplateOutput && instance.data);

  if (shouldRecompile) {
    // Clear and recompile in cache; lazy renderer will pick up new compiled version
    compileTemplate(instance.templateId, true);
  }

  Debug.debug("Refresh - Template check:", {
    templateId: instance.templateId,
    templateElement: document.querySelector(instance.templateId),
    compiledTemplate: instance.template(transformedData),
  });

  let hasLocalVarUpdate = false;
  if (instance.localVarName && !options.ignoreLocalData) {
    const localData = extractLocalData(instance.localVarName);
    if (localData) {
      deepMerge(instance.data, localData);
      hasLocalVarUpdate = true;
      Debug.debug(`Refreshed data from local variable "${instance.localVarName}"`);
    }
  }

  const promises: Promise<any>[] = [];

  instance.elements.forEach(function (element) {
    try {
      if (options.remote && !hasLocalVarUpdate) {
        const htmxMethods = ["get", "post", "put", "patch", "delete"];
        const hasHtmxMethod = htmxMethods.some((method) => element.getAttribute(`hx-${method}`));

        if (hasHtmxMethod) {
          const method = htmxMethods.find((m) => element.getAttribute(`hx-${m}`));
          const url = element.getAttribute(`hx-${method}`);
        const promise = fetch(url as string, { method: (method?.toUpperCase() as string) })
            .then((response) => {
              if (!response.ok) {
                throw new FlowPlaterError(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              deepMerge(instance.data, data);
              if (ConfigService.isStorageEnabled()) {
                saveToLocalStorage(instance.instanceName.replace('#',''), instance.data, "instance");
              }
              return data;
            });
          promises.push(promise);
        }
      } else {
        Debug.debug("Instance.refresh - Using _updateDOM for proper data flow", { instanceName: instance.instanceName, elementId: element.id || "no-id" });
        promises.push(instance._updateDOM());
      }
    } catch (error) {
      (element as HTMLElement).innerHTML = `<div class="fp-error">Error refreshing template: ${(error as FlowPlaterError).message}</div>`;
      Debug.error(`Failed to refresh template: ${(error as FlowPlaterError).message}`);
      promises.push(Promise.reject(error));
    }
  });

  return Promise.all(promises);
}


