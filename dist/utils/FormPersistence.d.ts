export interface DebugInfo {
    formId: string;
    type: string;
    persistenceEnabled: boolean;
    restoredElements: {
        name: string;
        value: string;
    }[];
    customVisualUpdates: {
        name: string;
        value: string;
    }[];
    skippedElements: {
        name: string;
        reason: string;
        value: string;
    }[];
    storageType?: string;
    listenersAdded?: string[];
    formElements?: number;
    checkboxWrappers?: number;
    changedValues?: Record<string, any>;
}
/**
 * Updates non-state attributes of a form element
 * @param {HTMLElement} fromEl - The target element
 * @param {HTMLElement} toEl - The source element
 */
export declare function updateElementAttributes(fromEl: HTMLElement, toEl: HTMLElement): void;
/**
 * Preserves the state of a form element during DOM updates
 * @param {HTMLElement} fromEl - The target element
 * @param {HTMLElement} toEl - The source element
 */
export declare function preserveElementState(fromEl: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, toEl: HTMLElement): void;
/**
 * Captures the state of all forms within an element
 * @param {HTMLElement} element - The container element
 * @returns {Object} - Map of form states by form ID
 */
export declare function captureFormStates(element: HTMLElement): Record<string, Record<string, any>>;
/**
 * Restores form states within an element
 * @param {HTMLElement} element - The container element
 * @param {string} [source] - The source of the call to restoreFormStates
 */
export declare function restoreFormStates(element: HTMLElement, source: string): void;
/**
 * Clears stored form state
 * @param {string} formId - ID of the form to clear
 */
export declare function clearFormState(formId: string): void;
/**
 * Cleans up change event listeners for form elements
 * @param {HTMLElement} form - The form element to clean up listeners for
 */
export declare function cleanupFormChangeListeners(form: HTMLFormElement): void;
/**
 * Gets all relevant forms for an element (target, parent, and children)
 * @param {HTMLElement} element - The element to get forms for
 * @returns {Set<HTMLFormElement>} - Set of unique form elements
 */
export declare function getAllRelevantForms(element: HTMLElement): Set<HTMLFormElement>;
/**
 * Sets up form submission handlers to clear state on submit
 * @param {HTMLElement} element - The container element
 * @param {string} [source] - The source of the call to setupFormSubmitHandlers
 */
export declare function setupFormSubmitHandlers(element: HTMLElement, source?: string): void;
export declare function setupDynamicFormObserver(container: HTMLElement): MutationObserver | null;
/**
 * Checks if form restoration should be performed for a form or its elements
 * @param {HTMLElement} element - The form or container element to check
 * @returns {boolean} - Whether form restoration should be performed
 */
export declare function shouldRestoreForm(element: HTMLElement): boolean;
