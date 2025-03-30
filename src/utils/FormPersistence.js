import { _state } from "../core/State";
import { EventSystem } from "../core/EventSystem";
import { saveToLocalStorage, loadFromLocalStorage } from "./LocalStorage";
import { Debug } from "../core/Debug";

/**
 * Helper function to collect debug information consistently
 */
function collectDebugInfo(form, type, details = {}) {
  return {
    formId: form.id,
    type,
    persistenceEnabled: isPersistenceEnabledForElement(form),
    ...details,
  };
}

/**
 * Helper function to handle storage operations
 */
function handleFormStorage(form, state, operation = "save") {
  const useLocal = shouldUseLocalStorage(form);
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
}

/**
 * Helper function to process form elements consistently
 */
function processFormElements(form, callback) {
  Array.from(form.elements).forEach((element) => {
    if (!element.name || element.type === "file") return;
    if (!isPersistenceEnabledForElement(element)) return;

    callback(element);
  });
}

/**
 * Helper function to manage event listeners
 */
function manageEventListener(element, eventType, handler, operation = "add") {
  const events =
    eventType === "change"
      ? [
          "change",
          element.type !== "checkbox" && element.type !== "radio"
            ? "input"
            : null,
        ]
      : [eventType];

  events.filter(Boolean).forEach((event) => {
    element[`${operation}EventListener`](event, handler);
  });
}

/**
 * Helper function to restore element values
 */
function restoreElementValue(element, value) {
  if (element.type === "checkbox" || element.type === "radio") {
    element.checked = value;
    updateCustomVisualState(element);
  } else if (element instanceof HTMLSelectElement && element.multiple) {
    Array.from(element.options).forEach((option) => {
      option.selected = value.includes(option.value);
    });
  } else {
    element.value = value;
  }
}

/**
 * Helper function to update custom visual state
 */
function updateCustomVisualState(element) {
  const wrapper = element.closest(
    element.type === "checkbox" ? ".w-checkbox" : ".w-radio",
  );
  if (!wrapper) return;

  const customInput = wrapper.querySelector(`.w-${element.type}-input`);
  if (customInput) {
    customInput.classList.toggle("w--redirected-checked", element.checked);
  }
}

/**
 * Gets persistence settings for an element
 * @param {HTMLElement} element - The element to check
 * @returns {Object} - Object containing persistence settings
 */
function getPersistenceSettings(element) {
  let elementInsideInstanceElement = false;
  let shouldPersist = false;
  let useLocalStorage = false;

  // Check if element is part of a template instance
  for (const [instanceName, instance] of Object.entries(_state.instances)) {
    if (Array.from(instance.elements).some((el) => el.contains(element))) {
      elementInsideInstanceElement = true;
      break;
    }
  }

  // Check persistence settings
  if (element.hasAttribute("fp-persist")) {
    shouldPersist = element.getAttribute("fp-persist") !== "false";
    useLocalStorage = element.getAttribute("fp-persist") === "true";
  } else {
    const form = element.form;
    if (form && form.hasAttribute("fp-persist")) {
      shouldPersist = form.getAttribute("fp-persist") !== "false";
      useLocalStorage = form.getAttribute("fp-persist") === "true";
    } else if (_state.config?.storage?.enabled && !_state.config?.persistForm) {
      shouldPersist = false;
      useLocalStorage = false;
    } else {
      shouldPersist = _state.config?.persistForm;
      useLocalStorage =
        _state.config?.storage?.enabled && _state.config?.persistForm;
    }
  }

  // For forms, check if any elements have explicit persistence
  if (element.tagName === "FORM") {
    const hasPersistentElements = Array.from(element.elements).some(
      (input) => input.getAttribute("fp-persist") === "true",
    );
    if (hasPersistentElements) {
      useLocalStorage = _state.config?.storage?.enabled;
    }
  }

  return {
    shouldPersist: elementInsideInstanceElement && shouldPersist,
    useLocalStorage: useLocalStorage && _state.config?.storage?.enabled,
  };
}

