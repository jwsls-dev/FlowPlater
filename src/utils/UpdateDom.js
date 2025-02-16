import { Debug } from "../core/Debug";
import { Performance } from "./Performance";

/**
 * Creates a virtual DOM node from an HTML string
 * @param {string} html
 * @returns {DocumentFragment}
 */
function createVirtualNode(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();

  // Handle SVG elements
  const svgElements = template.content.querySelectorAll("svg");
  svgElements.forEach((svg) => {
    Array.from(svg.attributes).forEach((attr) => {
      // Ensure correct namespace for SVG attributes
      if (attr.name.startsWith("xlink:")) {
        svg.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          attr.name,
          attr.value,
        );
      }
    });
  });

  return template.content;
}

/**
 * Updates only the necessary parts of the DOM by comparing the new HTML with the existing content
 * @param {HTMLElement} element - The target DOM element to update
 * @param {string} newHTML - The new HTML content
 */
function updateDOM(element, newHTML) {
  Performance.start("updateDOM");

  const trimmedNewHTML = newHTML.trim();

  // Quick equality check to avoid unnecessary updates
  if (element.innerHTML.trim() === trimmedNewHTML) {
    Performance.end("updateDOM");
    return;
  }

  try {
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error("Invalid target element");
    }

    if (typeof newHTML !== "string") {
      throw new Error("newHTML must be a string");
    }

    Debug.log(
      Debug.levels.INFO,
      `Updating DOM for element:`,
      element,
      `with new HTML length: ${trimmedNewHTML.length}`,
    );

    const virtualFragment = createVirtualNode(trimmedNewHTML);
    diffNodes(element, virtualFragment);
  } catch (error) {
    Debug.log(Debug.levels.ERROR, "Error in updateDOM:", error);
    throw error;
  } finally {
    Performance.end("updateDOM");
  }
}

function diffNodes(currentNode, newNode) {
  // Handle null cases first
  if (!currentNode || !newNode) return;

  // Quick equality check for identical nodes
  if (currentNode.isEqualNode(newNode)) {
    return;
  }

  // Compare children
  const currentChildren = Array.from(currentNode.childNodes);
  const newChildren = Array.from(newNode.childNodes);

  // Track processed nodes to handle moves and additions efficiently
  const processed = new Set();

  // First pass: update existing nodes and mark matches
  currentChildren.forEach((currentChild, i) => {
    const newChild = newChildren[i];

    // Skip if nodes are identical
    if (currentChild && newChild && currentChild.isEqualNode(newChild)) {
      processed.add(i);
      return;
    }

    // Look for matching node in new children
    const matchIndex = newChildren.findIndex(
      (node, index) =>
        !processed.has(index) &&
        node.nodeType === currentChild.nodeType &&
        node.nodeName === currentChild.nodeName,
    );

    if (matchIndex !== -1) {
      // Update matching node
      processed.add(matchIndex);
      updateNode(currentChild, newChildren[matchIndex]);
    } else if (!newChildren[i]) {
      // Remove if no new node exists at this position
      currentChild.remove();
    }
  });

  // Second pass: add new nodes that weren't processed
  newChildren.forEach((newChild, i) => {
    if (!processed.has(i)) {
      currentNode.appendChild(newChild.cloneNode(true));
    }
  });
}

function updateNode(currentNode, newNode) {
  if (!currentNode || !newNode) return;

  // Handle text nodes
  if (currentNode.nodeType === Node.TEXT_NODE) {
    if (currentNode.textContent !== newNode.textContent) {
      currentNode.textContent = newNode.textContent;
    }
    return;
  }

  // Handle element nodes
  if (currentNode.nodeType === Node.ELEMENT_NODE) {
    // Update attributes
    updateAttributes(currentNode, newNode);

    // Special element handling
    if (
      currentNode instanceof HTMLInputElement ||
      currentNode instanceof HTMLTextAreaElement
    ) {
      if (currentNode.value !== newNode.value) {
        currentNode.value = newNode.value;
      }
      return;
    }

    if (currentNode instanceof HTMLSelectElement) {
      if (currentNode.value !== newNode.value) {
        currentNode.value = newNode.value;
        Array.from(currentNode.options).forEach((option, index) => {
          option.selected = newNode.options[index]?.selected ?? false;
        });
      }
      return;
    }

    // Handle custom elements
    if (isCustomElement(currentNode)) {
      updateCustomElement(currentNode, newNode);
      return;
    }

    // Recursively update children
    diffNodes(currentNode, newNode);
  }
}

