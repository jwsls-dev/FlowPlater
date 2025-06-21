var FilterPlugin = (function () {
    'use strict';

    const DEFAULTS = {
        TEMPLATE: {
            CACHE_SIZE: 100,
            PRECOMPILE: true,
            ANONYMOUS_INSTANCE_NAME: "anonymous",
            SELF_TEMPLATE_ID: "self",
        },
        ANIMATION: {
            ENABLED: true,
            DURATION: 300,
        },
        DEBUG: {
            LEVEL: 1,
            DEVELOPMENT_LEVEL: 3,
        },
        HTMX: {
            TIMEOUT: 10000,
            SWAP_STYLE: "innerHTML",
            SELF_REQUESTS_ONLY: false,
            IGNORE_TITLE: true,
            DEFAULT_TRIGGER: "mouseover",
            SWAP_DELAY: 0,
            SETTLE_DELAY: 0,
            TRANSITION: false,
        },
        STORAGE: {
            ENABLED: false,
            TTL: 30 * 24 * 60 * 60,
            INFINITE_TTL: -1,
        },
        PERFORMANCE: {
            BATCH_DOM_UPDATES: true,
            BATCHING_DELAY: 0,
            DEBOUNCE_DELAY: 0,
        },
        FORMS: {
            PERSIST_FORMS: true,
            DEFAULT_SOURCE: "unknown",
            TRIGGER_EVENTS: "change",
            EXCLUDED_INPUT_TYPES: ["file"],
            CHECKBOX_RADIO_TYPES: ["checkbox", "radio"],
            TEXT_INPUT_TYPES: ["text"],
            FORM_INPUT_TYPES: ["INPUT", "SELECT", "TEXTAREA"],
        },
        PLUGINS: {
            DEFAULT_PRIORITY: 0,
            DEFAULT_VERSION: "1.0.0",
            DEBUG: false,
        },
        CART: {
            ENABLED: true,
            PRIORITY: 50,
            DATA_ATTRIBUTE: "product",
            GROUP_NAME: "cart",
            REQUIRED_KEYS: ["id", "name"],
            CURRENCY: {
                NAME: "USD",
                SYMBOL: "$",
                PRECISION: 2,
                SEPARATOR: ",",
                DECIMAL: ".",
            },
            TAX_RATES: [{ name: "VAT", value: 1.21 }],
            LOCALE: "en-US",
            STOCK: {
                INFINITE: Infinity,
                MIN_AMOUNT: 0,
            },
        },
        FILTER: {
            ENABLED: true,
            PRIORITY: 0,
            DEFAULT_SELECT_OPTION: "Select tags...",
            PRESERVE_DEFAULT: false,
        },
        DATA_EXTRACTOR: {
            VALUE_SOURCES: {
                ATTRIBUTE: "attribute",
                TEXT: "text",
            },
        },
        PROXY: {
            DEFAULT_URL: "",
        },
        MATH: {
            OPERATORS: {
                ADD: "+",
                SUBTRACT: "-",
                MULTIPLY: "*",
                DIVIDE: "/",
            },
        },
        DOM: {
            UPDATE_COUNTER_INITIAL: 0,
            UNKNOWN_ELEMENT_ID: "unknown",
            INTEGRITY_CHECK_ENABLED: true,
            VOID_ELEMENTS: [
                'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
                'link', 'meta', 'param', 'source', 'track', 'wbr'
            ],
            SVG_NAMESPACE: 'http://www.w3.org/2000/svg',
            SVG_ELEMENTS: [
                'svg', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'rect', 'path',
                'g', 'text', 'tspan', 'defs', 'use', 'symbol', 'marker', 'clipPath',
                'mask', 'pattern', 'image', 'foreignObject'
            ],
            WEBFLOW_CLASSES: [
                'w-checkbox', 'w-radio', 'w-checkbox-input', 'w-radio-input',
                'w-form', 'w-input', 'w-select', 'w-textarea'
            ],
            SIMILARITY_THRESHOLD: 0.5,
            LENGTH_RATIO_THRESHOLD: 0.5,
        },
        INSTANCES: {
            DUPLICATE_INIT_WINDOW: 100,
        },
        EVENTS: {
            HTTP_METHODS: ["get", "post", "put", "patch", "delete"],
            HTTP_TRIGGER_ATTRIBUTES: ["trigger", "boost", "ws", "sse"],
        },
        HELPERS: {
            EACH: {
                START_AT: 0,
                SORT_KEY: "",
                DESCENDING: false,
                SORT_BEFORE_LIMIT: true,
            },
            COMPARISON: {
                DEFAULT_OPERATOR: "==",
            },
        },
        CONTENT_TYPES: {
            UNKNOWN: "unknown",
            JSON: "json",
            HTML: "html",
            XML: "xml",
        },
        ERRORS: {
            XML_PARSER_ERROR: "Unknown parser error",
        },
        URL: {
            WEBFLOW_DOMAINS: [".webflow.io", ".canvas.webflow.com"],
            LOCALHOST: "localhost",
        },
        SELECTORS: {
            FP_ATTRIBUTES: [
                "template", "get", "post", "put", "delete", "patch",
                "persist", "instance", "data", "local", "group",
                "target", "swap", "trigger", "dynamic"
            ],
            TEMPLATE_ELEMENTS: ["template", "fptemplate"],
            EXTENSION_ATTRIBUTE: "hx-ext",
        },
        SECURITY: {
            ALLOW_EXECUTE: true,
            FORBIDDEN_REGISTRATIONS: new Set([
                "if", "unless", "each", "with", "lookup", "log", "blockHelperMissing", "helperMissing"
            ]),
        },
    };

    const _state = {
        templateCache: {},
        instances: {},
        groups: {},
        length: 0,
        initialized: false,
        defaults: {
            animation: false,
            debug: false,
        },
        config: {},
        _initTracking: {},
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

    const customTagList = [{ tag: "fpselect", replaceWith: "select" }];
    function setCustomTags(tags) {
    }

    function deepMerge(target, source) {
        if (!source)
            return target;
        if (!target)
            return source;
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (Array.isArray(target[key]) && Array.isArray(source[key])) {
                    target[key] = source[key];
                }
                else if (key in target &&
                    typeof target[key] === "object" &&
                    typeof source[key] === "object" &&
                    target[key] !== null &&
                    source[key] !== null) {
                    deepMerge(target[key], source[key]);
                }
                else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

    const isDevEnvironment = DEFAULTS.URL.WEBFLOW_DOMAINS.some(domain => window.location.hostname.endsWith(domain)) || window.location.hostname.includes(DEFAULTS.URL.LOCALHOST);
    const defaultConfig = {
        debug: {
            level: isDevEnvironment ? DEFAULTS.DEBUG.DEVELOPMENT_LEVEL : DEFAULTS.DEBUG.LEVEL,
        },
        selectors: {
            fp: DEFAULTS.SELECTORS.FP_ATTRIBUTES,
        },
        templates: {
            cacheSize: DEFAULTS.TEMPLATE.CACHE_SIZE,
            precompile: DEFAULTS.TEMPLATE.PRECOMPILE,
        },
        animation: {
            enabled: DEFAULTS.ANIMATION.ENABLED,
            duration: DEFAULTS.ANIMATION.DURATION,
        },
        htmx: {
            timeout: DEFAULTS.HTMX.TIMEOUT,
            swapStyle: DEFAULTS.HTMX.SWAP_STYLE,
            selfRequestsOnly: DEFAULTS.HTMX.SELF_REQUESTS_ONLY,
            ignoreTitle: DEFAULTS.HTMX.IGNORE_TITLE,
        },
        customTags: customTagList,
        storage: {
            enabled: DEFAULTS.STORAGE.ENABLED,
            ttl: DEFAULTS.STORAGE.TTL,
        },
        performance: {
            batchDomUpdates: DEFAULTS.PERFORMANCE.BATCH_DOM_UPDATES,
            batchingDelay: DEFAULTS.PERFORMANCE.BATCHING_DELAY,
        },
        persistForm: DEFAULTS.FORMS.PERSIST_FORMS,
        allowExecute: DEFAULTS.SECURITY.ALLOW_EXECUTE,
    };
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
                    ttl: -1,
                };
            }
            return {
                enabled: storageConfig > 0,
                ttl: storageConfig > 0 ? storageConfig : defaultStorageConfig.ttl,
            };
        }
        if (typeof storageConfig === "object" && storageConfig !== null) {
            return {
                enabled: !!storageConfig.enabled,
                ttl: typeof storageConfig.ttl === "number"
                    ? storageConfig.ttl
                    : defaultStorageConfig.ttl,
            };
        }
        return defaultStorageConfig;
    }
    _state.config = JSON.parse(JSON.stringify(defaultConfig));
    let configQueue = [];
    let isInitialized = false;
    function applyConfigInternal(newConfig) {
        if ("storage" in newConfig) {
            newConfig.storage = normalizeStorageConfig(newConfig.storage, defaultConfig.storage);
        }
        _state.config = deepMerge(JSON.parse(JSON.stringify(_state.config)), newConfig);
        Debug.level = _state.config.debug.level;
        if (typeof htmx !== "undefined") {
            htmx.config.timeout = _state.config.htmx.timeout;
            htmx.config.defaultSwapStyle = _state.config.htmx.swapStyle;
            htmx.config.selfRequestsOnly = _state.config.htmx.selfRequestsOnly;
            htmx.config.ignoreTitle = _state.config.htmx.ignoreTitle;
        }
        if (newConfig.customTags) {
            setCustomTags(newConfig.customTags);
        }
    }
    const ConfigManager = {
        setDefaultConfig(defaultConfig) {
            applyConfigInternal(defaultConfig);
        },
        setConfig(newConfig = {}) {
            if (isInitialized) {
                applyConfigInternal(newConfig);
                Debug.info("FlowPlater configuration updated:", this.getConfig());
            }
            else {
                configQueue.push(newConfig);
            }
        },
        submitQueuedConfig() {
            if (configQueue.length > 0) {
                const finalConfig = configQueue.reduce((acc, config) => deepMerge(acc, config), {});
                applyConfigInternal(finalConfig);
                Debug.info("FlowPlater configuration updated:", this.getConfig());
                configQueue = [];
            }
            isInitialized = true;
        },
        getConfig() {
            return JSON.parse(JSON.stringify(_state.config));
        },
        getDefaultConfig() {
            return JSON.parse(JSON.stringify(defaultConfig));
        },
    };
    Debug.level = _state.config.debug.level;

    function replacer(key, value) {
        if (value instanceof Map) {
            return {
                _dataType: "Map",
                value: Array.from(value.entries()),
            };
        }
        else {
            return value;
        }
    }
    function reviver(key, value) {
        if (typeof value === "object" &&
            value !== null &&
            value._dataType === "Map") {
            return new Map(value.value);
        }
        return value;
    }
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
                dataToStore = JSON.stringify(data, replacer);
            }
            catch (e) {
                Debug.error(`[LocalStorage] Failed to serialize data for key ${storageKey}: ${e.message}`);
                return false;
            }
            const item = {
                data: dataToStore,
                expiry: config.ttl === -1 ? null : Date.now() + config.ttl * 1000,
            };
            Debug.debug(`[LocalStorage] Saving to localStorage:`, {
                key: storageKey,
                item,
            });
            localStorage.setItem(storageKey, JSON.stringify(item));
            return true;
        }
        catch (e) {
            Debug.error(`[LocalStorage] Failed to save to localStorage for key ${key}: ${e.message}`);
            return false;
        }
    }
    function loadFromLocalStorage(key, type = "") {
        try {
            const storageKey = type ? `fp_${type}_${key}` : `fp_${key}`;
            const storedItem = localStorage.getItem(storageKey);
            if (!storedItem) {
                Debug.debug(`[LocalStorage] No stored item found for key: ${storageKey}`);
                return null;
            }
            const item = JSON.parse(storedItem);
            if (item.expiry && item.expiry < Date.now()) {
                Debug.debug(`[LocalStorage] Stored item has expired for key: ${storageKey}`);
                localStorage.removeItem(storageKey);
                return null;
            }
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

    function handleFormStorage(form, state = {}, operation = "save") {
        const useLocal = shouldUseLocalStorage(form);
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
    }
    function getPersistenceSettings(element) {
        let shouldPersist = false;
        let useLocalStorage = false;
        if (AttributeMatcher._hasAttribute(element, "persist")) {
            shouldPersist =
                AttributeMatcher._getRawAttribute(element, "persist") !== "false";
            useLocalStorage =
                AttributeMatcher._getRawAttribute(element, "persist") === "true";
        }
        else {
            const form = element.closest("form");
            if (form && AttributeMatcher._hasAttribute(form, "persist")) {
                shouldPersist =
                    AttributeMatcher._getRawAttribute(form, "persist") !== "false";
                useLocalStorage =
                    AttributeMatcher._getRawAttribute(form, "persist") === "true";
            }
            else if (ConfigManager.getConfig().storage?.enabled &&
                !ConfigManager.getConfig().persistForm) {
                shouldPersist = false;
                useLocalStorage = false;
            }
            else {
                shouldPersist = ConfigManager.getConfig().persistForm;
                useLocalStorage =
                    ConfigManager.getConfig().storage?.enabled &&
                        ConfigManager.getConfig().persistForm;
            }
        }
        if (element instanceof HTMLFormElement) {
            const hasPersistentElements = Array.from(element.elements).some((input) => AttributeMatcher._getRawAttribute(input, "persist") === "true");
            if (hasPersistentElements) {
                useLocalStorage = ConfigManager.getConfig().storage?.enabled;
            }
        }
        return {
            shouldPersist,
            useLocalStorage: useLocalStorage && ConfigManager.getConfig().storage?.enabled,
        };
    }
    function isPersistenceEnabledForElement(element) {
        return getPersistenceSettings(element).shouldPersist;
    }
    function shouldUseLocalStorage(element) {
        return getPersistenceSettings(element).useLocalStorage;
    }

    const FilterPlugin = (customConfig = {}) => {
        const config = {
            name: "filter",
            enabled: DEFAULTS.FILTER.ENABLED,
            priority: DEFAULTS.FILTER.PRIORITY,
            version: DEFAULTS.PLUGINS.DEFAULT_VERSION,
            dependencies: [],
            optionalDependencies: [],
            settings: {
                debug: DEFAULTS.PLUGINS.DEBUG,
            },
            description: "Filters data based on form inputs",
            author: "FlowPlater Team",
        };
        Object.assign(config, customConfig);
        const state = {
            instances: new Map(),
            formTemplates: new Map(),
            formObservers: new Map(),
        };
        function getValueFromPath(obj, path) {
            return path.split(".").reduce((current, key) => {
                if (current === undefined || current === null)
                    return undefined;
                return current[key];
            }, obj);
        }
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
        function setupDynamicFilters(form, path, data) {
            FlowPlater.trigger("filter:beforeDynamicUpdate", form, { path, data });
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
            form
                .querySelectorAll("[fp-filter-key][fp-filter-dynamic]")
                .forEach((element) => {
                const field = element.getAttribute("fp-filter-key");
                const options = generateFilterOptions(array, field || "");
                if (element instanceof HTMLSelectElement) {
                    element.innerHTML = '<option value="">Select tags...</option>';
                    options.forEach((value) => {
                        const option = document.createElement("option");
                        option.value = value;
                        option.textContent = value;
                        element.appendChild(option);
                    });
                    const formState = handleFormStorage(form, {}, "load");
                    if (formState && element.name && formState[element.name]) {
                        if (element.multiple) {
                            Array.from(element.options).forEach((option) => {
                                option.selected =
                                    Array.isArray(formState[element.name]) &&
                                        formState[element.name].includes(option.value);
                            });
                        }
                        else {
                            element.value = formState[element.name];
                        }
                    }
                }
                else {
                    const wrapper = element;
                    if (!wrapper)
                        return;
                    const template = wrapper.children[0];
                    if (!template)
                        return;
                    const preserveDefault = element.hasAttribute("fp-filter-preserve-default");
                    const defaultOption = preserveDefault
                        ? wrapper.children[0].cloneNode(true)
                        : null;
                    wrapper.innerHTML = "";
                    if (preserveDefault && defaultOption) {
                        const defaultInput = defaultOption.querySelector("input");
                        if (defaultInput && defaultInput.type === "radio") {
                            defaultInput.value = "";
                        }
                        wrapper.appendChild(defaultOption);
                    }
                    options.forEach((value) => {
                        const clone = template.cloneNode(true);
                        const input = clone.querySelector("input");
                        if (input) {
                            input.value = value;
                            input.id = `${field}_${value}`;
                            input.name = field || "";
                        }
                        const label = clone.querySelector("label");
                        if (label) {
                            label.setAttribute("for", `${field}_${value}` || "");
                        }
                        function updateTextContent(element, newText) {
                            element.normalize();
                            const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
                                acceptNode: function (node) {
                                    return node.textContent?.trim() || ""
                                        ? NodeFilter.FILTER_ACCEPT
                                        : NodeFilter.FILTER_REJECT;
                                },
                            });
                            const textNode = walker.nextNode();
                            if (textNode) {
                                textNode.textContent = newText;
                            }
                        }
                        if (label) {
                            updateTextContent(label, value);
                        }
                        else {
                            updateTextContent(clone, value);
                        }
                        wrapper.appendChild(clone);
                    });
                    const formState = handleFormStorage(form, {}, "load");
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
            FlowPlater.trigger("filter:dynamicUpdated", form, { path, data });
        }
        function formStateToUrlParams(formState) {
            const params = new URLSearchParams();
            Object.entries(formState).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    if (value.length > 0) {
                        params.set(key, value.join(","));
                    }
                }
                else if (value !== null && value !== undefined && value !== "") {
                    params.set(key, value);
                }
            });
            return params.toString();
        }
        function getFormStateFromUrl() {
            const params = new URLSearchParams(window.location.search);
            const state = {};
            params.forEach((value, key) => {
                if (value.includes(",")) {
                    state[key] = value.split(",").filter(Boolean);
                }
                else {
                    state[key] = value;
                }
            });
            return state;
        }
        function updateUrl(form, formState) {
            if (!form.hasAttribute("fp-filter-usequery"))
                return;
            const params = formStateToUrlParams(formState);
            const newUrl = params
                ? `${window.location.pathname}?${params}`
                : window.location.pathname;
            window.history.replaceState({}, "", newUrl);
        }
        function setupFilterForm(form, instanceName) {
            if (!form || !instanceName)
                return;
            let refreshTimeout;
            const debouncedRefresh = (instance) => {
                clearTimeout(refreshTimeout);
                refreshTimeout = setTimeout(() => {
                    instance._updateDOM();
                }, 25);
            };
            const triggers = (form.getAttribute("fp-filter-triggers") || "change")
                .split(/[\s,]+/)
                .filter(Boolean);
            const handleFormUpdate = (e) => {
                if (!e.isTrusted) {
                    return;
                }
                const formState = {};
                form.querySelectorAll("[fp-filter-key]").forEach((element) => {
                    const key = element.getAttribute("fp-filter-key");
                    if (!key)
                        return;
                    const inputs = element.matches("input, select, textarea")
                        ? [element]
                        : Array.from(element.querySelectorAll("input, select, textarea"));
                    if (inputs.length === 0)
                        return;
                    if (inputs.some((input) => input.type === "checkbox")) {
                        const checkedInputs = inputs.filter((input) => input.checked);
                        formState[key] = checkedInputs.map((input) => input.value);
                    }
                    else if (inputs.some((input) => input.type === "radio")) {
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
                        formState[key] = inputs[0].value || "";
                    }
                });
                FlowPlater.trigger("filter:beforeApply", form, {
                    formState,
                    instanceName,
                });
                FlowPlater.trigger("formState:beforeCapture", form, {
                    formId: form.id,
                    formElement: form,
                    state: formState,
                });
                handleFormStorage(form, formState, "save");
                FlowPlater.trigger("formState:changed", form, {
                    formId: form.id,
                    formElement: form,
                    state: formState,
                    changedElement: e.target,
                });
                if (form.hasAttribute("fp-filter-usequery") &&
                    !form.dataset.fpFilterInitialLoad) {
                    updateUrl(form, formState);
                }
                const instance = FlowPlater.getInstance(instanceName);
                if (instance) {
                    debouncedRefresh(instance);
                }
            };
            triggers.forEach((trigger) => {
                form.addEventListener(trigger, handleFormUpdate);
            });
            if (!state.formObservers.has(instanceName)) {
                const observer = new MutationObserver((mutations) => {
                    let shouldUpdate = false;
                    mutations.forEach((mutation) => {
                        if (mutation.type === "childList") {
                            mutation.addedNodes.forEach((node) => {
                                if (node instanceof HTMLElement &&
                                    (node.matches("[fp-filter-key]") ||
                                        node.querySelector("[fp-filter-key]"))) {
                                    shouldUpdate = true;
                                }
                            });
                        }
                    });
                    if (shouldUpdate) {
                        triggers.forEach((trigger) => {
                            form.addEventListener(trigger, handleFormUpdate);
                        });
                    }
                });
                observer.observe(form, {
                    childList: true,
                    subtree: true,
                });
                state.formObservers.set(instanceName, observer);
            }
            if (form.hasAttribute("fp-filter-usequery")) {
                const formState = getFormStateFromUrl();
                if (formState && Object.keys(formState).length > 0) {
                    form.querySelectorAll("[fp-filter-key]").forEach((element) => {
                        const key = element.getAttribute("fp-filter-key");
                        if (!key || !(key in formState))
                            return;
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
                                input.value = value;
                            }
                        });
                    });
                    form.dataset.fpFilterInitialLoad = "true";
                    handleFormStorage(form, formState, "save");
                    setTimeout(() => {
                        delete form.dataset.fpFilterInitialLoad;
                    }, 100);
                }
            }
        }
        const hooks = {
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
                    if (!state.formTemplates.has(instance.instanceName)) {
                        state.formTemplates.set(instance.instanceName, {
                            formElement: form,
                            originalHTML: form.innerHTML,
                        });
                        setupFilterForm(form, instance.instanceName);
                    }
                    const data = instance.getData();
                    setupDynamicFilters(form, path, data);
                    if (form.hasAttribute("fp-filter-usequery") &&
                        isPersistenceEnabledForElement(form)) {
                        const formState = getFormStateFromUrl();
                        if (formState && Object.keys(formState).length > 0) {
                            form.querySelectorAll("[fp-filter-key]").forEach((element) => {
                                const key = element.getAttribute("fp-filter-key");
                                if (!key || !(key in formState))
                                    return;
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
                                        input.value = value;
                                    }
                                });
                            });
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
            afterDomUpdate: function (instance, _context) {
                if (!instance)
                    return instance;
                const filterForms = document.querySelectorAll(`[fp-filter-instance="${instance.instanceName}"]`);
                if (filterForms.length === 0)
                    return instance;
                filterForms.forEach((form) => {
                    const path = form.getAttribute("fp-filter");
                    if (!path)
                        return;
                    if (!state.formTemplates.has(instance.instanceName)) {
                        state.formTemplates.set(instance.instanceName, {
                            formElement: form,
                            originalHTML: form.innerHTML,
                        });
                        setupFilterForm(form, instance.instanceName);
                    }
                    const data = instance.getData();
                    setupDynamicFilters(form, path, data);
                });
                return instance;
            },
            cleanup: function () {
                state.formObservers.forEach((observer) => {
                    observer.disconnect();
                });
                state.formObservers.clear();
                state.formTemplates.clear();
            },
        };
        function parseDate(value) {
            if (!value)
                return null;
            if (value instanceof Date)
                return value;
            const date = new Date(value);
            return isNaN(date) ? null : date;
        }
        function handleRangeFilter(itemValue, operator, value) {
            if (!value)
                return true;
            if (itemValue instanceof Date || isValidDateString(itemValue)) {
                const itemDate = parseDate(itemValue);
                const compareDate = parseDate(value);
                if (!itemDate || !compareDate)
                    return true;
                switch (operator) {
                    case "min":
                        return itemDate >= compareDate;
                    case "max":
                        return itemDate <= compareDate;
                    default:
                        return true;
                }
            }
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
        function isValidDateString(value) {
            if (typeof value !== "string")
                return false;
            return (/^\d{4}-\d{2}-\d{2}/.test(value) ||
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value));
        }
        function applyFiltersWithFormState(item, formState) {
            return Object.entries(formState).every(([key, filterValue]) => {
                if (filterValue === undefined || filterValue === null || filterValue === '' ||
                    (Array.isArray(filterValue) && filterValue.length === 0)) {
                    return true;
                }
                const [fieldName, operator] = key.split(":");
                const itemValue = getValueFromPath(item, fieldName);
                if (operator) {
                    return handleRangeFilter(itemValue, operator, filterValue);
                }
                if (Array.isArray(filterValue)) {
                    if (filterValue.length === 0)
                        return true;
                    if (Array.isArray(itemValue)) {
                        return filterValue.some((selectedValue) => itemValue.some((v) => v.toString().toLowerCase() === selectedValue.toLowerCase()));
                    }
                    return filterValue.some((selectedValue) => itemValue.toString().toLowerCase() === selectedValue.toLowerCase());
                }
                if (typeof filterValue === 'string') {
                    if (Array.isArray(itemValue)) {
                        return itemValue.some((v) => v.toString().toLowerCase().includes(filterValue.toLowerCase()));
                    }
                    return itemValue.toString().toLowerCase().includes(filterValue.toLowerCase());
                }
                return true;
            });
        }
        const transformers = {
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
                    const formState = handleFormStorage(form, {}, "load") || {};
                    if (Object.keys(formState).length === 0) {
                        form.querySelectorAll("[fp-filter-key]").forEach((element) => {
                            const key = element.getAttribute("fp-filter-key");
                            if (!key)
                                return;
                            const inputs = element.matches("input, select, textarea")
                                ? [element]
                                : Array.from(element.querySelectorAll("input, select, textarea"));
                            if (inputs.length === 0)
                                return;
                            if (inputs.some((input) => input.type === "checkbox")) {
                                const checkedInputs = inputs.filter((input) => input.checked);
                                formState[key] = checkedInputs.map((input) => input.value);
                            }
                            else if (inputs.some((input) => input.type === "radio")) {
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
                                formState[key] = inputs[0].value || "";
                            }
                        });
                    }
                    const filteredArray = filteredData[path].filter((item) => {
                        return applyFiltersWithFormState(item, formState);
                    });
                    if (path.includes(".")) {
                        const pathParts = path.split(".");
                        let current = filteredData;
                        for (let i = 0; i < pathParts.length - 1; i++) {
                            current = current[pathParts[i]];
                        }
                        current[pathParts[pathParts.length - 1]] = filteredArray;
                    }
                    else {
                        filteredData[path] = filteredArray;
                    }
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
