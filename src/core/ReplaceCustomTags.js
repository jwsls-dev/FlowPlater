import { _state } from "./State.js";

// Default customTags - can be overridden via meta config in init()
export const customTagList = [{ tag: "fpselect", replaceWith: "select" }];
export let currentCustomTags = customTagList; // Use default list initially - override in init()

export function setCustomTags(tags) {
  currentCustomTags = tags;
}

export function replaceCustomTags(element) {
  // Replace all custom tags
  currentCustomTags.forEach((tag) => {
    const elements = Array.from(element.getElementsByTagName(tag.tag));
    for (let i = 0; i < elements.length; i++) {
      const customElement = elements[i];
      const newElement = document.createElement(tag.replaceWith);
      newElement.innerHTML = customElement.innerHTML;

      // Copy all attributes from the custom element to the new element
      for (let attr of customElement.attributes) {
        newElement.setAttribute(attr.name, attr.value);
      }

      // Replace the custom element with the new element
      customElement.parentNode.replaceChild(newElement, customElement);
    }
  });
  return element;
}
