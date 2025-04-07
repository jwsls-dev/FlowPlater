var FilterPlugin = (function () {
  'use strict';

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
    };

    // Helper functions for filtering
    function handleRangeFilter(itemValue, operator, value) {
      if (!value) return true;

      switch (operator) {
        case "min":
          return itemValue instanceof Date
            ? new Date(itemValue) >= new Date(value)
            : itemValue >= parseFloat(value);
        case "max":
          return itemValue instanceof Date
            ? new Date(itemValue) <= new Date(value)
            : itemValue <= parseFloat(value);
        default:
          return true;
      }
    }

    function handleCheckboxFilter(inputs, itemValue) {
      const checkedBoxes = inputs.filter(
        (input) => input.type === "checkbox" && input.checked,
      );

      if (checkedBoxes.length === 0) return true;

      if (Array.isArray(itemValue)) {
        return checkedBoxes.some((checkbox) =>
          itemValue.includes(checkbox.value),
        );
      }

      if (inputs.length === 1 && inputs[0].type === "checkbox") {
        return itemValue === inputs[0].checked;
      }

      return true;
    }

    function handleRadioFilter(inputs, itemValue) {
      const selectedRadio = inputs.find(
        (input) => input.type === "radio" && input.checked,
      );

      return selectedRadio ? itemValue === selectedRadio.value : true;
    }

    function handleTextFilter(inputs, itemValue) {
      const textInput = inputs.find((input) => input.type === "text");
      if (!textInput || !textInput.value) return true;

      if (Array.isArray(itemValue)) {
        return itemValue.some((v) =>
          v.toString().toLowerCase().includes(textInput.value.toLowerCase()),
        );
      }

      return itemValue
        .toString()
        .toLowerCase()
        .includes(textInput.value.toLowerCase());
    }

    function applyFilters(item, filterGroups) {
      return Object.entries(filterGroups).every(([key, inputs]) => {
        const [fieldName, operator] = key.split(":");
        const itemValue = item[fieldName];

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

        // Find all filter forms for this instance
        const filterForms = document.querySelectorAll(
          `[fp-filter-instance="${instance.instanceName}"]`,
        );

        if (filterForms.length === 0) return data;

        // Process each filter form
        filterForms.forEach((form) => {
          const path = form.getAttribute("fp-filter");
          if (!path) return;

          // Get the array to filter
          const pathParts = path.split(".");
          let target = data;
          for (let i = 0; i < pathParts.length - 1; i++) {
            target = target[pathParts[i]];
            if (!target) return;
          }
          const array = target[pathParts[pathParts.length - 1]];
          if (!Array.isArray(array)) return;

          // Group inputs by their filter key
          const filterGroups = {};
          form.querySelectorAll("[fp-filter-key]").forEach((input) => {
            const [key, operator] = input
              .getAttribute("fp-filter-key")
              .split(":");
            if (!filterGroups[key]) filterGroups[key] = [];
            filterGroups[key].push(input);
          });

          // Apply filters
          target[pathParts[pathParts.length - 1]] = array.filter((item) =>
            applyFilters(item, filterGroups),
          );
        });

        return data;
      },
    };

    return {
      config,
      state,
      transformers,
    };
  };

  return FilterPlugin;

})();
