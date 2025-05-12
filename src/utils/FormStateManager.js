import { _state } from "../core/State";
import { EventSystem } from "../core/EventSystem";
import { saveToLocalStorage, loadFromLocalStorage } from "./LocalStorage";
import { Debug } from "../core/Debug";
import { AttributeMatcher } from "./AttributeMatcher";
import { ConfigManager } from "../core/ConfigManager";

/**
 * @module FormStateManager
 * @description Manages form state restoration and persistence
 */
export const FormStateManager = {
  /** @type {boolean} Flag to prevent multiple form state restorations */
  isRestoringFormStates: false,

  /**
   * Restores form states within an element
   * @param {HTMLElement} element - The container element
   * @param {string} [source] - The source of the call to restoreFormStates
   */
  restoreFormStates(element, source) {
    try {
      // Skip if already restoring
      if (this.isRestoringFormStates) {
        Debug.debug("Already restoring form states, skipping");
        return;
      }

      this.isRestoringFormStates = true;
      const forms = element.getElementsByTagName("form");
      Array.from(forms).forEach((form) =>
        this.restoreSingleFormState(form, source),
      );
    } catch (error) {
      Debug.error(`Error restoring form states: ${error.message}`);
    } finally {
      this.isRestoringFormStates = false;
    }
  },

  /**
   * Restores the state of a single form from storage
   * @param {HTMLFormElement} form - The form to restore state for
   * @param {string} [source] - The source of the call to restoreSingleFormState
   * @returns {boolean} - Whether state was restored
   */
  restoreSingleFormState(form, source) {
    if (!form.id) return false;

    // Try to get state from storage
    const formState = this.handleFormStorage(form, null, "load");
    if (!formState) {
      Debug.debug(`No stored state found for form: ${form.id}`);
      return false;
    }

    const debugInfo = this.collectDebugInfo(form, "restore", {
      restoredElements: [],
      customVisualUpdates: [],
      skippedElements: [],
      storageType: this.shouldUseLocalStorage(form)
        ? "localStorage"
        : "sessionStorage",
    });

    // Restore state directly for this form
    this.processFormElements(form, (input) => {
      if (!(input.name in formState)) return;

      debugInfo.restoredElements.push({
        name: input.name,
        value: formState[input.name],
      });

      this.restoreElementValue(input, formState[input.name]);
    });

    // Single debug log with all information
    Debug.debug(`Form state restoration summary for ${form.id}`, {
      storageType: debugInfo.storageType,
      source: source || "unknown",
      restoredElements: debugInfo.restoredElements.map((el) => ({
        name: el.name,
        value: el.value,
      })),
      updatedCustomVisualStates: debugInfo.customVisualUpdates,
      skippedElements: debugInfo.skippedElements,
    });

    // Emit event after restoration
    EventSystem.publish("formState:afterRestore", {
      formId: form.id,
      formElement: form,
      state: formState,
      source: source || "unknown",
    });

    return true;
  },

  /**
   * Clears stored form state
   * @param {string} formId - ID of the form to clear
   */
  clearFormState(formId) {
    try {
      const form = document.getElementById(formId);
      if (!form) return;

      this.handleFormStorage(form, null, "clear");

      EventSystem.publish("formState:clear", {
        formId,
        formElement: form,
      });
    } catch (error) {
      Debug.error(`Error clearing form state: ${error.message}`);
    }
  },

  /**
   * Helper function to collect debug information consistently
   */
  collectDebugInfo(form, type, details = {}) {
    return {
      formId: form.id,
      type,
      persistenceEnabled: this.isPersistenceEnabledForElement(form),
      ...details,
    };
  },

  /**
   * Helper function to handle storage operations
   */
  handleFormStorage(form, state, operation = "save") {
    const useLocal = this.shouldUseLocalStorage(form);
    const key = `fp_form_${form.id}`;

    if (operation === "save") {
      if (useLocal) {
        saveToLocalStorage(form.id, state, "form");
      } else {
        sessionStorage.setItem(key, JSON.stringify(state));
      }
    } else if (operation === "load") {
      return useLocal
        ? loadFromLocalStorage(form.id, "form")
        : JSON.parse(sessionStorage.getItem(key));
    } else if (operation === "clear") {
      if (useLocal) localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    }
  },

  /**
   * Helper function to process form elements consistently
   */
  processFormElements(form, callback) {
    Array.from(form.elements).forEach((element) => {
      if (!element.name || element.type === "file") return;
      if (!this.isPersistenceEnabledForElement(element)) return;

      callback(element);
    });
  },

  /**
   * Helper function to restore element values
   */
  restoreElementValue(element, value) {
    if (element.type === "checkbox" || element.type === "radio") {
      element.checked = value;
      this.updateCustomVisualState(element);
    } else if (element instanceof HTMLSelectElement && element.multiple) {
      Array.from(element.options).forEach((option) => {
        option.selected = value.includes(option.value);
      });
    } else {
      element.value = value;
    }
  },

  /**
   * Helper function to update custom visual state
   */
  updateCustomVisualState(element) {
    const wrapper = element.closest(
      element.type === "checkbox" ? ".w-checkbox" : ".w-radio",
    );
    if (!wrapper) return;

    const customInput = wrapper.querySelector(`.w-${element.type}-input`);
    if (customInput) {
      customInput.checked = element.checked;
    }
  },

  /**
   * Checks if persistence is enabled for an element
   * @param {HTMLElement} element - The element to check
   * @returns {boolean} - Whether persistence is enabled
   */
  isPersistenceEnabledForElement(element) {
    // Use AttributeMatcher to check for inherited persistence setting
    const inheritedValue = AttributeMatcher.findAttribute(element, "persist");
    if (inheritedValue !== null) {
      return inheritedValue !== "false";
    }

    // Default to global setting
    return ConfigManager.getConfig().persistForm !== false;
  },

  /**
   * Determines if localStorage should be used for a form
   * @param {HTMLElement} element - The form element
   * @returns {boolean} - Whether to use localStorage
   */
  shouldUseLocalStorage(element) {
    return (
      AttributeMatcher._hasAttribute(element, "persist-local") ||
      ConfigManager.getConfig().storage?.enabled === true
    );
  },

  /**
   * Checks if form restoration should be performed for a form or its elements
   * @param {HTMLElement} element - The form or container element to check
   * @returns {boolean} - Whether form restoration should be performed
   */
  shouldRestoreForm(element) {
    // First check if there are any explicitly persistent elements
    // These override any parent fp-persist="false" settings
    const explicitlyPersistentInputs = AttributeMatcher.findMatchingElements(
      "persist",
      "true",
      true,
      element,
    );
    if (explicitlyPersistentInputs.length > 0) {
      return true;
    }

    // Check if element itself is a form with explicit persistence setting
    if (
      element.tagName === "FORM" &&
      AttributeMatcher._hasAttribute(element, "persist")
    ) {
      return AttributeMatcher._getRawAttribute(element, "persist") !== "false";
    }

    // Check parent form if exists
    const parentForm = element.closest("form");
    if (parentForm) {
      // If parent form explicitly disables persistence, skip it
      if (
        AttributeMatcher._getRawAttribute(parentForm, "persist") === "false"
      ) {
        return false;
      }

      // Check all form elements in parent form
      const formElements = parentForm.elements;
      for (const input of formElements) {
        // Skip elements without name or file inputs
        if (!input.name || input.type === "file") continue;

        // Check if input is inside an element with fp-persist="false"
        const persistFalseParent = AttributeMatcher.findClosestParent(
          "persist",
          "false",
          true,
          input,
        );
        if (persistFalseParent) {
          continue;
        }

        // If input has a name and isn't a file input, and isn't inside a fp-persist="false" element,
        // it should be persisted by default when persistForm is true
        return true;
      }
    }

    // For forms or elements containing forms, check each form
    const forms = element.getElementsByTagName("form");
    for (const form of forms) {
      if (this.shouldRestoreForm(form)) {
        return true;
      }
    }

    return false;
  },
};
