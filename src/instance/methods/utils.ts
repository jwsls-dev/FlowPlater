import { Debug } from "../../core/Debug";
import { FlowPlaterInstance } from "../../types";

export function resolvePath(instance: FlowPlaterInstance, path: string): any {
  const pathParts = path.split(/[\.\[\]'\"]/);
  let current: any = instance.data;
  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    if (part === "") continue;
    if (current === undefined || current === null || !Object.prototype.hasOwnProperty.call(current, part)) {
      return undefined;
    }
    current = current[part];
  }
  return current;
}

export function validateData(data: any): { valid: boolean; isHtml: boolean } {
  if (typeof data === "string" && data.trim().startsWith("<!DOCTYPE")) {
    Debug.debug("Data is HTML, skipping validation");
    return { valid: true, isHtml: true };
  }

  if (
    (typeof data === "object" && data !== null) ||
    Array.isArray(data) ||
    typeof data === "number" ||
    typeof data === "boolean"
  ) {
    return { valid: true, isHtml: false };
  }

  Debug.error("Invalid data type: " + typeof data);
  return { valid: false, isHtml: false };
}


