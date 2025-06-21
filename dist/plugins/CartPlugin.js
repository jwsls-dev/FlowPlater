var CartPlugin = (function () {
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
    function withDefault(value, defaultValue) {
        return value ?? defaultValue;
    }

    /*!
     * currency.js - v2.0.4
     * http://scurker.github.io/currency.js
     *
     * Copyright (c) 2021 Jason Wilson
     * Released under MIT license
     */

    var defaults = {
      symbol: '$',
      separator: ',',
      decimal: '.',
      errorOnInvalid: false,
      precision: 2,
      pattern: '!#',
      negativePattern: '-!#',
      format: format,
      fromCents: false
    };

    var round = function round(v) {
      return Math.round(v);
    };

    var pow = function pow(p) {
      return Math.pow(10, p);
    };

    var rounding = function rounding(value, increment) {
      return round(value / increment) * increment;
    };

    var groupRegex = /(\d)(?=(\d{3})+\b)/g;
    var vedicRegex = /(\d)(?=(\d\d)+\d\b)/g;
    /**
     * Create a new instance of currency.js
     * @param {number|string|currency} value
     * @param {object} [opts]
     */

    function currency(value, opts) {
      var that = this;

      if (!(that instanceof currency)) {
        return new currency(value, opts);
      }

      var settings = Object.assign({}, defaults, opts),
          precision = pow(settings.precision),
          v = parse(value, settings);
      that.intValue = v;
      that.value = v / precision; // Set default incremental value

      settings.increment = settings.increment || 1 / precision; // Support vedic numbering systems
      // see: https://en.wikipedia.org/wiki/Indian_numbering_system

      if (settings.useVedic) {
        settings.groups = vedicRegex;
      } else {
        settings.groups = groupRegex;
      } // Intended for internal usage only - subject to change


      this.s = settings;
      this.p = precision;
    }

    function parse(value, opts) {
      var useRounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var v = 0,
          decimal = opts.decimal,
          errorOnInvalid = opts.errorOnInvalid,
          decimals = opts.precision,
          fromCents = opts.fromCents,
          precision = pow(decimals),
          isNumber = typeof value === 'number',
          isCurrency = value instanceof currency;

      if (isCurrency && fromCents) {
        return value.intValue;
      }

      if (isNumber || isCurrency) {
        v = isCurrency ? value.value : value;
      } else if (typeof value === 'string') {
        var regex = new RegExp('[^-\\d' + decimal + ']', 'g'),
            decimalString = new RegExp('\\' + decimal, 'g');
        v = value.replace(/\((.*)\)/, '-$1') // allow negative e.g. (1.99)
        .replace(regex, '') // replace any non numeric values
        .replace(decimalString, '.'); // convert any decimal values

        v = v || 0;
      } else {
        if (errorOnInvalid) {
          throw Error('Invalid Input');
        }

        v = 0;
      }

      if (!fromCents) {
        v *= precision; // scale number to integer value

        v = v.toFixed(4); // Handle additional decimal for proper rounding.
      }

      return useRounding ? round(v) : v;
    }
    /**
     * Formats a currency object
     * @param currency
     * @param {object} [opts]
     */


    function format(currency, settings) {
      var pattern = settings.pattern,
          negativePattern = settings.negativePattern,
          symbol = settings.symbol,
          separator = settings.separator,
          decimal = settings.decimal,
          groups = settings.groups,
          split = ('' + currency).replace(/^-/, '').split('.'),
          dollars = split[0],
          cents = split[1];
      return (currency.value >= 0 ? pattern : negativePattern).replace('!', symbol).replace('#', dollars.replace(groups, '$1' + separator) + (cents ? decimal + cents : ''));
    }

    currency.prototype = {
      /**
       * Adds values together.
       * @param {number} number
       * @returns {currency}
       */
      add: function add(number) {
        var intValue = this.intValue,
            _settings = this.s,
            _precision = this.p;
        return currency((intValue += parse(number, _settings)) / (_settings.fromCents ? 1 : _precision), _settings);
      },

      /**
       * Subtracts value.
       * @param {number} number
       * @returns {currency}
       */
      subtract: function subtract(number) {
        var intValue = this.intValue,
            _settings = this.s,
            _precision = this.p;
        return currency((intValue -= parse(number, _settings)) / (_settings.fromCents ? 1 : _precision), _settings);
      },

      /**
       * Multiplies values.
       * @param {number} number
       * @returns {currency}
       */
      multiply: function multiply(number) {
        var intValue = this.intValue,
            _settings = this.s;
        return currency((intValue *= number) / (_settings.fromCents ? 1 : pow(_settings.precision)), _settings);
      },

      /**
       * Divides value.
       * @param {number} number
       * @returns {currency}
       */
      divide: function divide(number) {
        var intValue = this.intValue,
            _settings = this.s;
        return currency(intValue /= parse(number, _settings, false), _settings);
      },

      /**
       * Takes the currency amount and distributes the values evenly. Any extra pennies
       * left over from the distribution will be stacked onto the first set of entries.
       * @param {number} count
       * @returns {array}
       */
      distribute: function distribute(count) {
        var intValue = this.intValue,
            _precision = this.p,
            _settings = this.s,
            distribution = [],
            split = Math[intValue >= 0 ? 'floor' : 'ceil'](intValue / count),
            pennies = Math.abs(intValue - split * count),
            precision = _settings.fromCents ? 1 : _precision;

        for (; count !== 0; count--) {
          var item = currency(split / precision, _settings); // Add any left over pennies

          pennies-- > 0 && (item = item[intValue >= 0 ? 'add' : 'subtract'](1 / precision));
          distribution.push(item);
        }

        return distribution;
      },

      /**
       * Returns the dollar value.
       * @returns {number}
       */
      dollars: function dollars() {
        return ~~this.value;
      },

      /**
       * Returns the cent value.
       * @returns {number}
       */
      cents: function cents() {
        var intValue = this.intValue,
            _precision = this.p;
        return ~~(intValue % _precision);
      },

      /**
       * Formats the value as a string according to the formatting settings.
       * @param {boolean} useSymbol - format with currency symbol
       * @returns {string}
       */
      format: function format(options) {
        var _settings = this.s;

        if (typeof options === 'function') {
          return options(this, _settings);
        }

        return _settings.format(this, Object.assign({}, _settings, options));
      },

      /**
       * Formats the value as a string according to the formatting settings.
       * @returns {string}
       */
      toString: function toString() {
        var intValue = this.intValue,
            _precision = this.p,
            _settings = this.s;
        return rounding(intValue / _precision, _settings.increment).toFixed(_settings.precision);
      },

      /**
       * Value for JSON serialization.
       * @returns {float}
       */
      toJSON: function toJSON() {
        return this.value;
      }
    };

    const CartPlugin = (customConfig = {}) => {
        FlowPlater.config({
            storage: {
                enabled: true,
            },
        });
        FlowPlater.log(FlowPlater.logLevels.INFO, "[CartPlugin] Early config executed: Storage enabled.");
        const config = {
            name: "cart",
            enabled: DEFAULTS.CART.ENABLED,
            priority: DEFAULTS.CART.PRIORITY,
            version: DEFAULTS.PLUGINS.DEFAULT_VERSION,
            dependencies: ["data-extractor"],
            optionalDependencies: [],
            settings: {
                debug: DEFAULTS.PLUGINS.DEBUG,
                dataAttribute: DEFAULTS.CART.DATA_ATTRIBUTE,
                group: DEFAULTS.CART.GROUP_NAME,
                requiredKeys: DEFAULTS.CART.REQUIRED_KEYS,
            },
            description: "Shopping cart functionality for FlowPlater",
            author: "FlowPlater Team",
            currency: {
                name: DEFAULTS.CART.CURRENCY.NAME,
                symbol: DEFAULTS.CART.CURRENCY.SYMBOL,
                precision: DEFAULTS.CART.CURRENCY.PRECISION,
                separator: DEFAULTS.CART.CURRENCY.SEPARATOR,
                decimal: DEFAULTS.CART.CURRENCY.DECIMAL,
                ...customConfig.currency,
            },
            taxRates: DEFAULTS.CART.TAX_RATES,
            locale: withDefault(customConfig.locale, DEFAULTS.CART.LOCALE),
        };
        Object.assign(config, customConfig);
        const _generateCartItemId = (productData, actionElement) => {
            const baseId = productData?.id;
            if (baseId === undefined || baseId === null) {
                FlowPlater.log(FlowPlater.logLevels.ERROR, "[CartPlugin] Cannot generate cart item ID: Base product ID is missing.", productData);
                return null;
            }
            const variantKeyAttr = actionElement
                ? AttributeMatcher._getRawAttribute(actionElement, "cart-variant-key", null)
                : null;
            if (!variantKeyAttr) {
                return baseId.toString();
            }
            const variantKeys = variantKeyAttr
                .split(",")
                .map((k) => k.trim())
                .sort();
            if (variantKeys.length === 0) {
                return baseId.toString();
            }
            const variantParts = [];
            let hasAnyValue = false;
            for (const key of variantKeys) {
                if (!productData.hasOwnProperty(key)) {
                    continue;
                }
                const value = productData[key];
                if (value !== null && value !== undefined && value !== "") {
                    hasAnyValue = true;
                    if (typeof value === "string" || typeof value === "number") {
                        variantParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
                    }
                    else {
                        FlowPlater.log(FlowPlater.logLevels.WARN, `[CartPlugin] Variant key '${key}' has non-primitive value, skipping for ID generation:`, value);
                    }
                }
            }
            if (!hasAnyValue) {
                return baseId.toString();
            }
            return `${baseId}::${variantParts.join(";")}`;
        };
        const state = {
            cart: {
                items: new Map(),
                totalItems: 0,
                totalPrice: 0,
                totalDiscount: 0,
                totalTax: 0,
                totalAmount: 0,
                totalItemsFmt: "",
                totalPriceFmt: "",
                totalDiscountFmt: "",
                totalTaxFmt: "",
                totalAmountFmt: "",
            },
            observers: new Map(),
        };
        const updateAllProductStates = () => {
            const elements = AttributeMatcher.findMatchingElements("data", config.settings.dataAttribute);
            (Array.isArray(elements) ? elements : elements ? [elements] : []).forEach((productElement) => {
                if (productElement.closest(`[fp-group="${config.settings.group}"]`)) {
                    return;
                }
                const productData = processHtml(productElement);
                if (!productData)
                    return;
                const addButton = productElement.querySelector("[fp-cart-add]");
                const cartItemId = _generateCartItemId(productData, addButton);
                const cartItem = state.cart.items.get(cartItemId);
                const amountInput = productElement.querySelector("[fp-cart-item-amount]");
                const removeButton = productElement.querySelector("[fp-cart-remove]");
                const currentAmount = cartItem?.amount || 0;
                const stock = productData.stock === undefined || productData.stock === null
                    ? Infinity
                    : productData.stock;
                const totalInCart = getTotalAmountForProduct(productData.id);
                const atMaxStock = totalInCart >= stock;
                const atMinStock = currentAmount <= 0;
                if (amountInput) {
                    amountInput.value = currentAmount;
                    amountInput.min = "0";
                    const remainingStock = Math.max(0, stock - (totalInCart - currentAmount));
                    amountInput.max = remainingStock;
                }
                if (addButton) {
                    let disableAdd = atMaxStock;
                    if (stock === 1 && totalInCart === 1) {
                        const baseId = productData.id?.toString();
                        const cartHasDifferentVariant = Array.from(state.cart.items.keys()).some((id) => id.split("::")[0] === baseId && id !== cartItemId);
                        if (cartHasDifferentVariant) {
                            disableAdd = false;
                        }
                    }
                    addButton.disabled = disableAdd;
                    if (addButton.disabled) {
                        addButton.classList.add("fp-disabled");
                    }
                    else {
                        addButton.classList.remove("fp-disabled");
                    }
                }
                if (removeButton) {
                    let showRemove = !atMinStock;
                    const hasBaseIdOnly = state.cart.items.has(productData.id?.toString());
                    const isBaseIdOnly = cartItemId === productData.id?.toString();
                    if (hasBaseIdOnly && isBaseIdOnly) {
                        showRemove = true;
                    }
                    removeButton.disabled = !showRemove;
                    if (!showRemove) {
                        removeButton.classList.add("fp-disabled");
                    }
                    else {
                        removeButton.classList.remove("fp-disabled");
                    }
                }
            });
            FlowPlater.trigger("cart:productStatesUpdated", null, {});
        };
        const serializeCart = () => {
            const items = Array.from(state.cart.items.values()).map((item) => ({
                ...item,
                amountFmt: item.amountFmt,
                unitPriceFmt: item.unitPriceFmt,
                totalPriceFmt: item.totalPriceFmt,
                discountFmt: item.discountFmt,
                totalDiscountFmt: item.totalDiscountFmt,
                taxFmt: item.taxFmt,
            }));
            return {
                items,
                totalItems: state.cart.totalItems,
                totalItemsFmt: state.cart.totalItemsFmt,
                totalPrice: state.cart.totalPrice,
                totalPriceFmt: state.cart.totalPriceFmt,
                totalDiscount: state.cart.totalDiscount,
                totalDiscountFmt: state.cart.totalDiscountFmt,
                totalTax: state.cart.totalTax,
                totalTaxFmt: state.cart.totalTaxFmt,
                totalAmount: state.cart.totalAmount,
                totalAmountFmt: state.cart.totalAmountFmt,
            };
        };
        const deserializeCart = (data) => {
            if (!data) {
                state.cart.items = new Map();
                state.cart.totalItems = 0;
                state.cart.totalPrice = 0;
                state.cart.totalDiscount = 0;
                state.cart.totalTax = 0;
                state.cart.totalAmount = 0;
                FlowPlater.log(FlowPlater.logLevels.DEBUG, "[CartPlugin] State reset in deserializeCart (no data).");
                return;
            }
            const newItemsMap = new Map();
            if (Array.isArray(data.items)) {
                data.items.forEach((item) => {
                    if (item && item.cartItemId !== undefined) {
                        newItemsMap.set(item.cartItemId, item);
                    }
                    else if (item && item.id !== undefined) {
                        FlowPlater.log(FlowPlater.logLevels.WARN, "[CartPlugin] Cart item missing cartItemId during deserialization. Using base id as fallback key.", item);
                        newItemsMap.set(item.id, item);
                    }
                });
            }
            state.cart.items = newItemsMap;
            state.cart.totalItems = data.totalItems || 0;
            state.cart.totalPrice = data.totalPrice || 0;
            state.cart.totalDiscount = data.totalDiscount || 0;
            state.cart.totalTax = data.totalTax || 0;
            state.cart.totalAmount = data.totalAmount || 0;
            FlowPlater.log(FlowPlater.logLevels.DEBUG, "[CartPlugin] State after deserializeCart:", state.cart);
        };
        const findProductElement = (target) => {
            let productElement = AttributeMatcher.findClosestParent("data", target, config.settings.dataAttribute, true);
            return productElement;
        };
        function sanitizePrice(price) {
            if (typeof price === "number")
                return price;
            if (!price)
                return 0;
            let priceStr = price.toString().trim();
            priceStr = priceStr.replace(/[^\d.,\- ]/g, "");
            try {
                return currency(priceStr, {
                    separator: config.currency.separator,
                    decimal: config.currency.decimal,
                }).value;
            }
            catch (e) {
                return 0;
            }
        }
        const calculateDiscountedPrice = (price, discount) => {
            const sanitizedPrice = sanitizePrice(price);
            if (!discount)
                return sanitizedPrice;
            if (typeof discount === "string" && discount.endsWith("%")) {
                const percentage = parseFloat(discount) / 100;
                return sanitizedPrice * (1 - percentage);
            }
            return Math.max(0, sanitizedPrice - sanitizePrice(discount));
        };
        const getCartItemAmount = (cartItemId) => {
            const item = state.cart.items.get(cartItemId);
            return item ? item.amount : 0;
        };
        const getTotalAmountForProduct = (baseId) => {
            let totalAmount = 0;
            state.cart.items.forEach((item) => {
                const itemBaseId = item.cartItemId.split("::")[0];
                if (itemBaseId === baseId.toString()) {
                    totalAmount += item.amount;
                }
            });
            return totalAmount;
        };
        const updateCartTotals = () => {
            let totalItems = 0;
            let totalPrice = 0;
            let totalDiscount = 0;
            let totalTax = 0;
            let totalAmount = 0;
            const prevTotalItems = state.cart.totalItems;
            state.cart.items.forEach((item) => {
                totalItems += item.amount;
                const itemPrice = sanitizePrice(item.price) || 0;
                const itemDiscount = item.discount || "0";
                const discountedPrice = calculateDiscountedPrice(itemPrice, itemDiscount);
                const itemTotalWithoutTax = discountedPrice * item.amount;
                const itemTaxRate = config.taxRates.find((rate) => rate.name.toLowerCase() === item.taxRate?.toLowerCase())?.value || config.taxRates[0].value;
                const itemTotalWithTax = itemTotalWithoutTax * itemTaxRate;
                totalPrice += itemPrice * item.amount;
                totalDiscount += (itemPrice - discountedPrice) * item.amount;
                totalTax += itemTotalWithTax - itemTotalWithoutTax;
            });
            totalAmount = totalPrice - totalDiscount + totalTax;
            state.cart.totalItems = totalItems;
            state.cart.totalPrice = totalPrice;
            state.cart.totalDiscount = totalDiscount;
            state.cart.totalTax = totalTax;
            state.cart.totalAmount = totalAmount;
            state.cart.totalItemsFmt = state.cart.totalItems.toString();
            state.cart.totalPriceFmt = formatNumber(state.cart.totalPrice, {
                currencySymbol: config.currency.symbol,
            });
            state.cart.totalDiscountFmt = formatNumber(state.cart.totalDiscount, {
                currencySymbol: config.currency.symbol,
            });
            state.cart.totalTaxFmt = formatNumber(state.cart.totalTax, {
                currencySymbol: config.currency.symbol,
            });
            state.cart.totalAmountFmt = formatNumber(state.cart.totalAmount, {
                currencySymbol: config.currency.symbol,
            });
            const elementsNotInCart = AttributeMatcher.findMatchingElements("data", config.settings.dataAttribute);
            (Array.isArray(elementsNotInCart) ? elementsNotInCart : elementsNotInCart ? [elementsNotInCart] : []).forEach((productElement) => {
                if (productElement.closest(`[fp-group="${config.settings.group}"]`)) {
                    const productData = processHtml(productElement);
                    if (productData) {
                        const cartItem = Array.from(state.cart.items.values()).find((item) => item.id === productData.id &&
                            (!item.cartItemId ||
                                item.cartItemId ===
                                    productElement.getAttribute("fp-cart-item-id")));
                        if (cartItem && cartItem.cartItemId) {
                            productElement.setAttribute("fp-cart-item-id", cartItem.cartItemId);
                        }
                    }
                    return;
                }
                const productData = processHtml(productElement);
                if (!productData)
                    return;
                const addButton = productElement.querySelector("[fp-cart-add]");
                const removeButton = productElement.querySelector("[fp-cart-remove]");
                const amountInput = productElement.querySelector("[fp-cart-item-amount]");
                const cartItemId = _generateCartItemId(productData, addButton);
                const cartAmount = getCartItemAmount(cartItemId);
                const stock = productData.stock === undefined || productData.stock === null
                    ? Infinity
                    : productData.stock;
                const atMaxStock = cartAmount >= stock;
                const atMinStock = cartAmount <= 0;
                if (addButton)
                    addButton.disabled = atMaxStock;
                if (removeButton)
                    removeButton.disabled = atMinStock;
                if (amountInput) {
                    amountInput.value = cartAmount;
                    amountInput.min = "0";
                    amountInput.max = stock;
                }
            });
            const cartTotalCountElements = AttributeMatcher.findMatchingElements("cart-total-count");
            (Array.isArray(cartTotalCountElements) ? cartTotalCountElements : cartTotalCountElements ? [cartTotalCountElements] : []).forEach((el) => {
                el.textContent = totalItems.toString();
            });
            const cartTotalPriceElements = AttributeMatcher.findMatchingElements("cart-total-price");
            (Array.isArray(cartTotalPriceElements) ? cartTotalPriceElements : cartTotalPriceElements ? [cartTotalPriceElements] : []).forEach((el) => {
                el.textContent = totalPrice.toFixed(2);
            });
            const cartTotalDiscountElements = AttributeMatcher.findMatchingElements("cart-total-discount");
            (Array.isArray(cartTotalDiscountElements) ? cartTotalDiscountElements : cartTotalDiscountElements ? [cartTotalDiscountElements] : []).forEach((el) => {
                el.textContent = totalDiscount.toFixed(2);
            });
            const cartTotalTaxElements = AttributeMatcher.findMatchingElements("cart-total-tax");
            (Array.isArray(cartTotalTaxElements) ? cartTotalTaxElements : cartTotalTaxElements ? [cartTotalTaxElements] : []).forEach((el) => {
                el.textContent = totalTax.toFixed(2);
            });
            const cartTotalAmountElements = AttributeMatcher.findMatchingElements("cart-total-amount");
            (Array.isArray(cartTotalAmountElements) ? cartTotalAmountElements : cartTotalAmountElements ? [cartTotalAmountElements] : []).forEach((el) => {
                el.textContent = totalAmount.toFixed(2);
            });
            const cartData = serializeCart();
            FlowPlater.updateGroup(config.settings.group, cartData);
            FlowPlater.trigger("cart:updated", null, { cart: state.cart });
            document
                .querySelectorAll(`[fp-group="${config.settings.group}"] [fp-cart-remove]`)
                .forEach((removeButton) => {
                removeButton.disabled = false;
            });
            updateAllProductStates();
            if (prevTotalItems !== totalItems) {
                FlowPlater.trigger("cart:amountUpdated", null, {
                    oldCount: prevTotalItems,
                    newCount: totalItems,
                });
            }
        };
        function formatNumber(value, options = {}) {
            if (typeof value !== "number" || isNaN(value))
                return "";
            return currency(value, {
                symbol: options.currencySymbol !== undefined
                    ? options.currencySymbol
                    : config.currency.symbol || "",
                separator: config.currency.separator,
                decimal: config.currency.decimal,
                precision: options.mantissa !== undefined
                    ? options.mantissa
                    : config.currency.precision,
            }).format();
        }
        const addToCart = (product, amount = 1, actionElement = null) => {
            const missingFields = config.settings.requiredKeys
                .filter((key) => !(key in product))
                .join(", ");
            if (missingFields) {
                FlowPlater.log(FlowPlater.logLevels.ERROR, `[CartPlugin] Product missing required fields: ${missingFields}`);
                return;
            }
            const cartItemId = _generateCartItemId(product, actionElement);
            if (!cartItemId)
                return;
            const existingItem = state.cart.items.get(cartItemId);
            const maxStock = product.stock === undefined || product.stock === null
                ? Infinity
                : product.stock;
            const totalInCart = getTotalAmountForProduct(product.id);
            if (maxStock === 1 && totalInCart === 1 && !existingItem) {
                let existingVariantId = null;
                state.cart.items.forEach((item, id) => {
                    if (id.split("::")[0] === product.id.toString()) {
                        existingVariantId = id;
                    }
                });
                if (existingVariantId) {
                    const oldVariant = state.cart.items.get(existingVariantId);
                    state.cart.items.delete(existingVariantId);
                    state.cart.items.set(cartItemId, {
                        ...product,
                        cartItemId: cartItemId,
                        amount: 1,
                        amountFmt: currency(1).format(),
                        unitPrice: oldVariant.price,
                        unitPriceFmt: formatNumber(oldVariant.price),
                        totalPrice: oldVariant.price,
                        totalPriceFmt: formatNumber(oldVariant.price),
                        discount: oldVariant.discount,
                        discountFmt: formatNumber(oldVariant.discount),
                        totalDiscount: oldVariant.discount * 1,
                        totalDiscountFmt: formatNumber(oldVariant.discount * 1),
                        tax: oldVariant.tax,
                        taxFmt: formatNumber(oldVariant.tax),
                        taxRate: oldVariant.taxRate || config.taxRates[0].name,
                    });
                    FlowPlater.log(FlowPlater.logLevels.INFO, `[CartPlugin] Replaced variant ${existingVariantId} with ${cartItemId} (stock: 1)`);
                    FlowPlater.trigger("cart:variantReplaced", null, {
                        oldVariantId: existingVariantId,
                        newVariantId: cartItemId,
                        product: product,
                    });
                    updateCartTotals();
                    return;
                }
            }
            const remainingStock = Math.max(0, maxStock - totalInCart);
            if (existingItem) {
                const currentAmount = existingItem.amount;
                const newAmount = Math.min(currentAmount + amount, currentAmount + remainingStock);
                if (newAmount === currentAmount)
                    return;
                existingItem.amount = newAmount;
            }
            else {
                const initialAmount = Math.min(amount, remainingStock);
                if (initialAmount <= 0)
                    return;
                const unitPrice = sanitizePrice(product.price) || 0;
                const discount = sanitizePrice(product.discount) || 0;
                const tax = config.taxRates.find((rate) => rate.name.toLowerCase() === product.taxRate?.toLowerCase())?.value || config.taxRates[0].value;
                state.cart.items.set(cartItemId, {
                    ...product,
                    cartItemId: cartItemId,
                    amount: initialAmount,
                    amountFmt: initialAmount.toString(),
                    unitPrice: unitPrice,
                    unitPriceFmt: formatNumber(unitPrice),
                    totalPrice: unitPrice * initialAmount,
                    totalPriceFmt: formatNumber(unitPrice * initialAmount),
                    discount: discount,
                    discountFmt: formatNumber(discount),
                    totalDiscount: discount * initialAmount,
                    totalDiscountFmt: formatNumber(discount * initialAmount),
                    tax: (unitPrice * initialAmount - discount * initialAmount) * (tax - 1),
                    taxFmt: formatNumber((unitPrice * initialAmount - discount * initialAmount) * (tax - 1)),
                    taxRate: product.taxRate || config.taxRates[0].name,
                });
                FlowPlater.trigger("cart:productAdded", null, { product, cartItemId });
            }
            updateCartTotals();
        };
        const removeFromCart = (productData, actionElement = null) => {
            const cartItemId = _generateCartItemId(productData, actionElement);
            if (!cartItemId)
                return;
            state.cart.items.delete(cartItemId);
            FlowPlater.trigger("cart:productRemoved", null, {
                productData,
                cartItemId,
            });
            updateCartTotals();
        };
        const _performVariantMerge = (baseData) => {
            const settings = config.settings;
            const variantKey = settings.variantKey || "variant";
            const variantIdKey = settings.variantIdKey || "id";
            const variantSelectorKey = settings.variantSelectorKey || "selected-variant";
            const variants = baseData[variantKey];
            const selectorValue = baseData[variantSelectorKey];
            if (!Array.isArray(variants) || variants.length === 0) {
                if (baseData.hasOwnProperty(variantSelectorKey)) {
                    delete baseData[variantSelectorKey];
                }
                return baseData;
            }
            if (typeof selectorValue !== "string" &&
                typeof selectorValue !== "number") {
                FlowPlater.log(FlowPlater.logLevels.WARN, `[CartPlugin] Invalid or missing value for selector key '${variantSelectorKey}'. Expected string or number, got:`, selectorValue);
                delete baseData[variantKey];
                if (baseData.hasOwnProperty(variantSelectorKey)) {
                    delete baseData[variantSelectorKey];
                }
                return baseData;
            }
            const selectedVariant = variants.find((variant) => variant &&
                variant[variantIdKey]?.toString() === selectorValue.toString());
            if (!selectedVariant) {
                FlowPlater.log(FlowPlater.logLevels.WARN, `[CartPlugin] No variant found with ${variantIdKey} matching selector value:`, selectorValue);
                delete baseData[variantKey];
                if (baseData.hasOwnProperty(variantSelectorKey)) {
                    delete baseData[variantSelectorKey];
                }
                return baseData;
            }
            const mergedData = { ...baseData };
            delete mergedData[variantKey];
            delete mergedData[variantSelectorKey];
            Object.assign(mergedData, selectedVariant);
            FlowPlater.log(FlowPlater.logLevels.DEBUG, "[CartPlugin] Variant merged", {
                baseData,
                selectedVariant,
                mergedData,
            });
            return mergedData;
        };
        const processHtml = (html) => {
            FlowPlater.log(FlowPlater.logLevels.INFO, "Processing HTML", html);
            let productData = null;
            try {
                productData =
                    FlowPlater.getPlugin("data-extractor").instanceMethods.extractData(html);
            }
            catch (e) {
                FlowPlater.log(FlowPlater.logLevels.ERROR, "[CartPlugin] Failed to extract data using DataExtractorPlugin.", e);
                return null;
            }
            if (!productData || Object.keys(productData).length === 0) {
                FlowPlater.log(FlowPlater.logLevels.WARN, "[CartPlugin] Data extraction yielded no data.", html);
                return null;
            }
            const dataToProcess = productData[config.settings.dataAttribute] || productData;
            const mergedData = _performVariantMerge(dataToProcess);
            return mergedData;
        };
        const updateAmount = (productData, amount, actionElement = null) => {
            const cartItemId = _generateCartItemId(productData, actionElement);
            if (!cartItemId)
                return;
            const item = state.cart.items.get(cartItemId);
            if (!item) {
                FlowPlater.log(FlowPlater.logLevels.DEBUG, `[CartPlugin] updateAmount called for non-existent item: ${cartItemId}. No action taken.`);
                return;
            }
            const maxAmount = item.stock === undefined || item.stock === null ? Infinity : item.stock;
            const newAmount = Math.min(Math.max(0, amount), maxAmount);
            if (newAmount === 0) {
                FlowPlater.log(FlowPlater.logLevels.DEBUG, `[CartPlugin] updateAmount: Removing item ${cartItemId} (newAmount is 0).`);
                removeFromCart(productData, actionElement);
            }
            else if (newAmount !== item.amount) {
                FlowPlater.log(FlowPlater.logLevels.DEBUG, `[CartPlugin] updateAmount: Updating item ${cartItemId} from ${item.amount} to ${newAmount}.`);
                item.amount = newAmount;
                updateCartTotals();
            }
            else {
                FlowPlater.log(FlowPlater.logLevels.DEBUG, `[CartPlugin] updateAmount: Item ${cartItemId} amount (${item.amount}) unchanged.`);
            }
        };
        const setupProductObserver = (element) => {
            if (state.observers.has(element))
                return;
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if ((mutation.type === "attributes" &&
                        AttributeMatcher._attributeMatchesNormalizedName(mutation.attributeName, "data")) ||
                        (mutation.type === "characterData" &&
                            AttributeMatcher._hasAttribute(mutation.target.parentElement, "data"))) {
                        const productData = processHtml(element);
                        const cartItem = state.cart.items.get(productData.id);
                        if (cartItem) {
                            Object.assign(cartItem, productData);
                            updateCartTotals();
                        }
                    }
                }
            });
            observer.observe(element, {
                attributes: true,
                attributeFilter: AttributeMatcher._getAllAttributeNames("data"),
                characterData: true,
                subtree: true,
            });
            state.observers.set(element, observer);
        };
        const hooks = {
            initComplete: function (flowplater) {
                const group = FlowPlater.getOrCreateGroup(config.settings.group, {});
                if (group && group.data) {
                    FlowPlater.log(FlowPlater.logLevels.DEBUG, "[CartPlugin] Calling deserializeCart with group data:", group.data);
                    deserializeCart(group.data);
                }
                else {
                    FlowPlater.log(FlowPlater.logLevels.WARN, "[CartPlugin] No group or group data found in initComplete.");
                    deserializeCart(null);
                }
                const radioElements = AttributeMatcher.findMatchingElements("data", config.settings.dataAttribute);
                (Array.isArray(radioElements) ? radioElements : radioElements ? [radioElements] : []).forEach((productElement) => {
                    const radios = Array.from(productElement.querySelectorAll('input[type="radio"]'));
                    const radioGroups = {};
                    radios.forEach((radio) => {
                        if (!radio.name)
                            return;
                        if (!radioGroups[radio.name])
                            radioGroups[radio.name] = [];
                        radioGroups[radio.name].push(radio);
                    });
                    Object.values(radioGroups).forEach((group) => {
                        if (!group.some((radio) => radio.checked)) {
                            group[0].checked = true;
                        }
                    });
                });
                const setupCartEventListeners = () => {
                    document
                        .querySelectorAll("[fp-cart-add], [fp-cart-remove], [fp-cart-item-amount]")
                        .forEach((element) => {
                        element.removeEventListener("click", handleCartClick);
                        element.removeEventListener("change", handleCartChange);
                        element.removeEventListener("input", handleCartInput);
                    });
                    document.removeEventListener("click", handleDelegatedClick);
                    document.removeEventListener("change", handleDelegatedChange);
                    document.removeEventListener("input", handleDelegatedInput);
                    document.addEventListener("click", handleDelegatedClick);
                    document.addEventListener("change", handleDelegatedChange);
                    document.addEventListener("input", handleDelegatedInput);
                    updateAllProductStates();
                };
                const handleDelegatedClick = (e) => {
                    const element = e.target.closest("[fp-cart-add], [fp-cart-remove]");
                    if (!element)
                        return;
                    e.preventDefault();
                    e.stopPropagation();
                    const isAdd = element.hasAttribute("fp-cart-add");
                    const isRemove = element.hasAttribute("fp-cart-remove");
                    if (isAdd || isRemove) {
                        const productElement = findProductElement(element);
                        if (!productElement)
                            return;
                        const isInCart = productElement.closest(`[fp-group="${config.settings.group}"]`);
                        if (isRemove && isInCart) {
                            let cartItemId = productElement.getAttribute("fp-data-cart-item-id");
                            if (!cartItemId) {
                                const productData = processHtml(productElement);
                                if (productData) {
                                    const variantKeys = Object.keys(productData).filter((key) => key !== "id" &&
                                        key !== "amount" &&
                                        key !== "price" &&
                                        key !== "stock" &&
                                        key !== "cartItemId" &&
                                        !config.settings.requiredKeys.includes(key));
                                    const mockAddButton = document.createElement("button");
                                    mockAddButton.setAttribute("fp-cart-variant-key", variantKeys.join(","));
                                    cartItemId = _generateCartItemId(productData, mockAddButton);
                                }
                            }
                            if (cartItemId) {
                                FlowPlater.log(FlowPlater.logLevels.DEBUG, `[CartPlugin] Remove button clicked for cart item: ${cartItemId}`);
                                state.cart.items.delete(cartItemId);
                                updateCartTotals();
                                return;
                            }
                        }
                        const productData = processHtml(productElement);
                        if (!productData) {
                            FlowPlater.log(FlowPlater.logLevels.ERROR, "[CartPlugin] Could not extract product data.", { element: productElement });
                            return;
                        }
                        const addButton = productElement.querySelector("[fp-cart-add]");
                        const variantKeyAttr = addButton
                            ? AttributeMatcher._getRawAttribute(addButton, "cart-variant-key", null)
                            : null;
                        if (variantKeyAttr) {
                            const variantKeys = variantKeyAttr
                                .split(",")
                                .map((k) => k.trim())
                                .filter(Boolean);
                            const missingVariant = variantKeys.some((key) => !productData[key]);
                            if (missingVariant) {
                                FlowPlater.log(FlowPlater.logLevels.WARN, `[CartPlugin] Cannot add to cart: Not all variant options are selected.`, { variantKeys, productData });
                                addButton.classList.add("fp-variant-missing");
                                setTimeout(() => addButton.classList.remove("fp-variant-missing"), 1000);
                                return;
                            }
                        }
                        if (isAdd) {
                            const amountInput = productElement.querySelector("[fp-cart-item-amount]");
                            let amountToAdd = 1;
                            if (amountInput) {
                                const parsedAmount = parseInt(amountInput.value);
                                if (!isNaN(parsedAmount) && parsedAmount > 0) {
                                    amountToAdd = parsedAmount;
                                }
                            }
                            const cartItemId = _generateCartItemId(productData, addButton);
                            FlowPlater.log(FlowPlater.logLevels.DEBUG, `[CartPlugin] Add button clicked for ${cartItemId}, amount from input: ${amountToAdd}`);
                            addToCart(productData, amountToAdd, addButton);
                        }
                        else if (isRemove) {
                            const cartItemId = _generateCartItemId(productData, addButton);
                            FlowPlater.log(FlowPlater.logLevels.DEBUG, `[CartPlugin] Remove button clicked for product: ${cartItemId}`);
                            removeFromCart(productData, addButton);
                        }
                    }
                };
                const handleDelegatedChange = (e) => {
                    const element = e.target.closest("[fp-cart-item-amount]");
                    if (element) {
                        e.preventDefault();
                        e.stopPropagation();
                        const productElement = findProductElement(element);
                        if (productElement) {
                            const productData = processHtml(productElement);
                            if (!productData) {
                                FlowPlater.log(FlowPlater.logLevels.ERROR, "[CartPlugin] Could not extract product data on change.", { element: productElement });
                                return;
                            }
                            const addButton = productElement.querySelector("[fp-cart-add]");
                            const cartItemId = _generateCartItemId(productData, addButton);
                            FlowPlater.log(FlowPlater.logLevels.DEBUG, `[CartPlugin] Input changed for ${cartItemId}, new value: ${element.value}`);
                            updateAmount(productData, parseInt(element.value) || 0, addButton);
                        }
                        return;
                    }
                    const productElement = findProductElement(e.target);
                    if (productElement) {
                        updateAllProductStates();
                    }
                };
                const handleDelegatedInput = (e) => {
                    const element = e.target.closest("[fp-cart-item-amount]");
                    if (!element)
                        return;
                    const productElement = findProductElement(element);
                    if (productElement) {
                        const productData = processHtml(productElement);
                        if (!productData)
                            return;
                        const addButton = productElement.querySelector("[fp-cart-add]");
                        const cartItemId = _generateCartItemId(productData, addButton);
                        FlowPlater.log(FlowPlater.logLevels.DEBUG, `[CartPlugin] Input changed for ${cartItemId}, new value: ${element.value}`);
                        updateAmount(productData, parseInt(element.value) || 0, addButton);
                    }
                };
                const handleCartClick = () => { };
                const handleCartChange = () => { };
                const handleCartInput = () => { };
                setupCartEventListeners();
                FlowPlater.on("afterDomUpdate", setupCartEventListeners);
                const matchingProductElements = AttributeMatcher.findMatchingElements("data", config.settings.dataAttribute);
                (Array.isArray(matchingProductElements) ? matchingProductElements : matchingProductElements ? [matchingProductElements] : []).forEach((element) => {
                    setupProductObserver(element);
                });
                updateCartTotals();
                if (config.settings.debug) {
                    FlowPlater.log(FlowPlater.logLevels.INFO, "[CartPlugin] Initialized successfully");
                }
                return flowplater;
            },
        };
        const getCartItemsAsString = (includeKeys) => {
            const items = Array.from(state.cart.items.values());
            return items
                .map((item) => {
                let keysToInclude;
                if (Array.isArray(includeKeys) && includeKeys.length > 0) {
                    keysToInclude = includeKeys;
                }
                else {
                    const cartItemId = item.cartItemId || "";
                    let variantKeys = [];
                    if (cartItemId.includes("::")) {
                        const variantPart = cartItemId.split("::")[1];
                        variantKeys = variantPart
                            .split(";")
                            .map((pair) => decodeURIComponent(pair.split("=")[0]))
                            .filter(Boolean);
                    }
                    keysToInclude = [...variantKeys, "price"];
                }
                let variantString = "";
                if (keysToInclude.length > 0) {
                    variantString = keysToInclude
                        .filter((key) => key in item)
                        .map((key) => `${key}: ${item[key]}`)
                        .join(", ");
                }
                return variantString ? `${item.name} (${variantString})` : item.name;
            })
                .join(", ");
        };
        if (typeof FlowPlater.getCartItemsAsString !== "function") {
            FlowPlater.getCartItemsAsString = getCartItemsAsString;
        }
        return {
            config,
            state,
            hooks,
            globalMethods: {
                getCartItemsAsString,
            },
        };
    };

    return CartPlugin;

})();
