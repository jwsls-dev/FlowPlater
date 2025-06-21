import { _state } from "../core/State";
import { EventSystem } from "../events/EventSystem";
import { saveToLocalStorage, loadFromLocalStorage } from "../storage/LocalStorage";
import { Debug } from "../core/Debug";
import { PluginManager } from "../core/PluginManager";
import { AttributeMatcher } from "../dom/AttributeMatcher";
import { ConfigManager } from "../core/ConfigManager";
import { FlowPlaterElement } from "../types";

export interface DebugInfo {
  formId: string;
  type: string;
  persistenceEnabled: boolean;
  restoredElements: { name: string; value: string }[];
  customVisualUpdates: { name: string; value: string }[];
  skippedElements: { name: string; reason: string; value: string }[];
  storageType?: string;
  listenersAdded?: string[];
  formElements?: number;
  checkboxWrappers?: number;
  changedValues?: Record<string, any>;
}

/**
 * Helper function to collect debug information consistently
 */
function collectDebugInfo(form: HTMLFormElement, type: string, details: Record<string, any> = {}): DebugInfo {
  return {
    formId: form.id,
    type,
    persistenceEnabled: isPersistenceEnabledForElement(form),
    restoredElements: details.restoredElements || [],
    customVisualUpdates: details.customVisualUpdates || [],
    skippedElements: details.skippedElements || [],
    storageType: details.storageType
  };
}

type FormStorageOperation = "save" | "load" | "clear";

/**
 * Helper function to handle storage operations
 */
function handleFormStorage(form: HTMLFormElement, state: Record<string, any> = {}, operation: FormStorageOperation = "save") {
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
      : JSON.parse(sessionStorage.getItem(key) || "{}");
  } else if (operation === "clear") {
    if (useLocal) localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}

/**
 * Helper function to process form elements consistently
 */
function processFormElements(form: HTMLFormElement, callback: (element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => void) {
  Array.from(form.elements).forEach((element) => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement)) return;
    if (!element.name || element.type === "file") return;
    if (!isPersistenceEnabledForElement(element)) return;

    callback(element);
  });
}

/**
 * Helper function to manage event listeners
 */
function manageEventListener(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, eventType: string, handler: EventListener, operation: string = "add") {
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
    const method = operation === "add" ? "addEventListener" : "removeEventListener";
    element[method](event as keyof HTMLElementEventMap, handler);
  });
}

/**
 * Helper function to restore element values
 */