/**
 * Checks if persistence is enabled for an element
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether persistence is enabled for this element
 */
function isPersistenceEnabledForElement(element) {
  return getPersistenceSettings(element).shouldPersist;
}

/**
 * Determines which storage to use based on configuration
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - true for localStorage, false for sessionStorage
 */
function shouldUseLocalStorage(element) {
  return getPersistenceSettings(element).useLocalStorage;
}

/**
 * Captures the state of a form element
 * @param {HTMLElement} element - The form element to capture state from
 * @returns {Object} The captured state
 */
function captureElementState(element) {
  try {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      const state = {
        value: element.value,
        checked: element.checked,
        selected:
          element instanceof HTMLSelectElement
            ? element.multiple
              ? Array.from(element.selectedOptions).map((opt) => opt.value)
              : element.value
            : null,
        selectionStart:
          element instanceof HTMLTextAreaElement
            ? element.selectionStart
            : null,
        selectionEnd:
          element instanceof HTMLTextAreaElement ? element.selectionEnd : null,
        scrollTop:
          element instanceof HTMLTextAreaElement ? element.scrollTop : null,
        scrollLeft:
          element instanceof HTMLTextAreaElement ? element.scrollLeft : null,
      };

      return state;
    }
    return null;
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error capturing element state: ${error.message}`,
    );
    return null;
  }
}

/**
 * Restores the state of a form element
 * @param {HTMLElement} element - The form element to restore state to
 * @param {Object} state - The state to restore
 */
function restoreElementState(element, state) {
  try {
    if (!state) return;

    if (element instanceof HTMLSelectElement) {
      if (state.selected) {
        if (element.multiple && Array.isArray(state.selected)) {
          // Handle multiple select
          state.selected.forEach((value) => {
            const option = element.querySelector(`option[value="${value}"]`);
            if (option) option.selected = true;
          });
        } else {
          // Handle single select
          const option = element.querySelector(
            `option[value="${state.selected}"]`,
          );
          if (option) {
            option.selected = true;
            element.value = state.selected;
          }
        }
      }
    } else if (element instanceof HTMLTextAreaElement) {
      element.value = state.value;
      if (state.selectionStart !== null && state.selectionEnd !== null) {
        element.setSelectionRange(state.selectionStart, state.selectionEnd);
      }
      if (state.scrollTop !== null) element.scrollTop = state.scrollTop;
      if (state.scrollLeft !== null) element.scrollLeft = state.scrollLeft;
    } else {
      element.value = state.value;
      element.checked = state.checked;
    }
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error restoring element state: ${error.message}`,
    );
  }
}

/**
 * Updates non-state attributes of a form element
 * @param {HTMLElement} fromEl - The target element
 * @param {HTMLElement} toEl - The source element
 */
export function updateElementAttributes(fromEl, toEl) {
  try {
    Array.from(toEl.attributes).forEach((attr) => {
      // Skip value, checked, and Webflow-specific attributes
      if (
        attr.name !== "value" &&
        attr.name !== "checked" &&
        !attr.name.startsWith("w-")
      ) {
        fromEl.setAttribute(attr.name, attr.value);
      }
    });
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error updating element attributes: ${error.message}`,
    );
  }
}

/**
 * Preserves the state of a form element during DOM updates
 * @param {HTMLElement} fromEl - The target element
 * @param {HTMLElement} toEl - The source element
 */
export function preserveElementState(fromEl, toEl) {
  try {
    if (
      fromEl instanceof HTMLInputElement ||
      fromEl instanceof HTMLSelectElement ||
      fromEl instanceof HTMLTextAreaElement
    ) {
      const state = captureElementState(fromEl);
      updateElementAttributes(fromEl, toEl);
      restoreElementState(fromEl, state);
    }
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error preserving element state: ${error.message}`,
    );
  }
}

/**
 * Captures the state of all forms within an element
 * @param {HTMLElement} element - The container element
 * @returns {Object} - Map of form states by form ID
 */
