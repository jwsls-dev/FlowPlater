import type { FlowPlaterInstance } from "../../types";

export function getData(this: FlowPlaterInstance) {
  const proxy = this.data as any;
  try {
    // @ts-ignore structuredClone in modern environments
    if (typeof structuredClone === "function") {
      return structuredClone(proxy);
    }
  } catch (_) {}
  return JSON.parse(JSON.stringify(proxy));
}


