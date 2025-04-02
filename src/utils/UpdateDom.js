import { Debug } from "../core/Debug";
import { Performance } from "./Performance";
import { _state } from "../core/State";
import { EventSystem } from "../core/EventSystem";
import PluginManager from "../core/PluginManager";
import { InstanceManager } from "../core/InstanceManager";
import {
  captureFormStates,
  restoreFormStates,
  setupFormSubmitHandlers,
  preserveElementState,
  updateElementAttributes,
  setupDynamicFormObserver,
  shouldRestoreForm,
} from "../utils/FormPersistence";
/**
 * Optimized children morphing with keyed element handling
 */
function morphChildren(fromEl, toEl, oldKeyedElements, newKeyedElements) {
  // Handle empty initial state
  if (!fromEl.childNodes.length) {
    fromEl.innerHTML = toEl.innerHTML;

    // Setup form persistence if enabled
    if (_state.config?.persistForm) {
      setupFormSubmitHandlers(
        fromEl,
        "updateDOM - form state restoration - setupFormSubmitHandlers",
      );
    }
    return;
  }

  // Special handling for form inputs - preserve their state completely
  if (fromEl instanceof HTMLInputElement) {
    preserveElementState(fromEl, toEl);
    return;
  }

  // Special handling for SVG elements
  const isSVG = fromEl instanceof SVGElement;

  // Handle special elements (form inputs, iframes, scripts)
  if (isSpecialElement(fromEl)) {
    if (
      fromEl instanceof HTMLIFrameElement ||
      fromEl instanceof HTMLScriptElement
    ) {
      updateElementAttributes(fromEl, toEl);
    } else {
      preserveElementState(fromEl, toEl);
    }
    return;
  }

  // If either element has no children but has content, handle as mixed content
  if (
    (!fromEl.children.length && fromEl.childNodes.length) ||
    (!toEl.children.length && toEl.childNodes.length)
  ) {
    handleMixedContent(fromEl, toEl);
    return;
  }

  // Capture form states if persistForm is enabled
  let formStates = null;
  if (_state.config?.persistForm) {
    formStates = captureFormStates(fromEl);
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

  // Track which old nodes have been processed
  const processedNodes = new Set();

  // First pass: handle keyed elements
  newNodes.forEach((newNode, newIndex) => {
    if (newNode.nodeType === Node.ELEMENT_NODE) {
      const key = newNode.getAttribute("data-key");
      if (key) {
        const existingNode = oldKeyedElements.get(key);
        if (existingNode) {
          const oldIndex = oldNodes.indexOf(existingNode);
          if (oldIndex !== -1) {
            // Move keyed element to correct position
            fromEl.insertBefore(existingNode, oldNodes[newIndex] || null);
            processedNodes.add(oldIndex);
          }
        }
      }
    }
  });

  // Second pass: handle remaining elements
  newNodes.forEach((newNode, newIndex) => {
    // Try to find a matching node that hasn't been processed yet
    const matchIndex = oldNodes.findIndex(
      (oldNode, index) =>
        !processedNodes.has(index) && nodesAreEqual(oldNode, newNode),
    );

    if (matchIndex !== -1) {
      // Found a match - only move it if absolutely necessary
      processedNodes.add(matchIndex);
      const oldNode = oldNodes[matchIndex];

      // Find the actual current index of the node in the DOM
      const currentIndex = Array.from(fromEl.childNodes).indexOf(oldNode);

      // Only move if the node is not already in the correct position
      if (currentIndex !== newIndex) {
        const referenceNode = oldNodes[newIndex];
        // Only move if the reference node exists and is different
        if (referenceNode && referenceNode !== oldNode) {
          fromEl.insertBefore(oldNode, referenceNode);
        }
      }
    } else {
      // No match found - insert new node
      const clonedNode = isSVG
        ? cloneWithNamespace(newNode)
        : newNode.cloneNode(true);
      const referenceNode = oldNodes[newIndex] || null;
      fromEl.insertBefore(clonedNode, referenceNode);
    }
  });

  // Remove any unprocessed old nodes
  oldNodes.forEach((node, index) => {
    if (!processedNodes.has(index)) {
      fromEl.removeChild(node);
    }
  });
}

function isSpecialElement(el) {
  const specialTags = ["INPUT", "SELECT", "TEXTAREA", "IFRAME", "SCRIPT"];
  return specialTags.includes(el.tagName);
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

  // Skip comparison for Webflow-specific elements
  if (
    node1 instanceof Element &&
    (node1.className.includes("w-") || node2.className.includes("w-"))
  ) {
    return true;
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
 * Main update function with performance tracking and error handling
 */
async function updateDOM(element, newHTML, animate = false) {
  Performance.start("updateDOM");

  // Add a flag to prevent multiple restorations
  const isAlreadyRestoring = element.hasAttribute("fp-restoring");
  if (isAlreadyRestoring) {
    Debug.log(Debug.levels.DEBUG, "Already restoring, skipping");
    return;
  }
  element.setAttribute("fp-restoring", "true");

  try {
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error("Invalid target element");
    }

    if (typeof newHTML !== "string") {
      throw new Error("newHTML must be a string");
    }

    Debug.log(
      Debug.levels.DEBUG,
      "Starting updateDOM with config:",
      _state.config,
    );

    // Log form persistence state
    Debug.log(
      Debug.levels.DEBUG,
      `Form persistence enabled: ${
        _state.config?.persistForm
      }, Should restore form: ${shouldRestoreForm(element)}`,
    );

    // Capture form states if form restoration is needed
    let formStates = null;
    if (_state.config?.persistForm && shouldRestoreForm(element)) {
      Debug.log(Debug.levels.DEBUG, "Capturing form states before update");
      formStates = captureFormStates(element);
      Debug.log(Debug.levels.DEBUG, "Captured form states:", formStates);
    }

    // Single observer setup
    let formObserver = null;
    if (_state.config?.persistForm && shouldRestoreForm(element)) {
      Debug.log(Debug.levels.DEBUG, "Setting up dynamic form observer");
      formObserver = setupDynamicFormObserver(element);
    }

    const updateContent = () => {
      return new Promise((resolve) => {
        // Publish beforeDomUpdate event
        EventSystem.publish("beforeDomUpdate", {
          element,
          newHTML,
          animate,
          formStates,
        });

        // Execute beforeDomUpdate plugin hook
        const instance = InstanceManager.getOrCreateInstance(element);
        if (instance) {
          PluginManager.executeHook("beforeDomUpdate", instance, {
            element,
            newHTML,
            animate,
            formStates,
          });
        }

        const virtualContainer = document.createElement("div");
        virtualContainer.innerHTML = newHTML.trim();

        const oldKeyedElements = new Map();
        const newKeyedElements = new Map();
        indexTree(element, oldKeyedElements);
        indexTree(virtualContainer, newKeyedElements);

        morphChildren(
          element,
          virtualContainer,
          oldKeyedElements,
          newKeyedElements,
        );

        // Single form restoration
        if (
          _state.config?.persistForm &&
          shouldRestoreForm(element) &&
          formStates
        ) {
          Debug.log(Debug.levels.DEBUG, "Restoring form states after update");
          restoreFormStates(
            element,
            "updateDOM - form state restoration - restoreFormStates",
          );
          setupFormSubmitHandlers(
            element,
            "updateDOM - form state restoration - setupFormSubmitHandlers",
          );
        }

        // Execute afterDomUpdate plugin hook
        if (instance) {
          PluginManager.executeHook("afterDomUpdate", instance, {
            element,
            newHTML,
            animate,
            formStates,
          });
        }

        // Publish afterDomUpdate event
        EventSystem.publish("afterDomUpdate", {
          element,
          newHTML,
          animate,
          formStates,
        });

        resolve();
      });
    };

    if (document.startViewTransition && animate) {
      await document.startViewTransition(() => updateContent()).finished;
    } else {
      await updateContent();
    }

    // Final form state restoration if needed
    if (_state.config?.persistForm && shouldRestoreForm(element)) {
      Debug.log(Debug.levels.DEBUG, "Restoring form states after update");
      const persistedInputs = element.querySelectorAll('[fp-persist="true"]');
      Debug.log(
        Debug.levels.DEBUG,
        `Found ${persistedInputs.length} inputs to restore`,
      );
      restoreFormStates(
        element,
        "updateDOM - final form state restoration - restoreFormStates",
      );
      setupFormSubmitHandlers(
        element,
        "updateDOM - final form state restoration - setupFormSubmitHandlers",
      );
    }

    if (formObserver) {
      Debug.log(Debug.levels.DEBUG, "Disconnecting form observer");
      formObserver.disconnect();
    }
  } catch (error) {
    Debug.log(Debug.levels.ERROR, "Error in updateDOM:", error);
    console.error("UpdateDOM error:", error);
    throw error;
  } finally {
    element.removeAttribute("fp-restoring");
    Performance.end("updateDOM");
  }
}

export { updateDOM };

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