export function captureFormStates(element) {
  try {
    const forms = element.getElementsByTagName("form");
    const formStates = {};

    Array.from(forms).forEach((form) => {
      if (!form.id) return;

      const formState = {};
      const formElements = form.elements;

      Array.from(formElements).forEach((input) => {
        if (!input.name || input.type === "file") return;

        // Skip if persistence is disabled for this element
        if (!isPersistenceEnabledForElement(input)) return;

        if (input.type === "checkbox" || input.type === "radio") {
          formState[input.name] = input.checked;
        } else if (input instanceof HTMLSelectElement) {
          if (input.multiple) {
            formState[input.name] = Array.from(input.selectedOptions).map(
              (opt) => opt.value,
            );
          } else {
            formState[input.name] = input.value;
          }
        } else {
          formState[input.name] = input.value;
        }
      });

      // Only store if there are elements to store
      if (Object.keys(formState).length > 0) {
        // Emit event before storing
        EventSystem.publish("formState:beforeCapture", {
          formId: form.id,
          formElement: form,
          state: formState,
        });

        formStates[form.id] = formState;

        // Store based on configuration
        if (shouldUseLocalStorage(form)) {
          saveToLocalStorage(form.id, formState, "form");
        } else {
          sessionStorage.setItem(
            `fp_form_${form.id}`,
            JSON.stringify(formState),
          );
        }
      }
    });

    return formStates;
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error capturing form states: ${error.message}`,
    );
    return {};
  }
}

/**
 * Restores the state of a single form from storage
 * @param {HTMLFormElement} form - The form to restore state for
 * @returns {boolean} - Whether state was restored
 */
function restoreSingleFormState(form) {
  if (!form.id) return false;

  // Try to get state from storage
  const formState = handleFormStorage(form, null, "load");
  if (!formState) {
    Debug.log(Debug.levels.DEBUG, `No stored state found for form: ${form.id}`);
    return false;
  }

  const debugInfo = collectDebugInfo(form, "restore", {
    restoredElements: [],
    customVisualUpdates: [],
    skippedElements: [],
    storageType: shouldUseLocalStorage(form)
      ? "localStorage"
      : "sessionStorage",
  });

  // Restore state directly for this form
  processFormElements(form, (input) => {
    if (!(input.name in formState)) return;

    debugInfo.restoredElements.push({
      name: input.name,
      value: formState[input.name],
    });

    restoreElementValue(input, formState[input.name]);
  });

  // Single debug log with all information
  Debug.log(
    Debug.levels.DEBUG,
    `Form state restoration summary for ${form.id}:
    Storage type: ${debugInfo.storageType}
    Restored elements:
    ${debugInfo.restoredElements
      .map((el) => `- ${el.name}: ${el.value}`)
      .join("\n    ")}
    
    Updated custom visual states for:
    ${debugInfo.customVisualUpdates.join(", ")}
    
    Skipped elements (persistence disabled):
    ${debugInfo.skippedElements.join(", ")}`,
  );

  // Emit event after restoration
  EventSystem.publish("formState:afterRestore", {
    formId: form.id,
    formElement: form,
    state: formState,
  });

  return true;
}

/**
 * Restores form states within an element
 * @param {HTMLElement} element - The container element
 */
export function restoreFormStates(element) {
  try {
    const forms = element.getElementsByTagName("form");
    Array.from(forms).forEach(restoreSingleFormState);
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error restoring form states: ${error.message}`,
    );
  }
}

/**
 * Clears stored form state
 * @param {string} formId - ID of the form to clear
 */
