import { Debug } from "../../core/Debug";
import { deepMerge } from "../../storage/DataTransformers";
import type { FlowPlaterInstance } from "../../types";

export function setData(this: FlowPlaterInstance, newData: any) {
  const instance = this;

  if (!instance) {
    Debug.error("Instance not found: " + String((instance as any)?.instanceName ?? "unknown"));
    return this;
  }

  if (
    typeof newData === "string" ||
    typeof newData === "number" ||
    Array.isArray(newData)
  ) {
    Debug.warn(`{setData} Received raw value or unnamed root object, wrapping in 'data' property`);
    newData = { data: newData };
  }

  if (typeof newData !== "object" || newData === null || Array.isArray(newData)) {
    Debug.error("Invalid newData type provided to setData: " + typeof newData);
    return this;
  }

  const currentData = instance.data as any;

  Debug.debug(
    `[setData] Replacing data for ${instance.instanceName}. Current keys: ${Object.keys(currentData).join(
      ", ",
    )}, New keys: ${Object.keys(newData).join(", ")}`,
  );

  let deletedKeys: string[] = [];
  for (const key in currentData) {
    if (
      Object.hasOwnProperty.call(currentData, key) &&
      !Object.hasOwnProperty.call(newData, key)
    ) {
      deletedKeys.push(key);
      delete currentData[key];
    }
  }
  if (deletedKeys.length > 0) {
    Debug.debug(`[setData] Deleted stale keys for ${instance.instanceName}: ${deletedKeys.join(", ")}`);
  }

  deepMerge(currentData, newData);

  Debug.debug(`[setData] Data replacement complete for ${instance.instanceName}.`);

  return this;
}


