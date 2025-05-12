import { Debug } from "../core/Debug";
import { AttributeMatcher } from "../utils/AttributeMatcher";

export function processUrlAffixes(element) {
  try {
    const methods = ["get", "post", "put", "patch", "delete"];

    function processElement(el) {
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

          el.setAttribute(attr, modifiedUrl);
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
  } catch (error) {
    Debug.error(`Error in processUrlAffixes: ${error.message}`);
    return element;
  }
}
