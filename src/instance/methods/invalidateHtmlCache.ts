import { Debug } from "../../core/Debug";
import type { FlowPlaterInstance } from "../../types";

export function invalidateHtmlCache(this: FlowPlaterInstance) {
  this._lastRenderedOutput = undefined as any;
  Debug.debug(`[Instance] Invalidated HTML cache for ${this.instanceName}`);
}


