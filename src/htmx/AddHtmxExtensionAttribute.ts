import { Debug } from "../core/Debug";
import { FlowPlaterElement } from "../types";

// Add hx-ext="flowplater" attribute to elements that need the extension
export function addHtmxExtensionAttribute(element: FlowPlaterElement) {
  try {
    // Check if the element already has the flowplater extension
    const currentExt = element.getAttribute("hx-ext") || "";
    if (!currentExt.includes("flowplater")) {
      // Add flowplater to hx-ext
      const newExt = currentExt ? currentExt + ", flowplater" : "flowplater";
      element.setAttribute("hx-ext", newExt);
      Debug.info("Added hx-ext attribute to " + element.id);
    }
    return element;
  } catch (error: any) {
    Debug.error(`Error in addHtmxExtensionAttribute: ${error.message}`);
    return element;
  }
}