/**
 * Updates attributes of the current node based on the new node
 * @param {Element} currentNode
 * @param {Element} newNode
 */
function updateAttributes(currentNode, newNode) {
  const currentAttrs = new Set(
    Array.from(currentNode.attributes || []).map((a) => a.name),
  );
  const newAttrs = Array.from(newNode.attributes || []);

  // Remove old attributes in one pass
  currentAttrs.forEach((name) => {
    if (!newNode.hasAttribute(name)) {
      if (name === "style") currentNode.style.cssText = "";
      else if (name.startsWith("on")) {
        const handler = currentNode[name];
        typeof handler === "function" &&
          currentNode.removeEventListener(name.slice(2).toLowerCase(), handler);
      } else currentNode.removeAttribute(name);
    }
  });

  // Update new attributes in one pass
  newAttrs.forEach((attr) => {
    const { name, value } = attr;
    if (name === "style") updateStyles(currentNode, newNode);
    else if (name.startsWith("--")) currentNode.style.setProperty(name, value);
    else if (name.startsWith("on")) {
      const eventName = name.slice(2).toLowerCase();
      const oldHandler = currentNode[name];
      const newHandler = newNode[name];

      if (oldHandler !== newHandler) {
        typeof oldHandler === "function" &&
          currentNode.removeEventListener(eventName, oldHandler);
        typeof newHandler === "function" &&
          currentNode.addEventListener(eventName, newHandler);
      }
    } else if (currentNode.getAttribute(name) !== value) {
      currentNode.setAttribute(name, value);
    }
  });
}

/**
 * Updates inline styles of the current node based on the new node
 * @param {Element} currentNode
 * @param {Element} newNode
 */
function updateStyles(currentNode, newNode) {
  const currentStyle = currentNode.style;
  const newStyles = newNode.getAttribute("style")?.split(";") || [];

  // Clear existing styles
  currentStyle.cssText = "";

  // Apply new styles in one operation
  if (newStyles.length) {
    const styleMap = new Map(
      newStyles
        .map((s) => s.split(":").map((x) => x.trim()))
        .filter(([p, v]) => p && v),
    );
    currentStyle.cssText = Array.from(styleMap)
      .map(([p, v]) => `${p}:${v}`)
      .join(";");
  }
}

/**
 * Checks if a node is a custom element
 * @param {Element} node
 * @returns {boolean}
 */
function isCustomElement(node) {
  return node.tagName && node.tagName.includes("-");
}

/**
 * Updates a custom element's properties and attributes
 * @param {HTMLElement} currentElement
 * @param {HTMLElement} newElement
 */
function updateCustomElement(currentElement, newElement) {
  updateAttributes(currentElement, newElement);

  // Update properties in one pass
  Object.getOwnPropertyNames(newElement)
    .filter(
      (prop) =>
        !["attributes", "children", "innerHTML"].includes(prop) &&
        typeof newElement[prop] !== "function" &&
        currentElement[prop] !== newElement[prop],
    )
    .forEach((prop) => (currentElement[prop] = newElement[prop]));

  // Update children if no shadowRoot
  if (!currentElement.shadowRoot) {
    const currentChildren = Array.from(currentElement.childNodes);
    const newChildren = Array.from(newElement.childNodes);
    const maxLength = Math.max(currentChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
      diffNodes(currentChildren[i], newChildren[i], currentElement);
    }
  }
}

export { updateDOM };
