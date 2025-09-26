import { Debug } from "../../core/Debug";
import { EventSystem } from "../../events/EventSystem";
import { updateDOM as applyDomUpdate } from "../../dom/UpdateDom";
import { domBatcher } from "../../dom/DomBatcher";
import { saveToLocalStorage } from "../../storage/IDBStorage";
import { PluginManager } from "../../core/PluginManager";
import { ConfigService } from "../../core/ConfigService";
import type { FlowPlaterInstance } from "../../types";
import { compileTemplate } from "../../template/TemplateCompiler";

export async function _updateDOM(this: FlowPlaterInstance) {
  const instance = this;

  try {
    if (instance._isEvaluating) {
      Debug.debug("_updateDOM skipped during evaluation", instance.instanceName);
      (instance as any)._hasPendingUpdate = true;
      return;
    }
    instance._isEvaluating = true;
    (instance as any)._hasPendingUpdate = false;

    let rendered: any;
    if (instance.templateId === "self" || instance.templateId === null) {
      const templateElement = Array.from(instance.elements)[0];
      if (!templateElement) {
        Debug.error("No template element found for self template", instance.instanceName);
        return;
      }
      rendered = templateElement.innerHTML;
    } else {
      // Ensure compiled template is available
      const compiled = compileTemplate(instance.templateId);
      if (!compiled) {
        Debug.error("No compiled template available for instance", instance.instanceName);
        return;
      }
      const transformedData = PluginManager.applyTransformations(
        instance,
        instance.getData(),
        "transformDataBeforeRender",
        "json",
      );

      rendered = compiled(transformedData);

      rendered = PluginManager.applyTransformations(
        instance,
        rendered,
        "transformCompiledHtml",
        "html",
      );

      Debug.debug(`[InstanceMethods] Template rendered result`, {
        instanceName: instance.instanceName,
        template: instance.templateId,
        renderedLength: rendered ? rendered.length : 0,
        renderedPreview: rendered ? rendered.substring(0, 200) + "..." : "null/undefined",
        hasContent: rendered && rendered.trim().length > 0,
      });
    }

    if (rendered === instance._lastRenderedOutput) {
      Debug.debug(`[InstanceMethods] No output change for ${instance.instanceName}. Skipping DOM update.`);
      return;
    }

    const activeElements = Array.from(instance.elements).filter((el) =>
      document.body.contains(el),
    );

    if (activeElements.length === 0) {
      Debug.error("No active elements found for instance", instance.instanceName);
      return;
    }

    if (!instance.groupName) {
      try {
        PluginManager.executeHook("updateData", instance, {
          newData: instance.data,
          source: "proxy",
        });
        EventSystem.publish("updateData", {
          instanceName: instance.instanceName,
          newData: instance.data,
          source: "proxy",
        });
      } catch (e) {
        Debug.error("Error executing updateData hooks/events", e);
      }
    }

    const updatePromises = activeElements.map((element) =>
      domBatcher.write(
        () => applyDomUpdate(element as HTMLElement, rendered, !!instance.animate, instance),
        `update-${instance.instanceName}-${Date.now()}`,
      ),
    );

    const results = await Promise.all(updatePromises);

    instance._lastRenderedOutput = rendered;
    if (!instance.groupName && ConfigService.isStorageEnabled()) {
      const storageId = instance.instanceName.replace("#", "");
      saveToLocalStorage(storageId, instance.data, "instance");
    }

    return results;
  } catch (error) {
    Debug.error("Error updating DOM for instance", instance.instanceName, error);
  } finally {
    instance._isEvaluating = false;
    if ((instance as any)._hasPendingUpdate) {
      Debug.debug("Pending updates detected post-eval, scheduling another _updateDOM", instance.instanceName);
      (instance as any)._hasPendingUpdate = false;
      if (instance._updateTimer) clearTimeout(instance._updateTimer);
      instance._updateTimer = setTimeout(() => {
        instance._updateDOM();
        instance._updateTimer = null;
      }, 0);
    }
  }
}