export function clearFormState(formId) {
  try {
    const form = document.getElementById(formId);
    if (!form) return;

    handleFormStorage(form, null, "clear");

    EventSystem.publish("formState:clear", {
      formId,
      formElement: form,
    });
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error clearing form state: ${error.message}`,
    );
  }
}

/**
 * Sets up change event listeners for form elements
 * @param {HTMLElement} form - The form element to set up listeners for
 */
function setupFormChangeListeners(form) {
  try {
    if (!form.id) {
      Debug.log(Debug.levels.DEBUG, "Skipping form without ID");
      return;
    }

    const debugInfo = collectDebugInfo(form, "setup", {
      formElements: form.elements.length,
      checkboxWrappers: form.querySelectorAll(".w-checkbox").length,
      listenersAdded: [],
      skippedElements: [],
    });

    // Initialize new listeners array if it doesn't exist
    if (!form._fpChangeListeners) {
      form._fpChangeListeners = [];
    }

    // Handle regular form elements
    processFormElements(form, (element) => {
      // Skip if element already has a listener
      if (form._fpChangeListeners.some(({ element: el }) => el === element)) {
        return;
      }

      const changeHandler = (event) => handleFormElementChange(event);
      manageEventListener(element, "change", changeHandler);

      // Store the handler reference
      form._fpChangeListeners.push({ element, handler: changeHandler });
      debugInfo.listenersAdded.push(element.name);
    });

    // Output collected debug information
    Debug.log(
      Debug.levels.DEBUG,
      `Form setup summary for ${form.id}:
      - Total form elements: ${debugInfo.formElements}
      - Checkbox wrappers: ${debugInfo.checkboxWrappers}
      - Form persistence: ${
        debugInfo.persistenceEnabled ? "enabled" : "disabled"
      }
      - Listeners added to: ${debugInfo.listenersAdded.join(", ")}
      - Skipped elements: ${debugInfo.skippedElements.join(", ")}`,
    );
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error setting up form change listeners: ${error.message}`,
    );
  }
}

/**
 * Cleans up change event listeners for form elements
 * @param {HTMLElement} form - The form element to clean up listeners for
 */
export function cleanupFormChangeListeners(form) {
  try {
    if (!form._fpChangeListeners) return;

    form._fpChangeListeners.forEach(({ element, handler }) => {
      element.removeEventListener("change", handler);
      element.removeEventListener("input", handler);
    });

    form._fpChangeListeners = [];
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error cleaning up form change listeners: ${error.message}`,
    );
  }
}

function handleFormElementChange(event) {
  try {
    const element = event.target;
    const form = element.form;
    if (!form || !form.id) {
      Debug.log(
        Debug.levels.DEBUG,
        "Skipping change handler - no form or form ID",
      );
      return;
    }

    const debugInfo = collectDebugInfo(form, "change", {
      changedValues: {},
      skippedElements: [],
    });

    // Capture the current state of the form
    const formState = {};
    processFormElements(form, (input) => {
      const value =
        input.type === "checkbox" || input.type === "radio"
          ? input.checked
          : input instanceof HTMLSelectElement && input.multiple
            ? Array.from(input.selectedOptions).map((opt) => opt.value)
            : input.value;

      formState[input.name] = value;
      debugInfo.changedValues[input.name] = value;
    });

    // Only store if there are elements to store
    if (Object.keys(formState).length > 0) {
      handleFormStorage(form, formState, "save");

      // Output collected debug information
      Debug.log(
        Debug.levels.DEBUG,
        `Form state update for ${form.id}:
        - Changed element: ${element.name}
        - Storage type: ${
          shouldUseLocalStorage(form) ? "localStorage" : "sessionStorage"
        }
        - Updated values: ${JSON.stringify(debugInfo.changedValues, null, 2)}
        - Skipped elements (persistence disabled): ${debugInfo.skippedElements.join(
          ", ",
        )}`,
      );

      // Emit event
      EventSystem.publish("formState:changed", {
        formId: form.id,
        formElement: form,
        state: formState,
        changedElement: element,
      });
    }
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error handling form element change: ${error.message}`,
    );
  }
}

/**
 * Gets all relevant forms for an element (target, parent, and children)
 * @param {HTMLElement} element - The element to get forms for
 * @returns {Set<HTMLFormElement>} - Set of unique form elements
 */
