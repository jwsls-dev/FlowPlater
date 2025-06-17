import { AttributeMatcher } from "../utils/AttributeMatcher";
import { _state } from "./State";
import { FlowPlaterElement } from "../types";

export function animate(element: FlowPlaterElement, callback: () => void) {
  var shouldAnimate =
    AttributeMatcher._getRawAttribute(element, "animation") ||
    _state.defaults.animation;
  if (!shouldAnimate) {
    callback();
    return;
  } else {
    document.startViewTransition(callback);
  }
}
