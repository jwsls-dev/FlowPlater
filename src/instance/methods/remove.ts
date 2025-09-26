import { removeFromLocalStorage } from "../../storage/IDBStorage";
import { Debug } from "../../core/Debug";
import { EventSystem } from "../../events/EventSystem";
import { _state } from "../../core/State";
import { ConfigService } from "../../core/ConfigService";
import type { FlowPlaterInstance } from "../../types";
import { FlowPlaterError } from "../../core/Debug";

export async function remove(this: FlowPlaterInstance) {
  const instance = this;

  if (!instance) {
    throw new FlowPlaterError("Instance not found: unknown");
  }

  EventSystem.publish("beforeRemove", {
    instanceName: instance.instanceName,
    elements: instance.elements,
  });

  try {
    if (ConfigService.isStorageEnabled()) {
      try {
        removeFromLocalStorage(instance.instanceName, "instance");
      } catch {}
    }

    instance.elements.forEach(function (element) {
      try {
        (element as HTMLElement).innerHTML = "";
      } catch (error) {
        Debug.error("Error removing instance: " + (error as Error).message);
      }
    });

    instance.elements = [];
    delete _state.instances[instance.instanceName];
    delete _state.templateCache[instance.templateId];

    EventSystem.publish("afterRemove", {
      instanceName: instance.instanceName,
      elements: [],
    });

    Debug.info("Removed instance: " + instance.instanceName);
    return true;
  } catch (error) {
    throw error;
  }
}