function restoreElementValue(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value: string) {
  if (element instanceof HTMLInputElement && (element.type === "checkbox" || element.type === "radio")) {
    element.checked = value === "true";
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
function updateCustomVisualState(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  const wrapper = element.closest(
    element.type === "checkbox" ? ".w-checkbox" : ".w-radio",
  );
  if (!wrapper) return;

  const customInput = wrapper.querySelector(`.w-${element.type}-input`);
  if (customInput) {
    customInput.classList.toggle("w--redirected-checked", (element as HTMLInputElement).checked);
  }
}

/**
 * Gets persistence settings for an element
 * @param {HTMLElement} element - The element to check
 * @returns {Object} - Object containing persistence settings
 */
function getPersistenceSettings(element: HTMLElement): { shouldPersist: boolean; useLocalStorage: boolean } {
  let shouldPersist = false;
  let useLocalStorage = false;

  // Check persistence settings
  if (AttributeMatcher._hasAttribute(element, "persist")) {
    shouldPersist =
      AttributeMatcher._getRawAttribute(element, "persist") !== "false";
    useLocalStorage =
      AttributeMatcher._getRawAttribute(element, "persist") === "true";
  } else {
    const form = element.closest("form") as HTMLFormElement;
    if (form && AttributeMatcher._hasAttribute(form, "persist")) {
      shouldPersist =
        AttributeMatcher._getRawAttribute(form, "persist") !== "false";
      useLocalStorage =
        AttributeMatcher._getRawAttribute(form, "persist") === "true";
    } else if (
      ConfigManager.getConfig().storage?.enabled &&
      !ConfigManager.getConfig().persistForm
    ) {
      shouldPersist = false;
      useLocalStorage = false;
    } else {
      shouldPersist = ConfigManager.getConfig().persistForm;
      useLocalStorage =
        ConfigManager.getConfig().storage?.enabled &&
        ConfigManager.getConfig().persistForm;
    }
  }

  // For forms, check if any elements have explicit persistence
  if (element instanceof HTMLFormElement) {
    const hasPersistentElements = Array.from(element.elements).some(
      (input) => AttributeMatcher._getRawAttribute(input as HTMLElement, "persist") === "true",
    );
    if (hasPersistentElements) {
      useLocalStorage = ConfigManager.getConfig().storage?.enabled;
    }
  }

  return {
    shouldPersist,
    useLocalStorage:
      useLocalStorage && ConfigManager.getConfig().storage?.enabled,
  };
}

/**
 * Checks if persistence is enabled for an element
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether persistence is enabled for this element
 */
function isPersistenceEnabledForElement(element: HTMLElement): boolean {
  return getPersistenceSettings(element).shouldPersist;
}

/**
 * Determines which storage to use based on configuration
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - true for localStorage, false for sessionStorage
 */
function shouldUseLocalStorage(element: HTMLElement): boolean {
  return getPersistenceSettings(element).useLocalStorage;
}

/**
 * Captures the state of a form element
 * @param {HTMLElement} element - The form element to capture state from
 * @returns {Object} The captured state
 */
function captureElementState(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): Record<string, any> | null {
  try {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      const state = {
        value: element.value,
        checked: (element as HTMLInputElement).checked,
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
  } catch (error: any) {
    Debug.error(`Error capturing element state: ${error.message}`);
    return null;
  }
}

/**
 * Restores the state of a form element
 * @param {HTMLElement} element - The form element to restore state to
 * @param {Object} state - The state to restore
 */
function restoreElementState(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, state: any) {
  try {
    if (!state) return;

    if (element instanceof HTMLSelectElement) {
      if (state.selected) {
        if (element.multiple && Array.isArray(state.selected)) {
          // Handle multiple select
          state.selected.forEach((value: string) => {
            const option = element.querySelector(`option[value="${value}"]`);
            if (option) (option as HTMLOptionElement).selected = true;
          });
        } else {
          // Handle single select
          const option = element.querySelector(
            `option[value="${state.selected}"]`,
          );
          if (option) {
            (option as HTMLOptionElement).selected = true;
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
  } catch (error: any) {
    Debug.error(`Error restoring element state: ${error.message}`);
  }
}

/**
 * Updates non-state attributes of a form element
 * @param {HTMLElement} fromEl - The target element
 * @param {HTMLElement} toEl - The source element
 */
export function updateElementAttributes(fromEl: HTMLElement, toEl: HTMLElement) {
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
  } catch (error: any) {
    Debug.error(`Error updating element attributes: ${error.message}`);
  }
}

/**
 * Preserves the state of a form element during DOM updates
 * @param {HTMLElement} fromEl - The target element
 * @param {HTMLElement} toEl - The source element
 */
export function preserveElementState(fromEl: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, toEl: HTMLElement) {
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
  } catch (error: any) {
    Debug.error(`Error preserving element state: ${error.message}`);
  }
}

/**
 * Captures the state of all forms within an element
 * @param {HTMLElement} element - The container element
 * @returns {Object} - Map of form states by form ID
 */
export function captureFormStates(element: HTMLElement): Record<string, Record<string, any>> {
  try {
    const forms = element.getElementsByTagName("form");
    const formStates: Record<string, Record<string, any>> = {};

    Array.from(forms).forEach((form) => {
      if (!form.id) return;

      const formState: Record<string, any> = {};
      const formElements = form.elements;

      Array.from(formElements as HTMLCollectionOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>).forEach((input) => {
        if (!input.name || (input as HTMLInputElement).type === "file") return;

        // Skip if persistence is disabled for this element
        if (!isPersistenceEnabledForElement(input)) return;

        if (input.type === "checkbox" || input.type === "radio") {
          formState[input.name] = (input as HTMLInputElement).checked;
        } else if (input instanceof HTMLSelectElement) {
          if ((input as HTMLSelectElement).multiple) {
            formState[input.name] = Array.from((input as HTMLSelectElement).selectedOptions).map(
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
  } catch (error: any) {
    Debug.error(`Error capturing form states: ${error.message}`);
    return {};
  }
}

/**
 * Restores the state of a single form from storage
 * @param {HTMLFormElement} form - The form to restore state for
 * @param {string} [source] - The source of the call to restoreSingleFormState
 * @returns {boolean} - Whether state was restored
 */
function restoreSingleFormState(form: HTMLFormElement, source: string): boolean {
  if (!form.id) return false;

  // Try to get state from storage
  const formState = handleFormStorage(form, {}, "load");
  if (!formState) {
    Debug.debug(`No stored state found for form: ${form.id}`);
    return false;
  }

  const debugInfo: DebugInfo = collectDebugInfo(form, "restore", {
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
}

/**
 * Restores form states within an element
 * @param {HTMLElement} element - The container element
 * @param {string} [source] - The source of the call to restoreFormStates
 */
export function restoreFormStates(element: HTMLElement, source: string) {
  restoreFormStates(element, source);
}

/**
 * Clears stored form state
 * @param {string} formId - ID of the form to clear
 */
export function clearFormState(formId: string) {
  clearFormState(formId);
}

/**
 * Sets up change event listeners for form elements
 * @param {HTMLElement} form - The form element to set up listeners for
 */
function setupFormChangeListeners(form: HTMLFormElement) {
  try {
    if (!form.id) {
      Debug.debug("Skipping form without ID");
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
      if (form._fpChangeListeners.some(({ element: el }: { element: HTMLElement }) => el === element)) {
        return;
      }

      const changeHandler = (event: Event) => handleFormElementChange(event);
      manageEventListener(element, "change", changeHandler);

      // Store the handler reference
      form._fpChangeListeners.push({ element, handler: changeHandler });
      debugInfo.listenersAdded?.push(element.name);
    });

    // Output collected debug information
    Debug.debug(`Form setup summary for ${form.id}`, {
      totalFormElements: debugInfo.formElements,
      checkboxWrappers: debugInfo.checkboxWrappers,
      formPersistence: debugInfo.persistenceEnabled ? "enabled" : "disabled",
      listenersAdded: debugInfo.listenersAdded?.join(", "),
      skippedElements: debugInfo.skippedElements.join(", "),
    });
  } catch (error: any) {
    Debug.error(`Error setting up form change listeners: ${error.message}`);
  }
}

/**
 * Cleans up change event listeners for form elements
 * @param {HTMLElement} form - The form element to clean up listeners for
 */
export function cleanupFormChangeListeners(form: HTMLFormElement) {
  try {
    if (!form._fpChangeListeners) return;

    form._fpChangeListeners.forEach(({ element, handler }: { element: HTMLElement; handler: EventListener }) => {
      element.removeEventListener("change", handler);
      element.removeEventListener("input", handler);
    });

    form._fpChangeListeners = [];
  } catch (error: any) {
    Debug.error(`Error cleaning up form change listeners: ${error.message}`);
  }
}

function handleFormElementChange(event: Event) {
  try {
    const element = event.target as HTMLElement;
    const form = element.closest("form") as HTMLFormElement;
    if (!form || !form.id) {
      Debug.debug("Skipping change handler - no form or form ID");
      return;
    }

    const debugInfo = collectDebugInfo(form, "change", {
      changedValues: {},
      skippedElements: [],
    });

    // Helper function to check if a value is a template
    function isTemplateValue(value: string) {
      if (typeof value !== "string") return false;
      // Check for Handlebars syntax
      if (value.includes("{{") || value.includes("}}")) return true;
      // Check for alternative syntax
      if (value.includes("[[") || value.includes("]]")) return true;
      // Check for this. references which indicate template binding
      if (value.includes("this.")) return true;
      return false;
    }

    // Helper function to check if an input is template-bound
    function isTemplateInput(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
      // Check if the input name itself is a template
      if (isTemplateValue(input.name)) return true;
      // Check if the input has a template value
      if (isTemplateValue(input.value)) return true;
      // Check for data-binding attributes that indicate template usage
      if (AttributeMatcher._hasAttribute(input, "bind")) return true;
      return false;
    }

    // Capture the current state of the form
    const formState: Record<string, any> = {};
    processFormElements(form, (input) => {
      // First check if this is a template-bound input
      if (isTemplateInput(input)) {
        debugInfo.skippedElements.push({
          name: input.name,
          reason: "Template binding detected",
          value: input.value,
        });
        return;
      }

      const value =
        input.type === "checkbox" || input.type === "radio"
          ? (input as HTMLInputElement).checked
          : input instanceof HTMLSelectElement && input.multiple
            ? Array.from((input as HTMLSelectElement).selectedOptions).map((opt) => opt.value)
            : input.value;

      formState[input.name] = value;
      if (!debugInfo.changedValues) debugInfo.changedValues = {};
      debugInfo.changedValues[input.name] = value;
    });

    // Only store if there are elements to store
    if (Object.keys(formState).length > 0) {
      handleFormStorage(form, formState, "save");

      // Output collected debug information
      Debug.debug("Form state update for " + form.id + ":", {
        "Changed element": (element as HTMLInputElement).name,
        "Storage type": shouldUseLocalStorage(form)
          ? "localStorage"
          : "sessionStorage",
        "Updated values": debugInfo.changedValues,
        "Skipped elements": debugInfo.skippedElements,
      });

      // Find instance that contains this form or whose elements are contained by this form
      let instance = null;
      // @ts-ignore
      for (const [instanceName, inst] of Object.entries(_state.instances) as [string, { elements: FlowPlaterElement[] }][]) {
        if (
          Array.from(inst.elements).some(
            (el) => (el as HTMLElement).contains(form) || form.contains(el as HTMLElement) || el === form,
          )
        ) {
          instance = inst;
          break;
        }
      }

      // Execute updateForm hook
      PluginManager.executeHook("updateForm", instance, {
        element: form,
        id: form.id,
        data: formState,
        changedElement: element,
      });

      // Emit event
      EventSystem.publish("formState:changed", {
        formId: form.id,
        formElement: form,
        state: formState,
        changedElement: element,
      });
    }
  } catch (error: any) {
    Debug.error(`Error handling form element change: ${error.message}`);
  }
}

/**
 * Gets all relevant forms for an element (target, parent, and children)
 * @param {HTMLElement} element - The element to get forms for
 * @returns {Set<HTMLFormElement>} - Set of unique form elements
 */
export function getAllRelevantForms(element: HTMLElement): Set<HTMLFormElement> {
  const forms = new Set<HTMLFormElement>();

  // Add the target if it's a form
  if (element instanceof HTMLFormElement) {
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
 * @param {string} [source] - The source of the call to setupFormSubmitHandlers
 */
export function setupFormSubmitHandlers(element: HTMLElement, source?: string) {
  try {
    Debug.debug("Setting up form submit handlers for element:", element);

    // Get all relevant forms
    const forms = getAllRelevantForms(element);

    Debug.debug(`Found ${forms.size} forms`);
    forms.forEach((form) => {
      setupSingleFormHandlers(form, source || "setupFormSubmitHandlers");
    });
  } catch (error: any) {
    Debug.error(`Error setting up form submit handlers: ${error.message}`);
  }
}

function setupSingleFormHandlers(form: HTMLFormElement, source?: string) {
  if (!form.id) {
    Debug.debug("Skipping form without ID");
    return;
  }

  // Always set up handlers for forms that have been updated by HTMX
  Debug.debug(`Setting up handlers for form: ${form.id}`);

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
    Debug.debug(`Restoring state for form: ${form.id}`);
    restoreSingleFormState(form, source || "setupSingleFormHandlers");
  } else {
    Debug.debug(
      `Skipping form restoration - no persistent elements: ${form.id}`,
    );
  }
}

function handleFormSubmit(event: Event) {
  try {
    const form = (event.target as HTMLElement).closest("form") as HTMLFormElement;
    if (form && form.id) {
      clearFormState(form.id);
    }
  } catch (error: any) {
    Debug.error(`Error handling form submit: ${error.message}`);
  }
}

export function setupDynamicFormObserver(container: HTMLElement) {
  try {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLFormElement) {
            setupFormSubmitHandlers(node, "setupDynamicFormObserver");
          }
        });
      });
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return observer;
  } catch (error: any) {
    Debug.error(`Error setting up dynamic form observer: ${error.message}`);
    return null;
  }
}

/**
 * Checks if form restoration should be performed for a form or its elements
 * @param {HTMLElement} element - The form or container element to check
 * @returns {boolean} - Whether form restoration should be performed
 */
export function shouldRestoreForm(element: HTMLElement): boolean {
  // Check if the element itself has persistence enabled
  if (isPersistenceEnabledForElement(element)) {
    return true;
  }

  // Check if it's a form and has persistent elements
  if (element instanceof HTMLFormElement) {
    const persistentElements = element.querySelectorAll('[data-persist="true"]');
    if (persistentElements.length > 0) {
      return true;
    }
  }

  // Check for child elements with persistence enabled
  const persistentChildren = element.querySelectorAll('[data-persist="true"]');
  if (persistentChildren.length > 0) {
    return true;
  }

  return false;
}

export { handleFormStorage, isPersistenceEnabledForElement };
