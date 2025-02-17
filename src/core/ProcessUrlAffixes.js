import { Debug, log, errorLog } from "../core/Debug";

export function processUrlAffixes(element) {
  try {
    const methods = ["get", "post", "put", "patch", "delete"];

    function findAttributeInParents(el, attributeName) {
      while (el) {
        if (el.hasAttribute(attributeName)) {
          return el.getAttribute(attributeName);
        }
        el = el.parentElement;
      }
      return null;
    }

    function processElement(el) {
      methods.forEach(function (method) {
        var attr = "hx-" + method;
        if (el.hasAttribute(attr)) {
          var originalUrl = el.getAttribute(attr);
          log("Original URL: " + originalUrl);

          var prepend = findAttributeInParents(el, "fp-prepend");
          var append = findAttributeInParents(el, "fp-append");

          var modifiedUrl = originalUrl;
          if (prepend) {
            modifiedUrl = prepend + modifiedUrl;
          }
          if (append) {
            modifiedUrl += append;
          }

          el.setAttribute(attr, modifiedUrl);
          log("Modified URL: " + modifiedUrl);

          if (modifiedUrl !== originalUrl) {
            log("Modification successful for", method, "on element", el);
          } else {
            errorLog("Modification failed for", method, "on element", el);
          }
        }
      });
    }

    // Process the passed element
    if (
      (element.hasAttribute("fp-prepend") ||
        element.hasAttribute("fp-append")) &&
      methods.some((method) => element.hasAttribute("hx-" + method))
    ) {
      processElement(element);
    }
    return element;
  } catch (error) {
    errorLog(`Error in processUrlAffixes: ${error.message}`);
    return element;
  }
}
