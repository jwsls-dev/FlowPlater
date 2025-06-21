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
            return attributeName.replace(/^(hx-|fp-)/, "").replace(/^data-/, "");
        },
        _getAllAttributeNames(attributeName) {
            const normalizedName = this._normalizeAttributeName(attributeName);
            const names = [];
            for (const prefix of this._prefixes()) {
                names.push(`${prefix}${normalizedName}`);
                names.push(`data-${prefix}${normalizedName}`);
            }
            return names;
        },
        _getRawAttribute(element, name, defaultValue = null) {
            for (const attrName of this._getAllAttributeNames(name)) {
                const value = element.getAttribute(attrName);
                if (value !== null) {
                    return value;
                }
            }
            return defaultValue;
        },
        _hasAttribute(element, name) {
            return this._getAllAttributeNames(name).some((attrName) => element.hasAttribute(attrName));
        },
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
            if (closestElement && this.isInheritable(normalizedName)) {
                const disinherit = this._getRawAttribute(closestElement, "disinherit");
                if (disinherit &&
                    (disinherit === "*" || disinherit.split(" ").includes(normalizedName))) {
                    return null;
                }
            }
            return closestElement;
        },
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
        _parentElement(element) {
            const parent = element.parentElement;
            if (!parent && element.parentNode instanceof ShadowRoot) {
                return element.parentNode;
            }
            return parent;
        },
        _getRootNode(element, composed = false) {
            return element.getRootNode ? element.getRootNode({ composed }) : document;
        },
        _getClosestMatch(element, condition) {
            while (element && !condition(element)) {
                element = this._parentElement(element);
            }
            return element || null;
        },
        _attributeMatchesNormalizedName(attributeName, normalizedName) {
            const name = attributeName
                .replace(/^data-/, "")
                .replace(/^hx-/, "")
                .replace(/^fp-/, "");
            return name === normalizedName;
        },
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
            for (const prefix of this._prefixes()) {
                const value = this._getRawAttribute(element, `${prefix}${normalizedName}`);
                if (value) {
                    return value;
                }
            }
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
        addInheritableAttribute(prefix, attributeName) {
            if (!this.INHERITABLE_ATTRIBUTES[prefix]) {
                this.INHERITABLE_ATTRIBUTES[prefix] = [];
            }
            this.INHERITABLE_ATTRIBUTES[prefix].push(attributeName);
        },
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
        findTemplateElementByInstanceName(instanceName) {
            if (instanceName.startsWith("#")) {
                const elementId = instanceName.slice(1);
                const element = document.getElementById(elementId);
                if (element && this._hasAttribute(element, "template")) {
                    return element;
                }
                return null;
            }
            const allTemplateElements = this.findMatchingElements("template");
            if (!Array.isArray(allTemplateElements)) {
                return null;
            }
            const templateElement = allTemplateElements.find((element) => {
                const elementInstanceName = this._getRawAttribute(element, "instance");
                return elementInstanceName === instanceName;
            });
            return templateElement || null;
        },
        findElementByInstanceName(instanceName) {
            if (instanceName.startsWith("#")) {
                const elementId = instanceName.slice(1);
                const element = document.getElementById(elementId);
                return element;
            }
            const element = this.findMatchingElements("instance", instanceName, false, document, false, true);
            return element;
        },
    };

    function getGroupedInputValue(element) {
        const name = element.name;
        const type = element.type;
        const rootNode = element.getRootNode ? element.getRootNode() : document;
        if (type === "radio" && name) {
            const checkedRadio = rootNode.querySelector(`input[type="radio"][name="${CSS.escape(name)}"]:checked`);
            return checkedRadio ? checkedRadio.value : null;
        }
        if (type === "checkbox" && name) {
            const checkboxes = rootNode.querySelectorAll(`input[type="checkbox"][name="${CSS.escape(name)}"]`);
            if (checkboxes.length > 1) {
                const checkedValues = Array.from(checkboxes)
                    .filter((cb) => cb.checked)
                    .map((cb) => cb.value);
                return checkedValues;
            }
            else {
                return element.checked;
            }
        }
        if (element.tagName === "SELECT" && element.multiple) {
            const selectedOptions = Array.from(element.selectedOptions).map((option) => option.value);
            return selectedOptions;
        }
        return element.value;
    }

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
        const _extractSingleElementData = (element, processedElements = new Set()) => {
            const hasDataAttr = AttributeMatcher._hasAttribute(element, "data");
            const isProcessed = processedElements.has(element);
            if (!element || !hasDataAttr || isProcessed) {
                FlowPlater.log(FlowPlater.logLevels.DEBUG, `  - Exiting prematurely.`);
                return null;
            }
            processedElements.add(element);
            let primaryValue = null;
            let valueSource = null;
            const suffixes = {};
            let inputInfo = null;
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
            const explicitValue = AttributeMatcher._getRawAttribute(element, "data-value", null);
            if (explicitValue !== null) {
                primaryValue = explicitValue;
                valueSource = "attribute";
            }
            else {
                let inputElement = null;
                if (["INPUT", "SELECT", "TEXTAREA"].includes(element.tagName)) {
                    inputElement = element;
                }
                if (inputElement) {
                    inputInfo = {
                        isInput: true,
                        type: inputElement.type,
                        name: inputElement.name || null,
                        valueAttr: inputElement.value,
                    };
                }
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
                if (primaryValue === null && !inputInfo) {
                    const allDescendantsWithData = AttributeMatcher.findMatchingElements("data", undefined, true, element, false);
                    const directFpDataChildren = allDescendantsWithData.filter((child) => {
                        let parent = child.parentElement;
                        while (parent && parent !== element) {
                            if (AttributeMatcher._hasAttribute(parent, "data")) {
                                return false;
                            }
                            parent = parent.parentElement;
                        }
                        return parent === element;
                    });
                    if (directFpDataChildren.length > 0) {
                        const childData = {};
                        let hasChildData = false;
                        const nestedGroupParts = {};
                        for (const child of directFpDataChildren) {
                            const childKey = AttributeMatcher._getRawAttribute(child, "data");
                            const nestedResult = _extractSingleElementData(child, processedElements);
                            if (nestedResult) {
                                hasChildData = true;
                                if (nestedResult.inputInfo &&
                                    nestedResult.inputInfo.name &&
                                    (nestedResult.inputInfo.type === "radio" ||
                                        nestedResult.inputInfo.type === "checkbox") &&
                                    childKey !== null) {
                                    if (!nestedGroupParts[childKey]) {
                                        nestedGroupParts[childKey] = [];
                                    }
                                    nestedGroupParts[childKey].push({
                                        _isNestedGroupPart: true,
                                        element: child,
                                        inputInfo: nestedResult.inputInfo,
                                        suffixes: nestedResult.suffixes,
                                    });
                                }
                                else if (childKey !== null) {
                                    let nestedValue = nestedResult.primaryValue;
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
                                    Object.assign(childData, nestedResult.suffixes);
                                }
                            }
                        }
                        for (const key in nestedGroupParts) {
                            if (childData.hasOwnProperty(key)) {
                                FlowPlater.log(FlowPlater.logLevels.WARN, `[DataExtractor] Nested key '${key}' conflicts between regular data and a nested input group. Group data will overwrite.`);
                            }
                            childData[key] = nestedGroupParts[key];
                        }
                        if (hasChildData) {
                            primaryValue = childData;
                            valueSource = "nested";
                        }
                    }
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
            if (primaryValue !== null &&
                (valueSource === "attribute" || valueSource === "text") &&
                typeof primaryValue === "string") {
                const num = Number(primaryValue);
                if (!isNaN(num) && primaryValue.trim() !== "")
                    primaryValue = num;
            }
            if (primaryValue === null &&
                Object.keys(suffixes).length === 0 &&
                !inputInfo) {
                return null;
            }
            inputInfo = inputInfo || null;
            return { primaryValue, suffixes, inputInfo };
        };
        const globalMethods = {
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
            extractData(scopeElement) {
                const result = {};
                const seenPrimaryKeys = new Map();
                const processedElements = new Set();
                const groupDataCollector = new Map();
                let rootElements;
                if (AttributeMatcher._hasAttribute(scopeElement, "data")) {
                    rootElements = [scopeElement];
                }
                else {
                    const allFpDataDescendants = AttributeMatcher.findMatchingElements("data", undefined, true, scopeElement, false);
                    rootElements = allFpDataDescendants.filter((el) => {
                        let parent = el.parentElement;
                        while (parent && parent !== scopeElement) {
                            if (AttributeMatcher._hasAttribute(parent, "data")) {
                                return false;
                            }
                            parent = parent.parentElement;
                        }
                        return parent === scopeElement;
                    });
                }
                const processNestedGroups = (dataObject) => {
                    if (typeof dataObject !== "object" || dataObject === null) {
                        return;
                    }
                    for (const key in dataObject) {
                        if (dataObject.hasOwnProperty(key)) {
                            const value = dataObject[key];
                            if (Array.isArray(value) &&
                                value.length > 0 &&
                                value[0]?._isNestedGroupPart) {
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
                                        groupValue = [];
                                    }
                                }
                                dataObject[key] = groupValue;
                                for (const suffixKey in aggregatedSuffixes) {
                                    if (dataObject.hasOwnProperty(suffixKey)) ;
                                    dataObject[suffixKey] = aggregatedSuffixes[suffixKey];
                                }
                            }
                            else if (typeof value === "object") {
                                processNestedGroups(value);
                            }
                        }
                    }
                };
                for (const element of rootElements) {
                    if (processedElements.has(element))
                        continue;
                    const primaryKey = AttributeMatcher._getRawAttribute(element, "data");
                    const recursionProcessedSet = new Set();
                    const extractedResult = _extractSingleElementData(element, recursionProcessedSet);
                    if (!extractedResult) {
                        processedElements.add(element);
                        recursionProcessedSet.forEach((processedEl) => processedElements.add(processedEl));
                        continue;
                    }
                    const extractedInputIsGroup = extractedResult.inputInfo &&
                        (extractedResult.inputInfo.type === "radio" ||
                            extractedResult.inputInfo.type === "checkbox");
                    if (extractedInputIsGroup && extractedResult.inputInfo?.name) {
                        const groupName = extractedResult.inputInfo.name;
                        const inputType = extractedResult.inputInfo.type;
                        const valueAttr = extractedResult.inputInfo.valueAttr;
                        const isChecked = element.checked;
                        if (groupName) {
                            if (!groupDataCollector.has(groupName)) {
                                groupDataCollector.set(groupName, {
                                    primaryKey: primaryKey,
                                    type: inputType,
                                    options: [],
                                });
                            }
                            groupDataCollector.get(groupName).options.push({
                                element: element,
                                primaryKey: primaryKey,
                                valueAttr: valueAttr,
                                suffixes: extractedResult.suffixes,
                                isChecked: isChecked,
                            });
                            processedElements.add(element);
                            recursionProcessedSet.forEach((processedEl) => processedElements.add(processedEl));
                            continue;
                        }
                    }
                    const containedInput = element.querySelector('input[type="radio"][name], input[type="checkbox"][name]');
                    if (containedInput &&
                        !AttributeMatcher._hasAttribute(containedInput, "data")) {
                        const groupName = containedInput.name;
                        const inputType = containedInput.type;
                        const valueAttr = containedInput.value;
                        const isChecked = containedInput.checked;
                        if (!groupDataCollector.has(groupName)) {
                            groupDataCollector.set(groupName, {
                                primaryKey: primaryKey,
                                type: inputType,
                                options: [],
                            });
                        }
                        groupDataCollector.get(groupName).options.push({
                            element: containedInput,
                            primaryKey: primaryKey,
                            valueAttr: valueAttr,
                            suffixes: extractedResult.suffixes,
                            isChecked: isChecked,
                        });
                        processedElements.add(element);
                        recursionProcessedSet.forEach((processedEl) => processedElements.add(processedEl));
                        continue;
                    }
                    let { primaryValue, suffixes, inputInfo } = extractedResult;
                    if (typeof primaryValue === "object" && primaryValue !== null) {
                        processNestedGroups(primaryValue);
                    }
                    let finalValue = primaryValue;
                    if (inputInfo && inputInfo.isInput) {
                        finalValue = getGroupedInputValue(element);
                    }
                    if (finalValue !== null &&
                        finalValue !== undefined &&
                        Object.keys(suffixes).length > 0) {
                        if (typeof finalValue === "object" &&
                            !Array.isArray(finalValue) &&
                            finalValue !== null) {
                            Object.assign(finalValue, suffixes);
                        }
                        else {
                            finalValue = { value: finalValue, ...suffixes };
                        }
                    }
                    else if (Object.keys(suffixes).length > 0) {
                        finalValue = suffixes;
                    }
                    if (primaryKey !== null &&
                        finalValue !== null &&
                        finalValue !== undefined) {
                        if (seenPrimaryKeys.has(primaryKey)) {
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
                        Object.assign(result, finalValue);
                    }
                    processedElements.add(element);
                    recursionProcessedSet.forEach((processedEl) => processedElements.add(processedEl));
                }
                for (const [groupName, groupData] of groupDataCollector.entries()) {
                    const { primaryKey, type, options } = groupData;
                    if (type === "radio") {
                        const selectedOption = options.find((opt) => opt.isChecked);
                        if (selectedOption) {
                            let finalGroupValue = selectedOption.valueAttr;
                            let combinedValue = { value: finalGroupValue };
                            Object.assign(combinedValue, selectedOption.suffixes);
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
                        const selectedOptions = options.filter((opt) => opt.isChecked);
                        if (selectedOptions.length > 0) {
                            const values = selectedOptions.map((opt) => opt.valueAttr);
                            const suffixCollector = {};
                            selectedOptions.forEach((opt) => {
                                Object.entries(opt.suffixes).forEach(([key, value]) => {
                                    if (!suffixCollector[key]) {
                                        suffixCollector[key] = [];
                                    }
                                    suffixCollector[key].push(value);
                                });
                            });
                            let combinedValue = { value: values };
                            Object.assign(combinedValue, suffixCollector);
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
                            if (primaryKey) {
                                result[primaryKey] = { value: [] };
                            }
                        }
                    }
                }
                return result;
            },
            observeDataElement(element, localVarName, instance) {
                const observer = new MutationObserver(() => {
                    const key = AttributeMatcher._getRawAttribute(element, "data");
                    if (key) {
                        const extracted = _extractSingleElementData(element);
                        if (extracted) {
                            instance.updateData(key, extracted.primaryValue);
                        }
                    }
                });
                observer.observe(element, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                    characterData: true,
                });
                if (!instance._observers) {
                    instance._observers = new Set();
                }
                instance._observers.add(observer);
            },
        };
        const hooks = {
            initComplete: function (flowplater) {
                if (config.enabled && config.settings.debug) {
                    FlowPlater.log(FlowPlater.logLevels.INFO, `${config.name} plugin initialized`);
                }
                return flowplater;
            },
        };
        const transformers = {
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
