import { Debug } from "../core/Debug";
import { Performance } from "./Performance";

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const DOCUMENT_FRAGMENT_NODE = 11;
const NS_XHTML = "http://www.w3.org/1999/xhtml";
const NS_SVG = "http://www.w3.org/2000/svg";
const NS_XLINK = "http://www.w3.org/1999/xlink";

/**
 * Creates a virtual DOM node from an HTML string with optimized template support
 * @param {string} html
 * @returns {DocumentFragment}
 */
function createVirtualNode(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();

  // Handle SVG elements with proper namespacing
  const svgElements = template.content.querySelectorAll("svg");
  svgElements.forEach((svg) => {
    svg.setAttribute("xmlns", NS_SVG);
    Array.from(svg.attributes).forEach((attr) => {
      if (attr.name.startsWith("xlink:")) {
        svg.setAttributeNS(NS_XLINK, attr.name, attr.value);
      }
    });
  });

  return template.content;
}

/**
 * Compare node names with case sensitivity handling
 * @param {Element} fromEl
 * @param {Element} toEl
 * @returns {boolean}
 */
function compareNodeNames(fromEl, toEl) {
  const fromNodeName = fromEl.nodeName;
  const toNodeName = toEl.nodeName;

  if (fromNodeName === toNodeName) return true;

  const fromCodeStart = fromNodeName.charCodeAt(0);
  const toCodeStart = toNodeName.charCodeAt(0);

  // Handle case sensitivity for HTML vs SVG elements
  if (fromCodeStart <= 90 && toCodeStart >= 97) {
    return fromNodeName === toNodeName.toUpperCase();
  } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
    return toNodeName === fromNodeName.toUpperCase();
  }

  return false;
}

const specialElHandlers = {
  OPTION: function (fromEl, toEl) {
    syncBooleanAttrProp(fromEl, toEl, "selected");
  },
  INPUT: function (fromEl, toEl) {
    syncBooleanAttrProp(fromEl, toEl, "checked");
    syncBooleanAttrProp(fromEl, toEl, "disabled");

    if (fromEl.value !== toEl.value) {
      fromEl.value = toEl.value;
    }
    if (!toEl.hasAttribute("value")) {
      fromEl.removeAttribute("value");
    }
  },
  TEXTAREA: function (fromEl, toEl) {
    const newValue = toEl.value;
    if (fromEl.value !== newValue) {
      fromEl.value = newValue;
    }

    const firstChild = fromEl.firstChild;
    if (firstChild) {
      // Handle IE placeholder edge case
      const oldValue = firstChild.nodeValue;
      if (
        oldValue === newValue ||
        (!newValue && oldValue === fromEl.placeholder)
      ) {
        return;
      }
      firstChild.nodeValue = newValue;
    }
  },
  SELECT: function (fromEl, toEl) {
    if (!toEl.hasAttribute("multiple")) {
      let selectedIndex = -1;
      let i = 0;
      let curChild = fromEl.firstChild;
      let optgroup;

      while (curChild) {
        const nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
        if (nodeName === "OPTGROUP") {
          optgroup = curChild;
          curChild = optgroup.firstChild;
        } else {
          if (nodeName === "OPTION") {
            if (curChild.hasAttribute("selected")) {
              selectedIndex = i;
              break;
            }
            i++;
          }
          curChild = curChild.nextSibling;
          if (!curChild && optgroup) {
            curChild = optgroup.nextSibling;
            optgroup = null;
          }
        }
      }
      fromEl.selectedIndex = selectedIndex;
    }
  },
};

/**
 * Sync boolean attributes and properties
 */
function syncBooleanAttrProp(fromEl, toEl, name) {
  if (fromEl[name] !== toEl[name]) {
    fromEl[name] = toEl[name];
    if (fromEl[name]) {
      fromEl.setAttribute(name, "");
    } else {
      fromEl.removeAttribute(name);
    }
  }
}

/**
 * Enhanced attribute updates with namespace support
 */
