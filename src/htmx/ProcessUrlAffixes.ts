import { Debug } from "../core/Debug";
import { AttributeMatcher } from "../dom/AttributeMatcher";

export function processUrlAffixes(element: HTMLElement): HTMLElement {
  try {
    const methods = ["get", "post", "put", "patch", "delete"];

    function processElement(el: HTMLElement) {
      methods.forEach(function (method) {
        var attr = "hx-" + method;
        if (el.hasAttribute(attr)) {
          var originalUrl = el.getAttribute(attr);
          Debug.info("Original URL: " + originalUrl);

          var prepend = AttributeMatcher.findAttribute(el, "prepend");
          var append = AttributeMatcher.findAttribute(el, "append");

          var modifiedUrl = originalUrl;
          if (prepend) {
            modifiedUrl = prepend + modifiedUrl;
          }
          if (append) {
            modifiedUrl += append;
          }

          if (modifiedUrl) {
            el.setAttribute(attr, modifiedUrl);
          }
          Debug.info("Modified URL: " + modifiedUrl);

          if (modifiedUrl !== originalUrl) {
            Debug.info("Modification successful for", method, "on element", el);
          } else {
            Debug.error("Modification failed for", method, "on element", el);
          }
        }
      });
    }

    // Process the passed element
    if (
      (AttributeMatcher._hasAttribute(element, "prepend") ||
        AttributeMatcher._hasAttribute(element, "append")) &&
      methods.some((method) => element.hasAttribute("hx-" + method))
    ) {
      processElement(element);
    }
    return element;
  } catch (error: any) {
    Debug.error(`Error in processUrlAffixes: ${error.message}`);
    return element;
  }
}
