import { Debug } from "./Debug";

// * For each element with an fp-proxy attribute, use a proxy for the url
//use const url = 'https://corsproxy.io/?' + encodeURIComponent([hx-get/post/put/patch/delete] attribute value)]);
export function setupProxy(element) {
  try {
    // Skip if already processed or if fp-proxy is false/not present
    if (
      element.hasAttribute("data-fp-proxy-processed") ||
      !element.hasAttribute("fp-proxy") ||
      element.getAttribute("fp-proxy") === "false"
    ) {
      return element;
    }

    // Get proxy URL
    const proxyUrl = element.getAttribute("fp-proxy").startsWith("http")
      ? element.getAttribute("fp-proxy")
      : "https://corsproxy.io/?";

    // Process htmx methods
    const methods = ["get", "post", "put", "patch", "delete"];
    methods.forEach(function (method) {
      if (element.hasAttribute("hx-" + method)) {
        const url = element.getAttribute("hx-" + method);
        element.setAttribute(
          "hx-" + method,
          proxyUrl + encodeURIComponent(url),
        );
      }
    });

    // Mark as processed
    element.setAttribute("data-fp-proxy-processed", "true");
    return element;
  } catch (error) {
    Debug.log(Debug.levels.ERROR, `Error in setupProxy: ${error.message}`);
    return element;
  }
}