function updateAttributes(currentNode, newNode) {
  const currentAttrs = new Set(
    Array.from(currentNode.attributes).map((a) => a.name),
  );
  const newAttrs = Array.from(newNode.attributes);

  // Remove old attributes
  currentAttrs.forEach((name) => {
    if (!newNode.hasAttribute(name)) {
      if (name === "style") {
        currentNode.style.cssText = "";
      } else if (name.startsWith("on")) {
        const handler = currentNode[name];
        if (typeof handler === "function") {
          currentNode.removeEventListener(name.slice(2).toLowerCase(), handler);
        }
      } else {
        currentNode.removeAttribute(name);
      }
    }
  });

  // Update new attributes
  newAttrs.forEach((attr) => {
    const { name, value, namespaceURI } = attr;

    if (namespaceURI) {
      // Handle namespaced attributes (SVG, XLink)
      const localName = attr.localName || name;
      if (currentNode.getAttributeNS(namespaceURI, localName) !== value) {
        currentNode.setAttributeNS(namespaceURI, name, value);
      }
    } else if (name === "style") {
      updateStyles(currentNode, newNode);
    } else if (name.startsWith("--")) {
      currentNode.style.setProperty(name, value);
    } else if (name.startsWith("on")) {
      const eventName = name.slice(2).toLowerCase();
      const oldHandler = currentNode[name];
      const newHandler = newNode[name];

      if (oldHandler !== newHandler) {
        if (typeof oldHandler === "function") {
          currentNode.removeEventListener(eventName, oldHandler);
        }
        if (typeof newHandler === "function") {
          currentNode.addEventListener(eventName, newHandler);
        }
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
 * Optimized morphing of DOM elements
 */
function morphElement(fromEl, toEl, keyedElements) {
  // Early bailout for identical nodes
  if (fromEl.isEqualNode(toEl)) return;

  // Handle keyed elements
  const fromKey = fromEl.getAttribute("data-key");
  const toKey = toEl.getAttribute("data-key");

  if (toKey && fromKey !== toKey) {
    const keyedEl = keyedElements.get(toKey);
    if (keyedEl) {
      // Instead of replacing, move the keyed element
      if (keyedEl !== fromEl) {
        fromEl.parentNode.insertBefore(keyedEl, fromEl);
        fromEl.parentNode.removeChild(fromEl);
        fromEl = keyedEl;
      }
    }
  }

  // Handle special elements
  const specialHandler = specialElHandlers[fromEl.nodeName];
  if (specialHandler) {
    specialHandler(fromEl, toEl);
    return;
  }

  // Update attributes only if needed
  if (!fromEl.isEqualNode(toEl)) {
    updateAttributes(fromEl, toEl);
  }

  // Handle different node types - but never replace the root element
  if (!compareNodeNames(fromEl, toEl) && fromEl.parentNode) {
    const newNode = toEl.cloneNode(true);
    fromEl.parentNode.insertBefore(newNode, fromEl);
    fromEl.parentNode.removeChild(fromEl);
    return;
  }

  // Only morph children if there are actual differences
  if (fromEl.childNodes.length || toEl.childNodes.length) {
    morphChildren(fromEl, toEl, keyedElements);
  }
}

/**
 * Optimized children morphing with keyed element handling
 */
function morphChildren(fromEl, toEl, oldKeyedElements, newKeyedElements) {
  console.log("Morphing children from:", fromEl.innerHTML);
  console.log("Morphing children to:", toEl.innerHTML);

  // Special handling for SVG elements
  const isSVG = fromEl instanceof SVGElement;

  // Handle special elements (form inputs, iframes, scripts)
  if (isSpecialElement(fromEl)) {
    handleSpecialElement(fromEl, toEl);
    return;
  }

  // Check for keyed elements first
  const fromKey = fromEl.getAttribute("data-key");
  const toKey = toEl.getAttribute("data-key");

  if (toKey && fromKey !== toKey) {
    const keyedEl = oldKeyedElements.get(toKey);
    if (keyedEl) {
      // Move the keyed element instead of creating a new one
      if (keyedEl !== fromEl) {
        fromEl.parentNode.replaceChild(keyedEl, fromEl);
        fromEl = keyedEl;
      }
    }
  }

  // If either element has no children but has content, handle as mixed content
  if (
    (!fromEl.children.length && fromEl.childNodes.length) ||
    (!toEl.children.length && toEl.childNodes.length)
  ) {
    handleMixedContent(fromEl, toEl);
    return;
  }

  const oldNodes = Array.from(fromEl.childNodes);
  const newNodes = Array.from(toEl.childNodes);

  // If we have exactly one child on both sides, recurse into it
  if (
    oldNodes.length === 1 &&
    newNodes.length === 1 &&
    oldNodes[0].nodeType === newNodes[0].nodeType &&
    oldNodes[0].nodeName === newNodes[0].nodeName
  ) {
    morphChildren(oldNodes[0], newNodes[0], oldKeyedElements, newKeyedElements);
    return;
  }

  let insertPosition = 0;
  const processedPositions = new Set();

  // First pass: handle keyed elements
  newNodes.forEach((newNode, newIndex) => {
    if (newNode.nodeType === Node.ELEMENT_NODE) {
      const key = newNode.getAttribute("data-key");
      if (key) {
        const existingNode = oldKeyedElements.get(key);
        if (existingNode) {
          // Move keyed element to correct position
          fromEl.insertBefore(existingNode, oldNodes[insertPosition] || null);
          processedPositions.add(insertPosition);
          insertPosition++;
          return;
        }
      }
    }
  });

  // Second pass: handle remaining elements
  newNodes.forEach((newNode) => {
    if (processedPositions.has(insertPosition)) {
      insertPosition++;
      return;
    }

    // Find matching node in old nodes (after current position)
    const matchIndex = oldNodes.findIndex(
      (oldNode, oldIndex) =>
        oldIndex >= insertPosition && nodesAreEqual(oldNode, newNode),
    );

    if (matchIndex === -1) {
      // No match found, this is a new node to insert
      const referenceNode = oldNodes[insertPosition];
      const clonedNode = isSVG
        ? cloneWithNamespace(newNode)
        : newNode.cloneNode(true);
      fromEl.insertBefore(clonedNode, referenceNode || null);
      processedPositions.add(insertPosition);
    } else {
      // Found a match, move pointer past it
      insertPosition = matchIndex + 1;
      processedPositions.add(matchIndex);
    }
  });

  // Remove any nodes that weren't processed
  oldNodes.forEach((node, index) => {
    if (!processedPositions.has(index)) {
      fromEl.removeChild(node);
    }
  });
}

function isSpecialElement(el) {
  const specialTags = ["INPUT", "SELECT", "TEXTAREA", "IFRAME", "SCRIPT"];
  return specialTags.includes(el.tagName);
}

function handleSpecialElement(fromEl, toEl) {
  // Preserve form element state
  if (
    fromEl instanceof HTMLInputElement ||
    fromEl instanceof HTMLSelectElement ||
    fromEl instanceof HTMLTextAreaElement
  ) {
    const oldValue = fromEl.value;
    const oldChecked = fromEl.checked;
    const oldSelected =
      fromEl instanceof HTMLSelectElement
        ? Array.from(fromEl.selectedOptions).map((opt) => opt.value)
        : null;

    // Update attributes from new element
    Array.from(toEl.attributes).forEach((attr) => {
      if (attr.name !== "value") {
        // Don't overwrite value from attributes
        fromEl.setAttribute(attr.name, attr.value);
      }
    });

    // Restore state
    fromEl.value = oldValue;
    if (oldChecked !== undefined) fromEl.checked = oldChecked;
    if (oldSelected) {
      oldSelected.forEach((value) => {
        const option = fromEl.querySelector(`option[value="${value}"]`);
        if (option) option.selected = true;
      });
    }
  }

  // Handle iframes and scripts
  if (
    fromEl instanceof HTMLIFrameElement ||
    fromEl instanceof HTMLScriptElement
  ) {
    // Only update attributes, don't touch content
    Array.from(toEl.attributes).forEach((attr) => {
      fromEl.setAttribute(attr.name, attr.value);
    });
  }
}

function handleMixedContent(fromEl, toEl) {
  const oldNodes = Array.from(fromEl.childNodes);
  const newNodes = Array.from(toEl.childNodes);

  // Compare each node type appropriately
  if (oldNodes.length === newNodes.length) {
    oldNodes.forEach((oldNode, i) => {
      const newNode = newNodes[i];
      if (!nodesAreEqual(oldNode, newNode)) {
        fromEl.replaceChild(newNode.cloneNode(true), oldNode);
      }
    });
  } else {
    fromEl.innerHTML = toEl.innerHTML;
  }
}

function nodesAreEqual(node1, node2) {
  if (node1.nodeType !== node2.nodeType) return false;

  if (node1.nodeType === Node.TEXT_NODE) {
    return node1.textContent.trim() === node2.textContent.trim();
  }

  if (node1.nodeType === Node.COMMENT_NODE) {
    return node1.textContent === node2.textContent;
  }

  return node1.isEqualNode(node2);
}

function cloneWithNamespace(node) {
  if (!(node instanceof Element)) return node.cloneNode(true);

  const ns = node.namespaceURI;
  const clone = ns
    ? document.createElementNS(ns, node.tagName)
    : document.createElement(node.tagName);

  // Copy attributes
  Array.from(node.attributes).forEach((attr) => {
    const nsURI = attr.namespaceURI;
    if (nsURI) {
      clone.setAttributeNS(nsURI, attr.name, attr.value);
    } else {
      clone.setAttribute(attr.name, attr.value);
    }
  });

  // Clone children
  Array.from(node.childNodes).forEach((child) => {
    clone.appendChild(cloneWithNamespace(child));
  });

  return clone;
}

/**
 * Creates a signature for a node based on its structure
 * @param {Element} node
 * @returns {string}
 */
function getNodeSignature(node) {
  if (node.nodeType !== ELEMENT_NODE) return "";

  const parts = [node.tagName];

  // Add classes in sorted order
  if (node.classList.length) {
    parts.push([...node.classList].sort().join("."));
  }

  // Add key attributes
  ["id", "type", "role", "name", "data-key"].forEach((attr) => {
    if (node.hasAttribute(attr)) {
      parts.push(`${attr}:${node.getAttribute(attr)}`);
    }
  });

  // Add text content if it's a direct text node
  const directText = Array.from(node.childNodes)
    .filter((child) => child.nodeType === TEXT_NODE)
    .map((child) => child.nodeValue.trim())
    .join("");
  if (directText) {
    parts.push(`text:${directText}`);
  }

  return parts.join("|");
}

/**
 * Main update function with performance tracking and error handling
 */
function updateDOM(element, newHTML) {
  Performance.start("updateDOM");

  try {
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error("Invalid target element");
    }

    if (typeof newHTML !== "string") {
      throw new Error("newHTML must be a string");
    }

    // Create virtual node as a temporary container
    const virtualContainer = document.createElement("div");
    virtualContainer.innerHTML = newHTML.trim();

    // Create indices of keyed elements for both containers
    const oldKeyedElements = new Map();
    const newKeyedElements = new Map();
    indexTree(element, oldKeyedElements);
    indexTree(virtualContainer, newKeyedElements);

    // Now morph the contents with keyed elements
    morphChildren(
      element,
      virtualContainer,
      oldKeyedElements,
      newKeyedElements,
    );
  } catch (error) {
    Debug.log(Debug.levels.ERROR, "Error in updateDOM:", error);
    console.error("UpdateDOM error:", error);
    throw error;
  } finally {
    Performance.end("updateDOM");
  }
}

/**
 * Enhanced tree indexing with optimized traversal
 */
function indexTree(node, keyedElements) {
  const walker = document.createTreeWalker(
    node,
    NodeFilter.SHOW_ELEMENT,
    null,
    false,
  );

  let currentNode;
  while ((currentNode = walker.nextNode())) {
    const key = currentNode.getAttribute("data-key");
    if (key) {
      keyedElements.set(key, currentNode);
    }
  }
}

export { updateDOM };
