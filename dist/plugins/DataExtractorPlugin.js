var DataExtractorPlugin = (function () {
    'use strict';

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

    const AttributeMatcher = {
        INHERITABLE_ATTRIBUTES: {
            "hx-": [
                "boost",
                "push-url",
                "select",
                "select-oob",
                "swap",
                "target",
                "vals",
                "confirm",
                "disable",
                "disabled-elt",
                "encoding",
                "ext",
                "headers",
                "include",
                "indicator",
                "params",
                "prompt",
                "replace-url",
                "request",
                "sync",
                "vars",
            ],
            "fp-": ["prepend", "append", "persist", "target"],
        },
        _prefixes() {
            return Object.keys(this.INHERITABLE_ATTRIBUTES);
        },
        _normalizeAttributeName(attributeName) {
            // Remove any existing prefix
            return attributeName.replace(/^(hx-|fp-)/, "").replace(/^data-/, "");
        },
        /**
         * Gets all possible attribute names for a given attribute
         * @private
         * @param {string} attributeName - The base attribute name
         * @returns {string[]} Array of all possible attribute names
         */
        _getAllAttributeNames(attributeName) {
            const normalizedName = this._normalizeAttributeName(attributeName);
            const names = [];
            for (const prefix of this._prefixes()) {
                names.push(`${prefix}${normalizedName}`);
                names.push(`data-${prefix}${normalizedName}`);
            }
            return names;
        },
        /**
         * Gets the raw attribute value, checking all possible attribute names
         * @private
         * @param {Element} element - The element to check
         * @param {string} name - The attribute name
         * @returns {string|null} The attribute value or null if not found
         */
        _getRawAttribute(element, name, defaultValue = null) {
            for (const attrName of this._getAllAttributeNames(name)) {
                const value = element.getAttribute(attrName);
                if (value !== null) {
                    return value;
                }
            }
            return defaultValue;
        },
        /**
         * Checks if an element has an attribute, checking all possible attribute names
         * @private
         * @param {Element} element - The element to check
         * @param {string} name - The attribute name
         * @returns {boolean} Whether the element has the attribute
         */
        _hasAttribute(element, name) {
            return this._getAllAttributeNames(name).some((attrName) => element.hasAttribute(attrName));
        },
        /**
         * Finds elements with a given attribute and optional value
         * @param {string} attributeName - The attribute to look for
         * @param {string} [value] - Optional value to match
         * @param {boolean} [exactMatch=true] - Whether to match the value exactly or just include it
         * @param {Element} [element=document] - The element to search within
         * @param {boolean} [includeSelf=true] - Whether to include the element itself in the search
         * @param {boolean} [getFirst=false] - Whether to return the first matching element or all matching elements
         * @returns {Element[]|Element|null} Array of elements if no value specified, first matching element if value specified
         */
        findMatchingElements(attributeName, value = null, exactMatch = true, element = document, includeSelf = true, getFirst = false) {
            const attrNames = this._getAllAttributeNames(attributeName);
            let selector = attrNames.map((name) => `[${name}]`).join(",");
            if (value !== undefined && value !== null) {
                const valueSelector = exactMatch ? `="${value}"` : `*="${value}"`;
                selector = attrNames.map((name) => `[${name}${valueSelector}]`).join(",");
            }
            const results = Array.from(element.querySelectorAll(selector));
            if (includeSelf && element instanceof Element) {
                const selfValue = this._getRawAttribute(element, attributeName);
                if (selfValue !== null) {
                    if (value === undefined ||
                        value === null ||
                        (exactMatch ? selfValue === value : selfValue.includes(value))) {
                        results.unshift(element);
                    }
                }
            }
            return value !== undefined && value !== null
                ? getFirst
                    ? results[0]
                    : results
                : results;
        },
        findClosestParent(attributeName, element, value = null, exactMatch = true) {
            if (!attributeName) {
                Debug.error("Attribute name is required");
                return null;
            }
            if (!element) {
                Debug.error("Element is required to find closest parent (" + attributeName + ")");
                return null;
            }
            const normalizedName = this._normalizeAttributeName(attributeName);
            const attrNames = this._getAllAttributeNames(normalizedName);
            let selector = attrNames.map((name) => `[${name}]`).join(",");
            if (value !== undefined && value !== null) {
                const valueSelector = exactMatch ? `="${value}"` : `*="${value}"`;
                selector = attrNames.map((name) => `[${name}${valueSelector}]`).join(",");
            }
            let closestElement = element.closest(selector);
            // check if there is no disinherit attribute on the closest element
            if (closestElement && this.isInheritable(normalizedName)) {
                const disinherit = this._getRawAttribute(closestElement, "disinherit");
                if (disinherit &&
                    (disinherit === "*" || disinherit.split(" ").includes(normalizedName))) {
                    return null;
                }
            }
            return closestElement;
        },
        /**
         * Gets the first element with a given attribute
         * @param {string} attributeName - The attribute to look for
         * @param {Element} [element=document] - The element to search within
         * @param {boolean} [includeSelf=true] - Whether to include the element itself in the search
         * @returns {Element|null} The first element with the attribute or null if none found
         */
        getElementWithAttribute(attributeName, element = document, includeSelf = true) {
            if (includeSelf &&
                element instanceof Element &&
                this._hasAttribute(element, attributeName)) {
                return element;
            }
            const selectors = this._getAllAttributeNames(attributeName)
                .map((name) => `[${name}]`)
                .join(",");
            return element.querySelector(selectors);
        },
        /**
         * Gets the parent element, handling Shadow DOM
         * @private
         * @param {Node} element - The element to get the parent of
         * @returns {Node|null} The parent element or null if none
         */
        _parentElement(element) {
            const parent = element.parentElement;
            if (!parent && element.parentNode instanceof ShadowRoot) {
                return element.parentNode;
            }
            return parent;
        },
        /**
         * Gets the root node of an element, handling Shadow DOM
         * @private
         * @param {HTMLElement} element - The element to get the root of
         * @param {boolean} [composed=false] - Whether to get the composed root
         * @returns {Node} The root node
         */
        _getRootNode(element, composed = false) {
            return element.getRootNode ? element.getRootNode({ composed }) : document;
        },
        /**
         * Finds the closest element matching a condition
         * @private
         * @param {Node} element - The element to start from
         * @param {function(Node): boolean} condition - The condition to match
         * @returns {Node|null} The closest matching element or null if none
         */
        _getClosestMatch(element, condition) {
            while (element && !condition(element)) {
                element = this._parentElement(element);
            }
            return element || null;
        },
        _attributeMatchesNormalizedName(attributeName, normalizedName) {
            // Remove any existing prefix
            const name = attributeName
                .replace(/^data-/, "")
                .replace(/^hx-/, "")
                .replace(/^fp-/, "");
            return name === normalizedName;
        },
        /**
         * Gets an attribute value with inheritance and disinheritance
         * @private
         * @param {Element} startElement - The element to start from
         * @param {Element} ancestor - The ancestor element to check
         * @param {string} attributeName - The attribute name
         * @returns {string|null} The attribute value or null if not found
         */
        _getAttributeValueWithInheritance(startElement, ancestor, attributeName) {
            const attributeValue = this._getRawAttribute(ancestor, attributeName);
            const disinherit = this._getRawAttribute(ancestor, "disinherit");
            const inherit = this._getRawAttribute(ancestor, "inherit");
            if (startElement !== ancestor) {
                if (htmx.config.disableInheritance) {
                    if (inherit &&
                        (inherit === "*" || inherit.split(" ").includes(attributeName))) {
                        return attributeValue;
                    }
                    return null;
                }
                if (disinherit &&
                    (disinherit === "*" || disinherit.split(" ").includes(attributeName))) {
                    return "unset";
                }
            }
            return attributeValue;
        },
        /**
         * Finds the value of an inheritable attribute
         * @param {HTMLElement} element - The element to start searching from
         * @param {string} attributeName - The name of the attribute to find
         * @returns {string|null} The attribute value or null if not found
         */
        findInheritedAttribute(element, attributeName) {
            const normalizedName = this._normalizeAttributeName(attributeName);
            let closestValue = null;
            this._getClosestMatch(element, (ancestor) => {
                const value = this._getAttributeValueWithInheritance(element, ancestor, normalizedName);
                if (value) {
                    closestValue = value;
                    return true;
                }
                return false;
            });
            return closestValue === "unset" ? null : closestValue;
        },
        findAttribute(element, attributeName) {
            const normalizedName = this._normalizeAttributeName(attributeName);
            // First check direct attributes
            for (const prefix of this._prefixes()) {
                const value = this._getRawAttribute(element, `${prefix}${normalizedName}`);
                if (value) {
                    return value;
                }
            }
            // Then check inherited attributes
            return this.findInheritedAttribute(element, normalizedName) || null;
        },
        _validateAttributeName(attributeName) {
            if (!attributeName) {
                Debug.error("Attribute name is required");
                return false;
            }
            const isInheritable = this.isInheritable(attributeName);
            if (!isInheritable) {
                Debug.info(`Attribute ${attributeName} is not inheritable`);
                return false;
            }
            return true;
        },
        /**
         * Adds an inheritable attribute to the list
         * @param {string} prefix - The prefix to use (hx- or fp-)
         * @param {string} attributeName - The name of the attribute to add
         */
        addInheritableAttribute(prefix, attributeName) {
            if (!this.INHERITABLE_ATTRIBUTES[prefix]) {
                this.INHERITABLE_ATTRIBUTES[prefix] = [];
            }
            this.INHERITABLE_ATTRIBUTES[prefix].push(attributeName);
        },
        /**
         * Removes an inheritable attribute from the list
         * @param {string} prefix - The prefix to use (hx- or fp-)
         * @param {string} attributeName - The name of the attribute to remove
         * @returns {boolean} True if the attribute was removed, false if it wasn't found
         */
        removeInheritableAttribute(prefix, attributeName) {
            if (!this.INHERITABLE_ATTRIBUTES[prefix]) {
                return false;
            }
            const index = this.INHERITABLE_ATTRIBUTES[prefix].indexOf(attributeName);
            if (index === -1) {
                return false;
            }
            this.INHERITABLE_ATTRIBUTES[prefix].splice(index, 1);
            return true;
        },
        isInheritable(attributeName) {
            const normalizedName = this._normalizeAttributeName(attributeName);
            return Object.values(this.INHERITABLE_ATTRIBUTES)
                .flat()
                .includes(normalizedName);
        },
    };

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
    function getGroupedInputValue(element) {
        const name = element.name;
        const type = element.type;
        // Get the root node (document or shadow root) to search within
        const rootNode = element.getRootNode ? element.getRootNode() : document;
        if (type === "radio" && name) {
            // Search within the root node for the checked radio with the same name
            const checkedRadio = rootNode.querySelector(`input[type="radio"][name="${CSS.escape(name)}"]:checked`);
            return checkedRadio ? checkedRadio.value : null;
        }
        if (type === "checkbox" && name) {
            // Search within the root node for checkboxes with the same name
            const checkboxes = rootNode.querySelectorAll(`input[type="checkbox"][name="${CSS.escape(name)}"]`);
            if (checkboxes.length > 1) {
                // Handle checkbox group
                const checkedValues = Array.from(checkboxes)
                    .filter((cb) => cb.checked)
                    .map((cb) => cb.value);
                return checkedValues;
            }
            else {
                // Handle single checkbox
                return element.checked;
            }
        }
        if (element.tagName === "SELECT" && element.multiple) {
            const selectedOptions = Array.from(element.selectedOptions).map((option) => option.value);
            return selectedOptions;
        }
        // Default case for single select, text inputs, textareas, etc.
        return element.value;
    }

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
        const _extractSingleElementData = (element, processedElements = new Set()) => {
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
            let primaryValue = null;
            let valueSource = null;
            const suffixes = {};
            let inputInfo = null;
            // 1. Extract Suffixes first
            const suffixPrefix = "fp-data-";
            const dataSuffixPrefix = "data-fp-data-";
            for (const attr of element.attributes) {
                let suffixKey = null;
                if (attr.name.startsWith(suffixPrefix)) {
                    suffixKey = attr.name.substring(suffixPrefix.length);
                }
                else if (attr.name.startsWith(dataSuffixPrefix)) {
                    suffixKey = attr.name.substring(dataSuffixPrefix.length);
                }
                if (suffixKey && suffixKey !== "value") {
                    let suffixValue = attr.value;
                    const num = Number(suffixValue);
                    if (!isNaN(num) && suffixValue.trim() !== "")
                        suffixValue = num;
                    suffixes[suffixKey] = suffixValue;
                }
            }
            // 2. Determine Primary Value (Priority: explicit > input > specific tag > nested > text)
            const explicitValue = AttributeMatcher._getRawAttribute(element, "data-value", null);
            if (explicitValue !== null) {
                primaryValue = explicitValue;
                valueSource = "attribute";
            }
            else {
                // Check for input info FIRST - ONLY if the element *itself* is an input
                let inputElement = null;
                if (["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName)) {
                    inputElement = element;
                }
                if (inputElement) {
                    inputInfo = {
                        isInput: true,
                        type: inputElement.type,
                        name: inputElement.name || null,
                        valueAttr: inputElement.value, // Get value attribute directly
                    };
                }
                // If no explicit value AND no input found, check specific tags
                if (primaryValue === null && !inputInfo) {
                    switch (element.tagName) {
                        case "IMG":
                            primaryValue = {
                                src: element.src,
                                alt: element.alt,
                                width: element.width,
                                height: element.height,
                            };
                            valueSource = "object";
                            break;
                        case "VIDEO":
                        case "AUDIO":
                            const sources = Array.from(element.querySelectorAll("source")).map((s) => ({ src: s.src, type: s.type }));
                            primaryValue = { src: element.src, sources: sources };
                            valueSource = "object";
                            break;
                        case "A":
                        case "BUTTON":
                            primaryValue = {
                                href: element.href,
                                text: element.textContent?.trim() || "",
                                target: element.target,
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
                    const allDescendantsWithData = AttributeMatcher.findMatchingElements("data", undefined, true, element, false); // includeSelf = false
                    // Filter to find only direct children in the fp-data hierarchy
                    const directFpDataChildren = allDescendantsWithData.filter((child) => {
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
                        const childData = {};
                        let hasChildData = false;
                        const nestedGroupParts = {}; // Temp storage for group parts keyed by childKey
                        for (const child of directFpDataChildren) {
                            const childKey = AttributeMatcher._getRawAttribute(child, "data");
                            const nestedResult = _extractSingleElementData(child, processedElements);
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
                                if (nestedResult.inputInfo &&
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
                                }
                                else if (childKey !== null) {
                                    // It's regular nested data
                                    let nestedValue = nestedResult.primaryValue;
                                    // Combine child's value and suffixes before assigning
                                    if (nestedValue !== null &&
                                        Object.keys(nestedResult.suffixes).length > 0) {
                                        if (typeof nestedValue === "object" &&
                                            !Array.isArray(nestedValue) &&
                                            nestedValue !== null) {
                                            Object.assign(nestedValue, nestedResult.suffixes);
                                        }
                                        else {
                                            nestedValue = {
                                                value: nestedValue,
                                                ...nestedResult.suffixes,
                                            };
                                        }
                                    }
                                    else if (Object.keys(nestedResult.suffixes).length > 0) {
                                        nestedValue = nestedResult.suffixes;
                                    }
                                    if (childData.hasOwnProperty(childKey)) {
                                        if (!Array.isArray(childData[childKey]))
                                            childData[childKey] = [childData[childKey]];
                                        childData[childKey].push(nestedValue);
                                    }
                                    else {
                                        childData[childKey] = nestedValue;
                                    }
                                }
                                else if (childKey === null &&
                                    Object.keys(nestedResult.suffixes).length > 0) {
                                    // Suffixes from a keyless child - merge directly
                                    Object.assign(childData, nestedResult.suffixes);
                                }
                            }
                        }
                        // After checking all children, add collected group parts to childData
                        // FlowPlater.log(
                        //   FlowPlater.logLevels.DEBUG,
                        //   `[DataExtractor] Finished processing children. hasChildData=${hasChildData}`,
                        // );
                        for (const key in nestedGroupParts) {
                            if (childData.hasOwnProperty(key)) {
                                FlowPlater.log(FlowPlater.logLevels.WARN, `[DataExtractor] Nested key '${key}' conflicts between regular data and a nested input group. Group data will overwrite.`);
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
            if (primaryValue !== null &&
                (valueSource === "attribute" || valueSource === "text") &&
                typeof primaryValue === "string") {
                const num = Number(primaryValue);
                if (!isNaN(num) && primaryValue.trim() !== "")
                    primaryValue = num;
            }
            // Restore check: Return null ONLY if absolutely nothing was found (no value, no suffixes, no input info)
            if (primaryValue === null &&
                Object.keys(suffixes).length === 0 &&
                !inputInfo) {
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
            processHtml(htmlToProcess) {
                FlowPlater.trigger("dataExtractor:beforeProcess", document, {
                    html: htmlToProcess,
                });
                try {
                    const parser = new DOMParser();
                    let parsedHtml = {};
                    if (typeof htmlToProcess == "string") {
                        FlowPlater.log(FlowPlater.logLevels.INFO, "Parsing HTML", htmlToProcess);
                        parsedHtml = parser.parseFromString(htmlToProcess, "text/html");
                    }
                    else {
                        parsedHtml = htmlToProcess;
                    }
                    FlowPlater.log(FlowPlater.logLevels.INFO, "Extracting data from", parsedHtml.body);
                    const result = instanceMethods.extractData(parsedHtml.body) || {};
                    FlowPlater.log(FlowPlater.logLevels.INFO, "Extracted data", result);
                    FlowPlater.trigger("dataExtractor:processed", document, {
                        html: htmlToProcess,
                        result,
                    });
                    return result;
                }
                catch (error) {
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
            extractData(scopeElement) {
                const result = {};
                const seenPrimaryKeys = new Map();
                const processedElements = new Set();
                const groupDataCollector = new Map(); // Re-introduce for Pass 2
                // --- Determine Root Elements based on Scope ---
                let rootElements;
                if (AttributeMatcher._hasAttribute(scopeElement, "data")) {
                    // Case 1: Scope itself is the root fp-data element.
                    rootElements = [scopeElement];
                }
                else {
                    // Case 2: Scope does not have fp-data. Find top-level fp-data elements within it.
                    const allFpDataDescendants = AttributeMatcher.findMatchingElements("data", undefined, true, scopeElement, false);
                    rootElements = allFpDataDescendants.filter((el) => {
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
                const processNestedGroups = (dataObject) => {
                    if (typeof dataObject !== "object" || dataObject === null) {
                        return; // Not an object or null, nothing to process
                    }
                    for (const key in dataObject) {
                        if (dataObject.hasOwnProperty(key)) {
                            const value = dataObject[key];
                            if (Array.isArray(value) &&
                                value.length > 0 &&
                                value[0]?._isNestedGroupPart) {
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
                                const aggregatedSuffixes = {};
                                if (inputType === "radio") {
                                    const selectedPart = groupParts.find((part) => part.element.checked);
                                    if (selectedPart) {
                                        groupValue = selectedPart.inputInfo.valueAttr;
                                        Object.assign(aggregatedSuffixes, selectedPart.suffixes);
                                    }
                                }
                                else if (inputType === "checkbox") {
                                    const selectedParts = groupParts.filter((part) => part.element.checked);
                                    if (selectedParts.length > 0) {
                                        groupValue = selectedParts.map((part) => part.inputInfo.valueAttr);
                                        selectedParts.forEach((part) => {
                                            for (const suffixKey in part.suffixes) {
                                                if (!aggregatedSuffixes[suffixKey])
                                                    aggregatedSuffixes[suffixKey] = [];
                                                aggregatedSuffixes[suffixKey].push(part.suffixes[suffixKey]);
                                            }
                                        });
                                    }
                                    else {
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
                                    if (dataObject.hasOwnProperty(suffixKey)) ;
                                    dataObject[suffixKey] = aggregatedSuffixes[suffixKey];
                                }
                            }
                            else if (typeof value === "object") {
                                // Recursively process nested objects
                                processNestedGroups(value);
                            }
                        }
                    }
                };
                // --- Single Pass: Extract and Process ---
                for (const element of rootElements) {
                    if (processedElements.has(element))
                        continue;
                    const primaryKey = AttributeMatcher._getRawAttribute(element, "data");
                    const recursionProcessedSet = new Set();
                    const extractedResult = _extractSingleElementData(element, recursionProcessedSet);
                    if (!extractedResult) {
                        processedElements.add(element); // Mark even if null
                        recursionProcessedSet.forEach((processedEl) => processedElements.add(processedEl));
                        continue;
                    }
                    // Check ONLY if the element *itself* is a radio/checkbox input needing deferred processing
                    const extractedInputIsGroup = extractedResult.inputInfo &&
                        (extractedResult.inputInfo.type === "radio" ||
                            extractedResult.inputInfo.type === "checkbox");
                    if (extractedInputIsGroup && extractedResult.inputInfo?.name) {
                        // Element is a standalone fp-data radio/checkbox
                        const groupName = extractedResult.inputInfo.name;
                        const inputType = extractedResult.inputInfo.type;
                        const valueAttr = extractedResult.inputInfo.valueAttr;
                        const isChecked = element.checked; // Check the element directly
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
                            recursionProcessedSet.forEach((processedEl) => processedElements.add(processedEl));
                            continue; // Defer processing to Pass 2
                        }
                    }
                    // Check if the element contains a radio/checkbox without its own fp-data
                    const containedInput = element.querySelector('input[type="radio"][name], input[type="checkbox"][name]');
                    if (containedInput &&
                        !AttributeMatcher._hasAttribute(containedInput, "data")) {
                        // This is the simple container case (e.g., <div fp-data="opt"><input name="c"></div>)
                        const groupName = containedInput.name;
                        const inputType = containedInput.type;
                        const valueAttr = containedInput.value;
                        const isChecked = containedInput.checked;
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
                        recursionProcessedSet.forEach((processedEl) => processedElements.add(processedEl));
                        continue; // Defer processing to Pass 2
                    }
                    // --- Process ALL OTHER Elements Immediately ---
                    let { primaryValue, suffixes, inputInfo } = extractedResult;
                    // --- Process Nested Groups within primaryValue ---
                    if (typeof primaryValue === "object" && primaryValue !== null) {
                        processNestedGroups(primaryValue);
                    }
                    // --- Determine Final Value for the Root Element (NON-GROUP CASE) ---
                    let finalValue = primaryValue;
                    if (inputInfo && inputInfo.isInput) {
                        // Note: This handles inputs directly on the root element itself (e.g., range, text),
                        // It WON'T be radio/checkbox here due to the group check above.
                        finalValue = getGroupedInputValue(element);
                    }
                    // --- Combine Final Value and Root Suffixes ---
                    if (finalValue !== null &&
                        finalValue !== undefined &&
                        Object.keys(suffixes).length > 0) {
                        // Check if finalValue is already an object (likely from nested data)
                        if (typeof finalValue === "object" &&
                            !Array.isArray(finalValue) &&
                            finalValue !== null) {
                            // Merge suffixes directly into the existing object
                            Object.assign(finalValue, suffixes);
                        }
                        else {
                            // Wrap scalar value or array with suffixes
                            finalValue = { value: finalValue, ...suffixes };
                        }
                    }
                    else if (Object.keys(suffixes).length > 0) {
                        // Only suffixes exist for this root element
                        finalValue = suffixes;
                    }
                    // FlowPlater.log(
                    //   FlowPlater.logLevels.DEBUG,
                    //   `[DataExtractor] Final values before assignment for root key '${primaryKey}'`,
                    //   { primaryKey, finalValue, suffixes },
                    // );
                    // --- Assign/Merge into Final Result ---
                    if (primaryKey !== null &&
                        finalValue !== null &&
                        finalValue !== undefined) {
                        if (seenPrimaryKeys.has(primaryKey)) {
                            // Handle duplicate root keys (e.g., multiple products)
                            if (!Array.isArray(result[primaryKey])) {
                                result[primaryKey] = [result[primaryKey]];
                            }
                            result[primaryKey].push(finalValue);
                        }
                        else {
                            seenPrimaryKeys.set(primaryKey, true);
                            result[primaryKey] = finalValue;
                        }
                    }
                    else if (finalValue !== null &&
                        finalValue !== undefined &&
                        typeof finalValue === "object") {
                        // Root element has no key, merge its object content into the result
                        Object.assign(result, finalValue);
                    }
                    // Mark element and its recursively processed children as done
                    processedElements.add(element);
                    recursionProcessedSet.forEach((processedEl) => processedElements.add(processedEl));
                }
                // --- Pass 2: Process Collected Groups ---
                for (const [groupName, groupData] of groupDataCollector.entries()) {
                    const { primaryKey, type, options } = groupData;
                    if (type === "radio") {
                        const selectedOption = options.find((opt) => opt.isChecked);
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
                                }
                                else {
                                    result[primaryKey] = combinedValue;
                                }
                            }
                        }
                    }
                    else if (type === "checkbox") {
                        // Get all checked options
                        const selectedOptions = options.filter((opt) => opt.isChecked);
                        if (selectedOptions.length > 0) {
                            // Collect all values and their associated data
                            const values = selectedOptions.map((opt) => opt.valueAttr);
                            const suffixCollector = {};
                            // Collect and merge suffixes from all selected options
                            selectedOptions.forEach((opt) => {
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
                                }
                                else {
                                    result[primaryKey] = combinedValue;
                                }
                            }
                        }
                        else {
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
            observeDataElement(element, localVarName, instance) {
                const observer = new MutationObserver((mutations) => {
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
            initComplete: function (flowplater, instances) {
                if (config.enabled && config.settings.debug) {
                    FlowPlater.log(FlowPlater.logLevels.INFO, `${config.name} plugin initialized`);
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
            transformResponse: function (instance, response, dataType) {
                FlowPlater.log(FlowPlater.logLevels.DEBUG, `[DataExtractor] transformResponse called with:`, { instance, response, dataType });
                if (response && dataType === "html") {
                    if (instance) {
                        FlowPlater.log(FlowPlater.logLevels.DEBUG, `[DataExtractor] Instance details:`, {
                            instanceName: instance.instanceName,
                            hasElements: !!instance.elements,
                            elements: instance.elements,
                            hasExtractData: instance.elements
                                ? Array.from(instance.elements).some((el) => AttributeMatcher._hasAttribute(el, "extract-data"))
                                : false,
                        });
                    }
                    if (instance.elements &&
                        Array.from(instance.elements).some((el) => AttributeMatcher._hasAttribute(el, "extract-data"))) {
                        const element = Array.from(instance.elements).find((el) => AttributeMatcher._hasAttribute(el, "extract-data"));
                        FlowPlater.log(FlowPlater.logLevels.DEBUG, `[DataExtractor] Found extract-data attribute on instance element:`, element);
                        FlowPlater.trigger("dataExtractor:beforeTransform", element, {
                            response,
                            dataType,
                        });
                        try {
                            FlowPlater.log(FlowPlater.logLevels.DEBUG, `[DataExtractor] Processing HTML response:`, response);
                            const result = globalMethods.processHtml(response);
                            FlowPlater.log(FlowPlater.logLevels.DEBUG, `[DataExtractor] Extracted data result:`, result);
                            FlowPlater.trigger("dataExtractor:transformed", element, {
                                response,
                                result,
                            });
                            // Return a stringified version of the data
                            return JSON.stringify(result);
                        }
                        catch (error) {
                            FlowPlater.log(FlowPlater.logLevels.ERROR, `[DataExtractor] Error during transformation:`, error);
                            FlowPlater.trigger("dataExtractor:transformError", element, {
                                response,
                                error,
                            });
                            throw error;
                        }
                    }
                    else {
                        FlowPlater.log(FlowPlater.logLevels.DEBUG, `[DataExtractor] Skipping data extraction:`, instance
                            ? instance.elements
                                ? "No extract-data attribute found"
                                : "No instance elements"
                            : "No instance object");
                    }
                }
                else {
                    FlowPlater.log(FlowPlater.logLevels.DEBUG, `[DataExtractor] Skipping data extraction:`, !response ? "No response" : `Invalid data type: ${dataType}`);
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

    return DataExtractorPlugin;

})();
