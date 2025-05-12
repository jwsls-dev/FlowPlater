/**
 * @module inputUtils
 * @description Utility functions for handling form inputs within plugins.
 */

/**
 * Gets the logically grouped value from a form input element.
 * Handles radio button groups, checkbox groups, and multi-selects.
 *
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} element - The input element.
 * @returns {*} The value of the input or group.
 *          - Radio: Value of the selected radio in the group, or null if none selected.
 *          - Checkbox (group): Array of values of checked checkboxes in the group.
 *          - Checkbox (single): Boolean indicating checked state.
 *          - Select (multiple): Array of values of selected options.
 *          - Select (single): Value of the selected option.
 *          - Other inputs: The element's value.
 */
export function getGroupedInputValue(element) {
  const name = element.name;
  const type = element.type;
  // Get the root node (document or shadow root) to search within
  const rootNode = element.getRootNode ? element.getRootNode() : document;

  if (type === "radio" && name) {
    // Search within the root node for the checked radio with the same name
    const checkedRadio = rootNode.querySelector(
      `input[type="radio"][name="${CSS.escape(name)}"]:checked`,
    );
    return checkedRadio ? checkedRadio.value : null;
  }

  if (type === "checkbox" && name) {
    // Search within the root node for checkboxes with the same name
    const checkboxes = rootNode.querySelectorAll(
      `input[type="checkbox"][name="${CSS.escape(name)}"]`,
    );
    if (checkboxes.length > 1) {
      // Handle checkbox group
      const checkedValues = Array.from(checkboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);
      return checkedValues;
    } else {
      // Handle single checkbox
      return element.checked;
    }
  }

  if (element.tagName === "SELECT" && element.multiple) {
    const selectedOptions = Array.from(element.selectedOptions).map(
      (option) => option.value,
    );
    return selectedOptions;
  }

  // Default case for single select, text inputs, textareas, etc.
  return element.value;
}
