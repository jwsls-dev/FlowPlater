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
export declare function getGroupedInputValue(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string | boolean | any[] | null;
