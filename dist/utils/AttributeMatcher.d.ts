import { FlowPlaterElement } from "../types";
export declare const AttributeMatcher: {
    INHERITABLE_ATTRIBUTES: {
        "hx-": string[];
        "fp-": string[];
    };
    _prefixes(): string[];
    _normalizeAttributeName(attributeName: string): string;
    /**
     * Gets all possible attribute names for a given attribute
     * @private
     * @param {string} attributeName - The base attribute name
     * @returns {string[]} Array of all possible attribute names
     */
    _getAllAttributeNames(attributeName: string): string[];
    /**
     * Gets the raw attribute value, checking all possible attribute names
     * @private
     * @param {Element} element - The element to check
     * @param {string} name - The attribute name
     * @returns {string|null} The attribute value or null if not found
     */
    _getRawAttribute(element: HTMLElement, name: string, defaultValue?: string | null): string | null;
    /**
     * Checks if an element has an attribute, checking all possible attribute names
     * @private
     * @param {Element} element - The element to check
     * @param {string} name - The attribute name
     * @returns {boolean} Whether the element has the attribute
     */
    _hasAttribute(element: HTMLElement, name: string): boolean;
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
    findMatchingElements(attributeName: string, value?: string | null, exactMatch?: boolean, element?: Document | FlowPlaterElement, includeSelf?: boolean, getFirst?: boolean): HTMLElement[] | HTMLElement | null;
    findClosestParent(attributeName: string, element: Document | FlowPlaterElement, value?: string | null, exactMatch?: boolean): Element | null;
    /**
     * Gets the first element with a given attribute
     * @param {string} attributeName - The attribute to look for
     * @param {Element} [element=document] - The element to search within
     * @param {boolean} [includeSelf=true] - Whether to include the element itself in the search
     * @returns {Element|null} The first element with the attribute or null if none found
     */
    getElementWithAttribute(attributeName: string, element?: Document | FlowPlaterElement, includeSelf?: boolean): HTMLElement | null;
    /**
     * Gets the parent element, handling Shadow DOM
     * @private
     * @param {Node} element - The element to get the parent of
     * @returns {Node|null} The parent element or null if none
     */
    _parentElement(element: HTMLElement): HTMLElement | ShadowRoot | null;
    /**
     * Gets the root node of an element, handling Shadow DOM
     * @private
     * @param {HTMLElement} element - The element to get the root of
     * @param {boolean} [composed=false] - Whether to get the composed root
     * @returns {Node} The root node
     */
    _getRootNode(element: HTMLElement, composed?: boolean): Document | ShadowRoot | null;
    /**
     * Finds the closest element matching a condition
     * @private
     * @param {Node} element - The element to start from
     * @param {function(Node): boolean} condition - The condition to match
     * @returns {Node|null} The closest matching element or null if none
     */
    _getClosestMatch(element: HTMLElement, condition: (element: HTMLElement) => boolean): HTMLElement | null;
    _attributeMatchesNormalizedName(attributeName: string, normalizedName: string): boolean;
    /**
     * Gets an attribute value with inheritance and disinheritance
     * @private
     * @param {Element} startElement - The element to start from
     * @param {Element} ancestor - The ancestor element to check
     * @param {string} attributeName - The attribute name
     * @returns {string|null} The attribute value or null if not found
     */
    _getAttributeValueWithInheritance(startElement: FlowPlaterElement, ancestor: FlowPlaterElement, attributeName: string): string | null;
    /**
     * Finds the value of an inheritable attribute
     * @param {HTMLElement} element - The element to start searching from
     * @param {string} attributeName - The name of the attribute to find
     * @returns {string|null} The attribute value or null if not found
     */
    findInheritedAttribute(element: HTMLElement, attributeName: string): string | null;
    findAttribute(element: HTMLElement, attributeName: string): string | null;
    _validateAttributeName(attributeName: string): boolean;
    /**
     * Adds an inheritable attribute to the list
     * @param {string} prefix - The prefix to use (hx- or fp-)
     * @param {string} attributeName - The name of the attribute to add
     */
    addInheritableAttribute(prefix: string, attributeName: string): void;
    /**
     * Removes an inheritable attribute from the list
     * @param {string} prefix - The prefix to use (hx- or fp-)
     * @param {string} attributeName - The name of the attribute to remove
     * @returns {boolean} True if the attribute was removed, false if it wasn't found
     */
    removeInheritableAttribute(prefix: string, attributeName: string): boolean;
    isInheritable(attributeName: string): boolean;
};
