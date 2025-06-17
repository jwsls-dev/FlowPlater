import { Debug } from "./Debug";
import { FlowPlaterElement } from "../types";

// Add hx-ext="flowplater" attribute to elements that need the extension
export function addHtmxExtensionAttribute(element: FlowPlaterElement) {
  try {
    // Check if the element already has the flowplater extension
    var currentExt = element.getAttribute("hx-ext") || "";
    if (!currentExt.includes("flowplater")) {
      // Add flowplater to hx-ext
      var newExt = currentExt ? currentExt + ", flowplater" : "flowplater";
      element.setAttribute("hx-ext", newExt);
      Debug.info("Added hx-ext attribute to " + element.id);
    }
    return element;
  } catch (error: any) {
    Debug.info(`Error in addHtmxExtensionAttribute: ${error.message}`);
    return element;
  }
}
