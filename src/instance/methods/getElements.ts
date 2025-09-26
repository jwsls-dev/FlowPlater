import type { FlowPlaterInstance, FlowPlaterElement } from "../../types";

export function getElements(this: FlowPlaterInstance): FlowPlaterElement[] {
  return this.elements;
}


