import { Debug } from "./Debug";

// prettier-ignore
const htmxAttributes = ["boost", "get", "post", "on", "push-url", "select", "select-oob",
        "swap", "swap-oob", "target", "trigger", "vals", "confirm", "delete", "disable", 
        "disabled-elt", "disinherit", "encoding", "ext", "headers", "history", "history-elt", 
        "include", "indicator", "params", "patch", "preserve", "prompt", "put", "replace-url", 
        "request", "sync", "validate", "vars",
    ];

// * For every element with an fp-[htmxAttribute] attribute, translate to hx-[htmxAttribute]
export function translateCustomHTMXAttributes(element) {
  try {
    const customPrefix = "fp-";
    const htmxPrefix = "hx-";

    htmxAttributes.forEach((attr) => {
      const customAttr = customPrefix + attr;
      if (element.hasAttribute(customAttr)) {
        const attrValue = element.getAttribute(customAttr);
        element.setAttribute(htmxPrefix + attr, attrValue);
        element.removeAttribute(customAttr);
      }
    });
    return element;
  } catch (error) {
    Debug.error(`Error in translateCustomHTMXAttributes: ${error.message}`);
    return element;
  }
}
