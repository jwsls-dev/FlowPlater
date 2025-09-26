import type { FlowPlaterInstance } from "../../types";
import { resolvePath } from "./utils";

export function get(this: FlowPlaterInstance, path: string) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const instance = this;
  return !path ? instance.getData?.() : resolvePath(instance, path);
}


