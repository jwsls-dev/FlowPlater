import { Debug } from "./Debug";
import { AttributeMatcher } from "../utils/AttributeMatcher";

function preloadUrl(url) {
  if (!url) {
    Debug.error("No URL provided for preloading");
    return;
  }

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;
  link.as = "fetch";
  link.crossOrigin = "anonymous";

  const cleanup = () => {
    if (link.parentNode) {
      link.remove();
    }
  };

  link.onerror = (e) => {
    Debug.error(`Failed to preload URL: ${url}`, e);
    cleanup();
  };

  const timeoutId = setTimeout(cleanup, 3000);
  document.head.appendChild(link);

  return { cleanup, timeoutId };
}

function addPreloadListener(element) {
  const preloadEvent =
    AttributeMatcher._getRawAttribute(element, "preload") || "mouseover";

  if (preloadEvent === "mouseover") {
    let mouseOver = true;
    let timeoutId;
    let preloadInstance;

    const handleMouseOver = () => {
      mouseOver = true;
      timeoutId = setTimeout(() => {
        if (mouseOver) {
          const url =
            element.getAttribute("href") ||
            AttributeMatcher._getRawAttribute(element, "get");
          preloadInstance = preloadUrl(url);
        }
      }, 100);
    };

    const handleMouseOut = () => {
      mouseOver = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (preloadInstance) {
        clearTimeout(preloadInstance.timeoutId);
        preloadInstance.cleanup();
      }
    };

    element.addEventListener("mouseover", handleMouseOver);
    element.addEventListener("mouseout", handleMouseOut);

    // Store cleanup function on element for potential removal
    element._preloadCleanup = () => {
      element.removeEventListener("mouseover", handleMouseOver);
      element.removeEventListener("mouseout", handleMouseOut);
      handleMouseOut();
    };
  } else {
    const handler = () => {
      const url =
        element.getAttribute("href") ||
        AttributeMatcher._getRawAttribute(element, "get");
      preloadUrl(url);
    };
    element.addEventListener(preloadEvent, handler);

    // Store cleanup function
    element._preloadCleanup = () => {
      element.removeEventListener(preloadEvent, handler);
    };
  }
}

export function processPreload(element) {
  try {
    if (element.hasAttribute("data-fp-preload-processed")) {
      return element;
    }

    if (AttributeMatcher._hasAttribute(element, "preload")) {
      addPreloadListener(element);
      element.setAttribute("data-fp-preload-processed", "true");
    }

    return element;
  } catch (error) {
    Debug.error(`Error in processPreload: ${error.message}`);
    return element;
  }
}
