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
  if (!currentNode || !newNode) return;
  if (currentNode.isEqualNode(newNode)) return;

  const currentChildren = Array.from(currentNode.childNodes);
  const newChildren = Array.from(newNode.childNodes);

  // Create similarity matrix between current and new children
  const similarityMatrix = currentChildren.map((current) =>
    newChildren.map((next) => calculateNodeSimilarity(current, next)),
  );

  // Track which nodes have been processed
  const processedCurrent = new Set();
  const processedNew = new Set();

  // First pass: handle highly similar nodes (likely the same element with minor changes)
  similarityMatrix.forEach((similarities, currentIndex) => {
    const maxSimilarity = Math.max(...similarities);
    if (maxSimilarity > 0.8) {
      // Threshold for considering nodes "same but modified"
      const newIndex = similarities.indexOf(maxSimilarity);
      if (!processedNew.has(newIndex)) {
        updateNode(currentChildren[currentIndex], newChildren[newIndex]);
        processedCurrent.add(currentIndex);
        processedNew.add(newIndex);
      }
    }
  });

  // Second pass: handle new insertions efficiently
  newChildren.forEach((newChild, newIndex) => {
    if (processedNew.has(newIndex)) return;

    // Find the best position to insert the new node
    const bestPosition = findBestInsertionPosition(
      newChild,
      currentChildren,
      newChildren,
      newIndex,
      similarityMatrix,
    );

    const clone = newChild.cloneNode(true);
    if (bestPosition < currentChildren.length) {
      currentNode.insertBefore(clone, currentChildren[bestPosition]);
    } else {
      currentNode.appendChild(clone);
    }
    processedNew.add(newIndex);
  });

  // Final pass: remove unmatched current nodes
  currentChildren.forEach((child, index) => {
    if (!processedCurrent.has(index)) {
      child.remove();
    }
  });
}

/**
 * Calculates similarity score between two nodes (0 to 1)
 * @param {Node} node1
 * @param {Node} node2
 * @returns {number}
 */
function calculateNodeSimilarity(node1, node2) {
  if (!node1 || !node2) return 0;
  if (node1.nodeType !== node2.nodeType) return 0;

  if (node1.nodeType === Node.TEXT_NODE) {
    const text1 = node1.textContent.trim();
    const text2 = node2.textContent.trim();
    return text1 === text2 ? 1 : 0;
  }

  if (node1.nodeType === Node.ELEMENT_NODE) {
    if (node1.tagName !== node2.tagName) return 0;

    // Compare structure
    const structureSimilarity =
      node1.children.length === node2.children.length ? 0.3 : 0;

    // Compare attributes
    const attrs1 = Array.from(node1.attributes || []);
    const attrs2 = Array.from(node2.attributes || []);
    const attrSimilarity = attrs1.length === attrs2.length ? 0.3 : 0;

    // Compare content
    const contentSimilarity = node1.textContent === node2.textContent ? 0.4 : 0;

    return structureSimilarity + attrSimilarity + contentSimilarity;
  }

  return 0;
}

/**
 * Finds the optimal position to insert a new node
 * @param {Node} newNode
 * @param {Node[]} currentChildren
 * @param {Node[]} newChildren
 * @param {number} newIndex
 * @param {number[][]} similarityMatrix
 * @returns {number}
 */
function findBestInsertionPosition(
  newNode,
  currentChildren,
  newChildren,
  newIndex,
  similarityMatrix,
) {
  // Look at surrounding nodes in the new children
  const prevNew = newChildren[newIndex - 1];
  const nextNew = newChildren[newIndex + 1];

  // Find where these nodes are in the current children
  let prevCurrentIndex = -1;
  let nextCurrentIndex = -1;

  if (prevNew) {
    prevCurrentIndex = currentChildren.findIndex(
      (node) => calculateNodeSimilarity(node, prevNew) > 0.8,
    );
  }

  if (nextNew) {
    nextCurrentIndex = currentChildren.findIndex(
      (node) => calculateNodeSimilarity(node, nextNew) > 0.8,
    );
  }

  // Determine best position based on surrounding nodes
  if (prevCurrentIndex !== -1 && nextCurrentIndex !== -1) {
    return prevCurrentIndex + 1;
  } else if (prevCurrentIndex !== -1) {
    return prevCurrentIndex + 1;
  } else if (nextCurrentIndex !== -1) {
    return nextCurrentIndex;
  }

  // Fallback to proportional position
  return Math.floor((newIndex * currentChildren.length) / newChildren.length);
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
