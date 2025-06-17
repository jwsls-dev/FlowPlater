import { DebugInfo } from "./FormPersistence";
/**
 * @module FormStateManager
 * @description Manages form state restoration and persistence
 */
export declare const FormStateManager: {
    /** @type {boolean} Flag to prevent multiple form state restorations */
    isRestoringFormStates: boolean;
    /**
     * Restores form states within an element
     * @param {HTMLElement} element - The container element
     * @param {string} [source] - The source of the call to restoreFormStates
     */
    restoreFormStates(element: HTMLElement, source?: string): void;
    /**
     * Restores the state of a single form from storage
     * @param {HTMLFormElement} form - The form to restore state for
     * @param {string} [source] - The source of the call to restoreSingleFormState
     * @returns {boolean} - Whether state was restored
     */
    restoreSingleFormState(form: HTMLFormElement, source: string): boolean;
    /**
     * Clears stored form state
     * @param {string} formId - ID of the form to clear
     */
    clearFormState(formId: string): void;
    /**
     * Helper function to collect debug information consistently
     */
    collectDebugInfo(form: HTMLFormElement, type: string, details?: Record<string, any>): DebugInfo;
    /**
     * Helper function to handle storage operations
     */
    handleFormStorage(form: HTMLFormElement, state: Record<string, any>, operation?: string): any;
    /**
     * Helper function to process form elements consistently
     */
    processFormElements(form: HTMLFormElement, callback: (element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => void): void;
    /**
     * Helper function to restore element values
     */
    restoreElementValue(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value: string): void;
    /**
     * Helper function to update custom visual state
     */
    updateCustomVisualState(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): void;
    /**
     * Checks if persistence is enabled for an element
     * @param {HTMLElement} element - The element to check
     * @returns {boolean} - Whether persistence is enabled
     */
    isPersistenceEnabledForElement(element: HTMLElement): boolean;
    /**
     * Determines if localStorage should be used for a form
     * @param {HTMLElement} element - The form element
     * @returns {boolean} - Whether to use localStorage
     */
    shouldUseLocalStorage(element: HTMLElement): boolean;
    /**
     * Checks if form restoration should be performed for a form or its elements
     * @param {HTMLElement} element - The form or container element to check
     * @returns {boolean} - Whether form restoration should be performed
     */
    shouldRestoreForm(element: HTMLElement): boolean;
};
