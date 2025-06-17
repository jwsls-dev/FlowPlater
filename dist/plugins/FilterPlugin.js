var FilterPlugin = (function () {
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
                    new FlowPlaterError("Invalid event name. Event name must be a non-empty string.", new Error().stack);
                }
                // Validate callback
                if (!callback || typeof callback !== "function") {
                    new FlowPlaterError(`Invalid callback for event "${event}". Callback must be a function.`, new Error().stack);
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
                    new FlowPlaterError("Invalid event name. Event name must be a non-empty string. If you are trying to unsubscribe from all events, use unsubscribeAll() instead.", new Error().stack);
                }
                if (!subscribers.has(event))
                    return;
                const subs = subscribers.get(event);
                subscribers.set(event, subs.filter((sub) => sub.callback !== callback));
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
            publish(event, data = null) {
                if (!subscribers.has(event))
                    return;
                // Call subscribers for this specific event
                subscribers.get(event).forEach(({ callback, context }) => {
                    try {
                        callback.call(context, data);
                    }
                    catch (error) {
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
                            }
                            catch (error) {
                                Debug.error(`Error in instance event subscriber for ${instanceEvent}:`, error);
                            }
                        });
                    }
                }
            },
        };
    })();

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
        config: {},
        _initTracking: {},
    };

    // Default customTags - can be overridden via meta config in init()
    const customTagList = [{ tag: "fpselect", replaceWith: "select" }];
    function setCustomTags(tags) {
    }

    /**
     * Deep merges source objects into target object.
     * Mutates the target object.
     *
     * @param target - The target object to merge into
     * @param source - The source object to merge from
     * @returns The merged object (same as target)
     * @description
     * - Arrays are replaced entirely rather than merged
     * - Objects are merged recursively
     * - Primitive values are copied directly
     * - The target object is mutated in place
     */
    function deepMerge(target, source) {
        // Handle edge cases
        if (!source)
            return target;
        if (!target)
            return source;
        // Iterate through source properties
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                // Handle arrays specially - replace entire array
                if (Array.isArray(target[key]) && Array.isArray(source[key])) {
                    target[key] = source[key];
                }
                // If property exists in target and both are objects, merge recursively
                else if (key in target &&
                    typeof target[key] === "object" &&
                    typeof source[key] === "object" &&
                    target[key] !== null &&
                    source[key] !== null) {
                    deepMerge(target[key], source[key]);
                }
                else {
                    // Otherwise just copy the value
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

    const defaultConfig = {
        debug: {
            level: window.location.hostname.endsWith(".webflow.io") ||
                window.location.hostname.endsWith(".canvas.webflow.com") ||
                window.location.hostname.endsWith("localhost")
                ? 3
                : 1,
        },
        selectors: {
            fp: [
                "template",
                "get",
                "post",
                "put",
                "delete",
                "patch",
                "persist",
                "instance",
            ],
        },
        templates: {
            cacheSize: 100,
            precompile: true,
        },
        animation: {
            enabled: true,
            duration: 300,
        },
        htmx: {
            timeout: 10000,
            swapStyle: "innerHTML",
            selfRequestsOnly: false,
            ignoreTitle: true,
        },
        customTags: customTagList,
        storage: {
            enabled: false,
            ttl: 30 * 24 * 60 * 60, // 30 days in seconds
        },
        persistForm: true,
        allowExecute: true,
    };
    /**
     * Normalizes storage configuration to a standard format
     * @param {boolean|number|Object} storageConfig - The storage configuration value
     * @param {Object} defaultStorageConfig - The default storage configuration
     * @returns {Object} Normalized storage configuration
     */
    function normalizeStorageConfig(storageConfig, defaultStorageConfig) {
        if (typeof storageConfig === "boolean") {
            return {
                enabled: storageConfig,
                ttl: defaultStorageConfig.ttl,
            };
        }
        if (typeof storageConfig === "number") {
            if (storageConfig === -1) {
                return {
                    enabled: true,
                    ttl: -1, // Infinite TTL
                };
            }
            return {
                enabled: storageConfig > 0,
                ttl: storageConfig > 0 ? storageConfig : defaultStorageConfig.ttl,
            };
        }
        // Ensure enabled is boolean and ttl is number
        if (typeof storageConfig === "object" && storageConfig !== null) {
            return {
                enabled: !!storageConfig.enabled,
                ttl: typeof storageConfig.ttl === "number"
                    ? storageConfig.ttl
                    : defaultStorageConfig.ttl,
            };
        }
        return defaultStorageConfig; // Fallback to default if invalid format
    }
    // Initialize state with default config
    _state.config = JSON.parse(JSON.stringify(defaultConfig));
    const ConfigManager = {
        /**
         * Sets or updates the FlowPlater configuration.
         * @param {Object} newConfig - Configuration options to apply.
         */
        setConfig(newConfig = {}) {
            if ("storage" in newConfig) {
                newConfig.storage = normalizeStorageConfig(newConfig.storage, defaultConfig.storage);
            }
            // Use the imported deepMerge utility
            _state.config = deepMerge(JSON.parse(JSON.stringify(_state.config)), newConfig);
            // --- Apply configuration settings ---
            // Apply debug level
            Debug.level = _state.config.debug.level;
            // Configure HTMX defaults if htmx is available
            if (typeof htmx !== "undefined") {
                htmx.config.timeout = _state.config.htmx.timeout;
                htmx.config.defaultSwapStyle = _state.config.htmx.swapStyle;
                htmx.config.selfRequestsOnly = _state.config.htmx.selfRequestsOnly;
                htmx.config.ignoreTitle = _state.config.htmx.ignoreTitle;
            }
            // Set custom tags if provided in the new config
            if (newConfig.customTags) {
                setCustomTags(newConfig.customTags);
            }
            Debug.info("FlowPlater configuration updated:", this.getConfig());
        },
        /**
         * Gets the current configuration.
         * @returns {Object} A deep copy of the current configuration.
         */
        getConfig() {
            // Return a deep copy to prevent accidental modification of the state
            return JSON.parse(JSON.stringify(_state.config));
        },
        /**
         * Gets the default configuration.
         * @returns {Object} A deep copy of the default configuration.
         */
        getDefaultConfig() {
            return JSON.parse(JSON.stringify(defaultConfig));
        },
    };
    // Apply initial debug level based on the default config loaded into state
    Debug.level = _state.config.debug.level;

    // Helper function to handle Map serialization
    function replacer(key, value) {
        if (value instanceof Map) {
            return {
                _dataType: "Map",
                value: Array.from(value.entries()), // Convert Map to array of [key, value] pairs
            };
        }
        else {
            return value;
        }
    }
    // Helper function to handle Map deserialization
    function reviver(key, value) {
        if (typeof value === "object" &&
            value !== null &&
            value._dataType === "Map") {
            return new Map(value.value);
        }
        return value;
    }
    /**
     * Saves data to localStorage with expiry
     * @param {string} key - The key to save under
     * @param {*} data - The data to save
     * @param {string} type - Type prefix (e.g., 'instance', 'group')
     * @returns {boolean} True if save was successful, false otherwise
     */
    function saveToLocalStorage(key, data, type = "") {
        const config = ConfigManager.getConfig().storage;
        if (!config?.enabled) {
            Debug.debug(`[LocalStorage] Storage is disabled, skipping save for key: ${key}`);
            return false;
        }
        try {
            const storageKey = type ? `fp_${type}_${key}` : `fp_${key}`;
            let dataToStore;
            try {
                // Use the replacer here
                dataToStore = JSON.stringify(data, replacer);
            }
            catch (e) {
                Debug.error(`[LocalStorage] Failed to serialize data for key ${storageKey}: ${e.message}`);
                return false; // Don't save corrupted data
            }
            const item = {
                data: dataToStore, // Store the stringified data
                expiry: config.ttl === -1 ? null : Date.now() + config.ttl * 1000,
            };
            Debug.debug(`[LocalStorage] Saving to localStorage:`, {
                key: storageKey,
                item,
            });
            localStorage.setItem(storageKey, JSON.stringify(item)); // Store the wrapper object
            return true;
        }
        catch (e) {
            Debug.error(`[LocalStorage] Failed to save to localStorage for key ${key}: ${e.message}`);
            return false;
        }
    }
    /**
     * Loads data from localStorage, checks expiry
     * @param {string} key - The key to load
     * @param {string} type - Type prefix (e.g., 'instance', 'group')
     * @returns {*} The loaded data or null if not found or expired
     */
    function loadFromLocalStorage(key, type = "") {
        ConfigManager.getConfig().storage;
        // Allow loading even if storage is disabled *now*, data might exist from previous session
        try {
            const storageKey = type ? `fp_${type}_${key}` : `fp_${key}`;
            const storedItem = localStorage.getItem(storageKey);
            if (!storedItem) {
                Debug.debug(`[LocalStorage] No stored item found for key: ${storageKey}`);
                return null;
            }
            const item = JSON.parse(storedItem);
            // Check expiry
            if (item.expiry && item.expiry < Date.now()) {
                Debug.debug(`[LocalStorage] Stored item has expired for key: ${storageKey}`);
                localStorage.removeItem(storageKey);
                return null;
            }
            // Use the reviver here when parsing the stored data string
            const loadedData = JSON.parse(item.data, reviver);
            Debug.debug(`[LocalStorage] Loaded from localStorage:`, {
                key: storageKey,
                data: loadedData,
            });
            return loadedData;
        }
        catch (e) {
            Debug.error(`[LocalStorage] Failed to load or parse from localStorage for key ${key}: ${e.message}`);
            return null;
        }
    }

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
                Array.from(forms).forEach((form) => this.restoreSingleFormState(form, source || "unknown"));
            }
            catch (error) {
                Debug.error(`Error restoring form states: ${error.message}`);
            }
            finally {
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
            if (!form.id)
                return false;
            // Try to get state from storage
            const formState = this.handleFormStorage(form, {}, "load");
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
                if (!(input.name in formState))
                    return;
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
                if (!form)
                    return;
                this.handleFormStorage(form, {}, "clear");
                EventSystem.publish("formState:clear", {
                    formId,
                    formElement: form,
                });
            }
            catch (error) {
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
                restoredElements: details.restoredElements || [],
                customVisualUpdates: details.customVisualUpdates || [],
                skippedElements: details.skippedElements || [],
                storageType: details.storageType
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
                }
                else {
                    sessionStorage.setItem(key, JSON.stringify(state));
                }
            }
            else if (operation === "load") {
                return useLocal
                    ? loadFromLocalStorage(form.id, "form")
                    : JSON.parse(sessionStorage.getItem(key) || "{}");
            }
            else if (operation === "clear") {
                if (useLocal)
                    localStorage.removeItem(key);
                sessionStorage.removeItem(key);
            }
        },
        /**
         * Helper function to process form elements consistently
         */
        processFormElements(form, callback) {
            Array.from(form.elements).forEach((element) => {
                if (!element.name || element.type === "file")
                    return;
                if (!this.isPersistenceEnabledForElement(element))
                    return;
                callback(element);
            });
        },
        /**
         * Helper function to restore element values
         */
        restoreElementValue(element, value) {
            if (element.type === "checkbox" || element.type === "radio") {
                element.checked = value === "true";
                this.updateCustomVisualState(element);
            }
            else if (element instanceof HTMLSelectElement && element.multiple) {
                Array.from(element.options).forEach((option) => {
                    option.selected = value.includes(option.value);
                });
            }
            else {
                element.value = value;
            }
        },
        /**
         * Helper function to update custom visual state
         */
        updateCustomVisualState(element) {
            const wrapper = element.closest(element.type === "checkbox" ? ".w-checkbox" : ".w-radio");
            if (!wrapper)
                return;
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
            return (AttributeMatcher._hasAttribute(element, "persist-local") ||
                ConfigManager.getConfig().storage?.enabled === true);
        },
        /**
         * Checks if form restoration should be performed for a form or its elements
         * @param {HTMLElement} element - The form or container element to check
         * @returns {boolean} - Whether form restoration should be performed
         */
        shouldRestoreForm(element) {
            // First check if there are any explicitly persistent elements
            // These override any parent fp-persist="false" settings
            const explicitlyPersistentInputs = AttributeMatcher.findMatchingElements("persist", "true", true, element);
            if (explicitlyPersistentInputs && explicitlyPersistentInputs.length > 0) {
                return true;
            }
            // Check if element itself is a form with explicit persistence setting
            if (element.tagName === "FORM" &&
                AttributeMatcher._hasAttribute(element, "persist")) {
                return AttributeMatcher._getRawAttribute(element, "persist") !== "false";
            }
            // Check parent form if exists
            const parentForm = element.closest("form");
            if (parentForm) {
                // If parent form explicitly disables persistence, skip it
                if (AttributeMatcher._getRawAttribute(parentForm, "persist") === "false") {
                    return false;
                }
                // Check all form elements in parent form
                const formElements = parentForm.elements;
                for (const input of formElements) {
                    // Skip elements without name or file inputs
                    if (!input.name || input.type === "file")
                        continue;
                    // Check if input is inside an element with fp-persist="false"
                    const persistFalseParent = AttributeMatcher.findClosestParent("persist", input, "false", true);
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
        function getValueFromPath(obj, path) {
            return path.split(".").reduce((current, key) => {
                if (current === undefined || current === null)
                    return undefined;
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
                if (value === undefined || value === null)
                    return;
                if (Array.isArray(value)) {
                    value.forEach((v) => values.add(v));
                }
                else {
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
            // Trigger before dynamic filters update
            FlowPlater.trigger("filter:beforeDynamicUpdate", form, { path, data });
            // Get the array to filter
            const pathParts = path.split(".");
            let target = data;
            for (let i = 0; i < pathParts.length - 1; i++) {
                target = target[pathParts[i]];
                if (!target)
                    return;
            }
            const array = target[pathParts[pathParts.length - 1]];
            if (!Array.isArray(array))
                return;
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
                        option.value = value;
                        option.textContent = value;
                        element.appendChild(option);
                    });
                    // Restore select state if it exists
                    const formState = FormStateManager.handleFormStorage(form, {}, "load");
                    if (formState && element.name && formState[element.name]) {
                        if (element.multiple) {
                            // For multiple select, restore all selected values
                            Array.from(element.options).forEach((option) => {
                                option.selected =
                                    Array.isArray(formState[element.name]) &&
                                        formState[element.name].includes(option.value);
                            });
                        }
                        else {
                            // For single select, restore the selected value
                            element.value = formState[element.name];
                        }
                    }
                }
                else {
                    // Handle checkbox/radio groups
                    const wrapper = element;
                    if (!wrapper)
                        return;
                    // Store the template and check if we should preserve default option
                    const template = wrapper.children[0];
                    if (!template)
                        return;
                    const preserveDefault = element.hasAttribute("fp-filter-preserve-default");
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
                            input.name = field || "";
                        }
                        // Update label's 'for' attribute if it exists
                        const label = clone.querySelector("label");
                        if (label) {
                            label.setAttribute("for", `${field}_${value}` || "");
                        }
                        // Find and update text nodes in the element
                        function updateTextContent(element, newText) {
                            // First, normalize the element to merge adjacent text nodes
                            element.normalize();
                            // Find all text nodes
                            const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
                                acceptNode: function (node) {
                                    // Skip empty or whitespace-only text nodes
                                    return node.textContent?.trim() || ""
                                        ? NodeFilter.FILTER_ACCEPT
                                        : NodeFilter.FILTER_REJECT;
                                },
                            });
                            // Get the first non-empty text node
                            const textNode = walker.nextNode();
                            if (textNode) {
                                textNode.textContent = newText;
                            }
                        }
                        // Update the text content in either the label or the clone
                        if (label) {
                            updateTextContent(label, value);
                        }
                        else {
                            updateTextContent(clone, value);
                        }
                        wrapper.appendChild(clone);
                    });
                    // Restore form state after all inputs are created
                    const formState = FormStateManager.handleFormStorage(form, {}, "load");
                    if (formState && field && field in formState) {
                        const inputs = wrapper.querySelectorAll("input");
                        inputs.forEach((input) => {
                            if (input.type === "radio") {
                                input.checked =
                                    (input.value || "") === (formState[field] || "");
                            }
                            else if (input.type === "checkbox") {
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
        function formStateToUrlParams(formState) {
            const params = new URLSearchParams();
            Object.entries(formState).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // Handle arrays (multiple select, checkboxes) - join with commas
                    if (value.length > 0) {
                        params.set(key, value.join(","));
                    }
                }
                else if (value !== null && value !== undefined && value !== "") {
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
                }
                else {
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
            if (!form.hasAttribute("fp-filter-usequery"))
                return;
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
            if (!form || !instanceName)
                return;
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
                if (!e.isTrusted)
                    return;
                // Prevent form submission
                if (e.type === "submit") {
                    e.preventDefault();
                }
                // Capture form state
                const formState = {};
                form.querySelectorAll("[fp-filter-key]").forEach((element) => {
                    const key = element.getAttribute("fp-filter-key");
                    if (!key)
                        return;
                    // Get all inputs within this element (or the element itself if it's an input)
                    const inputs = element.matches("input, select, textarea")
                        ? [element]
                        : Array.from(element.querySelectorAll("input, select, textarea"));
                    if (inputs.length === 0)
                        return;
                    if (inputs.some((input) => input.type === "checkbox")) {
                        // Group checkboxes by key
                        const checkboxes = inputs.filter((input) => input.type === "checkbox");
                        if (checkboxes.length > 1) {
                            // Multiple checkboxes with same key - store checked values
                            formState[key] = checkboxes
                                .filter((cb) => cb.checked)
                                .map((cb) => cb.value);
                        }
                        else {
                            // Single checkbox - store boolean state
                            formState[key] = checkboxes[0].checked;
                        }
                    }
                    else if (inputs.some((input) => input.type === "radio")) {
                        // For radio buttons, ensure we have an entry even if none are checked
                        const checkedRadio = inputs.find((input) => input.checked);
                        formState[key] = checkedRadio ? checkedRadio.value || "" : "";
                    }
                    else if (inputs.some((input) => input instanceof HTMLSelectElement && input.multiple)) {
                        const select = inputs.find((input) => input instanceof HTMLSelectElement && input.multiple);
                        if (select) {
                            formState[key] = Array.from(select.selectedOptions).map((opt) => opt.value);
                        }
                        else {
                            formState[key] = [];
                        }
                    }
                    else {
                        // Handle text inputs, textareas, and dates
                        formState[key] = inputs[0].value || "";
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
                if (form.hasAttribute("fp-filter-usequery") &&
                    !form.dataset.fpFilterInitialLoad) {
                    updateUrl(form, formState);
                }
                // Log form state for debugging
                FlowPlater.log(FlowPlater.logLevels.DEBUG, `[FilterPlugin] Form state captured`, { formState });
                // Trigger debounced instance refresh
                const instance = FlowPlater.getInstance(instanceName);
                if (instance) {
                    debouncedRefresh(instance);
                }
                else {
                    FlowPlater.log(FlowPlater.logLevels.ERROR, `[FilterPlugin] Could not find instance for refresh`, {
                        instanceName,
                        formId: form.id,
                    });
                }
                // Trigger after filters are applied
                FlowPlater.trigger("filter:applied", form, { formState, instanceName });
            };
            // Helper function to reset filters
            const handleFilterReset = (e) => {
                e.preventDefault();
                // Trigger before reset
                FlowPlater.trigger("filter:beforeReset", form, { instanceName });
                // Reset all form elements
                form.reset();
                // Clear form state
                FormStateManager.handleFormStorage(form, {}, "save");
                // Trigger form update to refresh the view
                handleFormUpdate({ isTrusted: true, type: "reset", target: e.target });
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
            EventSystem.subscribe("formState:loaded", (event) => {
                if (event.formElement === form &&
                    form.hasAttribute("fp-filter-usequery")) {
                    const formState = getFormStateFromUrl();
                    if (formState && Object.keys(formState).length > 0) {
                        // Find all elements with fp-filter-key that are inputs or contain inputs
                        form.querySelectorAll("[fp-filter-key]").forEach((element) => {
                            const key = element.getAttribute("fp-filter-key");
                            if (!key || !(key in formState))
                                return;
                            // Get all inputs within this element (or the element itself if it's an input)
                            const inputs = element.matches("input, select, textarea")
                                ? [element]
                                : Array.from(element.querySelectorAll("input, select, textarea"));
                            if (inputs.length === 0)
                                return;
                            const value = formState[key];
                            inputs.forEach((input) => {
                                if (input.type === "checkbox") {
                                    if (Array.isArray(value)) {
                                        input.checked = value.includes(input.value);
                                    }
                                    else {
                                        input.checked = value;
                                    }
                                }
                                else if (input.type === "radio") {
                                    // Handle empty values correctly by comparing with empty string
                                    input.checked = (input.value || "") === (value || "");
                                }
                                else if (input instanceof HTMLSelectElement && input.multiple) {
                                    Array.from(input.options).forEach((option) => {
                                        option.selected = Array.isArray(value)
                                            ? value.includes(option.value)
                                            : value === option.value;
                                    });
                                }
                                else {
                                    // Handle text inputs, textareas, and dates
                                    input.value = value;
                                }
                            });
                        });
                        // Trigger initial update to apply filters
                        const handleFormUpdate = (e) => {
                            if (!e.isTrusted)
                                return;
                            const instance = FlowPlater.getInstance(instanceName);
                            if (instance) {
                                instance.refresh();
                            }
                        };
                        handleFormUpdate({ isTrusted: true, type: "init", target: form });
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
                const filterForms = document.querySelectorAll(`[fp-filter-instance="${instance.instanceName}"]`);
                if (filterForms.length === 0)
                    return instance;
                filterForms.forEach((form) => {
                    const path = form.getAttribute("fp-filter");
                    if (!path)
                        return;
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
                    if (form.hasAttribute("fp-filter-usequery") &&
                        FormStateManager.isPersistenceEnabledForElement(form)) {
                        const formState = getFormStateFromUrl();
                        if (formState && Object.keys(formState).length > 0) {
                            // Find all elements with fp-filter-key that are inputs or contain inputs
                            form.querySelectorAll("[fp-filter-key]").forEach((element) => {
                                const key = element.getAttribute("fp-filter-key");
                                if (!key || !(key in formState))
                                    return;
                                // Get all inputs within this element (or the element itself if it's an input)
                                const inputs = element.matches("input, select, textarea")
                                    ? [element]
                                    : Array.from(element.querySelectorAll("input, select, textarea"));
                                if (inputs.length === 0)
                                    return;
                                const value = formState[key];
                                inputs.forEach((input) => {
                                    if (input.type === "checkbox") {
                                        if (Array.isArray(value)) {
                                            input.checked = value.includes(input.value);
                                        }
                                        else {
                                            input.checked = value;
                                        }
                                    }
                                    else if (input.type === "radio") {
                                        // Handle empty values correctly by comparing with empty string
                                        input.checked = (input.value || "") === (value || "");
                                    }
                                    else if (input instanceof HTMLSelectElement &&
                                        input.multiple) {
                                        Array.from(input.options).forEach((option) => {
                                            option.selected = Array.isArray(value)
                                                ? value.includes(option.value)
                                                : value === option.value;
                                        });
                                    }
                                    else {
                                        // Handle text inputs, textareas, and dates
                                        input.value = value;
                                    }
                                });
                            });
                            // Trigger initial update to apply filters
                            const handleFormUpdate = (e) => {
                                if (!e.isTrusted)
                                    return;
                                const targetInstance = FlowPlater.getInstance(instance.instanceName);
                                if (targetInstance) {
                                    targetInstance.refresh();
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
            if (!value)
                return null;
            if (value instanceof Date)
                return value;
            const date = new Date(value);
            return isNaN(date) ? null : date;
        }
        // Modify the handleRangeFilter function to use simple date parsing
        function handleRangeFilter(itemValue, operator, value) {
            if (!value)
                return true;
            // Handle date comparisons
            if (itemValue instanceof Date || isValidDateString(itemValue)) {
                const itemDate = parseDate(itemValue);
                const compareDate = parseDate(value);
                if (!itemDate || !compareDate)
                    return true; // Skip invalid dates
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
            if (isNaN(numValue) || isNaN(numItemValue))
                return true;
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
            if (typeof value !== "string")
                return false;
            // Check for YYYY-MM-DD format or ISO date format
            return (/^\d{4}-\d{2}-\d{2}/.test(value) ||
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value));
        }
        function handleCheckboxFilter(inputs, itemValue) {
            const checkedBoxes = inputs.filter((input) => input.type === "checkbox" && input.checked);
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
            const selectedRadio = inputs.find((input) => input.type === "radio" && input.checked);
            // Show all items if no radio is selected or if the selected value is empty
            if (!selectedRadio || !selectedRadio.value)
                return true;
            return itemValue === selectedRadio.value;
        }
        // Modify the handleTextFilter function to use simple date parsing
        function handleTextFilter(inputs, itemValue) {
            const input = inputs.find((input) => input.type === "text" || input.tagName === "SELECT");
            if (!input)
                return true;
            // Handle select elements
            if (input.tagName === "SELECT") {
                // If no value is selected or default option is selected, show all
                if (!input.value || input.value === "")
                    return true;
                // For multiple select
                if (input instanceof HTMLSelectElement && input.multiple) {
                    const selectedValues = Array.from(input.selectedOptions).map((opt) => opt.value);
                    if (selectedValues.length === 0)
                        return true;
                    // If itemValue is an array (like tags), check if any selected value exists in the array
                    if (Array.isArray(itemValue)) {
                        return selectedValues.some((selectedValue) => itemValue.some((v) => v.toString().toLowerCase() === selectedValue.toLowerCase()));
                    }
                    // For non-array values, check if any selected value matches
                    return selectedValues.some((selectedValue) => itemValue.toString().toLowerCase() === selectedValue.toLowerCase());
                }
                // For single select
                // If itemValue is an array (like tags), check if the selected value exists in the array
                if (Array.isArray(itemValue)) {
                    return itemValue.some((v) => v.toString().toLowerCase() === input.value.toLowerCase());
                }
                return itemValue.toString().toLowerCase() === input.value.toLowerCase();
            }
            // Handle text input
            if (!input.value)
                return true;
            // Check if this is a date filter
            const filterType = input.getAttribute("fp-filter-type");
            if (filterType === "date") {
                const itemDate = parseDate(itemValue);
                const inputDate = parseDate(input.value);
                if (!itemDate || !inputDate)
                    return true; // Skip invalid dates
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
                if (!data)
                    return data;
                if (dataType !== "json") {
                    FlowPlater.log(FlowPlater.logLevels.ERROR, "[FilterPlugin] Data type is not json. Skipping filter.");
                    return data;
                }
                const filterForms = document.querySelectorAll(`[fp-filter-instance="${instance.instanceName}"]`);
                if (filterForms.length === 0)
                    return data;
                let filteredData = { ...data };
                const instanceElements = instance.getElements();
                instanceElements.forEach((element) => {
                    FlowPlater.trigger("filter:beforeTransform", element, {
                        data,
                        dataType,
                    });
                });
                filterForms.forEach((form) => {
                    const path = form.getAttribute("fp-filter");
                    if (!path)
                        return;
                    // Group inputs by their filter key
                    const filterGroups = {};
                    form.querySelectorAll("input, select").forEach((element) => {
                        // Get the filter key from fp-filter-key or use the name attribute
                        const key = element.getAttribute("fp-filter-key") || element.name;
                        if (!key)
                            return;
                        // Find all inputs inside this element (or the element itself if it's an input)
                        const inputs = element.matches("input, select")
                            ? [element]
                            : Array.from(element.querySelectorAll("input, select"));
                        if (inputs.length === 0)
                            return;
                        const [field, operator] = key.split(":");
                        const groupKey = operator ? `${field}:${operator}` : field;
                        if (!filterGroups[groupKey])
                            filterGroups[groupKey] = [];
                        filterGroups[groupKey].push(...inputs);
                        FlowPlater.log(FlowPlater.logLevels.DEBUG, `[FilterPlugin] Found inputs for filter key`, {
                            key,
                            inputCount: inputs.length,
                            inputTypes: inputs.map((i) => i.type),
                        });
                    });
                    // Filter the array
                    const filteredArray = filteredData[path].filter((item) => applyFilters(item, filterGroups));
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

    return FilterPlugin;

})();