export function getAllRelevantForms(element) {
  const forms = new Set();

  // Add the target if it's a form
  if (element.tagName === "FORM") {
    forms.add(element);
  }

  // Add parent forms
  const parentForm = element.closest("form");
  if (parentForm) {
    forms.add(parentForm);
  }

  // Add child forms
  const childForms = element.getElementsByTagName("form");
  Array.from(childForms).forEach((form) => forms.add(form));

  return forms;
}

/**
 * Sets up form submission handlers to clear state on submit
 * @param {HTMLElement} element - The container element
 */
export function setupFormSubmitHandlers(element) {
  try {
    Debug.log(
      Debug.levels.DEBUG,
      "Setting up form submit handlers for element:",
      element,
    );

    // Get all relevant forms
    const forms = getAllRelevantForms(element);

    Debug.log(Debug.levels.DEBUG, `Found ${forms.size} forms`);
    forms.forEach((form) => {
      setupSingleFormHandlers(form);
    });
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error setting up form submit handlers: ${error.message}`,
    );
  }
}

function setupSingleFormHandlers(form) {
  if (!form.id) {
    Debug.log(Debug.levels.DEBUG, "Skipping form without ID");
    return;
  }

  // Always set up handlers for forms that have been updated by HTMX
  Debug.log(Debug.levels.DEBUG, `Setting up handlers for form: ${form.id}`);

  // Remove existing listener if any
  form.removeEventListener("submit", handleFormSubmit);
  // Add new listener
  form.addEventListener("submit", handleFormSubmit);

  // Set up change listeners for form elements
  setupFormChangeListeners(form);

  // Mark form as having handlers set up
  form._fpHandlersSetup = true;

  // Check if form restoration is needed
  if (shouldRestoreForm(form)) {
    Debug.log(Debug.levels.DEBUG, `Restoring state for form: ${form.id}`);
    restoreSingleFormState(form);
  } else {
    Debug.log(
      Debug.levels.DEBUG,
      `Skipping form restoration - no persistent elements: ${form.id}`,
    );
  }
}

function handleFormSubmit(event) {
  try {
    const form = event.target;
    if (form.id) {
      clearFormState(form.id);
    }
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error handling form submit: ${error.message}`,
    );
  }
}

export function setupDynamicFormObserver(container) {
  try {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === "FORM") {
            setupFormSubmitHandlers(node);
          }
        });
      });
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return observer;
  } catch (error) {
    Debug.log(
      Debug.levels.ERROR,
      `Error setting up dynamic form observer: ${error.message}`,
    );
    return null;
  }
}

/**
 * Checks if form restoration should be performed for a form or its elements
 * @param {HTMLElement} element - The form or container element to check
 * @returns {boolean} - Whether form restoration should be performed
 */
export function shouldRestoreForm(element) {
  // First check if there are any explicitly persistent elements
  // These override any parent fp-persist="false" settings
  const explicitlyPersistentInputs = element.querySelectorAll(
    '[fp-persist="true"]',
  );
  if (explicitlyPersistentInputs.length > 0) {
    return true;
  }

  // Check if element itself is a form with explicit persistence setting
  if (element.tagName === "FORM" && element.hasAttribute("fp-persist")) {
    return element.getAttribute("fp-persist") !== "false";
  }

  // For forms or elements containing forms, check each form
  const forms =
    element.tagName === "FORM"
      ? [element]
      : element.getElementsByTagName("form");
  for (const form of forms) {
    // If form explicitly disables persistence, skip it
    if (form.getAttribute("fp-persist") === "false") {
      continue;
    }

    // Check all form elements
    const formElements = form.elements;
    for (const input of formElements) {
      // Skip elements without name or file inputs
      if (!input.name || input.type === "file") continue;

      // Check if input is inside an element with fp-persist="false"
      const persistFalseParent = input.closest('[fp-persist="false"]');
      if (!persistFalseParent) {
        // If no parent disables persistence and input doesn't have explicit setting,
        // use global setting
        if (!input.hasAttribute("fp-persist") && _state.config?.persistForm) {
          return true;
        }
      }
    }
  }

  return false;
}
