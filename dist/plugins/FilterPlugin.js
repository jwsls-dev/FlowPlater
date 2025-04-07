var FilterPlugin = (function () {
  'use strict';

  const _state = {
    templateCache: {},
    instances: {},
    groups: {}, // Store groups and their shared data
    length: 0,
    initialized: false,
    defaults: {
      animation: false,
      debug: false,
    },
  };

  const Debug = (function () {
    return {
      level: 1,
      levels: {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3,
      },

      log: function (level, ...args) {
        if (level <= this.level) {
          const prefix = ["ERROR", "WARN", "INFO", "DEBUG"][level];
          switch (prefix) {
            case "ERROR":
              console.error(`FlowPlater [${prefix}]:`, ...args);
              break;
            case "WARN":
              console.warn(`FlowPlater [${prefix}]:`, ...args);
              break;
            case "DEBUG":
              console.debug(`FlowPlater [${prefix}]:`, ...args);
              break;
            default:
              console.log(`FlowPlater [${prefix}]:`, ...args);
          }
        }
      },

      error: function (...args) {
        this.log(this.levels.ERROR, ...args);
      },

      warn: function (...args) {
        this.log(this.levels.WARN, ...args);
      },

      info: function (...args) {
        this.log(this.levels.INFO, ...args);
      },

      debug: function (...args) {
        this.log(this.levels.DEBUG, ...args);
      },
    };
  })();

  class FlowPlaterError extends Error {
    constructor(message, stack) {
      super(message);
      this.name = "FlowPlaterError";
      this.stack = stack;
    }
  }

  /**
   * @module EventSystem
   * @description A pub/sub event system that supports both global and instance-specific events
   */
  const EventSystem = (function () {
    /** @type {Map<string, Array<{callback: Function, context: any}>>} */
    const subscribers = new Map();

    return {
      /**
       * Subscribe to an event
       * @param {string} event - The event name to subscribe to
       * @param {Function} callback - The callback function to execute when the event is published
       * @param {any} [context=null] - The context (this) to use when executing the callback
       * @returns {Function} Unsubscribe function
       * @throws {Error} If event name is empty or callback is not a function
       */
      subscribe(event, callback, context = null) {
        // Validate event name
        if (!event || typeof event !== "string") {
          FlowPlaterError(
            "Invalid event name. Event name must be a non-empty string.",
          );
        }

        // Validate callback
        if (!callback || typeof callback !== "function") {
          FlowPlaterError(
            `Invalid callback for event "${event}". Callback must be a function.`,
          );
        }

        if (!subscribers.has(event)) {
          subscribers.set(event, []);
        }
        subscribers.get(event).push({ callback, context });
        Debug.debug(`Subscribed to event: ${event}`);
        return () => this.unsubscribe(event, callback);
      },

      /**
       * Unsubscribe from an event
       * @param {string} event - The event name to unsubscribe from
       * @param {Function} callback - The callback function to remove
       */
      unsubscribe(event, callback) {
        if (!event || typeof event !== "string") {
          FlowPlaterError(
            "Invalid event name. Event name must be a non-empty string. If you are trying to unsubscribe from all events, use unsubscribeAll() instead.",
          );
        }

        if (!subscribers.has(event)) return;

        const subs = subscribers.get(event);
        subscribers.set(
          event,
          subs.filter((sub) => sub.callback !== callback),
        );
      },

      /**
       * Remove all event subscribers
       */
      unsubscribeAll() {
        subscribers.clear();

        Debug.info("Cleared all event subscribers");
      },

      /**
       * Publish an event with data
       * @param {string} event - The event name to publish
       * @param {Object} [data] - Data to pass to subscribers
       */
      publish(event, data) {
        if (!subscribers.has(event)) return;

        // Call subscribers for this specific event
        subscribers.get(event).forEach(({ callback, context }) => {
          try {
            callback.call(context, data);
          } catch (error) {
            Debug.error(`Error in event subscriber for ${event}:`, error);
          }
        });

        // If data contains instanceName, also trigger instance-specific event
        if (data && data.instanceName) {
          const instanceEvent = `${data.instanceName}:${event}`;
          if (subscribers.has(instanceEvent)) {
            subscribers.get(instanceEvent).forEach(({ callback, context }) => {
              try {
                callback.call(context, data);
              } catch (error) {
                Debug.error(
                  `Error in instance event subscriber for ${instanceEvent}:`,
                  error,
                );
              }
            });
          }
        }
      },
    };
  })();

  function saveToLocalStorage(key, data, prefix = "") {
    Debug.debug(`Storage config:`, _state.config?.storage);
    if (!_state.config?.storage?.enabled) {
      Debug.debug(`Storage is disabled, skipping save`);
      return false;
    }

    try {
      const storageKey = prefix ? `fp_${prefix}_${key}` : `fp_${key}`;

      // Always serialize/deserialize to ensure we have raw, deep-cloned data (removes Proxies)
      let rawData;
      try {
        // This effectively deep clones the target data, removing any proxy wrappers
        rawData = JSON.parse(JSON.stringify(data));
      } catch (e) {
        Debug.error(`Failed to serialize data for localStorage: ${e.message}`);
        // Fallback or decide how to handle non-serializable data
        rawData = {}; // Save empty object as fallback?
      }

      const storageData = {
        data: rawData,
        expiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
      };

      Debug.debug(`Saving to localStorage:`, {
        key: storageKey,
        data: storageData,
      });

      localStorage.setItem(storageKey, JSON.stringify(storageData));
      return true;
    } catch (error) {
      Debug.error(`Failed to save to localStorage: ${error.message}`);
      return false;
    }
  }

  function loadFromLocalStorage(key, prefix = "") {
    Debug.debug(`Storage config:`, _state.config?.storage);
    if (!_state.config?.storage?.enabled) {
      Debug.debug(`Storage is disabled, skipping load`);
      return null;
    }

    try {
      const storageKey = prefix ? `fp_${prefix}_${key}` : `fp_${key}`;
      const storedItem = localStorage.getItem(storageKey);
      if (!storedItem) {
        Debug.debug(`No stored item found for: ${storageKey}`);
        return null;
      }

      const storageData = JSON.parse(storedItem);

      // Check if data has expired
      if (storageData.expiry && storageData.expiry < Date.now()) {
        Debug.debug(`Stored item has expired: ${storageKey}`);
        localStorage.removeItem(storageKey);
        return null;
      }

      Debug.debug(`Loaded from localStorage:`, {
        key: storageKey,
        data: storageData,
      });

      // Return just the data portion, not the wrapper object
      return storageData.data;
    } catch (error) {
      Debug.error(`Failed to load from localStorage: ${error.message}`);
      return null;
    }
  }

  /**
   * @module FormStateManager
   * @description Manages form state restoration and persistence
   */
  const FormStateManager = {
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
      // Check if element has explicit persistence setting
      if (element.hasAttribute("fp-persist")) {
        return element.getAttribute("fp-persist") !== "false";
      }

      // Check if element is inside a form with persistence setting
      const form = element.closest("form");
      if (form && form.hasAttribute("fp-persist")) {
        return form.getAttribute("fp-persist") !== "false";
      }

      // Check if element is inside a container with persistence setting
      const container = element.closest("[fp-persist]");
      if (container) {
        return container.getAttribute("fp-persist") !== "false";
      }

      // Default to global setting
      return _state.config?.persistForm !== false;
    },

    /**
     * Determines if localStorage should be used for a form
     * @param {HTMLElement} element - The form element
     * @returns {boolean} - Whether to use localStorage
     */
    shouldUseLocalStorage(element) {
      return (
        element.hasAttribute("fp-persist-local") ||
        _state.config?.storage?.enabled === true
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

      // Check parent form if exists
      const parentForm = element.closest("form");
      if (parentForm) {
        // If parent form explicitly disables persistence, skip it
        if (parentForm.getAttribute("fp-persist") === "false") {
          return false;
        }

        // Check all form elements in parent form
        const formElements = parentForm.elements;
        for (const input of formElements) {
          // Skip elements without name or file inputs
          if (!input.name || input.type === "file") continue;

          // Check if input is inside an element with fp-persist="false"
          const persistFalseParent = input.closest('[fp-persist="false"]');
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

  /**
   * @module FilterPlugin
   * @description Plugin for filtering data based on form inputs
   */


  /**
   * Filter plugin for FlowPlater that filters data based on form inputs
   *
   * @function FilterPlugin
   * @returns {Object} Plugin object containing configuration, state, methods, hooks, transformers, and helpers
   */
  const FilterPlugin = () => {
    const config = {
      name: "filter",
      enabled: true,
      priority: 0,
      version: "1.0.0",
      dependencies: [],
      optionalDependencies: [],
      settings: {
        debug: false,
      },
      description: "Filters data based on form inputs",
      author: "FlowPlater Team",
    };

    const state = {
      instances: new Map(),
      formTemplates: new Map(),
      formObservers: new Map(),
    };

    /**
     * Gets a value from a nested object path
     * @param {Object} obj - The object to traverse
     * @param {string} path - The dot-notation path
     * @returns {*} The value at the path
     */
    function getValueFromPath(obj, path) {
      return path.split(".").reduce((current, key) => {
        if (current === undefined || current === null) return undefined;
        return current[key];
      }, obj);
    }

    /**
     * Extracts unique values from a data array for a given field
     * @param {Array} data - The data array
     * @param {string} field - The field path to extract values from
     * @returns {Array} Array of unique values
     */
    function generateFilterOptions(data, field) {
      const values = new Set();

      data.forEach((item) => {
        const value = getValueFromPath(item, field);
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
          value.forEach((v) => values.add(v));
        } else {
          values.add(value);
        }
      });

      return Array.from(values).sort();
    }

    /**
     * Sets up dynamic filters for a form
     * @param {HTMLFormElement} form - The form element
     * @param {string} path - The data path to filter
     * @param {Object} data - The instance data
     */
    function setupDynamicFilters(form, path, data) {
      // Get the array to filter
      const pathParts = path.split(".");
      let target = data;
      for (let i = 0; i < pathParts.length - 1; i++) {
        target = target[pathParts[i]];
        if (!target) return;
      }
      const array = target[pathParts[pathParts.length - 1]];
      if (!Array.isArray(array)) return;

      // Find all dynamic filter elements
      form
        .querySelectorAll("[fp-filter-key][fp-filter-dynamic]")
        .forEach((element) => {
          const field = element.getAttribute("fp-filter-key");
          const options = generateFilterOptions(array, field);

          if (element instanceof HTMLSelectElement) {
            // Clear existing options
            element.innerHTML = '<option value="">Select tags...</option>';

            // Add new options
            options.forEach((value) => {
              const option = document.createElement("option");
              option.value = value;
              option.textContent = value;
              element.appendChild(option);
            });

            // Restore select state if it exists
            const formState = FormStateManager.handleFormStorage(
              form,
              null,
              "load",
            );
            if (formState && element.name && formState[element.name]) {
              if (element.multiple) {
                // For multiple select, restore all selected values
                Array.from(element.options).forEach((option) => {
                  option.selected =
                    Array.isArray(formState[element.name]) &&
                    formState[element.name].includes(option.value);
                });
              } else {
                // For single select, restore the selected value
                element.value = formState[element.name];
              }
            }
          } else {
            // Handle checkbox/radio groups
            const wrapper = element;
            if (!wrapper) return;

            // Store the template and check if we should preserve default option
            const template = wrapper.children[0];
            if (!template) return;

            const preserveDefault = element.hasAttribute(
              "fp-filter-preserve-default",
            );
            const defaultOption = preserveDefault
              ? wrapper.children[0].cloneNode(true)
              : null;

            // Clear existing items
            wrapper.innerHTML = "";

            // Add back the default option if needed
            if (preserveDefault && defaultOption) {
              // For radio buttons, ensure the default option has empty value
              const defaultInput = defaultOption.querySelector("input");
              if (defaultInput && defaultInput.type === "radio") {
                defaultInput.value = "";
              }
              wrapper.appendChild(defaultOption);
            }

            // Create new elements for each option
            options.forEach((value) => {
              const clone = template.cloneNode(true);

              // Update input
              const input = clone.querySelector("input");
              if (input) {
                input.value = value;
                input.id = `${field}_${value}`;
                input.name = field;
              }

              // Update label's 'for' attribute if it exists
              const label = clone.querySelector("label");
              if (label) {
                label.setAttribute("for", `${field}_${value}`);
              }

              // Find and update text nodes in the element
              function updateTextContent(element, newText) {
                // First, normalize the element to merge adjacent text nodes
                element.normalize();

                // Find all text nodes
                const walker = document.createTreeWalker(
                  element,
                  NodeFilter.SHOW_TEXT,
                  {
                    acceptNode: function (node) {
                      // Skip empty or whitespace-only text nodes
                      return node.textContent.trim()
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                    },
                  },
                );

                // Get the first non-empty text node
                const textNode = walker.nextNode();
                if (textNode) {
                  textNode.textContent = newText;
                }
              }

              // Update the text content in either the label or the clone
              if (label) {
                updateTextContent(label, value);
              } else {
                updateTextContent(clone, value);
              }

              wrapper.appendChild(clone);
            });

            // Restore form state after all inputs are created
            const formState = FormStateManager.handleFormStorage(
              form,
              null,
              "load",
            );
            if (formState && field in formState) {
              const inputs = wrapper.querySelectorAll("input");
              inputs.forEach((input) => {
                if (input.type === "radio") {
                  input.checked =
                    (input.value || "") === (formState[field] || "");
                } else if (input.type === "checkbox") {
                  input.checked =
                    formState[field] === true ||
                    (Array.isArray(formState[field]) &&
                      formState[field].includes(input.value));
                }
              });
            }
          }
        });
    }

    /**
     * Converts form state to URL parameters
     * @param {Object} formState - The form state object
     * @returns {string} URL parameters string
     */
    function formStateToUrlParams(formState) {
      const params = new URLSearchParams();
      Object.entries(formState).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle arrays (multiple select, checkboxes) - join with commas
          if (value.length > 0) {
            params.set(key, value.join(","));
          }
        } else if (value !== null && value !== undefined && value !== "") {
          // Handle single values, skip empty ones
          params.set(key, value);
        }
      });
      return params.toString();
    }

    /**
     * Gets form state from URL parameters
     * @returns {Object} Form state from URL parameters
     */
    function getFormStateFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const state = {};

      params.forEach((value, key) => {
        // Check if the value contains commas (indicating multiple values)
        if (value.includes(",")) {
          state[key] = value.split(",").filter(Boolean);
        } else {
          state[key] = value;
        }
      });

      return state;
    }

    /**
     * Updates URL with form state
     * @param {HTMLFormElement} form - The form element
     * @param {Object} formState - The form state object
     */
    function updateUrl(form, formState) {
      if (!form.hasAttribute("fp-filter-usequery")) return;

      const params = formStateToUrlParams(formState);
      const newUrl = params
        ? `${window.location.pathname}?${params}`
        : window.location.pathname;

      window.history.replaceState({}, "", newUrl);
    }

    /**
     * Sets up event listeners for a filter form
     * @param {HTMLFormElement} form - The form element
     * @param {string} instanceName - The instance name
     */
    function setupFilterForm(form, instanceName) {
      if (!form || !instanceName) return;

      // Create a debounced refresh function
      let refreshTimeout;
      const debouncedRefresh = (instance) => {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => {
          instance.refresh({ source: "filter" });
        }, 25);
      };

      // Get trigger events from attribute or default to "change"
      // Support both space and comma separation (like htmx)
      const triggers = (form.getAttribute("fp-filter-triggers") || "change")
        .split(/[\s,]+/) // Split on one or more spaces or commas
        .filter(Boolean); // Remove empty strings

      // Helper function to handle form updates
      const handleFormUpdate = (e) => {
        if (!e.isTrusted) return;

        // Prevent form submission
        if (e.type === "submit") {
          e.preventDefault();
        }

        // Capture form state
        const formState = {};
        form.querySelectorAll("[fp-filter-key]").forEach((element) => {
          const key = element.getAttribute("fp-filter-key");
          if (!key) return;

          // Get all inputs within this element (or the element itself if it's an input)
          const inputs = element.matches("input, select, textarea")
            ? [element]
            : Array.from(element.querySelectorAll("input, select, textarea"));

          if (inputs.length === 0) return;

          if (inputs.some((input) => input.type === "checkbox")) {
            // Group checkboxes by key
            const checkboxes = inputs.filter(
              (input) => input.type === "checkbox",
            );
            if (checkboxes.length > 1) {
              // Multiple checkboxes with same key - store checked values
              formState[key] = checkboxes
                .filter((cb) => cb.checked)
                .map((cb) => cb.value);
            } else {
              // Single checkbox - store boolean state
              formState[key] = checkboxes[0].checked;
            }
          } else if (inputs.some((input) => input.type === "radio")) {
            // For radio buttons, ensure we have an entry even if none are checked
            const checkedRadio = inputs.find((input) => input.checked);
            formState[key] = checkedRadio ? checkedRadio.value || "" : "";
          } else if (
            inputs.some(
              (input) => input instanceof HTMLSelectElement && input.multiple,
            )
          ) {
            const select = inputs.find(
              (input) => input instanceof HTMLSelectElement && input.multiple,
            );
            formState[key] = Array.from(select.selectedOptions).map(
              (opt) => opt.value,
            );
          } else {
            // Handle text inputs, textareas, and dates
            formState[key] = inputs[0].value;
          }
        });

        // Save form state and trigger events
        EventSystem.publish("formState:beforeCapture", {
          formId: form.id,
          formElement: form,
          state: formState,
        });

        FormStateManager.handleFormStorage(form, formState, "save");

        EventSystem.publish("formState:changed", {
          formId: form.id,
          formElement: form,
          state: formState,
          changedElement: e.target,
        });

        // Update URL if enabled (after saving state) and not during initial load
        if (
          form.hasAttribute("fp-filter-usequery") &&
          !form.dataset.fpFilterInitialLoad
        ) {
          updateUrl(form, formState);
        }

        // Log form state for debugging
        FlowPlater.log(
          FlowPlater.logLevels.DEBUG,
          `[FilterPlugin] Form state captured`,
          { formState },
        );

        // Trigger debounced instance refresh
        const instance = FlowPlater.getInstance(instanceName);
        if (instance) {
          debouncedRefresh(instance);
        } else {
          FlowPlater.log(
            FlowPlater.logLevels.ERROR,
            `[FilterPlugin] Could not find instance for refresh`,
            {
              instanceName,
              formId: form.id,
            },
          );
        }
      };

      // Helper function to reset filters
      const handleFilterReset = (e) => {
        e.preventDefault();

        // Reset all form elements
        form.reset();

        // Clear form state
        FormStateManager.handleFormStorage(form, {}, "save");

        // Trigger form update to refresh the view
        handleFormUpdate({ isTrusted: true, type: "reset", target: e.target });
      };

      // Remove any existing event listeners
      form.removeEventListener("submit", handleFormUpdate);
      triggers.forEach((trigger) => {
        form.removeEventListener(trigger, handleFormUpdate);
      });

      // Add event listeners for specified triggers
      form.addEventListener("submit", handleFormUpdate);
      triggers.forEach((trigger) => {
        form.addEventListener(trigger, handleFormUpdate);
      });

      // Set up reset button if it exists
      const resetButton = form.querySelector("[fp-filter-reset]");
      if (resetButton) {
        resetButton.removeEventListener("click", handleFilterReset);
        resetButton.addEventListener("click", handleFilterReset);
      }

      // Set up event listener for formState:loaded
      EventSystem.subscribe("formState:loaded", (event) => {
        if (
          event.formElement === form &&
          form.hasAttribute("fp-filter-usequery")
        ) {
          const formState = getFormStateFromUrl();
          if (formState && Object.keys(formState).length > 0) {
            // Find all elements with fp-filter-key that are inputs or contain inputs
            form.querySelectorAll("[fp-filter-key]").forEach((element) => {
              const key = element.getAttribute("fp-filter-key");
              if (!key || !(key in formState)) return;

              // Get all inputs within this element (or the element itself if it's an input)
              const inputs = element.matches("input, select, textarea")
                ? [element]
                : Array.from(element.querySelectorAll("input, select, textarea"));

              if (inputs.length === 0) return;

              const value = formState[key];
              inputs.forEach((input) => {
                if (input.type === "checkbox") {
                  if (Array.isArray(value)) {
                    input.checked = value.includes(input.value);
                  } else {
                    input.checked = value;
                  }
                } else if (input.type === "radio") {
                  // Handle empty values correctly by comparing with empty string
                  input.checked = (input.value || "") === (value || "");
                } else if (input instanceof HTMLSelectElement && input.multiple) {
                  Array.from(input.options).forEach((option) => {
                    option.selected = Array.isArray(value)
                      ? value.includes(option.value)
                      : value === option.value;
                  });
                } else {
                  // Handle text inputs, textareas, and dates
                  input.value = value;
                }
              });
            });

            // Trigger initial update to apply filters
            const instance = FlowPlater.getInstance(instanceName);
            if (instance) {
              instance.refresh({ source: "filter" });
            }
          }
        }
      });
    }

    const hooks = {
      /**
       * Called when instance data is updated
       */
      updateData: function (instance, context) {
        if (!instance || context?.source === "system") {
          return instance;
        }

        const filterForms = document.querySelectorAll(
          `[fp-filter-instance="${instance.instanceName}"]`,
        );

        if (filterForms.length === 0) return instance;

        filterForms.forEach((form) => {
          const path = form.getAttribute("fp-filter");
          if (!path) return;

          // Set up form and dynamic filters if not already done
          if (!state.formTemplates.has(instance.instanceName)) {
            state.formTemplates.set(instance.instanceName, {
              formElement: form,
              originalHTML: form.innerHTML,
            });

            // Set up form handlers only once
            setupFilterForm(form, instance.instanceName);
          }

          // Always update dynamic filters with new data
          const data = instance.getData();
          setupDynamicFilters(form, path, data);

          // Load from URL parameters after dynamic filters are set up
          if (
            form.hasAttribute("fp-filter-usequery") &&
            FormStateManager.isPersistenceEnabledForElement(form)
          ) {
            const formState = getFormStateFromUrl();
            if (formState && Object.keys(formState).length > 0) {
              // Find all elements with fp-filter-key that are inputs or contain inputs
              form.querySelectorAll("[fp-filter-key]").forEach((element) => {
                const key = element.getAttribute("fp-filter-key");
                if (!key || !(key in formState)) return;

                // Get all inputs within this element (or the element itself if it's an input)
                const inputs = element.matches("input, select, textarea")
                  ? [element]
                  : Array.from(
                      element.querySelectorAll("input, select, textarea"),
                    );

                if (inputs.length === 0) return;

                const value = formState[key];
                inputs.forEach((input) => {
                  if (input.type === "checkbox") {
                    if (Array.isArray(value)) {
                      input.checked = value.includes(input.value);
                    } else {
                      input.checked = value;
                    }
                  } else if (input.type === "radio") {
                    // Handle empty values correctly by comparing with empty string
                    input.checked = (input.value || "") === (value || "");
                  } else if (
                    input instanceof HTMLSelectElement &&
                    input.multiple
                  ) {
                    Array.from(input.options).forEach((option) => {
                      option.selected = Array.isArray(value)
                        ? value.includes(option.value)
                        : value === option.value;
                    });
                  } else {
                    // Handle text inputs, textareas, and dates
                    input.value = value;
                  }
                });
              });

              // Trigger initial update to apply filters
              const handleFormUpdate = (e) => {
                if (!e.isTrusted) return;
                const instance = FlowPlater.getInstance(instance.instanceName);
                if (instance) {
                  instance.refresh({ source: "filter" });
                }
              };
              handleFormUpdate({ isTrusted: true, type: "init", target: form });
            }
          }
        });

        return instance;
      },

      /**
       * Clean up when plugin is disabled
       */
      cleanup: function () {
        state.formObservers.forEach((observer) => {
          observer.disconnect();
        });
        state.formObservers.clear();
        state.formTemplates.clear();
      },
    };

    /**
     * Parses a date string or timestamp into a Date object
     * @param {string|number} value - The date string or timestamp to parse
     * @returns {Date|null} The parsed Date object or null if invalid
     */
    function parseDate(value) {
      if (!value) return null;
      if (value instanceof Date) return value;

      const date = new Date(value);
      return isNaN(date) ? null : date;
    }

    // Modify the handleRangeFilter function to use simple date parsing
    function handleRangeFilter(itemValue, operator, value) {
      if (!value) return true;

      // Handle date comparisons
      if (itemValue instanceof Date || isValidDateString(itemValue)) {
        const itemDate = parseDate(itemValue);
        const compareDate = parseDate(value);

        if (!itemDate || !compareDate) return true; // Skip invalid dates

        switch (operator) {
          case "min":
            return itemDate >= compareDate;
          case "max":
            return itemDate <= compareDate;
          default:
            return true;
        }
      }

      // Handle numeric comparisons
      const numValue = parseFloat(value);
      const numItemValue = parseFloat(itemValue);

      if (isNaN(numValue) || isNaN(numItemValue)) return true;

      switch (operator) {
        case "min":
          return numItemValue >= numValue;
        case "max":
          return numItemValue <= numValue;
        default:
          return true;
      }
    }

    /**
     * Checks if a string looks like a date
     * @param {string} value - The value to check
     * @returns {boolean} True if the value looks like a date
     */
    function isValidDateString(value) {
      if (typeof value !== "string") return false;
      // Check for YYYY-MM-DD format or ISO date format
      return (
        /^\d{4}-\d{2}-\d{2}/.test(value) ||
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)
      );
    }

    function handleCheckboxFilter(inputs, itemValue) {
      const checkedBoxes = inputs.filter(
        (input) => input.type === "checkbox" && input.checked,
      );

      // If no checkboxes are checked, don't filter
      if (checkedBoxes.length === 0) {
        return true;
      }

      // For single values (like difficulty), check if any checked checkbox matches the value
      const result = checkedBoxes.some((checkbox) => {
        const matches = checkbox.value === itemValue;
        return matches;
      });

      return result;
    }

    function handleRadioFilter(inputs, itemValue) {
      const selectedRadio = inputs.find(
        (input) => input.type === "radio" && input.checked,
      );

      // Show all items if no radio is selected or if the selected value is empty
      if (!selectedRadio || !selectedRadio.value) return true;

      return itemValue === selectedRadio.value;
    }

    // Modify the handleTextFilter function to use simple date parsing
    function handleTextFilter(inputs, itemValue) {
      const input = inputs.find(
        (input) => input.type === "text" || input.tagName === "SELECT",
      );
      if (!input) return true;

      // Handle select elements
      if (input.tagName === "SELECT") {
        // If no value is selected or default option is selected, show all
        if (!input.value || input.value === "") return true;

        // For multiple select
        if (input.multiple) {
          const selectedValues = Array.from(input.selectedOptions).map(
            (opt) => opt.value,
          );
          if (selectedValues.length === 0) return true;

          // If itemValue is an array (like tags), check if any selected value exists in the array
          if (Array.isArray(itemValue)) {
            return selectedValues.some((selectedValue) =>
              itemValue.some(
                (v) => v.toString().toLowerCase() === selectedValue.toLowerCase(),
              ),
            );
          }
          // For non-array values, check if any selected value matches
          return selectedValues.some(
            (selectedValue) =>
              itemValue.toString().toLowerCase() === selectedValue.toLowerCase(),
          );
        }

        // For single select
        // If itemValue is an array (like tags), check if the selected value exists in the array
        if (Array.isArray(itemValue)) {
          return itemValue.some(
            (v) => v.toString().toLowerCase() === input.value.toLowerCase(),
          );
        }
        return itemValue.toString().toLowerCase() === input.value.toLowerCase();
      }

      // Handle text input
      if (!input.value) return true;

      // Check if this is a date filter
      const filterType = input.getAttribute("fp-filter-type");
      if (filterType === "date") {
        const itemDate = parseDate(itemValue);
        const inputDate = parseDate(input.value);

        if (!itemDate || !inputDate) return true; // Skip invalid dates
        return itemDate.getTime() === inputDate.getTime();
      }

      // Regular text filter logic for non-array values
      return itemValue
        .toString()
        .toLowerCase()
        .includes(input.value.toLowerCase());
    }

    function applyFilters(item, filterGroups) {
      return Object.entries(filterGroups).every(([key, inputs]) => {
        const [fieldName, operator] = key.split(":");
        const itemValue = getValueFromPath(item, fieldName);

        // If we have an operator, use the appropriate filter handler
        if (operator) {
          return handleRangeFilter(itemValue, operator, inputs[0].value);
        }

        // Otherwise, determine the filter type based on input type
        if (inputs.some((input) => input.type === "checkbox")) {
          return handleCheckboxFilter(inputs, itemValue);
        }

        if (inputs.some((input) => input.type === "radio")) {
          return handleRadioFilter(inputs, itemValue);
        }

        // Handle both text inputs and select elements
        return handleTextFilter(inputs, itemValue);
      });
    }

    const transformers = {
      /**
       * Transform data before it's passed to the instance for rendering
       * This allows us to filter the data based on form inputs
       *
       * @param {Object} instance - The FlowPlater instance that made the request
       * @param {Object} data - The data object to be rendered
       * @param {string} dataType - The type of data being transformed (always "json" for this transformation)
       * @returns {Object} The modified data object
       */
      transformDataBeforeRender: function (instance, data, dataType) {
        if (!data) return data;
        if (dataType !== "json") {
          FlowPlater.log(
            FlowPlater.logLevels.ERROR,
            "[FilterPlugin] Data type is not json. Skipping filter.",
          );
          return data;
        }

        const filterForms = document.querySelectorAll(
          `[fp-filter-instance="${instance.instanceName}"]`,
        );

        if (filterForms.length === 0) return data;

        let filteredData = { ...data };

        filterForms.forEach((form) => {
          const path = form.getAttribute("fp-filter");
          if (!path) return;

          // Group inputs by their filter key
          const filterGroups = {};
          form.querySelectorAll("input, select").forEach((element) => {
            // Get the filter key from fp-filter-key or use the name attribute
            const key = element.getAttribute("fp-filter-key") || element.name;
            if (!key) return;

            // Find all inputs inside this element (or the element itself if it's an input)
            const inputs = element.matches("input, select")
              ? [element]
              : Array.from(element.querySelectorAll("input, select"));

            if (inputs.length === 0) return;

            const [field, operator] = key.split(":");
            const groupKey = operator ? `${field}:${operator}` : field;

            if (!filterGroups[groupKey]) filterGroups[groupKey] = [];
            filterGroups[groupKey].push(...inputs);

            FlowPlater.log(
              FlowPlater.logLevels.DEBUG,
              `[FilterPlugin] Found inputs for filter key`,
              {
                key,
                inputCount: inputs.length,
                inputTypes: inputs.map((i) => i.type),
              },
            );
          });

          // Filter the array
          const filteredArray = filteredData[path].filter((item) =>
            applyFilters(item, filterGroups),
          );

          // Update the filtered data
          let current = filteredData;
          for (let i = 0; i < path.split(".").length - 1; i++) {
            current = current[path.split(".")[i]];
          }
          current[path.split(".")[path.split(".").length - 1]] = filteredArray;
        });

        return filteredData;
      },
    };

    return {
      config,
      state,
      hooks,
      transformers,
    };
  };

  return FilterPlugin;

})();
