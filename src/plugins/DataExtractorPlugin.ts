import { FlowPlaterObj } from "../types";
import { AttributeMatcher } from "../utils/AttributeMatcher";
import { getGroupedInputValue } from "./utils/inputUtils";

declare const FlowPlater: FlowPlaterObj;

/**
 * @module DataExtractorPlugin
 * @description Plugin for transforming HTML with fp-data attributes into JSON data
 */

/**
 * DataExtractor plugin for FlowPlater that transforms HTML with fp-data attributes into JSON
 *
 * @function DataExtractorPlugin
 * @returns {Object} Plugin object containing configuration, state, methods, hooks, transformers, and helpers
 */
const DataExtractorPlugin = (customConfig = {}) => {
  const config = {
    name: "data-extractor",
    enabled: true,
    priority: 100,
    version: "1.0.0",
    dependencies: [],
    optionalDependencies: [],
    settings: {
      debug: false,
    },
    description: "Transforms HTML with fp-data attributes into JSON data",
    author: "FlowPlater Team",
  };

  Object.assign(config, customConfig);

  const state = {
    instances: new Map(),
  };

  /**
   * Recursively extracts data for a single element with fp-data.
   * Determines primary value (input, fp-data-value, specific tag, text, or nested children).
   * Extracts suffix attributes.
   * @param {HTMLElement} element - The element with fp-data to process.
   * @param {Set<HTMLElement>} processedElements - Set to track elements processed during recursion to prevent cycles.
   * @returns {{primaryValue: *, suffixes: Object, inputInfo: Object|null}|null} Object containing primary value, suffixes, and input info, or null.
   */
  const _extractSingleElementData = (
    element: HTMLElement,
    processedElements = new Set(),
  ) => {
    // FlowPlater.log(
    //   FlowPlater.logLevels.DEBUG,
    //   `[DataExtractor] _extractSingleElementData called for:`,
    //   element,
    //   `Processed set size: ${processedElements.size}`,
    // );
    const hasDataAttr = AttributeMatcher._hasAttribute(element, "data");
    const isProcessed = processedElements.has(element);
    // FlowPlater.log(
    //   FlowPlater.logLevels.DEBUG,
    //   `  - Initial checks: hasDataAttr=${hasDataAttr}, isProcessed=${isProcessed}`,
    // );

    if (!element || !hasDataAttr || isProcessed) {
      FlowPlater.log(FlowPlater.logLevels.DEBUG, `  - Exiting prematurely.`);
      return null;
    }
    processedElements.add(element); // Mark as processed for this recursive path

    let primaryValue: string | number | boolean | any[] | { [key: string]: any } | null = null;
    let valueSource = null;
    const suffixes: { [key: string]: any } = {};
    let inputInfo = null;

    // 1. Extract Suffixes first
    const suffixPrefix = "fp-data-";
    const dataSuffixPrefix = "data-fp-data-";
    for (const attr of element.attributes) {
      let suffixKey = null;
      if (attr.name.startsWith(suffixPrefix)) {
        suffixKey = attr.name.substring(suffixPrefix.length);
      } else if (attr.name.startsWith(dataSuffixPrefix)) {
        suffixKey = attr.name.substring(dataSuffixPrefix.length);
      }
      if (suffixKey && suffixKey !== "value") {
        let suffixValue: string | number = attr.value;
        const num = Number(suffixValue);
        if (!isNaN(num) && suffixValue.trim() !== "") suffixValue = num;
        suffixes[suffixKey as string] = suffixValue;
      }
    }

    // 2. Determine Primary Value (Priority: explicit > input > specific tag > nested > text)
    const explicitValue = AttributeMatcher._getRawAttribute(
      element,
      "data-value",
      null,
    );
    if (explicitValue !== null) {
      primaryValue = explicitValue;
      valueSource = "attribute";
    } else {
      // Check for input info FIRST - ONLY if the element *itself* is an input
      let inputElement = null;
      if (["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName)) {
        inputElement = element;
      }

      if (inputElement) {
        inputInfo = {
          isInput: true,
          type: (inputElement as HTMLInputElement).type,
          name: (inputElement as HTMLInputElement).name || null,
          valueAttr: (inputElement as HTMLInputElement).value, // Get value attribute directly
        };
      }

      // If no explicit value AND no input found, check specific tags
      if (primaryValue === null && !inputInfo) {
        switch (element.tagName) {
          case "IMG":
            primaryValue = {
              src: (element as HTMLImageElement).src,
              alt: (element as HTMLImageElement).alt,
              width: (element as HTMLImageElement).width,
              height: (element as HTMLImageElement).height,
            };
            valueSource = "object";
            break;
          case "VIDEO":
          case "AUDIO":
            const sources = Array.from((element as HTMLMediaElement).querySelectorAll("source")).map(
              (s: any) => ({ src: s.src, type: s.type }),
            );
            primaryValue = { src: (element as HTMLMediaElement).src, sources: sources };
            valueSource = "object";
            break;
          case "A":
          case "BUTTON":
            primaryValue = {
              href: (element as HTMLAnchorElement).href,
              text: (element as HTMLAnchorElement).textContent?.trim() || "",
              target: (element as HTMLAnchorElement).target,
            };
            valueSource = "object";
            break;
        }
      }

      // If still no value, THEN check for nested children
      // FlowPlater.log(
      //   FlowPlater.logLevels.DEBUG,
      //   `[DataExtractor] Before nested check:`,
      //   { primaryValue, inputInfo },
      // );
      if (primaryValue === null && !inputInfo) {
        // Find all descendants with fp-data
        const allDescendantsWithData = AttributeMatcher.findMatchingElements(
          "data",
          undefined,
          true,
          element,
          false,
        ); // includeSelf = false

        // Filter to find only direct children in the fp-data hierarchy
        const directFpDataChildren = (allDescendantsWithData as HTMLElement[]).filter((child: HTMLElement) => {
          let parent = child.parentElement;
          while (parent && parent !== element) {
            if (AttributeMatcher._hasAttribute(parent, "data")) {
              return false; // Found an intermediate fp-data parent
            }
            parent = parent.parentElement;
          }
          return parent === element; // It's a direct child in the fp-data sense
        });

        if (directFpDataChildren.length > 0) {
          const childData: { [key: string]: any } = {};
          let hasChildData = false;
          const nestedGroupParts: { [key: string]: any } = {}; // Temp storage for group parts keyed by childKey

          for (const child of directFpDataChildren) {
            const childKey = AttributeMatcher._getRawAttribute(child, "data");
            const nestedResult = _extractSingleElementData(
              child,
              processedElements,
            );

            // FlowPlater.log(
            //   FlowPlater.logLevels.DEBUG,
            //   `  <- Child result for key '${childKey}':`,
            //   { nestedResult },
            // );

            if (nestedResult) {
              hasChildData = true;
              // FlowPlater.log(
              //   FlowPlater.logLevels.DEBUG,
              //   `  -> hasChildData set to true by key '${childKey}'`,
              // );
              // Check if the nested result is part of a radio/checkbox group
              if (
                nestedResult.inputInfo &&
                nestedResult.inputInfo.name &&
                (nestedResult.inputInfo.type === "radio" ||
                  nestedResult.inputInfo.type === "checkbox") &&
                childKey !== null // Only group if it has a key
              ) {
                // It's part of a nested group, store marker for later processing
                if (!nestedGroupParts[childKey]) {
                  nestedGroupParts[childKey] = [];
                }
                nestedGroupParts[childKey].push({
                  _isNestedGroupPart: true,
                  element: child, // Reference to the original input/container element
                  inputInfo: nestedResult.inputInfo,
                  suffixes: nestedResult.suffixes,
                });
                // FlowPlater.log(
                //   FlowPlater.logLevels.DEBUG,
                //   `[DataExtractor] Created nested group part marker for key '${childKey}'`,
                //   {
                //     element: child,
                //     inputInfo: nestedResult.inputInfo,
                //     suffixes: nestedResult.suffixes,
                //   },
                // );
              } else if (childKey !== null) {
                // It's regular nested data
                let nestedValue = nestedResult.primaryValue;
                // Combine child's value and suffixes before assigning
                if (
                  nestedValue !== null &&
                  Object.keys(nestedResult.suffixes).length > 0
                ) {
                  if (
                    typeof nestedValue === "object" &&
                    !Array.isArray(nestedValue) &&
                    nestedValue !== null
                  ) {
                    Object.assign(nestedValue, nestedResult.suffixes);
                  } else {
                    nestedValue = {
                      value: nestedValue,
                      ...nestedResult.suffixes,
                    };
                  }
                } else if (Object.keys(nestedResult.suffixes).length > 0) {
                  nestedValue = nestedResult.suffixes;
                }

                if (childData.hasOwnProperty(childKey)) {
                  if (!Array.isArray(childData[childKey]))
                    childData[childKey] = [childData[childKey]];
                  childData[childKey].push(nestedValue);
                } else {
                  childData[childKey] = nestedValue;
                }
              } else if (
                childKey === null &&
                Object.keys(nestedResult.suffixes).length > 0
              ) {
                // Suffixes from a keyless child - merge directly
                Object.assign(childData, nestedResult.suffixes);
              }
            } else {
              // FlowPlater.log(
              //   FlowPlater.logLevels.DEBUG,
              //   `  -- Child key '${childKey}' yielded null result.`,
              // );
            }
          }
          // After checking all children, add collected group parts to childData
          // FlowPlater.log(
          //   FlowPlater.logLevels.DEBUG,
          //   `[DataExtractor] Finished processing children. hasChildData=${hasChildData}`,
          // );
          for (const key in nestedGroupParts) {
            if (childData.hasOwnProperty(key)) {
              FlowPlater.log(
                FlowPlater.logLevels.WARN,
                `[DataExtractor] Nested key '${key}' conflicts between regular data and a nested input group. Group data will overwrite.`,
              );
            }
            childData[key] = nestedGroupParts[key];
          }

          if (hasChildData) {
            primaryValue = childData;
            valueSource = "nested";
            // FlowPlater.log(
            //   FlowPlater.logLevels.DEBUG,
            //   `[DataExtractor] Set primaryValue from nested children:`,
            //   { primaryValue },
            // );
          } else {
            // FlowPlater.log(
            //   FlowPlater.logLevels.DEBUG,
            //   `[DataExtractor] No child data found despite having children.`,
            // );
          }
        }

        // Fallback to text content ONLY if nothing else found
        if (primaryValue === null && !inputInfo) {
          let textContent = Array.from(element.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent)
            .join("")
            .trim();
          if (textContent !== "") {
            primaryValue = textContent;
            valueSource = "text";
          }
        }
      }
    }

    // Final type conversion
    if (
      primaryValue !== null &&
      (valueSource === "attribute" || valueSource === "text") &&
      typeof primaryValue === "string"
    ) {
      const num = Number(primaryValue);
      if (!isNaN(num) && primaryValue.trim() !== "") primaryValue = num;
    }

    // Restore check: Return null ONLY if absolutely nothing was found (no value, no suffixes, no input info)
    if (
      primaryValue === null &&
      Object.keys(suffixes).length === 0 &&
      !inputInfo
    ) {
      // Log the final return value for this element
      // FlowPlater.log(
      //   FlowPlater.logLevels.DEBUG,
      //   `[DataExtractor] _extractSingleElementData returning NULL for element:`,
      //   element,
      // );
      return null;
    }

    inputInfo = inputInfo || null; // Ensure inputInfo is explicitly null if not set

    // Log the final return value for this element
    // FlowPlater.log(
    //   FlowPlater.logLevels.DEBUG,
    //   `[DataExtractor] _extractSingleElementData returning for element:`,
    //   element,
    //   { returnValue: { primaryValue, suffixes, inputInfo } },
    // );

    return { primaryValue, suffixes, inputInfo };
  };

  const globalMethods = {
    /**
     * Process HTML string and extract data
     * @param {string} htmlToProcess - HTML string to process
     * @returns {Object} Extracted data as JSON
     */
    processHtml(htmlToProcess: string) {
      FlowPlater.trigger("dataExtractor:beforeProcess", document, {
        html: htmlToProcess,
      });

      try {
        const parser = new DOMParser();
        let parsedHtml = {};
        if (typeof htmlToProcess == "string") {
          FlowPlater.log(
            FlowPlater.logLevels.INFO,
            "Parsing HTML",
            htmlToProcess,
          );
          parsedHtml = parser.parseFromString(htmlToProcess, "text/html");
        } else {
          parsedHtml = htmlToProcess;
        }

        FlowPlater.log(
          FlowPlater.logLevels.INFO,
          "Extracting data from",
          (parsedHtml as any).body,
        );

        const result = instanceMethods.extractData((parsedHtml as any).body) || {};

        FlowPlater.log(FlowPlater.logLevels.INFO, "Extracted data", result);

        FlowPlater.trigger("dataExtractor:processed", document, {
          html: htmlToProcess,
          result,
        });

        return result;
      } catch (error) {
        FlowPlater.trigger("dataExtractor:error", document, {
          html: htmlToProcess,
          error,
        });
        throw error;
      }
    },
  };

  const instanceMethods = {
    /**
     * Extracts data from elements with fp-data within a given scope element.
     * @param {HTMLElement} scopeElement - The HTML element to extract data from.
     * @returns {Object} The aggregated extracted data as a JSON object.
     */
    extractData(scopeElement: HTMLElement) {
      const result: { [key: string]: any } = {};
      const seenPrimaryKeys = new Map<string, boolean>();
      const processedElements = new Set();
      const groupDataCollector = new Map(); // Re-introduce for Pass 2

      // --- Determine Root Elements based on Scope ---
      let rootElements;
      if (AttributeMatcher._hasAttribute(scopeElement, "data")) {
        // Case 1: Scope itself is the root fp-data element.
        rootElements = [scopeElement];
      } else {
        // Case 2: Scope does not have fp-data. Find top-level fp-data elements within it.
        const allFpDataDescendants = AttributeMatcher.findMatchingElements(
          "data",
          undefined,
          true,
          scopeElement,
          false, // Exclude scopeElement itself
        );

        rootElements = (allFpDataDescendants as HTMLElement[]).filter((el: HTMLElement) => {
          let parent = el.parentElement;
          while (parent && parent !== scopeElement) {
            if (AttributeMatcher._hasAttribute(parent, "data")) {
              return false; // Found intermediate fp-data parent
            }
            parent = parent.parentElement;
          }
          // Only return true if the loop stopped because parent is scopeElement
          return parent === scopeElement;
        });
      }

      // FlowPlater.log(
      //   FlowPlater.logLevels.DEBUG,
      //   "[DataExtractor] Root elements to check:",
      //   rootElements,
      // );

      // Helper function to recursively process nested group markers
      const processNestedGroups = (dataObject: any) => {
        if (typeof dataObject !== "object" || dataObject === null) {
          return; // Not an object or null, nothing to process
        }

        for (const key in dataObject) {
          if (dataObject.hasOwnProperty(key)) {
            const value = dataObject[key];
            if (
              Array.isArray(value) &&
              value.length > 0 &&
              value[0]?._isNestedGroupPart
            ) {
              // Found a nested group marker array
              // FlowPlater.log(
              //   FlowPlater.logLevels.DEBUG,
              //   `[DataExtractor] Found nested group marker array for key '${key}'`,
              //   value,
              // );
              const groupParts = value;
              const firstPart = groupParts[0];
              const inputType = firstPart.inputInfo.type;
              let groupValue = null;
              const aggregatedSuffixes: { [key: string]: any } = {};

              if (inputType === "radio") {
                const selectedPart = groupParts.find(
                  (part) => part.element.checked,
                );
                if (selectedPart) {
                  groupValue = selectedPart.inputInfo.valueAttr;
                  Object.assign(aggregatedSuffixes, selectedPart.suffixes);
                }
              } else if (inputType === "checkbox") {
                const selectedParts = groupParts.filter(
                  (part) => part.element.checked,
                );
                if (selectedParts.length > 0) {
                  groupValue = selectedParts.map(
                    (part) => part.inputInfo.valueAttr,
                  );
                  selectedParts.forEach((part) => {
                    for (const suffixKey in part.suffixes) {
                      if (!aggregatedSuffixes[suffixKey])
                        aggregatedSuffixes[suffixKey] = [];
                      aggregatedSuffixes[suffixKey].push(
                        part.suffixes[suffixKey],
                      );
                    }
                  });
                } else {
                  groupValue = []; // Empty array if none checked
                }
              }

              // Replace the marker array with the resolved value
              dataObject[key] = groupValue;
              // FlowPlater.log(
              //   FlowPlater.logLevels.DEBUG,
              //   `[DataExtractor] Resolved nested group '${key}' to value:`,
              //   groupValue,
              // );

              // Merge aggregated suffixes into the parent object
              for (const suffixKey in aggregatedSuffixes) {
                if (dataObject.hasOwnProperty(suffixKey)) {
                  // FlowPlater.log(
                  //   FlowPlater.logLevels.WARN,
                  //   `[DataExtractor] Suffix key '${suffixKey}' from nested group '${key}' conflicts with existing key. Overwriting.`,
                  // );
                }
                dataObject[suffixKey] = aggregatedSuffixes[suffixKey];
              }
            } else if (typeof value === "object") {
              // Recursively process nested objects
              processNestedGroups(value);
            }
          }
        }
      };

      // --- Single Pass: Extract and Process ---
      for (const element of rootElements) {
        if (processedElements.has(element)) continue;

        const primaryKey = AttributeMatcher._getRawAttribute(element, "data");
        const recursionProcessedSet = new Set();
        const extractedResult = _extractSingleElementData(
          element,
          recursionProcessedSet,
        );

        if (!extractedResult) {
          processedElements.add(element); // Mark even if null
          recursionProcessedSet.forEach((processedEl) =>
            processedElements.add(processedEl),
          );
          continue;
        }

        // Check ONLY if the element *itself* is a radio/checkbox input needing deferred processing
        const extractedInputIsGroup =
          extractedResult.inputInfo &&
          (extractedResult.inputInfo.type === "radio" ||
            extractedResult.inputInfo.type === "checkbox");

        if (extractedInputIsGroup && extractedResult.inputInfo?.name) {
          // Element is a standalone fp-data radio/checkbox
          const groupName = extractedResult.inputInfo.name;
          const inputType = extractedResult.inputInfo.type;
          const valueAttr = extractedResult.inputInfo.valueAttr;
          const isChecked = (element as HTMLInputElement).checked; // Check the element directly

          if (groupName) {
            // Redundant check, but safe
            if (!groupDataCollector.has(groupName)) {
              groupDataCollector.set(groupName, {
                // Use primaryKey from the input element itself if available, else null?
                primaryKey: primaryKey, // Key from this input element
                type: inputType,
                options: [],
              });
            }
            // Store data needed for Pass 2 resolution
            groupDataCollector.get(groupName).options.push({
              element: element, // The input element itself
              primaryKey: primaryKey, // Key from this input element
              valueAttr: valueAttr, // Value from the input
              suffixes: extractedResult.suffixes, // Suffixes from this input element
              isChecked: isChecked,
            });

            // Mark as processed for Pass 1, group resolved in Pass 2
            processedElements.add(element);
            recursionProcessedSet.forEach((processedEl) =>
              processedElements.add(processedEl),
            );
            continue; // Defer processing to Pass 2
          }
        }

        // Check if the element contains a radio/checkbox without its own fp-data
        const containedInput = element.querySelector(
          'input[type="radio"][name], input[type="checkbox"][name]',
        );
        if (
          containedInput &&
          !AttributeMatcher._hasAttribute(containedInput as HTMLElement, "data")
        ) {
          // This is the simple container case (e.g., <div fp-data="opt"><input name="c"></div>)
          const groupName = (containedInput as HTMLInputElement).name;
          const inputType = (containedInput as HTMLInputElement).type;
          const valueAttr = (containedInput as HTMLInputElement).value;
          const isChecked = (containedInput as HTMLInputElement).checked;

          if (!groupDataCollector.has(groupName)) {
            groupDataCollector.set(groupName, {
              // Use the container's primaryKey
              primaryKey: primaryKey,
              type: inputType,
              options: [],
            });
          }
          // Store data needed for Pass 2 resolution
          groupDataCollector.get(groupName).options.push({
            element: containedInput, // Store the actual input element
            primaryKey: primaryKey, // Key from container element
            valueAttr: valueAttr, // Value from the contained input
            suffixes: extractedResult.suffixes, // Suffixes from container element
            isChecked: isChecked,
          });

          // Mark as processed for Pass 1, group resolved in Pass 2
          processedElements.add(element);
          recursionProcessedSet.forEach((processedEl) =>
            processedElements.add(processedEl),
          );
          continue; // Defer processing to Pass 2
        }

        // --- Process ALL OTHER Elements Immediately ---
        let { primaryValue, suffixes, inputInfo } = extractedResult;

        // --- Process Nested Groups within primaryValue ---
        if (typeof primaryValue === "object" && primaryValue !== null) {
          processNestedGroups(primaryValue);
        }

        // --- Determine Final Value for the Root Element (NON-GROUP CASE) ---
        let finalValue: string | number | boolean | any[] | { [key: string]: any } | null = primaryValue;
        if (inputInfo && inputInfo.isInput) {
          // Note: This handles inputs directly on the root element itself (e.g., range, text),
          // It WON'T be radio/checkbox here due to the group check above.
          finalValue = getGroupedInputValue(element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement);
        }

        // --- Combine Final Value and Root Suffixes ---
        if (
          finalValue !== null &&
          finalValue !== undefined &&
          Object.keys(suffixes).length > 0
        ) {
          // Check if finalValue is already an object (likely from nested data)
          if (
            typeof finalValue === "object" &&
            !Array.isArray(finalValue) &&
            finalValue !== null
          ) {
            // Merge suffixes directly into the existing object
            Object.assign(finalValue, suffixes);
          } else {
            // Wrap scalar value or array with suffixes
            finalValue = { value: finalValue, ...suffixes };
          }
        } else if (Object.keys(suffixes).length > 0) {
          // Only suffixes exist for this root element
          finalValue = suffixes;
        }

        // FlowPlater.log(
        //   FlowPlater.logLevels.DEBUG,
        //   `[DataExtractor] Final values before assignment for root key '${primaryKey}'`,
        //   { primaryKey, finalValue, suffixes },
        // );

        // --- Assign/Merge into Final Result ---
        if (
          primaryKey !== null &&
          finalValue !== null &&
          finalValue !== undefined
        ) {
          if (seenPrimaryKeys.has(primaryKey)) {
            // Handle duplicate root keys (e.g., multiple products)
            if (!Array.isArray(result[primaryKey])) {
              result[primaryKey] = [result[primaryKey]];
            }
            result[primaryKey].push(finalValue);
          } else {
            seenPrimaryKeys.set(primaryKey, true);
            result[primaryKey] = finalValue;
          }
        } else if (
          finalValue !== null &&
          finalValue !== undefined &&
          typeof finalValue === "object"
        ) {
          // Root element has no key, merge its object content into the result
          Object.assign(result, finalValue);
        }

        // Mark element and its recursively processed children as done
        processedElements.add(element);
        recursionProcessedSet.forEach((processedEl) =>
          processedElements.add(processedEl),
        );
      }

      // --- Pass 2: Process Collected Groups ---
      // @ts-ignore
      for (const [groupName, groupData] of groupDataCollector.entries()) {
        const { primaryKey, type, options } = groupData;

        if (type === "radio") {
          const selectedOption = options.find((opt: any) => opt.isChecked);
          if (selectedOption) {
            // First, handle the primary value (option)
            let finalGroupValue = selectedOption.valueAttr;

            // Create a container for both option and associated data
            let combinedValue = { value: finalGroupValue };

            // Merge all suffixes from the selected option
            Object.assign(combinedValue, selectedOption.suffixes);

            // Assign to result using the primaryKey from the group
            if (primaryKey) {
              if (result.hasOwnProperty(primaryKey)) {
                if (!Array.isArray(result[primaryKey])) {
                  result[primaryKey] = [result[primaryKey]];
                }
                result[primaryKey].push(combinedValue);
              } else {
                result[primaryKey] = combinedValue;
              }
            }
          }
        } else if (type === "checkbox") {
          // Get all checked options
          const selectedOptions = options.filter((opt: any) => opt.isChecked);

          if (selectedOptions.length > 0) {
            // Collect all values and their associated data
            const values = selectedOptions.map((opt: any) => opt.valueAttr);
            const suffixCollector: { [key: string]: any[] } = {};

            // Collect and merge suffixes from all selected options
            selectedOptions.forEach((opt: any) => {
              Object.entries(opt.suffixes).forEach(([key, value]) => {
                if (!suffixCollector[key]) {
                  suffixCollector[key] = [];
                }
                suffixCollector[key].push(value);
              });
            });

            // Create the combined result
            let combinedValue = { value: values };
            Object.assign(combinedValue, suffixCollector);

            // Assign to result using the primaryKey from the group
            if (primaryKey) {
              if (result.hasOwnProperty(primaryKey)) {
                if (!Array.isArray(result[primaryKey])) {
                  result[primaryKey] = [result[primaryKey]];
                }
                result[primaryKey].push(combinedValue);
              } else {
                result[primaryKey] = combinedValue;
              }
            }
          } else {
            // If no options selected, still create an empty array
            if (primaryKey) {
              result[primaryKey] = { value: [] };
            }
          }
        }
      }

      return result;
    },

    /**
     * Sets up observation for a data element
     * @param {HTMLElement} element - The element to observe
     * @param {string} localVarName - The local variable name to update
     * @param {Object} instance - The instance to update
     */
    // @ts-ignore
    observeDataElement(element: HTMLElement, localVarName: string, instance: any) {
      const observer = new MutationObserver(() => {
        const key = AttributeMatcher._getRawAttribute(element, "data");
        if (key) {
          const extracted = _extractSingleElementData(element);
          if (extracted) {
            // Update the instance data - the instance will handle storage
            instance.updateData(key, extracted.primaryValue);
          }
        }
      });

      // Observe changes to attributes and content
      observer.observe(element, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      });

      // Store observer on the instance for cleanup
      if (!instance._observers) {
        instance._observers = new Set();
      }
      instance._observers.add(observer);
    },
  };

  const hooks = {
    /**
     * Called after FlowPlater has fully initialized
     * @param {Object} flowplater - The full FlowPlater object
     * @param {Array} instances - An array of all instances that were created
     * @returns {Object} The FlowPlater object
     */
    initComplete: function (flowplater: FlowPlaterObj) {
      if (config.enabled && config.settings.debug) {
        FlowPlater.log(
          FlowPlater.logLevels.INFO,
          `${config.name} plugin initialized`,
        );
      }
      return flowplater;
    },
  };

  const transformers = {
    /**
     * Transform an HTMX response after it's received
     * This runs at the start of the transformResponse in the HTMX extension
     *
     * @param {Object} instance - The FlowPlater instance that made the request
     * @param {Object} response - The HTMX response object
     * @param {string} dataType - The type of data being transformed ("html", "xml", or "json")
     * @returns {Object} The modified response object
     */
    transformResponse: function (instance: any, response: any, dataType: string) {
      FlowPlater.log(
        FlowPlater.logLevels.DEBUG,
        `[DataExtractor] transformResponse called with:`,
        { instance, response, dataType },
      );

      if (response && dataType === "html") {
        if (instance) {
          FlowPlater.log(
            FlowPlater.logLevels.DEBUG,
            `[DataExtractor] Instance details:`,
            {
              instanceName: instance.instanceName,
              hasElements: !!instance.elements,
              elements: instance.elements,
              hasExtractData: instance.elements
                ? Array.from(instance.elements as HTMLElement[]).some((el) =>
                    AttributeMatcher._hasAttribute(el, "extract-data"),
                  )
                : false,
            },
          );
        }

        if (
          instance.elements &&
          Array.from(instance.elements as HTMLElement[]).some((el) =>
            AttributeMatcher._hasAttribute(el, "extract-data"),
          )
        ) {
          const element = Array.from(instance.elements as HTMLElement[]).find((el) =>
            AttributeMatcher._hasAttribute(el, "extract-data"),
          );

          FlowPlater.log(
            FlowPlater.logLevels.DEBUG,
            `[DataExtractor] Found extract-data attribute on instance element:`,
            element,
          );

          FlowPlater.trigger("dataExtractor:beforeTransform", element as HTMLElement, {
            response,
            dataType,
          });

          try {
            FlowPlater.log(
              FlowPlater.logLevels.DEBUG,
              `[DataExtractor] Processing HTML response:`,
              response,
            );

            const result = globalMethods.processHtml(response);

            FlowPlater.log(
              FlowPlater.logLevels.DEBUG,
              `[DataExtractor] Extracted data result:`,
              result,
            );

            FlowPlater.trigger("dataExtractor:transformed", element, {
              response,
              result,
            });

            // Return a stringified version of the data
            return JSON.stringify(result);
          } catch (error) {
            FlowPlater.log(
              FlowPlater.logLevels.ERROR,
              `[DataExtractor] Error during transformation:`,
              error,
            );

            FlowPlater.trigger("dataExtractor:transformError", element, {
              response,
              error,
            });
            throw error;
          }
        } else {
          FlowPlater.log(
            FlowPlater.logLevels.DEBUG,
            `[DataExtractor] Skipping data extraction:`,
            instance
              ? instance.elements
                ? "No extract-data attribute found"
                : "No instance elements"
              : "No instance object",
          );
        }
      } else {
        FlowPlater.log(
          FlowPlater.logLevels.DEBUG,
          `[DataExtractor] Skipping data extraction:`,
          !response ? "No response" : `Invalid data type: ${dataType}`,
        );
      }
      return response;
    },
  };

  return {
    config,
    state,
    globalMethods,
    instanceMethods,
    hooks,
    transformers,
  };
};

export default DataExtractorPlugin;
