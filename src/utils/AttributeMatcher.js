import { Debug } from "../core/Debug";

export const AttributeMatcher = {
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
    return this._getAllAttributeNames(name).some((attrName) =>
      element.hasAttribute(attrName),
    );
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
  findMatchingElements(
    attributeName,
    value,
    exactMatch = true,
    element = document,
    includeSelf = true,
    getFirst = false,
  ) {
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
        if (
          value === undefined ||
          value === null ||
          (exactMatch ? selfValue === value : selfValue.includes(value))
        ) {
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

  findClosestParent(attributeName, value, exactMatch = true, element) {
    if (!attributeName) {
      Debug.error("Attribute name is required");
      return null;
    }
    if (!element) {
      Debug.error(
        "Element is required to find closest parent (" + attributeName + ")",
      );
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
      if (
        disinherit &&
        (disinherit === "*" || disinherit.split(" ").includes(normalizedName))
      ) {
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
  getElementWithAttribute(
    attributeName,
    element = document,
    includeSelf = true,
  ) {
    if (
      includeSelf &&
      element instanceof Element &&
      this._hasAttribute(element, attributeName)
    ) {
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
   * @param {Node} element - The element to get the root of
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
        if (
          inherit &&
          (inherit === "*" || inherit.split(" ").includes(attributeName))
        ) {
          return attributeValue;
        }
        return null;
      }

      if (
        disinherit &&
        (disinherit === "*" || disinherit.split(" ").includes(attributeName))
      ) {
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
      const value = this._getAttributeValueWithInheritance(
        element,
        ancestor,
        normalizedName,
      );
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
      const value = this._getRawAttribute(
        element,
        `${prefix}${normalizedName}`,
      );
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
