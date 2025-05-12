import { AttributeMatcher } from "../utils/AttributeMatcher";
import { _state } from "./State";

export function animate(element, callback) {
  var shouldAnimate =
    AttributeMatcher._getRawAttribute(element, "animation") ||
    _state.defaults.animation;
  if (!shouldAnimate) {
    callback();
    return;
  } else {
    var transition = document.startViewTransition(callback);
  }
}
