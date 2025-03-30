import { _state } from "./State.js";
import { log } from "../core/Debug.js";

// Default customTags - can be overridden via meta config in init()
export const customTagList = [{ tag: "fpselect", replaceWith: "select" }];
export let currentCustomTags = customTagList; // Use default list initially - override in init()

export function setCustomTags(tags) {
  currentCustomTags = tags;
}

export function replaceCustomTags(element) {
  let replaced = false;

  // Replace all custom tags in a single pass
  for (const tag of currentCustomTags) {
    const elements = element.getElementsByTagName(tag.tag);
    if (elements.length > 0) {
      replaced = true;

      // Convert to array since the live HTMLCollection will change as we replace elements
      const elementsArray = Array.from(elements);
      for (const customElement of elementsArray) {
        const newElement = document.createElement(tag.replaceWith);
        newElement.innerHTML = customElement.innerHTML;

        // Copy all attributes from the custom element to the new element
        for (const attr of customElement.attributes) {
          newElement.setAttribute(attr.name, attr.value);
        }

        // Replace the custom element with the new element
        customElement.parentNode.replaceChild(newElement, customElement);
      }
    }
  }

  if (replaced) {
    log("replaced custom tags", element);
  }

  return element;
}
