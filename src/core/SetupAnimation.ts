import { Debug } from "./Debug";
import { _state } from "./State";
import { AttributeMatcher } from "../utils/AttributeMatcher";

// * For each element with an fp-animation attribute set to true, or if defaults.animation is true, get the hx-swap attribute.
// if the value is empty, set it to innerHTML transition:true
// if the value is not empty, append transition:true
// if the value is set to false, do nothing
export function setupAnimation(element: HTMLElement): HTMLElement {
  try {
    var shouldAnimate =
      AttributeMatcher._getRawAttribute(element, "animation") ||
      _state.defaults.animation;
    if (shouldAnimate === "true") {
      var swap = element.getAttribute("hx-swap");
      if (!swap) {
        element.setAttribute("hx-swap", "innerHTML transition:true");
      } else {
        element.setAttribute("hx-swap", swap + " transition:true");
      }
    }
    return element;
  } catch (error: any) {
    Debug.error(`Error in setupAnimation: ${error.message}`);
    return element;
  }
}
