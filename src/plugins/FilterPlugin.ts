/**
 * @module FilterPlugin
 * @description Plugin for filtering data based on form inputs
 */

import { FormStateManager } from "../forms";
import { EventSystem } from "../events";
import { FlowPlaterObj, FlowPlaterInstance, TransformerDataType } from "../types";

declare const FlowPlater: FlowPlaterObj;

/**
 * Filter plugin for FlowPlater that filters data based on form inputs
 *
 * @function FilterPlugin
 * @returns {Object} Plugin object containing configuration, state, methods, hooks, transformers, and helpers
 */
const FilterPlugin = (customConfig = {}) => {
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

  // Merge custom config with default config
  Object.assign(config, customConfig);

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
  function getValueFromPath(obj: any, path: string) {
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
  function generateFilterOptions(data: any[], field: string) {
    const values = new Set();

    data.forEach((item: any) => {
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
  function setupDynamicFilters(form: HTMLFormElement, path: string, data: any) {
    // Trigger before dynamic filters update
    FlowPlater.trigger("filter:beforeDynamicUpdate", form, { path, data });

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
        const options = generateFilterOptions(array, field || "");

        if (element instanceof HTMLSelectElement) {
          // Clear existing options
          element.innerHTML = '<option value="">Select tags...</option>';

          // Add new options
          options.forEach((value) => {
            const option = document.createElement("option");
            option.value = value as string;
            option.textContent = value as string;
            element.appendChild(option);
          });

          // Restore select state if it exists
          const formState = FormStateManager.handleFormStorage(
            form,
            {} as any,
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
            const defaultInput = (defaultOption as HTMLElement).querySelector("input");
            if (defaultInput && defaultInput.type === "radio") {
              defaultInput.value = "";
            }
            wrapper.appendChild(defaultOption);
          }

          // Create new elements for each option
          options.forEach((value) => {
            const clone = template.cloneNode(true);

            // Update input
            const input = (clone as HTMLElement).querySelector("input");
            if (input) {
              input.value = value as string;
              input.id = `${field}_${value}`;
              input.name = field || "";
            }

            // Update label's 'for' attribute if it exists
            const label = (clone as HTMLElement).querySelector("label");
            if (label) {
              label.setAttribute("for", `${field}_${value}` || "");
            }

            // Find and update text nodes in the element
            function updateTextContent(element: HTMLElement, newText: string) {
              // First, normalize the element to merge adjacent text nodes
              element.normalize();

              // Find all text nodes
              const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                {
                  acceptNode: function (node) {
                    // Skip empty or whitespace-only text nodes
                    return node.textContent?.trim() || ""
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
              updateTextContent(label, value as string);
            } else {
              updateTextContent(clone as HTMLElement, value as string);
            }

            wrapper.appendChild(clone);
          });

          // Restore form state after all inputs are created
          const formState = FormStateManager.handleFormStorage(
            form,
            {} as any,
            "load",
          );
          if (formState && field && field in formState) {
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

    // Trigger after dynamic filters update
    FlowPlater.trigger("filter:dynamicUpdated", form, { path, data });
  }

  /**
   * Converts form state to URL parameters
   * @param {Object} formState - The form state object
   * @returns {string} URL parameters string
   */
  function formStateToUrlParams(formState: any) {
    const params = new URLSearchParams();
    Object.entries(formState).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle arrays (multiple select, checkboxes) - join with commas
        if (value.length > 0) {
          params.set(key, value.join(","));
        }
      } else if (value !== null && value !== undefined && value !== "") {
        // Handle single values, skip empty ones
        params.set(key, value as string);
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
    const state: { [key: string]: any } = {};

    params.forEach((value, key) => {
      // Check if the value contains commas (indicating multiple values)
      if (value.includes(",")) {
        state[key as string] = value.split(",").filter(Boolean) as any;
      } else {
        state[key as string] = value as any;
      }
    });

    return state;
  }

  /**
   * Updates URL with form state
   * @param {HTMLFormElement} form - The form element
   * @param {Object} formState - The form state object
   */
  function updateUrl(form: HTMLFormElement, formState: any) {
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
  function setupFilterForm(form: HTMLFormElement, instanceName: string) {
    if (!form || !instanceName) return;

    // Create a debounced refresh function
    let refreshTimeout: NodeJS.Timeout;
    const debouncedRefresh = (instance: any) => {
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
    const handleFormUpdate = (e: Event) => {
      if (!e.isTrusted) return;

      // Prevent form submission
      if (e.type === "submit") {
        e.preventDefault();
      }

      // Capture form state
      const formState: { [key: string]: any } = {};
      form.querySelectorAll("[fp-filter-key]").forEach((element) => {
        const key = element.getAttribute("fp-filter-key");
        if (!key) return;

        // Get all inputs within this element (or the element itself if it's an input)
        const inputs = element.matches("input, select, textarea")
          ? [element]
          : Array.from(element.querySelectorAll("input, select, textarea"));

        if (inputs.length === 0) return;

        if (inputs.some((input) => (input as HTMLInputElement).type === "checkbox")) {
          // Group checkboxes by key
          const checkboxes = inputs.filter(
            (input) => (input as HTMLInputElement).type === "checkbox",
          );
          if (checkboxes.length > 1) {
            // Multiple checkboxes with same key - store checked values
            formState[key as string] = checkboxes
              .filter((cb) => (cb as HTMLInputElement).checked)
              .map((cb) => (cb as HTMLInputElement).value);
          } else {
            // Single checkbox - store boolean state
            formState[key as string] = (checkboxes[0] as HTMLInputElement).checked;
          }
        } else if (inputs.some((input) => (input as HTMLInputElement).type === "radio")) {
          // For radio buttons, ensure we have an entry even if none are checked
          const checkedRadio = inputs.find((input) => (input as HTMLInputElement).checked);
          formState[key as string] = checkedRadio ? (checkedRadio as HTMLInputElement).value || "" : "";
        } else if (
          inputs.some(
            (input) => input instanceof HTMLSelectElement && input.multiple,
          )
        ) {
          const select = inputs.find(
            (input) => input instanceof HTMLSelectElement && input.multiple,
          );
          if (select) {
            formState[key as string] = Array.from((select as HTMLSelectElement).selectedOptions).map(
              (opt) => (opt as HTMLOptionElement).value,
            );
          } else {
            formState[key as string] = [];
          }
        } else {
          // Handle text inputs, textareas, and dates
          formState[key as string] = (inputs[0] as HTMLInputElement).value || "";
        }
      });

      // Trigger before filters are applied
      FlowPlater.trigger("filter:beforeApply", form, {
        formState,
        instanceName,
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

      // Trigger after filters are applied
      FlowPlater.trigger("filter:applied", form, { formState, instanceName });
    };

    // Helper function to reset filters
    const handleFilterReset = (e: Event) => {
      e.preventDefault();

      // Trigger before reset
      FlowPlater.trigger("filter:beforeReset", form, { instanceName });

      // Reset all form elements
      form.reset();

      // Clear form state
      FormStateManager.handleFormStorage(form, {}, "save");

      // Trigger form update to refresh the view
      handleFormUpdate({ isTrusted: true, type: "reset", target: e.target } as any);

      // Trigger after reset
      FlowPlater.trigger("filter:reset", form, { instanceName });
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
    EventSystem.subscribe("formState:loaded", (event: any) => {
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
              if ((input as HTMLInputElement).type === "checkbox") {
                if (Array.isArray(value)) {
                  (input as HTMLInputElement).checked = value.includes((input as HTMLInputElement).value);
                } else {
                  (input as HTMLInputElement).checked = value;
                }
              } else if ((input as HTMLInputElement).type === "radio") {
                // Handle empty values correctly by comparing with empty string
                (input as HTMLInputElement).checked = ((input as HTMLInputElement).value || "") === (value || "");
              } else if (input instanceof HTMLSelectElement && (input as HTMLSelectElement).multiple) {
                Array.from((input as HTMLSelectElement).options).forEach((option) => {
                  option.selected = Array.isArray(value)
                    ? value.includes(option.value)
                    : value === option.value;
                });
              } else {
                // Handle text inputs, textareas, and dates
                (input as HTMLInputElement).value = value;
              }
            });
          });

          // Trigger initial update to apply filters
          const handleFormUpdate = (e: Event) => {
            if (!e.isTrusted) return;
            const instance = FlowPlater.getInstance(instanceName);
            if (instance) {
              instance.refresh();
            }
          };
          handleFormUpdate({ isTrusted: true, type: "init", target: form } as any);
        }
      }
    });
  }

  const hooks = {
    /**
     * Called when instance data is updated
     */
    updateData: function (instance: FlowPlaterInstance, context: any) {
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
          setupFilterForm(form as HTMLFormElement, instance.instanceName);
        }

        // Always update dynamic filters with new data
        const data = instance.getData();
        setupDynamicFilters(form as HTMLFormElement, path, data);

        // Load from URL parameters after dynamic filters are set up
        if (
          form.hasAttribute("fp-filter-usequery") &&
          FormStateManager.isPersistenceEnabledForElement(form as HTMLFormElement)
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
                if ((input as HTMLInputElement).type === "checkbox") {
                  if (Array.isArray(value)) {
                    (input as HTMLInputElement).checked = value.includes((input as HTMLInputElement).value);
                  } else {
                    (input as HTMLInputElement).checked = value;
                  }
                } else if ((input as HTMLInputElement).type === "radio") {
                  // Handle empty values correctly by comparing with empty string
                  (input as HTMLInputElement).checked = ((input as HTMLInputElement).value || "") === (value || "");
                } else if (
                  input instanceof HTMLSelectElement &&
                  (input as HTMLSelectElement).multiple
                ) {
                  Array.from(input.options).forEach((option) => {
                    option.selected = Array.isArray(value)
                      ? value.includes(option.value)
                      : value === option.value;
                  });
                } else {
                  // Handle text inputs, textareas, and dates
                  (input as HTMLInputElement).value = value;
                }
              });
            });

            // Trigger initial update to apply filters
            const handleFormUpdate = (e: Event) => {
              if (!e.isTrusted) return;
              const targetInstance = FlowPlater.getInstance(instance.instanceName);
              if (targetInstance) {
                targetInstance.refresh();
              }
            };
            handleFormUpdate({ isTrusted: true, type: "init", target: form } as any);
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
  function parseDate(value: string | number | Date) {
    if (!value) return null;
    if (value instanceof Date) return value;

    const date = new Date(value);
    return isNaN(date as any) ? null : date;
  }

  // Modify the handleRangeFilter function to use simple date parsing
  function handleRangeFilter(itemValue: string | number | Date, operator: string, value: string | number | Date) {
    if (!value) return true;

    // Handle date comparisons
    if (itemValue instanceof Date || isValidDateString(itemValue as string)) {
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
    const numValue = parseFloat(value as string);
    const numItemValue = parseFloat(itemValue as string);

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
  function isValidDateString(value: string) {
    if (typeof value !== "string") return false;
    // Check for YYYY-MM-DD format or ISO date format
    return (
      /^\d{4}-\d{2}-\d{2}/.test(value) ||
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)
    );
  }

  function handleCheckboxFilter(inputs: HTMLInputElement[], itemValue: string | number | Date) {
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

  function handleRadioFilter(inputs: HTMLInputElement[], itemValue: string | number | Date) {
    const selectedRadio = inputs.find(
      (input) => input.type === "radio" && input.checked,
    );

    // Show all items if no radio is selected or if the selected value is empty
    if (!selectedRadio || !selectedRadio.value) return true;

    return itemValue === selectedRadio.value;
  }

  // Modify the handleTextFilter function to use simple date parsing
  function handleTextFilter(inputs: (HTMLInputElement | HTMLSelectElement)[], itemValue: string | number | Date) {
    const input = inputs.find(
      (input) => input.type === "text" || input.tagName === "SELECT",
    );
    if (!input) return true;

    // Handle select elements
    if (input.tagName === "SELECT") {
      // If no value is selected or default option is selected, show all
      if (!input.value || input.value === "") return true;

      // For multiple select
      if (input instanceof HTMLSelectElement && input.multiple) {
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

  function applyFilters(item: any, filterGroups: any) {
    return Object.entries(filterGroups).every(([key, inputs]: [string, any]) => {
      const [fieldName, operator] = key.split(":");
      const itemValue = getValueFromPath(item, fieldName);

      // If we have an operator, use the appropriate filter handler
      if (operator) {
        return handleRangeFilter(itemValue, operator, (inputs[0] as HTMLInputElement).value as string | number | Date);
      }

      // Otherwise, determine the filter type based on input type
      if (inputs.some((input: any) => input.type === "checkbox")) {
        return handleCheckboxFilter(inputs as HTMLInputElement[], itemValue);
      }

      if (inputs.some((input: any) => input.type === "radio")) {
        return handleRadioFilter(inputs as HTMLInputElement[], itemValue);
      }

      // Handle both text inputs and select elements
      return handleTextFilter(inputs as (HTMLInputElement | HTMLSelectElement)[], itemValue);
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
    transformDataBeforeRender: function (instance: FlowPlaterInstance, data: any, dataType: TransformerDataType) {
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

      const instanceElements = instance.getElements() as HTMLElement[];
      instanceElements.forEach((element) => {
        FlowPlater.trigger("filter:beforeTransform", element, {
          data,
          dataType,
        });
      });

      filterForms.forEach((form) => {
        const path = form.getAttribute("fp-filter");
        if (!path) return;

        // Group inputs by their filter key
        const filterGroups: { [key: string]: any[] } = {};
        form.querySelectorAll("input, select").forEach((element) => {
          // Get the filter key from fp-filter-key or use the name attribute
          const key = element.getAttribute("fp-filter-key") || (element as HTMLInputElement).name;
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
              inputTypes: inputs.map((i: any) => i.type),
            },
          );
        });

        // Filter the array
        const filteredArray = filteredData[path].filter((item: any) =>
          applyFilters(item, filterGroups),
        );

        // Update the filtered data
        let current = filteredData;
        for (let i = 0; i < path.split(".").length - 1; i++) {
          current = current[path.split(".")[i]];
        }
        current[path.split(".")[path.split(".").length - 1]] = filteredArray;
      });

      instanceElements.forEach((element) => {
        FlowPlater.trigger("filter:transformed", element, {
          originalData: data,
          filteredData: filteredData,
        });
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

export default FilterPlugin;
