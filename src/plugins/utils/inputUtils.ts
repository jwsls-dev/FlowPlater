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
export function getGroupedInputValue(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  const name = element.name;
  const type = element.type;
  // Get the root node (document or shadow root) to search within
  const rootNode = element.getRootNode ? element.getRootNode() : document;

  if (type === "radio" && name) {
    // Search within the root node for the checked radio with the same name
    const checkedRadio = (rootNode as Document).querySelector(
      `input[type="radio"][name="${CSS.escape(name)}"]:checked`,
    );
    return checkedRadio ? (checkedRadio as HTMLInputElement).value : null;
  }

  if (type === "checkbox" && name) {
    // Search within the root node for checkboxes with the same name
    const checkboxes = (rootNode as Document).querySelectorAll(
      `input[type="checkbox"][name="${CSS.escape(name)}"]`,
    );
    if (checkboxes.length > 1) {
      // Handle checkbox group
      const checkedValues = Array.from(checkboxes)
        .filter((cb: any) => (cb as HTMLInputElement).checked)
        .map((cb: any) => (cb as HTMLInputElement).value);
      return checkedValues;
    } else {
      // Handle single checkbox
      return (element as HTMLInputElement).checked;
    }
  }

  if (element.tagName === "SELECT" && (element as HTMLSelectElement).multiple) {
    const selectedOptions = Array.from((element as HTMLSelectElement).selectedOptions).map(
      (option: any) => option.value,
    );
    return selectedOptions;
  }

  // Default case for single select, text inputs, textareas, etc.
  return element.value;
}
