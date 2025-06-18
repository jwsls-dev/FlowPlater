import { Debug } from "../core/Debug";
import { FlowPlaterElement } from "../types";

declare const htmx: any;

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

  _normalizeAttributeName(attributeName: string) {
    // Remove any existing prefix
    return attributeName.replace(/^(hx-|fp-)/, "").replace(/^data-/, "");
  },

  /**
   * Gets all possible attribute names for a given attribute
   * @private
   * @param {string} attributeName - The base attribute name
   * @returns {string[]} Array of all possible attribute names
   */
  _getAllAttributeNames(attributeName: string): string[] {
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
  _getRawAttribute(element: HTMLElement, name: string, defaultValue: string | null = null): string | null {
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
  _hasAttribute(element: HTMLElement, name: string): boolean {
    return this._getAllAttributeNames(name).some((attrName: string) =>
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
    attributeName: string,
    value: string | null = null,
    exactMatch: boolean = true,
    element: Document | FlowPlaterElement = document,
    includeSelf: boolean = true,
    getFirst: boolean = false,
  ): HTMLElement[] | HTMLElement | null {
    const attrNames = this._getAllAttributeNames(attributeName);
    let selector = attrNames.map((name: string) => `[${name}]`).join(",");

    if (value !== undefined && value !== null) {
      const valueSelector = exactMatch ? `="${value}"` : `*="${value}"`;
      selector = attrNames.map((name: string) => `[${name}${valueSelector}]`).join(",");
    }

    const results = Array.from(element.querySelectorAll(selector)) as HTMLElement[];

    if (includeSelf && element instanceof Element) {
      const selfValue = this._getRawAttribute(element, attributeName);
      if (selfValue !== null) {
        if (
          value === undefined ||
          value === null ||
          (exactMatch ? selfValue === value : selfValue.includes(value))
        ) {
          results.unshift(element as HTMLElement);
        }
      }
    }

    return value !== undefined && value !== null
      ? getFirst
        ? results[0]
        : results
      : results;
  },

  findClosestParent(attributeName: string, element: Document | FlowPlaterElement, value: string | null = null, exactMatch = true) {
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
    let selector = attrNames.map((name: string) => `[${name}]`).join(",");

    if (value !== undefined && value !== null) {
      const valueSelector = exactMatch ? `="${value}"` : `*="${value}"`;
      selector = attrNames.map((name: string) => `[${name}${valueSelector}]`).join(",");
    }

    let closestElement = (element as HTMLElement).closest(selector);

    // check if there is no disinherit attribute on the closest element
    if (closestElement && this.isInheritable(normalizedName)) {
      const disinherit = this._getRawAttribute(closestElement as FlowPlaterElement, "disinherit");
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
    attributeName: string,
    element: Document | FlowPlaterElement = document,
    includeSelf: boolean = true,
  ): HTMLElement | null {
    if (
      includeSelf &&
      element instanceof Element &&
      this._hasAttribute(element, attributeName)
    ) {
      return element;
    }

    const selectors = this._getAllAttributeNames(attributeName)
      .map((name: string) => `[${name}]`)
      .join(",");

    return element.querySelector(selectors);
  },

  /**
   * Gets the parent element, handling Shadow DOM
   * @private
   * @param {Node} element - The element to get the parent of
   * @returns {Node|null} The parent element or null if none
   */
  _parentElement(element: HTMLElement): HTMLElement | ShadowRoot | null {
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
  _getRootNode(element: HTMLElement, composed: boolean = false): Document | ShadowRoot | null {
    return element.getRootNode ? element.getRootNode({ composed }) as Document | ShadowRoot : document;
  },

  /**
   * Finds the closest element matching a condition
   * @private
   * @param {Node} element - The element to start from
   * @param {function(Node): boolean} condition - The condition to match
   * @returns {Node|null} The closest matching element or null if none
   */
  _getClosestMatch(element: HTMLElement, condition: (element: HTMLElement) => boolean): HTMLElement | null {
    while (element && !condition(element)) {
      element = this._parentElement(element) as FlowPlaterElement;
    }
    return element || null;
  },

  _attributeMatchesNormalizedName(attributeName: string, normalizedName: string) {
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
  _getAttributeValueWithInheritance(startElement: FlowPlaterElement, ancestor: FlowPlaterElement, attributeName: string): string | null {
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
  findInheritedAttribute(element: HTMLElement, attributeName: string): string | null {
    const normalizedName = this._normalizeAttributeName(attributeName);
    let closestValue = null;

    this._getClosestMatch(element, (ancestor: HTMLElement) => {
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

  findAttribute(element: HTMLElement, attributeName: string): string | null {
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

  _validateAttributeName(attributeName: string) {
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
  addInheritableAttribute(prefix: string, attributeName: string) {
    if (!this.INHERITABLE_ATTRIBUTES[prefix as keyof typeof this.INHERITABLE_ATTRIBUTES]) {
      this.INHERITABLE_ATTRIBUTES[prefix as keyof typeof this.INHERITABLE_ATTRIBUTES] = [];
    }
    this.INHERITABLE_ATTRIBUTES[prefix as keyof typeof this.INHERITABLE_ATTRIBUTES].push(attributeName);
  },

  /**
   * Removes an inheritable attribute from the list
   * @param {string} prefix - The prefix to use (hx- or fp-)
   * @param {string} attributeName - The name of the attribute to remove
   * @returns {boolean} True if the attribute was removed, false if it wasn't found
   */
  removeInheritableAttribute(prefix: string, attributeName: string): boolean {
    if (!this.INHERITABLE_ATTRIBUTES[prefix as keyof typeof this.INHERITABLE_ATTRIBUTES]) {
      return false;
    }
    const index = this.INHERITABLE_ATTRIBUTES[prefix as keyof typeof this.INHERITABLE_ATTRIBUTES].indexOf(attributeName);
    if (index === -1) {
      return false;
    }
    this.INHERITABLE_ATTRIBUTES[prefix as keyof typeof this.INHERITABLE_ATTRIBUTES].splice(index, 1);
    return true;
  },

  isInheritable(attributeName: string) {
    const normalizedName = this._normalizeAttributeName(attributeName);
    return Object.values(this.INHERITABLE_ATTRIBUTES)
      .flat()
      .includes(normalizedName);
  },

  /**
   * Find the template element for a given instance name or ID selector
   * @param {string} instanceName - The instance name or ID selector (#elementId)
   * @returns {FlowPlaterElement | null} The template element or null if not found
   * @description Finds the element that has both the matching instance name/ID and the fp-template attribute.
   * This is the "template element" that defines the template for an instance.
   */
  findTemplateElementByInstanceName(instanceName: string): FlowPlaterElement | null {
    // Handle ID selector format (#elementId)
    if (instanceName.startsWith("#")) {
      const elementId = instanceName.slice(1);
      const element = document.getElementById(elementId);
      
      // For ID selectors, the element itself should have the template
      if (element && this._hasAttribute(element as FlowPlaterElement, "template")) {
        return element as FlowPlaterElement;
      }
      return null;
    }
    
    // Handle instance name format - find the template element with this instance name
    // Look for elements that have both fp-instance matching the name AND fp-template
    const allTemplateElements = this.findMatchingElements("template") as FlowPlaterElement[];
    
    if (!Array.isArray(allTemplateElements)) {
      return null;
    }
    
    // Find the template element that also has the matching instance name
    const templateElement = allTemplateElements.find((element: FlowPlaterElement) => {
      const elementInstanceName = this._getRawAttribute(element, "instance");
      return elementInstanceName === instanceName;
    });
    
    return templateElement || null;
  },

  /**
   * Find any element by instance name or ID selector (template or non-template)
   * @param {string} instanceName - The instance name or ID selector (#elementId)
   * @returns {FlowPlaterElement | null} The found element or null if not found
   * @description Finds any element matching the instance name or ID, regardless of whether it has a template.
   * This is useful for finding any element associated with an instance.
   */
  findElementByInstanceName(instanceName: string): FlowPlaterElement | null {
    // Handle ID selector format (#elementId)
    if (instanceName.startsWith("#")) {
      const elementId = instanceName.slice(1);
      const element = document.getElementById(elementId);
      return element as FlowPlaterElement | null;
    }
    
    // Handle instance name format (search by fp-instance attribute)
    const element = this.findMatchingElements(
      "instance",
      instanceName,
      false,
      document,
      false,
      true,
    );
    
    return element as FlowPlaterElement | null;
  },
};
