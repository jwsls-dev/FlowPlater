/**!

 @license FlowPlater - https://flowplater.io
 Copyright (c) 2024 - 2025, FlowPlater | JWSLS | https://jwsls.io

Libraries used:
-   Handlebars.js v4.7.8+ | Copyright (C) 2011-2019 by Yehuda Katz | https://handlebarsjs.com
-   htmx v1.9.9+ | (c) 2020 by Big Sky Software LLC | https://htmx.org

This software and associated documentation (collectively, the "Software") are proprietary to
FlowPlater. Use of the Software is governed by the terms of this license agreement ("Agreement").
By installing, copying, or otherwise using the Software, you agree to be bound by the terms 
of this Agreement.

1.  Grant of License: Subject to the terms of this Agreement, FlowPlater grants you a non-exclusive, 
    non-transferable license to use the Software for personal or commercial purposes. You may not 
    redistribute, sublicense, or resell the Software without prior written consent from FlowPlater.

2.  Restrictions: You may not modify, reverse engineer, decompile, or disassemble the Software, 
    except to the extent that such activity is expressly permitted by applicable law notwithstanding 
    this limitation.

3.  Open Source Libraries: The Software includes open-source libraries Handlebars.js v4.7.8+ (MIT 
    License) and htmx v1.9.9+ (BSD License), which are used under the terms of their respective 
    licenses. These libraries are sublicensed to you under the terms of their original licenses, 
    and not under the terms of this Agreement.

4.  No Warranty: The Software is provided "as is" without any warranty of any kind, either expressed 
    or implied, including but not limited to any implied warranties of merchantability, fitness for 
    a particular purpose, or non-infringement.

5.  Limitation of Liability: In no event shall FlowPlater or its licensors be liable for any damages 
    (including, without limitation, lost profits, business interruption, or lost information) arising 
    out of the use of or inability to use the Software, even if FlowPlater has been advised of the 
    possibility of such damages.

6.  Termination: This Agreement shall terminate automatically if you fail to comply with its terms 
    and conditions. Upon termination, you must destroy all copies of the Software.

7.  General: This Agreement constitutes the entire agreement between you and FlowPlater concerning 
    the Software and supersedes any prior or contemporaneous communications.

BY USING THE SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT, AND AGREE 
TO BE BOUND BY ITS TERMS AND CONDITIONS. THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Handlebars and htmx are included below. Flowplater is located at the bottom of the file.

--------------------------------

BSD 2-Clause License

@license htmx - https://htmx.org
Copyright (c) 2020, Big Sky Software
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

--------------------------------

MIT License

@license Handlebars.js - https://handlebarsjs.com
Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


*/

var FlowPlater = (function () {
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
            if (stack !== undefined) {
                this.stack = stack;
            }
        }
    }
    class TemplateError extends FlowPlaterError {
        constructor(message, templateId) {
            super(`Template Error${templateId !== undefined ? ` in ${templateId}` : ''}: ${message}`);
            this.name = "TemplateError";
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

    const Performance = {
        marks: {},
        start: function (label) {
            this.marks[label] = performance.now();
        },
        end: function (label) {
            if (!this.marks[label])
                return;
            const duration = performance.now() - this.marks[label];
            delete this.marks[label];
            Debug.debug(`${label} took ${duration.toFixed(2)}ms`);
            return duration;
        },
        getDuration: function (label) {
            if (!this.marks[label])
                return 0;
            return performance.now() - this.marks[label];
        },
    };

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
    // Helper functions for state management
    function getInstance(instanceName) {
        return _state.instances[instanceName];
    }
    function getInstances() {
        return _state.instances;
    }

    /**
     * @typedef {Object} ReadyState
     * @property {boolean} isReady - Whether FlowPlater is ready
     * @property {Function[]} queue - Queue of functions to execute when ready
     * @property {Set<string>} plugins - Set of registered plugin names
     * @property {Function} processQueue - Process all queued functions
     */
    /**
     * Manages FlowPlater's ready state and initialization queue
     */
    const _readyState = {
        isReady: false,
        queue: [],
        plugins: new Set(),
        hasPluginsRegistered: false,
        /**
         * Process all queued functions in order
         */
        processQueue() {
            Debug.debug(`Processing ${this.queue.length} queued operations`);
            while (this.queue.length > 0) {
                const fn = this.queue.shift();
                try {
                    fn();
                }
                catch (error) {
                    Debug.error("Error processing queued operation:", error);
                }
            }
        },
        /**
         * Add a function to the queue or execute immediately if ready
         * @param {Function} fn - Function to queue or execute
         */
        enqueue(fn) {
            if (this.isReady) {
                try {
                    fn();
                }
                catch (error) {
                    Debug.error("Error executing operation:", error);
                }
            }
            else {
                this.queue.push(fn);
            }
        },
        /**
         * Mark FlowPlater as ready and process queue
         */
        markReady() {
            // If no plugins have been registered at all, that's fine
            if (this.plugins.size === 0 && !this.hasPluginsRegistered) {
                Debug.info("No plugins registered, proceeding with initialization");
            }
            this.isReady = true;
            this.processQueue();
        },
        /**
         * Register a plugin and mark that we have plugins
         * @param {string} pluginName - Name of the plugin being registered
         */
        registerPlugin(pluginName) {
            this.hasPluginsRegistered = true;
            this.plugins.add(pluginName);
            Debug.debug(`Plugin registered: ${pluginName}, total plugins: ${this.plugins.size}`);
        },
        /**
         * Unregister a plugin from the ready state
         * @param {string} pluginName - Name of the plugin to unregister
         * @returns {boolean} True if the plugin was unregistered, false if it wasn't registered
         */
        unregisterPlugin(pluginName) {
            const wasRemoved = this.plugins.delete(pluginName);
            if (wasRemoved) {
                Debug.debug(`Plugin unregistered: ${pluginName}, remaining plugins: ${this.plugins.size}`);
                // If this was the last plugin and we're resetting, update hasPluginsRegistered
                if (this.plugins.size === 0) {
                    this.hasPluginsRegistered = false;
                    Debug.debug("All plugins unregistered, reset plugin registration state");
                }
            }
            else {
                Debug.warn(`Attempted to unregister non-existent plugin: ${pluginName}`);
            }
            return wasRemoved;
        },
        /**
         * Reset the ready state completely
         * @param {boolean} [maintainReadyStatus=true] - Whether to maintain the ready status
         */
        reset(maintainReadyStatus = true) {
            this.queue = [];
            this.plugins.clear();
            this.hasPluginsRegistered = false;
            // Only reset ready status if explicitly requested
            if (!maintainReadyStatus) {
                this.isReady = false;
                Debug.info("ReadyState completely reset, FlowPlater needs re-initialization");
            }
            else {
                Debug.info("ReadyState reset but maintains ready status for new plugins");
            }
        },
        /**
         * Complete cleanup of FlowPlater state
         * This should only be called when completely shutting down FlowPlater
         */
        cleanup() {
            this.reset(false);
            Debug.info("FlowPlater ReadyState cleaned up completely");
        },
    };

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
        /**
         * Find the template element for a given instance name or ID selector
         * @param {string} instanceName - The instance name or ID selector (#elementId)
         * @returns {FlowPlaterElement | null} The template element or null if not found
         * @description Finds the element that has both the matching instance name/ID and the fp-template attribute.
         * This is the "template element" that defines the template for an instance.
         *
         * Note: For existing instances, it's more efficient to use instance.getTemplateElement()
         * instead of calling this method, as it avoids DOM searches.
         */
        findTemplateElementByInstanceName(instanceName) {
            // Handle ID selector format (#elementId)
            if (instanceName.startsWith("#")) {
                const elementId = instanceName.slice(1);
                const element = document.getElementById(elementId);
                // For ID selectors, the element itself should have the template
                if (element && this._hasAttribute(element, "template")) {
                    return element;
                }
                return null;
            }
            // Handle instance name format - find the template element with this instance name
            // Look for elements that have both fp-instance matching the name AND fp-template
            const allTemplateElements = this.findMatchingElements("template");
            if (!Array.isArray(allTemplateElements)) {
                return null;
            }
            // Find the template element that also has the matching instance name
            const templateElement = allTemplateElements.find((element) => {
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
        findElementByInstanceName(instanceName) {
            // Handle ID selector format (#elementId)
            if (instanceName.startsWith("#")) {
                const elementId = instanceName.slice(1);
                const element = document.getElementById(elementId);
                return element;
            }
            // Handle instance name format (search by fp-instance attribute)
            const element = this.findMatchingElements("instance", instanceName, false, document, false, true);
            return element;
        },
    };

    // Version management utilities
    const VersionManager = {
        parseVersion(version) {
            return version.split(".").map(Number);
        },
        compareVersions(v1, v2) {
            const v1Parts = this.parseVersion(v1);
            const v2Parts = this.parseVersion(v2);
            for (let i = 0; i < 3; i++) {
                if (v1Parts[i] > v2Parts[i])
                    return 1;
                if (v1Parts[i] < v2Parts[i])
                    return -1;
            }
            return 0;
        },
        satisfiesVersion(required, actual) {
            if (!required || !actual)
                return false;
            // Handle @ syntax (e.g., "plugin@2.1")
            // @ts-ignore
            const [pluginName, version] = required.split("@");
            if (!version)
                return true; // No version requirement
            return this.compareVersions(actual, version) >= 0;
        },
    };
    const PluginManager = {
        plugins: new Map(),
        globalMethods: new Map(),
        instanceMethods: new Map(),
        customTransformers: new Map(), // Store custom transformers by type (Map<string, NamedTransformer[]>)
        // Helper method to execute initComplete hook for a plugin
        _executeInitCompleteHook(pluginInstance) {
            if (pluginInstance.hooks?.initComplete) {
                try {
                    pluginInstance.hooks.initComplete(window.FlowPlater ? window.FlowPlater : undefined, Object.values(_state.instances));
                }
                catch (error) {
                    Debug.error(`Plugin ${pluginInstance.config.name} failed executing initComplete:`, error);
                }
            }
        },
        registerPlugin(plugin, config = {}) {
            let pluginFunction;
            if (typeof plugin === "string") {
                pluginFunction = window[plugin];
            }
            else {
                pluginFunction = plugin;
            }
            if (!pluginFunction) {
                throw new FlowPlaterError(`Plugin not found: ${plugin}`);
            }
            if (typeof pluginFunction !== "function") {
                throw new FlowPlaterError("Plugin must be a valid function");
            }
            const pluginInstance = pluginFunction(config);
            // Validate required config fields
            const requiredFields = ["name", "enabled", "priority", "version"];
            for (const field of requiredFields) {
                if (!(field in pluginInstance.config)) {
                    throw new FlowPlaterError(`Plugin config must contain '${field}'`);
                }
            }
            // Validate version format
            if (!/^\d+\.\d+\.\d+$/.test(pluginInstance.config.version)) {
                throw new FlowPlaterError(`Plugin version must be in format 'x.y.z' (got ${pluginInstance.config.version})`);
            }
            if (this.plugins.has(pluginInstance.config.name)) {
                throw new FlowPlaterError(`Plugin ${pluginInstance.config.name} already registered`);
            }
            // Check dependencies
            if (pluginInstance.config.dependencies) {
                for (const dep of pluginInstance.config.dependencies) {
                    const [depName, depVersion] = dep.split("@");
                    const depPlugin = this.getPlugin(depName);
                    if (!depPlugin) {
                        throw new FlowPlaterError(`Required dependency '${depName}' not found for plugin ${pluginInstance.config.name}`);
                    }
                    if (!VersionManager.satisfiesVersion(dep, depPlugin.config.version)) {
                        throw new FlowPlaterError(`Plugin ${pluginInstance.config.name} requires ${depName} version ${depVersion || "any"}, but found version ${depPlugin.config.version}`);
                    }
                }
            }
            // Check optional dependencies
            if (pluginInstance.config.optionalDependencies) {
                for (const dep of pluginInstance.config.optionalDependencies) {
                    const [depName, depVersion] = dep.split("@");
                    const depPlugin = this.getPlugin(depName);
                    if (depPlugin &&
                        !VersionManager.satisfiesVersion(dep, depPlugin.config.version)) {
                        Debug.warn(`Optional dependency '${depName}' version mismatch for plugin ${pluginInstance.config.name}. Required: ${depVersion || "any"}, Found: ${depPlugin.config.version}`);
                    }
                }
            }
            // Handle inheritable attributes
            if (pluginInstance.inheritableAttributes &&
                Array.isArray(pluginInstance.inheritableAttributes)) {
                pluginInstance.inheritableAttributes.forEach((attributeName) => {
                    AttributeMatcher.addInheritableAttribute("fp-", attributeName);
                });
            }
            // Add to ready state tracking
            _readyState.registerPlugin(pluginInstance.config.name);
            // Register methods and helpers immediately
            if (pluginInstance.globalMethods) {
                for (const [methodName, method] of Object.entries(pluginInstance.globalMethods)) {
                    if (typeof method !== "function") {
                        throw new FlowPlaterError(`Global method ${methodName} must be a function`);
                    }
                    if (this.globalMethods.has(methodName)) {
                        const existing = this.globalMethods.get(methodName);
                        throw new FlowPlaterError(`Global method ${methodName} already registered by plugin ${existing.plugin}`);
                    }
                    this.globalMethods.set(methodName, {
                        method,
                        plugin: pluginInstance.config.name,
                    });
                    if (window.FlowPlater) {
                        window.FlowPlater[methodName] = (...args) => this.executeGlobalMethod(methodName, ...args);
                    }
                }
            }
            if (pluginInstance.instanceMethods) {
                for (const [methodName, method] of Object.entries(pluginInstance.instanceMethods)) {
                    if (typeof method !== "function") {
                        throw new FlowPlaterError(`Instance method ${methodName} must be a function`);
                    }
                    if (this.instanceMethods.has(methodName)) {
                        const existing = this.instanceMethods.get(methodName);
                        throw new FlowPlaterError(`Instance method ${methodName} already registered by plugin ${existing.plugin}`);
                    }
                    this.instanceMethods.set(methodName, {
                        method,
                        plugin: pluginInstance.config.name,
                    });
                }
            }
            if (pluginInstance.helpers && typeof pluginInstance.helpers === "object") {
                for (const [helperName, helper] of Object.entries(pluginInstance.helpers)) {
                    if (typeof helper !== "function") {
                        Debug.warn(`Plugin ${pluginInstance.config.name} contains invalid helper ${helperName}:`, helper);
                        continue;
                    }
                    try {
                        Handlebars.registerHelper(helperName.toLowerCase(), helper);
                    }
                    catch (error) {
                        Debug.error(`Plugin ${pluginInstance.config.name} failed registering helper ${helperName}:`, error);
                    }
                }
            }
            // Store the plugin instance
            this.plugins.set(pluginInstance.config.name, pluginInstance);
            // Queue initialization if FlowPlater isn't ready yet
            if (!_readyState.isReady) {
                _readyState.queue.push(() => {
                    if (pluginInstance.config?.enabled &&
                        typeof pluginInstance.init === "function") {
                        pluginInstance.init();
                    }
                    // Update existing instances with new plugin methods
                    this.updateExistingInstances();
                    // Execute initComplete hook
                    this._executeInitCompleteHook(pluginInstance);
                });
            }
            else {
                // Initialize immediately if FlowPlater is ready
                if (pluginInstance.config?.enabled &&
                    typeof pluginInstance.init === "function") {
                    pluginInstance.init();
                }
                this.updateExistingInstances();
                this._executeInitCompleteHook(pluginInstance);
            }
            return pluginInstance;
        },
        updateExistingInstances() {
            // Get all instances
            const instances = Object.values(_state.instances);
            // For each instance, add any missing plugin methods
            instances.forEach((instance) => {
                // @ts-ignore
                for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
                    if (!instance[methodName]) {
                        instance[methodName] = (...args) => this.executeInstanceMethod(methodName, instance, ...args);
                    }
                }
            });
        },
        getPlugin(name) {
            return this.plugins.get(name);
        },
        getAllPlugins() {
            return Array.from(this.plugins.values());
        },
        getEnabledPlugins() {
            return this.getAllPlugins().filter((plugin) => plugin.config?.enabled);
        },
        removePlugin(name) {
            const plugin = this.getPlugin(name);
            if (!plugin) {
                return false;
            }
            // Remove inheritable attributes
            if (plugin.inheritableAttributes &&
                Array.isArray(plugin.inheritableAttributes)) {
                plugin.inheritableAttributes.forEach((attributeName) => {
                    AttributeMatcher.removeInheritableAttribute("fp-", attributeName);
                });
            }
            // Store methods to remove before deleting from maps
            const methodsToRemove = new Set();
            for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
                if (methodInfo.plugin === name) {
                    methodsToRemove.add(methodName);
                }
            }
            // Remove global methods
            for (const [methodName, methodInfo] of this.globalMethods.entries()) {
                if (methodInfo.plugin === name) {
                    this.globalMethods.delete(methodName);
                    // Remove method from FlowPlater object
                    if (window.FlowPlater) {
                        delete window.FlowPlater[methodName];
                    }
                }
            }
            // Remove instance methods from the manager
            for (const [methodName, methodInfo] of this.instanceMethods.entries()) {
                if (methodInfo.plugin === name) {
                    this.instanceMethods.delete(methodName);
                }
            }
            // Remove instance methods from all instances
            const instances = Object.values(_state.instances);
            instances.forEach((instance) => {
                methodsToRemove.forEach((methodName) => {
                    delete instance[methodName];
                });
            });
            // Unregister from ready state
            _readyState.unregisterPlugin(name);
            return this.plugins.delete(name);
        },
        disablePlugin(name) {
            const plugin = this.getPlugin(name);
            if (!plugin)
                return false;
            plugin.config.enabled = false;
            return true;
        },
        enablePlugin(name) {
            const plugin = this.getPlugin(name);
            if (!plugin)
                return false;
            plugin.config.enabled = true;
            // Initialize if not already initialized
            if (typeof plugin.init === "function" && !plugin.state?.initialized) {
                plugin.init();
                plugin.state.initialized = true;
            }
            return true;
        },
        pluginConfig(name) {
            const plugin = this.getPlugin(name);
            if (!plugin)
                return null;
            return plugin.config;
        },
        // Helper method to sort plugins by priority
        getSortedPlugins() {
            return this.getEnabledPlugins().sort((a, b) => {
                const priorityA = a.config?.priority || 0;
                const priorityB = b.config?.priority || 0;
                return priorityB - priorityA; // Higher priority first
            });
        },
        // Helper function to determine if data is JSON or HTML
        _determineDataType(data) {
            // If it's already an object, it's JSON
            if (typeof data === "object" && data !== null) {
                return "json";
            }
            // If it's a string, try to parse it as JSON
            if (typeof data === "string") {
                try {
                    JSON.parse(data);
                    return "json";
                }
                catch (e) {
                    // If it's not parseable as JSON, assume it's HTML
                    return "html";
                }
            }
            // For any other type, assume it's JSON
            return "json";
        },
        // Apply transformations from all enabled plugins in priority order
        applyTransformations(instance, data, transformationType, dataType = "json") {
            // Validate instance
            if (!instance || typeof instance !== "object") {
                Debug.error("Invalid instance provided to applyTransformations");
                return data;
            }
            Debug.debug(`[Transform] Starting ${transformationType}`, {
                instance: instance.instanceName,
                isEvent: data instanceof Event,
                dataType: typeof data,
                isProxy: data && typeof data === "object" && "toJSON" in data,
            });
            // Get plugins in priority order
            const plugins = this.getSortedPlugins();
            // Apply each plugin's transformation if it exists
            let transformedData = plugins.reduce((transformedData, plugin) => {
                // Check if plugin has transformers and the specific transformation type
                if (plugin.transformers &&
                    typeof plugin.transformers[transformationType] === "function") {
                    try {
                        Debug.debug(`[Transform] Applying ${plugin.config.name}'s ${transformationType}`, {
                            dataType: typeof transformedData,
                            isEvent: transformedData instanceof Event,
                        });
                        // Apply the transformation
                        const transformerFn = plugin.transformers[transformationType];
                        const result = transformerFn?.(instance, transformedData, dataType);
                        // If the result is undefined or null, return the original data
                        if (result === undefined || result === null) {
                            Debug.warn(`Plugin ${plugin.config.name} returned undefined/null for ${transformationType}, using original data`);
                            return transformedData;
                        }
                        // For event transformations, ensure we preserve the event object structure
                        if (transformedData instanceof Event && result instanceof Event) {
                            // For events, we want to preserve the event object but update its properties
                            Object.assign(transformedData.detail, result.detail);
                            return transformedData;
                        }
                        Debug.debug(`[Transform] ${plugin.config.name}'s transform result:`, {
                            resultType: typeof result,
                            isEvent: result instanceof Event,
                            isProxy: result && typeof result === "object" && "toJSON" in result,
                        });
                        return result;
                    }
                    catch (error) {
                        Debug.error(`Plugin ${plugin.config.name} failed executing ${transformationType} transformation:`, error);
                        return transformedData; // Return unmodified data if transformation fails
                    }
                }
                return transformedData;
            }, data);
            // Apply custom transformers after plugin transformers
            const customTransformers = this.customTransformers.get(transformationType) || [];
            if (customTransformers.length > 0) {
                Debug.debug(`[Transform] Applying ${customTransformers.length} custom transformers for ${transformationType}`);
            }
            transformedData = customTransformers.reduce((transformedData, namedTransformer, index) => {
                try {
                    Debug.debug(`[Transform] Applying custom transformer '${namedTransformer.name}' (${index + 1}/${customTransformers.length})`, {
                        dataType: typeof transformedData,
                        isEvent: transformedData instanceof Event,
                    });
                    // Apply the custom transformation with the instance context
                    const result = namedTransformer.fn.call(null, instance, transformedData, dataType);
                    // If the result is undefined or null, return the original data
                    if (result === undefined || result === null) {
                        Debug.warn(`Custom transformer '${namedTransformer.name}' returned undefined/null for ${transformationType}, using original data`);
                        return transformedData;
                    }
                    // For event transformations, ensure we preserve the event object structure
                    if (transformedData instanceof Event && result instanceof Event) {
                        // For events, we want to preserve the event object but update its properties
                        Object.assign(transformedData.detail, result.detail);
                        return transformedData;
                    }
                    Debug.debug(`[Transform] Custom transformer '${namedTransformer.name}' result:`, {
                        resultType: typeof result,
                        isEvent: result instanceof Event,
                        isProxy: result && typeof result === "object" && "toJSON" in result,
                    });
                    return result;
                }
                catch (error) {
                    Debug.error(`Custom transformer '${namedTransformer.name}' failed executing ${transformationType} transformation:`, error);
                    return transformedData; // Return unmodified data if transformation fails
                }
            }, transformedData);
            Debug.debug(`[Transform] Completed ${transformationType}`, {
                finalDataType: typeof transformedData,
                isEvent: transformedData instanceof Event,
                isProxy: transformedData &&
                    typeof transformedData === "object" &&
                    "toJSON" in transformedData,
            });
            return transformedData;
        },
        // Add a custom transformer function for a specific transformation type
        addTransformer(transformationType, transformerFn, transformerName) {
            if (typeof transformerFn !== "function") {
                throw new FlowPlaterError("Transformer must be a function");
            }
            // Generate automatic name if not provided
            if (!transformerName) {
                // Get existing transformer count for this type
                const existingTransformers = this.customTransformers.get(transformationType) || [];
                transformerName = `${transformationType}_${existingTransformers.length + 1}_${Date.now()}`;
            }
            // Validate transformer function signature based on type
            const fnStr = transformerFn.toString();
            if (transformationType === "transformRequest") {
                if (!fnStr.includes("instance") || !fnStr.includes("evt")) {
                    Debug.warn("Request transformer function should accept (instance, evt) parameters");
                }
            }
            else if (transformationType === "transformResponse") {
                if (!fnStr.includes("instance") || !(fnStr.includes("response") || fnStr.includes("data"))) {
                    Debug.warn("Response transformer function should accept (instance, response, dataType) parameters");
                }
            }
            else {
                if (!fnStr.includes("instance") || !fnStr.includes("data")) {
                    Debug.warn("Transformer function should accept (instance, data, dataType) parameters");
                }
            }
            // Initialize array for this transformation type if it doesn't exist
            if (!this.customTransformers.has(transformationType)) {
                this.customTransformers.set(transformationType, []);
            }
            // Check if a transformer with this name already exists
            const existingTransformers = this.customTransformers.get(transformationType);
            const existingIndex = existingTransformers.findIndex((t) => t.name === transformerName);
            if (existingIndex !== -1) {
                // Replace existing transformer with same name
                existingTransformers[existingIndex] = { name: transformerName, fn: transformerFn };
                Debug.debug(`Replaced custom transformer '${transformerName}' for ${transformationType}`);
            }
            else {
                // Add new transformer
                existingTransformers.push({ name: transformerName, fn: transformerFn });
                Debug.debug(`Added custom transformer '${transformerName}' for ${transformationType}`);
            }
            return this; // For method chaining
        },
        // Remove a custom transformer function by name
        removeTransformer(transformationType, transformerName) {
            if (!this.customTransformers.has(transformationType)) {
                return false;
            }
            const transformers = this.customTransformers.get(transformationType);
            const index = transformers.findIndex((t) => t.name === transformerName);
            if (index === -1) {
                Debug.warn(`Transformer '${transformerName}' not found for type '${transformationType}'`);
                return false;
            }
            transformers.splice(index, 1);
            // Remove the transformation type if no transformers left
            if (transformers.length === 0) {
                this.customTransformers.delete(transformationType);
            }
            Debug.debug(`Removed custom transformer '${transformerName}' for ${transformationType}`);
            return true;
        },
        // Clear all custom transformers for a specific type
        clearTransformers(transformationType) {
            if (!transformationType) {
                // Clear all transformers if no type specified
                this.customTransformers.clear();
                Debug.debug("Cleared all custom transformers");
            }
            else {
                this.customTransformers.delete(transformationType);
                Debug.debug(`Cleared custom transformers for ${transformationType}`);
            }
            return this;
        },
        // List all custom transformers
        listTransformers(transformationType) {
            if (transformationType) {
                return this.customTransformers.get(transformationType) || [];
            }
            else {
                const result = {};
                for (const [type, transformers] of this.customTransformers.entries()) {
                    result[type] = transformers;
                }
                return result;
            }
        },
        executeHook(hookName, ...args) {
            Debug.debug("[PLUGIN] Executing hook:", hookName, args);
            const plugins = this.getSortedPlugins();
            let result = args[0]; // Store initial value
            for (const plugin of plugins) {
                if (plugin.hooks?.[hookName]) {
                    try {
                        const hookFn = plugin.hooks?.[hookName];
                        const hookResult = hookFn?.(...args);
                        // Allow hooks to modify the value
                        if (hookResult !== undefined) {
                            result = hookResult;
                            args[0] = result; // Update for next plugin
                        }
                        else {
                            // If hook returns undefined, use the previous result
                            Debug.warn(`Plugin ${plugin.config.name} returned undefined for ${hookName}`, args[0]);
                            result = args[0];
                        }
                    }
                    catch (error) {
                        Debug.error(`Plugin ${plugin.config.name} failed executing ${hookName}:`, error);
                        // Continue with other plugins
                    }
                }
            }
            return result;
        },
        // Execute a global method
        executeGlobalMethod(methodName, ...args) {
            const methodInfo = this.globalMethods.get(methodName);
            if (!methodInfo) {
                throw new FlowPlaterError(`Global method ${methodName} not found`);
            }
            const plugin = this.getPlugin(methodInfo.plugin);
            if (!plugin || !plugin.config?.enabled) {
                throw new FlowPlaterError(`Plugin ${methodInfo.plugin} is not enabled`);
            }
            return methodInfo.method.call(plugin, ...args);
        },
        // Execute an instance method
        executeInstanceMethod(methodName, instance, ...args) {
            const methodInfo = this.instanceMethods.get(methodName);
            if (!methodInfo) {
                throw new FlowPlaterError(`Instance method ${methodName} not found`);
            }
            const plugin = this.getPlugin(methodInfo.plugin);
            if (!plugin || !plugin.config?.enabled) {
                throw new FlowPlaterError(`Plugin ${methodInfo.plugin} is not enabled`);
            }
            return methodInfo.method(instance, ...args);
        },
        async destroyPlugin(name) {
            const plugin = this.getPlugin(name);
            if (!plugin)
                return false;
            if (typeof plugin.destroy === "function") {
                await plugin.destroy();
            }
            return this.removePlugin(name);
        },
        async destroyAll() {
            const plugins = this.getAllPlugins();
            await Promise.all(plugins.map((plugin) => typeof plugin.destroy === "function" ? plugin.destroy() : null));
            plugins.forEach((plugin) => _readyState.unregisterPlugin(plugin.config.name));
            // Clear plugin manager state
            this.plugins.clear();
            this.globalMethods.clear();
            this.instanceMethods.clear();
            Debug.info("All plugins destroyed, FlowPlater remains ready for new plugins");
        },
    };

    function memoize(fn) {
        const cache = new Map();
        const memoized = (...args) => {
            const key = JSON.stringify(args);
            if (cache.has(key))
                return cache.get(key);
            const result = fn(...args);
            cache.set(key, result);
            return result;
        };
        memoized.original = fn;
        memoized.cache = cache;
        return memoized;
    }

    // Default customTags - can be overridden via meta config in init()
    const customTagList = [{ tag: "fpselect", replaceWith: "select" }];
    let currentCustomTags = customTagList; // Use default list initially - override in init()
    function setCustomTags(tags) {
        currentCustomTags = tags;
    }
    function replaceCustomTags(element) {
        let replaced = false;
        // Replace all custom tags in a single pass
        for (const tag of currentCustomTags) {
            const elements = element.getElementsByTagName(tag.tag);
            if (elements.length > 0) {
                replaced = true;
                // Convert to array since the live HTMLCollection will change as we replace elements
                const elementsArray = Array.from(elements);
                for (const customElement of elementsArray) {
                    const newElement = document.createElement(tag.replaceWith);
                    newElement.innerHTML = customElement.innerHTML;
                    // Copy all attributes from the custom element to the new element
                    for (const attr of customElement.attributes) {
                        newElement.setAttribute(attr.name, attr.value);
                    }
                    // Replace the custom element with the new element
                    customElement.parentNode?.replaceChild(newElement, customElement);
                }
            }
        }
        if (replaced) {
            Debug.info("replaced custom tags", element);
        }
        return element;
    }

    /**
     * Data transformation utilities for FlowPlater
     */
    /**
     * Creates a deep proxy that tracks nested object changes
     * @param target - The object to proxy
     * @param handler - Function to call when changes occur
     * @returns Proxied object that tracks deep changes
     */
    function createDeepProxy(target, handler) {
        if (typeof target !== "object" || target === null) {
            return target;
        }
        const proxyHandler = {
            get(target, property) {
                const value = target[property];
                return value && typeof value === "object"
                    ? createDeepProxy(value, handler)
                    : value;
            },
            set(target, property, value) {
                target[property] = value;
                // Execute handler but don't block on it
                Promise.resolve().then(() => handler(target));
                return true;
            },
            deleteProperty(target, property) {
                delete target[property];
                // Execute handler but don't block on it
                Promise.resolve().then(() => handler(target));
                return true;
            },
        };
        return new Proxy(target, proxyHandler);
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

    /**
     * Centralized default configuration values for FlowPlater
     * This file consolidates all scattered default values to improve maintainability
     */
    // Core FlowPlater defaults
    const DEFAULTS = {
        // Template system
        TEMPLATE: {
            CACHE_SIZE: 100,
            PRECOMPILE: true,
            ANONYMOUS_INSTANCE_NAME: "anonymous",
            SELF_TEMPLATE_ID: "self",
        },
        // Animation settings  
        ANIMATION: {
            ENABLED: true,
            DURATION: 300,
        },
        // Debug and logging
        DEBUG: {
            LEVEL: 1, // Production default
            DEVELOPMENT_LEVEL: 3, // Development/localhost default
        },
        // HTMX integration
        HTMX: {
            TIMEOUT: 10000,
            SWAP_STYLE: "innerHTML",
            SELF_REQUESTS_ONLY: false,
            IGNORE_TITLE: true,
            DEFAULT_TRIGGER: "mouseover", // For preload
            SWAP_DELAY: 0,
            SETTLE_DELAY: 0,
            TRANSITION: false,
        },
        // Storage configuration
        STORAGE: {
            ENABLED: false,
            TTL: 30 * 24 * 60 * 60, // 30 days in seconds
            INFINITE_TTL: -1,
        },
        // Performance settings
        PERFORMANCE: {
            BATCH_DOM_UPDATES: true,
            BATCHING_DELAY: 0, // 0 uses requestAnimationFrame
            DEBOUNCE_DELAY: 0,
        },
        // Form handling
        FORMS: {
            PERSIST_FORMS: true,
            DEFAULT_SOURCE: "unknown",
            TRIGGER_EVENTS: "change",
            EXCLUDED_INPUT_TYPES: ["file"],
            CHECKBOX_RADIO_TYPES: ["checkbox", "radio"],
            TEXT_INPUT_TYPES: ["text"],
            FORM_INPUT_TYPES: ["INPUT", "SELECT", "TEXTAREA"],
        },
        // Plugin system
        PLUGINS: {
            DEFAULT_PRIORITY: 0,
            DEFAULT_VERSION: "1.0.0",
            DEBUG: false,
        },
        // Cart plugin defaults
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
        // Filter plugin defaults
        FILTER: {
            ENABLED: true,
            PRIORITY: 0,
            DEFAULT_SELECT_OPTION: "Select tags...",
            PRESERVE_DEFAULT: false,
        },
        // Data extractor defaults
        DATA_EXTRACTOR: {
            VALUE_SOURCES: {
                ATTRIBUTE: "attribute",
                TEXT: "text",
            },
        },
        // Proxy plugin defaults
        PROXY: {
            DEFAULT_URL: "",
        },
        // Math plugin defaults
        MATH: {
            OPERATORS: {
                ADD: "+",
                SUBTRACT: "-",
                MULTIPLY: "*",
                DIVIDE: "/",
            },
        },
        // DOM and Virtual DOM
        DOM: {
            UPDATE_COUNTER_INITIAL: 0,
            UNKNOWN_ELEMENT_ID: "unknown",
            INTEGRITY_CHECK_ENABLED: true, // Enable post-update DOM integrity verification
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
            SIMILARITY_THRESHOLD: 0.5, // For text similarity comparison
            LENGTH_RATIO_THRESHOLD: 0.5, // For content length comparison
        },
        // Instance management
        INSTANCES: {
            DUPLICATE_INIT_WINDOW: 100, // ms window to prevent duplicate initialization
        },
        // Event system
        EVENTS: {
            HTTP_METHODS: ["get", "post", "put", "patch", "delete"],
            HTTP_TRIGGER_ATTRIBUTES: ["trigger", "boost", "ws", "sse"],
        },
        // Helper defaults
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
        // Content types
        CONTENT_TYPES: {
            UNKNOWN: "unknown",
            JSON: "json",
            HTML: "html",
            XML: "xml",
        },
        // Error handling
        ERRORS: {
            XML_PARSER_ERROR: "Unknown parser error",
        },
        // URL and routing
        URL: {
            WEBFLOW_DOMAINS: [".webflow.io", ".canvas.webflow.com"],
            LOCALHOST: "localhost",
        },
        // Element selectors and attributes
        SELECTORS: {
            FP_ATTRIBUTES: [
                "template", "get", "post", "put", "delete", "patch",
                "persist", "instance", "data", "local", "group",
                "target", "swap", "trigger", "dynamic"
            ],
            TEMPLATE_ELEMENTS: ["template", "fptemplate"],
            EXTENSION_ATTRIBUTE: "hx-ext",
        },
        // Security
        SECURITY: {
            ALLOW_EXECUTE: true,
            FORBIDDEN_REGISTRATIONS: new Set([
                "if", "unless", "each", "with", "lookup", "log", "blockHelperMissing", "helperMissing"
            ]),
        },
    };

    // Determine debug level based on environment
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
    // Config queue system
    let configQueue = [];
    let isInitialized = false;
    /**
     * Internal function to apply configuration changes
     * @param {Object} newConfig - Configuration options to apply
     */
    function applyConfigInternal(newConfig) {
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
    }
    const ConfigManager = {
        /**
         * Sets the default configuration without logging
         * @param {Object} defaultConfig - Default configuration to apply
         */
        setDefaultConfig(defaultConfig) {
            applyConfigInternal(defaultConfig);
        },
        /**
         * Sets or updates the FlowPlater configuration.
         * Before initialization: queues the config change
         * After initialization: applies immediately and logs
         * @param {Object} newConfig - Configuration options to apply.
         */
        setConfig(newConfig = {}) {
            if (isInitialized) {
                // Apply immediately and log
                applyConfigInternal(newConfig);
                Debug.info("FlowPlater configuration updated:", this.getConfig());
            }
            else {
                // Queue for later
                configQueue.push(newConfig);
            }
        },
        /**
         * Submits all queued configuration changes and marks as initialized
         * @internal
         */
        submitQueuedConfig() {
            if (configQueue.length > 0) {
                // Merge all queued configs
                const finalConfig = configQueue.reduce((acc, config) => deepMerge(acc, config), {});
                applyConfigInternal(finalConfig);
                Debug.info("FlowPlater configuration updated:", this.getConfig());
                configQueue = [];
            }
            isInitialized = true;
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

    /**
     * Centralized template cache management utility
     * Handles all template caching operations with size limits and eviction policies
     */
    class TemplateCache {
        /**
         * Add a template to the cache with automatic size management
         * @param templateId - The ID of the template
         * @param template - The compiled template
         * @returns The template that was added
         */
        static set(templateId, template) {
            const cacheSize = ConfigManager.getConfig().templates?.cacheSize || DEFAULTS.TEMPLATE.CACHE_SIZE;
            const cache = _state.templateCache;
            // If cache is at limit, remove oldest entry (FIFO eviction)
            if (Object.keys(cache).length >= cacheSize) {
                const oldestKey = Object.keys(cache)[0];
                delete cache[oldestKey];
                Debug.info(`Cache limit reached. Removed template: ${oldestKey}`);
            }
            // Add new template to cache
            cache[templateId] = template;
            return template;
        }
        /**
         * Get a template from the cache
         * @param templateId - The ID of the template to get, or undefined to get all templates
         * @returns The template object or all templates if no ID is provided
         */
        static get(templateId) {
            if (templateId) {
                return _state.templateCache[templateId];
            }
            return _state.templateCache;
        }
        /**
         * Check if a template is cached
         * @param templateId - The ID of the template to check
         * @returns True if the template is cached, false otherwise
         */
        static isCached(templateId) {
            return !!_state.templateCache[templateId];
        }
        /**
         * Clear a template from the cache
         * @param templateId - The ID of the template to clear, or undefined to clear all
         */
        static clear(templateId) {
            if (templateId) {
                delete _state.templateCache[templateId];
                Debug.info(`Cleared template cache for: ${templateId}`);
            }
            else {
                _state.templateCache = {};
                Debug.info("Cleared entire template cache");
            }
        }
        /**
         * Get the size of the template cache
         * @returns The number of templates in the cache
         */
        static size() {
            return Object.keys(_state.templateCache).length;
        }
        /**
         * Check if cache is at capacity
         * @returns True if cache is at or over capacity
         */
        static isAtCapacity() {
            const cacheSize = ConfigManager.getConfig().templates?.cacheSize || DEFAULTS.TEMPLATE.CACHE_SIZE;
            return Object.keys(_state.templateCache).length >= cacheSize;
        }
    }

    function compileTemplate(templateId, recompile = false) {
        if (!recompile) {
            return memoizedCompile(templateId);
        }
        // For recompile=true:
        // 1. Clear template cache
        TemplateCache.clear(templateId);
        // 2. Compile without memoization
        const compiledTemplate = memoizedCompile.original(templateId);
        // 3. Update the memoized cache with the new template
        memoizedCompile.cache.set(JSON.stringify([templateId]), compiledTemplate);
        return compiledTemplate;
    }
    const memoizedCompile = memoize(function (templateId) {
        // if templateId is empty or "self", use the current element
        Performance.start("compile:" + templateId);
        const helpers = Handlebars.helpers;
        // Add # prefix if templateId doesn't start with it
        const selector = templateId.startsWith("#") ? templateId : "#" + templateId;
        var templateElement = document.querySelector(selector);
        Debug.debug("Trying to compile template: " + templateId);
        if (!templateElement) {
            Debug.error("Template not found: " + templateId);
            Performance.end("compile:" + templateId);
            return null;
        }
        // Check if template needs compilation
        if (!TemplateCache.isCached(templateId) ||
            (AttributeMatcher._hasAttribute(templateElement, "dynamic") &&
                AttributeMatcher._getRawAttribute(templateElement, "dynamic") !== "false")) {
            Debug.debug("compiling template: " + templateId);
            // Function to construct tag with attributes
            function constructTagWithAttributes(element) {
                let tagName = element.tagName.toLowerCase();
                let fpTag = AttributeMatcher._getRawAttribute(element, "tag");
                if (fpTag) {
                    tagName = fpTag;
                }
                // Replace all custom tags
                currentCustomTags.forEach((tag) => {
                    if (tagName === tag.tag) {
                        tagName = tag.replaceWith;
                    }
                });
                let attributes = "";
                for (let attr of element.attributes) {
                    attributes += ` ${attr.name}="${attr.value}"`;
                }
                return `<${tagName}${attributes}>`;
            }
            function processNode(node) {
                let result = "";
                // Loop through each child node
                node.childNodes.forEach((child) => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        result += child.textContent;
                    }
                    else if (child.nodeType === Node.ELEMENT_NODE) {
                        const element = child;
                        let childTagName = element.tagName.toLowerCase();
                        let fpTag = AttributeMatcher._getRawAttribute(element, "tag");
                        if (fpTag) {
                            childTagName = fpTag;
                        }
                        if (element.hasAttribute("fp") || childTagName in helpers) {
                            // Process as a Handlebars helper
                            const helperName = childTagName;
                            const fpAttr = element.getAttribute("fp");
                            const args = fpAttr
                                ? fpAttr
                                    .split(" ")
                                    .map((arg) => arg.replace(/&quot;/g, '"'))
                                    .join(" ")
                                : "";
                            const innerContent = processNode(element);
                            switch (helperName) {
                                case "log":
                                case "lookup":
                                case "execute":
                                    if (innerContent) {
                                        result += `{{${helperName} ${innerContent} ${args}}}`;
                                    }
                                    else {
                                        result += `{{${helperName} ${args}}}`;
                                    }
                                    break;
                                case "comment":
                                    result += `{{!-- ${args} --}}`;
                                    break;
                                case "if":
                                    const escapedArgs = args.replace(/"/g, '\\"');
                                    result += `{{#${helperName} "${escapedArgs}"}}${innerContent}{{/${helperName}}}`;
                                    break;
                                case "else":
                                    result += `{{${helperName}}}${innerContent}`;
                                    break;
                                case "math":
                                    if (innerContent) {
                                        Debug.warn(`FlowPlater: The <${helperName}> helper does not accept inner content.`);
                                    }
                                    result += `{{#${helperName} "${args}"}}`;
                                    break;
                                default:
                                    result += `{{#${helperName} ${args}}}${innerContent}{{/${helperName}}}`;
                                    break;
                            }
                        }
                        else if (element.tagName === "else") {
                            const innerContent = processNode(element);
                            result += `{{${element.tagName.toLowerCase()}}}${innerContent}`;
                        }
                        else if (element.tagName === "template" ||
                            element.tagName === "fptemplate" ||
                            AttributeMatcher._hasAttribute(element, "template")) {
                            result += element.outerHTML;
                        }
                        else {
                            const childContent = processNode(element);
                            const startTag = constructTagWithAttributes(element);
                            const fpValAttribute = AttributeMatcher._getRawAttribute(element, "val");
                            let processedContent = childContent;
                            if (fpValAttribute) {
                                processedContent = `{{{default ${fpValAttribute} "${childContent.replace(/"/g, '\\"')}"}}}`;
                            }
                            let endTagName = childTagName;
                            currentCustomTags.forEach((tag) => {
                                if (endTagName === tag.tag) {
                                    endTagName = tag.replaceWith;
                                }
                            });
                            const endTag = `</${endTagName}>`;
                            result += `${startTag}${processedContent}${endTag}`;
                        }
                    }
                });
                return result;
            }
            const handlebarsTemplate = processNode(templateElement);
            Debug.debug("Compiling Handlebars template: " + handlebarsTemplate);
            try {
                const compiledTemplate = Handlebars.compile(handlebarsTemplate);
                // Add new template to cache with automatic size management
                TemplateCache.set(templateId, compiledTemplate);
                Performance.end("compile:" + templateId);
                return compiledTemplate;
            }
            catch (e) {
                Debug.error("Template not valid: " + handlebarsTemplate + " | Error: " + e.message);
                Performance.end("compile:" + templateId);
                return null;
            }
        }
        Performance.end("compile:" + templateId);
        return TemplateCache.get(templateId);
    });

    /**
     * DOM Batcher to reduce layout thrashing by batching DOM reads and writes
     * Uses requestAnimationFrame to schedule operations at optimal times
     */
    class DomBatcher {
        constructor() {
            Object.defineProperty(this, "readQueue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            Object.defineProperty(this, "writeQueue", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: []
            });
            Object.defineProperty(this, "isScheduled", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: false
            });
            Object.defineProperty(this, "frameId", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: null
            });
        }
        /**
         * Schedule a DOM read operation
         */
        read(operation, id) {
            // If batching is disabled, execute immediately
            if (!ConfigManager.getConfig().performance?.batchDomUpdates) {
                return Promise.resolve(operation());
            }
            return new Promise((resolve, reject) => {
                this.readQueue.push({
                    id: id || `read-${Date.now()}-${Math.random()}`,
                    type: 'read',
                    operation,
                    resolve,
                    reject
                });
                this.scheduleFlush();
            });
        }
        /**
         * Schedule a DOM write operation
         */
        write(operation, id) {
            // If batching is disabled, execute immediately
            if (!ConfigManager.getConfig().performance?.batchDomUpdates) {
                return Promise.resolve(operation());
            }
            return new Promise((resolve, reject) => {
                this.writeQueue.push({
                    id: id || `write-${Date.now()}-${Math.random()}`,
                    type: 'write',
                    operation,
                    resolve,
                    reject
                });
                this.scheduleFlush();
            });
        }
        /**
         * Schedule multiple operations to be batched together
         */
        batch(operations) {
            const promises = operations.map(op => {
                if (op.type === 'read') {
                    return this.read(op.operation, op.id);
                }
                else {
                    return this.write(op.operation, op.id);
                }
            });
            return Promise.all(promises);
        }
        /**
         * Execute a batch of DOM operations immediately (synchronously)
         * Useful for operations that must be completed before the next frame
         */
        flush() {
            this.conditionalFrameCancel();
            this.isScheduled = false;
            this.executeOperations();
        }
        /**
         * Clear all pending operations
         */
        clear() {
            this.conditionalFrameCancel();
            this.isScheduled = false;
            // Reject all pending operations
            [...this.readQueue, ...this.writeQueue].forEach(op => {
                op.reject(new Error('DOM operation cancelled'));
            });
            this.readQueue = [];
            this.writeQueue = [];
        }
        /**
         * Helper function to schedule execution based on configuration
         */
        conditionalFrameSchedule(callback) {
            const config = ConfigManager.getConfig();
            const batchingDelay = config.performance?.batchingDelay ?? 0;
            if (batchingDelay > 0) {
                // Use setTimeout with specified delay
                this.frameId = setTimeout(callback, batchingDelay);
            }
            else {
                // Use requestAnimationFrame for optimal timing
                this.frameId = requestAnimationFrame(callback);
            }
        }
        /**
         * Helper function to cancel scheduled execution based on configuration
         */
        conditionalFrameCancel() {
            if (!this.frameId)
                return;
            const config = ConfigManager.getConfig();
            const batchingDelay = config.performance?.batchingDelay ?? 0;
            if (batchingDelay > 0) {
                clearTimeout(this.frameId);
            }
            else {
                cancelAnimationFrame(this.frameId);
            }
            this.frameId = null;
        }
        scheduleFlush() {
            if (this.isScheduled)
                return;
            this.isScheduled = true;
            this.conditionalFrameSchedule(() => {
                this.isScheduled = false;
                this.frameId = null;
                this.executeOperations();
            });
        }
        executeOperations() {
            Performance.start('DomBatcher.executeOperations');
            try {
                // First, execute all read operations
                // This prevents layout thrashing by batching all reads together
                const readResults = [];
                while (this.readQueue.length > 0) {
                    const operation = this.readQueue.shift();
                    try {
                        const result = operation.operation();
                        operation.resolve(result);
                        readResults.push(result);
                    }
                    catch (error) {
                        operation.reject(error);
                        Debug.error('DOM read operation failed:', error);
                    }
                }
                // Then, execute all write operations
                // This prevents layout thrashing by batching all writes together
                const writeResults = [];
                while (this.writeQueue.length > 0) {
                    const operation = this.writeQueue.shift();
                    try {
                        const result = operation.operation();
                        operation.resolve(result);
                        writeResults.push(result);
                    }
                    catch (error) {
                        operation.reject(error);
                        Debug.error('DOM write operation failed:', error);
                    }
                }
                Debug.debug(`DOM Batcher executed ${readResults.length} reads and ${writeResults.length} writes`);
            }
            catch (error) {
                Debug.error('Error in DOM batcher execution:', error);
            }
            finally {
                Performance.end('DomBatcher.executeOperations');
            }
        }
    }
    // Export a singleton instance
    const domBatcher = new DomBatcher();

    // Helper function to handle Map serialization
    // @ts-ignore
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
    // @ts-ignore
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

    /**
     * Helper function to collect debug information consistently
     */
    function collectDebugInfo(form, type, details = {}) {
        return {
            formId: form.id,
            type,
            persistenceEnabled: isPersistenceEnabledForElement(form),
            restoredElements: details.restoredElements || [],
            customVisualUpdates: details.customVisualUpdates || [],
            skippedElements: details.skippedElements || [],
            storageType: details.storageType
        };
    }
    /**
     * Helper function to handle storage operations
     */
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
    /**
     * Helper function to process form elements consistently
     */
    function processFormElements(form, callback) {
        Array.from(form.elements).forEach((element) => {
            if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement))
                return;
            if (!element.name || element.type === "file")
                return;
            if (!isPersistenceEnabledForElement(element))
                return;
            callback(element);
        });
    }
    /**
     * Helper function to manage event listeners
     */
    function manageEventListener(element, eventType, handler, operation = "add") {
        const events = eventType === "change"
            ? [
                "change",
                element.type !== "checkbox" && element.type !== "radio"
                    ? "input"
                    : null,
            ]
            : [eventType];
        events.filter(Boolean).forEach((event) => {
            const method = operation === "add" ? "addEventListener" : "removeEventListener";
            element[method](event, handler);
        });
    }
    /**
     * Helper function to restore element values
     */
    function restoreElementValue(element, value) {
        if (element instanceof HTMLInputElement && (element.type === "checkbox" || element.type === "radio")) {
            element.checked = value === "true";
            updateCustomVisualState(element);
        }
        else if (element instanceof HTMLSelectElement && element.multiple) {
            Array.from(element.options).forEach((option) => {
                option.selected = value.includes(option.value);
            });
        }
        else {
            element.value = value;
        }
    }
    /**
     * Helper function to update custom visual state
     */
    function updateCustomVisualState(element) {
        const wrapper = element.closest(element.type === "checkbox" ? ".w-checkbox" : ".w-radio");
        if (!wrapper)
            return;
        const customInput = wrapper.querySelector(`.w-${element.type}-input`);
        if (customInput) {
            customInput.classList.toggle("w--redirected-checked", element.checked);
        }
    }
    /**
     * Gets persistence settings for an element
     * @param {HTMLElement} element - The element to check
     * @returns {Object} - Object containing persistence settings
     */
    function getPersistenceSettings(element) {
        let shouldPersist = false;
        let useLocalStorage = false;
        // Check persistence settings
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
        // For forms, check if any elements have explicit persistence
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
    /**
     * Checks if persistence is enabled for an element
     * @param {HTMLElement} element - The element to check
     * @returns {boolean} - Whether persistence is enabled for this element
     */
    function isPersistenceEnabledForElement(element) {
        return getPersistenceSettings(element).shouldPersist;
    }
    /**
     * Determines which storage to use based on configuration
     * @param {HTMLElement} element - The element to check
     * @returns {boolean} - true for localStorage, false for sessionStorage
     */
    function shouldUseLocalStorage(element) {
        return getPersistenceSettings(element).useLocalStorage;
    }
    /**
     * Captures the state of all forms within an element
     * @param {HTMLElement} element - The container element
     * @returns {Object} - Map of form states by form ID
     */
    function captureFormStates(element) {
        try {
            const forms = element.getElementsByTagName("form");
            const formStates = {};
            Array.from(forms).forEach((form) => {
                if (!form.id)
                    return;
                const formState = {};
                const formElements = form.elements;
                Array.from(formElements).forEach((input) => {
                    if (!input.name || input.type === "file")
                        return;
                    // Skip if persistence is disabled for this element
                    if (!isPersistenceEnabledForElement(input))
                        return;
                    if (input.type === "checkbox" || input.type === "radio") {
                        formState[input.name] = input.checked;
                    }
                    else if (input instanceof HTMLSelectElement) {
                        if (input.multiple) {
                            formState[input.name] = Array.from(input.selectedOptions).map((opt) => opt.value);
                        }
                        else {
                            formState[input.name] = input.value;
                        }
                    }
                    else {
                        formState[input.name] = input.value;
                    }
                });
                // Only store if there are elements to store
                if (Object.keys(formState).length > 0) {
                    // Emit event before storing
                    EventSystem.publish("formState:beforeCapture", {
                        formId: form.id,
                        formElement: form,
                        state: formState,
                    });
                    formStates[form.id] = formState;
                    // Store based on configuration
                    if (shouldUseLocalStorage(form)) {
                        saveToLocalStorage(form.id, formState, "form");
                    }
                    else {
                        sessionStorage.setItem(`fp_form_${form.id}`, JSON.stringify(formState));
                    }
                }
            });
            return formStates;
        }
        catch (error) {
            Debug.error(`Error capturing form states: ${error.message}`);
            return {};
        }
    }
    /**
     * Restores the state of a single form from storage
     * @param {HTMLFormElement} form - The form to restore state for
     * @param {string} [source] - The source of the call to restoreSingleFormState
     * @returns {boolean} - Whether state was restored
     */
    function restoreSingleFormState(form, source) {
        if (!form.id)
            return false;
        // Try to get state from storage
        const formState = handleFormStorage(form, {}, "load");
        if (!formState) {
            Debug.debug(`No stored state found for form: ${form.id}`);
            return false;
        }
        const debugInfo = collectDebugInfo(form, "restore", {
            restoredElements: [],
            customVisualUpdates: [],
            skippedElements: [],
            storageType: shouldUseLocalStorage(form)
                ? "localStorage"
                : "sessionStorage",
        });
        // Restore state directly for this form
        processFormElements(form, (input) => {
            if (!(input.name in formState))
                return;
            debugInfo.restoredElements.push({
                name: input.name,
                value: formState[input.name],
            });
            restoreElementValue(input, formState[input.name]);
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
    }
    /**
     * Restores form states within an element
     * @param {HTMLElement} element - The container element
     * @param {string} [source] - The source of the call to restoreFormStates
     */
    function restoreFormStates(element, source) {
    }
    /**
     * Clears stored form state
     * @param {string} formId - ID of the form to clear
     */
    function clearFormState(formId) {
    }
    /**
     * Sets up change event listeners for form elements
     * @param {HTMLElement} form - The form element to set up listeners for
     */
    function setupFormChangeListeners(form) {
        try {
            if (!form.id) {
                Debug.debug("Skipping form without ID");
                return;
            }
            const debugInfo = collectDebugInfo(form, "setup", {
                formElements: form.elements.length,
                checkboxWrappers: form.querySelectorAll(".w-checkbox").length,
                listenersAdded: [],
                skippedElements: [],
            });
            // Initialize new listeners array if it doesn't exist
            if (!form._fpChangeListeners) {
                form._fpChangeListeners = [];
            }
            // Handle regular form elements
            processFormElements(form, (element) => {
                // Skip if element already has a listener
                if (form._fpChangeListeners.some(({ element: el }) => el === element)) {
                    return;
                }
                const changeHandler = (event) => handleFormElementChange(event);
                manageEventListener(element, "change", changeHandler);
                // Store the handler reference
                form._fpChangeListeners.push({ element, handler: changeHandler });
                debugInfo.listenersAdded?.push(element.name);
            });
            // Output collected debug information
            Debug.debug(`Form setup summary for ${form.id}`, {
                totalFormElements: debugInfo.formElements,
                checkboxWrappers: debugInfo.checkboxWrappers,
                formPersistence: debugInfo.persistenceEnabled ? "enabled" : "disabled",
                listenersAdded: debugInfo.listenersAdded?.join(", "),
                skippedElements: debugInfo.skippedElements.join(", "),
            });
        }
        catch (error) {
            Debug.error(`Error setting up form change listeners: ${error.message}`);
        }
    }
    /**
     * Cleans up change event listeners for form elements
     * @param {HTMLElement} form - The form element to clean up listeners for
     */
    function cleanupFormChangeListeners(form) {
        try {
            if (!form._fpChangeListeners)
                return;
            form._fpChangeListeners.forEach(({ element, handler }) => {
                element.removeEventListener("change", handler);
                element.removeEventListener("input", handler);
            });
            form._fpChangeListeners = [];
        }
        catch (error) {
            Debug.error(`Error cleaning up form change listeners: ${error.message}`);
        }
    }
    function handleFormElementChange(event) {
        try {
            const element = event.target;
            const form = element.closest("form");
            if (!form || !form.id) {
                Debug.debug("Skipping change handler - no form or form ID");
                return;
            }
            const debugInfo = collectDebugInfo(form, "change", {
                changedValues: {},
                skippedElements: [],
            });
            // Helper function to check if a value is a template
            function isTemplateValue(value) {
                if (typeof value !== "string")
                    return false;
                // Check for Handlebars syntax
                if (value.includes("{{") || value.includes("}}"))
                    return true;
                // Check for alternative syntax
                if (value.includes("[[") || value.includes("]]"))
                    return true;
                // Check for this. references which indicate template binding
                if (value.includes("this."))
                    return true;
                return false;
            }
            // Helper function to check if an input is template-bound
            function isTemplateInput(input) {
                // Check if the input name itself is a template
                if (isTemplateValue(input.name))
                    return true;
                // Check if the input has a template value
                if (isTemplateValue(input.value))
                    return true;
                // Check for data-binding attributes that indicate template usage
                if (AttributeMatcher._hasAttribute(input, "bind"))
                    return true;
                return false;
            }
            // Capture the current state of the form
            const formState = {};
            processFormElements(form, (input) => {
                // First check if this is a template-bound input
                if (isTemplateInput(input)) {
                    debugInfo.skippedElements.push({
                        name: input.name,
                        reason: "Template binding detected",
                        value: input.value,
                    });
                    return;
                }
                const value = input.type === "checkbox" || input.type === "radio"
                    ? input.checked
                    : input instanceof HTMLSelectElement && input.multiple
                        ? Array.from(input.selectedOptions).map((opt) => opt.value)
                        : input.value;
                formState[input.name] = value;
                if (!debugInfo.changedValues)
                    debugInfo.changedValues = {};
                debugInfo.changedValues[input.name] = value;
            });
            // Only store if there are elements to store
            if (Object.keys(formState).length > 0) {
                handleFormStorage(form, formState, "save");
                // Output collected debug information
                Debug.debug("Form state update for " + form.id + ":", {
                    "Changed element": element.name,
                    "Storage type": shouldUseLocalStorage(form)
                        ? "localStorage"
                        : "sessionStorage",
                    "Updated values": debugInfo.changedValues,
                    "Skipped elements": debugInfo.skippedElements,
                });
                // Find instance that contains this form or whose elements are contained by this form
                let instance = null;
                // @ts-ignore
                for (const [instanceName, inst] of Object.entries(_state.instances)) {
                    if (Array.from(inst.elements).some((el) => el.contains(form) || form.contains(el) || el === form)) {
                        instance = inst;
                        break;
                    }
                }
                // Execute updateForm hook
                PluginManager.executeHook("updateForm", instance, {
                    element: form,
                    id: form.id,
                    data: formState,
                    changedElement: element,
                });
                // Emit event
                EventSystem.publish("formState:changed", {
                    formId: form.id,
                    formElement: form,
                    state: formState,
                    changedElement: element,
                });
            }
        }
        catch (error) {
            Debug.error(`Error handling form element change: ${error.message}`);
        }
    }
    /**
     * Gets all relevant forms for an element (target, parent, and children)
     * @param {HTMLElement} element - The element to get forms for
     * @returns {Set<HTMLFormElement>} - Set of unique form elements
     */
    function getAllRelevantForms(element) {
        const forms = new Set();
        // Add the target if it's a form
        if (element instanceof HTMLFormElement) {
            forms.add(element);
        }
        // Add parent forms
        const parentForm = element.closest("form");
        if (parentForm) {
            forms.add(parentForm);
        }
        // Add child forms
        const childForms = element.getElementsByTagName("form");
        Array.from(childForms).forEach((form) => forms.add(form));
        return forms;
    }
    /**
     * Sets up form submission handlers to clear state on submit
     * @param {HTMLElement} element - The container element
     * @param {string} [source] - The source of the call to setupFormSubmitHandlers
     */
    function setupFormSubmitHandlers(element, source) {
        try {
            Debug.debug("Setting up form submit handlers for element:", element);
            // Get all relevant forms
            const forms = getAllRelevantForms(element);
            Debug.debug(`Found ${forms.size} forms`);
            forms.forEach((form) => {
                setupSingleFormHandlers(form, source || "setupFormSubmitHandlers");
            });
        }
        catch (error) {
            Debug.error(`Error setting up form submit handlers: ${error.message}`);
        }
    }
    function setupSingleFormHandlers(form, source) {
        if (!form.id) {
            Debug.debug("Skipping form without ID");
            return;
        }
        // Always set up handlers for forms that have been updated by HTMX
        Debug.debug(`Setting up handlers for form: ${form.id}`);
        // Remove existing listener if any
        form.removeEventListener("submit", handleFormSubmit);
        // Add new listener
        form.addEventListener("submit", handleFormSubmit);
        // Set up change listeners for form elements
        setupFormChangeListeners(form);
        // Mark form as having handlers set up
        form._fpHandlersSetup = true;
        // Check if form restoration is needed
        if (shouldRestoreForm(form)) {
            Debug.debug(`Restoring state for form: ${form.id}`);
            restoreSingleFormState(form, source || "setupSingleFormHandlers");
        }
        else {
            Debug.debug(`Skipping form restoration - no persistent elements: ${form.id}`);
        }
    }
    function handleFormSubmit(event) {
        try {
            const form = event.target.closest("form");
            if (form && form.id) {
                clearFormState(form.id);
            }
        }
        catch (error) {
            Debug.error(`Error handling form submit: ${error.message}`);
        }
    }
    function setupDynamicFormObserver(container) {
        try {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLFormElement) {
                            setupFormSubmitHandlers(node, "setupDynamicFormObserver");
                        }
                    });
                });
            });
            observer.observe(container, {
                childList: true,
                subtree: true,
            });
            return observer;
        }
        catch (error) {
            Debug.error(`Error setting up dynamic form observer: ${error.message}`);
            return null;
        }
    }
    /**
     * Checks if form restoration should be performed for a form or its elements
     * @param {HTMLElement} element - The form or container element to check
     * @returns {boolean} - Whether form restoration should be performed
     */
    function shouldRestoreForm(element) {
        // Check if the element itself has persistence enabled
        if (isPersistenceEnabledForElement(element)) {
            return true;
        }
        // Check if it's a form and has persistent elements
        if (element instanceof HTMLFormElement) {
            const persistentElements = element.querySelectorAll('[data-persist="true"]');
            if (persistentElements.length > 0) {
                return true;
            }
        }
        // Check for child elements with persistence enabled
        const persistentChildren = element.querySelectorAll('[data-persist="true"]');
        if (persistentChildren.length > 0) {
            return true;
        }
        return false;
    }

    /**
     * Virtual DOM implementation for efficient DOM diffing and batched updates
     */
    class VirtualDOM {
        /**
         * Parse HTML string into virtual DOM tree
         */
        static parseHTML(html) {
            Performance.start('VirtualDOM.parseHTML');
            const container = document.createElement('div');
            // Don't trim the HTML - preserve original spacing
            container.innerHTML = html;
            const vnodes = Array.from(container.childNodes).map(node => this.nodeToVNode(node)).filter(Boolean);
            Performance.end('VirtualDOM.parseHTML');
            return vnodes;
        }
        /**
         * Convert DOM node to virtual node
         */
        static nodeToVNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                // Skip empty text nodes
                if (text === null || text === undefined || text === '') {
                    return null;
                }
                // For whitespace-only text nodes, be more selective about preservation
                if (text.trim() === '') {
                    // Check if this whitespace might be meaningful (between inline elements)
                    const parent = node.parentElement;
                    const hasPrevSibling = !!node.previousSibling;
                    const hasNextSibling = !!node.nextSibling;
                    // Elements that typically contain inline content where whitespace matters
                    const inlineContainerTags = new Set([
                        'p', 'div', 'li', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                        'span', 'label', 'a', 'strong', 'em', 'b', 'i', 'small', 'mark'
                    ]);
                    const isInInlineContainer = parent && inlineContainerTags.has(parent.tagName.toLowerCase());
                    const isBetweenElements = hasPrevSibling && hasNextSibling;
                    if (isInInlineContainer && isBetweenElements) {
                        // Preserve whitespace that might be meaningful between inline elements
                        return text;
                    }
                    else {
                        // Skip formatting whitespace
                        return null;
                    }
                }
                // Preserve the original text content for meaningful text
                return text;
            }
            if (node.nodeType === Node.COMMENT_NODE) {
                return null; // Skip comments
            }
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                const tag = element.tagName.toLowerCase();
                const isSVG = this.SVG_ELEMENTS.has(tag) || element.namespaceURI === this.SVG_NAMESPACE;
                // Extract attributes and event handlers
                const attrs = {};
                const events = {};
                const specialElements = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'];
                const isFormElement = specialElements.includes(tag.toUpperCase());
                Array.from(element.attributes).forEach(attr => {
                    if (attr.name.startsWith('on')) {
                        // Capture event handler attributes
                        events[attr.name] = attr.value;
                    }
                    else {
                        attrs[attr.name] = attr.value;
                    }
                });
                // Extract children (skip void elements)
                let children = [];
                if (!this.VOID_ELEMENTS.has(tag)) {
                    children = Array.from(element.childNodes)
                        .map(child => this.nodeToVNode(child))
                        .filter(Boolean);
                }
                return {
                    tag,
                    attrs,
                    children,
                    events: Object.keys(events).length > 0 ? events : undefined,
                    key: attrs['data-key'],
                    element,
                    isSVG,
                    isFormElement
                };
            }
            return null;
        }
        /**
         * Convert existing DOM element to virtual DOM tree
         */
        static domToVNodes(element) {
            Performance.start('VirtualDOM.domToVNodes');
            const vnodes = Array.from(element.childNodes)
                .map(node => this.nodeToVNode(node))
                .filter(Boolean);
            Performance.end('VirtualDOM.domToVNodes');
            return vnodes;
        }
        /**
         * Check if two VNode trees are structurally identical
         */
        static areVNodeTreesEqual(oldVNodes, newVNodes) {
            if (oldVNodes.length !== newVNodes.length) {
                return false;
            }
            for (let i = 0; i < oldVNodes.length; i++) {
                if (!this.areVNodesEqual(oldVNodes[i], newVNodes[i])) {
                    return false;
                }
            }
            return true;
        }
        /**
         * Check if two VNodes are equal
         */
        static areVNodesEqual(oldVNode, newVNode) {
            // Handle text nodes
            if (typeof oldVNode === 'string' && typeof newVNode === 'string') {
                // Special handling for whitespace-only text nodes
                const oldIsWhitespace = oldVNode.trim() === '';
                const newIsWhitespace = newVNode.trim() === '';
                if (oldIsWhitespace && newIsWhitespace) {
                    // Consider all whitespace-only text nodes equal to each other
                    return true;
                }
                // For non-whitespace text, use exact equality
                return oldVNode === newVNode;
            }
            // Handle mixed types
            if (typeof oldVNode !== typeof newVNode) {
                return false;
            }
            // Handle element nodes
            if (typeof oldVNode === 'object' && typeof newVNode === 'object') {
                // Check tag
                if (oldVNode.tag !== newVNode.tag) {
                    return false;
                }
                // Check attributes (shallow comparison)
                const oldAttrs = oldVNode.attrs || {};
                const newAttrs = newVNode.attrs || {};
                const oldKeys = Object.keys(oldAttrs).sort();
                const newKeys = Object.keys(newAttrs).sort();
                if (oldKeys.length !== newKeys.length) {
                    return false;
                }
                for (let i = 0; i < oldKeys.length; i++) {
                    if (oldKeys[i] !== newKeys[i] || oldAttrs[oldKeys[i]] !== newAttrs[newKeys[i]]) {
                        return false;
                    }
                }
                // Check events (shallow comparison)
                const oldEvents = oldVNode.events || {};
                const newEvents = newVNode.events || {};
                const oldEventKeys = Object.keys(oldEvents).sort();
                const newEventKeys = Object.keys(newEvents).sort();
                if (oldEventKeys.length !== newEventKeys.length) {
                    return false;
                }
                for (let i = 0; i < oldEventKeys.length; i++) {
                    if (oldEventKeys[i] !== newEventKeys[i] || oldEvents[oldEventKeys[i]] !== newEvents[newEventKeys[i]]) {
                        return false;
                    }
                }
                // Check children recursively
                return this.areVNodeTreesEqual(oldVNode.children, newVNode.children);
            }
            return false;
        }
        /**
         * Diff two virtual DOM trees and generate patch operations
         */
        static diff(oldVNodes, newVNodes) {
            Performance.start('VirtualDOM.diff');
            // Add null/undefined checks
            if (!oldVNodes || !Array.isArray(oldVNodes)) {
                Performance.end('VirtualDOM.diff');
                return [];
            }
            if (!newVNodes || !Array.isArray(newVNodes)) {
                Performance.end('VirtualDOM.diff');
                return [];
            }
            // Quick check: if the trees are structurally identical, skip diffing
            if (this.areVNodeTreesEqual(oldVNodes, newVNodes)) {
                Performance.end('VirtualDOM.diff');
                return [];
            }
            const patches = [];
            // Create keyed element maps for efficient lookup
            const oldKeyed = new Map();
            const newKeyed = new Map();
            oldVNodes.forEach((vnode, index) => {
                if (typeof vnode === 'object' && vnode.key) {
                    oldKeyed.set(vnode.key, { vnode, index });
                }
            });
            newVNodes.forEach((vnode, index) => {
                if (typeof vnode === 'object' && vnode.key) {
                    newKeyed.set(vnode.key, { vnode, index });
                }
            });
            // Track processed indices
            const processedOld = new Set();
            const processedNew = new Set();
            // First pass: Handle keyed elements
            newKeyed.forEach(({ vnode: newVNode, index: newIndex }, key) => {
                const oldEntry = oldKeyed.get(key);
                if (oldEntry) {
                    const { vnode: oldVNode, index: oldIndex } = oldEntry;
                    // Mark as processed
                    processedOld.add(oldIndex);
                    processedNew.add(newIndex);
                    // Check if element needs to move
                    if (oldIndex !== newIndex) {
                        patches.push({
                            type: 'MOVE',
                            target: oldVNode.element,
                            oldIndex,
                            newIndex
                        });
                    }
                    // Check for attribute/content changes
                    const subPatches = this.diffVNode(oldVNode, newVNode);
                    patches.push(...subPatches);
                }
            });
            // Second pass: Handle non-keyed elements with improved matching
            const unprocessedOld = oldVNodes.filter((_, i) => !processedOld.has(i));
            const unprocessedNew = newVNodes.filter((_, i) => !processedNew.has(i));
            const usedOldIndices = new Set();
            // Try to match remaining new elements with remaining old elements
            unprocessedNew.forEach((newVNode) => {
                const actualNewIndex = newVNodes.findIndex(vn => vn === newVNode);
                const bestMatchIndex = this.findBestMatch(newVNode, unprocessedOld, usedOldIndices);
                if (bestMatchIndex !== -1) {
                    // Found a good match
                    const oldVNode = unprocessedOld[bestMatchIndex];
                    usedOldIndices.add(bestMatchIndex);
                    // Calculate actual old index
                    let actualOldIndex = -1;
                    let relativeIndex = 0;
                    for (let i = 0; i < oldVNodes.length; i++) {
                        if (!processedOld.has(i)) {
                            if (relativeIndex === bestMatchIndex) {
                                actualOldIndex = i;
                                break;
                            }
                            relativeIndex++;
                        }
                    }
                    if (actualOldIndex !== actualNewIndex) {
                        // Element needs to move
                        patches.push({
                            type: 'MOVE',
                            target: typeof oldVNode === 'object' ? oldVNode.element : undefined,
                            oldIndex: actualOldIndex,
                            newIndex: actualNewIndex
                        });
                    }
                    // Diff the matched elements
                    const subPatches = this.diffVNode(oldVNode, newVNode);
                    patches.push(...subPatches);
                }
                else {
                    // No good match found, create new element at the correct position
                    patches.push({
                        type: 'CREATE',
                        vnode: newVNode,
                        newIndex: actualNewIndex
                    });
                }
            });
            // Remove any unmatched old elements
            unprocessedOld.forEach((oldVNode, oldRelativeIndex) => {
                if (!usedOldIndices.has(oldRelativeIndex)) {
                    // Calculate the actual index in the original oldVNodes array
                    let actualOldIndex = -1;
                    let relativeIndex = 0;
                    for (let i = 0; i < oldVNodes.length; i++) {
                        if (!processedOld.has(i)) {
                            if (relativeIndex === oldRelativeIndex) {
                                actualOldIndex = i;
                                break;
                            }
                            relativeIndex++;
                        }
                    }
                    const removeTarget = typeof oldVNode === 'object' ? oldVNode.element : undefined;
                    patches.push({
                        type: 'REMOVE',
                        target: removeTarget,
                        textNodeIndex: typeof oldVNode === 'string' ? actualOldIndex : undefined,
                        // Add elementIndex for elements without direct references
                        oldIndex: typeof oldVNode === 'object' && !oldVNode.element ? actualOldIndex : undefined
                    });
                }
            });
            Performance.end('VirtualDOM.diff');
            return patches;
        }
        /**
         * Diff two individual virtual nodes
         */
        static diffVNode(oldVNode, newVNode) {
            // Handle text nodes - text changes should be handled by remove/create operations
            if (typeof oldVNode === 'string' || typeof newVNode === 'string') {
                // Text node changes are handled at the parent level by removing old and creating new
                // Don't generate patches here - let the parent handle this via REMOVE/CREATE
                return [];
            }
            // Handle different element types
            if (oldVNode.tag !== newVNode.tag) {
                return [{
                        type: 'REPLACE',
                        target: oldVNode.element,
                        vnode: newVNode
                    }];
            }
            // Skip comparison for Webflow-specific elements to preserve their state
            if (this.isWebflowElement(oldVNode) || this.isWebflowElement(newVNode)) {
                return []; // Skip updates for Webflow elements to preserve their state
            }
            // Special handling for form elements - preserve their state
            if (oldVNode.isFormElement || newVNode.isFormElement) {
                return this.diffFormElement(oldVNode, newVNode);
            }
            const patches = [];
            // Check if content has changed significantly - if so, replace the entire element
            if (this.hasSignificantContentChange(oldVNode, newVNode)) {
                return [{
                        type: 'REPLACE',
                        target: oldVNode.element,
                        vnode: newVNode
                    }];
            }
            // Check attributes
            const attrPatches = this.diffAttributes(oldVNode.attrs, newVNode.attrs);
            if (attrPatches) {
                patches.push({
                    type: 'UPDATE_ATTRS',
                    target: oldVNode.element,
                    attrs: attrPatches
                });
            }
            // Check events
            const eventPatches = this.diffEvents(oldVNode.events || {}, newVNode.events || {});
            if (eventPatches) {
                patches.push({
                    type: 'UPDATE_EVENTS',
                    target: oldVNode.element,
                    events: eventPatches
                });
            }
            // Only recursively diff children if we're not replacing the whole element
            const childPatches = this.diff(oldVNode.children, newVNode.children);
            patches.push(...childPatches);
            return patches;
        }
        /**
         * Check if two vnodes have significant content changes that warrant replacement
         */
        static hasSignificantContentChange(oldVNode, newVNode) {
            // For course cards and similar complex elements, be more aggressive about replacement
            if (oldVNode.attrs.class && oldVNode.attrs.class.includes('course-card')) {
                // Always replace course cards - they have complex nested structure
                return true;
            }
            // If the structure is different, replace
            if (Math.abs(oldVNode.children.length - newVNode.children.length) > 1) {
                return true;
            }
            // If most of the text content is different, replace
            const oldText = this.extractTextContent(oldVNode);
            const newText = this.extractTextContent(newVNode);
            if (oldText.length > 0 && newText.length > 0) {
                const similarity = this.calculateTextSimilarity(oldText, newText);
                if (similarity < 0.5) { // Less than 50% similar
                    return true;
                }
            }
            // If text content lengths are very different, replace
            if (oldText.length > 0 && newText.length > 0) {
                const lengthRatio = Math.min(oldText.length, newText.length) / Math.max(oldText.length, newText.length);
                if (lengthRatio < 0.5) {
                    return true;
                }
            }
            return false;
        }
        /**
         * Extract all text content from a vnode
         */
        static extractTextContent(vnode) {
            let text = '';
            for (const child of vnode.children) {
                if (typeof child === 'string') {
                    text += child;
                }
                else {
                    text += this.extractTextContent(child);
                }
            }
            // Only trim for comparison purposes, but preserve original spacing in actual content
            return text.trim();
        }
        /**
         * Calculate text similarity between two strings
         */
        static calculateTextSimilarity(text1, text2) {
            const words1 = text1.toLowerCase().split(/\s+/);
            const words2 = text2.toLowerCase().split(/\s+/);
            const commonWords = words1.filter(word => words2.includes(word));
            const totalWords = Math.max(words1.length, words2.length);
            return totalWords > 0 ? commonWords.length / totalWords : 0;
        }
        /**
         * Check if a virtual node represents a Webflow element that should be handled specially
         */
        static isWebflowElement(vnode) {
            const className = vnode.attrs.class || vnode.attrs.className || '';
            // Check for Webflow classes
            if (typeof className === 'string' && className.includes('w-')) {
                return true;
            }
            // Check for Webflow-specific attributes
            const hasWebflowAttrs = Object.keys(vnode.attrs).some(attr => attr.startsWith('w-'));
            if (hasWebflowAttrs) {
                return true;
            }
            // Check for Webflow form wrapper patterns
            const webflowFormClasses = [
                'w-checkbox', 'w-radio', 'w-checkbox-input', 'w-radio-input',
                'w-form', 'w-input', 'w-select', 'w-textarea'
            ];
            if (typeof className === 'string') {
                const classes = className.split(' ');
                if (classes.some(cls => webflowFormClasses.includes(cls))) {
                    return true;
                }
            }
            return false;
        }
        /**
         * Special diffing for form elements to preserve their state and handle Webflow patterns
         */
        static diffFormElement(oldVNode, newVNode) {
            const patches = [];
            // For form elements, exclude value/state attributes AND Webflow-specific attributes
            const excludedAttrs = new Set(['value', 'checked', 'selected']);
            const filteredNewAttrs = {};
            Object.entries(newVNode.attrs).forEach(([key, value]) => {
                // Skip form state attributes and Webflow-specific attributes (w-*)
                if (!excludedAttrs.has(key) && !key.startsWith('w-')) {
                    filteredNewAttrs[key] = value;
                }
            });
            const attrPatches = this.diffAttributes(oldVNode.attrs, filteredNewAttrs);
            if (attrPatches) {
                patches.push({
                    type: 'UPDATE_ATTRS',
                    target: oldVNode.element,
                    attrs: attrPatches
                });
            }
            // Still check events for form elements
            const eventPatches = this.diffEvents(oldVNode.events || {}, newVNode.events || {});
            if (eventPatches) {
                patches.push({
                    type: 'UPDATE_EVENTS',
                    target: oldVNode.element,
                    events: eventPatches
                });
            }
            // CRITICAL: Always sync Webflow visual state for form elements
            // This ensures that even if the template changes, the visual state matches the actual DOM state
            if (oldVNode.element && (oldVNode.tag === 'input' || oldVNode.tag === 'select' || oldVNode.tag === 'textarea')) {
                patches.push({
                    type: 'UPDATE_WEBFLOW_STATE',
                    target: oldVNode.element
                });
            }
            // Don't diff children for form inputs (they typically don't have meaningful children)
            if (oldVNode.tag !== 'input' && oldVNode.tag !== 'textarea') {
                const childPatches = this.diff(oldVNode.children, newVNode.children);
                patches.push(...childPatches);
            }
            return patches;
        }
        /**
         * Find best match for non-keyed element using similarity scoring
         */
        static findBestMatch(targetVNode, candidates, processedIndices) {
            if (typeof targetVNode === 'string') {
                // For text nodes, find exact or similar text
                for (let i = 0; i < candidates.length; i++) {
                    if (processedIndices.has(i))
                        continue;
                    if (typeof candidates[i] === 'string' && candidates[i] === targetVNode) {
                        return i;
                    }
                }
                return -1;
            }
            let bestMatch = -1;
            let bestScore = 0;
            for (let i = 0; i < candidates.length; i++) {
                if (processedIndices.has(i))
                    continue;
                const candidate = candidates[i];
                if (typeof candidate === 'string')
                    continue;
                let score = 0;
                // Same tag type (highest priority)
                if (candidate.tag === targetVNode.tag)
                    score += 10;
                // Same ID (high priority)
                if (candidate.attrs.id && targetVNode.attrs.id && candidate.attrs.id === targetVNode.attrs.id)
                    score += 8;
                // Similar class names (medium priority)
                const candidateClasses = (candidate.attrs.class || '').split(' ');
                const targetClasses = (targetVNode.attrs.class || '').split(' ');
                const commonClasses = candidateClasses.filter(c => targetClasses.includes(c));
                score += commonClasses.length * 2;
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = i;
                }
            }
            // Only return match if it's a reasonably good match
            // Require more than just tag matching - need additional attributes or content similarity
            return bestScore > 10 ? bestMatch : -1;
        }
        /**
         * Diff attributes between old and new virtual nodes with Webflow-aware handling
         */
        static diffAttributes(oldAttrs, newAttrs) {
            const changes = {};
            let hasChanges = false;
            // Check for changed/new attributes
            for (const [key, value] of Object.entries(newAttrs)) {
                if (oldAttrs[key] !== value) {
                    changes[key] = value;
                    hasChanges = true;
                }
            }
            // Check for removed attributes, but preserve Webflow-specific attributes
            for (const key of Object.keys(oldAttrs)) {
                if (!(key in newAttrs)) {
                    // Don't remove Webflow-specific attributes or classes that might include Webflow state
                    if (!key.startsWith('w-') && key !== 'class') {
                        changes[key] = ''; // Empty string indicates removal
                        hasChanges = true;
                    }
                    else if (key === 'class') {
                        // For class attribute, we need to be more careful with Webflow classes
                        const oldClasses = (oldAttrs[key] || '').split(' ').filter(Boolean);
                        const newClasses = (newAttrs[key] || '').split(' ').filter(Boolean);
                        // Preserve Webflow classes (w-*) and only remove non-Webflow classes
                        const preservedWebflowClasses = oldClasses.filter(cls => cls.startsWith('w-'));
                        const finalClasses = [...new Set([...newClasses, ...preservedWebflowClasses])];
                        if (finalClasses.join(' ') !== oldAttrs[key]) {
                            changes[key] = finalClasses.join(' ');
                            hasChanges = true;
                        }
                    }
                }
            }
            return hasChanges ? changes : null;
        }
        /**
         * Diff event handlers between old and new virtual nodes
         */
        static diffEvents(oldEvents, newEvents) {
            const toAdd = {};
            const toRemove = [];
            let hasChanges = false;
            // Check for new/changed events
            for (const [eventType, handler] of Object.entries(newEvents)) {
                if (oldEvents[eventType] !== handler) {
                    toAdd[eventType] = handler;
                    hasChanges = true;
                }
            }
            // Check for removed events
            for (const eventType of Object.keys(oldEvents)) {
                if (!(eventType in newEvents)) {
                    toRemove.push(eventType);
                    hasChanges = true;
                }
            }
            if (!hasChanges)
                return null;
            return {
                ...(Object.keys(toAdd).length > 0 && { add: toAdd }),
                ...(toRemove.length > 0 && { remove: toRemove })
            };
        }
        /**
         * Apply patch operations to the DOM
         */
        static patch(container, patches, expectedVNodes, capturedFormStates) {
            Performance.start('VirtualDOM.patch');
            // Group patches by type for optimal batching
            const patchGroups = {
                replaces: [],
                moves: [],
                removes: [],
                creates: [],
                updates: []
            };
            patches.forEach((patch) => {
                switch (patch.type) {
                    case 'REPLACE':
                        patchGroups.replaces.push(patch);
                        break;
                    case 'MOVE':
                        patchGroups.moves.push(patch);
                        break;
                    case 'REMOVE':
                        patchGroups.removes.push(patch);
                        break;
                    case 'CREATE':
                        patchGroups.creates.push(patch);
                        break;
                    default:
                        patchGroups.updates.push(patch);
                }
            });
            // Apply patches in optimal order: replaces first, then removes, then creates, then moves, then updates
            this.applyReplaces(patchGroups.replaces);
            this.applyRemoves(container, patchGroups.removes);
            this.applyCreates(container, patchGroups.creates);
            this.applyMoves(container, patchGroups.moves);
            this.applyUpdates(patchGroups.updates);
            // Perform post-update verification if expected state is provided and enabled
            if (expectedVNodes && expectedVNodes.length > 0) {
                try {
                    this.verifyDOMIntegrity(container, expectedVNodes, capturedFormStates);
                }
                catch (error) {
                    Debug.error('VirtualDOM: Error during integrity check:', error);
                }
            }
            Performance.end('VirtualDOM.patch');
        }
        /**
       * Verify that the actual DOM matches the expected HTML
       * If there's a mismatch, force update the DOM to match the expected state
       */
        static verifyDOMIntegrity(container, expectedVNodes, capturedFormStates) {
            Performance.start('VirtualDOM.verifyDOMIntegrity');
            // Convert expected VNodes back to HTML string
            const expectedHTML = this.vNodesToHTML(expectedVNodes);
            // Get current DOM as HTML string
            const currentHTML = container.innerHTML;
            // Normalize both for comparison (remove extra whitespace, line breaks)
            const normalize = (html) => html.replace(/\s+/g, ' ').trim();
            if (normalize(expectedHTML) !== normalize(currentHTML)) {
                Debug.warn(`VirtualDOM: DOM integrity check failed - forcing innerHTML update`);
                // Force update with expected HTML
                container.innerHTML = expectedHTML;
                // Only restore form values if we have captured states and verification failed
                if (capturedFormStates && Object.keys(capturedFormStates).length > 0) {
                    Debug.debug(`VirtualDOM: Restoring form states after integrity fix`);
                }
                Debug.debug(`VirtualDOM: DOM integrity restored via innerHTML`);
            }
            else {
                Debug.debug(`VirtualDOM: DOM integrity check passed`);
            }
            Performance.end('VirtualDOM.verifyDOMIntegrity');
        }
        /**
         * Convert VNodes back to HTML string
         */
        static vNodesToHTML(vnodes) {
            return vnodes.map(vnode => {
                if (typeof vnode === 'string') {
                    return vnode;
                }
                const attrs = Object.entries(vnode.attrs || {})
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(' ');
                const attrsStr = attrs ? ` ${attrs}` : '';
                const childrenHTML = this.vNodesToHTML(vnode.children);
                if (this.VOID_ELEMENTS.has(vnode.tag)) {
                    return `<${vnode.tag}${attrsStr}>`;
                }
                return `<${vnode.tag}${attrsStr}>${childrenHTML}</${vnode.tag}>`;
            }).join('');
        }
        static applyReplaces(replaces) {
            replaces.forEach(patch => {
                if (patch.target && patch.vnode && patch.target.parentNode) {
                    const newElement = this.createElementFromVNode(patch.vnode);
                    this.cleanupElement(patch.target);
                    patch.target.parentNode.replaceChild(newElement, patch.target);
                }
            });
        }
        static applyMoves(container, moves) {
            moves.forEach(patch => {
                if (patch.target && patch.newIndex !== undefined) {
                    const children = Array.from(container.childNodes);
                    const referenceNode = children[patch.newIndex] || null;
                    container.insertBefore(patch.target, referenceNode);
                }
            });
        }
        static applyUpdates(updates) {
            updates.forEach(patch => {
                switch (patch.type) {
                    case 'UPDATE_ATTRS':
                        if (patch.target && patch.attrs) {
                            this.updateElementAttributes(patch.target, patch.attrs);
                        }
                        break;
                    case 'UPDATE_EVENTS':
                        if (patch.target && patch.events) {
                            this.updateElementEvents(patch.target, patch.events);
                        }
                        break;
                    case 'UPDATE_WEBFLOW_STATE':
                        if (patch.target) {
                            this.updateWebflowFormVisualState(patch.target);
                        }
                        break;
                }
            });
        }
        static applyCreates(container, creates) {
            // Sort creates by newIndex to maintain proper order
            const sortedCreates = creates.sort((a, b) => (a.newIndex ?? 0) - (b.newIndex ?? 0));
            sortedCreates.forEach(patch => {
                if (patch.vnode) {
                    const element = this.createElementFromVNode(patch.vnode);
                    if (patch.newIndex !== undefined) {
                        // Insert at specific position
                        const children = Array.from(container.childNodes);
                        const referenceNode = children[patch.newIndex] || null;
                        container.insertBefore(element, referenceNode);
                    }
                    else {
                        // Fallback to append if no position specified
                        container.appendChild(element);
                    }
                }
            });
        }
        static applyRemoves(container, removes) {
            // Separate different types of removes
            const elementRemoves = removes.filter(patch => patch.target && patch.target.parentNode);
            const textNodeRemoves = removes.filter(patch => patch.textNodeIndex !== undefined);
            const indexRemoves = removes.filter(patch => !patch.target && patch.oldIndex !== undefined);
            // Combine all index-based removals (both elements and text nodes) and sort by index descending
            // This prevents index shifting issues
            const allIndexRemoves = [
                ...textNodeRemoves.map(patch => ({ ...patch, isTextNode: true })),
                ...indexRemoves.map(patch => ({ ...patch, isTextNode: false }))
            ].sort((a, b) => {
                const aIndex = a.textNodeIndex ?? a.oldIndex ?? -1;
                const bIndex = b.textNodeIndex ?? b.oldIndex ?? -1;
                return bIndex - aIndex; // Descending order
            });
            // Remove elements with direct references first
            elementRemoves.forEach((patch) => {
                if (patch.target && patch.target.parentNode) {
                    this.cleanupElement(patch.target);
                    patch.target.parentNode.removeChild(patch.target);
                }
            });
            // Remove by index (both elements and text nodes) in descending order
            allIndexRemoves.forEach((patch) => {
                const childNodes = Array.from(container.childNodes);
                const indexToRemove = patch.textNodeIndex ?? patch.oldIndex;
                const nodeToRemove = childNodes[indexToRemove];
                if (nodeToRemove) {
                    if (patch.isTextNode && nodeToRemove.nodeType === Node.TEXT_NODE) {
                        container.removeChild(nodeToRemove);
                    }
                    else if (!patch.isTextNode && nodeToRemove.nodeType === Node.ELEMENT_NODE) {
                        this.cleanupElement(nodeToRemove);
                        container.removeChild(nodeToRemove);
                    }
                }
            });
        }
        /**
         * Create DOM element from virtual node
         */
        static createElementFromVNode(vnode) {
            if (typeof vnode === 'string') {
                return document.createTextNode(vnode);
            }
            // Create element with proper namespace support
            const element = vnode.isSVG
                ? document.createElementNS(this.SVG_NAMESPACE, vnode.tag)
                : document.createElement(vnode.tag);
            // Set attributes with namespace support
            this.updateElementAttributes(element, vnode.attrs);
            // Set up event handlers
            if (vnode.events) {
                this.updateElementEvents(element, { add: vnode.events });
            }
            // Add children
            vnode.children.forEach(child => {
                const childElement = this.createElementFromVNode(child);
                element.appendChild(childElement);
            });
            // Handle Webflow form visual state if this is a form element
            if (vnode.isFormElement) {
                this.updateWebflowFormVisualState(element);
            }
            // Store reference for future diffing
            vnode.element = element;
            return element;
        }
        /**
         * Update element attributes with SVG namespace support and Webflow form handling
         */
        static updateElementAttributes(element, attrs) {
            const isSVG = element.namespaceURI === this.SVG_NAMESPACE;
            let shouldUpdateWebflowState = false;
            Object.entries(attrs).forEach(([key, value]) => {
                if (value === '') {
                    element.removeAttribute(key);
                }
                else if (isSVG) {
                    // SVG attributes may need special handling
                    element.setAttributeNS(null, key, value);
                }
                else {
                    element.setAttribute(key, value);
                }
                // Check if we need to update Webflow visual state
                if (key === 'checked' && element instanceof HTMLInputElement) {
                    shouldUpdateWebflowState = true;
                }
            });
            // Update Webflow visual state if needed
            if (shouldUpdateWebflowState) {
                this.updateWebflowFormVisualState(element);
            }
        }
        /**
         * Update element event handlers with proper cleanup
         */
        static updateElementEvents(element, events) {
            // Get current event listeners for this element
            let currentEvents = this.elementEventMap.get(element);
            if (!currentEvents) {
                currentEvents = new Set();
                this.elementEventMap.set(element, currentEvents);
            }
            // Remove old event handlers (set to null to remove)
            if (events.remove) {
                events.remove.forEach(eventType => {
                    if (currentEvents.has(eventType)) {
                        // Remove the event handler attribute
                        element.removeAttribute(eventType);
                        currentEvents.delete(eventType);
                    }
                });
            }
            // Add new event handlers as attributes
            if (events.add) {
                Object.entries(events.add).forEach(([eventType, handler]) => {
                    element.setAttribute(eventType, handler);
                    currentEvents.add(eventType);
                });
            }
        }
        /**
         * Update Webflow custom visual state for form elements
         * This ensures the visual state matches the actual DOM state, regardless of template changes
         */
        static updateWebflowFormVisualState(element) {
            if (!(element instanceof HTMLInputElement))
                return;
            // Only handle checkbox and radio inputs
            if (element.type !== 'checkbox' && element.type !== 'radio')
                return;
            // Find the Webflow wrapper
            const wrapper = element.closest(element.type === 'checkbox' ? '.w-checkbox' : '.w-radio');
            if (!wrapper)
                return;
            // Find the custom visual input element
            const customInput = wrapper.querySelector(`.w-${element.type}-input`);
            if (customInput) {
                // CRITICAL: Always sync based on the ACTUAL DOM element's current state
                // This preserves user interactions even when templates change
                const isCurrentlyChecked = element.checked;
                Debug.debug(`VirtualDOM: Syncing Webflow visual state for ${element.type} - checked: ${isCurrentlyChecked}`);
                // Update the visual state class based on the actual input's current checked state
                if (isCurrentlyChecked) {
                    customInput.classList.add('w--redirected-checked');
                }
                else {
                    customInput.classList.remove('w--redirected-checked');
                }
            }
        }
        /**
         * Clean up all event listeners for an element (for memory management)
         */
        static cleanupElement(element) {
            const events = this.elementEventMap.get(element);
            if (events) {
                // Remove all event handler attributes tracked for this element
                events.forEach(eventType => {
                    element.removeAttribute(eventType);
                });
                this.elementEventMap.delete(element);
            }
            // Also clean up any child elements recursively
            const childElements = element.querySelectorAll('*');
            childElements.forEach(child => {
                const childEvents = this.elementEventMap.get(child);
                if (childEvents) {
                    childEvents.forEach(eventType => {
                        child.removeAttribute(eventType);
                    });
                    this.elementEventMap.delete(child);
                }
            });
        }
    }
    Object.defineProperty(VirtualDOM, "VOID_ELEMENTS", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Set([
            'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
            'link', 'meta', 'param', 'source', 'track', 'wbr'
        ])
    });
    Object.defineProperty(VirtualDOM, "SVG_NAMESPACE", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 'http://www.w3.org/2000/svg'
    });
    Object.defineProperty(VirtualDOM, "SVG_ELEMENTS", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Set([
            'svg', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'rect', 'path',
            'g', 'text', 'tspan', 'defs', 'use', 'symbol', 'marker', 'clipPath',
            'mask', 'pattern', 'image', 'foreignObject'
        ])
    });
    // Track elements with event listeners for cleanup
    Object.defineProperty(VirtualDOM, "elementEventMap", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new WeakMap()
    });

    function animate(element, callback) {
        var shouldAnimate = AttributeMatcher._getRawAttribute(element, "animation") ||
            _state.defaults.animation;
        if (!shouldAnimate) {
            callback();
            return;
        }
        else {
            document.startViewTransition(callback);
        }
    }

    /**
     * Performs the actual DOM update logic
     */
    async function performDomUpdate(element, newHTML, forceFullUpdate, elementId, timestamp) {
        if (forceFullUpdate) {
            // For forced updates, simply set innerHTML
            await domBatcher.write(() => {
                element.innerHTML = newHTML;
                Debug.debug(`performDomUpdate: Force full update completed for ${elementId}`);
            }, `full-update-${elementId}-${timestamp}`);
            return;
        }
        // For non-forced updates, check if HTML is empty
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newHTML;
        const hasElements = tempDiv.children.length > 0;
        const hasNonWhitespaceText = tempDiv.textContent && tempDiv.textContent.trim().length > 0;
        if (!hasElements && !hasNonWhitespaceText) {
            // Clear the container for empty HTML
            Debug.debug(`performDomUpdate: Empty newHTML detected, clearing container for element ${elementId}`);
            await domBatcher.write(() => {
                element.innerHTML = '';
            }, `clear-empty-${elementId}-${timestamp}`);
            return;
        }
        // Use Virtual DOM for efficient diffing and patching
        Debug.debug(`performDomUpdate: Using Virtual DOM for element ${elementId} with ${element.childNodes.length} child nodes`);
        Debug.debug(`performDomUpdate: Element innerHTML length: ${element.innerHTML.length}`);
        Debug.debug(`performDomUpdate: Element innerHTML preview:`, element.innerHTML.substring(0, 200));
        // Read phase: capture current DOM state
        const oldVNodes = VirtualDOM.domToVNodes(element) || [];
        Debug.debug(`performDomUpdate: Captured initial DOM state with ${oldVNodes.length} nodes`);
        Debug.debug(`performDomUpdate: Initial DOM nodes:`, oldVNodes.map((vn, i) => typeof vn === 'string' ? `${i}: "${vn}"` : `${i}: <${vn.tag}${vn.attrs.class ? ` class="${vn.attrs.class}"` : ''}>`));
        // Parse new HTML and compare
        const newVNodes = VirtualDOM.parseHTML(newHTML) || [];
        Debug.debug(`performDomUpdate: Parsed new HTML into ${newVNodes.length} nodes`);
        Debug.debug(`performDomUpdate: New DOM nodes:`, newVNodes.map((vn, i) => typeof vn === 'string' ? `${i}: "${vn}"` : `${i}: <${vn.tag}${vn.attrs.class ? ` class="${vn.attrs.class}"` : ''}>`));
        // Capture form states before making any changes (for integrity check fallback)
        const formStates = await domBatcher.read(() => captureFormStates(element), `capture-form-integrity-${elementId}-${timestamp}`);
        Debug.debug(`performDomUpdate: Captured form states for integrity check:`, formStates);
        // Write phase: diff and apply patches
        await domBatcher.batch([
            {
                type: 'write',
                operation: () => {
                    const patches = VirtualDOM.diff(oldVNodes, newVNodes);
                    Debug.debug(`performDomUpdate: Generated ${patches.length} patches`);
                    if (patches.length > 0) {
                        // Pass the expected newVNodes and captured form states for post-update verification
                        VirtualDOM.patch(element, patches, newVNodes, formStates);
                    }
                    else {
                        Debug.debug(`performDomUpdate: No patches to apply - content is identical`);
                    }
                },
                id: `vdom-patch-${elementId}-${timestamp}`
            }
        ]);
    }
    /**
     * Main update function with performance tracking and error handling
     */
    async function updateDOM(element, newHTML, animate$1 = false, instance = null) {
        const forceFullUpdate = AttributeMatcher._hasAttribute(element, "force-full-update");
        const config = ConfigManager.getConfig();
        const elementId = element.id || 'unknown';
        const timestamp = Date.now();
        Performance.start("updateDOM_" + instance?.instanceName || element.id);
        Debug.debug(`UpdateDOM: ===== STARTING UPDATE for ${elementId} at ${timestamp} =====`);
        // Add a flag to prevent multiple restorations
        const isAlreadyRestoring = element.hasAttribute("fp-restoring");
        if (isAlreadyRestoring && !forceFullUpdate) {
            Debug.debug(`UpdateDOM: Already restoring element ${elementId}, skipping update`);
            return;
        }
        // Add update counter to track multiple rapid calls
        const updateCounter = parseInt(element.getAttribute("fp-update-counter") || "0") + 1;
        element.setAttribute("fp-update-counter", updateCounter.toString());
        element.setAttribute("fp-restoring", "true");
        Debug.debug(`UpdateDOM: This is update #${updateCounter} for element ${elementId}`);
        try {
            if (!element || !(element instanceof HTMLElement)) {
                throw new Error("Invalid target element");
            }
            if (typeof newHTML !== "string") {
                throw new Error("newHTML must be a string");
            }
            Debug.debug(`UpdateDOM called for element ${elementId} with newHTML length: ${newHTML.length}`);
            if (newHTML.length === 0) {
                Debug.warn(`UpdateDOM: Empty newHTML provided for element ${elementId}`);
            }
            else {
                Debug.debug(`UpdateDOM: newHTML preview (first 200 chars): ${newHTML.substring(0, 200)}`);
            }
            // Check form persistence requirements
            const shouldHandleFormState = config.persistForm && shouldRestoreForm(element);
            // Only capture and restore form state manually when doing force update
            // Virtual DOM already preserves form element state during normal updates
            const needsManualStatePreservation = shouldHandleFormState && forceFullUpdate;
            Debug.debug("Starting updateDOM with config:", config);
            Debug.debug(`Form persistence enabled: ${config.persistForm}, Should handle form state: ${shouldHandleFormState}, Needs manual preservation (force update): ${needsManualStatePreservation}`);
            // Capture form states if manual preservation is needed (single DOM read operation)
            let formStates = null;
            let formObserver = null;
            if (needsManualStatePreservation) {
                Debug.debug("Capturing form states before update (manual preservation needed)");
                formStates = await domBatcher.read(() => captureFormStates(element), `capture-form-${elementId}-${timestamp}`);
                Debug.debug("Captured form states:", formStates);
            }
            if (shouldHandleFormState) {
                Debug.debug("Setting up dynamic form observer");
                formObserver = setupDynamicFormObserver(element);
            }
            const updateContent = () => {
                return new Promise(async (resolve) => {
                    // Publish beforeDomUpdate event
                    EventSystem.publish("beforeDomUpdate", {
                        element,
                        newHTML,
                        animate: animate$1,
                        formStates,
                    });
                    // Execute beforeDomUpdate plugin hook if instance is provided
                    if (instance) {
                        PluginManager.executeHook("beforeDomUpdate", instance, {
                            element,
                            newHTML,
                            animate: animate$1,
                            formStates,
                        });
                    }
                    // Perform the actual DOM update
                    await performDomUpdate(element, newHTML, forceFullUpdate, elementId, timestamp);
                    // Form state handling after DOM update
                    if (shouldHandleFormState) {
                        if (needsManualStatePreservation && formStates) {
                            Debug.debug("Restoring form states after update (manual preservation)");
                            await domBatcher.write(() => {
                                restoreFormStates(element, "updateDOM - form state restoration - restoreFormStates");
                            }, `restore-form-${elementId}-${timestamp}`);
                        }
                        // Always set up form submit handlers when form persistence is enabled
                        Debug.debug("Setting up form submit handlers");
                        await domBatcher.write(() => {
                            setupFormSubmitHandlers(element, "updateDOM - form state restoration - setupFormSubmitHandlers");
                        }, `setup-form-handlers-${elementId}-${timestamp}`);
                    }
                    // Execute afterDomUpdate plugin hook if instance is provided
                    if (instance) {
                        PluginManager.executeHook("afterDomUpdate", instance, {
                            element,
                            newHTML,
                            animate: animate$1,
                            formStates,
                        });
                    }
                    // Publish afterDomUpdate event
                    EventSystem.publish("afterDomUpdate", {
                        element,
                        newHTML,
                        animate: animate$1,
                        formStates,
                    });
                    resolve();
                });
            };
            // Handle view transitions for animations
            await new Promise(resolve => {
                animate(element, async () => {
                    await updateContent();
                    resolve();
                });
            });
            if (formObserver) {
                Debug.debug("Disconnecting form observer");
                formObserver.disconnect();
            }
        }
        catch (error) {
            Debug.error("Error in updateDOM:", error);
            console.error("UpdateDOM error:", error);
            throw error;
        }
        finally {
            element.removeAttribute("fp-restoring");
            Performance.end("updateDOM_" + instance?.instanceName || element.id);
            Debug.debug(`UpdateDOM: ===== COMPLETED UPDATE #${updateCounter} for ${elementId} =====`);
        }
    }

    /**
     * Checks if a string looks like a CSS selector
     * @param {string} str - String to check
     * @returns {boolean} True if the string looks like a CSS selector
     */
    function isCssSelector(str) {
        // If it starts with # or . it's definitely a selector
        if (str.startsWith("#") || str.startsWith(".")) {
            return true;
        }
        // Other CSS selector patterns
        return (/[[]>+~:()]/.test(str) || // Other CSS characters
            /^[a-z]+[a-z-]+$/i.test(str)); // Element names like div, custom-element
    }
    /**
     * Extracts data from a local variable or DOM element
     * @param {string} varName - Variable name or CSS selector
     * @param {boolean} [wrapPrimitive=true] - Whether to wrap primitive values in an object
     * @returns {Object|null} The extracted data or null if not found/error
     */
    function extractLocalData(varName, wrapPrimitive = true) {
        if (!varName)
            return null;
        try {
            // If it looks like a CSS selector, try DOM first
            if (isCssSelector(varName)) {
                const element = document.querySelector(varName);
                if (element) {
                    // Check if DataExtractor plugin is available
                    const dataExtractor = PluginManager.getPlugin("data-extractor");
                    if (dataExtractor &&
                        typeof dataExtractor.globalMethods?.processHtml === "function") {
                        try {
                            const extractedData = dataExtractor.globalMethods?.processHtml?.(element.outerHTML);
                            Debug.debug(`Extracted data from element "${varName}":`, extractedData);
                            return extractedData;
                        }
                        catch (e) {
                            Debug.error(`DataExtractor failed for "${varName}": ${e.message}`);
                            return null;
                        }
                    }
                    else {
                        Debug.warn("DataExtractor plugin not available for element extraction");
                        return null;
                    }
                }
            }
            // If not a selector or element not found, try window scope
            const value = window[varName];
            if (value !== undefined) {
                // If value is not an object and wrapping is enabled, wrap it
                if (wrapPrimitive &&
                    (typeof value !== "object" || value === null || Array.isArray(value))) {
                    let wrappedValue = { [varName]: value };
                    Debug.info(`Wrapped primitive value "${varName}":`, wrappedValue);
                    return wrappedValue;
                }
                Debug.info(`Extracted value "${varName}":`, value);
                return value;
            }
            // If we get here, neither variable nor element was found
            Debug.warn(`Neither variable nor element found for "${varName}"`);
            return null;
        }
        catch (e) {
            Debug.info(`Error extracting local data "${varName}": ${e.message}`);
            return null;
        }
    }

    function instanceMethods(instanceName) {
        // Helper function to resolve a path within the data
        function _resolvePath(path) {
            const instance = _state.instances[instanceName];
            if (!instance) {
                Debug.error("Instance not found: " + instanceName);
                return undefined;
            }
            const pathParts = path.split(/[\.\[\]'"]/);
            let current = instance.data;
            for (let i = 0; i < pathParts.length; i++) {
                const part = pathParts[i];
                if (part === "")
                    continue;
                if (current === undefined ||
                    current === null ||
                    !current.hasOwnProperty(part)) {
                    return undefined;
                }
                current = current[part];
            }
            return current;
        }
        function _validateData(data) {
            if (typeof data === "string" && data.trim().startsWith("<!DOCTYPE")) {
                Debug.debug("Data is HTML, skipping validation", instanceName);
                return { valid: true, isHtml: true };
            }
            if ((typeof data === "object" && data !== null) ||
                Array.isArray(data) ||
                typeof data === "number" ||
                typeof data === "boolean") {
                return { valid: true, isHtml: false };
            }
            Debug.error("Invalid data type: " + typeof data);
            return { valid: false, isHtml: false };
        }
        return {
            instanceName,
            animate: _state.defaults.animation,
            _updateDOM: async function () {
                const instance = _state.instances[instanceName];
                if (!instance) {
                    Debug.error("Instance not found: " + instanceName);
                    return;
                }
                try {
                    let rendered;
                    if (instance.templateId === "self" || instance.templateId === null) {
                        // For "self" template, use the first element as the template
                        const templateElement = Array.from(instance.elements)[0];
                        if (!templateElement) {
                            Debug.error("No template element found for self template", instance.instanceName);
                            return;
                        }
                        rendered = templateElement.innerHTML;
                    }
                    else if (!instance.template) {
                        Debug.error("No template found for instance", instance.instanceName);
                        return;
                    }
                    else {
                        // Check if data is valid
                        const { valid, isHtml } = _validateData(instance.data);
                        if (!valid) {
                            Debug.error("Invalid data type for instance", instance.instanceName);
                            return;
                        }
                        if (isHtml) {
                            Debug.debug("Data is HTML, using as is", instance.instanceName);
                            rendered = instance.data;
                        }
                        else {
                            // Apply plugin transformations to the data before rendering
                            Debug.debug("Before transformation - instance data:", {
                                instanceName: instance.instanceName,
                                rawData: instance.data,
                                getData: instance.getData(),
                            });
                            const transformedData = PluginManager.applyTransformations(instance, instance.getData(), "transformDataBeforeRender", "json");
                            Debug.debug("After transformation - transformed data:", {
                                instanceName: instance.instanceName,
                                transformedData,
                                isNull: transformedData === null,
                                isUndefined: transformedData === undefined,
                                type: typeof transformedData,
                            });
                            // Use transformed data for reactive rendering
                            rendered = instance.template(transformedData);
                            Debug.debug(`[InstanceMethods] Template rendered result`, {
                                instanceName: instance.instanceName,
                                template: instance.templateId,
                                renderedLength: rendered ? rendered.length : 0,
                                renderedPreview: rendered ? rendered.substring(0, 200) + '...' : 'null/undefined',
                                hasContent: rendered && rendered.trim().length > 0
                            });
                        }
                    }
                    // Filter out elements that are no longer in the DOM
                    const activeElements = Array.from(instance.elements).filter((el) => document.body.contains(el));
                    if (activeElements.length === 0) {
                        Debug.error("No active elements found for instance", instance.instanceName);
                        return;
                    }
                    // Batch DOM updates to reduce layout thrashing
                    const updatePromises = activeElements.map((element) => domBatcher.write(() => updateDOM(element, rendered, instance.animate, instance), `update-${instance.instanceName}-${Date.now()}`));
                    // Wait for all batched element updates to complete
                    const results = await Promise.all(updatePromises);
                    return results;
                }
                catch (error) {
                    Debug.error("Error updating DOM for instance", instance.instanceName, error);
                }
            },
            /**
             * Replaces the entire instance data with newData,
             * removing keys not present in newData.
             * Triggers reactive updates via the proxy.
             * @param {Object} newData The new data object.
             */
            setData: function (newData) {
                const instance = _state.instances[instanceName];
                if (!instance) {
                    Debug.error("Instance not found: " + instanceName);
                    return this;
                }
                // If newData is an unnamed root object (no data property), wrap it
                if (typeof newData === "string" ||
                    typeof newData === "number" ||
                    Array.isArray(newData)) {
                    Debug.warn(`[setData] Received raw value or unnamed root object, automatically wrapping in 'data' property`);
                    newData = { data: newData };
                }
                // Validate newData type (allow empty objects)
                if (typeof newData !== "object" ||
                    newData === null ||
                    Array.isArray(newData)) {
                    Debug.error("Invalid newData type provided to setData: " + typeof newData);
                    return this;
                }
                const currentData = instance.data; // The proxy's target
                Debug.debug(`[setData] Replacing data for ${instanceName}. Current keys: ${Object.keys(currentData).join(", ")}, New keys: ${Object.keys(newData).join(", ")}`);
                // Delete keys not present in newData
                let deletedKeys = [];
                for (const key in currentData) {
                    if (Object.hasOwnProperty.call(currentData, key) &&
                        !Object.hasOwnProperty.call(newData, key)) {
                        deletedKeys.push(key);
                        delete currentData[key]; // Triggers proxy delete trap
                    }
                }
                if (deletedKeys.length > 0) {
                    Debug.debug(`[setData] Deleted stale keys for ${instanceName}: ${deletedKeys.join(", ")}`);
                }
                // Update with new data - use deepMerge for proper handling of nested objects
                deepMerge(currentData, newData);
                Debug.debug(`[setData] Data replacement complete for ${instanceName}.`);
                return this;
            },
            remove: function () {
                const instance = _state.instances[instanceName];
                if (!instance) {
                    throw new Error("Instance not found: " + instanceName);
                }
                EventSystem.publish("beforeRemove", {
                    instanceName,
                    elements: instance.elements,
                });
                try {
                    // Remove from localStorage if storage is enabled
                    if (ConfigManager.getConfig().storage?.enabled) {
                        localStorage.removeItem(`fp_${instanceName}`);
                    }
                    // Clear elements and remove from DOM
                    instance.elements.forEach(function (element) {
                        try {
                            element.innerHTML = "";
                        }
                        catch (error) {
                            Debug.error("Error removing instance: " + error.message);
                        }
                    });
                    // Clear the elements array
                    instance.elements = [];
                    // Remove from state
                    delete _state.instances[instanceName];
                    delete _state.templateCache[instance.templateId];
                    EventSystem.publish("afterRemove", {
                        instanceName,
                        elements: [],
                    });
                    Debug.info("Removed instance: " + instanceName);
                    return true;
                }
                catch (error) {
                    throw error;
                }
            },
            refresh: async function (options = { remote: true, recompile: false, ignoreLocalData: false }) {
                const instance = _state.instances[instanceName];
                if (!instance) {
                    Debug.error("Instance not found: " + instanceName);
                    return Promise.reject(new Error("Instance not found: " + instanceName));
                }
                // Apply transformations before checking template
                const transformedData = PluginManager.applyTransformations(instance, instance.data, "transformDataBeforeRender", "json");
                // If recompile is true, recompile the template
                const compiledTemplate = instance.template(transformedData);
                const shouldRecompile = options.recompile || (!compiledTemplate && instance.data);
                if (shouldRecompile) {
                    instance.template = compileTemplate(instance.templateId, true);
                }
                Debug.debug("Refresh - Template check:", {
                    templateId: instance.templateId,
                    templateElement: document.querySelector(instance.templateId),
                    compiledTemplate: instance.template(transformedData),
                });
                // Check for local variable at instance level first
                let hasLocalVarUpdate = false;
                if (instance.localVarName && !options.ignoreLocalData) {
                    const localData = extractLocalData(instance.localVarName);
                    if (localData) {
                        deepMerge(instance.data, localData);
                        hasLocalVarUpdate = true;
                        Debug.debug(`Refreshed data from local variable "${instance.localVarName}"`);
                    }
                }
                const promises = [];
                instance.elements.forEach(async function (element) {
                    try {
                        if (options.remote && !hasLocalVarUpdate) {
                            const htmxMethods = ["get", "post", "put", "patch", "delete"];
                            const hasHtmxMethod = htmxMethods.some((method) => element.getAttribute(`hx-${method}`));
                            if (hasHtmxMethod) {
                                const method = htmxMethods.find((method) => element.getAttribute(`hx-${method}`));
                                const url = element.getAttribute(`hx-${method}`);
                                const promise = fetch(url, { method: method?.toUpperCase() })
                                    .then((response) => {
                                    if (!response.ok) {
                                        throw new Error(`HTTP error! status: ${response.status}`);
                                    }
                                    return response.json();
                                })
                                    .then((data) => {
                                    // Update data which will trigger render - use deepMerge instead of Object.assign
                                    deepMerge(instance.data, data);
                                    // Store data if storage is enabled
                                    if (ConfigManager.getConfig().storage?.enabled) {
                                        saveToLocalStorage(instanceName, instance.data, "instance");
                                    }
                                    return data;
                                });
                                promises.push(promise);
                            }
                        }
                        else {
                            Debug.debug("Instance.refresh - Using _updateDOM for proper data flow", { instanceName, elementId: element.id || 'no-id' });
                            // Use the instance's _updateDOM method for proper data transformation pipeline
                            promises.push(instance._updateDOM());
                        }
                    }
                    catch (error) {
                        element.innerHTML = `<div class="fp-error">Error refreshing template: ${error.message}</div>`;
                        Debug.error(`Failed to refresh template: ${error.message}`);
                        promises.push(Promise.reject(error));
                    }
                });
                return Promise.all(promises);
            },
            getData: function () {
                const proxy = _state.instances[instanceName].data;
                return JSON.parse(JSON.stringify(proxy));
            },
            getElements: function () {
                return _state.instances[instanceName].elements;
            },
            getTemplateElement: function () {
                return _state.instances[instanceName].templateElement;
            },
            get: function (path) {
                return !path ? this.getData?.() : _resolvePath.call(this, path);
            },
            refreshTemplate: function (templateId, recompile = false) {
                Performance.start("refreshTemplate:" + templateId);
                const compiledTemplate = compileTemplate(templateId, recompile);
                if (!compiledTemplate) {
                    Debug.error("Failed to compile template: " + templateId);
                    Performance.end("refreshTemplate:" + templateId);
                    return false;
                }
                return true;
            },
        };
    }

    const GroupManager = {
        getOrCreateGroup(groupName, initialData = {}) {
            let existingGroup = _state.groups[groupName];
            if (existingGroup) {
                // Merge any new initial data
                if (Object.keys(initialData).length > 0) {
                    deepMerge(existingGroup.data, initialData);
                    Debug.debug(`[GroupManager] Merged initialData into existing group: ${groupName}`, initialData);
                }
                return existingGroup;
            }
            // --- Group doesn't exist in state, attempt to load from storage ---
            let baseData = {}; // Start with empty base
            if (ConfigManager.getConfig().storage?.enabled) {
                // Check if storage is currently enabled
                try {
                    const loadedData = loadFromLocalStorage(groupName, "group");
                    if (loadedData) {
                        Debug.info(`[GroupManager] Loaded group data from storage for: ${groupName}`);
                        baseData = loadedData; // Use loaded data as the base
                    }
                    else {
                        Debug.debug(`[GroupManager] No group data found in storage for: ${groupName}`);
                    }
                }
                catch (e) {
                    Debug.error(`[GroupManager] Error loading group ${groupName} from storage: ${e.message}`);
                    // Proceed with empty baseData on error
                }
            }
            else {
                Debug.debug(`[GroupManager] Storage is disabled, skipping loadFromLocalStorage for: ${groupName}`);
            }
            // Merge any explicitly passed initialData *on top* of the base (loaded or empty)
            if (Object.keys(initialData).length > 0) {
                baseData = deepMerge(baseData, initialData);
                Debug.debug(`[GroupManager] Merged initialData onto base for new group: ${groupName}`, initialData);
            }
            // --- Create new group with the final baseData ---
            Debug.info(`[GroupManager] Creating new group: ${groupName} with base data`, baseData);
            const group = {
                name: groupName,
                elements: [],
                addElement: (element) => {
                    group.elements.push(element);
                },
                removeElement: (element) => {
                    group.elements = group.elements.filter((e) => e !== element);
                },
                instances: new Set(),
                _isEvaluating: false,
                _lastRenderedOutputs: new Map(),
                data: {}, // Will be replaced with proxy
                getData: () => {
                    return JSON.parse(JSON.stringify(_state.groups[groupName].data));
                },
                update: (data) => {
                    deepMerge(group.data, data);
                },
                refresh: () => {
                    group.update(group.data);
                },
                destroy: () => {
                    delete _state.groups[groupName];
                },
            };
            // Create proxy for group data using the final baseData
            group.data = createDeepProxy(baseData, async () => {
                // Skip if already evaluating to prevent circular updates
                if (group._isEvaluating)
                    return;
                try {
                    group._isEvaluating = true;
                    Debug.info(`[Group Update] Updating all instances in group: ${groupName}`);
                    // Get array of instances that are ready for updates
                    const instances = Array.from(group.instances).filter((instance) => instance.template &&
                        typeof instance.template === "function" &&
                        !instance._htmxUpdateInProgress);
                    // Create update promises for all instances
                    const updatePromises = instances.map(async (instance) => {
                        try {
                            // Get transformed data
                            const transformedData = PluginManager.applyTransformations(instance, group.getData(), "transformDataBeforeRender", "json");
                            // Render template
                            const newRenderedOutput = instance.template(transformedData);
                            const previousOutput = group._lastRenderedOutputs.get(instance.instanceName);
                            // Only update if output changed
                            if (previousOutput !== newRenderedOutput) {
                                // Execute hooks
                                PluginManager.executeHook("updateData", instance, {
                                    newData: group.data,
                                    source: "group",
                                });
                                EventSystem.publish("updateData", {
                                    instanceName: instance.instanceName,
                                    groupName: groupName,
                                    newData: group.data,
                                    source: "group",
                                });
                                // Update DOM
                                Debug.debug(`[Group Update] Updating DOM for ${instance.instanceName}`);
                                return instance._updateDOM().then(() => {
                                    // Store rendered output
                                    group._lastRenderedOutputs.set(instance.instanceName, newRenderedOutput);
                                });
                            }
                        }
                        catch (error) {
                            Debug.error(`Error updating ${instance.instanceName}:`, error);
                        }
                    });
                    // Wait for all instance updates to complete
                    await Promise.all(updatePromises);
                    // Save to storage if enabled - dynamically checks ConfigManager.getConfig
                    if (ConfigManager.getConfig().storage?.enabled) {
                        Debug.debug(`[Group Update] Saving group data for ${groupName}`);
                        saveToLocalStorage(groupName, group.data, "group");
                    }
                }
                finally {
                    group._isEvaluating = false;
                }
            });
            // Store group in state
            _state.groups[groupName] = group;
            Debug.info(`[GroupManager] Created and stored new group: ${groupName}`);
            return group;
        },
        getGroup(groupName) {
            return _state.groups[groupName] || null;
        },
        getAllGroups() {
            return _state.groups;
        },
        updateGroup(groupName, data) {
            const group = this.getGroup(groupName);
            if (group && group.data && typeof data === "object") {
                deepMerge(group.data, data);
                return group;
            }
            return null;
        },
        removeGroup(groupName) {
            const group = this.getGroup(groupName);
            if (group) {
                delete _state.groups[groupName];
                Debug.info(`Removed group: ${groupName}`);
            }
        },
        removeAllGroups() {
            _state.groups = {};
            Debug.info("Removed all groups");
        },
        /**
         * Adds an instance to a group
         * @param {Object} instance - The instance to add
         * @param {string} groupName - The name of the group
         */
        addInstanceToGroup(instance, groupName) {
            const group = this.getOrCreateGroup(groupName);
            if (group) {
                // Set instance's group reference
                instance.groupName = groupName;
                // Add instance to group
                group.instances.add(instance);
                // Only try to render if the template is actually a function
                if (instance.template && typeof instance.template === "function") {
                    // Store instance's initial rendered output
                    const transformedData = PluginManager.applyTransformations(instance, group.getData(), "transformDataBeforeRender", "json");
                    try {
                        const renderedOutput = instance.template(transformedData);
                        group._lastRenderedOutputs.set(instance.instanceName, renderedOutput);
                    }
                    catch (error) {
                        Debug.error(`Error rendering template for group member: ${error.message}`);
                    }
                }
                else {
                    Debug.debug(`Skipping initial render for group member: template not ready for ${instance.instanceName}`);
                }
                Debug.debug(`Added instance ${instance.instanceName} to group ${groupName}`);
            }
        },
        /**
         * Removes an instance from its group
         * @param {Object} instance - The instance to remove
         */
        removeInstanceFromGroup(instance) {
            if (!instance.groupName) {
                return;
            }
            const group = _state.groups[instance.groupName];
            if (group) {
                group.instances.delete(instance);
                group._lastRenderedOutputs.delete(instance.instanceName);
                Debug.debug(`Removed instance ${instance.instanceName} from group ${instance.groupName}`);
                // Clean up empty groups
                if (group.instances.size === 0) {
                    delete _state.groups[instance.groupName];
                    Debug.info(`Removed empty group: ${instance.groupName}`);
                }
            }
            // Remove group reference from instance
            delete instance.groupName;
        },
    };

    const InstanceManager = {
        /**
         * Gets an existing instance or creates a new one.
         * The data proxy should be assigned by the caller AFTER getting the instance.
         * @param {HTMLElement} element - The DOM element
         * @param {Object} initialData - Initial data object (will be replaced by proxy later)
         * @param {FlowPlaterElement[]} [cachedElements] - Pre-cached elements to avoid DOM queries
         * @returns {Object} The instance
         */
        getOrCreateInstance(element, initialData = {}, cachedElements) {
            // Skip if element is already indexed
            if (AttributeMatcher._hasAttribute(element, "indexed")) {
                Debug.debug(`Element already indexed: ${element.id || AttributeMatcher._getRawAttribute(element, "instance")}`);
                return _state.instances[AttributeMatcher._getRawAttribute(element, "instance") || element.id];
            }
            const instanceName = AttributeMatcher._getRawAttribute(element, "instance") || element.id;
            if (!instanceName) {
                Debug.error("No instance name found for element");
                return null;
            }
            // Check for stored data and merge with initialData
            let finalInitialData = { ...initialData };
            if (ConfigManager.getConfig().storage?.enabled) {
                const storedData = loadFromLocalStorage(instanceName, "instance");
                if (storedData) {
                    Debug.info(`Found stored data for instance: ${instanceName}, merging with initial data`);
                    finalInitialData = { ...storedData, ...initialData };
                }
            }
            // Check if this element belongs to a group
            const groupName = AttributeMatcher._getRawAttribute(element, "group");
            let instance = _state.instances[instanceName];
            if (!instance) {
                // If this is not a template element, look for a parent template element
                if (!AttributeMatcher._hasAttribute(element, "template")) {
                    const parentTemplateElement = AttributeMatcher.findMatchingElements("template")?.find((el) => AttributeMatcher._getRawAttribute(el, "instance") === instanceName);
                    if (parentTemplateElement) {
                        Debug.debug(`Found parent template element for instance ${instanceName}`);
                        return this.getOrCreateInstance(parentTemplateElement, finalInitialData);
                    }
                    else {
                        Debug.error(`No template element found for instance ${instanceName}`);
                        return null;
                    }
                }
                // Create new instance with the template element
                const baseInstance = {
                    instanceName: instanceName,
                    elements: [element],
                    template: null, // Template will be assigned by caller
                    templateId: AttributeMatcher._getRawAttribute(element, "template") || "",
                    templateElement: element, // Store direct reference to the template element
                    data: finalInitialData, // Assign initial data (including stored data), caller MUST replace with Proxy
                    cleanup: () => {
                        // Remove from group if part of one
                        if (instance.groupName) {
                            GroupManager.removeInstanceFromGroup(instance);
                        }
                        instance.elements = [];
                    },
                };
                // Add instance methods to complete the FlowPlaterInstance interface
                const instanceMethodsObj = instanceMethods(instanceName);
                // Create the complete instance by merging base properties with methods
                instance = Object.assign(baseInstance, instanceMethodsObj);
                // Add plugin instance methods
                const methods = PluginManager.instanceMethods;
                for (const [methodName] of methods.entries()) {
                    // Add method to instance
                    instance[methodName] = (...args) => PluginManager.executeInstanceMethod(methodName, instance, ...args);
                }
                _state.instances[instanceName] = instance;
                // Execute newInstance hook
                PluginManager.executeHook("newInstance", instance);
                Debug.info(`Created new instance: ${instanceName}`);
                // Use cached elements if provided, otherwise find all elements with matching fp-instance attribute
                const matchingElements = cachedElements || AttributeMatcher.findMatchingElements("instance", instanceName);
                // Add matching elements to the instance's elements Array
                matchingElements.forEach((matchingElement) => {
                    if (matchingElement !== element) {
                        // Check for target attributes, including inherited ones
                        const targetSelector = AttributeMatcher.findInheritedAttribute(matchingElement, "target");
                        if (targetSelector) {
                            let targetElements = [];
                            // Helper function for sibling traversal
                            const findSibling = (direction, selector) => {
                                const prop = direction === 'next' ? 'nextElementSibling' : 'previousElementSibling';
                                let current = matchingElement[prop];
                                if (!selector)
                                    return current ? [current] : [];
                                while (current) {
                                    if (current.matches(selector))
                                        return [current];
                                    current = current[prop];
                                }
                                return [];
                            };
                            switch (true) {
                                case targetSelector === "this":
                                    targetElements = [matchingElement];
                                    break;
                                case targetSelector.startsWith("closest "):
                                    const closest = matchingElement.closest(targetSelector.substring(8));
                                    if (closest)
                                        targetElements = [closest];
                                    break;
                                case targetSelector.startsWith("find "):
                                    const found = matchingElement.querySelector(targetSelector.substring(5));
                                    if (found)
                                        targetElements = [found];
                                    break;
                                case targetSelector === "next" || targetSelector.startsWith("next "):
                                    const nextSelector = targetSelector === "next" ? undefined : targetSelector.substring(5);
                                    targetElements = findSibling('next', nextSelector);
                                    break;
                                case targetSelector === "previous" || targetSelector.startsWith("previous "):
                                    const prevSelector = targetSelector === "previous" ? undefined : targetSelector.substring(9);
                                    targetElements = findSibling('previous', prevSelector);
                                    break;
                                default:
                                    targetElements = Array.from(document.querySelectorAll(targetSelector));
                            }
                            // Add all found target elements to the instance
                            targetElements.forEach((targetElement) => {
                                if (!instance.elements.includes(targetElement)) {
                                    instance.elements.push(targetElement);
                                }
                                targetElement.setAttribute("fp-indexed", "true");
                            });
                        }
                        else {
                            if (!instance.elements.includes(matchingElement)) {
                                instance.elements.push(matchingElement);
                            }
                        }
                        // Mark the element as indexed
                        matchingElement.setAttribute("fp-indexed", "true");
                    }
                });
                // Mark the template element as indexed
                element.setAttribute("fp-indexed", "true");
                // Handle group membership, but don't set data proxy here - that happens in Template.js
                if (groupName) {
                    instance.groupName = groupName;
                    Debug.info(`Instance ${instanceName} will be added to group ${groupName}`);
                }
            }
            else {
                // If instance exists, add the new element to its array (if not already present)
                if (!instance.elements.includes(element)) {
                    instance.elements.push(element);
                }
                // Mark the element as indexed
                element.setAttribute("fp-indexed", "true");
                Debug.debug(`Added element to existing instance: ${instanceName}`);
                // Check for group membership
                if (groupName && !instance.groupName) {
                    instance.groupName = groupName;
                    Debug.info(`Added existing instance ${instanceName} to group ${groupName}`);
                }
            }
            return instance;
        },
        /**
         * Updates an instance's data via the proxy. USE WITH CAUTION.
         * Prefer direct proxy manipulation.
         * @param {Object} instance - The instance to update
         * @param {Object} newData - New data for the instance
         */
        updateInstanceData(instance, newData) {
            if (!instance || !instance.data) {
                Debug.error("Cannot update data: Instance or instance.data is invalid.");
                return;
            }
            // Update data through the proxy to trigger reactivity
            deepMerge(instance.data, newData);
            // No explicit re-render needed here, proxy handler should trigger _updateDOM
            // No explicit save needed here, proxy handler should save
        },
        /**
         * Discovers and creates all instances from template elements
         * @param {Document | FlowPlaterElement} rootElement - Root element to search within
         */
        createAllInstances(rootElement = document) {
            Performance.start("createAllInstances");
            // Pre-cache all instance elements in one DOM query to avoid redundant searches
            const elementCache = this._cacheInstanceElements(rootElement);
            // Find all templates using AttributeMatcher
            const templatesResult = AttributeMatcher.findMatchingElements("template", null, true, rootElement);
            const templates = (Array.isArray(templatesResult) ? templatesResult : [templatesResult]).filter(el => el && !AttributeMatcher._hasAttribute(el, "indexed"));
            Debug.info(`Found ${templates.length} templates to process`);
            templates.forEach((template) => {
                let templateId = AttributeMatcher._getRawAttribute(template, "template");
                if (templateId === DEFAULTS.TEMPLATE.SELF_TEMPLATE_ID || templateId === "") {
                    templateId = template.id;
                }
                if (templateId) {
                    const instanceName = AttributeMatcher._getRawAttribute(template, "instance") || template.id;
                    // Transform template content (moved from init)
                    this._transformTemplateContent(templateId);
                    // Compile template
                    const compiledTemplate = compileTemplate(templateId, true);
                    // Create instance with cached elements to avoid DOM queries
                    const instance = this.getOrCreateInstance(template, {}, elementCache.get(instanceName));
                    // Set up the instance with template and proxy
                    if (instance && compiledTemplate) {
                        this._setupInstanceProxy(instance, compiledTemplate, templateId);
                    }
                    Debug.debug(`Created instance for template: ${templateId}`);
                }
                else {
                    Debug.error(`No template ID found for element: ${template.id}`, template);
                }
            });
            Performance.end("createAllInstances");
        },
        /**
         * Pre-cache all instance elements to avoid redundant DOM queries
         * @private
         */
        _cacheInstanceElements(rootElement = document) {
            const cache = new Map();
            // Use AttributeMatcher to properly find all instance elements
            const allInstanceElements = AttributeMatcher.findMatchingElements("instance", null, true, rootElement);
            // Group by instance name
            allInstanceElements.forEach((element) => {
                const instanceName = AttributeMatcher._getRawAttribute(element, "instance") || element.id;
                if (instanceName) {
                    if (!cache.has(instanceName)) {
                        cache.set(instanceName, []);
                    }
                    cache.get(instanceName).push(element);
                }
            });
            return cache;
        },
        /**
         * Performs initial rendering for all instances based on their configuration
         */
        renderAll() {
            Performance.start("renderAll");
            const instances = Object.values(_state.instances);
            Debug.info(`Rendering ${instances.length} instances`);
            instances.forEach((instance) => {
                if (this._shouldSkipInitialRender(instance)) {
                    Debug.debug(`Skipping initial render for ${instance.instanceName} (has request method)`);
                    return;
                }
                // Use existing _updateDOM which handles all the transformation pipeline
                if (instance._updateDOM) {
                    instance._updateDOM();
                    Debug.debug(`Rendered instance: ${instance.instanceName}`);
                }
                else {
                    Debug.warn(`Instance ${instance.instanceName} missing _updateDOM method`);
                }
            });
            Performance.end("renderAll");
        },
        /**
         * Determines if an instance should skip initial rendering
         * @private
         */
        _shouldSkipInitialRender(instance) {
            const template = instance.templateElement;
            if (!template)
                return false;
            // Check for HTTP method attributes that would trigger requests
            const methods = ["get", "post", "put", "patch", "delete"];
            const hasRequestMethod = methods.some((method) => AttributeMatcher._hasAttribute(template, method));
            if (hasRequestMethod)
                return true;
            // Check for other trigger attributes
            const httpTriggerAttributes = ["trigger", "boost", "ws", "sse"];
            return httpTriggerAttributes.some((attr) => AttributeMatcher._hasAttribute(template, attr));
        },
        /**
         * Transforms template content (moved from init method)
         * @private
         */
        _transformTemplateContent(templateId) {
            const templateElement = document.querySelector(templateId);
            if (!templateElement)
                return;
            Debug.info("Transforming template content", templateElement);
            const scriptTags = templateElement.getElementsByTagName("script");
            const scriptContents = Array.from(scriptTags).map((script) => script.innerHTML);
            // Temporarily replace script contents with placeholders
            Array.from(scriptTags).forEach((script, i) => {
                script.innerHTML = `##FP_SCRIPT_${i}##`;
            });
            // Do the replacement on the template
            templateElement.innerHTML = templateElement.innerHTML.replace(/\[\[(.*?)\]\]/g, "{{$1}}");
            // Restore script contents
            Array.from(templateElement.getElementsByTagName("script")).forEach((script, i) => {
                script.innerHTML = scriptContents[i];
            });
        },
        /**
         * Sets up the instance with compiled template and data proxy
         * @private
         */
        _setupInstanceProxy(instance, compiledTemplate, templateId) {
            // Set the compiled template
            instance.template = compiledTemplate;
            instance.templateId = templateId;
            // Get the current data (which may already include stored data from getOrCreateInstance)
            const currentData = instance.data || {};
            // Check if this instance is part of a group
            const groupName = instance.groupName;
            if (groupName) {
                // Get or create the group and add this instance
                const group = GroupManager.getOrCreateGroup(groupName, currentData);
                // Use the group's proxy for this instance
                instance.data = group.data;
                // Add instance to the group
                GroupManager.addInstanceToGroup(instance, groupName);
                Debug.info(`Instance ${instance.instanceName} is using group ${groupName} data`);
            }
            else {
                // Create individual proxy with debounced update handler
                const DEBOUNCE_DELAY = DEFAULTS.PERFORMANCE.DEBOUNCE_DELAY;
                // Set up debounce tracking properties
                if (!instance._updateTimer) {
                    instance._updateTimer = null;
                }
                if (!instance._stateBeforeDebounce) {
                    instance._stateBeforeDebounce = null;
                }
                const proxy = createDeepProxy(currentData, () => {
                    if (instance) {
                        // Skip if we're currently evaluating a template
                        if (instance._isEvaluating) {
                            return;
                        }
                        // Clear existing timer
                        if (instance._updateTimer) {
                            clearTimeout(instance._updateTimer);
                        }
                        // Schedule the update
                        instance._updateTimer = setTimeout(() => {
                            try {
                                // Set flag to prevent recursive updates during evaluation
                                instance._isEvaluating = true;
                                // Get the current rendered output
                                const transformedData = PluginManager.applyTransformations(instance, instance.getData(), "transformDataBeforeRender", "json");
                                const newRenderedOutput = instance.template(transformedData);
                                // Compare with previous render
                                if (instance._lastRenderedOutput !== newRenderedOutput) {
                                    Debug.info(`[Debounced Update] Output changed for ${instance.instanceName}. Firing updateData hook.`);
                                    // Execute hooks with current state
                                    PluginManager.executeHook("updateData", instance, {
                                        newData: proxy,
                                        source: "proxy",
                                    });
                                    EventSystem.publish("updateData", {
                                        instanceName: instance.instanceName,
                                        newData: proxy,
                                        source: "proxy",
                                    });
                                    // Update DOM since output changed
                                    Debug.debug(`[Debounced Update] Triggering _updateDOM for ${instance.instanceName}`);
                                    instance._updateDOM();
                                    // Save the new rendered output
                                    instance._lastRenderedOutput = newRenderedOutput;
                                    // Save to storage if enabled
                                    if (ConfigManager.getConfig().storage?.enabled) {
                                        const storageId = instance.instanceName.replace("#", "");
                                        Debug.debug(`[Debounced Update] Saving data for ${storageId}`);
                                        saveToLocalStorage(storageId, proxy, "instance");
                                    }
                                }
                                else {
                                    Debug.debug(`[Debounced Update] No output change for ${instance.instanceName}. Skipping update.`);
                                }
                            }
                            finally {
                                // Always clear the evaluation flag
                                instance._isEvaluating = false;
                                // Clear timer
                                instance._updateTimer = null;
                            }
                        }, DEBOUNCE_DELAY);
                    }
                });
                // Assign the proxy to the instance
                instance.data = proxy;
            }
            Debug.debug(`Set up proxy for instance: ${instance.instanceName}`);
        }
    };

    function render({ template, data, target, returnHtml = false, instanceName, recompile = false, }) {
        Performance.start("render:" + (instanceName || "anonymous"));
        // Simple validation
        if (!template || !target) {
            Debug.error("Template and target are required for render");
            Performance.end("render:" + (instanceName || "anonymous"));
            return null;
        }
        // Resolve target elements
        let targetElements = [];
        if (target instanceof NodeList) {
            targetElements = Array.from(target);
        }
        else if (typeof target === "string") {
            targetElements = Array.from(document.querySelectorAll(target));
        }
        else if (target instanceof Element) {
            targetElements = [target];
        }
        if (targetElements.length === 0) {
            Debug.error("No target elements found for render");
            Performance.end("render:" + (instanceName || "anonymous"));
            return null;
        }
        // Determine instance name
        if (!instanceName) {
            if (AttributeMatcher._hasAttribute(targetElements[0], "instance")) {
                instanceName = AttributeMatcher._getRawAttribute(targetElements[0], "instance") || undefined;
            }
            else if (targetElements[0].id) {
                instanceName = targetElements[0].id;
            }
            else {
                instanceName = "anonymous_" + Date.now();
            }
        }
        // Get existing instance or return null
        const instance = instanceName ? _state.instances[instanceName] : null;
        if (!instance) {
            Debug.error("Instance not found for render:", instanceName);
            Performance.end("render:" + (instanceName || "anonymous"));
            return null;
        }
        // Compile template if needed
        const compiledTemplate = compileTemplate(template, recompile);
        if (!compiledTemplate) {
            Debug.error("Failed to compile template:", template);
            Performance.end("render:" + (instanceName || "anonymous"));
            return null;
        }
        // Update instance data if provided
        if (data && typeof data === "object") {
            Object.assign(instance.data, data);
        }
        // Handle return HTML case
        if (returnHtml) {
            const transformedData = PluginManager.applyTransformations(instance, instance.getData(), "transformDataBeforeRender", "json");
            const result = compiledTemplate(transformedData);
            Performance.end("render:" + (instanceName || "anonymous"));
            return result;
        }
        // Trigger DOM update
        if (instance._updateDOM) {
            instance._updateDOM();
        }
        else {
            Debug.warn(`Instance ${instanceName} missing _updateDOM method`);
        }
        Performance.end("render:" + (instanceName || "anonymous"));
        return instance;
    }

    function compare(left, operator, right) {
        // Convert string numbers to actual numbers for comparison
        if (!isNaN(left))
            left = Number(left);
        if (!isNaN(right))
            right = Number(right);
        function isNullOrUndefined(value) {
            return value === null || value === undefined;
        }
        // Handle null/undefined comparisons
        if (isNullOrUndefined(left) || isNullOrUndefined(right)) {
            switch (operator) {
                case "==":
                    return left == right;
                case "!=":
                    return left != right;
                case "&&":
                    return Boolean(left) && Boolean(right);
                case "||":
                    return Boolean(left) || Boolean(right);
                default:
                    return false;
            }
        }
        // String comparisons
        if (typeof left === "string" && typeof right === "string") {
            switch (operator) {
                case "==":
                    return left.localeCompare(right) === 0;
                case "!=":
                    return left.localeCompare(right) !== 0;
                case "<":
                    return left.localeCompare(right) < 0;
                case ">":
                    return left.localeCompare(right) > 0;
                case "<=":
                    return left.localeCompare(right) <= 0;
                case ">=":
                    return left.localeCompare(right) >= 0;
                default:
                    throw new TemplateError("Unsupported operator for strings: " + operator);
            }
        }
        // Numeric and boolean comparisons
        switch (operator) {
            case "==":
                return left == right;
            case "!=":
                return left != right;
            case "<":
                return left < right;
            case ">":
                return left > right;
            case "<=":
                return left <= right;
            case ">=":
                return left >= right;
            case "&&":
                return Boolean(left) && Boolean(right);
            case "||":
                return Boolean(left) || Boolean(right);
            case "regex":
                return new RegExp(right).test(left);
            default:
                throw new TemplateError("Unsupported operator: " + operator);
        }
    }

    /**
     * Checks if a property exists in the current context when it doesn't exist in the global context
     * and provides a helpful warning message to guide developers to use 'this.property' syntax
     *
     * @param propertyName - The property name being accessed
     * @param currentValue - The current value being checked (should be dataContext for root level checks)
     * @param dataContext - The root/global data context
     * @param currentContext - The current template context (this)
     */
    function verifyContext(propertyName, currentValue, dataContext, currentContext) {
        // Only check if we're at the root level of property resolution
        if (currentValue === dataContext &&
            currentContext &&
            typeof currentContext === "object" &&
            Object.prototype.hasOwnProperty.call(currentContext, propertyName)) {
            Debug.warn(`The '${propertyName}' property does not exist in the global context. Did you mean 'this.${propertyName}'?`);
        }
    }

    function ifHelper() {
        const Handlebars = window.Handlebars;
        Handlebars.unregisterHelper("if");
        Handlebars.registerHelper("if", function (expressionString, options) {
            function resolveValue(token, dataContext, currentContext) {
                // Handle string literals
                if ((token.startsWith('"') && token.endsWith('"')) ||
                    (token.startsWith("'") && token.endsWith("'"))) {
                    return token.slice(1, -1);
                }
                // Handle numeric literals
                if (!isNaN(Number(token))) {
                    return parseFloat(token);
                }
                // Handle 'this' references
                if (token === "this") {
                    return currentContext;
                }
                if (token.startsWith("this.")) {
                    const path = token.split(".").slice(1);
                    let value = currentContext;
                    for (const part of path) {
                        if (value && typeof value === "object") {
                            // Check if property exists using hasOwnProperty
                            if (Object.prototype.hasOwnProperty.call(value, part)) {
                                value = value[part];
                            }
                            else {
                                return undefined;
                            }
                        }
                        else {
                            return undefined;
                        }
                    }
                    return value;
                }
                // Handle nested object paths
                const path = token.split(".");
                let value = dataContext;
                for (const part of path) {
                    if (value && typeof value === "object") {
                        // Check if property exists using hasOwnProperty
                        if (Object.prototype.hasOwnProperty.call(value, part)) {
                            value = value[part];
                            // Property exists, return the value even if falsy
                            continue;
                        }
                        // Property doesn't exist in root context, check if it exists in current context
                        verifyContext(part, value, dataContext, currentContext);
                        return undefined;
                    }
                    else {
                        return undefined;
                    }
                }
                return value;
            }
            try {
                // If expressionString is a simple property name (no operators)
                if (!expressionString.match(/\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/)) {
                    // Get the value and check if it's truthy (assume second argument is "true")
                    const value = resolveValue(expressionString, options.data.root, this);
                    // Return true if the value is truthy
                    return value ? options.fn(this) : options.inverse(this);
                }
                // Parse expression for complex conditions
                const expression = expressionString.trim();
                let [leftToken, operator, rightToken] = expression.split(/\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/);
                if (!leftToken || (operator && !rightToken) || (!leftToken && operator)) {
                    throw new TemplateError(`Invalid expression format: ${expression}`);
                }
                // Resolve values
                const leftValue = resolveValue(leftToken, options.data.root, this);
                const rightValue = rightToken
                    ? resolveValue(rightToken, options.data.root, this)
                    : true;
                operator = operator || DEFAULTS.HELPERS.COMPARISON.DEFAULT_OPERATOR;
                // Log resolved values for debugging
                Debug.info("Evaluating expression:", {
                    raw: expression,
                    leftValue,
                    operator,
                    rightValue,
                });
                // Special handling for existence checks
                if (operator === "==" && !rightToken) {
                    return leftValue !== undefined
                        ? options.fn(this)
                        : options.inverse(this);
                }
                // Evaluate the condition
                const result = compare(leftValue, operator, rightValue);
                // Execute the appropriate branch
                if (result) {
                    return options.fn(this);
                }
                else {
                    return options.inverse(this);
                }
            }
            catch (error) {
                // Log the error stack for better debugging
                if (!(error instanceof TemplateError)) {
                    Debug.error("Error evaluating if condition:", error.stack);
                }
                throw error; // Re-throw to maintain error state
            }
        });
    }

    function sumHelper() {
        const Handlebars = window.Handlebars;
        Handlebars.registerHelper("sum", function (...args) {
            // Accepts multiple arguments, can be either numbers or arrays of numbers
            // Returns the sum of all arguments
            // Example: {{sum 1 2 3 4 5 (array 6 7 8 9 10)}} returns 55
            var sum = 0;
            for (var i = 0; i < args.length - 1; i++) {
                var arg = args[i];
                if (Array.isArray(arg)) {
                    arg.forEach(function (item) {
                        sum += item;
                    });
                }
                else {
                    sum += arg;
                }
            }
            return sum;
        });
    }

    function sortFunction(key, descending) {
        return function (a, b) {
            let left = key ? a[key] : a;
            let right = key ? b[key] : b;
            // Handle null/undefined values
            if (left === null || left === undefined)
                return descending ? -1 : 1;
            if (right === null || right === undefined)
                return descending ? 1 : -1;
            // String comparison
            if (typeof left === "string" && typeof right === "string") {
                return descending ? right.localeCompare(left) : left.localeCompare(right);
            }
            // Numeric comparison
            if (left < right)
                return descending ? 1 : -1;
            if (left > right)
                return descending ? -1 : 1;
            return 0;
        };
    }

    function eachHelper() {
        const Handlebars = window.Handlebars;
        Handlebars.unregisterHelper("each");
        Handlebars.registerHelper("each", function (context, options) {
            // Accepts an array or object and iterates through it
            // Returns the value of the current iteration
            // Example: {{#each myArray}} returns the current item in the array
            // Allows for optional arguments, e.g. {{#each myArray limit=10 startAt=5}}
            // limit: limit the number of iterations. Leave blank for no limit
            // startAt: start at a specific index
            // sortBy: sort by a key
            // descending: sort descending
            // sortBeforeLimit: sort before limiting (default: true)
            var result = "";
            var limit = options.hash.limit || undefined;
            var startAt = options.hash.startAt || DEFAULTS.HELPERS.EACH.START_AT;
            var key = options.hash.sortBy || DEFAULTS.HELPERS.EACH.SORT_KEY;
            var descending = options.hash.descending || DEFAULTS.HELPERS.EACH.DESCENDING;
            var sortBeforeLimit = options.hash.sortBeforeLimit || DEFAULTS.HELPERS.EACH.SORT_BEFORE_LIMIT;
            var inverse = options.inverse;
            var fn = options.fn;
            var data;
            var contextPath;
            // convert map to array if it exists
            if (context instanceof Map) {
                context = Array.from(context.values());
            }
            sortBeforeLimit =
                typeof sortBeforeLimit === "boolean" ? sortBeforeLimit : true;
            if (options.data && options.ids) {
                contextPath = (options.data.contextPath || "") + options.ids[0] + ".";
            }
            if (Handlebars.Utils.isFunction(context)) {
                context = context.call(this);
            }
            if (options.data) {
                data = Handlebars.createFrame(options.data);
            }
            if (!Array.isArray(context) && typeof context !== "object") {
                return inverse(this);
            }
            var processedArray = Array.isArray(context)
                ? context.slice()
                : Object.entries(context);
            if (limit === undefined) {
                limit = processedArray.length;
            }
            // Apply sorting and limiting logic
            if (sortBeforeLimit) {
                processedArray.sort(sortFunction(key, descending));
                processedArray = processedArray.slice(startAt, limit + startAt);
            }
            else {
                processedArray = processedArray.slice(startAt, limit + startAt);
                processedArray.sort(sortFunction(key, descending));
            }
            for (var i = 0; i < processedArray.length; i++) {
                var value = Array.isArray(context)
                    ? processedArray[i]
                    : processedArray[i][1];
                data.key = Array.isArray(context) ? i : processedArray[i][0];
                data.index = i;
                data.first = i === 0;
                data.last = i === processedArray.length - 1;
                if (contextPath) {
                    data.contextPath = contextPath + data.key;
                }
                result += fn(value, {
                    data: data,
                    blockParams: Handlebars.Utils.blockParams([value, data.key], [contextPath + data.key, null]),
                });
            }
            if (i === 0) {
                result = inverse(this);
            }
            return result;
        });
    }

    // Registry for user-allowed functions
    const ALLOWED_FUNCTIONS = new Map();
    function executeHelper() {
        const Handlebars = window.Handlebars;
        Handlebars.registerHelper("execute", function (fn, ...args) {
            if (!ConfigManager.getConfig().allowExecute) {
                Debug.error("execute is disabled. Cannot execute functions.");
                return '';
            }
            // Accepts a function name and arguments
            // Only executes functions that have been explicitly registered by the user
            // Example: {{execute myFunction arg1 arg2 arg3}} returns myFunction(arg1, arg2, arg3)
            args.pop();
            const fnName = String(fn).trim();
            // Check if the function is in the allowed registry
            const registeredFunction = ALLOWED_FUNCTIONS.get(fnName);
            if (registeredFunction) {
                try {
                    return registeredFunction.apply(this, args);
                }
                catch (error) {
                    Debug.error("Error executing registered function " + fnName + ": " + error.message);
                    return '';
                }
            }
            // Also check the current context (this) for functions - safer than global scope
            const contextFunction = this[fnName];
            if (typeof contextFunction === "function") {
                try {
                    return contextFunction.apply(this, args);
                }
                catch (error) {
                    Debug.error("Error executing context function " + fnName + ": " + error.message);
                    return '';
                }
            }
            // Function not found in allowed registry or context
            Debug.error("Function not found or not allowed: " + fnName + ". Please register the function using registerExecutableFunction() before using it in a template.");
            return '';
        });
    }

    function setHelper() {
        const Handlebars = window.Handlebars;
        Handlebars.registerHelper("set", function (varName, varValue, options) {
            if (!varName || !varValue) {
                Debug.error("setHelper: varName and varValue are required");
                return "";
            }
            //check if varName is a valid variable name
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
                Debug.error(`setHelper: varName ${varName} is not a valid variable name`);
                return "";
            }
            options.data.root[varName] = varValue;
        });
    }

    /**
     * Registers a Handlebars helper that creates an animated bunny ASCII art.
     * The bunny alternates between two states: normal and flipped.
     *
     * Requirements:
     * - Handlebars must be loaded globally before calling this function
     * - Runs in browser environment (uses window and document)
     *
     * The helper creates:
     * - Global window.bunnyStates object storing ASCII art variants
     * - Global window.bunnyAnimation function managing animation
     * - Global window.bunnyAnimationIntervalId for animation control
     *
     * Usage in Handlebars template:
     * {{bunny}}
     *
     * @returns {void}
     */
    function bunnyHelper() {
        const Handlebars = window.Handlebars;
        if (typeof Handlebars === "undefined") {
            console.error("Handlebars is not loaded yet!");
            return;
        }
        // Only register once
        if (Handlebars.helpers.bunny) {
            return;
        }
        const bunny = `
    &nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>
    ପ(˶•-•˶)ଓ ♡<br>
    &nbsp;&nbsp;&nbsp;/づ  づ
  `;
        const bunnyFlipped = `
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>
    &nbsp;&nbsp;ପ(˶•-•˶)ଓ<br>
    &nbsp;&nbsp;♡じ  じ\\
  `;
        // Store bunny states globally
        window._fp_bunnyStates = {
            bunny,
            bunnyFlipped,
        };
        // Initialize animation function
        window._fp_bunnyAnimation = function () {
            if (window._fp_bunnyAnimationIntervalId) {
                clearInterval(window._fp_bunnyAnimationIntervalId);
            }
            window._fp_bunnyAnimationIntervalId = setInterval(function () {
                document.querySelectorAll(".fp-bunny").forEach(function (element) {
                    const currentState = element.getAttribute("data-bunny-state");
                    if (currentState === "normal") {
                        element.innerHTML = window._fp_bunnyStates.bunnyFlipped;
                        element.setAttribute("data-bunny-state", "flipped");
                    }
                    else {
                        element.innerHTML = window._fp_bunnyStates.bunny;
                        element.setAttribute("data-bunny-state", "normal");
                    }
                });
            }, 1000);
        };
        // Register the helper
        Handlebars.registerHelper("bunny", function () {
            const wrapper = `<span class="fp-bunny" data-bunny-state="normal">${window._fp_bunnyStates.bunny}</span>`;
            // Start animation on next tick
            setTimeout(window._fp_bunnyAnimation, 0);
            return new Handlebars.SafeString(wrapper);
        });
        // Start animation if there are already bunnies on the page
        if (document.querySelectorAll(".fp-bunny").length > 0) {
            window._fp_bunnyAnimation();
        }
    }

    /**
     * Returns the first non-falsy value from the arguments
     * @param {*} value - The primary value to check
     * @param {*} defaultValue - The fallback value if primary is falsy
     * @returns {*} - The first non-falsy value or the defaultValue
     */
    function defaultHelper() {
        const Handlebars = window.Handlebars;
        Handlebars.registerHelper("default", function (value, defaultValue) {
            return value || defaultValue;
        });
    }

    function registerHelpers() {
        ifHelper();
        sumHelper();
        eachHelper();
        executeHelper();
        setHelper();
        bunnyHelper();
        defaultHelper();
    }

    /**
     * @module RequestHandler
     * @description Manages HTMX request processing and lifecycle events for form processing elements
     */
    const RequestHandler = {
        /** @type {Map<HTMLElement, {requestId: string, timestamp: number, processed: boolean}>} */
        processingElements: new Map(),
        /** @type {number} Counter for generating unique request IDs */
        currentRequestId: 0,
        /**
         * Generates a unique request ID using timestamp and counter
         * @returns {string} Unique request identifier
         */
        generateRequestId() {
            return `fp-${Date.now()}-${this.currentRequestId++}`;
        },
        /**
         * Handles different stages of request processing for a target element
         * @param {HTMLElement} target - The DOM element being processed
         * @param {string} requestId - Unique identifier for the request
         * @param {'start'|'process'|'cleanup'} action - The action to perform
         * @returns {boolean|void} Returns true if processing succeeded for 'process' action
         */
        handleRequest(target, requestId, action) {
            if (!target || !AttributeMatcher._hasAttribute(target, "template"))
                return;
            const currentInfo = this.processingElements.get(target);
            requestId = requestId || this.generateRequestId();
            switch (action) {
                case "start":
                    if (!currentInfo || currentInfo.requestId !== requestId) {
                        this.processingElements.set(target, {
                            requestId: requestId,
                            timestamp: Date.now(),
                            processed: false,
                        });
                        Debug.debug("Added element to processing set", target, requestId);
                    }
                    break;
                case "process":
                    // Mark as processed during HTMX transformResponse
                    if (currentInfo && currentInfo.requestId === requestId) {
                        currentInfo.processed = true;
                        this.processingElements.set(target, currentInfo);
                        Debug.debug(`Marked request ${requestId} as processed for ${target.id || "unknown"}`);
                        return true;
                    }
                    return false;
                case "cleanup":
                    // Always clean up if we have the same requestId, regardless of processed state
                    // This ensures cleanup happens even if group updates are still in progress
                    if (currentInfo && currentInfo.requestId === requestId) {
                        this.processingElements.delete(target);
                        Debug.debug("Cleaned up after request", target, requestId);
                    }
                    else {
                        Debug.debug("Skipping cleanup - request mismatch", {
                            current: currentInfo?.requestId,
                            received: requestId,
                        });
                    }
                    break;
            }
        },
        /**
         * Removes stale processing entries that are older than the timeout threshold
         */
        cleanupStale() {
            const now = Date.now();
            const staleTimeout = 10000; // 10 seconds
            for (const [target, info] of this.processingElements.entries()) {
                if (now - info.timestamp > staleTimeout) {
                    this.processingElements.delete(target);
                    Debug.debug("Cleaned up stale processing entry", target, info.requestId);
                }
            }
        },
        /**
         * Sets up all necessary event listeners for HTMX integration and request handling
         */
        setupEventListeners() {
            // Add consolidated event listeners
            document.body.addEventListener("htmx:beforeRequest", (event) => {
                const target = event.detail.elt;
                const requestId = event.detail.requestId || this.generateRequestId();
                event.detail.requestId = requestId; // Ensure requestId is set
                this.handleRequest(target, requestId, "start");
                // Find instance that contains this element
                let instance = null;
                let instanceName = null;
                for (const [name, inst] of Object.entries(_state.instances)) {
                    if (Array.from(inst.elements).some((el) => el.contains(target))) {
                        instance = inst;
                        instanceName = name;
                        break;
                    }
                }
                if (instance) {
                    // Execute beforeRequest hook
                    EventSystem.publish("requestStart", {
                        instanceName,
                        ...event.detail,
                    });
                }
            });
            document.body.addEventListener("htmx:beforeSwap", (event) => {
                const target = event.detail.elt;
                const requestId = event.detail.requestId;
                const info = this.processingElements.get(target);
                // Only prevent swap if request IDs don't match
                if (info && info.requestId !== requestId) {
                    event.preventDefault();
                    Debug.debug("Prevented swap - request ID mismatch");
                }
            });
            // Cleanup handlers
            document.body.addEventListener("htmx:responseError", (event) => {
                // Only cleanup on actual errors, not on successful responses
                if (event.detail.failed) {
                    this.handleRequest(event.detail.elt, event.detail.requestId, "cleanup");
                }
            });
            // Set up stale cleanup interval
            setInterval(() => this.cleanupStale(), 10000);
            // Clear all on unload
            window.addEventListener("unload", () => {
                this.processingElements.clear();
            });
        },
    };

    function parseXmlToJson(xmlString) {
        function xmlToJson(node) {
            var obj = {};
            // Include attributes with prefix '_'
            if (node.attributes) {
                for (var j = 0; j < node.attributes.length; j++) {
                    var attribute = node.attributes.item(j);
                    if (attribute) {
                        obj["_" + attribute.nodeName] = attribute.nodeValue;
                    }
                }
            }
            // Process child elements
            var children = node.childNodes;
            if (children.length === 1 && children[0].nodeType === 3) {
                // Single text node
                return children?.[0]?.nodeValue?.trim();
            }
            else {
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    // Element nodes
                    if (child.nodeType === 1) {
                        var json = xmlToJson(child);
                        if (obj[child.nodeName]) {
                            // For multiple children with the same tag, create an array
                            if (!Array.isArray(obj[child.nodeName])) {
                                obj[child.nodeName] = [obj[child.nodeName]];
                            }
                            obj[child.nodeName].push(json);
                        }
                        else {
                            obj[child.nodeName] = json;
                        }
                    }
                }
            }
            // If the object is empty, return an empty string
            obj = Object.keys(obj).length > 0 ? obj : {};
            return obj;
        }
        var parser = new DOMParser();
        var xml = parser.parseFromString(xmlString, "text/xml"); // Parse the XML string to a DOM
        return xmlToJson(xml.documentElement);
    }

    function defineHtmxExtension() {
        htmx.defineExtension("flowplater", {
            transformResponse: async function (text, xhr, elt) {
                // First, check if the data is XML and transform it to JSON if needed
                const contentType = xhr.getResponseHeader("Content-Type") || "";
                const isXml = contentType.startsWith("text/xml");
                const isHtml = contentType.startsWith("text/html");
                let processedText = text;
                let isJson = false;
                if (isXml) {
                    try {
                        // First validate that we have valid XML content
                        if (!text || typeof text !== 'string') {
                            throw new Error('Invalid XML content: empty or non-string response');
                        }
                        // Parse the XML string using DOMParser
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(text, "text/xml");
                        // Check for XML parsing errors - DOMParser doesn't throw, but creates error documents
                        const parserError = xmlDoc.querySelector("parsererror");
                        if (parserError) {
                            throw new Error(`XML parsing failed: ${parserError.textContent || 'Unknown parser error'}`);
                        }
                        // Validate that we have a valid document with a root element
                        if (!xmlDoc.documentElement) {
                            throw new Error('XML parsing failed: no document element found');
                        }
                        // Convert XML to JSON using our utility function (which expects the original string)
                        const jsonData = parseXmlToJson(text);
                        processedText = JSON.stringify(jsonData);
                        isJson = true;
                        Debug.debug('[transformResponse] Successfully converted XML to JSON:', jsonData);
                    }
                    catch (error) {
                        const errorMessage = error instanceof Error ? error.message : 'Unknown XML parsing error';
                        Debug.error("Failed to parse XML response:", errorMessage, {
                            originalText: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
                            contentType: contentType
                        });
                        // Keep the original text if XML parsing fails - don't try to process as JSON
                        processedText = text;
                        isJson = false;
                    }
                }
                else if (!isHtml) {
                    // If not HTML and not XML, assume it's JSON
                    isJson = true;
                }
                // Get the instance first to apply transformations
                const instance = InstanceManager.getOrCreateInstance(elt);
                // Determine the dataType for transformations
                const dataType = isHtml ? "html" : "json";
                // Apply plugin transformations to the response text
                if (instance) {
                    processedText = PluginManager.applyTransformations(instance, processedText, "transformResponse", dataType);
                    // Update isJson flag based on transformed data type
                    isJson =
                        typeof processedText === "object" ||
                            (typeof processedText === "string" &&
                                (() => {
                                    try {
                                        JSON.parse(processedText);
                                        return true;
                                    }
                                    catch {
                                        return false;
                                    }
                                })());
                    Debug.debug(`[transformResponse] isJson: ${isJson}`);
                }
                else {
                    Debug.debug(`[transformResponse] No instance found for elt ${elt.id}. Skipping transformations.`);
                }
                Debug.debug(`[transformResponse] Processed text: ${processedText}`);
                const requestId = xhr.requestId;
                const currentInfo = RequestHandler.processingElements.get(elt);
                if (!currentInfo || currentInfo.requestId !== requestId) {
                    return processedText;
                }
                if (isJson) {
                    Debug.debug(`[transformResponse] Processed text is JSON`);
                    if (instance) {
                        const instanceName = instance.instanceName;
                        Debug.debug(`[transformResponse] Setting data for ${instanceName}`);
                        try {
                            // Mark this request as processed
                            RequestHandler.handleRequest(elt, requestId, "process");
                            // Flag that this instance is getting updated directly via HTMX
                            instance._htmxUpdateInProgress = true;
                            // Set the data which triggers updates via proxy
                            let jsonData;
                            if (typeof processedText === "string") {
                                try {
                                    jsonData = JSON.parse(processedText);
                                }
                                catch (parseError) {
                                    const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown JSON parsing error';
                                    Debug.error(`[transformResponse] Failed to parse JSON data for instance ${instanceName}:`, errorMessage, {
                                        originalText: processedText.substring(0, 200) + (processedText.length > 200 ? '...' : ''),
                                        contentType: xhr.getResponseHeader("Content-Type") || "unknown"
                                    });
                                    // Clear the flag and return early to prevent further processing
                                    instance._htmxUpdateInProgress = false;
                                    return ""; // Return empty string to prevent swap errors
                                }
                            }
                            else if (typeof processedText === "object") {
                                jsonData = processedText;
                            }
                            else {
                                Debug.error(`[transformResponse] Invalid data type for JSON processing: ${typeof processedText}`, {
                                    processedText: processedText,
                                    instanceName: instanceName
                                });
                                instance._htmxUpdateInProgress = false;
                                return "";
                            }
                            // Validate that we have valid data before setting
                            if (jsonData === null || jsonData === undefined) {
                                Debug.warn(`[transformResponse] Received null/undefined data for instance ${instanceName}, skipping update`);
                                instance._htmxUpdateInProgress = false;
                                return "";
                            }
                            instance.setData(jsonData);
                            // Clear the flag
                            instance._htmxUpdateInProgress = false;
                            // Return empty string to prevent HTMX default swap
                            return ""; // Return empty string instead of "DO_NOT_SWAP"
                        }
                        catch (error) {
                            Debug.error(`[transformResponse] Error processing JSON data for instance ${instanceName}:`, error.message, {
                                stack: error.stack,
                                processedText: typeof processedText === 'string' ? processedText.substring(0, 200) + (processedText.length > 200 ? '...' : '') : processedText
                            });
                            instance._htmxUpdateInProgress = false;
                            return ""; // Return empty string to prevent swap errors
                        }
                    }
                    return ""; // Return empty string for any JSON response
                }
                return processedText;
            },
            handleSwap: function (swapStyle, target, fragment, settleInfo) {
                Debug.debug(`[handleSwap] Swap style: ${swapStyle}`);
                const isEmptySignal = fragment.textContent?.trim() === "";
                // Check if this is a JSON response
                const contentType = settleInfo.xhr?.getResponseHeader("Content-Type") || "";
                const isJson = !contentType.startsWith("text/html") &&
                    !contentType.startsWith("text/xml");
                if (isJson) {
                    Debug.debug(`[handleSwap] Detected JSON response for target ${target.id || "[no id]"}. Preventing htmx swap.`);
                    return true;
                }
                const hasDataExtractorPlugin = PluginManager.getPlugin("data-extractor") !== null;
                const fragmentContainsFpData = fragment && AttributeMatcher.findMatchingElements("data", null, false, fragment, true).length > 0;
                if (hasDataExtractorPlugin && fragmentContainsFpData) {
                    Debug.debug(`[handleSwap] Detected data-extractor plugin and fp-data attribute. Processing through data extractor.`);
                    return true;
                }
                else if (hasDataExtractorPlugin) {
                    Debug.info(`[handleSwap] Detected data-extractor plugin but no fp-data attribute. Skipping data extraction.`);
                    return false;
                }
                else if (fragmentContainsFpData) {
                    Debug.warn(`[handleSwap] Detected fp-data attribute but no data-extractor plugin. Skipping data extraction.`);
                    return false;
                }
                if (isEmptySignal) {
                    Debug.debug(`[handleSwap] Detected empty string signal for target ${target.id || "[no id]"}. Preventing htmx default swap.`);
                    return true;
                }
                else {
                    Debug.debug(`[handleSwap] Fragment is not empty signal for target ${target.id || "[no id]"}. Letting htmx swap.`);
                    return false;
                }
            },
            onEvent: function (name, evt) {
                const triggeringElt = evt.detail.elt;
                if (!triggeringElt) {
                    Debug.warn(`[onEvent] Event ${name} has no triggering element (evt.detail.elt). Skipping.`);
                    return;
                }
                const requestId = evt.detail.requestId || RequestHandler.generateRequestId();
                if (!evt.detail.requestId)
                    evt.detail.requestId = requestId;
                switch (name) {
                    case "htmx:confirm":
                        if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
                            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
                            // Apply plugin transformations to the confirm event
                            evt = PluginManager.applyTransformations(instance, evt, "confirm", "json");
                        }
                        break;
                    case "htmx:configRequest":
                        // Apply transformations regardless of fp-template attribute
                        const instance = InstanceManager.getOrCreateInstance(triggeringElt);
                        evt = PluginManager.applyTransformations(instance, evt, "transformRequest", "json");
                        // Set default Content-Type header
                        evt.detail.headers["Content-Type"] =
                            "application/x-www-form-urlencoded; charset=UTF-8";
                        break;
                    case "htmx:beforeRequest":
                        if (!evt.detail.xhr.requestId) {
                            evt.detail.xhr.requestId = requestId;
                        }
                        RequestHandler.handleRequest(triggeringElt, requestId, "start");
                        // Execute hooks if it's a template element
                        if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
                            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
                            PluginManager.executeHook("beforeRequest", instance || null, evt);
                        }
                        break;
                    case "htmx:beforeSwap":
                        executeHtmxHook("beforeSwap", triggeringElt, evt);
                        if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
                            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
                            if (instance) {
                                EventSystem.publish("beforeSwap", {
                                    instanceName: instance.instanceName,
                                    ...evt.detail,
                                });
                            }
                        }
                        break;
                    case "htmx:afterSwap":
                        executeHtmxHook("afterSwap", triggeringElt, evt);
                        if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
                            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
                            if (instance) {
                                EventSystem.publish("afterSwap", {
                                    instanceName: instance.instanceName,
                                    ...evt.detail,
                                });
                            }
                        }
                        const formsToCleanup = getAllRelevantForms(triggeringElt);
                        formsToCleanup.forEach(cleanupFormChangeListeners);
                        break;
                    case "htmx:afterRequest":
                        if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
                            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
                            if (instance) {
                                PluginManager.executeHook("afterRequest", instance, evt);
                                EventSystem.publish("requestEnd", {
                                    instanceName: instance.instanceName,
                                    ...evt.detail,
                                });
                            }
                        }
                        RequestHandler.handleRequest(triggeringElt, requestId, "cleanup");
                        break;
                    case "htmx:afterSettle":
                        executeHtmxHook("afterSettle", triggeringElt, evt);
                        Debug.debug(`Setting up form handlers after DOM settle for target: ${triggeringElt.id || "unknown"}, ` +
                            `has fp-template: ${AttributeMatcher._hasAttribute(triggeringElt, "template")}, ` +
                            `parent form: ${triggeringElt.closest("form")?.id || "none"}`);
                        setupFormSubmitHandlers(triggeringElt);
                        break;
                }
            },
        });
    }
    function executeHtmxHook(hookName, target, event) {
        if (AttributeMatcher._hasAttribute(target, "instance") ||
            target.hasAttribute("id")) {
            const instance = InstanceManager.getOrCreateInstance(target);
            if (instance) {
                PluginManager.executeHook(hookName, instance, event?.detail);
            }
        }
    }

    // prettier-ignore
    const htmxAttributes = ["boost", "get", "post", "on", "push-url", "select", "select-oob",
        "swap", "swap-oob", "target", "trigger", "vals", "confirm", "delete", "disable",
        "disabled-elt", "disinherit", "encoding", "ext", "headers", "history", "history-elt",
        "include", "indicator", "params", "patch", "preserve", "prompt", "put", "replace-url",
        "request", "sync", "validate", "vars",
    ];
    // * For every element with an fp-[htmxAttribute] attribute, translate to hx-[htmxAttribute]
    function translateCustomHTMXAttributes(element) {
        try {
            Debug.debug("translateCustomHTMXAttributes", element);
            const customPrefix = "fp-";
            const htmxPrefix = "hx-";
            htmxAttributes.forEach((attr) => {
                const customAttr = customPrefix + attr;
                if (element.hasAttribute(customAttr) ||
                    element.hasAttribute("data-" + customAttr)) {
                    const attrValue = element.getAttribute(customAttr);
                    if (attrValue) {
                        element.setAttribute(htmxPrefix + attr, attrValue);
                    }
                    element.removeAttribute(customAttr);
                }
            });
            return element;
        }
        catch (error) {
            Debug.error(`Error in translateCustomHTMXAttributes: ${error.message}`);
            return element;
        }
    }

    // Add hx-ext="flowplater" attribute to elements that need the extension
    function addHtmxExtensionAttribute(element) {
        try {
            // Check if the element already has the flowplater extension
            const currentExt = element.getAttribute("hx-ext") || "";
            if (!currentExt.includes("flowplater")) {
                // Add flowplater to hx-ext
                const newExt = currentExt ? currentExt + ", flowplater" : "flowplater";
                element.setAttribute("hx-ext", newExt);
                Debug.info("Added hx-ext attribute to " + element.id);
            }
            return element;
        }
        catch (error) {
            Debug.error(`Error in addHtmxExtensionAttribute: ${error.message}`);
            return element;
        }
    }

    function processUrlAffixes(element) {
        try {
            const methods = ["get", "post", "put", "patch", "delete"];
            function processElement(el) {
                methods.forEach(function (method) {
                    var attr = "hx-" + method;
                    if (el.hasAttribute(attr)) {
                        var originalUrl = el.getAttribute(attr);
                        Debug.info("Original URL: " + originalUrl);
                        var prepend = AttributeMatcher.findAttribute(el, "prepend");
                        var append = AttributeMatcher.findAttribute(el, "append");
                        var modifiedUrl = originalUrl;
                        if (prepend) {
                            modifiedUrl = prepend + modifiedUrl;
                        }
                        if (append) {
                            modifiedUrl += append;
                        }
                        if (modifiedUrl) {
                            el.setAttribute(attr, modifiedUrl);
                        }
                        Debug.info("Modified URL: " + modifiedUrl);
                        if (modifiedUrl !== originalUrl) {
                            Debug.info("Modification successful for", method, "on element", el);
                        }
                        else {
                            Debug.error("Modification failed for", method, "on element", el);
                        }
                    }
                });
            }
            // Process the passed element
            if ((AttributeMatcher._hasAttribute(element, "prepend") ||
                AttributeMatcher._hasAttribute(element, "append")) &&
                methods.some((method) => element.hasAttribute("hx-" + method))) {
                processElement(element);
            }
            return element;
        }
        catch (error) {
            Debug.error(`Error in processUrlAffixes: ${error.message}`);
            return element;
        }
    }

    function preloadUrl(url) {
        if (!url) {
            Debug.error("No URL provided for preloading");
            return;
        }
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = url;
        link.as = "fetch";
        link.crossOrigin = "anonymous";
        const cleanup = () => {
            if (link.parentNode) {
                link.remove();
            }
        };
        link.onerror = (e) => {
            Debug.error(`Failed to preload URL: ${url}`, e);
            cleanup();
        };
        const timeoutId = setTimeout(cleanup, 3000);
        document.head.appendChild(link);
        return { cleanup, timeoutId };
    }
    function addPreloadListener(element) {
        const preloadEvent = AttributeMatcher._getRawAttribute(element, "preload") || "mouseover";
        if (preloadEvent === "mouseover") {
            let mouseOver = true;
            let timeoutId;
            let preloadInstance;
            const handleMouseOver = () => {
                mouseOver = true;
                timeoutId = setTimeout(() => {
                    if (mouseOver) {
                        const url = element.getAttribute("href") ||
                            AttributeMatcher._getRawAttribute(element, "get");
                        if (url) {
                            preloadInstance = preloadUrl(url);
                        }
                    }
                }, 100);
            };
            const handleMouseOut = () => {
                mouseOver = false;
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                if (preloadInstance) {
                    clearTimeout(preloadInstance.timeoutId);
                    preloadInstance.cleanup();
                }
            };
            element.addEventListener("mouseover", handleMouseOver);
            element.addEventListener("mouseout", handleMouseOut);
            // Store cleanup function on element for potential removal
            element._preloadCleanup = () => {
                element.removeEventListener("mouseover", handleMouseOver);
                element.removeEventListener("mouseout", handleMouseOut);
                handleMouseOut();
            };
        }
        else {
            const handler = () => {
                const url = element.getAttribute("href") ||
                    AttributeMatcher._getRawAttribute(element, "get");
                if (url) {
                    preloadUrl(url);
                }
            };
            element.addEventListener(preloadEvent, handler);
            // Store cleanup function
            element._preloadCleanup = () => {
                element.removeEventListener(preloadEvent, handler);
            };
        }
    }
    function processPreload(element) {
        try {
            if (element.hasAttribute("data-fp-preload-processed")) {
                return element;
            }
            if (AttributeMatcher._hasAttribute(element, "preload")) {
                addPreloadListener(element);
                element.setAttribute("data-fp-preload-processed", "true");
            }
            return element;
        }
        catch (error) {
            Debug.error(`Error in processPreload: ${error.message}`);
            return element;
        }
    }

    // * For each element with an fp-animation attribute set to true, or if defaults.animation is true, get the hx-swap attribute.
    // if the value is empty, set it to innerHTML transition:true
    // if the value is not empty, append transition:true
    // if the value is set to false, do nothing
    function setupAnimation(element) {
        try {
            var shouldAnimate = AttributeMatcher._getRawAttribute(element, "animation") ||
                _state.defaults.animation;
            if (shouldAnimate === "true") {
                var swap = element.getAttribute("hx-swap");
                if (!swap) {
                    element.setAttribute("hx-swap", "innerHTML transition:true");
                }
                else {
                    element.setAttribute("hx-swap", swap + " transition:true");
                }
            }
            return element;
        }
        catch (error) {
            Debug.error(`Error in setupAnimation: ${error.message}`);
            return element;
        }
    }

    var htmx$2 = (function() {

      // Public API
      const htmx = {
        // Tsc madness here, assigning the functions directly results in an invalid TypeScript output, but reassigning is fine
        /* Event processing */
        /** @type {typeof onLoadHelper} */
        onLoad: null,
        /** @type {typeof processNode} */
        process: null,
        /** @type {typeof addEventListenerImpl} */
        on: null,
        /** @type {typeof removeEventListenerImpl} */
        off: null,
        /** @type {typeof triggerEvent} */
        trigger: null,
        /** @type {typeof ajaxHelper} */
        ajax: null,
        /* DOM querying helpers */
        /** @type {typeof find} */
        find: null,
        /** @type {typeof findAll} */
        findAll: null,
        /** @type {typeof closest} */
        closest: null,
        /**
         * Returns the input values that would resolve for a given element via the htmx value resolution mechanism
         *
         * @see https://htmx.org/api/#values
         *
         * @param {Element} elt the element to resolve values on
         * @param {HttpVerb} type the request type (e.g. **get** or **post**) non-GET's will include the enclosing form of the element. Defaults to **post**
         * @returns {Object}
         */
        values: function(elt, type) {
          const inputValues = getInputValues(elt, type || 'post');
          return inputValues.values
        },
        /* DOM manipulation helpers */
        /** @type {typeof removeElement} */
        remove: null,
        /** @type {typeof addClassToElement} */
        addClass: null,
        /** @type {typeof removeClassFromElement} */
        removeClass: null,
        /** @type {typeof toggleClassOnElement} */
        toggleClass: null,
        /** @type {typeof takeClassForElement} */
        takeClass: null,
        /** @type {typeof swap} */
        swap: null,
        /* Extension entrypoints */
        /** @type {typeof defineExtension} */
        defineExtension: null,
        /** @type {typeof removeExtension} */
        removeExtension: null,
        /* Debugging */
        /** @type {typeof logAll} */
        logAll: null,
        /** @type {typeof logNone} */
        logNone: null,
        /* Debugging */
        /**
         * The logger htmx uses to log with
         *
         * @see https://htmx.org/api/#logger
         */
        logger: null,
        /**
         * A property holding the configuration htmx uses at runtime.
         *
         * Note that using a [meta tag](https://htmx.org/docs/#config) is the preferred mechanism for setting these properties.
         *
         * @see https://htmx.org/api/#config
         */
        config: {
          /**
           * Whether to use history.
           * @type boolean
           * @default true
           */
          historyEnabled: true,
          /**
           * The number of pages to keep in **localStorage** for history support.
           * @type number
           * @default 10
           */
          historyCacheSize: 10,
          /**
           * @type boolean
           * @default false
           */
          refreshOnHistoryMiss: false,
          /**
           * The default swap style to use if **[hx-swap](https://htmx.org/attributes/hx-swap)** is omitted.
           * @type HtmxSwapStyle
           * @default 'innerHTML'
           */
          defaultSwapStyle: 'innerHTML',
          /**
           * The default delay between receiving a response from the server and doing the swap.
           * @type number
           * @default 0
           */
          defaultSwapDelay: 0,
          /**
           * The default delay between completing the content swap and settling attributes.
           * @type number
           * @default 20
           */
          defaultSettleDelay: 20,
          /**
           * If true, htmx will inject a small amount of CSS into the page to make indicators invisible unless the **htmx-indicator** class is present.
           * @type boolean
           * @default true
           */
          includeIndicatorStyles: true,
          /**
           * The class to place on indicators when a request is in flight.
           * @type string
           * @default 'htmx-indicator'
           */
          indicatorClass: 'htmx-indicator',
          /**
           * The class to place on triggering elements when a request is in flight.
           * @type string
           * @default 'htmx-request'
           */
          requestClass: 'htmx-request',
          /**
           * The class to temporarily place on elements that htmx has added to the DOM.
           * @type string
           * @default 'htmx-added'
           */
          addedClass: 'htmx-added',
          /**
           * The class to place on target elements when htmx is in the settling phase.
           * @type string
           * @default 'htmx-settling'
           */
          settlingClass: 'htmx-settling',
          /**
           * The class to place on target elements when htmx is in the swapping phase.
           * @type string
           * @default 'htmx-swapping'
           */
          swappingClass: 'htmx-swapping',
          /**
           * Allows the use of eval-like functionality in htmx, to enable **hx-vars**, trigger conditions & script tag evaluation. Can be set to **false** for CSP compatibility.
           * @type boolean
           * @default true
           */
          allowEval: true,
          /**
           * If set to false, disables the interpretation of script tags.
           * @type boolean
           * @default true
           */
          allowScriptTags: true,
          /**
           * If set, the nonce will be added to inline scripts.
           * @type string
           * @default ''
           */
          inlineScriptNonce: '',
          /**
           * If set, the nonce will be added to inline styles.
           * @type string
           * @default ''
           */
          inlineStyleNonce: '',
          /**
           * The attributes to settle during the settling phase.
           * @type string[]
           * @default ['class', 'style', 'width', 'height']
           */
          attributesToSettle: ['class', 'style', 'width', 'height'],
          /**
           * Allow cross-site Access-Control requests using credentials such as cookies, authorization headers or TLS client certificates.
           * @type boolean
           * @default false
           */
          withCredentials: false,
          /**
           * @type number
           * @default 0
           */
          timeout: 0,
          /**
           * The default implementation of **getWebSocketReconnectDelay** for reconnecting after unexpected connection loss by the event code **Abnormal Closure**, **Service Restart** or **Try Again Later**.
           * @type {'full-jitter' | ((retryCount:number) => number)}
           * @default "full-jitter"
           */
          wsReconnectDelay: 'full-jitter',
          /**
           * The type of binary data being received over the WebSocket connection
           * @type BinaryType
           * @default 'blob'
           */
          wsBinaryType: 'blob',
          /**
           * @type string
           * @default '[hx-disable], [data-hx-disable]'
           */
          disableSelector: '[hx-disable], [data-hx-disable]',
          /**
           * @type {'auto' | 'instant' | 'smooth'}
           * @default 'instant'
           */
          scrollBehavior: 'instant',
          /**
           * If the focused element should be scrolled into view.
           * @type boolean
           * @default false
           */
          defaultFocusScroll: false,
          /**
           * If set to true htmx will include a cache-busting parameter in GET requests to avoid caching partial responses by the browser
           * @type boolean
           * @default false
           */
          getCacheBusterParam: false,
          /**
           * If set to true, htmx will use the View Transition API when swapping in new content.
           * @type boolean
           * @default false
           */
          globalViewTransitions: false,
          /**
           * htmx will format requests with these methods by encoding their parameters in the URL, not the request body
           * @type {(HttpVerb)[]}
           * @default ['get', 'delete']
           */
          methodsThatUseUrlParams: ['get', 'delete'],
          /**
           * If set to true, disables htmx-based requests to non-origin hosts.
           * @type boolean
           * @default false
           */
          selfRequestsOnly: true,
          /**
           * If set to true htmx will not update the title of the document when a title tag is found in new content
           * @type boolean
           * @default false
           */
          ignoreTitle: false,
          /**
           * Whether the target of a boosted element is scrolled into the viewport.
           * @type boolean
           * @default true
           */
          scrollIntoViewOnBoost: true,
          /**
           * The cache to store evaluated trigger specifications into.
           * You may define a simple object to use a never-clearing cache, or implement your own system using a [proxy object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
           * @type {Object|null}
           * @default null
           */
          triggerSpecsCache: null,
          /** @type boolean */
          disableInheritance: false,
          /** @type HtmxResponseHandlingConfig[] */
          responseHandling: [
            { code: '204', swap: false },
            { code: '[23]..', swap: true },
            { code: '[45]..', swap: false, error: true }
          ],
          /**
           * Whether to process OOB swaps on elements that are nested within the main response element.
           * @type boolean
           * @default true
           */
          allowNestedOobSwaps: true
        },
        /** @type {typeof parseInterval} */
        parseInterval: null,
        /** @type {typeof internalEval} */
        _: null,
        version: '2.0.4'
      };
      // Tsc madness part 2
      htmx.onLoad = onLoadHelper;
      htmx.process = processNode;
      htmx.on = addEventListenerImpl;
      htmx.off = removeEventListenerImpl;
      htmx.trigger = triggerEvent;
      htmx.ajax = ajaxHelper;
      htmx.find = find;
      htmx.findAll = findAll;
      htmx.closest = closest;
      htmx.remove = removeElement;
      htmx.addClass = addClassToElement;
      htmx.removeClass = removeClassFromElement;
      htmx.toggleClass = toggleClassOnElement;
      htmx.takeClass = takeClassForElement;
      htmx.swap = swap;
      htmx.defineExtension = defineExtension;
      htmx.removeExtension = removeExtension;
      htmx.logAll = logAll;
      htmx.logNone = logNone;
      htmx.parseInterval = parseInterval;
      htmx._ = internalEval;

      const internalAPI = {
        addTriggerHandler,
        bodyContains,
        canAccessLocalStorage,
        findThisElement,
        filterValues,
        swap,
        hasAttribute,
        getAttributeValue,
        getClosestAttributeValue,
        getClosestMatch,
        getExpressionVars,
        getHeaders,
        getInputValues,
        getInternalData,
        getSwapSpecification,
        getTriggerSpecs,
        getTarget,
        makeFragment,
        mergeObjects,
        makeSettleInfo,
        oobSwap,
        querySelectorExt,
        settleImmediately,
        shouldCancel,
        triggerEvent,
        triggerErrorEvent,
        withExtensions
      };

      const VERBS = ['get', 'post', 'put', 'delete', 'patch'];
      const VERB_SELECTOR = VERBS.map(function(verb) {
        return '[hx-' + verb + '], [data-hx-' + verb + ']'
      }).join(', ');

      //= ===================================================================
      // Utilities
      //= ===================================================================

      /**
       * Parses an interval string consistent with the way htmx does. Useful for plugins that have timing-related attributes.
       *
       * Caution: Accepts an int followed by either **s** or **ms**. All other values use **parseFloat**
       *
       * @see https://htmx.org/api/#parseInterval
       *
       * @param {string} str timing string
       * @returns {number|undefined}
       */
      function parseInterval(str) {
        if (str == undefined) {
          return undefined
        }

        let interval = NaN;
        if (str.slice(-2) == 'ms') {
          interval = parseFloat(str.slice(0, -2));
        } else if (str.slice(-1) == 's') {
          interval = parseFloat(str.slice(0, -1)) * 1000;
        } else if (str.slice(-1) == 'm') {
          interval = parseFloat(str.slice(0, -1)) * 1000 * 60;
        } else {
          interval = parseFloat(str);
        }
        return isNaN(interval) ? undefined : interval
      }

      /**
       * @param {Node} elt
       * @param {string} name
       * @returns {(string | null)}
       */
      function getRawAttribute(elt, name) {
        return elt instanceof Element && elt.getAttribute(name)
      }

      /**
       * @param {Element} elt
       * @param {string} qualifiedName
       * @returns {boolean}
       */
      // resolve with both hx and data-hx prefixes
      function hasAttribute(elt, qualifiedName) {
        return !!elt.hasAttribute && (elt.hasAttribute(qualifiedName) ||
          elt.hasAttribute('data-' + qualifiedName))
      }

      /**
       *
       * @param {Node} elt
       * @param {string} qualifiedName
       * @returns {(string | null)}
       */
      function getAttributeValue(elt, qualifiedName) {
        return getRawAttribute(elt, qualifiedName) || getRawAttribute(elt, 'data-' + qualifiedName)
      }

      /**
       * @param {Node} elt
       * @returns {Node | null}
       */
      function parentElt(elt) {
        const parent = elt.parentElement;
        if (!parent && elt.parentNode instanceof ShadowRoot) return elt.parentNode
        return parent
      }

      /**
       * @returns {Document}
       */
      function getDocument() {
        return document
      }

      /**
       * @param {Node} elt
       * @param {boolean} global
       * @returns {Node|Document}
       */
      function getRootNode(elt, global) {
        return elt.getRootNode ? elt.getRootNode({ composed: global }) : getDocument()
      }

      /**
       * @param {Node} elt
       * @param {(e:Node) => boolean} condition
       * @returns {Node | null}
       */
      function getClosestMatch(elt, condition) {
        while (elt && !condition(elt)) {
          elt = parentElt(elt);
        }

        return elt || null
      }

      /**
       * @param {Element} initialElement
       * @param {Element} ancestor
       * @param {string} attributeName
       * @returns {string|null}
       */
      function getAttributeValueWithDisinheritance(initialElement, ancestor, attributeName) {
        const attributeValue = getAttributeValue(ancestor, attributeName);
        const disinherit = getAttributeValue(ancestor, 'hx-disinherit');
        var inherit = getAttributeValue(ancestor, 'hx-inherit');
        if (initialElement !== ancestor) {
          if (htmx.config.disableInheritance) {
            if (inherit && (inherit === '*' || inherit.split(' ').indexOf(attributeName) >= 0)) {
              return attributeValue
            } else {
              return null
            }
          }
          if (disinherit && (disinherit === '*' || disinherit.split(' ').indexOf(attributeName) >= 0)) {
            return 'unset'
          }
        }
        return attributeValue
      }

      /**
       * @param {Element} elt
       * @param {string} attributeName
       * @returns {string | null}
       */
      function getClosestAttributeValue(elt, attributeName) {
        let closestAttr = null;
        getClosestMatch(elt, function(e) {
          return !!(closestAttr = getAttributeValueWithDisinheritance(elt, asElement(e), attributeName))
        });
        if (closestAttr !== 'unset') {
          return closestAttr
        }
      }

      /**
       * @param {Node} elt
       * @param {string} selector
       * @returns {boolean}
       */
      function matches(elt, selector) {
        // @ts-ignore: non-standard properties for browser compatibility
        // noinspection JSUnresolvedVariable
        const matchesFunction = elt instanceof Element && (elt.matches || elt.matchesSelector || elt.msMatchesSelector || elt.mozMatchesSelector || elt.webkitMatchesSelector || elt.oMatchesSelector);
        return !!matchesFunction && matchesFunction.call(elt, selector)
      }

      /**
       * @param {string} str
       * @returns {string}
       */
      function getStartTag(str) {
        const tagMatcher = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        const match = tagMatcher.exec(str);
        if (match) {
          return match[1].toLowerCase()
        } else {
          return ''
        }
      }

      /**
       * @param {string} resp
       * @returns {Document}
       */
      function parseHTML(resp) {
        const parser = new DOMParser();
        return parser.parseFromString(resp, 'text/html')
      }

      /**
       * @param {DocumentFragment} fragment
       * @param {Node} elt
       */
      function takeChildrenFor(fragment, elt) {
        while (elt.childNodes.length > 0) {
          fragment.append(elt.childNodes[0]);
        }
      }

      /**
       * @param {HTMLScriptElement} script
       * @returns {HTMLScriptElement}
       */
      function duplicateScript(script) {
        const newScript = getDocument().createElement('script');
        forEach(script.attributes, function(attr) {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = script.textContent;
        newScript.async = false;
        if (htmx.config.inlineScriptNonce) {
          newScript.nonce = htmx.config.inlineScriptNonce;
        }
        return newScript
      }

      /**
       * @param {HTMLScriptElement} script
       * @returns {boolean}
       */
      function isJavaScriptScriptNode(script) {
        return script.matches('script') && (script.type === 'text/javascript' || script.type === 'module' || script.type === '')
      }

      /**
       * we have to make new copies of script tags that we are going to insert because
       * SOME browsers (not saying who, but it involves an element and an animal) don't
       * execute scripts created in <template> tags when they are inserted into the DOM
       * and all the others do lmao
       * @param {DocumentFragment} fragment
       */
      function normalizeScriptTags(fragment) {
        Array.from(fragment.querySelectorAll('script')).forEach(/** @param {HTMLScriptElement} script */ (script) => {
          if (isJavaScriptScriptNode(script)) {
            const newScript = duplicateScript(script);
            const parent = script.parentNode;
            try {
              parent.insertBefore(newScript, script);
            } catch (e) {
              logError(e);
            } finally {
              script.remove();
            }
          }
        });
      }

      /**
       * @typedef {DocumentFragment & {title?: string}} DocumentFragmentWithTitle
       * @description  a document fragment representing the response HTML, including
       * a `title` property for any title information found
       */

      /**
       * @param {string} response HTML
       * @returns {DocumentFragmentWithTitle}
       */
      function makeFragment(response) {
        response = response.toString();
        // strip head tag to determine shape of response we are dealing with
        const responseWithNoHead = response.replace(/<head(\s[^>]*)?>[\s\S]*?<\/head>/i, '');
        const startTag = getStartTag(responseWithNoHead);
        /** @type DocumentFragmentWithTitle */
        let fragment;
        if (startTag === 'html') {
          // if it is a full document, parse it and return the body
          fragment = /** @type DocumentFragmentWithTitle */ (new DocumentFragment());
          const doc = parseHTML(response);
          takeChildrenFor(fragment, doc.body);
          fragment.title = doc.title;
        } else if (startTag === 'body') {
          // parse body w/o wrapping in template
          fragment = /** @type DocumentFragmentWithTitle */ (new DocumentFragment());
          const doc = parseHTML(responseWithNoHead);
          takeChildrenFor(fragment, doc.body);
          fragment.title = doc.title;
        } else {
          // otherwise we have non-body partial HTML content, so wrap it in a template to maximize parsing flexibility
          const doc = parseHTML('<body><template class="internal-htmx-wrapper">' + responseWithNoHead + '</template></body>');
          fragment = /** @type DocumentFragmentWithTitle */ (doc.querySelector('template').content);
          // extract title into fragment for later processing
          fragment.title = doc.title;

          // for legacy reasons we support a title tag at the root level of non-body responses, so we need to handle it
          var titleElement = fragment.querySelector('title');
          if (titleElement && titleElement.parentNode === fragment) {
            titleElement.remove();
            fragment.title = titleElement.innerText;
          }
        }
        if (fragment) {
          if (htmx.config.allowScriptTags) {
            normalizeScriptTags(fragment);
          } else {
            // remove all script tags if scripts are disabled
            fragment.querySelectorAll('script').forEach((script) => script.remove());
          }
        }
        return fragment
      }

      /**
       * @param {Function} func
       */
      function maybeCall(func) {
        if (func) {
          func();
        }
      }

      /**
       * @param {any} o
       * @param {string} type
       * @returns
       */
      function isType(o, type) {
        return Object.prototype.toString.call(o) === '[object ' + type + ']'
      }

      /**
       * @param {*} o
       * @returns {o is Function}
       */
      function isFunction(o) {
        return typeof o === 'function'
      }

      /**
       * @param {*} o
       * @returns {o is Object}
       */
      function isRawObject(o) {
        return isType(o, 'Object')
      }

      /**
       * @typedef {Object} OnHandler
       * @property {(keyof HTMLElementEventMap)|string} event
       * @property {EventListener} listener
       */

      /**
       * @typedef {Object} ListenerInfo
       * @property {string} trigger
       * @property {EventListener} listener
       * @property {EventTarget} on
       */

      /**
       * @typedef {Object} HtmxNodeInternalData
       * Element data
       * @property {number} [initHash]
       * @property {boolean} [boosted]
       * @property {OnHandler[]} [onHandlers]
       * @property {number} [timeout]
       * @property {ListenerInfo[]} [listenerInfos]
       * @property {boolean} [cancelled]
       * @property {boolean} [triggeredOnce]
       * @property {number} [delayed]
       * @property {number|null} [throttle]
       * @property {WeakMap<HtmxTriggerSpecification,WeakMap<EventTarget,string>>} [lastValue]
       * @property {boolean} [loaded]
       * @property {string} [path]
       * @property {string} [verb]
       * @property {boolean} [polling]
       * @property {HTMLButtonElement|HTMLInputElement|null} [lastButtonClicked]
       * @property {number} [requestCount]
       * @property {XMLHttpRequest} [xhr]
       * @property {(() => void)[]} [queuedRequests]
       * @property {boolean} [abortable]
       * @property {boolean} [firstInitCompleted]
       *
       * Event data
       * @property {HtmxTriggerSpecification} [triggerSpec]
       * @property {EventTarget[]} [handledFor]
       */

      /**
       * getInternalData retrieves "private" data stored by htmx within an element
       * @param {EventTarget|Event} elt
       * @returns {HtmxNodeInternalData}
       */
      function getInternalData(elt) {
        const dataProp = 'htmx-internal-data';
        let data = elt[dataProp];
        if (!data) {
          data = elt[dataProp] = {};
        }
        return data
      }

      /**
       * toArray converts an ArrayLike object into a real array.
       * @template T
       * @param {ArrayLike<T>} arr
       * @returns {T[]}
       */
      function toArray(arr) {
        const returnArr = [];
        if (arr) {
          for (let i = 0; i < arr.length; i++) {
            returnArr.push(arr[i]);
          }
        }
        return returnArr
      }

      /**
       * @template T
       * @param {T[]|NamedNodeMap|HTMLCollection|HTMLFormControlsCollection|ArrayLike<T>} arr
       * @param {(T) => void} func
       */
      function forEach(arr, func) {
        if (arr) {
          for (let i = 0; i < arr.length; i++) {
            func(arr[i]);
          }
        }
      }

      /**
       * @param {Element} el
       * @returns {boolean}
       */
      function isScrolledIntoView(el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;
        return elemTop < window.innerHeight && elemBottom >= 0
      }

      /**
       * Checks whether the element is in the document (includes shadow roots).
       * This function this is a slight misnomer; it will return true even for elements in the head.
       *
       * @param {Node} elt
       * @returns {boolean}
       */
      function bodyContains(elt) {
        return elt.getRootNode({ composed: true }) === document
      }

      /**
       * @param {string} trigger
       * @returns {string[]}
       */
      function splitOnWhitespace(trigger) {
        return trigger.trim().split(/\s+/)
      }

      /**
       * mergeObjects takes all the keys from
       * obj2 and duplicates them into obj1
       * @template T1
       * @template T2
       * @param {T1} obj1
       * @param {T2} obj2
       * @returns {T1 & T2}
       */
      function mergeObjects(obj1, obj2) {
        for (const key in obj2) {
          if (obj2.hasOwnProperty(key)) {
            // @ts-ignore tsc doesn't seem to properly handle types merging
            obj1[key] = obj2[key];
          }
        }
        // @ts-ignore tsc doesn't seem to properly handle types merging
        return obj1
      }

      /**
       * @param {string} jString
       * @returns {any|null}
       */
      function parseJSON(jString) {
        try {
          return JSON.parse(jString)
        } catch (error) {
          logError(error);
          return null
        }
      }

      /**
       * @returns {boolean}
       */
      function canAccessLocalStorage() {
        const test = 'htmx:localStorageTest';
        try {
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return true
        } catch (e) {
          return false
        }
      }

      /**
       * @param {string} path
       * @returns {string}
       */
      function normalizePath(path) {
        try {
          const url = new URL(path);
          if (url) {
            path = url.pathname + url.search;
          }
          // remove trailing slash, unless index page
          if (!(/^\/$/.test(path))) {
            path = path.replace(/\/+$/, '');
          }
          return path
        } catch (e) {
          // be kind to IE11, which doesn't support URL()
          return path
        }
      }

      //= =========================================================================================
      // public API
      //= =========================================================================================

      /**
       * @param {string} str
       * @returns {any}
       */
      function internalEval(str) {
        return maybeEval(getDocument().body, function() {
          return eval(str)
        })
      }

      /**
       * Adds a callback for the **htmx:load** event. This can be used to process new content, for example initializing the content with a javascript library
       *
       * @see https://htmx.org/api/#onLoad
       *
       * @param {(elt: Node) => void} callback the callback to call on newly loaded content
       * @returns {EventListener}
       */
      function onLoadHelper(callback) {
        const value = htmx.on('htmx:load', /** @param {CustomEvent} evt */ function(evt) {
          callback(evt.detail.elt);
        });
        return value
      }

      /**
       * Log all htmx events, useful for debugging.
       *
       * @see https://htmx.org/api/#logAll
       */
      function logAll() {
        htmx.logger = function(elt, event, data) {
          if (console) {
            console.log(event, elt, data);
          }
        };
      }

      function logNone() {
        htmx.logger = null;
      }

      /**
       * Finds an element matching the selector
       *
       * @see https://htmx.org/api/#find
       *
       * @param {ParentNode|string} eltOrSelector  the root element to find the matching element in, inclusive | the selector to match
       * @param {string} [selector] the selector to match
       * @returns {Element|null}
       */
      function find(eltOrSelector, selector) {
        if (typeof eltOrSelector !== 'string') {
          return eltOrSelector.querySelector(selector)
        } else {
          return find(getDocument(), eltOrSelector)
        }
      }

      /**
       * Finds all elements matching the selector
       *
       * @see https://htmx.org/api/#findAll
       *
       * @param {ParentNode|string} eltOrSelector the root element to find the matching elements in, inclusive | the selector to match
       * @param {string} [selector] the selector to match
       * @returns {NodeListOf<Element>}
       */
      function findAll(eltOrSelector, selector) {
        if (typeof eltOrSelector !== 'string') {
          return eltOrSelector.querySelectorAll(selector)
        } else {
          return findAll(getDocument(), eltOrSelector)
        }
      }

      /**
       * @returns Window
       */
      function getWindow() {
        return window
      }

      /**
       * Removes an element from the DOM
       *
       * @see https://htmx.org/api/#remove
       *
       * @param {Node} elt
       * @param {number} [delay]
       */
      function removeElement(elt, delay) {
        elt = resolveTarget(elt);
        if (delay) {
          getWindow().setTimeout(function() {
            removeElement(elt);
            elt = null;
          }, delay);
        } else {
          parentElt(elt).removeChild(elt);
        }
      }

      /**
       * @param {any} elt
       * @return {Element|null}
       */
      function asElement(elt) {
        return elt instanceof Element ? elt : null
      }

      /**
       * @param {any} elt
       * @return {HTMLElement|null}
       */
      function asHtmlElement(elt) {
        return elt instanceof HTMLElement ? elt : null
      }

      /**
       * @param {any} value
       * @return {string|null}
       */
      function asString(value) {
        return typeof value === 'string' ? value : null
      }

      /**
       * @param {EventTarget} elt
       * @return {ParentNode|null}
       */
      function asParentNode(elt) {
        return elt instanceof Element || elt instanceof Document || elt instanceof DocumentFragment ? elt : null
      }

      /**
       * This method adds a class to the given element.
       *
       * @see https://htmx.org/api/#addClass
       *
       * @param {Element|string} elt the element to add the class to
       * @param {string} clazz the class to add
       * @param {number} [delay] the delay (in milliseconds) before class is added
       */
      function addClassToElement(elt, clazz, delay) {
        elt = asElement(resolveTarget(elt));
        if (!elt) {
          return
        }
        if (delay) {
          getWindow().setTimeout(function() {
            addClassToElement(elt, clazz);
            elt = null;
          }, delay);
        } else {
          elt.classList && elt.classList.add(clazz);
        }
      }

      /**
       * Removes a class from the given element
       *
       * @see https://htmx.org/api/#removeClass
       *
       * @param {Node|string} node element to remove the class from
       * @param {string} clazz the class to remove
       * @param {number} [delay] the delay (in milliseconds before class is removed)
       */
      function removeClassFromElement(node, clazz, delay) {
        let elt = asElement(resolveTarget(node));
        if (!elt) {
          return
        }
        if (delay) {
          getWindow().setTimeout(function() {
            removeClassFromElement(elt, clazz);
            elt = null;
          }, delay);
        } else {
          if (elt.classList) {
            elt.classList.remove(clazz);
            // if there are no classes left, remove the class attribute
            if (elt.classList.length === 0) {
              elt.removeAttribute('class');
            }
          }
        }
      }

      /**
       * Toggles the given class on an element
       *
       * @see https://htmx.org/api/#toggleClass
       *
       * @param {Element|string} elt the element to toggle the class on
       * @param {string} clazz the class to toggle
       */
      function toggleClassOnElement(elt, clazz) {
        elt = resolveTarget(elt);
        elt.classList.toggle(clazz);
      }

      /**
       * Takes the given class from its siblings, so that among its siblings, only the given element will have the class.
       *
       * @see https://htmx.org/api/#takeClass
       *
       * @param {Node|string} elt the element that will take the class
       * @param {string} clazz the class to take
       */
      function takeClassForElement(elt, clazz) {
        elt = resolveTarget(elt);
        forEach(elt.parentElement.children, function(child) {
          removeClassFromElement(child, clazz);
        });
        addClassToElement(asElement(elt), clazz);
      }

      /**
       * Finds the closest matching element in the given elements parentage, inclusive of the element
       *
       * @see https://htmx.org/api/#closest
       *
       * @param {Element|string} elt the element to find the selector from
       * @param {string} selector the selector to find
       * @returns {Element|null}
       */
      function closest(elt, selector) {
        elt = asElement(resolveTarget(elt));
        if (elt && elt.closest) {
          return elt.closest(selector)
        } else {
          // TODO remove when IE goes away
          do {
            if (elt == null || matches(elt, selector)) {
              return elt
            }
          }
          while (elt = elt && asElement(parentElt(elt)))
          return null
        }
      }

      /**
       * @param {string} str
       * @param {string} prefix
       * @returns {boolean}
       */
      function startsWith(str, prefix) {
        return str.substring(0, prefix.length) === prefix
      }

      /**
       * @param {string} str
       * @param {string} suffix
       * @returns {boolean}
       */
      function endsWith(str, suffix) {
        return str.substring(str.length - suffix.length) === suffix
      }

      /**
       * @param {string} selector
       * @returns {string}
       */
      function normalizeSelector(selector) {
        const trimmedSelector = selector.trim();
        if (startsWith(trimmedSelector, '<') && endsWith(trimmedSelector, '/>')) {
          return trimmedSelector.substring(1, trimmedSelector.length - 2)
        } else {
          return trimmedSelector
        }
      }

      /**
       * @param {Node|Element|Document|string} elt
       * @param {string} selector
       * @param {boolean=} global
       * @returns {(Node|Window)[]}
       */
      function querySelectorAllExt(elt, selector, global) {
        if (selector.indexOf('global ') === 0) {
          return querySelectorAllExt(elt, selector.slice(7), true)
        }

        elt = resolveTarget(elt);

        const parts = [];
        {
          let chevronsCount = 0;
          let offset = 0;
          for (let i = 0; i < selector.length; i++) {
            const char = selector[i];
            if (char === ',' && chevronsCount === 0) {
              parts.push(selector.substring(offset, i));
              offset = i + 1;
              continue
            }
            if (char === '<') {
              chevronsCount++;
            } else if (char === '/' && i < selector.length - 1 && selector[i + 1] === '>') {
              chevronsCount--;
            }
          }
          if (offset < selector.length) {
            parts.push(selector.substring(offset));
          }
        }

        const result = [];
        const unprocessedParts = [];
        while (parts.length > 0) {
          const selector = normalizeSelector(parts.shift());
          let item;
          if (selector.indexOf('closest ') === 0) {
            item = closest(asElement(elt), normalizeSelector(selector.substr(8)));
          } else if (selector.indexOf('find ') === 0) {
            item = find(asParentNode(elt), normalizeSelector(selector.substr(5)));
          } else if (selector === 'next' || selector === 'nextElementSibling') {
            item = asElement(elt).nextElementSibling;
          } else if (selector.indexOf('next ') === 0) {
            item = scanForwardQuery(elt, normalizeSelector(selector.substr(5)), !!global);
          } else if (selector === 'previous' || selector === 'previousElementSibling') {
            item = asElement(elt).previousElementSibling;
          } else if (selector.indexOf('previous ') === 0) {
            item = scanBackwardsQuery(elt, normalizeSelector(selector.substr(9)), !!global);
          } else if (selector === 'document') {
            item = document;
          } else if (selector === 'window') {
            item = window;
          } else if (selector === 'body') {
            item = document.body;
          } else if (selector === 'root') {
            item = getRootNode(elt, !!global);
          } else if (selector === 'host') {
            item = (/** @type ShadowRoot */(elt.getRootNode())).host;
          } else {
            unprocessedParts.push(selector);
          }

          if (item) {
            result.push(item);
          }
        }

        if (unprocessedParts.length > 0) {
          const standardSelector = unprocessedParts.join(',');
          const rootNode = asParentNode(getRootNode(elt, !!global));
          result.push(...toArray(rootNode.querySelectorAll(standardSelector)));
        }

        return result
      }

      /**
       * @param {Node} start
       * @param {string} match
       * @param {boolean} global
       * @returns {Element}
       */
      var scanForwardQuery = function(start, match, global) {
        const results = asParentNode(getRootNode(start, global)).querySelectorAll(match);
        for (let i = 0; i < results.length; i++) {
          const elt = results[i];
          if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_PRECEDING) {
            return elt
          }
        }
      };

      /**
       * @param {Node} start
       * @param {string} match
       * @param {boolean} global
       * @returns {Element}
       */
      var scanBackwardsQuery = function(start, match, global) {
        const results = asParentNode(getRootNode(start, global)).querySelectorAll(match);
        for (let i = results.length - 1; i >= 0; i--) {
          const elt = results[i];
          if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_FOLLOWING) {
            return elt
          }
        }
      };

      /**
       * @param {Node|string} eltOrSelector
       * @param {string=} selector
       * @returns {Node|Window}
       */
      function querySelectorExt(eltOrSelector, selector) {
        if (typeof eltOrSelector !== 'string') {
          return querySelectorAllExt(eltOrSelector, selector)[0]
        } else {
          return querySelectorAllExt(getDocument().body, eltOrSelector)[0]
        }
      }

      /**
       * @template {EventTarget} T
       * @param {T|string} eltOrSelector
       * @param {T} [context]
       * @returns {Element|T|null}
       */
      function resolveTarget(eltOrSelector, context) {
        if (typeof eltOrSelector === 'string') {
          return find(asParentNode(context) || document, eltOrSelector)
        } else {
          return eltOrSelector
        }
      }

      /**
       * @typedef {keyof HTMLElementEventMap|string} AnyEventName
       */

      /**
       * @typedef {Object} EventArgs
       * @property {EventTarget} target
       * @property {AnyEventName} event
       * @property {EventListener} listener
       * @property {Object|boolean} options
       */

      /**
       * @param {EventTarget|AnyEventName} arg1
       * @param {AnyEventName|EventListener} arg2
       * @param {EventListener|Object|boolean} [arg3]
       * @param {Object|boolean} [arg4]
       * @returns {EventArgs}
       */
      function processEventArgs(arg1, arg2, arg3, arg4) {
        if (isFunction(arg2)) {
          return {
            target: getDocument().body,
            event: asString(arg1),
            listener: arg2,
            options: arg3
          }
        } else {
          return {
            target: resolveTarget(arg1),
            event: asString(arg2),
            listener: arg3,
            options: arg4
          }
        }
      }

      /**
       * Adds an event listener to an element
       *
       * @see https://htmx.org/api/#on
       *
       * @param {EventTarget|string} arg1 the element to add the listener to | the event name to add the listener for
       * @param {string|EventListener} arg2 the event name to add the listener for | the listener to add
       * @param {EventListener|Object|boolean} [arg3] the listener to add | options to add
       * @param {Object|boolean} [arg4] options to add
       * @returns {EventListener}
       */
      function addEventListenerImpl(arg1, arg2, arg3, arg4) {
        ready(function() {
          const eventArgs = processEventArgs(arg1, arg2, arg3, arg4);
          eventArgs.target.addEventListener(eventArgs.event, eventArgs.listener, eventArgs.options);
        });
        const b = isFunction(arg2);
        return b ? arg2 : arg3
      }

      /**
       * Removes an event listener from an element
       *
       * @see https://htmx.org/api/#off
       *
       * @param {EventTarget|string} arg1 the element to remove the listener from | the event name to remove the listener from
       * @param {string|EventListener} arg2 the event name to remove the listener from | the listener to remove
       * @param {EventListener} [arg3] the listener to remove
       * @returns {EventListener}
       */
      function removeEventListenerImpl(arg1, arg2, arg3) {
        ready(function() {
          const eventArgs = processEventArgs(arg1, arg2, arg3);
          eventArgs.target.removeEventListener(eventArgs.event, eventArgs.listener);
        });
        return isFunction(arg2) ? arg2 : arg3
      }

      //= ===================================================================
      // Node processing
      //= ===================================================================

      const DUMMY_ELT = getDocument().createElement('output'); // dummy element for bad selectors
      /**
       * @param {Element} elt
       * @param {string} attrName
       * @returns {(Node|Window)[]}
       */
      function findAttributeTargets(elt, attrName) {
        const attrTarget = getClosestAttributeValue(elt, attrName);
        if (attrTarget) {
          if (attrTarget === 'this') {
            return [findThisElement(elt, attrName)]
          } else {
            const result = querySelectorAllExt(elt, attrTarget);
            if (result.length === 0) {
              logError('The selector "' + attrTarget + '" on ' + attrName + ' returned no matches!');
              return [DUMMY_ELT]
            } else {
              return result
            }
          }
        }
      }

      /**
       * @param {Element} elt
       * @param {string} attribute
       * @returns {Element|null}
       */
      function findThisElement(elt, attribute) {
        return asElement(getClosestMatch(elt, function(elt) {
          return getAttributeValue(asElement(elt), attribute) != null
        }))
      }

      /**
       * @param {Element} elt
       * @returns {Node|Window|null}
       */
      function getTarget(elt) {
        const targetStr = getClosestAttributeValue(elt, 'hx-target');
        if (targetStr) {
          if (targetStr === 'this') {
            return findThisElement(elt, 'hx-target')
          } else {
            return querySelectorExt(elt, targetStr)
          }
        } else {
          const data = getInternalData(elt);
          if (data.boosted) {
            return getDocument().body
          } else {
            return elt
          }
        }
      }

      /**
       * @param {string} name
       * @returns {boolean}
       */
      function shouldSettleAttribute(name) {
        const attributesToSettle = htmx.config.attributesToSettle;
        for (let i = 0; i < attributesToSettle.length; i++) {
          if (name === attributesToSettle[i]) {
            return true
          }
        }
        return false
      }

      /**
       * @param {Element} mergeTo
       * @param {Element} mergeFrom
       */
      function cloneAttributes(mergeTo, mergeFrom) {
        forEach(mergeTo.attributes, function(attr) {
          if (!mergeFrom.hasAttribute(attr.name) && shouldSettleAttribute(attr.name)) {
            mergeTo.removeAttribute(attr.name);
          }
        });
        forEach(mergeFrom.attributes, function(attr) {
          if (shouldSettleAttribute(attr.name)) {
            mergeTo.setAttribute(attr.name, attr.value);
          }
        });
      }

      /**
       * @param {HtmxSwapStyle} swapStyle
       * @param {Element} target
       * @returns {boolean}
       */
      function isInlineSwap(swapStyle, target) {
        const extensions = getExtensions(target);
        for (let i = 0; i < extensions.length; i++) {
          const extension = extensions[i];
          try {
            if (extension.isInlineSwap(swapStyle)) {
              return true
            }
          } catch (e) {
            logError(e);
          }
        }
        return swapStyle === 'outerHTML'
      }

      /**
       * @param {string} oobValue
       * @param {Element} oobElement
       * @param {HtmxSettleInfo} settleInfo
       * @param {Node|Document} [rootNode]
       * @returns
       */
      function oobSwap(oobValue, oobElement, settleInfo, rootNode) {
        rootNode = rootNode || getDocument();
        let selector = '#' + getRawAttribute(oobElement, 'id');
        /** @type HtmxSwapStyle */
        let swapStyle = 'outerHTML';
        if (oobValue === 'true') ; else if (oobValue.indexOf(':') > 0) {
          swapStyle = oobValue.substring(0, oobValue.indexOf(':'));
          selector = oobValue.substring(oobValue.indexOf(':') + 1);
        } else {
          swapStyle = oobValue;
        }
        oobElement.removeAttribute('hx-swap-oob');
        oobElement.removeAttribute('data-hx-swap-oob');

        const targets = querySelectorAllExt(rootNode, selector, false);
        if (targets) {
          forEach(
            targets,
            function(target) {
              let fragment;
              const oobElementClone = oobElement.cloneNode(true);
              fragment = getDocument().createDocumentFragment();
              fragment.appendChild(oobElementClone);
              if (!isInlineSwap(swapStyle, target)) {
                fragment = asParentNode(oobElementClone); // if this is not an inline swap, we use the content of the node, not the node itself
              }

              const beforeSwapDetails = { shouldSwap: true, target, fragment };
              if (!triggerEvent(target, 'htmx:oobBeforeSwap', beforeSwapDetails)) return

              target = beforeSwapDetails.target; // allow re-targeting
              if (beforeSwapDetails.shouldSwap) {
                handlePreservedElements(fragment);
                swapWithStyle(swapStyle, target, target, fragment, settleInfo);
                restorePreservedElements();
              }
              forEach(settleInfo.elts, function(elt) {
                triggerEvent(elt, 'htmx:oobAfterSwap', beforeSwapDetails);
              });
            }
          );
          oobElement.parentNode.removeChild(oobElement);
        } else {
          oobElement.parentNode.removeChild(oobElement);
          triggerErrorEvent(getDocument().body, 'htmx:oobErrorNoTarget', { content: oobElement });
        }
        return oobValue
      }

      function restorePreservedElements() {
        const pantry = find('#--htmx-preserve-pantry--');
        if (pantry) {
          for (const preservedElt of [...pantry.children]) {
            const existingElement = find('#' + preservedElt.id);
            // @ts-ignore - use proposed moveBefore feature
            existingElement.parentNode.moveBefore(preservedElt, existingElement);
            existingElement.remove();
          }
          pantry.remove();
        }
      }

      /**
       * @param {DocumentFragment|ParentNode} fragment
       */
      function handlePreservedElements(fragment) {
        forEach(findAll(fragment, '[hx-preserve], [data-hx-preserve]'), function(preservedElt) {
          const id = getAttributeValue(preservedElt, 'id');
          const existingElement = getDocument().getElementById(id);
          if (existingElement != null) {
            if (preservedElt.moveBefore) { // if the moveBefore API exists, use it
              // get or create a storage spot for stuff
              let pantry = find('#--htmx-preserve-pantry--');
              if (pantry == null) {
                getDocument().body.insertAdjacentHTML('afterend', "<div id='--htmx-preserve-pantry--'></div>");
                pantry = find('#--htmx-preserve-pantry--');
              }
              // @ts-ignore - use proposed moveBefore feature
              pantry.moveBefore(existingElement, null);
            } else {
              preservedElt.parentNode.replaceChild(existingElement, preservedElt);
            }
          }
        });
      }

      /**
       * @param {Node} parentNode
       * @param {ParentNode} fragment
       * @param {HtmxSettleInfo} settleInfo
       */
      function handleAttributes(parentNode, fragment, settleInfo) {
        forEach(fragment.querySelectorAll('[id]'), function(newNode) {
          const id = getRawAttribute(newNode, 'id');
          if (id && id.length > 0) {
            const normalizedId = id.replace("'", "\\'");
            const normalizedTag = newNode.tagName.replace(':', '\\:');
            const parentElt = asParentNode(parentNode);
            const oldNode = parentElt && parentElt.querySelector(normalizedTag + "[id='" + normalizedId + "']");
            if (oldNode && oldNode !== parentElt) {
              const newAttributes = newNode.cloneNode();
              cloneAttributes(newNode, oldNode);
              settleInfo.tasks.push(function() {
                cloneAttributes(newNode, newAttributes);
              });
            }
          }
        });
      }

      /**
       * @param {Node} child
       * @returns {HtmxSettleTask}
       */
      function makeAjaxLoadTask(child) {
        return function() {
          removeClassFromElement(child, htmx.config.addedClass);
          processNode(asElement(child));
          processFocus(asParentNode(child));
          triggerEvent(child, 'htmx:load');
        }
      }

      /**
       * @param {ParentNode} child
       */
      function processFocus(child) {
        const autofocus = '[autofocus]';
        const autoFocusedElt = asHtmlElement(matches(child, autofocus) ? child : child.querySelector(autofocus));
        if (autoFocusedElt != null) {
          autoFocusedElt.focus();
        }
      }

      /**
       * @param {Node} parentNode
       * @param {Node} insertBefore
       * @param {ParentNode} fragment
       * @param {HtmxSettleInfo} settleInfo
       */
      function insertNodesBefore(parentNode, insertBefore, fragment, settleInfo) {
        handleAttributes(parentNode, fragment, settleInfo);
        while (fragment.childNodes.length > 0) {
          const child = fragment.firstChild;
          addClassToElement(asElement(child), htmx.config.addedClass);
          parentNode.insertBefore(child, insertBefore);
          if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
            settleInfo.tasks.push(makeAjaxLoadTask(child));
          }
        }
      }

      /**
       * based on https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0,
       * derived from Java's string hashcode implementation
       * @param {string} string
       * @param {number} hash
       * @returns {number}
       */
      function stringHash(string, hash) {
        let char = 0;
        while (char < string.length) {
          hash = (hash << 5) - hash + string.charCodeAt(char++) | 0; // bitwise or ensures we have a 32-bit int
        }
        return hash
      }

      /**
       * @param {Element} elt
       * @returns {number}
       */
      function attributeHash(elt) {
        let hash = 0;
        // IE fix
        if (elt.attributes) {
          for (let i = 0; i < elt.attributes.length; i++) {
            const attribute = elt.attributes[i];
            if (attribute.value) { // only include attributes w/ actual values (empty is same as non-existent)
              hash = stringHash(attribute.name, hash);
              hash = stringHash(attribute.value, hash);
            }
          }
        }
        return hash
      }

      /**
       * @param {EventTarget} elt
       */
      function deInitOnHandlers(elt) {
        const internalData = getInternalData(elt);
        if (internalData.onHandlers) {
          for (let i = 0; i < internalData.onHandlers.length; i++) {
            const handlerInfo = internalData.onHandlers[i];
            removeEventListenerImpl(elt, handlerInfo.event, handlerInfo.listener);
          }
          delete internalData.onHandlers;
        }
      }

      /**
       * @param {Node} element
       */
      function deInitNode(element) {
        const internalData = getInternalData(element);
        if (internalData.timeout) {
          clearTimeout(internalData.timeout);
        }
        if (internalData.listenerInfos) {
          forEach(internalData.listenerInfos, function(info) {
            if (info.on) {
              removeEventListenerImpl(info.on, info.trigger, info.listener);
            }
          });
        }
        deInitOnHandlers(element);
        forEach(Object.keys(internalData), function(key) { if (key !== 'firstInitCompleted') delete internalData[key]; });
      }

      /**
       * @param {Node} element
       */
      function cleanUpElement(element) {
        triggerEvent(element, 'htmx:beforeCleanupElement');
        deInitNode(element);
        // @ts-ignore IE11 code
        // noinspection JSUnresolvedReference
        if (element.children) { // IE
          // @ts-ignore
          forEach(element.children, function(child) { cleanUpElement(child); });
        }
      }

      /**
       * @param {Node} target
       * @param {ParentNode} fragment
       * @param {HtmxSettleInfo} settleInfo
       */
      function swapOuterHTML(target, fragment, settleInfo) {
        if (target instanceof Element && target.tagName === 'BODY') { // special case the body to innerHTML because DocumentFragments can't contain a body elt unfortunately
          return swapInnerHTML(target, fragment, settleInfo)
        }
        /** @type {Node} */
        let newElt;
        const eltBeforeNewContent = target.previousSibling;
        const parentNode = parentElt(target);
        if (!parentNode) { // when parent node disappears, we can't do anything
          return
        }
        insertNodesBefore(parentNode, target, fragment, settleInfo);
        if (eltBeforeNewContent == null) {
          newElt = parentNode.firstChild;
        } else {
          newElt = eltBeforeNewContent.nextSibling;
        }
        settleInfo.elts = settleInfo.elts.filter(function(e) { return e !== target });
        // scan through all newly added content and add all elements to the settle info so we trigger
        // events properly on them
        while (newElt && newElt !== target) {
          if (newElt instanceof Element) {
            settleInfo.elts.push(newElt);
          }
          newElt = newElt.nextSibling;
        }
        cleanUpElement(target);
        if (target instanceof Element) {
          target.remove();
        } else {
          target.parentNode.removeChild(target);
        }
      }

      /**
       * @param {Node} target
       * @param {ParentNode} fragment
       * @param {HtmxSettleInfo} settleInfo
       */
      function swapAfterBegin(target, fragment, settleInfo) {
        return insertNodesBefore(target, target.firstChild, fragment, settleInfo)
      }

      /**
       * @param {Node} target
       * @param {ParentNode} fragment
       * @param {HtmxSettleInfo} settleInfo
       */
      function swapBeforeBegin(target, fragment, settleInfo) {
        return insertNodesBefore(parentElt(target), target, fragment, settleInfo)
      }

      /**
       * @param {Node} target
       * @param {ParentNode} fragment
       * @param {HtmxSettleInfo} settleInfo
       */
      function swapBeforeEnd(target, fragment, settleInfo) {
        return insertNodesBefore(target, null, fragment, settleInfo)
      }

      /**
       * @param {Node} target
       * @param {ParentNode} fragment
       * @param {HtmxSettleInfo} settleInfo
       */
      function swapAfterEnd(target, fragment, settleInfo) {
        return insertNodesBefore(parentElt(target), target.nextSibling, fragment, settleInfo)
      }

      /**
       * @param {Node} target
       */
      function swapDelete(target) {
        cleanUpElement(target);
        const parent = parentElt(target);
        if (parent) {
          return parent.removeChild(target)
        }
      }

      /**
       * @param {Node} target
       * @param {ParentNode} fragment
       * @param {HtmxSettleInfo} settleInfo
       */
      function swapInnerHTML(target, fragment, settleInfo) {
        const firstChild = target.firstChild;
        insertNodesBefore(target, firstChild, fragment, settleInfo);
        if (firstChild) {
          while (firstChild.nextSibling) {
            cleanUpElement(firstChild.nextSibling);
            target.removeChild(firstChild.nextSibling);
          }
          cleanUpElement(firstChild);
          target.removeChild(firstChild);
        }
      }

      /**
       * @param {HtmxSwapStyle} swapStyle
       * @param {Element} elt
       * @param {Node} target
       * @param {ParentNode} fragment
       * @param {HtmxSettleInfo} settleInfo
       */
      function swapWithStyle(swapStyle, elt, target, fragment, settleInfo) {
        switch (swapStyle) {
          case 'none':
            return
          case 'outerHTML':
            swapOuterHTML(target, fragment, settleInfo);
            return
          case 'afterbegin':
            swapAfterBegin(target, fragment, settleInfo);
            return
          case 'beforebegin':
            swapBeforeBegin(target, fragment, settleInfo);
            return
          case 'beforeend':
            swapBeforeEnd(target, fragment, settleInfo);
            return
          case 'afterend':
            swapAfterEnd(target, fragment, settleInfo);
            return
          case 'delete':
            swapDelete(target);
            return
          default:
            var extensions = getExtensions(elt);
            for (let i = 0; i < extensions.length; i++) {
              const ext = extensions[i];
              try {
                const newElements = ext.handleSwap(swapStyle, target, fragment, settleInfo);
                if (newElements) {
                  if (Array.isArray(newElements)) {
                    // if handleSwap returns an array (like) of elements, we handle them
                    for (let j = 0; j < newElements.length; j++) {
                      const child = newElements[j];
                      if (child.nodeType !== Node.TEXT_NODE && child.nodeType !== Node.COMMENT_NODE) {
                        settleInfo.tasks.push(makeAjaxLoadTask(child));
                      }
                    }
                  }
                  return
                }
              } catch (e) {
                logError(e);
              }
            }
            if (swapStyle === 'innerHTML') {
              swapInnerHTML(target, fragment, settleInfo);
            } else {
              swapWithStyle(htmx.config.defaultSwapStyle, elt, target, fragment, settleInfo);
            }
        }
      }

      /**
       * @param {DocumentFragment} fragment
       * @param {HtmxSettleInfo} settleInfo
       * @param {Node|Document} [rootNode]
       */
      function findAndSwapOobElements(fragment, settleInfo, rootNode) {
        var oobElts = findAll(fragment, '[hx-swap-oob], [data-hx-swap-oob]');
        forEach(oobElts, function(oobElement) {
          if (htmx.config.allowNestedOobSwaps || oobElement.parentElement === null) {
            const oobValue = getAttributeValue(oobElement, 'hx-swap-oob');
            if (oobValue != null) {
              oobSwap(oobValue, oobElement, settleInfo, rootNode);
            }
          } else {
            oobElement.removeAttribute('hx-swap-oob');
            oobElement.removeAttribute('data-hx-swap-oob');
          }
        });
        return oobElts.length > 0
      }

      /**
       * Implements complete swapping pipeline, including: focus and selection preservation,
       * title updates, scroll, OOB swapping, normal swapping and settling
       * @param {string|Element} target
       * @param {string} content
       * @param {HtmxSwapSpecification} swapSpec
       * @param {SwapOptions} [swapOptions]
       */
      function swap(target, content, swapSpec, swapOptions) {
        if (!swapOptions) {
          swapOptions = {};
        }

        target = resolveTarget(target);
        const rootNode = swapOptions.contextElement ? getRootNode(swapOptions.contextElement, false) : getDocument();

        // preserve focus and selection
        const activeElt = document.activeElement;
        let selectionInfo = {};
        try {
          selectionInfo = {
            elt: activeElt,
            // @ts-ignore
            start: activeElt ? activeElt.selectionStart : null,
            // @ts-ignore
            end: activeElt ? activeElt.selectionEnd : null
          };
        } catch (e) {
          // safari issue - see https://github.com/microsoft/playwright/issues/5894
        }
        const settleInfo = makeSettleInfo(target);

        // For text content swaps, don't parse the response as HTML, just insert it
        if (swapSpec.swapStyle === 'textContent') {
          target.textContent = content;
        // Otherwise, make the fragment and process it
        } else {
          let fragment = makeFragment(content);

          settleInfo.title = fragment.title;

          // select-oob swaps
          if (swapOptions.selectOOB) {
            const oobSelectValues = swapOptions.selectOOB.split(',');
            for (let i = 0; i < oobSelectValues.length; i++) {
              const oobSelectValue = oobSelectValues[i].split(':', 2);
              let id = oobSelectValue[0].trim();
              if (id.indexOf('#') === 0) {
                id = id.substring(1);
              }
              const oobValue = oobSelectValue[1] || 'true';
              const oobElement = fragment.querySelector('#' + id);
              if (oobElement) {
                oobSwap(oobValue, oobElement, settleInfo, rootNode);
              }
            }
          }
          // oob swaps
          findAndSwapOobElements(fragment, settleInfo, rootNode);
          forEach(findAll(fragment, 'template'), /** @param {HTMLTemplateElement} template */function(template) {
            if (template.content && findAndSwapOobElements(template.content, settleInfo, rootNode)) {
              // Avoid polluting the DOM with empty templates that were only used to encapsulate oob swap
              template.remove();
            }
          });

          // normal swap
          if (swapOptions.select) {
            const newFragment = getDocument().createDocumentFragment();
            forEach(fragment.querySelectorAll(swapOptions.select), function(node) {
              newFragment.appendChild(node);
            });
            fragment = newFragment;
          }
          handlePreservedElements(fragment);
          swapWithStyle(swapSpec.swapStyle, swapOptions.contextElement, target, fragment, settleInfo);
          restorePreservedElements();
        }

        // apply saved focus and selection information to swapped content
        if (selectionInfo.elt &&
          !bodyContains(selectionInfo.elt) &&
          getRawAttribute(selectionInfo.elt, 'id')) {
          const newActiveElt = document.getElementById(getRawAttribute(selectionInfo.elt, 'id'));
          const focusOptions = { preventScroll: swapSpec.focusScroll !== undefined ? !swapSpec.focusScroll : !htmx.config.defaultFocusScroll };
          if (newActiveElt) {
            // @ts-ignore
            if (selectionInfo.start && newActiveElt.setSelectionRange) {
              try {
                // @ts-ignore
                newActiveElt.setSelectionRange(selectionInfo.start, selectionInfo.end);
              } catch (e) {
                // the setSelectionRange method is present on fields that don't support it, so just let this fail
              }
            }
            newActiveElt.focus(focusOptions);
          }
        }

        target.classList.remove(htmx.config.swappingClass);
        forEach(settleInfo.elts, function(elt) {
          if (elt.classList) {
            elt.classList.add(htmx.config.settlingClass);
          }
          triggerEvent(elt, 'htmx:afterSwap', swapOptions.eventInfo);
        });
        if (swapOptions.afterSwapCallback) {
          swapOptions.afterSwapCallback();
        }

        // merge in new title after swap but before settle
        if (!swapSpec.ignoreTitle) {
          handleTitle(settleInfo.title);
        }

        // settle
        const doSettle = function() {
          forEach(settleInfo.tasks, function(task) {
            task.call();
          });
          forEach(settleInfo.elts, function(elt) {
            if (elt.classList) {
              elt.classList.remove(htmx.config.settlingClass);
            }
            triggerEvent(elt, 'htmx:afterSettle', swapOptions.eventInfo);
          });

          if (swapOptions.anchor) {
            const anchorTarget = asElement(resolveTarget('#' + swapOptions.anchor));
            if (anchorTarget) {
              anchorTarget.scrollIntoView({ block: 'start', behavior: 'auto' });
            }
          }

          updateScrollState(settleInfo.elts, swapSpec);
          if (swapOptions.afterSettleCallback) {
            swapOptions.afterSettleCallback();
          }
        };

        if (swapSpec.settleDelay > 0) {
          getWindow().setTimeout(doSettle, swapSpec.settleDelay);
        } else {
          doSettle();
        }
      }

      /**
       * @param {XMLHttpRequest} xhr
       * @param {string} header
       * @param {EventTarget} elt
       */
      function handleTriggerHeader(xhr, header, elt) {
        const triggerBody = xhr.getResponseHeader(header);
        if (triggerBody.indexOf('{') === 0) {
          const triggers = parseJSON(triggerBody);
          for (const eventName in triggers) {
            if (triggers.hasOwnProperty(eventName)) {
              let detail = triggers[eventName];
              if (isRawObject(detail)) {
                // @ts-ignore
                elt = detail.target !== undefined ? detail.target : elt;
              } else {
                detail = { value: detail };
              }
              triggerEvent(elt, eventName, detail);
            }
          }
        } else {
          const eventNames = triggerBody.split(',');
          for (let i = 0; i < eventNames.length; i++) {
            triggerEvent(elt, eventNames[i].trim(), []);
          }
        }
      }
      const WHITESPACE_OR_COMMA = /[\s,]/;
      const SYMBOL_START = /[_$a-zA-Z]/;
      const SYMBOL_CONT = /[_$a-zA-Z0-9]/;
      const STRINGISH_START = ['"', "'", '/'];
      const NOT_WHITESPACE = /[^\s]/;
      const COMBINED_SELECTOR_START = /[{(]/;
      const COMBINED_SELECTOR_END = /[})]/;

      /**
       * @param {string} str
       * @returns {string[]}
       */
      function tokenizeString(str) {
        /** @type string[] */
        const tokens = [];
        let position = 0;
        while (position < str.length) {
          if (SYMBOL_START.exec(str.charAt(position))) {
            var startPosition = position;
            while (SYMBOL_CONT.exec(str.charAt(position + 1))) {
              position++;
            }
            tokens.push(str.substring(startPosition, position + 1));
          } else if (STRINGISH_START.indexOf(str.charAt(position)) !== -1) {
            const startChar = str.charAt(position);
            var startPosition = position;
            position++;
            while (position < str.length && str.charAt(position) !== startChar) {
              if (str.charAt(position) === '\\') {
                position++;
              }
              position++;
            }
            tokens.push(str.substring(startPosition, position + 1));
          } else {
            const symbol = str.charAt(position);
            tokens.push(symbol);
          }
          position++;
        }
        return tokens
      }

      /**
       * @param {string} token
       * @param {string|null} last
       * @param {string} paramName
       * @returns {boolean}
       */
      function isPossibleRelativeReference(token, last, paramName) {
        return SYMBOL_START.exec(token.charAt(0)) &&
          token !== 'true' &&
          token !== 'false' &&
          token !== 'this' &&
          token !== paramName &&
          last !== '.'
      }

      /**
       * @param {EventTarget|string} elt
       * @param {string[]} tokens
       * @param {string} paramName
       * @returns {ConditionalFunction|null}
       */
      function maybeGenerateConditional(elt, tokens, paramName) {
        if (tokens[0] === '[') {
          tokens.shift();
          let bracketCount = 1;
          let conditionalSource = ' return (function(' + paramName + '){ return (';
          let last = null;
          while (tokens.length > 0) {
            const token = tokens[0];
            // @ts-ignore For some reason tsc doesn't understand the shift call, and thinks we're comparing the same value here, i.e. '[' vs ']'
            if (token === ']') {
              bracketCount--;
              if (bracketCount === 0) {
                if (last === null) {
                  conditionalSource = conditionalSource + 'true';
                }
                tokens.shift();
                conditionalSource += ')})';
                try {
                  const conditionFunction = maybeEval(elt, function() {
                    return Function(conditionalSource)()
                  },
                  function() { return true });
                  conditionFunction.source = conditionalSource;
                  return conditionFunction
                } catch (e) {
                  triggerErrorEvent(getDocument().body, 'htmx:syntax:error', { error: e, source: conditionalSource });
                  return null
                }
              }
            } else if (token === '[') {
              bracketCount++;
            }
            if (isPossibleRelativeReference(token, last, paramName)) {
              conditionalSource += '((' + paramName + '.' + token + ') ? (' + paramName + '.' + token + ') : (window.' + token + '))';
            } else {
              conditionalSource = conditionalSource + token;
            }
            last = tokens.shift();
          }
        }
      }

      /**
       * @param {string[]} tokens
       * @param {RegExp} match
       * @returns {string}
       */
      function consumeUntil(tokens, match) {
        let result = '';
        while (tokens.length > 0 && !match.test(tokens[0])) {
          result += tokens.shift();
        }
        return result
      }

      /**
       * @param {string[]} tokens
       * @returns {string}
       */
      function consumeCSSSelector(tokens) {
        let result;
        if (tokens.length > 0 && COMBINED_SELECTOR_START.test(tokens[0])) {
          tokens.shift();
          result = consumeUntil(tokens, COMBINED_SELECTOR_END).trim();
          tokens.shift();
        } else {
          result = consumeUntil(tokens, WHITESPACE_OR_COMMA);
        }
        return result
      }

      const INPUT_SELECTOR = 'input, textarea, select';

      /**
       * @param {Element} elt
       * @param {string} explicitTrigger
       * @param {Object} cache for trigger specs
       * @returns {HtmxTriggerSpecification[]}
       */
      function parseAndCacheTrigger(elt, explicitTrigger, cache) {
        /** @type HtmxTriggerSpecification[] */
        const triggerSpecs = [];
        const tokens = tokenizeString(explicitTrigger);
        do {
          consumeUntil(tokens, NOT_WHITESPACE);
          const initialLength = tokens.length;
          const trigger = consumeUntil(tokens, /[,\[\s]/);
          if (trigger !== '') {
            if (trigger === 'every') {
              /** @type HtmxTriggerSpecification */
              const every = { trigger: 'every' };
              consumeUntil(tokens, NOT_WHITESPACE);
              every.pollInterval = parseInterval(consumeUntil(tokens, /[,\[\s]/));
              consumeUntil(tokens, NOT_WHITESPACE);
              var eventFilter = maybeGenerateConditional(elt, tokens, 'event');
              if (eventFilter) {
                every.eventFilter = eventFilter;
              }
              triggerSpecs.push(every);
            } else {
              /** @type HtmxTriggerSpecification */
              const triggerSpec = { trigger };
              var eventFilter = maybeGenerateConditional(elt, tokens, 'event');
              if (eventFilter) {
                triggerSpec.eventFilter = eventFilter;
              }
              consumeUntil(tokens, NOT_WHITESPACE);
              while (tokens.length > 0 && tokens[0] !== ',') {
                const token = tokens.shift();
                if (token === 'changed') {
                  triggerSpec.changed = true;
                } else if (token === 'once') {
                  triggerSpec.once = true;
                } else if (token === 'consume') {
                  triggerSpec.consume = true;
                } else if (token === 'delay' && tokens[0] === ':') {
                  tokens.shift();
                  triggerSpec.delay = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
                } else if (token === 'from' && tokens[0] === ':') {
                  tokens.shift();
                  if (COMBINED_SELECTOR_START.test(tokens[0])) {
                    var from_arg = consumeCSSSelector(tokens);
                  } else {
                    var from_arg = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                    if (from_arg === 'closest' || from_arg === 'find' || from_arg === 'next' || from_arg === 'previous') {
                      tokens.shift();
                      const selector = consumeCSSSelector(tokens);
                      // `next` and `previous` allow a selector-less syntax
                      if (selector.length > 0) {
                        from_arg += ' ' + selector;
                      }
                    }
                  }
                  triggerSpec.from = from_arg;
                } else if (token === 'target' && tokens[0] === ':') {
                  tokens.shift();
                  triggerSpec.target = consumeCSSSelector(tokens);
                } else if (token === 'throttle' && tokens[0] === ':') {
                  tokens.shift();
                  triggerSpec.throttle = parseInterval(consumeUntil(tokens, WHITESPACE_OR_COMMA));
                } else if (token === 'queue' && tokens[0] === ':') {
                  tokens.shift();
                  triggerSpec.queue = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                } else if (token === 'root' && tokens[0] === ':') {
                  tokens.shift();
                  triggerSpec[token] = consumeCSSSelector(tokens);
                } else if (token === 'threshold' && tokens[0] === ':') {
                  tokens.shift();
                  triggerSpec[token] = consumeUntil(tokens, WHITESPACE_OR_COMMA);
                } else {
                  triggerErrorEvent(elt, 'htmx:syntax:error', { token: tokens.shift() });
                }
                consumeUntil(tokens, NOT_WHITESPACE);
              }
              triggerSpecs.push(triggerSpec);
            }
          }
          if (tokens.length === initialLength) {
            triggerErrorEvent(elt, 'htmx:syntax:error', { token: tokens.shift() });
          }
          consumeUntil(tokens, NOT_WHITESPACE);
        } while (tokens[0] === ',' && tokens.shift())
        if (cache) {
          cache[explicitTrigger] = triggerSpecs;
        }
        return triggerSpecs
      }

      /**
       * @param {Element} elt
       * @returns {HtmxTriggerSpecification[]}
       */
      function getTriggerSpecs(elt) {
        const explicitTrigger = getAttributeValue(elt, 'hx-trigger');
        let triggerSpecs = [];
        if (explicitTrigger) {
          const cache = htmx.config.triggerSpecsCache;
          triggerSpecs = (cache && cache[explicitTrigger]) || parseAndCacheTrigger(elt, explicitTrigger, cache);
        }

        if (triggerSpecs.length > 0) {
          return triggerSpecs
        } else if (matches(elt, 'form')) {
          return [{ trigger: 'submit' }]
        } else if (matches(elt, 'input[type="button"], input[type="submit"]')) {
          return [{ trigger: 'click' }]
        } else if (matches(elt, INPUT_SELECTOR)) {
          return [{ trigger: 'change' }]
        } else {
          return [{ trigger: 'click' }]
        }
      }

      /**
       * @param {Element} elt
       */
      function cancelPolling(elt) {
        getInternalData(elt).cancelled = true;
      }

      /**
       * @param {Element} elt
       * @param {TriggerHandler} handler
       * @param {HtmxTriggerSpecification} spec
       */
      function processPolling(elt, handler, spec) {
        const nodeData = getInternalData(elt);
        nodeData.timeout = getWindow().setTimeout(function() {
          if (bodyContains(elt) && nodeData.cancelled !== true) {
            if (!maybeFilterEvent(spec, elt, makeEvent('hx:poll:trigger', {
              triggerSpec: spec,
              target: elt
            }))) {
              handler(elt);
            }
            processPolling(elt, handler, spec);
          }
        }, spec.pollInterval);
      }

      /**
       * @param {HTMLAnchorElement} elt
       * @returns {boolean}
       */
      function isLocalLink(elt) {
        return location.hostname === elt.hostname &&
          getRawAttribute(elt, 'href') &&
          getRawAttribute(elt, 'href').indexOf('#') !== 0
      }

      /**
       * @param {Element} elt
       */
      function eltIsDisabled(elt) {
        return closest(elt, htmx.config.disableSelector)
      }

      /**
       * @param {Element} elt
       * @param {HtmxNodeInternalData} nodeData
       * @param {HtmxTriggerSpecification[]} triggerSpecs
       */
      function boostElement(elt, nodeData, triggerSpecs) {
        if ((elt instanceof HTMLAnchorElement && isLocalLink(elt) && (elt.target === '' || elt.target === '_self')) || (elt.tagName === 'FORM' && String(getRawAttribute(elt, 'method')).toLowerCase() !== 'dialog')) {
          nodeData.boosted = true;
          let verb, path;
          if (elt.tagName === 'A') {
            verb = (/** @type HttpVerb */('get'));
            path = getRawAttribute(elt, 'href');
          } else {
            const rawAttribute = getRawAttribute(elt, 'method');
            verb = (/** @type HttpVerb */(rawAttribute ? rawAttribute.toLowerCase() : 'get'));
            path = getRawAttribute(elt, 'action');
            if (path == null || path === '') {
              // if there is no action attribute on the form set path to current href before the
              // following logic to properly clear parameters on a GET (not on a POST!)
              path = getDocument().location.href;
            }
            if (verb === 'get' && path.includes('?')) {
              path = path.replace(/\?[^#]+/, '');
            }
          }
          triggerSpecs.forEach(function(triggerSpec) {
            addEventListener(elt, function(node, evt) {
              const elt = asElement(node);
              if (eltIsDisabled(elt)) {
                cleanUpElement(elt);
                return
              }
              issueAjaxRequest(verb, path, elt, evt);
            }, nodeData, triggerSpec, true);
          });
        }
      }

      /**
       * @param {Event} evt
       * @param {Node} node
       * @returns {boolean}
       */
      function shouldCancel(evt, node) {
        const elt = asElement(node);
        if (!elt) {
          return false
        }
        if (evt.type === 'submit' || evt.type === 'click') {
          if (elt.tagName === 'FORM') {
            return true
          }
          if (matches(elt, 'input[type="submit"], button') &&
            (matches(elt, '[form]') || closest(elt, 'form') !== null)) {
            return true
          }
          if (elt instanceof HTMLAnchorElement && elt.href &&
            (elt.getAttribute('href') === '#' || elt.getAttribute('href').indexOf('#') !== 0)) {
            return true
          }
        }
        return false
      }

      /**
       * @param {Node} elt
       * @param {Event|MouseEvent|KeyboardEvent|TouchEvent} evt
       * @returns {boolean}
       */
      function ignoreBoostedAnchorCtrlClick(elt, evt) {
        return getInternalData(elt).boosted && elt instanceof HTMLAnchorElement && evt.type === 'click' &&
          // @ts-ignore this will resolve to undefined for events that don't define those properties, which is fine
          (evt.ctrlKey || evt.metaKey)
      }

      /**
       * @param {HtmxTriggerSpecification} triggerSpec
       * @param {Node} elt
       * @param {Event} evt
       * @returns {boolean}
       */
      function maybeFilterEvent(triggerSpec, elt, evt) {
        const eventFilter = triggerSpec.eventFilter;
        if (eventFilter) {
          try {
            return eventFilter.call(elt, evt) !== true
          } catch (e) {
            const source = eventFilter.source;
            triggerErrorEvent(getDocument().body, 'htmx:eventFilter:error', { error: e, source });
            return true
          }
        }
        return false
      }

      /**
       * @param {Node} elt
       * @param {TriggerHandler} handler
       * @param {HtmxNodeInternalData} nodeData
       * @param {HtmxTriggerSpecification} triggerSpec
       * @param {boolean} [explicitCancel]
       */
      function addEventListener(elt, handler, nodeData, triggerSpec, explicitCancel) {
        const elementData = getInternalData(elt);
        /** @type {(Node|Window)[]} */
        let eltsToListenOn;
        if (triggerSpec.from) {
          eltsToListenOn = querySelectorAllExt(elt, triggerSpec.from);
        } else {
          eltsToListenOn = [elt];
        }
        // store the initial values of the elements, so we can tell if they change
        if (triggerSpec.changed) {
          if (!('lastValue' in elementData)) {
            elementData.lastValue = new WeakMap();
          }
          eltsToListenOn.forEach(function(eltToListenOn) {
            if (!elementData.lastValue.has(triggerSpec)) {
              elementData.lastValue.set(triggerSpec, new WeakMap());
            }
            // @ts-ignore value will be undefined for non-input elements, which is fine
            elementData.lastValue.get(triggerSpec).set(eltToListenOn, eltToListenOn.value);
          });
        }
        forEach(eltsToListenOn, function(eltToListenOn) {
          /** @type EventListener */
          const eventListener = function(evt) {
            if (!bodyContains(elt)) {
              eltToListenOn.removeEventListener(triggerSpec.trigger, eventListener);
              return
            }
            if (ignoreBoostedAnchorCtrlClick(elt, evt)) {
              return
            }
            if (explicitCancel || shouldCancel(evt, elt)) {
              evt.preventDefault();
            }
            if (maybeFilterEvent(triggerSpec, elt, evt)) {
              return
            }
            const eventData = getInternalData(evt);
            eventData.triggerSpec = triggerSpec;
            if (eventData.handledFor == null) {
              eventData.handledFor = [];
            }
            if (eventData.handledFor.indexOf(elt) < 0) {
              eventData.handledFor.push(elt);
              if (triggerSpec.consume) {
                evt.stopPropagation();
              }
              if (triggerSpec.target && evt.target) {
                if (!matches(asElement(evt.target), triggerSpec.target)) {
                  return
                }
              }
              if (triggerSpec.once) {
                if (elementData.triggeredOnce) {
                  return
                } else {
                  elementData.triggeredOnce = true;
                }
              }
              if (triggerSpec.changed) {
                const node = event.target;
                // @ts-ignore value will be undefined for non-input elements, which is fine
                const value = node.value;
                const lastValue = elementData.lastValue.get(triggerSpec);
                if (lastValue.has(node) && lastValue.get(node) === value) {
                  return
                }
                lastValue.set(node, value);
              }
              if (elementData.delayed) {
                clearTimeout(elementData.delayed);
              }
              if (elementData.throttle) {
                return
              }

              if (triggerSpec.throttle > 0) {
                if (!elementData.throttle) {
                  triggerEvent(elt, 'htmx:trigger');
                  handler(elt, evt);
                  elementData.throttle = getWindow().setTimeout(function() {
                    elementData.throttle = null;
                  }, triggerSpec.throttle);
                }
              } else if (triggerSpec.delay > 0) {
                elementData.delayed = getWindow().setTimeout(function() {
                  triggerEvent(elt, 'htmx:trigger');
                  handler(elt, evt);
                }, triggerSpec.delay);
              } else {
                triggerEvent(elt, 'htmx:trigger');
                handler(elt, evt);
              }
            }
          };
          if (nodeData.listenerInfos == null) {
            nodeData.listenerInfos = [];
          }
          nodeData.listenerInfos.push({
            trigger: triggerSpec.trigger,
            listener: eventListener,
            on: eltToListenOn
          });
          eltToListenOn.addEventListener(triggerSpec.trigger, eventListener);
        });
      }

      let windowIsScrolling = false; // used by initScrollHandler
      let scrollHandler = null;
      function initScrollHandler() {
        if (!scrollHandler) {
          scrollHandler = function() {
            windowIsScrolling = true;
          };
          window.addEventListener('scroll', scrollHandler);
          window.addEventListener('resize', scrollHandler);
          setInterval(function() {
            if (windowIsScrolling) {
              windowIsScrolling = false;
              forEach(getDocument().querySelectorAll("[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"), function(elt) {
                maybeReveal(elt);
              });
            }
          }, 200);
        }
      }

      /**
       * @param {Element} elt
       */
      function maybeReveal(elt) {
        if (!hasAttribute(elt, 'data-hx-revealed') && isScrolledIntoView(elt)) {
          elt.setAttribute('data-hx-revealed', 'true');
          const nodeData = getInternalData(elt);
          if (nodeData.initHash) {
            triggerEvent(elt, 'revealed');
          } else {
            // if the node isn't initialized, wait for it before triggering the request
            elt.addEventListener('htmx:afterProcessNode', function() { triggerEvent(elt, 'revealed'); }, { once: true });
          }
        }
      }

      //= ===================================================================

      /**
       * @param {Element} elt
       * @param {TriggerHandler} handler
       * @param {HtmxNodeInternalData} nodeData
       * @param {number} delay
       */
      function loadImmediately(elt, handler, nodeData, delay) {
        const load = function() {
          if (!nodeData.loaded) {
            nodeData.loaded = true;
            triggerEvent(elt, 'htmx:trigger');
            handler(elt);
          }
        };
        if (delay > 0) {
          getWindow().setTimeout(load, delay);
        } else {
          load();
        }
      }

      /**
       * @param {Element} elt
       * @param {HtmxNodeInternalData} nodeData
       * @param {HtmxTriggerSpecification[]} triggerSpecs
       * @returns {boolean}
       */
      function processVerbs(elt, nodeData, triggerSpecs) {
        let explicitAction = false;
        forEach(VERBS, function(verb) {
          if (hasAttribute(elt, 'hx-' + verb)) {
            const path = getAttributeValue(elt, 'hx-' + verb);
            explicitAction = true;
            nodeData.path = path;
            nodeData.verb = verb;
            triggerSpecs.forEach(function(triggerSpec) {
              addTriggerHandler(elt, triggerSpec, nodeData, function(node, evt) {
                const elt = asElement(node);
                if (closest(elt, htmx.config.disableSelector)) {
                  cleanUpElement(elt);
                  return
                }
                issueAjaxRequest(verb, path, elt, evt);
              });
            });
          }
        });
        return explicitAction
      }

      /**
       * @callback TriggerHandler
       * @param {Node} elt
       * @param {Event} [evt]
       */

      /**
       * @param {Node} elt
       * @param {HtmxTriggerSpecification} triggerSpec
       * @param {HtmxNodeInternalData} nodeData
       * @param {TriggerHandler} handler
       */
      function addTriggerHandler(elt, triggerSpec, nodeData, handler) {
        if (triggerSpec.trigger === 'revealed') {
          initScrollHandler();
          addEventListener(elt, handler, nodeData, triggerSpec);
          maybeReveal(asElement(elt));
        } else if (triggerSpec.trigger === 'intersect') {
          const observerOptions = {};
          if (triggerSpec.root) {
            observerOptions.root = querySelectorExt(elt, triggerSpec.root);
          }
          if (triggerSpec.threshold) {
            observerOptions.threshold = parseFloat(triggerSpec.threshold);
          }
          const observer = new IntersectionObserver(function(entries) {
            for (let i = 0; i < entries.length; i++) {
              const entry = entries[i];
              if (entry.isIntersecting) {
                triggerEvent(elt, 'intersect');
                break
              }
            }
          }, observerOptions);
          observer.observe(asElement(elt));
          addEventListener(asElement(elt), handler, nodeData, triggerSpec);
        } else if (!nodeData.firstInitCompleted && triggerSpec.trigger === 'load') {
          if (!maybeFilterEvent(triggerSpec, elt, makeEvent('load', { elt }))) {
            loadImmediately(asElement(elt), handler, nodeData, triggerSpec.delay);
          }
        } else if (triggerSpec.pollInterval > 0) {
          nodeData.polling = true;
          processPolling(asElement(elt), handler, triggerSpec);
        } else {
          addEventListener(elt, handler, nodeData, triggerSpec);
        }
      }

      /**
       * @param {Node} node
       * @returns {boolean}
       */
      function shouldProcessHxOn(node) {
        const elt = asElement(node);
        if (!elt) {
          return false
        }
        const attributes = elt.attributes;
        for (let j = 0; j < attributes.length; j++) {
          const attrName = attributes[j].name;
          if (startsWith(attrName, 'hx-on:') || startsWith(attrName, 'data-hx-on:') ||
            startsWith(attrName, 'hx-on-') || startsWith(attrName, 'data-hx-on-')) {
            return true
          }
        }
        return false
      }

      /**
       * @param {Node} elt
       * @returns {Element[]}
       */
      const HX_ON_QUERY = new XPathEvaluator()
        .createExpression('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or' +
          ' starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]');

      function processHXOnRoot(elt, elements) {
        if (shouldProcessHxOn(elt)) {
          elements.push(asElement(elt));
        }
        const iter = HX_ON_QUERY.evaluate(elt);
        let node = null;
        while (node = iter.iterateNext()) elements.push(asElement(node));
      }

      function findHxOnWildcardElements(elt) {
        /** @type {Element[]} */
        const elements = [];
        if (elt instanceof DocumentFragment) {
          for (const child of elt.childNodes) {
            processHXOnRoot(child, elements);
          }
        } else {
          processHXOnRoot(elt, elements);
        }
        return elements
      }

      /**
       * @param {Element} elt
       * @returns {NodeListOf<Element>|[]}
       */
      function findElementsToProcess(elt) {
        if (elt.querySelectorAll) {
          const boostedSelector = ', [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]';

          const extensionSelectors = [];
          for (const e in extensions) {
            const extension = extensions[e];
            if (extension.getSelectors) {
              var selectors = extension.getSelectors();
              if (selectors) {
                extensionSelectors.push(selectors);
              }
            }
          }

          const results = elt.querySelectorAll(VERB_SELECTOR + boostedSelector + ", form, [type='submit']," +
            ' [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]' + extensionSelectors.flat().map(s => ', ' + s).join(''));

          return results
        } else {
          return []
        }
      }

      /**
       * Handle submit buttons/inputs that have the form attribute set
       * see https://developer.mozilla.org/docs/Web/HTML/Element/button
       * @param {Event} evt
       */
      function maybeSetLastButtonClicked(evt) {
        const elt = /** @type {HTMLButtonElement|HTMLInputElement} */ (closest(asElement(evt.target), "button, input[type='submit']"));
        const internalData = getRelatedFormData(evt);
        if (internalData) {
          internalData.lastButtonClicked = elt;
        }
      }

      /**
       * @param {Event} evt
       */
      function maybeUnsetLastButtonClicked(evt) {
        const internalData = getRelatedFormData(evt);
        if (internalData) {
          internalData.lastButtonClicked = null;
        }
      }

      /**
       * @param {Event} evt
       * @returns {HtmxNodeInternalData|undefined}
       */
      function getRelatedFormData(evt) {
        const elt = closest(asElement(evt.target), "button, input[type='submit']");
        if (!elt) {
          return
        }
        const form = resolveTarget('#' + getRawAttribute(elt, 'form'), elt.getRootNode()) || closest(elt, 'form');
        if (!form) {
          return
        }
        return getInternalData(form)
      }

      /**
       * @param {EventTarget} elt
       */
      function initButtonTracking(elt) {
        // need to handle both click and focus in:
        //   focusin - in case someone tabs in to a button and hits the space bar
        //   click - on OSX buttons do not focus on click see https://bugs.webkit.org/show_bug.cgi?id=13724
        elt.addEventListener('click', maybeSetLastButtonClicked);
        elt.addEventListener('focusin', maybeSetLastButtonClicked);
        elt.addEventListener('focusout', maybeUnsetLastButtonClicked);
      }

      /**
       * @param {Element} elt
       * @param {string} eventName
       * @param {string} code
       */
      function addHxOnEventHandler(elt, eventName, code) {
        const nodeData = getInternalData(elt);
        if (!Array.isArray(nodeData.onHandlers)) {
          nodeData.onHandlers = [];
        }
        let func;
        /** @type EventListener */
        const listener = function(e) {
          maybeEval(elt, function() {
            if (eltIsDisabled(elt)) {
              return
            }
            if (!func) {
              func = new Function('event', code);
            }
            func.call(elt, e);
          });
        };
        elt.addEventListener(eventName, listener);
        nodeData.onHandlers.push({ event: eventName, listener });
      }

      /**
       * @param {Element} elt
       */
      function processHxOnWildcard(elt) {
        // wipe any previous on handlers so that this function takes precedence
        deInitOnHandlers(elt);

        for (let i = 0; i < elt.attributes.length; i++) {
          const name = elt.attributes[i].name;
          const value = elt.attributes[i].value;
          if (startsWith(name, 'hx-on') || startsWith(name, 'data-hx-on')) {
            const afterOnPosition = name.indexOf('-on') + 3;
            const nextChar = name.slice(afterOnPosition, afterOnPosition + 1);
            if (nextChar === '-' || nextChar === ':') {
              let eventName = name.slice(afterOnPosition + 1);
              // if the eventName starts with a colon or dash, prepend "htmx" for shorthand support
              if (startsWith(eventName, ':')) {
                eventName = 'htmx' + eventName;
              } else if (startsWith(eventName, '-')) {
                eventName = 'htmx:' + eventName.slice(1);
              } else if (startsWith(eventName, 'htmx-')) {
                eventName = 'htmx:' + eventName.slice(5);
              }

              addHxOnEventHandler(elt, eventName, value);
            }
          }
        }
      }

      /**
       * @param {Element|HTMLInputElement} elt
       */
      function initNode(elt) {
        if (closest(elt, htmx.config.disableSelector)) {
          cleanUpElement(elt);
          return
        }
        const nodeData = getInternalData(elt);
        const attrHash = attributeHash(elt);
        if (nodeData.initHash !== attrHash) {
          // clean up any previously processed info
          deInitNode(elt);

          nodeData.initHash = attrHash;

          triggerEvent(elt, 'htmx:beforeProcessNode');

          const triggerSpecs = getTriggerSpecs(elt);
          const hasExplicitHttpAction = processVerbs(elt, nodeData, triggerSpecs);

          if (!hasExplicitHttpAction) {
            if (getClosestAttributeValue(elt, 'hx-boost') === 'true') {
              boostElement(elt, nodeData, triggerSpecs);
            } else if (hasAttribute(elt, 'hx-trigger')) {
              triggerSpecs.forEach(function(triggerSpec) {
                // For "naked" triggers, don't do anything at all
                addTriggerHandler(elt, triggerSpec, nodeData, function() {
                });
              });
            }
          }

          // Handle submit buttons/inputs that have the form attribute set
          // see https://developer.mozilla.org/docs/Web/HTML/Element/button
          if (elt.tagName === 'FORM' || (getRawAttribute(elt, 'type') === 'submit' && hasAttribute(elt, 'form'))) {
            initButtonTracking(elt);
          }

          nodeData.firstInitCompleted = true;
          triggerEvent(elt, 'htmx:afterProcessNode');
        }
      }

      /**
       * Processes new content, enabling htmx behavior. This can be useful if you have content that is added to the DOM outside of the normal htmx request cycle but still want htmx attributes to work.
       *
       * @see https://htmx.org/api/#process
       *
       * @param {Element|string} elt element to process
       */
      function processNode(elt) {
        elt = resolveTarget(elt);
        if (closest(elt, htmx.config.disableSelector)) {
          cleanUpElement(elt);
          return
        }
        initNode(elt);
        forEach(findElementsToProcess(elt), function(child) { initNode(child); });
        forEach(findHxOnWildcardElements(elt), processHxOnWildcard);
      }

      //= ===================================================================
      // Event/Log Support
      //= ===================================================================

      /**
       * @param {string} str
       * @returns {string}
       */
      function kebabEventName(str) {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
      }

      /**
       * @param {string} eventName
       * @param {any} detail
       * @returns {CustomEvent}
       */
      function makeEvent(eventName, detail) {
        let evt;
        if (window.CustomEvent && typeof window.CustomEvent === 'function') {
          // TODO: `composed: true` here is a hack to make global event handlers work with events in shadow DOM
          // This breaks expected encapsulation but needs to be here until decided otherwise by core devs
          evt = new CustomEvent(eventName, { bubbles: true, cancelable: true, composed: true, detail });
        } else {
          evt = getDocument().createEvent('CustomEvent');
          evt.initCustomEvent(eventName, true, true, detail);
        }
        return evt
      }

      /**
       * @param {EventTarget|string} elt
       * @param {string} eventName
       * @param {any=} detail
       */
      function triggerErrorEvent(elt, eventName, detail) {
        triggerEvent(elt, eventName, mergeObjects({ error: eventName }, detail));
      }

      /**
       * @param {string} eventName
       * @returns {boolean}
       */
      function ignoreEventForLogging(eventName) {
        return eventName === 'htmx:afterProcessNode'
      }

      /**
       * `withExtensions` locates all active extensions for a provided element, then
       * executes the provided function using each of the active extensions.  It should
       * be called internally at every extendable execution point in htmx.
       *
       * @param {Element} elt
       * @param {(extension:HtmxExtension) => void} toDo
       * @returns void
       */
      function withExtensions(elt, toDo) {
        forEach(getExtensions(elt), function(extension) {
          try {
            toDo(extension);
          } catch (e) {
            logError(e);
          }
        });
      }

      function logError(msg) {
        if (console.error) {
          console.error(msg);
        } else if (console.log) {
          console.log('ERROR: ', msg);
        }
      }

      /**
       * Triggers a given event on an element
       *
       * @see https://htmx.org/api/#trigger
       *
       * @param {EventTarget|string} elt the element to trigger the event on
       * @param {string} eventName the name of the event to trigger
       * @param {any=} detail details for the event
       * @returns {boolean}
       */
      function triggerEvent(elt, eventName, detail) {
        elt = resolveTarget(elt);
        if (detail == null) {
          detail = {};
        }
        detail.elt = elt;
        const event = makeEvent(eventName, detail);
        if (htmx.logger && !ignoreEventForLogging(eventName)) {
          htmx.logger(elt, eventName, detail);
        }
        if (detail.error) {
          logError(detail.error);
          triggerEvent(elt, 'htmx:error', { errorInfo: detail });
        }
        let eventResult = elt.dispatchEvent(event);
        const kebabName = kebabEventName(eventName);
        if (eventResult && kebabName !== eventName) {
          const kebabedEvent = makeEvent(kebabName, event.detail);
          eventResult = eventResult && elt.dispatchEvent(kebabedEvent);
        }
        withExtensions(asElement(elt), function(extension) {
          eventResult = eventResult && (extension.onEvent(eventName, event) !== false && !event.defaultPrevented);
        });
        return eventResult
      }

      //= ===================================================================
      // History Support
      //= ===================================================================
      let currentPathForHistory = location.pathname + location.search;

      /**
       * @returns {Element}
       */
      function getHistoryElement() {
        const historyElt = getDocument().querySelector('[hx-history-elt],[data-hx-history-elt]');
        return historyElt || getDocument().body
      }

      /**
       * @param {string} url
       * @param {Element} rootElt
       */
      function saveToHistoryCache(url, rootElt) {
        if (!canAccessLocalStorage()) {
          return
        }

        // get state to save
        const innerHTML = cleanInnerHtmlForHistory(rootElt);
        const title = getDocument().title;
        const scroll = window.scrollY;

        if (htmx.config.historyCacheSize <= 0) {
          // make sure that an eventually already existing cache is purged
          localStorage.removeItem('htmx-history-cache');
          return
        }

        url = normalizePath(url);

        const historyCache = parseJSON(localStorage.getItem('htmx-history-cache')) || [];
        for (let i = 0; i < historyCache.length; i++) {
          if (historyCache[i].url === url) {
            historyCache.splice(i, 1);
            break
          }
        }

        /** @type HtmxHistoryItem */
        const newHistoryItem = { url, content: innerHTML, title, scroll };

        triggerEvent(getDocument().body, 'htmx:historyItemCreated', { item: newHistoryItem, cache: historyCache });

        historyCache.push(newHistoryItem);
        while (historyCache.length > htmx.config.historyCacheSize) {
          historyCache.shift();
        }

        // keep trying to save the cache until it succeeds or is empty
        while (historyCache.length > 0) {
          try {
            localStorage.setItem('htmx-history-cache', JSON.stringify(historyCache));
            break
          } catch (e) {
            triggerErrorEvent(getDocument().body, 'htmx:historyCacheError', { cause: e, cache: historyCache });
            historyCache.shift(); // shrink the cache and retry
          }
        }
      }

      /**
       * @typedef {Object} HtmxHistoryItem
       * @property {string} url
       * @property {string} content
       * @property {string} title
       * @property {number} scroll
       */

      /**
       * @param {string} url
       * @returns {HtmxHistoryItem|null}
       */
      function getCachedHistory(url) {
        if (!canAccessLocalStorage()) {
          return null
        }

        url = normalizePath(url);

        const historyCache = parseJSON(localStorage.getItem('htmx-history-cache')) || [];
        for (let i = 0; i < historyCache.length; i++) {
          if (historyCache[i].url === url) {
            return historyCache[i]
          }
        }
        return null
      }

      /**
       * @param {Element} elt
       * @returns {string}
       */
      function cleanInnerHtmlForHistory(elt) {
        const className = htmx.config.requestClass;
        const clone = /** @type Element */ (elt.cloneNode(true));
        forEach(findAll(clone, '.' + className), function(child) {
          removeClassFromElement(child, className);
        });
        // remove the disabled attribute for any element disabled due to an htmx request
        forEach(findAll(clone, '[data-disabled-by-htmx]'), function(child) {
          child.removeAttribute('disabled');
        });
        return clone.innerHTML
      }

      function saveCurrentPageToHistory() {
        const elt = getHistoryElement();
        const path = currentPathForHistory || location.pathname + location.search;

        // Allow history snapshot feature to be disabled where hx-history="false"
        // is present *anywhere* in the current document we're about to save,
        // so we can prevent privileged data entering the cache.
        // The page will still be reachable as a history entry, but htmx will fetch it
        // live from the server onpopstate rather than look in the localStorage cache
        let disableHistoryCache;
        try {
          disableHistoryCache = getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        } catch (e) {
        // IE11: insensitive modifier not supported so fallback to case sensitive selector
          disableHistoryCache = getDocument().querySelector('[hx-history="false"],[data-hx-history="false"]');
        }
        if (!disableHistoryCache) {
          triggerEvent(getDocument().body, 'htmx:beforeHistorySave', { path, historyElt: elt });
          saveToHistoryCache(path, elt);
        }

        if (htmx.config.historyEnabled) history.replaceState({ htmx: true }, getDocument().title, window.location.href);
      }

      /**
       * @param {string} path
       */
      function pushUrlIntoHistory(path) {
      // remove the cache buster parameter, if any
        if (htmx.config.getCacheBusterParam) {
          path = path.replace(/org\.htmx\.cache-buster=[^&]*&?/, '');
          if (endsWith(path, '&') || endsWith(path, '?')) {
            path = path.slice(0, -1);
          }
        }
        if (htmx.config.historyEnabled) {
          history.pushState({ htmx: true }, '', path);
        }
        currentPathForHistory = path;
      }

      /**
       * @param {string} path
       */
      function replaceUrlInHistory(path) {
        if (htmx.config.historyEnabled) history.replaceState({ htmx: true }, '', path);
        currentPathForHistory = path;
      }

      /**
       * @param {HtmxSettleTask[]} tasks
       */
      function settleImmediately(tasks) {
        forEach(tasks, function(task) {
          task.call(undefined);
        });
      }

      /**
       * @param {string} path
       */
      function loadHistoryFromServer(path) {
        const request = new XMLHttpRequest();
        const details = { path, xhr: request };
        triggerEvent(getDocument().body, 'htmx:historyCacheMiss', details);
        request.open('GET', path, true);
        request.setRequestHeader('HX-Request', 'true');
        request.setRequestHeader('HX-History-Restore-Request', 'true');
        request.setRequestHeader('HX-Current-URL', getDocument().location.href);
        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            triggerEvent(getDocument().body, 'htmx:historyCacheMissLoad', details);
            const fragment = makeFragment(this.response);
            /** @type ParentNode */
            const content = fragment.querySelector('[hx-history-elt],[data-hx-history-elt]') || fragment;
            const historyElement = getHistoryElement();
            const settleInfo = makeSettleInfo(historyElement);
            handleTitle(fragment.title);

            handlePreservedElements(fragment);
            swapInnerHTML(historyElement, content, settleInfo);
            restorePreservedElements();
            settleImmediately(settleInfo.tasks);
            currentPathForHistory = path;
            triggerEvent(getDocument().body, 'htmx:historyRestore', { path, cacheMiss: true, serverResponse: this.response });
          } else {
            triggerErrorEvent(getDocument().body, 'htmx:historyCacheMissLoadError', details);
          }
        };
        request.send();
      }

      /**
       * @param {string} [path]
       */
      function restoreHistory(path) {
        saveCurrentPageToHistory();
        path = path || location.pathname + location.search;
        const cached = getCachedHistory(path);
        if (cached) {
          const fragment = makeFragment(cached.content);
          const historyElement = getHistoryElement();
          const settleInfo = makeSettleInfo(historyElement);
          handleTitle(cached.title);
          handlePreservedElements(fragment);
          swapInnerHTML(historyElement, fragment, settleInfo);
          restorePreservedElements();
          settleImmediately(settleInfo.tasks);
          getWindow().setTimeout(function() {
            window.scrollTo(0, cached.scroll);
          }, 0); // next 'tick', so browser has time to render layout
          currentPathForHistory = path;
          triggerEvent(getDocument().body, 'htmx:historyRestore', { path, item: cached });
        } else {
          if (htmx.config.refreshOnHistoryMiss) {
            // @ts-ignore: optional parameter in reload() function throws error
            // noinspection JSUnresolvedReference
            window.location.reload(true);
          } else {
            loadHistoryFromServer(path);
          }
        }
      }

      /**
       * @param {Element} elt
       * @returns {Element[]}
       */
      function addRequestIndicatorClasses(elt) {
        let indicators = /** @type Element[] */ (findAttributeTargets(elt, 'hx-indicator'));
        if (indicators == null) {
          indicators = [elt];
        }
        forEach(indicators, function(ic) {
          const internalData = getInternalData(ic);
          internalData.requestCount = (internalData.requestCount || 0) + 1;
          ic.classList.add.call(ic.classList, htmx.config.requestClass);
        });
        return indicators
      }

      /**
       * @param {Element} elt
       * @returns {Element[]}
       */
      function disableElements(elt) {
        let disabledElts = /** @type Element[] */ (findAttributeTargets(elt, 'hx-disabled-elt'));
        if (disabledElts == null) {
          disabledElts = [];
        }
        forEach(disabledElts, function(disabledElement) {
          const internalData = getInternalData(disabledElement);
          internalData.requestCount = (internalData.requestCount || 0) + 1;
          disabledElement.setAttribute('disabled', '');
          disabledElement.setAttribute('data-disabled-by-htmx', '');
        });
        return disabledElts
      }

      /**
       * @param {Element[]} indicators
       * @param {Element[]} disabled
       */
      function removeRequestIndicators(indicators, disabled) {
        forEach(indicators.concat(disabled), function(ele) {
          const internalData = getInternalData(ele);
          internalData.requestCount = (internalData.requestCount || 1) - 1;
        });
        forEach(indicators, function(ic) {
          const internalData = getInternalData(ic);
          if (internalData.requestCount === 0) {
            ic.classList.remove.call(ic.classList, htmx.config.requestClass);
          }
        });
        forEach(disabled, function(disabledElement) {
          const internalData = getInternalData(disabledElement);
          if (internalData.requestCount === 0) {
            disabledElement.removeAttribute('disabled');
            disabledElement.removeAttribute('data-disabled-by-htmx');
          }
        });
      }

      //= ===================================================================
      // Input Value Processing
      //= ===================================================================

      /**
       * @param {Element[]} processed
       * @param {Element} elt
       * @returns {boolean}
       */
      function haveSeenNode(processed, elt) {
        for (let i = 0; i < processed.length; i++) {
          const node = processed[i];
          if (node.isSameNode(elt)) {
            return true
          }
        }
        return false
      }

      /**
       * @param {Element} element
       * @return {boolean}
       */
      function shouldInclude(element) {
        // Cast to trick tsc, undefined values will work fine here
        const elt = /** @type {HTMLInputElement} */ (element);
        if (elt.name === '' || elt.name == null || elt.disabled || closest(elt, 'fieldset[disabled]')) {
          return false
        }
        // ignore "submitter" types (see jQuery src/serialize.js)
        if (elt.type === 'button' || elt.type === 'submit' || elt.tagName === 'image' || elt.tagName === 'reset' || elt.tagName === 'file') {
          return false
        }
        if (elt.type === 'checkbox' || elt.type === 'radio') {
          return elt.checked
        }
        return true
      }

      /** @param {string} name
       * @param {string|Array|FormDataEntryValue} value
       * @param {FormData} formData */
      function addValueToFormData(name, value, formData) {
        if (name != null && value != null) {
          if (Array.isArray(value)) {
            value.forEach(function(v) { formData.append(name, v); });
          } else {
            formData.append(name, value);
          }
        }
      }

      /** @param {string} name
       * @param {string|Array} value
       * @param {FormData} formData */
      function removeValueFromFormData(name, value, formData) {
        if (name != null && value != null) {
          let values = formData.getAll(name);
          if (Array.isArray(value)) {
            values = values.filter(v => value.indexOf(v) < 0);
          } else {
            values = values.filter(v => v !== value);
          }
          formData.delete(name);
          forEach(values, v => formData.append(name, v));
        }
      }

      /**
       * @param {Element[]} processed
       * @param {FormData} formData
       * @param {HtmxElementValidationError[]} errors
       * @param {Element|HTMLInputElement|HTMLSelectElement|HTMLFormElement} elt
       * @param {boolean} validate
       */
      function processInputValue(processed, formData, errors, elt, validate) {
        if (elt == null || haveSeenNode(processed, elt)) {
          return
        } else {
          processed.push(elt);
        }
        if (shouldInclude(elt)) {
          const name = getRawAttribute(elt, 'name');
          // @ts-ignore value will be undefined for non-input elements, which is fine
          let value = elt.value;
          if (elt instanceof HTMLSelectElement && elt.multiple) {
            value = toArray(elt.querySelectorAll('option:checked')).map(function(e) { return (/** @type HTMLOptionElement */(e)).value });
          }
          // include file inputs
          if (elt instanceof HTMLInputElement && elt.files) {
            value = toArray(elt.files);
          }
          addValueToFormData(name, value, formData);
          if (validate) {
            validateElement(elt, errors);
          }
        }
        if (elt instanceof HTMLFormElement) {
          forEach(elt.elements, function(input) {
            if (processed.indexOf(input) >= 0) {
              // The input has already been processed and added to the values, but the FormData that will be
              //  constructed right after on the form, will include it once again. So remove that input's value
              //  now to avoid duplicates
              removeValueFromFormData(input.name, input.value, formData);
            } else {
              processed.push(input);
            }
            if (validate) {
              validateElement(input, errors);
            }
          });
          new FormData(elt).forEach(function(value, name) {
            if (value instanceof File && value.name === '') {
              return // ignore no-name files
            }
            addValueToFormData(name, value, formData);
          });
        }
      }

      /**
       *
       * @param {Element} elt
       * @param {HtmxElementValidationError[]} errors
       */
      function validateElement(elt, errors) {
        const element = /** @type {HTMLElement & ElementInternals} */ (elt);
        if (element.willValidate) {
          triggerEvent(element, 'htmx:validation:validate');
          if (!element.checkValidity()) {
            errors.push({ elt: element, message: element.validationMessage, validity: element.validity });
            triggerEvent(element, 'htmx:validation:failed', { message: element.validationMessage, validity: element.validity });
          }
        }
      }

      /**
       * Override values in the one FormData with those from another.
       * @param {FormData} receiver the formdata that will be mutated
       * @param {FormData} donor the formdata that will provide the overriding values
       * @returns {FormData} the {@linkcode receiver}
       */
      function overrideFormData(receiver, donor) {
        for (const key of donor.keys()) {
          receiver.delete(key);
        }
        donor.forEach(function(value, key) {
          receiver.append(key, value);
        });
        return receiver
      }

      /**
     * @param {Element|HTMLFormElement} elt
     * @param {HttpVerb} verb
     * @returns {{errors: HtmxElementValidationError[], formData: FormData, values: Object}}
     */
      function getInputValues(elt, verb) {
        /** @type Element[] */
        const processed = [];
        const formData = new FormData();
        const priorityFormData = new FormData();
        /** @type HtmxElementValidationError[] */
        const errors = [];
        const internalData = getInternalData(elt);
        if (internalData.lastButtonClicked && !bodyContains(internalData.lastButtonClicked)) {
          internalData.lastButtonClicked = null;
        }

        // only validate when form is directly submitted and novalidate or formnovalidate are not set
        // or if the element has an explicit hx-validate="true" on it
        let validate = (elt instanceof HTMLFormElement && elt.noValidate !== true) || getAttributeValue(elt, 'hx-validate') === 'true';
        if (internalData.lastButtonClicked) {
          validate = validate && internalData.lastButtonClicked.formNoValidate !== true;
        }

        // for a non-GET include the closest form
        if (verb !== 'get') {
          processInputValue(processed, priorityFormData, errors, closest(elt, 'form'), validate);
        }

        // include the element itself
        processInputValue(processed, formData, errors, elt, validate);

        // if a button or submit was clicked last, include its value
        if (internalData.lastButtonClicked || elt.tagName === 'BUTTON' ||
        (elt.tagName === 'INPUT' && getRawAttribute(elt, 'type') === 'submit')) {
          const button = internalData.lastButtonClicked || (/** @type HTMLInputElement|HTMLButtonElement */(elt));
          const name = getRawAttribute(button, 'name');
          addValueToFormData(name, button.value, priorityFormData);
        }

        // include any explicit includes
        const includes = findAttributeTargets(elt, 'hx-include');
        forEach(includes, function(node) {
          processInputValue(processed, formData, errors, asElement(node), validate);
          // if a non-form is included, include any input values within it
          if (!matches(node, 'form')) {
            forEach(asParentNode(node).querySelectorAll(INPUT_SELECTOR), function(descendant) {
              processInputValue(processed, formData, errors, descendant, validate);
            });
          }
        });

        // values from a <form> take precedence, overriding the regular values
        overrideFormData(formData, priorityFormData);

        return { errors, formData, values: formDataProxy(formData) }
      }

      /**
       * @param {string} returnStr
       * @param {string} name
       * @param {any} realValue
       * @returns {string}
       */
      function appendParam(returnStr, name, realValue) {
        if (returnStr !== '') {
          returnStr += '&';
        }
        if (String(realValue) === '[object Object]') {
          realValue = JSON.stringify(realValue);
        }
        const s = encodeURIComponent(realValue);
        returnStr += encodeURIComponent(name) + '=' + s;
        return returnStr
      }

      /**
       * @param {FormData|Object} values
       * @returns string
       */
      function urlEncode(values) {
        values = formDataFromObject(values);
        let returnStr = '';
        values.forEach(function(value, key) {
          returnStr = appendParam(returnStr, key, value);
        });
        return returnStr
      }

      //= ===================================================================
      // Ajax
      //= ===================================================================

      /**
     * @param {Element} elt
     * @param {Element} target
     * @param {string} prompt
     * @returns {HtmxHeaderSpecification}
     */
      function getHeaders(elt, target, prompt) {
        /** @type HtmxHeaderSpecification */
        const headers = {
          'HX-Request': 'true',
          'HX-Trigger': getRawAttribute(elt, 'id'),
          'HX-Trigger-Name': getRawAttribute(elt, 'name'),
          'HX-Target': getAttributeValue(target, 'id'),
          'HX-Current-URL': getDocument().location.href
        };
        getValuesForElement(elt, 'hx-headers', false, headers);
        if (prompt !== undefined) {
          headers['HX-Prompt'] = prompt;
        }
        if (getInternalData(elt).boosted) {
          headers['HX-Boosted'] = 'true';
        }
        return headers
      }

      /**
     * filterValues takes an object containing form input values
     * and returns a new object that only contains keys that are
     * specified by the closest "hx-params" attribute
     * @param {FormData} inputValues
     * @param {Element} elt
     * @returns {FormData}
     */
      function filterValues(inputValues, elt) {
        const paramsValue = getClosestAttributeValue(elt, 'hx-params');
        if (paramsValue) {
          if (paramsValue === 'none') {
            return new FormData()
          } else if (paramsValue === '*') {
            return inputValues
          } else if (paramsValue.indexOf('not ') === 0) {
            forEach(paramsValue.slice(4).split(','), function(name) {
              name = name.trim();
              inputValues.delete(name);
            });
            return inputValues
          } else {
            const newValues = new FormData();
            forEach(paramsValue.split(','), function(name) {
              name = name.trim();
              if (inputValues.has(name)) {
                inputValues.getAll(name).forEach(function(value) { newValues.append(name, value); });
              }
            });
            return newValues
          }
        } else {
          return inputValues
        }
      }

      /**
       * @param {Element} elt
       * @return {boolean}
       */
      function isAnchorLink(elt) {
        return !!getRawAttribute(elt, 'href') && getRawAttribute(elt, 'href').indexOf('#') >= 0
      }

      /**
     * @param {Element} elt
     * @param {HtmxSwapStyle} [swapInfoOverride]
     * @returns {HtmxSwapSpecification}
     */
      function getSwapSpecification(elt, swapInfoOverride) {
        const swapInfo = swapInfoOverride || getClosestAttributeValue(elt, 'hx-swap');
        /** @type HtmxSwapSpecification */
        const swapSpec = {
          swapStyle: getInternalData(elt).boosted ? 'innerHTML' : htmx.config.defaultSwapStyle,
          swapDelay: htmx.config.defaultSwapDelay,
          settleDelay: htmx.config.defaultSettleDelay
        };
        if (htmx.config.scrollIntoViewOnBoost && getInternalData(elt).boosted && !isAnchorLink(elt)) {
          swapSpec.show = 'top';
        }
        if (swapInfo) {
          const split = splitOnWhitespace(swapInfo);
          if (split.length > 0) {
            for (let i = 0; i < split.length; i++) {
              const value = split[i];
              if (value.indexOf('swap:') === 0) {
                swapSpec.swapDelay = parseInterval(value.slice(5));
              } else if (value.indexOf('settle:') === 0) {
                swapSpec.settleDelay = parseInterval(value.slice(7));
              } else if (value.indexOf('transition:') === 0) {
                swapSpec.transition = value.slice(11) === 'true';
              } else if (value.indexOf('ignoreTitle:') === 0) {
                swapSpec.ignoreTitle = value.slice(12) === 'true';
              } else if (value.indexOf('scroll:') === 0) {
                const scrollSpec = value.slice(7);
                var splitSpec = scrollSpec.split(':');
                const scrollVal = splitSpec.pop();
                var selectorVal = splitSpec.length > 0 ? splitSpec.join(':') : null;
                // @ts-ignore
                swapSpec.scroll = scrollVal;
                swapSpec.scrollTarget = selectorVal;
              } else if (value.indexOf('show:') === 0) {
                const showSpec = value.slice(5);
                var splitSpec = showSpec.split(':');
                const showVal = splitSpec.pop();
                var selectorVal = splitSpec.length > 0 ? splitSpec.join(':') : null;
                swapSpec.show = showVal;
                swapSpec.showTarget = selectorVal;
              } else if (value.indexOf('focus-scroll:') === 0) {
                const focusScrollVal = value.slice('focus-scroll:'.length);
                swapSpec.focusScroll = focusScrollVal == 'true';
              } else if (i == 0) {
                swapSpec.swapStyle = value;
              } else {
                logError('Unknown modifier in hx-swap: ' + value);
              }
            }
          }
        }
        return swapSpec
      }

      /**
       * @param {Element} elt
       * @return {boolean}
       */
      function usesFormData(elt) {
        return getClosestAttributeValue(elt, 'hx-encoding') === 'multipart/form-data' ||
        (matches(elt, 'form') && getRawAttribute(elt, 'enctype') === 'multipart/form-data')
      }

      /**
       * @param {XMLHttpRequest} xhr
       * @param {Element} elt
       * @param {FormData} filteredParameters
       * @returns {*|string|null}
       */
      function encodeParamsForBody(xhr, elt, filteredParameters) {
        let encodedParameters = null;
        withExtensions(elt, function(extension) {
          if (encodedParameters == null) {
            encodedParameters = extension.encodeParameters(xhr, filteredParameters, elt);
          }
        });
        if (encodedParameters != null) {
          return encodedParameters
        } else {
          if (usesFormData(elt)) {
            // Force conversion to an actual FormData object in case filteredParameters is a formDataProxy
            // See https://github.com/bigskysoftware/htmx/issues/2317
            return overrideFormData(new FormData(), formDataFromObject(filteredParameters))
          } else {
            return urlEncode(filteredParameters)
          }
        }
      }

      /**
     *
     * @param {Element} target
     * @returns {HtmxSettleInfo}
     */
      function makeSettleInfo(target) {
        return { tasks: [], elts: [target] }
      }

      /**
       * @param {Element[]} content
       * @param {HtmxSwapSpecification} swapSpec
       */
      function updateScrollState(content, swapSpec) {
        const first = content[0];
        const last = content[content.length - 1];
        if (swapSpec.scroll) {
          var target = null;
          if (swapSpec.scrollTarget) {
            target = asElement(querySelectorExt(first, swapSpec.scrollTarget));
          }
          if (swapSpec.scroll === 'top' && (first || target)) {
            target = target || first;
            target.scrollTop = 0;
          }
          if (swapSpec.scroll === 'bottom' && (last || target)) {
            target = target || last;
            target.scrollTop = target.scrollHeight;
          }
        }
        if (swapSpec.show) {
          var target = null;
          if (swapSpec.showTarget) {
            let targetStr = swapSpec.showTarget;
            if (swapSpec.showTarget === 'window') {
              targetStr = 'body';
            }
            target = asElement(querySelectorExt(first, targetStr));
          }
          if (swapSpec.show === 'top' && (first || target)) {
            target = target || first;
            // @ts-ignore For some reason tsc doesn't recognize "instant" as a valid option for now
            target.scrollIntoView({ block: 'start', behavior: htmx.config.scrollBehavior });
          }
          if (swapSpec.show === 'bottom' && (last || target)) {
            target = target || last;
            // @ts-ignore For some reason tsc doesn't recognize "instant" as a valid option for now
            target.scrollIntoView({ block: 'end', behavior: htmx.config.scrollBehavior });
          }
        }
      }

      /**
     * @param {Element} elt
     * @param {string} attr
     * @param {boolean=} evalAsDefault
     * @param {Object=} values
     * @returns {Object}
     */
      function getValuesForElement(elt, attr, evalAsDefault, values) {
        if (values == null) {
          values = {};
        }
        if (elt == null) {
          return values
        }
        const attributeValue = getAttributeValue(elt, attr);
        if (attributeValue) {
          let str = attributeValue.trim();
          let evaluateValue = evalAsDefault;
          if (str === 'unset') {
            return null
          }
          if (str.indexOf('javascript:') === 0) {
            str = str.slice(11);
            evaluateValue = true;
          } else if (str.indexOf('js:') === 0) {
            str = str.slice(3);
            evaluateValue = true;
          }
          if (str.indexOf('{') !== 0) {
            str = '{' + str + '}';
          }
          let varsValues;
          if (evaluateValue) {
            varsValues = maybeEval(elt, function() { return Function('return (' + str + ')')() }, {});
          } else {
            varsValues = parseJSON(str);
          }
          for (const key in varsValues) {
            if (varsValues.hasOwnProperty(key)) {
              if (values[key] == null) {
                values[key] = varsValues[key];
              }
            }
          }
        }
        return getValuesForElement(asElement(parentElt(elt)), attr, evalAsDefault, values)
      }

      /**
       * @param {EventTarget|string} elt
       * @param {() => any} toEval
       * @param {any=} defaultVal
       * @returns {any}
       */
      function maybeEval(elt, toEval, defaultVal) {
        if (htmx.config.allowEval) {
          return toEval()
        } else {
          triggerErrorEvent(elt, 'htmx:evalDisallowedError');
          return defaultVal
        }
      }

      /**
     * @param {Element} elt
     * @param {*?} expressionVars
     * @returns
     */
      function getHXVarsForElement(elt, expressionVars) {
        return getValuesForElement(elt, 'hx-vars', true, expressionVars)
      }

      /**
     * @param {Element} elt
     * @param {*?} expressionVars
     * @returns
     */
      function getHXValsForElement(elt, expressionVars) {
        return getValuesForElement(elt, 'hx-vals', false, expressionVars)
      }

      /**
     * @param {Element} elt
     * @returns {FormData}
     */
      function getExpressionVars(elt) {
        return mergeObjects(getHXVarsForElement(elt), getHXValsForElement(elt))
      }

      /**
       * @param {XMLHttpRequest} xhr
       * @param {string} header
       * @param {string|null} headerValue
       */
      function safelySetHeaderValue(xhr, header, headerValue) {
        if (headerValue !== null) {
          try {
            xhr.setRequestHeader(header, headerValue);
          } catch (e) {
          // On an exception, try to set the header URI encoded instead
            xhr.setRequestHeader(header, encodeURIComponent(headerValue));
            xhr.setRequestHeader(header + '-URI-AutoEncoded', 'true');
          }
        }
      }

      /**
       * @param {XMLHttpRequest} xhr
       * @return {string}
       */
      function getPathFromResponse(xhr) {
      // NB: IE11 does not support this stuff
        if (xhr.responseURL && typeof (URL) !== 'undefined') {
          try {
            const url = new URL(xhr.responseURL);
            return url.pathname + url.search
          } catch (e) {
            triggerErrorEvent(getDocument().body, 'htmx:badResponseUrl', { url: xhr.responseURL });
          }
        }
      }

      /**
       * @param {XMLHttpRequest} xhr
       * @param {RegExp} regexp
       * @return {boolean}
       */
      function hasHeader(xhr, regexp) {
        return regexp.test(xhr.getAllResponseHeaders())
      }

      /**
       * Issues an htmx-style AJAX request
       *
       * @see https://htmx.org/api/#ajax
       *
       * @param {HttpVerb} verb
       * @param {string} path the URL path to make the AJAX
       * @param {Element|string|HtmxAjaxHelperContext} context the element to target (defaults to the **body**) | a selector for the target | a context object that contains any of the following
       * @return {Promise<void>} Promise that resolves immediately if no request is sent, or when the request is complete
       */
      function ajaxHelper(verb, path, context) {
        verb = (/** @type HttpVerb */(verb.toLowerCase()));
        if (context) {
          if (context instanceof Element || typeof context === 'string') {
            return issueAjaxRequest(verb, path, null, null, {
              targetOverride: resolveTarget(context) || DUMMY_ELT,
              returnPromise: true
            })
          } else {
            let resolvedTarget = resolveTarget(context.target);
            // If target is supplied but can't resolve OR source is supplied but both target and source can't be resolved
            // then use DUMMY_ELT to abort the request with htmx:targetError to avoid it replacing body by mistake
            if ((context.target && !resolvedTarget) || (context.source && !resolvedTarget && !resolveTarget(context.source))) {
              resolvedTarget = DUMMY_ELT;
            }
            return issueAjaxRequest(verb, path, resolveTarget(context.source), context.event,
              {
                handler: context.handler,
                headers: context.headers,
                values: context.values,
                targetOverride: resolvedTarget,
                swapOverride: context.swap,
                select: context.select,
                returnPromise: true
              })
          }
        } else {
          return issueAjaxRequest(verb, path, null, null, {
            returnPromise: true
          })
        }
      }

      /**
       * @param {Element} elt
       * @return {Element[]}
       */
      function hierarchyForElt(elt) {
        const arr = [];
        while (elt) {
          arr.push(elt);
          elt = elt.parentElement;
        }
        return arr
      }

      /**
       * @param {Element} elt
       * @param {string} path
       * @param {HtmxRequestConfig} requestConfig
       * @return {boolean}
       */
      function verifyPath(elt, path, requestConfig) {
        let sameHost;
        let url;
        if (typeof URL === 'function') {
          url = new URL(path, document.location.href);
          const origin = document.location.origin;
          sameHost = origin === url.origin;
        } else {
        // IE11 doesn't support URL
          url = path;
          sameHost = startsWith(path, document.location.origin);
        }

        if (htmx.config.selfRequestsOnly) {
          if (!sameHost) {
            return false
          }
        }
        return triggerEvent(elt, 'htmx:validateUrl', mergeObjects({ url, sameHost }, requestConfig))
      }

      /**
       * @param {Object|FormData} obj
       * @return {FormData}
       */
      function formDataFromObject(obj) {
        if (obj instanceof FormData) return obj
        const formData = new FormData();
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key].forEach === 'function') {
              obj[key].forEach(function(v) { formData.append(key, v); });
            } else if (typeof obj[key] === 'object' && !(obj[key] instanceof Blob)) {
              formData.append(key, JSON.stringify(obj[key]));
            } else {
              formData.append(key, obj[key]);
            }
          }
        }
        return formData
      }

      /**
       * @param {FormData} formData
       * @param {string} name
       * @param {Array} array
       * @returns {Array}
       */
      function formDataArrayProxy(formData, name, array) {
        // mutating the array should mutate the underlying form data
        return new Proxy(array, {
          get: function(target, key) {
            if (typeof key === 'number') return target[key]
            if (key === 'length') return target.length
            if (key === 'push') {
              return function(value) {
                target.push(value);
                formData.append(name, value);
              }
            }
            if (typeof target[key] === 'function') {
              return function() {
                target[key].apply(target, arguments);
                formData.delete(name);
                target.forEach(function(v) { formData.append(name, v); });
              }
            }

            if (target[key] && target[key].length === 1) {
              return target[key][0]
            } else {
              return target[key]
            }
          },
          set: function(target, index, value) {
            target[index] = value;
            formData.delete(name);
            target.forEach(function(v) { formData.append(name, v); });
            return true
          }
        })
      }

      /**
       * @param {FormData} formData
       * @returns {Object}
       */
      function formDataProxy(formData) {
        return new Proxy(formData, {
          get: function(target, name) {
            if (typeof name === 'symbol') {
              // Forward symbol calls to the FormData itself directly
              const result = Reflect.get(target, name);
              // Wrap in function with apply to correctly bind the FormData context, as a direct call would result in an illegal invocation error
              if (typeof result === 'function') {
                return function() {
                  return result.apply(formData, arguments)
                }
              } else {
                return result
              }
            }
            if (name === 'toJSON') {
              // Support JSON.stringify call on proxy
              return () => Object.fromEntries(formData)
            }
            if (name in target) {
              // Wrap in function with apply to correctly bind the FormData context, as a direct call would result in an illegal invocation error
              if (typeof target[name] === 'function') {
                return function() {
                  return formData[name].apply(formData, arguments)
                }
              } else {
                return target[name]
              }
            }
            const array = formData.getAll(name);
            // Those 2 undefined & single value returns are for retro-compatibility as we weren't using FormData before
            if (array.length === 0) {
              return undefined
            } else if (array.length === 1) {
              return array[0]
            } else {
              return formDataArrayProxy(target, name, array)
            }
          },
          set: function(target, name, value) {
            if (typeof name !== 'string') {
              return false
            }
            target.delete(name);
            if (value && typeof value.forEach === 'function') {
              value.forEach(function(v) { target.append(name, v); });
            } else if (typeof value === 'object' && !(value instanceof Blob)) {
              target.append(name, JSON.stringify(value));
            } else {
              target.append(name, value);
            }
            return true
          },
          deleteProperty: function(target, name) {
            if (typeof name === 'string') {
              target.delete(name);
            }
            return true
          },
          // Support Object.assign call from proxy
          ownKeys: function(target) {
            return Reflect.ownKeys(Object.fromEntries(target))
          },
          getOwnPropertyDescriptor: function(target, prop) {
            return Reflect.getOwnPropertyDescriptor(Object.fromEntries(target), prop)
          }
        })
      }

      /**
       * @param {HttpVerb} verb
       * @param {string} path
       * @param {Element} elt
       * @param {Event} event
       * @param {HtmxAjaxEtc} [etc]
       * @param {boolean} [confirmed]
       * @return {Promise<void>}
       */
      function issueAjaxRequest(verb, path, elt, event, etc, confirmed) {
        let resolve = null;
        let reject = null;
        etc = etc != null ? etc : {};
        if (etc.returnPromise && typeof Promise !== 'undefined') {
          var promise = new Promise(function(_resolve, _reject) {
            resolve = _resolve;
            reject = _reject;
          });
        }
        if (elt == null) {
          elt = getDocument().body;
        }
        const responseHandler = etc.handler || handleAjaxResponse;
        const select = etc.select || null;

        if (!bodyContains(elt)) {
        // do not issue requests for elements removed from the DOM
          maybeCall(resolve);
          return promise
        }
        const target = etc.targetOverride || asElement(getTarget(elt));
        if (target == null || target == DUMMY_ELT) {
          triggerErrorEvent(elt, 'htmx:targetError', { target: getAttributeValue(elt, 'hx-target') });
          maybeCall(reject);
          return promise
        }

        let eltData = getInternalData(elt);
        const submitter = eltData.lastButtonClicked;

        if (submitter) {
          const buttonPath = getRawAttribute(submitter, 'formaction');
          if (buttonPath != null) {
            path = buttonPath;
          }

          const buttonVerb = getRawAttribute(submitter, 'formmethod');
          if (buttonVerb != null) {
          // ignore buttons with formmethod="dialog"
            if (buttonVerb.toLowerCase() !== 'dialog') {
              verb = (/** @type HttpVerb */(buttonVerb));
            }
          }
        }

        const confirmQuestion = getClosestAttributeValue(elt, 'hx-confirm');
        // allow event-based confirmation w/ a callback
        if (confirmed === undefined) {
          const issueRequest = function(skipConfirmation) {
            return issueAjaxRequest(verb, path, elt, event, etc, !!skipConfirmation)
          };
          const confirmDetails = { target, elt, path, verb, triggeringEvent: event, etc, issueRequest, question: confirmQuestion };
          if (triggerEvent(elt, 'htmx:confirm', confirmDetails) === false) {
            maybeCall(resolve);
            return promise
          }
        }

        let syncElt = elt;
        let syncStrategy = getClosestAttributeValue(elt, 'hx-sync');
        let queueStrategy = null;
        let abortable = false;
        if (syncStrategy) {
          const syncStrings = syncStrategy.split(':');
          const selector = syncStrings[0].trim();
          if (selector === 'this') {
            syncElt = findThisElement(elt, 'hx-sync');
          } else {
            syncElt = asElement(querySelectorExt(elt, selector));
          }
          // default to the drop strategy
          syncStrategy = (syncStrings[1] || 'drop').trim();
          eltData = getInternalData(syncElt);
          if (syncStrategy === 'drop' && eltData.xhr && eltData.abortable !== true) {
            maybeCall(resolve);
            return promise
          } else if (syncStrategy === 'abort') {
            if (eltData.xhr) {
              maybeCall(resolve);
              return promise
            } else {
              abortable = true;
            }
          } else if (syncStrategy === 'replace') {
            triggerEvent(syncElt, 'htmx:abort'); // abort the current request and continue
          } else if (syncStrategy.indexOf('queue') === 0) {
            const queueStrArray = syncStrategy.split(' ');
            queueStrategy = (queueStrArray[1] || 'last').trim();
          }
        }

        if (eltData.xhr) {
          if (eltData.abortable) {
            triggerEvent(syncElt, 'htmx:abort'); // abort the current request and continue
          } else {
            if (queueStrategy == null) {
              if (event) {
                const eventData = getInternalData(event);
                if (eventData && eventData.triggerSpec && eventData.triggerSpec.queue) {
                  queueStrategy = eventData.triggerSpec.queue;
                }
              }
              if (queueStrategy == null) {
                queueStrategy = 'last';
              }
            }
            if (eltData.queuedRequests == null) {
              eltData.queuedRequests = [];
            }
            if (queueStrategy === 'first' && eltData.queuedRequests.length === 0) {
              eltData.queuedRequests.push(function() {
                issueAjaxRequest(verb, path, elt, event, etc);
              });
            } else if (queueStrategy === 'all') {
              eltData.queuedRequests.push(function() {
                issueAjaxRequest(verb, path, elt, event, etc);
              });
            } else if (queueStrategy === 'last') {
              eltData.queuedRequests = []; // dump existing queue
              eltData.queuedRequests.push(function() {
                issueAjaxRequest(verb, path, elt, event, etc);
              });
            }
            maybeCall(resolve);
            return promise
          }
        }

        const xhr = new XMLHttpRequest();
        eltData.xhr = xhr;
        eltData.abortable = abortable;
        const endRequestLock = function() {
          eltData.xhr = null;
          eltData.abortable = false;
          if (eltData.queuedRequests != null &&
          eltData.queuedRequests.length > 0) {
            const queuedRequest = eltData.queuedRequests.shift();
            queuedRequest();
          }
        };
        const promptQuestion = getClosestAttributeValue(elt, 'hx-prompt');
        if (promptQuestion) {
          var promptResponse = prompt(promptQuestion);
          // prompt returns null if cancelled and empty string if accepted with no entry
          if (promptResponse === null ||
          !triggerEvent(elt, 'htmx:prompt', { prompt: promptResponse, target })) {
            maybeCall(resolve);
            endRequestLock();
            return promise
          }
        }

        if (confirmQuestion && !confirmed) {
          if (!confirm(confirmQuestion)) {
            maybeCall(resolve);
            endRequestLock();
            return promise
          }
        }

        let headers = getHeaders(elt, target, promptResponse);

        if (verb !== 'get' && !usesFormData(elt)) {
          headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (etc.headers) {
          headers = mergeObjects(headers, etc.headers);
        }
        const results = getInputValues(elt, verb);
        let errors = results.errors;
        const rawFormData = results.formData;
        if (etc.values) {
          overrideFormData(rawFormData, formDataFromObject(etc.values));
        }
        const expressionVars = formDataFromObject(getExpressionVars(elt));
        const allFormData = overrideFormData(rawFormData, expressionVars);
        let filteredFormData = filterValues(allFormData, elt);

        if (htmx.config.getCacheBusterParam && verb === 'get') {
          filteredFormData.set('org.htmx.cache-buster', getRawAttribute(target, 'id') || 'true');
        }

        // behavior of anchors w/ empty href is to use the current URL
        if (path == null || path === '') {
          path = getDocument().location.href;
        }

        /**
         * @type {Object}
         * @property {boolean} [credentials]
         * @property {number} [timeout]
         * @property {boolean} [noHeaders]
         */
        const requestAttrValues = getValuesForElement(elt, 'hx-request');

        const eltIsBoosted = getInternalData(elt).boosted;

        let useUrlParams = htmx.config.methodsThatUseUrlParams.indexOf(verb) >= 0;

        /** @type HtmxRequestConfig */
        const requestConfig = {
          boosted: eltIsBoosted,
          useUrlParams,
          formData: filteredFormData,
          parameters: formDataProxy(filteredFormData),
          unfilteredFormData: allFormData,
          unfilteredParameters: formDataProxy(allFormData),
          headers,
          target,
          verb,
          errors,
          withCredentials: etc.credentials || requestAttrValues.credentials || htmx.config.withCredentials,
          timeout: etc.timeout || requestAttrValues.timeout || htmx.config.timeout,
          path,
          triggeringEvent: event
        };

        if (!triggerEvent(elt, 'htmx:configRequest', requestConfig)) {
          maybeCall(resolve);
          endRequestLock();
          return promise
        }

        // copy out in case the object was overwritten
        path = requestConfig.path;
        verb = requestConfig.verb;
        headers = requestConfig.headers;
        filteredFormData = formDataFromObject(requestConfig.parameters);
        errors = requestConfig.errors;
        useUrlParams = requestConfig.useUrlParams;

        if (errors && errors.length > 0) {
          triggerEvent(elt, 'htmx:validation:halted', requestConfig);
          maybeCall(resolve);
          endRequestLock();
          return promise
        }

        const splitPath = path.split('#');
        const pathNoAnchor = splitPath[0];
        const anchor = splitPath[1];

        let finalPath = path;
        if (useUrlParams) {
          finalPath = pathNoAnchor;
          const hasValues = !filteredFormData.keys().next().done;
          if (hasValues) {
            if (finalPath.indexOf('?') < 0) {
              finalPath += '?';
            } else {
              finalPath += '&';
            }
            finalPath += urlEncode(filteredFormData);
            if (anchor) {
              finalPath += '#' + anchor;
            }
          }
        }

        if (!verifyPath(elt, finalPath, requestConfig)) {
          triggerErrorEvent(elt, 'htmx:invalidPath', requestConfig);
          maybeCall(reject);
          return promise
        }

        xhr.open(verb.toUpperCase(), finalPath, true);
        xhr.overrideMimeType('text/html');
        xhr.withCredentials = requestConfig.withCredentials;
        xhr.timeout = requestConfig.timeout;

        // request headers
        if (requestAttrValues.noHeaders) ; else {
          for (const header in headers) {
            if (headers.hasOwnProperty(header)) {
              const headerValue = headers[header];
              safelySetHeaderValue(xhr, header, headerValue);
            }
          }
        }

        /** @type {HtmxResponseInfo} */
        const responseInfo = {
          xhr,
          target,
          requestConfig,
          etc,
          boosted: eltIsBoosted,
          select,
          pathInfo: {
            requestPath: path,
            finalRequestPath: finalPath,
            responsePath: null,
            anchor
          }
        };

        xhr.onload = function() {
          try {
            const hierarchy = hierarchyForElt(elt);
            responseInfo.pathInfo.responsePath = getPathFromResponse(xhr);
            responseHandler(elt, responseInfo);
            if (responseInfo.keepIndicators !== true) {
              removeRequestIndicators(indicators, disableElts);
            }
            triggerEvent(elt, 'htmx:afterRequest', responseInfo);
            triggerEvent(elt, 'htmx:afterOnLoad', responseInfo);
            // if the body no longer contains the element, trigger the event on the closest parent
            // remaining in the DOM
            if (!bodyContains(elt)) {
              let secondaryTriggerElt = null;
              while (hierarchy.length > 0 && secondaryTriggerElt == null) {
                const parentEltInHierarchy = hierarchy.shift();
                if (bodyContains(parentEltInHierarchy)) {
                  secondaryTriggerElt = parentEltInHierarchy;
                }
              }
              if (secondaryTriggerElt) {
                triggerEvent(secondaryTriggerElt, 'htmx:afterRequest', responseInfo);
                triggerEvent(secondaryTriggerElt, 'htmx:afterOnLoad', responseInfo);
              }
            }
            maybeCall(resolve);
            endRequestLock();
          } catch (e) {
            triggerErrorEvent(elt, 'htmx:onLoadError', mergeObjects({ error: e }, responseInfo));
            throw e
          }
        };
        xhr.onerror = function() {
          removeRequestIndicators(indicators, disableElts);
          triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo);
          triggerErrorEvent(elt, 'htmx:sendError', responseInfo);
          maybeCall(reject);
          endRequestLock();
        };
        xhr.onabort = function() {
          removeRequestIndicators(indicators, disableElts);
          triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo);
          triggerErrorEvent(elt, 'htmx:sendAbort', responseInfo);
          maybeCall(reject);
          endRequestLock();
        };
        xhr.ontimeout = function() {
          removeRequestIndicators(indicators, disableElts);
          triggerErrorEvent(elt, 'htmx:afterRequest', responseInfo);
          triggerErrorEvent(elt, 'htmx:timeout', responseInfo);
          maybeCall(reject);
          endRequestLock();
        };
        if (!triggerEvent(elt, 'htmx:beforeRequest', responseInfo)) {
          maybeCall(resolve);
          endRequestLock();
          return promise
        }
        var indicators = addRequestIndicatorClasses(elt);
        var disableElts = disableElements(elt);

        forEach(['loadstart', 'loadend', 'progress', 'abort'], function(eventName) {
          forEach([xhr, xhr.upload], function(target) {
            target.addEventListener(eventName, function(event) {
              triggerEvent(elt, 'htmx:xhr:' + eventName, {
                lengthComputable: event.lengthComputable,
                loaded: event.loaded,
                total: event.total
              });
            });
          });
        });
        triggerEvent(elt, 'htmx:beforeSend', responseInfo);
        const params = useUrlParams ? null : encodeParamsForBody(xhr, elt, filteredFormData);
        xhr.send(params);
        return promise
      }

      /**
       * @typedef {Object} HtmxHistoryUpdate
       * @property {string|null} [type]
       * @property {string|null} [path]
       */

      /**
       * @param {Element} elt
       * @param {HtmxResponseInfo} responseInfo
       * @return {HtmxHistoryUpdate}
       */
      function determineHistoryUpdates(elt, responseInfo) {
        const xhr = responseInfo.xhr;

        //= ==========================================
        // First consult response headers
        //= ==========================================
        let pathFromHeaders = null;
        let typeFromHeaders = null;
        if (hasHeader(xhr, /HX-Push:/i)) {
          pathFromHeaders = xhr.getResponseHeader('HX-Push');
          typeFromHeaders = 'push';
        } else if (hasHeader(xhr, /HX-Push-Url:/i)) {
          pathFromHeaders = xhr.getResponseHeader('HX-Push-Url');
          typeFromHeaders = 'push';
        } else if (hasHeader(xhr, /HX-Replace-Url:/i)) {
          pathFromHeaders = xhr.getResponseHeader('HX-Replace-Url');
          typeFromHeaders = 'replace';
        }

        // if there was a response header, that has priority
        if (pathFromHeaders) {
          if (pathFromHeaders === 'false') {
            return {}
          } else {
            return {
              type: typeFromHeaders,
              path: pathFromHeaders
            }
          }
        }

        //= ==========================================
        // Next resolve via DOM values
        //= ==========================================
        const requestPath = responseInfo.pathInfo.finalRequestPath;
        const responsePath = responseInfo.pathInfo.responsePath;

        const pushUrl = getClosestAttributeValue(elt, 'hx-push-url');
        const replaceUrl = getClosestAttributeValue(elt, 'hx-replace-url');
        const elementIsBoosted = getInternalData(elt).boosted;

        let saveType = null;
        let path = null;

        if (pushUrl) {
          saveType = 'push';
          path = pushUrl;
        } else if (replaceUrl) {
          saveType = 'replace';
          path = replaceUrl;
        } else if (elementIsBoosted) {
          saveType = 'push';
          path = responsePath || requestPath; // if there is no response path, go with the original request path
        }

        if (path) {
        // false indicates no push, return empty object
          if (path === 'false') {
            return {}
          }

          // true indicates we want to follow wherever the server ended up sending us
          if (path === 'true') {
            path = responsePath || requestPath; // if there is no response path, go with the original request path
          }

          // restore any anchor associated with the request
          if (responseInfo.pathInfo.anchor && path.indexOf('#') === -1) {
            path = path + '#' + responseInfo.pathInfo.anchor;
          }

          return {
            type: saveType,
            path
          }
        } else {
          return {}
        }
      }

      /**
       * @param {HtmxResponseHandlingConfig} responseHandlingConfig
       * @param {number} status
       * @return {boolean}
       */
      function codeMatches(responseHandlingConfig, status) {
        var regExp = new RegExp(responseHandlingConfig.code);
        return regExp.test(status.toString(10))
      }

      /**
       * @param {XMLHttpRequest} xhr
       * @return {HtmxResponseHandlingConfig}
       */
      function resolveResponseHandling(xhr) {
        for (var i = 0; i < htmx.config.responseHandling.length; i++) {
          /** @type HtmxResponseHandlingConfig */
          var responseHandlingElement = htmx.config.responseHandling[i];
          if (codeMatches(responseHandlingElement, xhr.status)) {
            return responseHandlingElement
          }
        }
        // no matches, return no swap
        return {
          swap: false
        }
      }

      /**
       * @param {string} title
       */
      function handleTitle(title) {
        if (title) {
          const titleElt = find('title');
          if (titleElt) {
            titleElt.innerHTML = title;
          } else {
            window.document.title = title;
          }
        }
      }

      /**
       * @param {Element} elt
       * @param {HtmxResponseInfo} responseInfo
       */
      function handleAjaxResponse(elt, responseInfo) {
        const xhr = responseInfo.xhr;
        let target = responseInfo.target;
        const etc = responseInfo.etc;
        const responseInfoSelect = responseInfo.select;

        if (!triggerEvent(elt, 'htmx:beforeOnLoad', responseInfo)) return

        if (hasHeader(xhr, /HX-Trigger:/i)) {
          handleTriggerHeader(xhr, 'HX-Trigger', elt);
        }

        if (hasHeader(xhr, /HX-Location:/i)) {
          saveCurrentPageToHistory();
          let redirectPath = xhr.getResponseHeader('HX-Location');
          /** @type {HtmxAjaxHelperContext&{path:string}} */
          var redirectSwapSpec;
          if (redirectPath.indexOf('{') === 0) {
            redirectSwapSpec = parseJSON(redirectPath);
            // what's the best way to throw an error if the user didn't include this
            redirectPath = redirectSwapSpec.path;
            delete redirectSwapSpec.path;
          }
          ajaxHelper('get', redirectPath, redirectSwapSpec).then(function() {
            pushUrlIntoHistory(redirectPath);
          });
          return
        }

        const shouldRefresh = hasHeader(xhr, /HX-Refresh:/i) && xhr.getResponseHeader('HX-Refresh') === 'true';

        if (hasHeader(xhr, /HX-Redirect:/i)) {
          responseInfo.keepIndicators = true;
          location.href = xhr.getResponseHeader('HX-Redirect');
          shouldRefresh && location.reload();
          return
        }

        if (shouldRefresh) {
          responseInfo.keepIndicators = true;
          location.reload();
          return
        }

        if (hasHeader(xhr, /HX-Retarget:/i)) {
          if (xhr.getResponseHeader('HX-Retarget') === 'this') {
            responseInfo.target = elt;
          } else {
            responseInfo.target = asElement(querySelectorExt(elt, xhr.getResponseHeader('HX-Retarget')));
          }
        }

        const historyUpdate = determineHistoryUpdates(elt, responseInfo);

        const responseHandling = resolveResponseHandling(xhr);
        const shouldSwap = responseHandling.swap;
        let isError = !!responseHandling.error;
        let ignoreTitle = htmx.config.ignoreTitle || responseHandling.ignoreTitle;
        let selectOverride = responseHandling.select;
        if (responseHandling.target) {
          responseInfo.target = asElement(querySelectorExt(elt, responseHandling.target));
        }
        var swapOverride = etc.swapOverride;
        if (swapOverride == null && responseHandling.swapOverride) {
          swapOverride = responseHandling.swapOverride;
        }

        // response headers override response handling config
        if (hasHeader(xhr, /HX-Retarget:/i)) {
          if (xhr.getResponseHeader('HX-Retarget') === 'this') {
            responseInfo.target = elt;
          } else {
            responseInfo.target = asElement(querySelectorExt(elt, xhr.getResponseHeader('HX-Retarget')));
          }
        }
        if (hasHeader(xhr, /HX-Reswap:/i)) {
          swapOverride = xhr.getResponseHeader('HX-Reswap');
        }

        var serverResponse = xhr.response;
        /** @type HtmxBeforeSwapDetails */
        var beforeSwapDetails = mergeObjects({
          shouldSwap,
          serverResponse,
          isError,
          ignoreTitle,
          selectOverride,
          swapOverride
        }, responseInfo);

        if (responseHandling.event && !triggerEvent(target, responseHandling.event, beforeSwapDetails)) return

        if (!triggerEvent(target, 'htmx:beforeSwap', beforeSwapDetails)) return

        target = beforeSwapDetails.target; // allow re-targeting
        serverResponse = beforeSwapDetails.serverResponse; // allow updating content
        isError = beforeSwapDetails.isError; // allow updating error
        ignoreTitle = beforeSwapDetails.ignoreTitle; // allow updating ignoring title
        selectOverride = beforeSwapDetails.selectOverride; // allow updating select override
        swapOverride = beforeSwapDetails.swapOverride; // allow updating swap override

        responseInfo.target = target; // Make updated target available to response events
        responseInfo.failed = isError; // Make failed property available to response events
        responseInfo.successful = !isError; // Make successful property available to response events

        if (beforeSwapDetails.shouldSwap) {
          if (xhr.status === 286) {
            cancelPolling(elt);
          }

          withExtensions(elt, function(extension) {
            serverResponse = extension.transformResponse(serverResponse, xhr, elt);
          });

          // Save current page if there will be a history update
          if (historyUpdate.type) {
            saveCurrentPageToHistory();
          }

          var swapSpec = getSwapSpecification(elt, swapOverride);

          if (!swapSpec.hasOwnProperty('ignoreTitle')) {
            swapSpec.ignoreTitle = ignoreTitle;
          }

          target.classList.add(htmx.config.swappingClass);

          // optional transition API promise callbacks
          let settleResolve = null;
          let settleReject = null;

          if (responseInfoSelect) {
            selectOverride = responseInfoSelect;
          }

          if (hasHeader(xhr, /HX-Reselect:/i)) {
            selectOverride = xhr.getResponseHeader('HX-Reselect');
          }

          const selectOOB = getClosestAttributeValue(elt, 'hx-select-oob');
          const select = getClosestAttributeValue(elt, 'hx-select');

          let doSwap = function() {
            try {
              // if we need to save history, do so, before swapping so that relative resources have the correct base URL
              if (historyUpdate.type) {
                triggerEvent(getDocument().body, 'htmx:beforeHistoryUpdate', mergeObjects({ history: historyUpdate }, responseInfo));
                if (historyUpdate.type === 'push') {
                  pushUrlIntoHistory(historyUpdate.path);
                  triggerEvent(getDocument().body, 'htmx:pushedIntoHistory', { path: historyUpdate.path });
                } else {
                  replaceUrlInHistory(historyUpdate.path);
                  triggerEvent(getDocument().body, 'htmx:replacedInHistory', { path: historyUpdate.path });
                }
              }

              swap(target, serverResponse, swapSpec, {
                select: selectOverride || select,
                selectOOB,
                eventInfo: responseInfo,
                anchor: responseInfo.pathInfo.anchor,
                contextElement: elt,
                afterSwapCallback: function() {
                  if (hasHeader(xhr, /HX-Trigger-After-Swap:/i)) {
                    let finalElt = elt;
                    if (!bodyContains(elt)) {
                      finalElt = getDocument().body;
                    }
                    handleTriggerHeader(xhr, 'HX-Trigger-After-Swap', finalElt);
                  }
                },
                afterSettleCallback: function() {
                  if (hasHeader(xhr, /HX-Trigger-After-Settle:/i)) {
                    let finalElt = elt;
                    if (!bodyContains(elt)) {
                      finalElt = getDocument().body;
                    }
                    handleTriggerHeader(xhr, 'HX-Trigger-After-Settle', finalElt);
                  }
                  maybeCall(settleResolve);
                }
              });
            } catch (e) {
              triggerErrorEvent(elt, 'htmx:swapError', responseInfo);
              maybeCall(settleReject);
              throw e
            }
          };

          let shouldTransition = htmx.config.globalViewTransitions;
          if (swapSpec.hasOwnProperty('transition')) {
            shouldTransition = swapSpec.transition;
          }

          if (shouldTransition &&
                  triggerEvent(elt, 'htmx:beforeTransition', responseInfo) &&
                  typeof Promise !== 'undefined' &&
                  // @ts-ignore experimental feature atm
                  document.startViewTransition) {
            const settlePromise = new Promise(function(_resolve, _reject) {
              settleResolve = _resolve;
              settleReject = _reject;
            });
            // wrap the original doSwap() in a call to startViewTransition()
            const innerDoSwap = doSwap;
            doSwap = function() {
              // @ts-ignore experimental feature atm
              document.startViewTransition(function() {
                innerDoSwap();
                return settlePromise
              });
            };
          }

          if (swapSpec.swapDelay > 0) {
            getWindow().setTimeout(doSwap, swapSpec.swapDelay);
          } else {
            doSwap();
          }
        }
        if (isError) {
          triggerErrorEvent(elt, 'htmx:responseError', mergeObjects({ error: 'Response Status Error Code ' + xhr.status + ' from ' + responseInfo.pathInfo.requestPath }, responseInfo));
        }
      }

      //= ===================================================================
      // Extensions API
      //= ===================================================================

      /** @type {Object<string, HtmxExtension>} */
      const extensions = {};

      /**
       * extensionBase defines the default functions for all extensions.
       * @returns {HtmxExtension}
       */
      function extensionBase() {
        return {
          init: function(api) { return null },
          getSelectors: function() { return null },
          onEvent: function(name, evt) { return true },
          transformResponse: function(text, xhr, elt) { return text },
          isInlineSwap: function(swapStyle) { return false },
          handleSwap: function(swapStyle, target, fragment, settleInfo) { return false },
          encodeParameters: function(xhr, parameters, elt) { return null }
        }
      }

      /**
       * defineExtension initializes the extension and adds it to the htmx registry
       *
       * @see https://htmx.org/api/#defineExtension
       *
       * @param {string} name the extension name
       * @param {Partial<HtmxExtension>} extension the extension definition
       */
      function defineExtension(name, extension) {
        if (extension.init) {
          extension.init(internalAPI);
        }
        extensions[name] = mergeObjects(extensionBase(), extension);
      }

      /**
       * removeExtension removes an extension from the htmx registry
       *
       * @see https://htmx.org/api/#removeExtension
       *
       * @param {string} name
       */
      function removeExtension(name) {
        delete extensions[name];
      }

      /**
       * getExtensions searches up the DOM tree to return all extensions that can be applied to a given element
       *
       * @param {Element} elt
       * @param {HtmxExtension[]=} extensionsToReturn
       * @param {string[]=} extensionsToIgnore
       * @returns {HtmxExtension[]}
       */
      function getExtensions(elt, extensionsToReturn, extensionsToIgnore) {
        if (extensionsToReturn == undefined) {
          extensionsToReturn = [];
        }
        if (elt == undefined) {
          return extensionsToReturn
        }
        if (extensionsToIgnore == undefined) {
          extensionsToIgnore = [];
        }
        const extensionsForElement = getAttributeValue(elt, 'hx-ext');
        if (extensionsForElement) {
          forEach(extensionsForElement.split(','), function(extensionName) {
            extensionName = extensionName.replace(/ /g, '');
            if (extensionName.slice(0, 7) == 'ignore:') {
              extensionsToIgnore.push(extensionName.slice(7));
              return
            }
            if (extensionsToIgnore.indexOf(extensionName) < 0) {
              const extension = extensions[extensionName];
              if (extension && extensionsToReturn.indexOf(extension) < 0) {
                extensionsToReturn.push(extension);
              }
            }
          });
        }
        return getExtensions(asElement(parentElt(elt)), extensionsToReturn, extensionsToIgnore)
      }

      //= ===================================================================
      // Initialization
      //= ===================================================================
      var isReady = false;
      getDocument().addEventListener('DOMContentLoaded', function() {
        isReady = true;
      });

      /**
       * Execute a function now if DOMContentLoaded has fired, otherwise listen for it.
       *
       * This function uses isReady because there is no reliable way to ask the browser whether
       * the DOMContentLoaded event has already been fired; there's a gap between DOMContentLoaded
       * firing and readystate=complete.
       */
      function ready(fn) {
        // Checking readyState here is a failsafe in case the htmx script tag entered the DOM by
        // some means other than the initial page load.
        if (isReady || getDocument().readyState === 'complete') {
          fn();
        } else {
          getDocument().addEventListener('DOMContentLoaded', fn);
        }
      }

      function insertIndicatorStyles() {
        if (htmx.config.includeIndicatorStyles !== false) {
          const nonceAttribute = htmx.config.inlineStyleNonce ? ` nonce="${htmx.config.inlineStyleNonce}"` : '';
          getDocument().head.insertAdjacentHTML('beforeend',
            '<style' + nonceAttribute + '>\
      .' + htmx.config.indicatorClass + '{opacity:0}\
      .' + htmx.config.requestClass + ' .' + htmx.config.indicatorClass + '{opacity:1; transition: opacity 200ms ease-in;}\
      .' + htmx.config.requestClass + '.' + htmx.config.indicatorClass + '{opacity:1; transition: opacity 200ms ease-in;}\
      </style>');
        }
      }

      function getMetaConfig() {
        /** @type HTMLMetaElement */
        const element = getDocument().querySelector('meta[name="htmx-config"]');
        if (element) {
          return parseJSON(element.content)
        } else {
          return null
        }
      }

      function mergeMetaConfig() {
        const metaConfig = getMetaConfig();
        if (metaConfig) {
          htmx.config = mergeObjects(htmx.config, metaConfig);
        }
      }

      // initialize the document
      ready(function() {
        mergeMetaConfig();
        insertIndicatorStyles();
        let body = getDocument().body;
        processNode(body);
        const restoredElts = getDocument().querySelectorAll(
          "[hx-trigger='restored'],[data-hx-trigger='restored']"
        );
        body.addEventListener('htmx:abort', function(evt) {
          const target = evt.target;
          const internalData = getInternalData(target);
          if (internalData && internalData.xhr) {
            internalData.xhr.abort();
          }
        });
        /** @type {(ev: PopStateEvent) => any} */
        const originalPopstate = window.onpopstate ? window.onpopstate.bind(window) : null;
        /** @type {(ev: PopStateEvent) => any} */
        window.onpopstate = function(event) {
          if (event.state && event.state.htmx) {
            restoreHistory();
            forEach(restoredElts, function(elt) {
              triggerEvent(elt, 'htmx:restored', {
                document: getDocument(),
                triggerEvent
              });
            });
          } else {
            if (originalPopstate) {
              originalPopstate(event);
            }
          }
        };
        getWindow().setTimeout(function() {
          triggerEvent(body, 'htmx:load', {}); // give ready handlers a chance to load up before firing this event
          body = null; // kill reference for gc
        }, 0);
      });

      return htmx
    })();

    /** @typedef {'get'|'head'|'post'|'put'|'delete'|'connect'|'options'|'trace'|'patch'} HttpVerb */

    /**
     * @typedef {Object} SwapOptions
     * @property {string} [select]
     * @property {string} [selectOOB]
     * @property {*} [eventInfo]
     * @property {string} [anchor]
     * @property {Element} [contextElement]
     * @property {swapCallback} [afterSwapCallback]
     * @property {swapCallback} [afterSettleCallback]
     */

    /**
     * @callback swapCallback
     */

    /**
     * @typedef {'innerHTML' | 'outerHTML' | 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend' | 'delete' | 'none' | string} HtmxSwapStyle
     */

    /**
     * @typedef HtmxSwapSpecification
     * @property {HtmxSwapStyle} swapStyle
     * @property {number} swapDelay
     * @property {number} settleDelay
     * @property {boolean} [transition]
     * @property {boolean} [ignoreTitle]
     * @property {string} [head]
     * @property {'top' | 'bottom'} [scroll]
     * @property {string} [scrollTarget]
     * @property {string} [show]
     * @property {string} [showTarget]
     * @property {boolean} [focusScroll]
     */

    /**
     * @typedef {((this:Node, evt:Event) => boolean) & {source: string}} ConditionalFunction
     */

    /**
     * @typedef {Object} HtmxTriggerSpecification
     * @property {string} trigger
     * @property {number} [pollInterval]
     * @property {ConditionalFunction} [eventFilter]
     * @property {boolean} [changed]
     * @property {boolean} [once]
     * @property {boolean} [consume]
     * @property {number} [delay]
     * @property {string} [from]
     * @property {string} [target]
     * @property {number} [throttle]
     * @property {string} [queue]
     * @property {string} [root]
     * @property {string} [threshold]
     */

    /**
     * @typedef {{elt: Element, message: string, validity: ValidityState}} HtmxElementValidationError
     */

    /**
     * @typedef {Record<string, string>} HtmxHeaderSpecification
     * @property {'true'} HX-Request
     * @property {string|null} HX-Trigger
     * @property {string|null} HX-Trigger-Name
     * @property {string|null} HX-Target
     * @property {string} HX-Current-URL
     * @property {string} [HX-Prompt]
     * @property {'true'} [HX-Boosted]
     * @property {string} [Content-Type]
     * @property {'true'} [HX-History-Restore-Request]
     */

    /** @typedef HtmxAjaxHelperContext
     * @property {Element|string} [source]
     * @property {Event} [event]
     * @property {HtmxAjaxHandler} [handler]
     * @property {Element|string} [target]
     * @property {HtmxSwapStyle} [swap]
     * @property {Object|FormData} [values]
     * @property {Record<string,string>} [headers]
     * @property {string} [select]
     */

    /**
     * @typedef {Object} HtmxRequestConfig
     * @property {boolean} boosted
     * @property {boolean} useUrlParams
     * @property {FormData} formData
     * @property {Object} parameters formData proxy
     * @property {FormData} unfilteredFormData
     * @property {Object} unfilteredParameters unfilteredFormData proxy
     * @property {HtmxHeaderSpecification} headers
     * @property {Element} target
     * @property {HttpVerb} verb
     * @property {HtmxElementValidationError[]} errors
     * @property {boolean} withCredentials
     * @property {number} timeout
     * @property {string} path
     * @property {Event} triggeringEvent
     */

    /**
     * @typedef {Object} HtmxResponseInfo
     * @property {XMLHttpRequest} xhr
     * @property {Element} target
     * @property {HtmxRequestConfig} requestConfig
     * @property {HtmxAjaxEtc} etc
     * @property {boolean} boosted
     * @property {string} select
     * @property {{requestPath: string, finalRequestPath: string, responsePath: string|null, anchor: string}} pathInfo
     * @property {boolean} [failed]
     * @property {boolean} [successful]
     * @property {boolean} [keepIndicators]
     */

    /**
     * @typedef {Object} HtmxAjaxEtc
     * @property {boolean} [returnPromise]
     * @property {HtmxAjaxHandler} [handler]
     * @property {string} [select]
     * @property {Element} [targetOverride]
     * @property {HtmxSwapStyle} [swapOverride]
     * @property {Record<string,string>} [headers]
     * @property {Object|FormData} [values]
     * @property {boolean} [credentials]
     * @property {number} [timeout]
     */

    /**
     * @typedef {Object} HtmxResponseHandlingConfig
     * @property {string} [code]
     * @property {boolean} swap
     * @property {boolean} [error]
     * @property {boolean} [ignoreTitle]
     * @property {string} [select]
     * @property {string} [target]
     * @property {string} [swapOverride]
     * @property {string} [event]
     */

    /**
     * @typedef {HtmxResponseInfo & {shouldSwap: boolean, serverResponse: any, isError: boolean, ignoreTitle: boolean, selectOverride:string, swapOverride:string}} HtmxBeforeSwapDetails
     */

    /**
     * @callback HtmxAjaxHandler
     * @param {Element} elt
     * @param {HtmxResponseInfo} responseInfo
     */

    /**
     * @typedef {(() => void)} HtmxSettleTask
     */

    /**
     * @typedef {Object} HtmxSettleInfo
     * @property {HtmxSettleTask[]} tasks
     * @property {Element[]} elts
     * @property {string} [title]
     */

    /**
     * @see https://github.com/bigskysoftware/htmx-extensions/blob/main/README.md
     * @typedef {Object} HtmxExtension
     * @property {(api: any) => void} init
     * @property {(name: string, event: Event|CustomEvent) => boolean} onEvent
     * @property {(text: string, xhr: XMLHttpRequest, elt: Element) => string} transformResponse
     * @property {(swapStyle: HtmxSwapStyle) => boolean} isInlineSwap
     * @property {(swapStyle: HtmxSwapStyle, target: Node, fragment: Node, settleInfo: HtmxSettleInfo) => boolean|Node[]} handleSwap
     * @property {(xhr: XMLHttpRequest, parameters: FormData, elt: Node) => *|string|null} encodeParameters
     * @property {() => string[]|null} getSelectors
     */
    var htmxLib = htmx$2;

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var handlebars = {exports: {}};

    var handlebars_runtime = {exports: {}};

    var base$1 = {};

    var utils = {};

    var hasRequiredUtils;

    function requireUtils () {
    	if (hasRequiredUtils) return utils;
    	hasRequiredUtils = 1;

    	utils.__esModule = true;
    	utils.extend = extend;
    	utils.indexOf = indexOf;
    	utils.escapeExpression = escapeExpression;
    	utils.isEmpty = isEmpty;
    	utils.createFrame = createFrame;
    	utils.blockParams = blockParams;
    	utils.appendContextPath = appendContextPath;
    	var escape = {
    	  '&': '&amp;',
    	  '<': '&lt;',
    	  '>': '&gt;',
    	  '"': '&quot;',
    	  "'": '&#x27;',
    	  '`': '&#x60;',
    	  '=': '&#x3D;'
    	};

    	var badChars = /[&<>"'`=]/g,
    	    possible = /[&<>"'`=]/;

    	function escapeChar(chr) {
    	  return escape[chr];
    	}

    	function extend(obj /* , ...source */) {
    	  for (var i = 1; i < arguments.length; i++) {
    	    for (var key in arguments[i]) {
    	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
    	        obj[key] = arguments[i][key];
    	      }
    	    }
    	  }

    	  return obj;
    	}

    	var toString = Object.prototype.toString;

    	utils.toString = toString;
    	// Sourced from lodash
    	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
    	/* eslint-disable func-style */
    	var isFunction = function isFunction(value) {
    	  return typeof value === 'function';
    	};
    	// fallback for older versions of Chrome and Safari
    	/* istanbul ignore next */
    	if (isFunction(/x/)) {
    	  utils.isFunction = isFunction = function (value) {
    	    return typeof value === 'function' && toString.call(value) === '[object Function]';
    	  };
    	}
    	utils.isFunction = isFunction;

    	/* eslint-enable func-style */

    	/* istanbul ignore next */
    	var isArray = Array.isArray || function (value) {
    	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
    	};

    	utils.isArray = isArray;
    	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

    	function indexOf(array, value) {
    	  for (var i = 0, len = array.length; i < len; i++) {
    	    if (array[i] === value) {
    	      return i;
    	    }
    	  }
    	  return -1;
    	}

    	function escapeExpression(string) {
    	  if (typeof string !== 'string') {
    	    // don't escape SafeStrings, since they're already safe
    	    if (string && string.toHTML) {
    	      return string.toHTML();
    	    } else if (string == null) {
    	      return '';
    	    } else if (!string) {
    	      return string + '';
    	    }

    	    // Force a string conversion as this will be done by the append regardless and
    	    // the regex test will do this transparently behind the scenes, causing issues if
    	    // an object's to string has escaped characters in it.
    	    string = '' + string;
    	  }

    	  if (!possible.test(string)) {
    	    return string;
    	  }
    	  return string.replace(badChars, escapeChar);
    	}

    	function isEmpty(value) {
    	  if (!value && value !== 0) {
    	    return true;
    	  } else if (isArray(value) && value.length === 0) {
    	    return true;
    	  } else {
    	    return false;
    	  }
    	}

    	function createFrame(object) {
    	  var frame = extend({}, object);
    	  frame._parent = object;
    	  return frame;
    	}

    	function blockParams(params, ids) {
    	  params.path = ids;
    	  return params;
    	}

    	function appendContextPath(contextPath, id) {
    	  return (contextPath ? contextPath + '.' : '') + id;
    	}
    	
    	return utils;
    }

    var exception = {exports: {}};

    var hasRequiredException;

    function requireException () {
    	if (hasRequiredException) return exception.exports;
    	hasRequiredException = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

    		function Exception(message, node) {
    		  var loc = node && node.loc,
    		      line = undefined,
    		      endLineNumber = undefined,
    		      column = undefined,
    		      endColumn = undefined;

    		  if (loc) {
    		    line = loc.start.line;
    		    endLineNumber = loc.end.line;
    		    column = loc.start.column;
    		    endColumn = loc.end.column;

    		    message += ' - ' + line + ':' + column;
    		  }

    		  var tmp = Error.prototype.constructor.call(this, message);

    		  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    		  for (var idx = 0; idx < errorProps.length; idx++) {
    		    this[errorProps[idx]] = tmp[errorProps[idx]];
    		  }

    		  /* istanbul ignore else */
    		  if (Error.captureStackTrace) {
    		    Error.captureStackTrace(this, Exception);
    		  }

    		  try {
    		    if (loc) {
    		      this.lineNumber = line;
    		      this.endLineNumber = endLineNumber;

    		      // Work around issue under safari where we can't directly set the column value
    		      /* istanbul ignore next */
    		      if (Object.defineProperty) {
    		        Object.defineProperty(this, 'column', {
    		          value: column,
    		          enumerable: true
    		        });
    		        Object.defineProperty(this, 'endColumn', {
    		          value: endColumn,
    		          enumerable: true
    		        });
    		      } else {
    		        this.column = column;
    		        this.endColumn = endColumn;
    		      }
    		    }
    		  } catch (nop) {
    		    /* Ignore if the browser is very particular */
    		  }
    		}

    		Exception.prototype = new Error();

    		exports['default'] = Exception;
    		module.exports = exports['default'];
    		
    	} (exception, exception.exports));
    	return exception.exports;
    }

    var helpers$1 = {};

    var blockHelperMissing = {exports: {}};

    var hasRequiredBlockHelperMissing;

    function requireBlockHelperMissing () {
    	if (hasRequiredBlockHelperMissing) return blockHelperMissing.exports;
    	hasRequiredBlockHelperMissing = 1;
    	(function (module, exports) {

    		exports.__esModule = true;

    		var _utils = /*@__PURE__*/ requireUtils();

    		exports['default'] = function (instance) {
    		  instance.registerHelper('blockHelperMissing', function (context, options) {
    		    var inverse = options.inverse,
    		        fn = options.fn;

    		    if (context === true) {
    		      return fn(this);
    		    } else if (context === false || context == null) {
    		      return inverse(this);
    		    } else if (_utils.isArray(context)) {
    		      if (context.length > 0) {
    		        if (options.ids) {
    		          options.ids = [options.name];
    		        }

    		        return instance.helpers.each(context, options);
    		      } else {
    		        return inverse(this);
    		      }
    		    } else {
    		      if (options.data && options.ids) {
    		        var data = _utils.createFrame(options.data);
    		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
    		        options = { data: data };
    		      }

    		      return fn(context, options);
    		    }
    		  });
    		};

    		module.exports = exports['default'];
    		
    	} (blockHelperMissing, blockHelperMissing.exports));
    	return blockHelperMissing.exports;
    }

    var each = {exports: {}};

    var hasRequiredEach;

    function requireEach () {
    	if (hasRequiredEach) return each.exports;
    	hasRequiredEach = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		// istanbul ignore next

    		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    		var _utils = /*@__PURE__*/ requireUtils();

    		var _exception = /*@__PURE__*/ requireException();

    		var _exception2 = _interopRequireDefault(_exception);

    		exports['default'] = function (instance) {
    		  instance.registerHelper('each', function (context, options) {
    		    if (!options) {
    		      throw new _exception2['default']('Must pass iterator to #each');
    		    }

    		    var fn = options.fn,
    		        inverse = options.inverse,
    		        i = 0,
    		        ret = '',
    		        data = undefined,
    		        contextPath = undefined;

    		    if (options.data && options.ids) {
    		      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    		    }

    		    if (_utils.isFunction(context)) {
    		      context = context.call(this);
    		    }

    		    if (options.data) {
    		      data = _utils.createFrame(options.data);
    		    }

    		    function execIteration(field, index, last) {
    		      if (data) {
    		        data.key = field;
    		        data.index = index;
    		        data.first = index === 0;
    		        data.last = !!last;

    		        if (contextPath) {
    		          data.contextPath = contextPath + field;
    		        }
    		      }

    		      ret = ret + fn(context[field], {
    		        data: data,
    		        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
    		      });
    		    }

    		    if (context && typeof context === 'object') {
    		      if (_utils.isArray(context)) {
    		        for (var j = context.length; i < j; i++) {
    		          if (i in context) {
    		            execIteration(i, i, i === context.length - 1);
    		          }
    		        }
    		      } else if (typeof Symbol === 'function' && context[Symbol.iterator]) {
    		        var newContext = [];
    		        var iterator = context[Symbol.iterator]();
    		        for (var it = iterator.next(); !it.done; it = iterator.next()) {
    		          newContext.push(it.value);
    		        }
    		        context = newContext;
    		        for (var j = context.length; i < j; i++) {
    		          execIteration(i, i, i === context.length - 1);
    		        }
    		      } else {
    		        (function () {
    		          var priorKey = undefined;

    		          Object.keys(context).forEach(function (key) {
    		            // We're running the iterations one step out of sync so we can detect
    		            // the last iteration without have to scan the object twice and create
    		            // an itermediate keys array.
    		            if (priorKey !== undefined) {
    		              execIteration(priorKey, i - 1);
    		            }
    		            priorKey = key;
    		            i++;
    		          });
    		          if (priorKey !== undefined) {
    		            execIteration(priorKey, i - 1, true);
    		          }
    		        })();
    		      }
    		    }

    		    if (i === 0) {
    		      ret = inverse(this);
    		    }

    		    return ret;
    		  });
    		};

    		module.exports = exports['default'];
    		
    	} (each, each.exports));
    	return each.exports;
    }

    var helperMissing = {exports: {}};

    var hasRequiredHelperMissing;

    function requireHelperMissing () {
    	if (hasRequiredHelperMissing) return helperMissing.exports;
    	hasRequiredHelperMissing = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		// istanbul ignore next

    		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    		var _exception = /*@__PURE__*/ requireException();

    		var _exception2 = _interopRequireDefault(_exception);

    		exports['default'] = function (instance) {
    		  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    		    if (arguments.length === 1) {
    		      // A missing field in a {{foo}} construct.
    		      return undefined;
    		    } else {
    		      // Someone is actually trying to call something, blow up.
    		      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    		    }
    		  });
    		};

    		module.exports = exports['default'];
    		
    	} (helperMissing, helperMissing.exports));
    	return helperMissing.exports;
    }

    var _if = {exports: {}};

    var hasRequired_if;

    function require_if () {
    	if (hasRequired_if) return _if.exports;
    	hasRequired_if = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		// istanbul ignore next

    		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    		var _utils = /*@__PURE__*/ requireUtils();

    		var _exception = /*@__PURE__*/ requireException();

    		var _exception2 = _interopRequireDefault(_exception);

    		exports['default'] = function (instance) {
    		  instance.registerHelper('if', function (conditional, options) {
    		    if (arguments.length != 2) {
    		      throw new _exception2['default']('#if requires exactly one argument');
    		    }
    		    if (_utils.isFunction(conditional)) {
    		      conditional = conditional.call(this);
    		    }

    		    // Default behavior is to render the positive path if the value is truthy and not empty.
    		    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    		    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    		    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
    		      return options.inverse(this);
    		    } else {
    		      return options.fn(this);
    		    }
    		  });

    		  instance.registerHelper('unless', function (conditional, options) {
    		    if (arguments.length != 2) {
    		      throw new _exception2['default']('#unless requires exactly one argument');
    		    }
    		    return instance.helpers['if'].call(this, conditional, {
    		      fn: options.inverse,
    		      inverse: options.fn,
    		      hash: options.hash
    		    });
    		  });
    		};

    		module.exports = exports['default'];
    		
    	} (_if, _if.exports));
    	return _if.exports;
    }

    var log = {exports: {}};

    var hasRequiredLog;

    function requireLog () {
    	if (hasRequiredLog) return log.exports;
    	hasRequiredLog = 1;
    	(function (module, exports) {

    		exports.__esModule = true;

    		exports['default'] = function (instance) {
    		  instance.registerHelper('log', function () /* message, options */{
    		    var args = [undefined],
    		        options = arguments[arguments.length - 1];
    		    for (var i = 0; i < arguments.length - 1; i++) {
    		      args.push(arguments[i]);
    		    }

    		    var level = 1;
    		    if (options.hash.level != null) {
    		      level = options.hash.level;
    		    } else if (options.data && options.data.level != null) {
    		      level = options.data.level;
    		    }
    		    args[0] = level;

    		    instance.log.apply(instance, args);
    		  });
    		};

    		module.exports = exports['default'];
    		
    	} (log, log.exports));
    	return log.exports;
    }

    var lookup = {exports: {}};

    var hasRequiredLookup;

    function requireLookup () {
    	if (hasRequiredLookup) return lookup.exports;
    	hasRequiredLookup = 1;
    	(function (module, exports) {

    		exports.__esModule = true;

    		exports['default'] = function (instance) {
    		  instance.registerHelper('lookup', function (obj, field, options) {
    		    if (!obj) {
    		      // Note for 5.0: Change to "obj == null" in 5.0
    		      return obj;
    		    }
    		    return options.lookupProperty(obj, field);
    		  });
    		};

    		module.exports = exports['default'];
    		
    	} (lookup, lookup.exports));
    	return lookup.exports;
    }

    var _with = {exports: {}};

    var hasRequired_with;

    function require_with () {
    	if (hasRequired_with) return _with.exports;
    	hasRequired_with = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		// istanbul ignore next

    		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    		var _utils = /*@__PURE__*/ requireUtils();

    		var _exception = /*@__PURE__*/ requireException();

    		var _exception2 = _interopRequireDefault(_exception);

    		exports['default'] = function (instance) {
    		  instance.registerHelper('with', function (context, options) {
    		    if (arguments.length != 2) {
    		      throw new _exception2['default']('#with requires exactly one argument');
    		    }
    		    if (_utils.isFunction(context)) {
    		      context = context.call(this);
    		    }

    		    var fn = options.fn;

    		    if (!_utils.isEmpty(context)) {
    		      var data = options.data;
    		      if (options.data && options.ids) {
    		        data = _utils.createFrame(options.data);
    		        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
    		      }

    		      return fn(context, {
    		        data: data,
    		        blockParams: _utils.blockParams([context], [data && data.contextPath])
    		      });
    		    } else {
    		      return options.inverse(this);
    		    }
    		  });
    		};

    		module.exports = exports['default'];
    		
    	} (_with, _with.exports));
    	return _with.exports;
    }

    var hasRequiredHelpers$1;

    function requireHelpers$1 () {
    	if (hasRequiredHelpers$1) return helpers$1;
    	hasRequiredHelpers$1 = 1;

    	helpers$1.__esModule = true;
    	helpers$1.registerDefaultHelpers = registerDefaultHelpers;
    	helpers$1.moveHelperToHooks = moveHelperToHooks;
    	// istanbul ignore next

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    	var _helpersBlockHelperMissing = /*@__PURE__*/ requireBlockHelperMissing();

    	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

    	var _helpersEach = /*@__PURE__*/ requireEach();

    	var _helpersEach2 = _interopRequireDefault(_helpersEach);

    	var _helpersHelperMissing = /*@__PURE__*/ requireHelperMissing();

    	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

    	var _helpersIf = /*@__PURE__*/ require_if();

    	var _helpersIf2 = _interopRequireDefault(_helpersIf);

    	var _helpersLog = /*@__PURE__*/ requireLog();

    	var _helpersLog2 = _interopRequireDefault(_helpersLog);

    	var _helpersLookup = /*@__PURE__*/ requireLookup();

    	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

    	var _helpersWith = /*@__PURE__*/ require_with();

    	var _helpersWith2 = _interopRequireDefault(_helpersWith);

    	function registerDefaultHelpers(instance) {
    	  _helpersBlockHelperMissing2['default'](instance);
    	  _helpersEach2['default'](instance);
    	  _helpersHelperMissing2['default'](instance);
    	  _helpersIf2['default'](instance);
    	  _helpersLog2['default'](instance);
    	  _helpersLookup2['default'](instance);
    	  _helpersWith2['default'](instance);
    	}

    	function moveHelperToHooks(instance, helperName, keepHelper) {
    	  if (instance.helpers[helperName]) {
    	    instance.hooks[helperName] = instance.helpers[helperName];
    	    if (!keepHelper) {
    	      delete instance.helpers[helperName];
    	    }
    	  }
    	}
    	
    	return helpers$1;
    }

    var decorators = {};

    var inline = {exports: {}};

    var hasRequiredInline;

    function requireInline () {
    	if (hasRequiredInline) return inline.exports;
    	hasRequiredInline = 1;
    	(function (module, exports) {

    		exports.__esModule = true;

    		var _utils = /*@__PURE__*/ requireUtils();

    		exports['default'] = function (instance) {
    		  instance.registerDecorator('inline', function (fn, props, container, options) {
    		    var ret = fn;
    		    if (!props.partials) {
    		      props.partials = {};
    		      ret = function (context, options) {
    		        // Create a new partials stack frame prior to exec.
    		        var original = container.partials;
    		        container.partials = _utils.extend({}, original, props.partials);
    		        var ret = fn(context, options);
    		        container.partials = original;
    		        return ret;
    		      };
    		    }

    		    props.partials[options.args[0]] = options.fn;

    		    return ret;
    		  });
    		};

    		module.exports = exports['default'];
    		
    	} (inline, inline.exports));
    	return inline.exports;
    }

    var hasRequiredDecorators;

    function requireDecorators () {
    	if (hasRequiredDecorators) return decorators;
    	hasRequiredDecorators = 1;

    	decorators.__esModule = true;
    	decorators.registerDefaultDecorators = registerDefaultDecorators;
    	// istanbul ignore next

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    	var _decoratorsInline = /*@__PURE__*/ requireInline();

    	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

    	function registerDefaultDecorators(instance) {
    	  _decoratorsInline2['default'](instance);
    	}
    	
    	return decorators;
    }

    var logger = {exports: {}};

    var hasRequiredLogger;

    function requireLogger () {
    	if (hasRequiredLogger) return logger.exports;
    	hasRequiredLogger = 1;
    	(function (module, exports) {

    		exports.__esModule = true;

    		var _utils = /*@__PURE__*/ requireUtils();

    		var logger = {
    		  methodMap: ['debug', 'info', 'warn', 'error'],
    		  level: 'info',

    		  // Maps a given level value to the `methodMap` indexes above.
    		  lookupLevel: function lookupLevel(level) {
    		    if (typeof level === 'string') {
    		      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
    		      if (levelMap >= 0) {
    		        level = levelMap;
    		      } else {
    		        level = parseInt(level, 10);
    		      }
    		    }

    		    return level;
    		  },

    		  // Can be overridden in the host environment
    		  log: function log(level) {
    		    level = logger.lookupLevel(level);

    		    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
    		      var method = logger.methodMap[level];
    		      // eslint-disable-next-line no-console
    		      if (!console[method]) {
    		        method = 'log';
    		      }

    		      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    		        message[_key - 1] = arguments[_key];
    		      }

    		      console[method].apply(console, message); // eslint-disable-line no-console
    		    }
    		  }
    		};

    		exports['default'] = logger;
    		module.exports = exports['default'];
    		
    	} (logger, logger.exports));
    	return logger.exports;
    }

    var protoAccess = {};

    var createNewLookupObject = {};

    var hasRequiredCreateNewLookupObject;

    function requireCreateNewLookupObject () {
    	if (hasRequiredCreateNewLookupObject) return createNewLookupObject;
    	hasRequiredCreateNewLookupObject = 1;

    	createNewLookupObject.__esModule = true;
    	createNewLookupObject.createNewLookupObject = createNewLookupObject$1;

    	var _utils = /*@__PURE__*/ requireUtils();

    	/**
    	 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
    	 * The resulting object can be used with "object[property]" to check if a property exists
    	 * @param {...object} sources a varargs parameter of source objects that will be merged
    	 * @returns {object}
    	 */

    	function createNewLookupObject$1() {
    	  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    	    sources[_key] = arguments[_key];
    	  }

    	  return _utils.extend.apply(undefined, [Object.create(null)].concat(sources));
    	}
    	
    	return createNewLookupObject;
    }

    var hasRequiredProtoAccess;

    function requireProtoAccess () {
    	if (hasRequiredProtoAccess) return protoAccess;
    	hasRequiredProtoAccess = 1;

    	protoAccess.__esModule = true;
    	protoAccess.createProtoAccessControl = createProtoAccessControl;
    	protoAccess.resultIsAllowed = resultIsAllowed;
    	protoAccess.resetLoggedProperties = resetLoggedProperties;
    	// istanbul ignore next

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    	var _createNewLookupObject = /*@__PURE__*/ requireCreateNewLookupObject();

    	var _logger = /*@__PURE__*/ requireLogger();

    	var _logger2 = _interopRequireDefault(_logger);

    	var loggedProperties = Object.create(null);

    	function createProtoAccessControl(runtimeOptions) {
    	  var defaultMethodWhiteList = Object.create(null);
    	  defaultMethodWhiteList['constructor'] = false;
    	  defaultMethodWhiteList['__defineGetter__'] = false;
    	  defaultMethodWhiteList['__defineSetter__'] = false;
    	  defaultMethodWhiteList['__lookupGetter__'] = false;

    	  var defaultPropertyWhiteList = Object.create(null);
    	  // eslint-disable-next-line no-proto
    	  defaultPropertyWhiteList['__proto__'] = false;

    	  return {
    	    properties: {
    	      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
    	      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
    	    },
    	    methods: {
    	      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
    	      defaultValue: runtimeOptions.allowProtoMethodsByDefault
    	    }
    	  };
    	}

    	function resultIsAllowed(result, protoAccessControl, propertyName) {
    	  if (typeof result === 'function') {
    	    return checkWhiteList(protoAccessControl.methods, propertyName);
    	  } else {
    	    return checkWhiteList(protoAccessControl.properties, propertyName);
    	  }
    	}

    	function checkWhiteList(protoAccessControlForType, propertyName) {
    	  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
    	    return protoAccessControlForType.whitelist[propertyName] === true;
    	  }
    	  if (protoAccessControlForType.defaultValue !== undefined) {
    	    return protoAccessControlForType.defaultValue;
    	  }
    	  logUnexpecedPropertyAccessOnce(propertyName);
    	  return false;
    	}

    	function logUnexpecedPropertyAccessOnce(propertyName) {
    	  if (loggedProperties[propertyName] !== true) {
    	    loggedProperties[propertyName] = true;
    	    _logger2['default'].log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
    	  }
    	}

    	function resetLoggedProperties() {
    	  Object.keys(loggedProperties).forEach(function (propertyName) {
    	    delete loggedProperties[propertyName];
    	  });
    	}
    	
    	return protoAccess;
    }

    var hasRequiredBase$1;

    function requireBase$1 () {
    	if (hasRequiredBase$1) return base$1;
    	hasRequiredBase$1 = 1;

    	base$1.__esModule = true;
    	base$1.HandlebarsEnvironment = HandlebarsEnvironment;
    	// istanbul ignore next

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    	var _utils = /*@__PURE__*/ requireUtils();

    	var _exception = /*@__PURE__*/ requireException();

    	var _exception2 = _interopRequireDefault(_exception);

    	var _helpers = /*@__PURE__*/ requireHelpers$1();

    	var _decorators = /*@__PURE__*/ requireDecorators();

    	var _logger = /*@__PURE__*/ requireLogger();

    	var _logger2 = _interopRequireDefault(_logger);

    	var _internalProtoAccess = /*@__PURE__*/ requireProtoAccess();

    	var VERSION = '4.7.8';
    	base$1.VERSION = VERSION;
    	var COMPILER_REVISION = 8;
    	base$1.COMPILER_REVISION = COMPILER_REVISION;
    	var LAST_COMPATIBLE_COMPILER_REVISION = 7;

    	base$1.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
    	var REVISION_CHANGES = {
    	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    	  2: '== 1.0.0-rc.3',
    	  3: '== 1.0.0-rc.4',
    	  4: '== 1.x.x',
    	  5: '== 2.0.0-alpha.x',
    	  6: '>= 2.0.0-beta.1',
    	  7: '>= 4.0.0 <4.3.0',
    	  8: '>= 4.3.0'
    	};

    	base$1.REVISION_CHANGES = REVISION_CHANGES;
    	var objectType = '[object Object]';

    	function HandlebarsEnvironment(helpers, partials, decorators) {
    	  this.helpers = helpers || {};
    	  this.partials = partials || {};
    	  this.decorators = decorators || {};

    	  _helpers.registerDefaultHelpers(this);
    	  _decorators.registerDefaultDecorators(this);
    	}

    	HandlebarsEnvironment.prototype = {
    	  constructor: HandlebarsEnvironment,

    	  logger: _logger2['default'],
    	  log: _logger2['default'].log,

    	  registerHelper: function registerHelper(name, fn) {
    	    if (_utils.toString.call(name) === objectType) {
    	      if (fn) {
    	        throw new _exception2['default']('Arg not supported with multiple helpers');
    	      }
    	      _utils.extend(this.helpers, name);
    	    } else {
    	      this.helpers[name] = fn;
    	    }
    	  },
    	  unregisterHelper: function unregisterHelper(name) {
    	    delete this.helpers[name];
    	  },

    	  registerPartial: function registerPartial(name, partial) {
    	    if (_utils.toString.call(name) === objectType) {
    	      _utils.extend(this.partials, name);
    	    } else {
    	      if (typeof partial === 'undefined') {
    	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
    	      }
    	      this.partials[name] = partial;
    	    }
    	  },
    	  unregisterPartial: function unregisterPartial(name) {
    	    delete this.partials[name];
    	  },

    	  registerDecorator: function registerDecorator(name, fn) {
    	    if (_utils.toString.call(name) === objectType) {
    	      if (fn) {
    	        throw new _exception2['default']('Arg not supported with multiple decorators');
    	      }
    	      _utils.extend(this.decorators, name);
    	    } else {
    	      this.decorators[name] = fn;
    	    }
    	  },
    	  unregisterDecorator: function unregisterDecorator(name) {
    	    delete this.decorators[name];
    	  },
    	  /**
    	   * Reset the memory of illegal property accesses that have already been logged.
    	   * @deprecated should only be used in handlebars test-cases
    	   */
    	  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
    	    _internalProtoAccess.resetLoggedProperties();
    	  }
    	};

    	var log = _logger2['default'].log;

    	base$1.log = log;
    	base$1.createFrame = _utils.createFrame;
    	base$1.logger = _logger2['default'];
    	
    	return base$1;
    }

    var safeString = {exports: {}};

    var hasRequiredSafeString;

    function requireSafeString () {
    	if (hasRequiredSafeString) return safeString.exports;
    	hasRequiredSafeString = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		function SafeString(string) {
    		  this.string = string;
    		}

    		SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
    		  return '' + this.string;
    		};

    		exports['default'] = SafeString;
    		module.exports = exports['default'];
    		
    	} (safeString, safeString.exports));
    	return safeString.exports;
    }

    var runtime = {};

    var wrapHelper = {};

    var hasRequiredWrapHelper;

    function requireWrapHelper () {
    	if (hasRequiredWrapHelper) return wrapHelper;
    	hasRequiredWrapHelper = 1;

    	wrapHelper.__esModule = true;
    	wrapHelper.wrapHelper = wrapHelper$1;

    	function wrapHelper$1(helper, transformOptionsFn) {
    	  if (typeof helper !== 'function') {
    	    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
    	    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
    	    return helper;
    	  }
    	  var wrapper = function wrapper() /* dynamic arguments */{
    	    var options = arguments[arguments.length - 1];
    	    arguments[arguments.length - 1] = transformOptionsFn(options);
    	    return helper.apply(this, arguments);
    	  };
    	  return wrapper;
    	}
    	
    	return wrapHelper;
    }

    var hasRequiredRuntime;

    function requireRuntime () {
    	if (hasRequiredRuntime) return runtime;
    	hasRequiredRuntime = 1;

    	runtime.__esModule = true;
    	runtime.checkRevision = checkRevision;
    	runtime.template = template;
    	runtime.wrapProgram = wrapProgram;
    	runtime.resolvePartial = resolvePartial;
    	runtime.invokePartial = invokePartial;
    	runtime.noop = noop;
    	// istanbul ignore next

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    	// istanbul ignore next

    	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

    	var _utils = /*@__PURE__*/ requireUtils();

    	var Utils = _interopRequireWildcard(_utils);

    	var _exception = /*@__PURE__*/ requireException();

    	var _exception2 = _interopRequireDefault(_exception);

    	var _base = /*@__PURE__*/ requireBase$1();

    	var _helpers = /*@__PURE__*/ requireHelpers$1();

    	var _internalWrapHelper = /*@__PURE__*/ requireWrapHelper();

    	var _internalProtoAccess = /*@__PURE__*/ requireProtoAccess();

    	function checkRevision(compilerInfo) {
    	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
    	      currentRevision = _base.COMPILER_REVISION;

    	  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
    	    return;
    	  }

    	  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
    	    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
    	        compilerVersions = _base.REVISION_CHANGES[compilerRevision];
    	    throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    	  } else {
    	    // Use the embedded version info since the runtime doesn't know about this revision yet
    	    throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    	  }
    	}

    	function template(templateSpec, env) {
    	  /* istanbul ignore next */
    	  if (!env) {
    	    throw new _exception2['default']('No environment passed to template');
    	  }
    	  if (!templateSpec || !templateSpec.main) {
    	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
    	  }

    	  templateSpec.main.decorator = templateSpec.main_d;

    	  // Note: Using env.VM references rather than local var references throughout this section to allow
    	  // for external users to override these as pseudo-supported APIs.
    	  env.VM.checkRevision(templateSpec.compiler);

    	  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
    	  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

    	  function invokePartialWrapper(partial, context, options) {
    	    if (options.hash) {
    	      context = Utils.extend({}, context, options.hash);
    	      if (options.ids) {
    	        options.ids[0] = true;
    	      }
    	    }
    	    partial = env.VM.resolvePartial.call(this, partial, context, options);

    	    var extendedOptions = Utils.extend({}, options, {
    	      hooks: this.hooks,
    	      protoAccessControl: this.protoAccessControl
    	    });

    	    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

    	    if (result == null && env.compile) {
    	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
    	      result = options.partials[options.name](context, extendedOptions);
    	    }
    	    if (result != null) {
    	      if (options.indent) {
    	        var lines = result.split('\n');
    	        for (var i = 0, l = lines.length; i < l; i++) {
    	          if (!lines[i] && i + 1 === l) {
    	            break;
    	          }

    	          lines[i] = options.indent + lines[i];
    	        }
    	        result = lines.join('\n');
    	      }
    	      return result;
    	    } else {
    	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    	    }
    	  }

    	  // Just add water
    	  var container = {
    	    strict: function strict(obj, name, loc) {
    	      if (!obj || !(name in obj)) {
    	        throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
    	          loc: loc
    	        });
    	      }
    	      return container.lookupProperty(obj, name);
    	    },
    	    lookupProperty: function lookupProperty(parent, propertyName) {
    	      var result = parent[propertyName];
    	      if (result == null) {
    	        return result;
    	      }
    	      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
    	        return result;
    	      }

    	      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
    	        return result;
    	      }
    	      return undefined;
    	    },
    	    lookup: function lookup(depths, name) {
    	      var len = depths.length;
    	      for (var i = 0; i < len; i++) {
    	        var result = depths[i] && container.lookupProperty(depths[i], name);
    	        if (result != null) {
    	          return depths[i][name];
    	        }
    	      }
    	    },
    	    lambda: function lambda(current, context) {
    	      return typeof current === 'function' ? current.call(context) : current;
    	    },

    	    escapeExpression: Utils.escapeExpression,
    	    invokePartial: invokePartialWrapper,

    	    fn: function fn(i) {
    	      var ret = templateSpec[i];
    	      ret.decorator = templateSpec[i + '_d'];
    	      return ret;
    	    },

    	    programs: [],
    	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
    	      var programWrapper = this.programs[i],
    	          fn = this.fn(i);
    	      if (data || depths || blockParams || declaredBlockParams) {
    	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
    	      } else if (!programWrapper) {
    	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
    	      }
    	      return programWrapper;
    	    },

    	    data: function data(value, depth) {
    	      while (value && depth--) {
    	        value = value._parent;
    	      }
    	      return value;
    	    },
    	    mergeIfNeeded: function mergeIfNeeded(param, common) {
    	      var obj = param || common;

    	      if (param && common && param !== common) {
    	        obj = Utils.extend({}, common, param);
    	      }

    	      return obj;
    	    },
    	    // An empty object to use as replacement for null-contexts
    	    nullContext: Object.seal({}),

    	    noop: env.VM.noop,
    	    compilerInfo: templateSpec.compiler
    	  };

    	  function ret(context) {
    	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    	    var data = options.data;

    	    ret._setup(options);
    	    if (!options.partial && templateSpec.useData) {
    	      data = initData(context, data);
    	    }
    	    var depths = undefined,
    	        blockParams = templateSpec.useBlockParams ? [] : undefined;
    	    if (templateSpec.useDepths) {
    	      if (options.depths) {
    	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
    	      } else {
    	        depths = [context];
    	      }
    	    }

    	    function main(context /*, options*/) {
    	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    	    }

    	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    	    return main(context, options);
    	  }

    	  ret.isTop = true;

    	  ret._setup = function (options) {
    	    if (!options.partial) {
    	      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
    	      wrapHelpersToPassLookupProperty(mergedHelpers, container);
    	      container.helpers = mergedHelpers;

    	      if (templateSpec.usePartial) {
    	        // Use mergeIfNeeded here to prevent compiling global partials multiple times
    	        container.partials = container.mergeIfNeeded(options.partials, env.partials);
    	      }
    	      if (templateSpec.usePartial || templateSpec.useDecorators) {
    	        container.decorators = Utils.extend({}, env.decorators, options.decorators);
    	      }

    	      container.hooks = {};
    	      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);

    	      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
    	      _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
    	      _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
    	    } else {
    	      container.protoAccessControl = options.protoAccessControl; // internal option
    	      container.helpers = options.helpers;
    	      container.partials = options.partials;
    	      container.decorators = options.decorators;
    	      container.hooks = options.hooks;
    	    }
    	  };

    	  ret._child = function (i, data, blockParams, depths) {
    	    if (templateSpec.useBlockParams && !blockParams) {
    	      throw new _exception2['default']('must pass block params');
    	    }
    	    if (templateSpec.useDepths && !depths) {
    	      throw new _exception2['default']('must pass parent depths');
    	    }

    	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
    	  };
    	  return ret;
    	}

    	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
    	  function prog(context) {
    	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    	    var currentDepths = depths;
    	    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
    	      currentDepths = [context].concat(depths);
    	    }

    	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
    	  }

    	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

    	  prog.program = i;
    	  prog.depth = depths ? depths.length : 0;
    	  prog.blockParams = declaredBlockParams || 0;
    	  return prog;
    	}

    	/**
    	 * This is currently part of the official API, therefore implementation details should not be changed.
    	 */

    	function resolvePartial(partial, context, options) {
    	  if (!partial) {
    	    if (options.name === '@partial-block') {
    	      partial = options.data['partial-block'];
    	    } else {
    	      partial = options.partials[options.name];
    	    }
    	  } else if (!partial.call && !options.name) {
    	    // This is a dynamic partial that returned a string
    	    options.name = partial;
    	    partial = options.partials[partial];
    	  }
    	  return partial;
    	}

    	function invokePartial(partial, context, options) {
    	  // Use the current closure context to save the partial-block if this partial
    	  var currentPartialBlock = options.data && options.data['partial-block'];
    	  options.partial = true;
    	  if (options.ids) {
    	    options.data.contextPath = options.ids[0] || options.data.contextPath;
    	  }

    	  var partialBlock = undefined;
    	  if (options.fn && options.fn !== noop) {
    	    (function () {
    	      options.data = _base.createFrame(options.data);
    	      // Wrapper function to get access to currentPartialBlock from the closure
    	      var fn = options.fn;
    	      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
    	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    	        // Restore the partial-block from the closure for the execution of the block
    	        // i.e. the part inside the block of the partial call.
    	        options.data = _base.createFrame(options.data);
    	        options.data['partial-block'] = currentPartialBlock;
    	        return fn(context, options);
    	      };
    	      if (fn.partials) {
    	        options.partials = Utils.extend({}, options.partials, fn.partials);
    	      }
    	    })();
    	  }

    	  if (partial === undefined && partialBlock) {
    	    partial = partialBlock;
    	  }

    	  if (partial === undefined) {
    	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
    	  } else if (partial instanceof Function) {
    	    return partial(context, options);
    	  }
    	}

    	function noop() {
    	  return '';
    	}

    	function initData(context, data) {
    	  if (!data || !('root' in data)) {
    	    data = data ? _base.createFrame(data) : {};
    	    data.root = context;
    	  }
    	  return data;
    	}

    	function executeDecorators(fn, prog, container, depths, data, blockParams) {
    	  if (fn.decorator) {
    	    var props = {};
    	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    	    Utils.extend(prog, props);
    	  }
    	  return prog;
    	}

    	function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
    	  Object.keys(mergedHelpers).forEach(function (helperName) {
    	    var helper = mergedHelpers[helperName];
    	    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
    	  });
    	}

    	function passLookupPropertyOption(helper, container) {
    	  var lookupProperty = container.lookupProperty;
    	  return _internalWrapHelper.wrapHelper(helper, function (options) {
    	    return Utils.extend({ lookupProperty: lookupProperty }, options);
    	  });
    	}
    	
    	return runtime;
    }

    var noConflict = {exports: {}};

    /* global globalThis */

    var hasRequiredNoConflict;

    function requireNoConflict () {
    	if (hasRequiredNoConflict) return noConflict.exports;
    	hasRequiredNoConflict = 1;
    	(function (module, exports) {

    		exports.__esModule = true;

    		exports['default'] = function (Handlebars) {
    		  /* istanbul ignore next */
    		  // https://mathiasbynens.be/notes/globalthis
    		  (function () {
    		    if (typeof globalThis === 'object') return;
    		    Object.prototype.__defineGetter__('__magic__', function () {
    		      return this;
    		    });
    		    __magic__.globalThis = __magic__; // eslint-disable-line no-undef
    		    delete Object.prototype.__magic__;
    		  })();

    		  var $Handlebars = globalThis.Handlebars;

    		  /* istanbul ignore next */
    		  Handlebars.noConflict = function () {
    		    if (globalThis.Handlebars === Handlebars) {
    		      globalThis.Handlebars = $Handlebars;
    		    }
    		    return Handlebars;
    		  };
    		};

    		module.exports = exports['default'];
    		
    	} (noConflict, noConflict.exports));
    	return noConflict.exports;
    }

    var hasRequiredHandlebars_runtime;

    function requireHandlebars_runtime () {
    	if (hasRequiredHandlebars_runtime) return handlebars_runtime.exports;
    	hasRequiredHandlebars_runtime = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		// istanbul ignore next

    		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    		// istanbul ignore next

    		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

    		var _handlebarsBase = /*@__PURE__*/ requireBase$1();

    		var base = _interopRequireWildcard(_handlebarsBase);

    		// Each of these augment the Handlebars object. No need to setup here.
    		// (This is done to easily share code between commonjs and browse envs)

    		var _handlebarsSafeString = /*@__PURE__*/ requireSafeString();

    		var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

    		var _handlebarsException = /*@__PURE__*/ requireException();

    		var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

    		var _handlebarsUtils = /*@__PURE__*/ requireUtils();

    		var Utils = _interopRequireWildcard(_handlebarsUtils);

    		var _handlebarsRuntime = /*@__PURE__*/ requireRuntime();

    		var runtime = _interopRequireWildcard(_handlebarsRuntime);

    		var _handlebarsNoConflict = /*@__PURE__*/ requireNoConflict();

    		var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

    		// For compatibility and usage outside of module systems, make the Handlebars object a namespace
    		function create() {
    		  var hb = new base.HandlebarsEnvironment();

    		  Utils.extend(hb, base);
    		  hb.SafeString = _handlebarsSafeString2['default'];
    		  hb.Exception = _handlebarsException2['default'];
    		  hb.Utils = Utils;
    		  hb.escapeExpression = Utils.escapeExpression;

    		  hb.VM = runtime;
    		  hb.template = function (spec) {
    		    return runtime.template(spec, hb);
    		  };

    		  return hb;
    		}

    		var inst = create();
    		inst.create = create;

    		_handlebarsNoConflict2['default'](inst);

    		inst['default'] = inst;

    		exports['default'] = inst;
    		module.exports = exports['default'];
    		
    	} (handlebars_runtime, handlebars_runtime.exports));
    	return handlebars_runtime.exports;
    }

    var ast = {exports: {}};

    var hasRequiredAst;

    function requireAst () {
    	if (hasRequiredAst) return ast.exports;
    	hasRequiredAst = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		var AST = {
    		  // Public API used to evaluate derived attributes regarding AST nodes
    		  helpers: {
    		    // a mustache is definitely a helper if:
    		    // * it is an eligible helper, and
    		    // * it has at least one parameter or hash segment
    		    helperExpression: function helperExpression(node) {
    		      return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
    		    },

    		    scopedId: function scopedId(path) {
    		      return (/^\.|this\b/.test(path.original)
    		      );
    		    },

    		    // an ID is simple if it only has one part, and that part is not
    		    // `..` or `this`.
    		    simpleId: function simpleId(path) {
    		      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
    		    }
    		  }
    		};

    		// Must be exported as an object rather than the root of the module as the jison lexer
    		// must modify the object to operate properly.
    		exports['default'] = AST;
    		module.exports = exports['default'];
    		
    	} (ast, ast.exports));
    	return ast.exports;
    }

    var base = {};

    var parser = {exports: {}};

    var hasRequiredParser;

    function requireParser () {
    	if (hasRequiredParser) return parser.exports;
    	hasRequiredParser = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		var handlebars = (function () {
    		    var parser = { trace: function trace() {},
    		        yy: {},
    		        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
    		        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
    		        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
    		        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

    		            var $0 = $$.length - 1;
    		            switch (yystate) {
    		                case 1:
    		                    return $$[$0 - 1];
    		                case 2:
    		                    this.$ = yy.prepareProgram($$[$0]);
    		                    break;
    		                case 3:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 4:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 5:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 6:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 7:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 8:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 9:
    		                    this.$ = {
    		                        type: 'CommentStatement',
    		                        value: yy.stripComment($$[$0]),
    		                        strip: yy.stripFlags($$[$0], $$[$0]),
    		                        loc: yy.locInfo(this._$)
    		                    };

    		                    break;
    		                case 10:
    		                    this.$ = {
    		                        type: 'ContentStatement',
    		                        original: $$[$0],
    		                        value: $$[$0],
    		                        loc: yy.locInfo(this._$)
    		                    };

    		                    break;
    		                case 11:
    		                    this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
    		                    break;
    		                case 12:
    		                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
    		                    break;
    		                case 13:
    		                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
    		                    break;
    		                case 14:
    		                    this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
    		                    break;
    		                case 15:
    		                    this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
    		                    break;
    		                case 16:
    		                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
    		                    break;
    		                case 17:
    		                    this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
    		                    break;
    		                case 18:
    		                    this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
    		                    break;
    		                case 19:
    		                    var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
    		                        program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
    		                    program.chained = true;

    		                    this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

    		                    break;
    		                case 20:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 21:
    		                    this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
    		                    break;
    		                case 22:
    		                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
    		                    break;
    		                case 23:
    		                    this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
    		                    break;
    		                case 24:
    		                    this.$ = {
    		                        type: 'PartialStatement',
    		                        name: $$[$0 - 3],
    		                        params: $$[$0 - 2],
    		                        hash: $$[$0 - 1],
    		                        indent: '',
    		                        strip: yy.stripFlags($$[$0 - 4], $$[$0]),
    		                        loc: yy.locInfo(this._$)
    		                    };

    		                    break;
    		                case 25:
    		                    this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
    		                    break;
    		                case 26:
    		                    this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
    		                    break;
    		                case 27:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 28:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 29:
    		                    this.$ = {
    		                        type: 'SubExpression',
    		                        path: $$[$0 - 3],
    		                        params: $$[$0 - 2],
    		                        hash: $$[$0 - 1],
    		                        loc: yy.locInfo(this._$)
    		                    };

    		                    break;
    		                case 30:
    		                    this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
    		                    break;
    		                case 31:
    		                    this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
    		                    break;
    		                case 32:
    		                    this.$ = yy.id($$[$0 - 1]);
    		                    break;
    		                case 33:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 34:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 35:
    		                    this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
    		                    break;
    		                case 36:
    		                    this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
    		                    break;
    		                case 37:
    		                    this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
    		                    break;
    		                case 38:
    		                    this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
    		                    break;
    		                case 39:
    		                    this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
    		                    break;
    		                case 40:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 41:
    		                    this.$ = $$[$0];
    		                    break;
    		                case 42:
    		                    this.$ = yy.preparePath(true, $$[$0], this._$);
    		                    break;
    		                case 43:
    		                    this.$ = yy.preparePath(false, $$[$0], this._$);
    		                    break;
    		                case 44:
    		                    $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
    		                    break;
    		                case 45:
    		                    this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
    		                    break;
    		                case 46:
    		                    this.$ = [];
    		                    break;
    		                case 47:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 48:
    		                    this.$ = [];
    		                    break;
    		                case 49:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 50:
    		                    this.$ = [];
    		                    break;
    		                case 51:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 58:
    		                    this.$ = [];
    		                    break;
    		                case 59:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 64:
    		                    this.$ = [];
    		                    break;
    		                case 65:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 70:
    		                    this.$ = [];
    		                    break;
    		                case 71:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 78:
    		                    this.$ = [];
    		                    break;
    		                case 79:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 82:
    		                    this.$ = [];
    		                    break;
    		                case 83:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 86:
    		                    this.$ = [];
    		                    break;
    		                case 87:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 90:
    		                    this.$ = [];
    		                    break;
    		                case 91:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 94:
    		                    this.$ = [];
    		                    break;
    		                case 95:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 98:
    		                    this.$ = [$$[$0]];
    		                    break;
    		                case 99:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		                case 100:
    		                    this.$ = [$$[$0]];
    		                    break;
    		                case 101:
    		                    $$[$0 - 1].push($$[$0]);
    		                    break;
    		            }
    		        },
    		        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
    		        defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
    		        parseError: function parseError(str, hash) {
    		            throw new Error(str);
    		        },
    		        parse: function parse(input) {
    		            var self = this,
    		                stack = [0],
    		                vstack = [null],
    		                lstack = [],
    		                table = this.table,
    		                yytext = "",
    		                yylineno = 0,
    		                yyleng = 0;
    		            this.lexer.setInput(input);
    		            this.lexer.yy = this.yy;
    		            this.yy.lexer = this.lexer;
    		            this.yy.parser = this;
    		            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
    		            var yyloc = this.lexer.yylloc;
    		            lstack.push(yyloc);
    		            var ranges = this.lexer.options && this.lexer.options.ranges;
    		            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
    		            function lex() {
    		                var token;
    		                token = self.lexer.lex() || 1;
    		                if (typeof token !== "number") {
    		                    token = self.symbols_[token] || token;
    		                }
    		                return token;
    		            }
    		            var symbol,
    		                state,
    		                action,
    		                r,
    		                yyval = {},
    		                p,
    		                len,
    		                newState,
    		                expected;
    		            while (true) {
    		                state = stack[stack.length - 1];
    		                if (this.defaultActions[state]) {
    		                    action = this.defaultActions[state];
    		                } else {
    		                    if (symbol === null || typeof symbol == "undefined") {
    		                        symbol = lex();
    		                    }
    		                    action = table[state] && table[state][symbol];
    		                }
    		                if (typeof action === "undefined" || !action.length || !action[0]) {
    		                    var errStr = "";
    		                    {
    		                        expected = [];
    		                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
    		                            expected.push("'" + this.terminals_[p] + "'");
    		                        }
    		                        if (this.lexer.showPosition) {
    		                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
    		                        } else {
    		                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
    		                        }
    		                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
    		                    }
    		                }
    		                if (action[0] instanceof Array && action.length > 1) {
    		                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
    		                }
    		                switch (action[0]) {
    		                    case 1:
    		                        stack.push(symbol);
    		                        vstack.push(this.lexer.yytext);
    		                        lstack.push(this.lexer.yylloc);
    		                        stack.push(action[1]);
    		                        symbol = null;
    		                        {
    		                            yyleng = this.lexer.yyleng;
    		                            yytext = this.lexer.yytext;
    		                            yylineno = this.lexer.yylineno;
    		                            yyloc = this.lexer.yylloc;
    		                        }
    		                        break;
    		                    case 2:
    		                        len = this.productions_[action[1]][1];
    		                        yyval.$ = vstack[vstack.length - len];
    		                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
    		                        if (ranges) {
    		                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
    		                        }
    		                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
    		                        if (typeof r !== "undefined") {
    		                            return r;
    		                        }
    		                        if (len) {
    		                            stack = stack.slice(0, -1 * len * 2);
    		                            vstack = vstack.slice(0, -1 * len);
    		                            lstack = lstack.slice(0, -1 * len);
    		                        }
    		                        stack.push(this.productions_[action[1]][0]);
    		                        vstack.push(yyval.$);
    		                        lstack.push(yyval._$);
    		                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
    		                        stack.push(newState);
    		                        break;
    		                    case 3:
    		                        return true;
    		                }
    		            }
    		            return true;
    		        }
    		    };
    		    /* Jison generated lexer */
    		    var lexer = (function () {
    		        var lexer = { EOF: 1,
    		            parseError: function parseError(str, hash) {
    		                if (this.yy.parser) {
    		                    this.yy.parser.parseError(str, hash);
    		                } else {
    		                    throw new Error(str);
    		                }
    		            },
    		            setInput: function setInput(input) {
    		                this._input = input;
    		                this._more = this._less = this.done = false;
    		                this.yylineno = this.yyleng = 0;
    		                this.yytext = this.matched = this.match = '';
    		                this.conditionStack = ['INITIAL'];
    		                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
    		                if (this.options.ranges) this.yylloc.range = [0, 0];
    		                this.offset = 0;
    		                return this;
    		            },
    		            input: function input() {
    		                var ch = this._input[0];
    		                this.yytext += ch;
    		                this.yyleng++;
    		                this.offset++;
    		                this.match += ch;
    		                this.matched += ch;
    		                var lines = ch.match(/(?:\r\n?|\n).*/g);
    		                if (lines) {
    		                    this.yylineno++;
    		                    this.yylloc.last_line++;
    		                } else {
    		                    this.yylloc.last_column++;
    		                }
    		                if (this.options.ranges) this.yylloc.range[1]++;

    		                this._input = this._input.slice(1);
    		                return ch;
    		            },
    		            unput: function unput(ch) {
    		                var len = ch.length;
    		                var lines = ch.split(/(?:\r\n?|\n)/g);

    		                this._input = ch + this._input;
    		                this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
    		                //this.yyleng -= len;
    		                this.offset -= len;
    		                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
    		                this.match = this.match.substr(0, this.match.length - 1);
    		                this.matched = this.matched.substr(0, this.matched.length - 1);

    		                if (lines.length - 1) this.yylineno -= lines.length - 1;
    		                var r = this.yylloc.range;

    		                this.yylloc = { first_line: this.yylloc.first_line,
    		                    last_line: this.yylineno + 1,
    		                    first_column: this.yylloc.first_column,
    		                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
    		                };

    		                if (this.options.ranges) {
    		                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
    		                }
    		                return this;
    		            },
    		            more: function more() {
    		                this._more = true;
    		                return this;
    		            },
    		            less: function less(n) {
    		                this.unput(this.match.slice(n));
    		            },
    		            pastInput: function pastInput() {
    		                var past = this.matched.substr(0, this.matched.length - this.match.length);
    		                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
    		            },
    		            upcomingInput: function upcomingInput() {
    		                var next = this.match;
    		                if (next.length < 20) {
    		                    next += this._input.substr(0, 20 - next.length);
    		                }
    		                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    		            },
    		            showPosition: function showPosition() {
    		                var pre = this.pastInput();
    		                var c = new Array(pre.length + 1).join("-");
    		                return pre + this.upcomingInput() + "\n" + c + "^";
    		            },
    		            next: function next() {
    		                if (this.done) {
    		                    return this.EOF;
    		                }
    		                if (!this._input) this.done = true;

    		                var token, match, tempMatch, index, lines;
    		                if (!this._more) {
    		                    this.yytext = '';
    		                    this.match = '';
    		                }
    		                var rules = this._currentRules();
    		                for (var i = 0; i < rules.length; i++) {
    		                    tempMatch = this._input.match(this.rules[rules[i]]);
    		                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
    		                        match = tempMatch;
    		                        index = i;
    		                        if (!this.options.flex) break;
    		                    }
    		                }
    		                if (match) {
    		                    lines = match[0].match(/(?:\r\n?|\n).*/g);
    		                    if (lines) this.yylineno += lines.length;
    		                    this.yylloc = { first_line: this.yylloc.last_line,
    		                        last_line: this.yylineno + 1,
    		                        first_column: this.yylloc.last_column,
    		                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
    		                    this.yytext += match[0];
    		                    this.match += match[0];
    		                    this.matches = match;
    		                    this.yyleng = this.yytext.length;
    		                    if (this.options.ranges) {
    		                        this.yylloc.range = [this.offset, this.offset += this.yyleng];
    		                    }
    		                    this._more = false;
    		                    this._input = this._input.slice(match[0].length);
    		                    this.matched += match[0];
    		                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
    		                    if (this.done && this._input) this.done = false;
    		                    if (token) return token;else return;
    		                }
    		                if (this._input === "") {
    		                    return this.EOF;
    		                } else {
    		                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
    		                }
    		            },
    		            lex: function lex() {
    		                var r = this.next();
    		                if (typeof r !== 'undefined') {
    		                    return r;
    		                } else {
    		                    return this.lex();
    		                }
    		            },
    		            begin: function begin(condition) {
    		                this.conditionStack.push(condition);
    		            },
    		            popState: function popState() {
    		                return this.conditionStack.pop();
    		            },
    		            _currentRules: function _currentRules() {
    		                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
    		            },
    		            topState: function topState() {
    		                return this.conditionStack[this.conditionStack.length - 2];
    		            },
    		            pushState: function begin(condition) {
    		                this.begin(condition);
    		            } };
    		        lexer.options = {};
    		        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

    		            function strip(start, end) {
    		                return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
    		            }
    		            switch ($avoiding_name_collisions) {
    		                case 0:
    		                    if (yy_.yytext.slice(-2) === "\\\\") {
    		                        strip(0, 1);
    		                        this.begin("mu");
    		                    } else if (yy_.yytext.slice(-1) === "\\") {
    		                        strip(0, 1);
    		                        this.begin("emu");
    		                    } else {
    		                        this.begin("mu");
    		                    }
    		                    if (yy_.yytext) return 15;

    		                    break;
    		                case 1:
    		                    return 15;
    		                case 2:
    		                    this.popState();
    		                    return 15;
    		                case 3:
    		                    this.begin('raw');return 15;
    		                case 4:
    		                    this.popState();
    		                    // Should be using `this.topState()` below, but it currently
    		                    // returns the second top instead of the first top. Opened an
    		                    // issue about it at https://github.com/zaach/jison/issues/291
    		                    if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
    		                        return 15;
    		                    } else {
    		                        strip(5, 9);
    		                        return 'END_RAW_BLOCK';
    		                    }
    		                case 5:
    		                    return 15;
    		                case 6:
    		                    this.popState();
    		                    return 14;
    		                case 7:
    		                    return 65;
    		                case 8:
    		                    return 68;
    		                case 9:
    		                    return 19;
    		                case 10:
    		                    this.popState();
    		                    this.begin('raw');
    		                    return 23;
    		                case 11:
    		                    return 55;
    		                case 12:
    		                    return 60;
    		                case 13:
    		                    return 29;
    		                case 14:
    		                    return 47;
    		                case 15:
    		                    this.popState();return 44;
    		                case 16:
    		                    this.popState();return 44;
    		                case 17:
    		                    return 34;
    		                case 18:
    		                    return 39;
    		                case 19:
    		                    return 51;
    		                case 20:
    		                    return 48;
    		                case 21:
    		                    this.unput(yy_.yytext);
    		                    this.popState();
    		                    this.begin('com');

    		                    break;
    		                case 22:
    		                    this.popState();
    		                    return 14;
    		                case 23:
    		                    return 48;
    		                case 24:
    		                    return 73;
    		                case 25:
    		                    return 72;
    		                case 26:
    		                    return 72;
    		                case 27:
    		                    return 87;
    		                case 28:
    		                    // ignore whitespace
    		                    break;
    		                case 29:
    		                    this.popState();return 54;
    		                case 30:
    		                    this.popState();return 33;
    		                case 31:
    		                    yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
    		                case 32:
    		                    yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
    		                case 33:
    		                    return 85;
    		                case 34:
    		                    return 82;
    		                case 35:
    		                    return 82;
    		                case 36:
    		                    return 83;
    		                case 37:
    		                    return 84;
    		                case 38:
    		                    return 81;
    		                case 39:
    		                    return 75;
    		                case 40:
    		                    return 77;
    		                case 41:
    		                    return 72;
    		                case 42:
    		                    yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
    		                case 43:
    		                    return 'INVALID';
    		                case 44:
    		                    return 5;
    		            }
    		        };
    		        lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
    		        lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
    		        return lexer;
    		    })();
    		    parser.lexer = lexer;
    		    function Parser() {
    		        this.yy = {};
    		    }Parser.prototype = parser;parser.Parser = Parser;
    		    return new Parser();
    		})();exports["default"] = handlebars;
    		module.exports = exports["default"];
    		
    	} (parser, parser.exports));
    	return parser.exports;
    }

    var whitespaceControl = {exports: {}};

    var visitor = {exports: {}};

    var hasRequiredVisitor;

    function requireVisitor () {
    	if (hasRequiredVisitor) return visitor.exports;
    	hasRequiredVisitor = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		// istanbul ignore next

    		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    		var _exception = /*@__PURE__*/ requireException();

    		var _exception2 = _interopRequireDefault(_exception);

    		function Visitor() {
    		  this.parents = [];
    		}

    		Visitor.prototype = {
    		  constructor: Visitor,
    		  mutating: false,

    		  // Visits a given value. If mutating, will replace the value if necessary.
    		  acceptKey: function acceptKey(node, name) {
    		    var value = this.accept(node[name]);
    		    if (this.mutating) {
    		      // Hacky sanity check: This may have a few false positives for type for the helper
    		      // methods but will generally do the right thing without a lot of overhead.
    		      if (value && !Visitor.prototype[value.type]) {
    		        throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
    		      }
    		      node[name] = value;
    		    }
    		  },

    		  // Performs an accept operation with added sanity check to ensure
    		  // required keys are not removed.
    		  acceptRequired: function acceptRequired(node, name) {
    		    this.acceptKey(node, name);

    		    if (!node[name]) {
    		      throw new _exception2['default'](node.type + ' requires ' + name);
    		    }
    		  },

    		  // Traverses a given array. If mutating, empty respnses will be removed
    		  // for child elements.
    		  acceptArray: function acceptArray(array) {
    		    for (var i = 0, l = array.length; i < l; i++) {
    		      this.acceptKey(array, i);

    		      if (!array[i]) {
    		        array.splice(i, 1);
    		        i--;
    		        l--;
    		      }
    		    }
    		  },

    		  accept: function accept(object) {
    		    if (!object) {
    		      return;
    		    }

    		    /* istanbul ignore next: Sanity code */
    		    if (!this[object.type]) {
    		      throw new _exception2['default']('Unknown type: ' + object.type, object);
    		    }

    		    if (this.current) {
    		      this.parents.unshift(this.current);
    		    }
    		    this.current = object;

    		    var ret = this[object.type](object);

    		    this.current = this.parents.shift();

    		    if (!this.mutating || ret) {
    		      return ret;
    		    } else if (ret !== false) {
    		      return object;
    		    }
    		  },

    		  Program: function Program(program) {
    		    this.acceptArray(program.body);
    		  },

    		  MustacheStatement: visitSubExpression,
    		  Decorator: visitSubExpression,

    		  BlockStatement: visitBlock,
    		  DecoratorBlock: visitBlock,

    		  PartialStatement: visitPartial,
    		  PartialBlockStatement: function PartialBlockStatement(partial) {
    		    visitPartial.call(this, partial);

    		    this.acceptKey(partial, 'program');
    		  },

    		  ContentStatement: function ContentStatement() /* content */{},
    		  CommentStatement: function CommentStatement() /* comment */{},

    		  SubExpression: visitSubExpression,

    		  PathExpression: function PathExpression() /* path */{},

    		  StringLiteral: function StringLiteral() /* string */{},
    		  NumberLiteral: function NumberLiteral() /* number */{},
    		  BooleanLiteral: function BooleanLiteral() /* bool */{},
    		  UndefinedLiteral: function UndefinedLiteral() /* literal */{},
    		  NullLiteral: function NullLiteral() /* literal */{},

    		  Hash: function Hash(hash) {
    		    this.acceptArray(hash.pairs);
    		  },
    		  HashPair: function HashPair(pair) {
    		    this.acceptRequired(pair, 'value');
    		  }
    		};

    		function visitSubExpression(mustache) {
    		  this.acceptRequired(mustache, 'path');
    		  this.acceptArray(mustache.params);
    		  this.acceptKey(mustache, 'hash');
    		}
    		function visitBlock(block) {
    		  visitSubExpression.call(this, block);

    		  this.acceptKey(block, 'program');
    		  this.acceptKey(block, 'inverse');
    		}
    		function visitPartial(partial) {
    		  this.acceptRequired(partial, 'name');
    		  this.acceptArray(partial.params);
    		  this.acceptKey(partial, 'hash');
    		}

    		exports['default'] = Visitor;
    		module.exports = exports['default'];
    		
    	} (visitor, visitor.exports));
    	return visitor.exports;
    }

    var hasRequiredWhitespaceControl;

    function requireWhitespaceControl () {
    	if (hasRequiredWhitespaceControl) return whitespaceControl.exports;
    	hasRequiredWhitespaceControl = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		// istanbul ignore next

    		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    		var _visitor = /*@__PURE__*/ requireVisitor();

    		var _visitor2 = _interopRequireDefault(_visitor);

    		function WhitespaceControl() {
    		  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    		  this.options = options;
    		}
    		WhitespaceControl.prototype = new _visitor2['default']();

    		WhitespaceControl.prototype.Program = function (program) {
    		  var doStandalone = !this.options.ignoreStandalone;

    		  var isRoot = !this.isRootSeen;
    		  this.isRootSeen = true;

    		  var body = program.body;
    		  for (var i = 0, l = body.length; i < l; i++) {
    		    var current = body[i],
    		        strip = this.accept(current);

    		    if (!strip) {
    		      continue;
    		    }

    		    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
    		        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
    		        openStandalone = strip.openStandalone && _isPrevWhitespace,
    		        closeStandalone = strip.closeStandalone && _isNextWhitespace,
    		        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

    		    if (strip.close) {
    		      omitRight(body, i, true);
    		    }
    		    if (strip.open) {
    		      omitLeft(body, i, true);
    		    }

    		    if (doStandalone && inlineStandalone) {
    		      omitRight(body, i);

    		      if (omitLeft(body, i)) {
    		        // If we are on a standalone node, save the indent info for partials
    		        if (current.type === 'PartialStatement') {
    		          // Pull out the whitespace from the final line
    		          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
    		        }
    		      }
    		    }
    		    if (doStandalone && openStandalone) {
    		      omitRight((current.program || current.inverse).body);

    		      // Strip out the previous content node if it's whitespace only
    		      omitLeft(body, i);
    		    }
    		    if (doStandalone && closeStandalone) {
    		      // Always strip the next node
    		      omitRight(body, i);

    		      omitLeft((current.inverse || current.program).body);
    		    }
    		  }

    		  return program;
    		};

    		WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
    		  this.accept(block.program);
    		  this.accept(block.inverse);

    		  // Find the inverse program that is involed with whitespace stripping.
    		  var program = block.program || block.inverse,
    		      inverse = block.program && block.inverse,
    		      firstInverse = inverse,
    		      lastInverse = inverse;

    		  if (inverse && inverse.chained) {
    		    firstInverse = inverse.body[0].program;

    		    // Walk the inverse chain to find the last inverse that is actually in the chain.
    		    while (lastInverse.chained) {
    		      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
    		    }
    		  }

    		  var strip = {
    		    open: block.openStrip.open,
    		    close: block.closeStrip.close,

    		    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
    		    // so our parent can determine if we actually are standalone
    		    openStandalone: isNextWhitespace(program.body),
    		    closeStandalone: isPrevWhitespace((firstInverse || program).body)
    		  };

    		  if (block.openStrip.close) {
    		    omitRight(program.body, null, true);
    		  }

    		  if (inverse) {
    		    var inverseStrip = block.inverseStrip;

    		    if (inverseStrip.open) {
    		      omitLeft(program.body, null, true);
    		    }

    		    if (inverseStrip.close) {
    		      omitRight(firstInverse.body, null, true);
    		    }
    		    if (block.closeStrip.open) {
    		      omitLeft(lastInverse.body, null, true);
    		    }

    		    // Find standalone else statments
    		    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
    		      omitLeft(program.body);
    		      omitRight(firstInverse.body);
    		    }
    		  } else if (block.closeStrip.open) {
    		    omitLeft(program.body, null, true);
    		  }

    		  return strip;
    		};

    		WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
    		  return mustache.strip;
    		};

    		WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
    		  /* istanbul ignore next */
    		  var strip = node.strip || {};
    		  return {
    		    inlineStandalone: true,
    		    open: strip.open,
    		    close: strip.close
    		  };
    		};

    		function isPrevWhitespace(body, i, isRoot) {
    		  if (i === undefined) {
    		    i = body.length;
    		  }

    		  // Nodes that end with newlines are considered whitespace (but are special
    		  // cased for strip operations)
    		  var prev = body[i - 1],
    		      sibling = body[i - 2];
    		  if (!prev) {
    		    return isRoot;
    		  }

    		  if (prev.type === 'ContentStatement') {
    		    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
    		  }
    		}
    		function isNextWhitespace(body, i, isRoot) {
    		  if (i === undefined) {
    		    i = -1;
    		  }

    		  var next = body[i + 1],
    		      sibling = body[i + 2];
    		  if (!next) {
    		    return isRoot;
    		  }

    		  if (next.type === 'ContentStatement') {
    		    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
    		  }
    		}

    		// Marks the node to the right of the position as omitted.
    		// I.e. {{foo}}' ' will mark the ' ' node as omitted.
    		//
    		// If i is undefined, then the first child will be marked as such.
    		//
    		// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
    		// content is met.
    		function omitRight(body, i, multiple) {
    		  var current = body[i == null ? 0 : i + 1];
    		  if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
    		    return;
    		  }

    		  var original = current.value;
    		  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
    		  current.rightStripped = current.value !== original;
    		}

    		// Marks the node to the left of the position as omitted.
    		// I.e. ' '{{foo}} will mark the ' ' node as omitted.
    		//
    		// If i is undefined then the last child will be marked as such.
    		//
    		// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
    		// content is met.
    		function omitLeft(body, i, multiple) {
    		  var current = body[i == null ? body.length - 1 : i - 1];
    		  if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
    		    return;
    		  }

    		  // We omit the last node if it's whitespace only and not preceded by a non-content node.
    		  var original = current.value;
    		  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
    		  current.leftStripped = current.value !== original;
    		  return current.leftStripped;
    		}

    		exports['default'] = WhitespaceControl;
    		module.exports = exports['default'];
    		
    	} (whitespaceControl, whitespaceControl.exports));
    	return whitespaceControl.exports;
    }

    var helpers = {};

    var hasRequiredHelpers;

    function requireHelpers () {
    	if (hasRequiredHelpers) return helpers;
    	hasRequiredHelpers = 1;

    	helpers.__esModule = true;
    	helpers.SourceLocation = SourceLocation;
    	helpers.id = id;
    	helpers.stripFlags = stripFlags;
    	helpers.stripComment = stripComment;
    	helpers.preparePath = preparePath;
    	helpers.prepareMustache = prepareMustache;
    	helpers.prepareRawBlock = prepareRawBlock;
    	helpers.prepareBlock = prepareBlock;
    	helpers.prepareProgram = prepareProgram;
    	helpers.preparePartialBlock = preparePartialBlock;
    	// istanbul ignore next

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    	var _exception = /*@__PURE__*/ requireException();

    	var _exception2 = _interopRequireDefault(_exception);

    	function validateClose(open, close) {
    	  close = close.path ? close.path.original : close;

    	  if (open.path.original !== close) {
    	    var errorNode = { loc: open.path.loc };

    	    throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
    	  }
    	}

    	function SourceLocation(source, locInfo) {
    	  this.source = source;
    	  this.start = {
    	    line: locInfo.first_line,
    	    column: locInfo.first_column
    	  };
    	  this.end = {
    	    line: locInfo.last_line,
    	    column: locInfo.last_column
    	  };
    	}

    	function id(token) {
    	  if (/^\[.*\]$/.test(token)) {
    	    return token.substring(1, token.length - 1);
    	  } else {
    	    return token;
    	  }
    	}

    	function stripFlags(open, close) {
    	  return {
    	    open: open.charAt(2) === '~',
    	    close: close.charAt(close.length - 3) === '~'
    	  };
    	}

    	function stripComment(comment) {
    	  return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
    	}

    	function preparePath(data, parts, loc) {
    	  loc = this.locInfo(loc);

    	  var original = data ? '@' : '',
    	      dig = [],
    	      depth = 0;

    	  for (var i = 0, l = parts.length; i < l; i++) {
    	    var part = parts[i].part,

    	    // If we have [] syntax then we do not treat path references as operators,
    	    // i.e. foo.[this] resolves to approximately context.foo['this']
    	    isLiteral = parts[i].original !== part;
    	    original += (parts[i].separator || '') + part;

    	    if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
    	      if (dig.length > 0) {
    	        throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
    	      } else if (part === '..') {
    	        depth++;
    	      }
    	    } else {
    	      dig.push(part);
    	    }
    	  }

    	  return {
    	    type: 'PathExpression',
    	    data: data,
    	    depth: depth,
    	    parts: dig,
    	    original: original,
    	    loc: loc
    	  };
    	}

    	function prepareMustache(path, params, hash, open, strip, locInfo) {
    	  // Must use charAt to support IE pre-10
    	  var escapeFlag = open.charAt(3) || open.charAt(2),
    	      escaped = escapeFlag !== '{' && escapeFlag !== '&';

    	  var decorator = /\*/.test(open);
    	  return {
    	    type: decorator ? 'Decorator' : 'MustacheStatement',
    	    path: path,
    	    params: params,
    	    hash: hash,
    	    escaped: escaped,
    	    strip: strip,
    	    loc: this.locInfo(locInfo)
    	  };
    	}

    	function prepareRawBlock(openRawBlock, contents, close, locInfo) {
    	  validateClose(openRawBlock, close);

    	  locInfo = this.locInfo(locInfo);
    	  var program = {
    	    type: 'Program',
    	    body: contents,
    	    strip: {},
    	    loc: locInfo
    	  };

    	  return {
    	    type: 'BlockStatement',
    	    path: openRawBlock.path,
    	    params: openRawBlock.params,
    	    hash: openRawBlock.hash,
    	    program: program,
    	    openStrip: {},
    	    inverseStrip: {},
    	    closeStrip: {},
    	    loc: locInfo
    	  };
    	}

    	function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
    	  if (close && close.path) {
    	    validateClose(openBlock, close);
    	  }

    	  var decorator = /\*/.test(openBlock.open);

    	  program.blockParams = openBlock.blockParams;

    	  var inverse = undefined,
    	      inverseStrip = undefined;

    	  if (inverseAndProgram) {
    	    if (decorator) {
    	      throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
    	    }

    	    if (inverseAndProgram.chain) {
    	      inverseAndProgram.program.body[0].closeStrip = close.strip;
    	    }

    	    inverseStrip = inverseAndProgram.strip;
    	    inverse = inverseAndProgram.program;
    	  }

    	  if (inverted) {
    	    inverted = inverse;
    	    inverse = program;
    	    program = inverted;
    	  }

    	  return {
    	    type: decorator ? 'DecoratorBlock' : 'BlockStatement',
    	    path: openBlock.path,
    	    params: openBlock.params,
    	    hash: openBlock.hash,
    	    program: program,
    	    inverse: inverse,
    	    openStrip: openBlock.strip,
    	    inverseStrip: inverseStrip,
    	    closeStrip: close && close.strip,
    	    loc: this.locInfo(locInfo)
    	  };
    	}

    	function prepareProgram(statements, loc) {
    	  if (!loc && statements.length) {
    	    var firstLoc = statements[0].loc,
    	        lastLoc = statements[statements.length - 1].loc;

    	    /* istanbul ignore else */
    	    if (firstLoc && lastLoc) {
    	      loc = {
    	        source: firstLoc.source,
    	        start: {
    	          line: firstLoc.start.line,
    	          column: firstLoc.start.column
    	        },
    	        end: {
    	          line: lastLoc.end.line,
    	          column: lastLoc.end.column
    	        }
    	      };
    	    }
    	  }

    	  return {
    	    type: 'Program',
    	    body: statements,
    	    strip: {},
    	    loc: loc
    	  };
    	}

    	function preparePartialBlock(open, program, close, locInfo) {
    	  validateClose(open, close);

    	  return {
    	    type: 'PartialBlockStatement',
    	    name: open.path,
    	    params: open.params,
    	    hash: open.hash,
    	    program: program,
    	    openStrip: open.strip,
    	    closeStrip: close && close.strip,
    	    loc: this.locInfo(locInfo)
    	  };
    	}
    	
    	return helpers;
    }

    var hasRequiredBase;

    function requireBase () {
    	if (hasRequiredBase) return base;
    	hasRequiredBase = 1;

    	base.__esModule = true;
    	base.parseWithoutProcessing = parseWithoutProcessing;
    	base.parse = parse;
    	// istanbul ignore next

    	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

    	// istanbul ignore next

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    	var _parser = /*@__PURE__*/ requireParser();

    	var _parser2 = _interopRequireDefault(_parser);

    	var _whitespaceControl = /*@__PURE__*/ requireWhitespaceControl();

    	var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);

    	var _helpers = /*@__PURE__*/ requireHelpers();

    	var Helpers = _interopRequireWildcard(_helpers);

    	var _utils = /*@__PURE__*/ requireUtils();

    	base.parser = _parser2['default'];

    	var yy = {};
    	_utils.extend(yy, Helpers);

    	function parseWithoutProcessing(input, options) {
    	  // Just return if an already-compiled AST was passed in.
    	  if (input.type === 'Program') {
    	    return input;
    	  }

    	  _parser2['default'].yy = yy;

    	  // Altering the shared object here, but this is ok as parser is a sync operation
    	  yy.locInfo = function (locInfo) {
    	    return new yy.SourceLocation(options && options.srcName, locInfo);
    	  };

    	  var ast = _parser2['default'].parse(input);

    	  return ast;
    	}

    	function parse(input, options) {
    	  var ast = parseWithoutProcessing(input, options);
    	  var strip = new _whitespaceControl2['default'](options);

    	  return strip.accept(ast);
    	}
    	
    	return base;
    }

    var compiler = {};

    /* eslint-disable new-cap */

    var hasRequiredCompiler;

    function requireCompiler () {
    	if (hasRequiredCompiler) return compiler;
    	hasRequiredCompiler = 1;

    	compiler.__esModule = true;
    	compiler.Compiler = Compiler;
    	compiler.precompile = precompile;
    	compiler.compile = compile;
    	// istanbul ignore next

    	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    	var _exception = /*@__PURE__*/ requireException();

    	var _exception2 = _interopRequireDefault(_exception);

    	var _utils = /*@__PURE__*/ requireUtils();

    	var _ast = /*@__PURE__*/ requireAst();

    	var _ast2 = _interopRequireDefault(_ast);

    	var slice = [].slice;

    	function Compiler() {}

    	// the foundHelper register will disambiguate helper lookup from finding a
    	// function in a context. This is necessary for mustache compatibility, which
    	// requires that context functions in blocks are evaluated by blockHelperMissing,
    	// and then proceed as if the resulting value was provided to blockHelperMissing.

    	Compiler.prototype = {
    	  compiler: Compiler,

    	  equals: function equals(other) {
    	    var len = this.opcodes.length;
    	    if (other.opcodes.length !== len) {
    	      return false;
    	    }

    	    for (var i = 0; i < len; i++) {
    	      var opcode = this.opcodes[i],
    	          otherOpcode = other.opcodes[i];
    	      if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
    	        return false;
    	      }
    	    }

    	    // We know that length is the same between the two arrays because they are directly tied
    	    // to the opcode behavior above.
    	    len = this.children.length;
    	    for (var i = 0; i < len; i++) {
    	      if (!this.children[i].equals(other.children[i])) {
    	        return false;
    	      }
    	    }

    	    return true;
    	  },

    	  guid: 0,

    	  compile: function compile(program, options) {
    	    this.sourceNode = [];
    	    this.opcodes = [];
    	    this.children = [];
    	    this.options = options;
    	    this.stringParams = options.stringParams;
    	    this.trackIds = options.trackIds;

    	    options.blockParams = options.blockParams || [];

    	    options.knownHelpers = _utils.extend(Object.create(null), {
    	      helperMissing: true,
    	      blockHelperMissing: true,
    	      each: true,
    	      'if': true,
    	      unless: true,
    	      'with': true,
    	      log: true,
    	      lookup: true
    	    }, options.knownHelpers);

    	    return this.accept(program);
    	  },

    	  compileProgram: function compileProgram(program) {
    	    var childCompiler = new this.compiler(),
    	        // eslint-disable-line new-cap
    	    result = childCompiler.compile(program, this.options),
    	        guid = this.guid++;

    	    this.usePartial = this.usePartial || result.usePartial;

    	    this.children[guid] = result;
    	    this.useDepths = this.useDepths || result.useDepths;

    	    return guid;
    	  },

    	  accept: function accept(node) {
    	    /* istanbul ignore next: Sanity code */
    	    if (!this[node.type]) {
    	      throw new _exception2['default']('Unknown type: ' + node.type, node);
    	    }

    	    this.sourceNode.unshift(node);
    	    var ret = this[node.type](node);
    	    this.sourceNode.shift();
    	    return ret;
    	  },

    	  Program: function Program(program) {
    	    this.options.blockParams.unshift(program.blockParams);

    	    var body = program.body,
    	        bodyLength = body.length;
    	    for (var i = 0; i < bodyLength; i++) {
    	      this.accept(body[i]);
    	    }

    	    this.options.blockParams.shift();

    	    this.isSimple = bodyLength === 1;
    	    this.blockParams = program.blockParams ? program.blockParams.length : 0;

    	    return this;
    	  },

    	  BlockStatement: function BlockStatement(block) {
    	    transformLiteralToPath(block);

    	    var program = block.program,
    	        inverse = block.inverse;

    	    program = program && this.compileProgram(program);
    	    inverse = inverse && this.compileProgram(inverse);

    	    var type = this.classifySexpr(block);

    	    if (type === 'helper') {
    	      this.helperSexpr(block, program, inverse);
    	    } else if (type === 'simple') {
    	      this.simpleSexpr(block);

    	      // now that the simple mustache is resolved, we need to
    	      // evaluate it by executing `blockHelperMissing`
    	      this.opcode('pushProgram', program);
    	      this.opcode('pushProgram', inverse);
    	      this.opcode('emptyHash');
    	      this.opcode('blockValue', block.path.original);
    	    } else {
    	      this.ambiguousSexpr(block, program, inverse);

    	      // now that the simple mustache is resolved, we need to
    	      // evaluate it by executing `blockHelperMissing`
    	      this.opcode('pushProgram', program);
    	      this.opcode('pushProgram', inverse);
    	      this.opcode('emptyHash');
    	      this.opcode('ambiguousBlockValue');
    	    }

    	    this.opcode('append');
    	  },

    	  DecoratorBlock: function DecoratorBlock(decorator) {
    	    var program = decorator.program && this.compileProgram(decorator.program);
    	    var params = this.setupFullMustacheParams(decorator, program, undefined),
    	        path = decorator.path;

    	    this.useDecorators = true;
    	    this.opcode('registerDecorator', params.length, path.original);
    	  },

    	  PartialStatement: function PartialStatement(partial) {
    	    this.usePartial = true;

    	    var program = partial.program;
    	    if (program) {
    	      program = this.compileProgram(partial.program);
    	    }

    	    var params = partial.params;
    	    if (params.length > 1) {
    	      throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
    	    } else if (!params.length) {
    	      if (this.options.explicitPartialContext) {
    	        this.opcode('pushLiteral', 'undefined');
    	      } else {
    	        params.push({ type: 'PathExpression', parts: [], depth: 0 });
    	      }
    	    }

    	    var partialName = partial.name.original,
    	        isDynamic = partial.name.type === 'SubExpression';
    	    if (isDynamic) {
    	      this.accept(partial.name);
    	    }

    	    this.setupFullMustacheParams(partial, program, undefined, true);

    	    var indent = partial.indent || '';
    	    if (this.options.preventIndent && indent) {
    	      this.opcode('appendContent', indent);
    	      indent = '';
    	    }

    	    this.opcode('invokePartial', isDynamic, partialName, indent);
    	    this.opcode('append');
    	  },
    	  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
    	    this.PartialStatement(partialBlock);
    	  },

    	  MustacheStatement: function MustacheStatement(mustache) {
    	    this.SubExpression(mustache);

    	    if (mustache.escaped && !this.options.noEscape) {
    	      this.opcode('appendEscaped');
    	    } else {
    	      this.opcode('append');
    	    }
    	  },
    	  Decorator: function Decorator(decorator) {
    	    this.DecoratorBlock(decorator);
    	  },

    	  ContentStatement: function ContentStatement(content) {
    	    if (content.value) {
    	      this.opcode('appendContent', content.value);
    	    }
    	  },

    	  CommentStatement: function CommentStatement() {},

    	  SubExpression: function SubExpression(sexpr) {
    	    transformLiteralToPath(sexpr);
    	    var type = this.classifySexpr(sexpr);

    	    if (type === 'simple') {
    	      this.simpleSexpr(sexpr);
    	    } else if (type === 'helper') {
    	      this.helperSexpr(sexpr);
    	    } else {
    	      this.ambiguousSexpr(sexpr);
    	    }
    	  },
    	  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
    	    var path = sexpr.path,
    	        name = path.parts[0],
    	        isBlock = program != null || inverse != null;

    	    this.opcode('getContext', path.depth);

    	    this.opcode('pushProgram', program);
    	    this.opcode('pushProgram', inverse);

    	    path.strict = true;
    	    this.accept(path);

    	    this.opcode('invokeAmbiguous', name, isBlock);
    	  },

    	  simpleSexpr: function simpleSexpr(sexpr) {
    	    var path = sexpr.path;
    	    path.strict = true;
    	    this.accept(path);
    	    this.opcode('resolvePossibleLambda');
    	  },

    	  helperSexpr: function helperSexpr(sexpr, program, inverse) {
    	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
    	        path = sexpr.path,
    	        name = path.parts[0];

    	    if (this.options.knownHelpers[name]) {
    	      this.opcode('invokeKnownHelper', params.length, name);
    	    } else if (this.options.knownHelpersOnly) {
    	      throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
    	    } else {
    	      path.strict = true;
    	      path.falsy = true;

    	      this.accept(path);
    	      this.opcode('invokeHelper', params.length, path.original, _ast2['default'].helpers.simpleId(path));
    	    }
    	  },

    	  PathExpression: function PathExpression(path) {
    	    this.addDepth(path.depth);
    	    this.opcode('getContext', path.depth);

    	    var name = path.parts[0],
    	        scoped = _ast2['default'].helpers.scopedId(path),
    	        blockParamId = !path.depth && !scoped && this.blockParamIndex(name);

    	    if (blockParamId) {
    	      this.opcode('lookupBlockParam', blockParamId, path.parts);
    	    } else if (!name) {
    	      // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
    	      this.opcode('pushContext');
    	    } else if (path.data) {
    	      this.options.data = true;
    	      this.opcode('lookupData', path.depth, path.parts, path.strict);
    	    } else {
    	      this.opcode('lookupOnContext', path.parts, path.falsy, path.strict, scoped);
    	    }
    	  },

    	  StringLiteral: function StringLiteral(string) {
    	    this.opcode('pushString', string.value);
    	  },

    	  NumberLiteral: function NumberLiteral(number) {
    	    this.opcode('pushLiteral', number.value);
    	  },

    	  BooleanLiteral: function BooleanLiteral(bool) {
    	    this.opcode('pushLiteral', bool.value);
    	  },

    	  UndefinedLiteral: function UndefinedLiteral() {
    	    this.opcode('pushLiteral', 'undefined');
    	  },

    	  NullLiteral: function NullLiteral() {
    	    this.opcode('pushLiteral', 'null');
    	  },

    	  Hash: function Hash(hash) {
    	    var pairs = hash.pairs,
    	        i = 0,
    	        l = pairs.length;

    	    this.opcode('pushHash');

    	    for (; i < l; i++) {
    	      this.pushParam(pairs[i].value);
    	    }
    	    while (i--) {
    	      this.opcode('assignToHash', pairs[i].key);
    	    }
    	    this.opcode('popHash');
    	  },

    	  // HELPERS
    	  opcode: function opcode(name) {
    	    this.opcodes.push({
    	      opcode: name,
    	      args: slice.call(arguments, 1),
    	      loc: this.sourceNode[0].loc
    	    });
    	  },

    	  addDepth: function addDepth(depth) {
    	    if (!depth) {
    	      return;
    	    }

    	    this.useDepths = true;
    	  },

    	  classifySexpr: function classifySexpr(sexpr) {
    	    var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

    	    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

    	    // a mustache is an eligible helper if:
    	    // * its id is simple (a single part, not `this` or `..`)
    	    var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

    	    // if a mustache is an eligible helper but not a definite
    	    // helper, it is ambiguous, and will be resolved in a later
    	    // pass or at runtime.
    	    var isEligible = !isBlockParam && (isHelper || isSimple);

    	    // if ambiguous, we can possibly resolve the ambiguity now
    	    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
    	    if (isEligible && !isHelper) {
    	      var _name = sexpr.path.parts[0],
    	          options = this.options;
    	      if (options.knownHelpers[_name]) {
    	        isHelper = true;
    	      } else if (options.knownHelpersOnly) {
    	        isEligible = false;
    	      }
    	    }

    	    if (isHelper) {
    	      return 'helper';
    	    } else if (isEligible) {
    	      return 'ambiguous';
    	    } else {
    	      return 'simple';
    	    }
    	  },

    	  pushParams: function pushParams(params) {
    	    for (var i = 0, l = params.length; i < l; i++) {
    	      this.pushParam(params[i]);
    	    }
    	  },

    	  pushParam: function pushParam(val) {
    	    var value = val.value != null ? val.value : val.original || '';

    	    if (this.stringParams) {
    	      if (value.replace) {
    	        value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
    	      }

    	      if (val.depth) {
    	        this.addDepth(val.depth);
    	      }
    	      this.opcode('getContext', val.depth || 0);
    	      this.opcode('pushStringParam', value, val.type);

    	      if (val.type === 'SubExpression') {
    	        // SubExpressions get evaluated and passed in
    	        // in string params mode.
    	        this.accept(val);
    	      }
    	    } else {
    	      if (this.trackIds) {
    	        var blockParamIndex = undefined;
    	        if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
    	          blockParamIndex = this.blockParamIndex(val.parts[0]);
    	        }
    	        if (blockParamIndex) {
    	          var blockParamChild = val.parts.slice(1).join('.');
    	          this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
    	        } else {
    	          value = val.original || value;
    	          if (value.replace) {
    	            value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
    	          }

    	          this.opcode('pushId', val.type, value);
    	        }
    	      }
    	      this.accept(val);
    	    }
    	  },

    	  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
    	    var params = sexpr.params;
    	    this.pushParams(params);

    	    this.opcode('pushProgram', program);
    	    this.opcode('pushProgram', inverse);

    	    if (sexpr.hash) {
    	      this.accept(sexpr.hash);
    	    } else {
    	      this.opcode('emptyHash', omitEmpty);
    	    }

    	    return params;
    	  },

    	  blockParamIndex: function blockParamIndex(name) {
    	    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
    	      var blockParams = this.options.blockParams[depth],
    	          param = blockParams && _utils.indexOf(blockParams, name);
    	      if (blockParams && param >= 0) {
    	        return [depth, param];
    	      }
    	    }
    	  }
    	};

    	function precompile(input, options, env) {
    	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
    	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
    	  }

    	  options = options || {};
    	  if (!('data' in options)) {
    	    options.data = true;
    	  }
    	  if (options.compat) {
    	    options.useDepths = true;
    	  }

    	  var ast = env.parse(input, options),
    	      environment = new env.Compiler().compile(ast, options);
    	  return new env.JavaScriptCompiler().compile(environment, options);
    	}

    	function compile(input, options, env) {
    	  if (options === undefined) options = {};

    	  if (input == null || typeof input !== 'string' && input.type !== 'Program') {
    	    throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
    	  }

    	  options = _utils.extend({}, options);
    	  if (!('data' in options)) {
    	    options.data = true;
    	  }
    	  if (options.compat) {
    	    options.useDepths = true;
    	  }

    	  var compiled = undefined;

    	  function compileInput() {
    	    var ast = env.parse(input, options),
    	        environment = new env.Compiler().compile(ast, options),
    	        templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
    	    return env.template(templateSpec);
    	  }

    	  // Template is only compiled on first use and cached after that point.
    	  function ret(context, execOptions) {
    	    if (!compiled) {
    	      compiled = compileInput();
    	    }
    	    return compiled.call(this, context, execOptions);
    	  }
    	  ret._setup = function (setupOptions) {
    	    if (!compiled) {
    	      compiled = compileInput();
    	    }
    	    return compiled._setup(setupOptions);
    	  };
    	  ret._child = function (i, data, blockParams, depths) {
    	    if (!compiled) {
    	      compiled = compileInput();
    	    }
    	    return compiled._child(i, data, blockParams, depths);
    	  };
    	  return ret;
    	}

    	function argEquals(a, b) {
    	  if (a === b) {
    	    return true;
    	  }

    	  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
    	    for (var i = 0; i < a.length; i++) {
    	      if (!argEquals(a[i], b[i])) {
    	        return false;
    	      }
    	    }
    	    return true;
    	  }
    	}

    	function transformLiteralToPath(sexpr) {
    	  if (!sexpr.path.parts) {
    	    var literal = sexpr.path;
    	    // Casting to string here to make false and 0 literal values play nicely with the rest
    	    // of the system.
    	    sexpr.path = {
    	      type: 'PathExpression',
    	      data: false,
    	      depth: 0,
    	      parts: [literal.original + ''],
    	      original: literal.original + '',
    	      loc: literal.loc
    	    };
    	  }
    	}
    	
    	return compiler;
    }

    var javascriptCompiler = {exports: {}};

    var codeGen = {exports: {}};

    var sourceMap = {};

    var sourceMapGenerator = {};

    var base64Vlq = {};

    var base64 = {};

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredBase64;

    function requireBase64 () {
    	if (hasRequiredBase64) return base64;
    	hasRequiredBase64 = 1;
    	/*
    	 * Copyright 2011 Mozilla Foundation and contributors
    	 * Licensed under the New BSD license. See LICENSE or:
    	 * http://opensource.org/licenses/BSD-3-Clause
    	 */

    	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

    	/**
    	 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
    	 */
    	base64.encode = function (number) {
    	  if (0 <= number && number < intToCharMap.length) {
    	    return intToCharMap[number];
    	  }
    	  throw new TypeError("Must be between 0 and 63: " + number);
    	};

    	/**
    	 * Decode a single base 64 character code digit to an integer. Returns -1 on
    	 * failure.
    	 */
    	base64.decode = function (charCode) {
    	  var bigA = 65;     // 'A'
    	  var bigZ = 90;     // 'Z'

    	  var littleA = 97;  // 'a'
    	  var littleZ = 122; // 'z'

    	  var zero = 48;     // '0'
    	  var nine = 57;     // '9'

    	  var plus = 43;     // '+'
    	  var slash = 47;    // '/'

    	  var littleOffset = 26;
    	  var numberOffset = 52;

    	  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
    	  if (bigA <= charCode && charCode <= bigZ) {
    	    return (charCode - bigA);
    	  }

    	  // 26 - 51: abcdefghijklmnopqrstuvwxyz
    	  if (littleA <= charCode && charCode <= littleZ) {
    	    return (charCode - littleA + littleOffset);
    	  }

    	  // 52 - 61: 0123456789
    	  if (zero <= charCode && charCode <= nine) {
    	    return (charCode - zero + numberOffset);
    	  }

    	  // 62: +
    	  if (charCode == plus) {
    	    return 62;
    	  }

    	  // 63: /
    	  if (charCode == slash) {
    	    return 63;
    	  }

    	  // Invalid base64 digit.
    	  return -1;
    	};
    	return base64;
    }

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredBase64Vlq;

    function requireBase64Vlq () {
    	if (hasRequiredBase64Vlq) return base64Vlq;
    	hasRequiredBase64Vlq = 1;
    	/*
    	 * Copyright 2011 Mozilla Foundation and contributors
    	 * Licensed under the New BSD license. See LICENSE or:
    	 * http://opensource.org/licenses/BSD-3-Clause
    	 *
    	 * Based on the Base 64 VLQ implementation in Closure Compiler:
    	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
    	 *
    	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
    	 * Redistribution and use in source and binary forms, with or without
    	 * modification, are permitted provided that the following conditions are
    	 * met:
    	 *
    	 *  * Redistributions of source code must retain the above copyright
    	 *    notice, this list of conditions and the following disclaimer.
    	 *  * Redistributions in binary form must reproduce the above
    	 *    copyright notice, this list of conditions and the following
    	 *    disclaimer in the documentation and/or other materials provided
    	 *    with the distribution.
    	 *  * Neither the name of Google Inc. nor the names of its
    	 *    contributors may be used to endorse or promote products derived
    	 *    from this software without specific prior written permission.
    	 *
    	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
    	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
    	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
    	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
    	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
    	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
    	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    	 */

    	var base64 = /*@__PURE__*/ requireBase64();

    	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
    	// length quantities we use in the source map spec, the first bit is the sign,
    	// the next four bits are the actual value, and the 6th bit is the
    	// continuation bit. The continuation bit tells us whether there are more
    	// digits in this value following this digit.
    	//
    	//   Continuation
    	//   |    Sign
    	//   |    |
    	//   V    V
    	//   101011

    	var VLQ_BASE_SHIFT = 5;

    	// binary: 100000
    	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

    	// binary: 011111
    	var VLQ_BASE_MASK = VLQ_BASE - 1;

    	// binary: 100000
    	var VLQ_CONTINUATION_BIT = VLQ_BASE;

    	/**
    	 * Converts from a two-complement value to a value where the sign bit is
    	 * placed in the least significant bit.  For example, as decimals:
    	 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
    	 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
    	 */
    	function toVLQSigned(aValue) {
    	  return aValue < 0
    	    ? ((-aValue) << 1) + 1
    	    : (aValue << 1) + 0;
    	}

    	/**
    	 * Converts to a two-complement value from a value where the sign bit is
    	 * placed in the least significant bit.  For example, as decimals:
    	 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
    	 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
    	 */
    	function fromVLQSigned(aValue) {
    	  var isNegative = (aValue & 1) === 1;
    	  var shifted = aValue >> 1;
    	  return isNegative
    	    ? -shifted
    	    : shifted;
    	}

    	/**
    	 * Returns the base 64 VLQ encoded value.
    	 */
    	base64Vlq.encode = function base64VLQ_encode(aValue) {
    	  var encoded = "";
    	  var digit;

    	  var vlq = toVLQSigned(aValue);

    	  do {
    	    digit = vlq & VLQ_BASE_MASK;
    	    vlq >>>= VLQ_BASE_SHIFT;
    	    if (vlq > 0) {
    	      // There are still more digits in this value, so we must make sure the
    	      // continuation bit is marked.
    	      digit |= VLQ_CONTINUATION_BIT;
    	    }
    	    encoded += base64.encode(digit);
    	  } while (vlq > 0);

    	  return encoded;
    	};

    	/**
    	 * Decodes the next base 64 VLQ value from the given string and returns the
    	 * value and the rest of the string via the out parameter.
    	 */
    	base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
    	  var strLen = aStr.length;
    	  var result = 0;
    	  var shift = 0;
    	  var continuation, digit;

    	  do {
    	    if (aIndex >= strLen) {
    	      throw new Error("Expected more digits in base 64 VLQ value.");
    	    }

    	    digit = base64.decode(aStr.charCodeAt(aIndex++));
    	    if (digit === -1) {
    	      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    	    }

    	    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    	    digit &= VLQ_BASE_MASK;
    	    result = result + (digit << shift);
    	    shift += VLQ_BASE_SHIFT;
    	  } while (continuation);

    	  aOutParam.value = fromVLQSigned(result);
    	  aOutParam.rest = aIndex;
    	};
    	return base64Vlq;
    }

    var util = {};

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredUtil;

    function requireUtil () {
    	if (hasRequiredUtil) return util;
    	hasRequiredUtil = 1;
    	(function (exports) {
    		/*
    		 * Copyright 2011 Mozilla Foundation and contributors
    		 * Licensed under the New BSD license. See LICENSE or:
    		 * http://opensource.org/licenses/BSD-3-Clause
    		 */

    		/**
    		 * This is a helper function for getting values from parameter/options
    		 * objects.
    		 *
    		 * @param args The object we are extracting values from
    		 * @param name The name of the property we are getting.
    		 * @param defaultValue An optional value to return if the property is missing
    		 * from the object. If this is not specified and the property is missing, an
    		 * error will be thrown.
    		 */
    		function getArg(aArgs, aName, aDefaultValue) {
    		  if (aName in aArgs) {
    		    return aArgs[aName];
    		  } else if (arguments.length === 3) {
    		    return aDefaultValue;
    		  } else {
    		    throw new Error('"' + aName + '" is a required argument.');
    		  }
    		}
    		exports.getArg = getArg;

    		var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    		var dataUrlRegexp = /^data:.+\,.+$/;

    		function urlParse(aUrl) {
    		  var match = aUrl.match(urlRegexp);
    		  if (!match) {
    		    return null;
    		  }
    		  return {
    		    scheme: match[1],
    		    auth: match[2],
    		    host: match[3],
    		    port: match[4],
    		    path: match[5]
    		  };
    		}
    		exports.urlParse = urlParse;

    		function urlGenerate(aParsedUrl) {
    		  var url = '';
    		  if (aParsedUrl.scheme) {
    		    url += aParsedUrl.scheme + ':';
    		  }
    		  url += '//';
    		  if (aParsedUrl.auth) {
    		    url += aParsedUrl.auth + '@';
    		  }
    		  if (aParsedUrl.host) {
    		    url += aParsedUrl.host;
    		  }
    		  if (aParsedUrl.port) {
    		    url += ":" + aParsedUrl.port;
    		  }
    		  if (aParsedUrl.path) {
    		    url += aParsedUrl.path;
    		  }
    		  return url;
    		}
    		exports.urlGenerate = urlGenerate;

    		/**
    		 * Normalizes a path, or the path portion of a URL:
    		 *
    		 * - Replaces consecutive slashes with one slash.
    		 * - Removes unnecessary '.' parts.
    		 * - Removes unnecessary '<dir>/..' parts.
    		 *
    		 * Based on code in the Node.js 'path' core module.
    		 *
    		 * @param aPath The path or url to normalize.
    		 */
    		function normalize(aPath) {
    		  var path = aPath;
    		  var url = urlParse(aPath);
    		  if (url) {
    		    if (!url.path) {
    		      return aPath;
    		    }
    		    path = url.path;
    		  }
    		  var isAbsolute = exports.isAbsolute(path);

    		  var parts = path.split(/\/+/);
    		  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    		    part = parts[i];
    		    if (part === '.') {
    		      parts.splice(i, 1);
    		    } else if (part === '..') {
    		      up++;
    		    } else if (up > 0) {
    		      if (part === '') {
    		        // The first part is blank if the path is absolute. Trying to go
    		        // above the root is a no-op. Therefore we can remove all '..' parts
    		        // directly after the root.
    		        parts.splice(i + 1, up);
    		        up = 0;
    		      } else {
    		        parts.splice(i, 2);
    		        up--;
    		      }
    		    }
    		  }
    		  path = parts.join('/');

    		  if (path === '') {
    		    path = isAbsolute ? '/' : '.';
    		  }

    		  if (url) {
    		    url.path = path;
    		    return urlGenerate(url);
    		  }
    		  return path;
    		}
    		exports.normalize = normalize;

    		/**
    		 * Joins two paths/URLs.
    		 *
    		 * @param aRoot The root path or URL.
    		 * @param aPath The path or URL to be joined with the root.
    		 *
    		 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
    		 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
    		 *   first.
    		 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
    		 *   is updated with the result and aRoot is returned. Otherwise the result
    		 *   is returned.
    		 *   - If aPath is absolute, the result is aPath.
    		 *   - Otherwise the two paths are joined with a slash.
    		 * - Joining for example 'http://' and 'www.example.com' is also supported.
    		 */
    		function join(aRoot, aPath) {
    		  if (aRoot === "") {
    		    aRoot = ".";
    		  }
    		  if (aPath === "") {
    		    aPath = ".";
    		  }
    		  var aPathUrl = urlParse(aPath);
    		  var aRootUrl = urlParse(aRoot);
    		  if (aRootUrl) {
    		    aRoot = aRootUrl.path || '/';
    		  }

    		  // `join(foo, '//www.example.org')`
    		  if (aPathUrl && !aPathUrl.scheme) {
    		    if (aRootUrl) {
    		      aPathUrl.scheme = aRootUrl.scheme;
    		    }
    		    return urlGenerate(aPathUrl);
    		  }

    		  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    		    return aPath;
    		  }

    		  // `join('http://', 'www.example.com')`
    		  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    		    aRootUrl.host = aPath;
    		    return urlGenerate(aRootUrl);
    		  }

    		  var joined = aPath.charAt(0) === '/'
    		    ? aPath
    		    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

    		  if (aRootUrl) {
    		    aRootUrl.path = joined;
    		    return urlGenerate(aRootUrl);
    		  }
    		  return joined;
    		}
    		exports.join = join;

    		exports.isAbsolute = function (aPath) {
    		  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
    		};

    		/**
    		 * Make a path relative to a URL or another path.
    		 *
    		 * @param aRoot The root path or URL.
    		 * @param aPath The path or URL to be made relative to aRoot.
    		 */
    		function relative(aRoot, aPath) {
    		  if (aRoot === "") {
    		    aRoot = ".";
    		  }

    		  aRoot = aRoot.replace(/\/$/, '');

    		  // It is possible for the path to be above the root. In this case, simply
    		  // checking whether the root is a prefix of the path won't work. Instead, we
    		  // need to remove components from the root one by one, until either we find
    		  // a prefix that fits, or we run out of components to remove.
    		  var level = 0;
    		  while (aPath.indexOf(aRoot + '/') !== 0) {
    		    var index = aRoot.lastIndexOf("/");
    		    if (index < 0) {
    		      return aPath;
    		    }

    		    // If the only part of the root that is left is the scheme (i.e. http://,
    		    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    		    // have exhausted all components, so the path is not relative to the root.
    		    aRoot = aRoot.slice(0, index);
    		    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
    		      return aPath;
    		    }

    		    ++level;
    		  }

    		  // Make sure we add a "../" for each component we removed from the root.
    		  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    		}
    		exports.relative = relative;

    		var supportsNullProto = (function () {
    		  var obj = Object.create(null);
    		  return !('__proto__' in obj);
    		}());

    		function identity (s) {
    		  return s;
    		}

    		/**
    		 * Because behavior goes wacky when you set `__proto__` on objects, we
    		 * have to prefix all the strings in our set with an arbitrary character.
    		 *
    		 * See https://github.com/mozilla/source-map/pull/31 and
    		 * https://github.com/mozilla/source-map/issues/30
    		 *
    		 * @param String aStr
    		 */
    		function toSetString(aStr) {
    		  if (isProtoString(aStr)) {
    		    return '$' + aStr;
    		  }

    		  return aStr;
    		}
    		exports.toSetString = supportsNullProto ? identity : toSetString;

    		function fromSetString(aStr) {
    		  if (isProtoString(aStr)) {
    		    return aStr.slice(1);
    		  }

    		  return aStr;
    		}
    		exports.fromSetString = supportsNullProto ? identity : fromSetString;

    		function isProtoString(s) {
    		  if (!s) {
    		    return false;
    		  }

    		  var length = s.length;

    		  if (length < 9 /* "__proto__".length */) {
    		    return false;
    		  }

    		  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
    		      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
    		      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
    		      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
    		      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
    		      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
    		      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
    		      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
    		      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    		    return false;
    		  }

    		  for (var i = length - 10; i >= 0; i--) {
    		    if (s.charCodeAt(i) !== 36 /* '$' */) {
    		      return false;
    		    }
    		  }

    		  return true;
    		}

    		/**
    		 * Comparator between two mappings where the original positions are compared.
    		 *
    		 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
    		 * mappings with the same original source/line/column, but different generated
    		 * line and column the same. Useful when searching for a mapping with a
    		 * stubbed out mapping.
    		 */
    		function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    		  var cmp = strcmp(mappingA.source, mappingB.source);
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = mappingA.originalLine - mappingB.originalLine;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = mappingA.originalColumn - mappingB.originalColumn;
    		  if (cmp !== 0 || onlyCompareOriginal) {
    		    return cmp;
    		  }

    		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = mappingA.generatedLine - mappingB.generatedLine;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  return strcmp(mappingA.name, mappingB.name);
    		}
    		exports.compareByOriginalPositions = compareByOriginalPositions;

    		/**
    		 * Comparator between two mappings with deflated source and name indices where
    		 * the generated positions are compared.
    		 *
    		 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
    		 * mappings with the same generated line and column, but different
    		 * source/name/original line and column the same. Useful when searching for a
    		 * mapping with a stubbed out mapping.
    		 */
    		function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
    		  var cmp = mappingA.generatedLine - mappingB.generatedLine;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    		  if (cmp !== 0 || onlyCompareGenerated) {
    		    return cmp;
    		  }

    		  cmp = strcmp(mappingA.source, mappingB.source);
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = mappingA.originalLine - mappingB.originalLine;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = mappingA.originalColumn - mappingB.originalColumn;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  return strcmp(mappingA.name, mappingB.name);
    		}
    		exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

    		function strcmp(aStr1, aStr2) {
    		  if (aStr1 === aStr2) {
    		    return 0;
    		  }

    		  if (aStr1 === null) {
    		    return 1; // aStr2 !== null
    		  }

    		  if (aStr2 === null) {
    		    return -1; // aStr1 !== null
    		  }

    		  if (aStr1 > aStr2) {
    		    return 1;
    		  }

    		  return -1;
    		}

    		/**
    		 * Comparator between two mappings with inflated source and name strings where
    		 * the generated positions are compared.
    		 */
    		function compareByGeneratedPositionsInflated(mappingA, mappingB) {
    		  var cmp = mappingA.generatedLine - mappingB.generatedLine;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = strcmp(mappingA.source, mappingB.source);
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = mappingA.originalLine - mappingB.originalLine;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  cmp = mappingA.originalColumn - mappingB.originalColumn;
    		  if (cmp !== 0) {
    		    return cmp;
    		  }

    		  return strcmp(mappingA.name, mappingB.name);
    		}
    		exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

    		/**
    		 * Strip any JSON XSSI avoidance prefix from the string (as documented
    		 * in the source maps specification), and then parse the string as
    		 * JSON.
    		 */
    		function parseSourceMapInput(str) {
    		  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
    		}
    		exports.parseSourceMapInput = parseSourceMapInput;

    		/**
    		 * Compute the URL of a source given the the source root, the source's
    		 * URL, and the source map's URL.
    		 */
    		function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
    		  sourceURL = sourceURL || '';

    		  if (sourceRoot) {
    		    // This follows what Chrome does.
    		    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
    		      sourceRoot += '/';
    		    }
    		    // The spec says:
    		    //   Line 4: An optional source root, useful for relocating source
    		    //   files on a server or removing repeated values in the
    		    //   “sources” entry.  This value is prepended to the individual
    		    //   entries in the “source” field.
    		    sourceURL = sourceRoot + sourceURL;
    		  }

    		  // Historically, SourceMapConsumer did not take the sourceMapURL as
    		  // a parameter.  This mode is still somewhat supported, which is why
    		  // this code block is conditional.  However, it's preferable to pass
    		  // the source map URL to SourceMapConsumer, so that this function
    		  // can implement the source URL resolution algorithm as outlined in
    		  // the spec.  This block is basically the equivalent of:
    		  //    new URL(sourceURL, sourceMapURL).toString()
    		  // ... except it avoids using URL, which wasn't available in the
    		  // older releases of node still supported by this library.
    		  //
    		  // The spec says:
    		  //   If the sources are not absolute URLs after prepending of the
    		  //   “sourceRoot”, the sources are resolved relative to the
    		  //   SourceMap (like resolving script src in a html document).
    		  if (sourceMapURL) {
    		    var parsed = urlParse(sourceMapURL);
    		    if (!parsed) {
    		      throw new Error("sourceMapURL could not be parsed");
    		    }
    		    if (parsed.path) {
    		      // Strip the last path component, but keep the "/".
    		      var index = parsed.path.lastIndexOf('/');
    		      if (index >= 0) {
    		        parsed.path = parsed.path.substring(0, index + 1);
    		      }
    		    }
    		    sourceURL = join(urlGenerate(parsed), sourceURL);
    		  }

    		  return normalize(sourceURL);
    		}
    		exports.computeSourceURL = computeSourceURL; 
    	} (util));
    	return util;
    }

    var arraySet = {};

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredArraySet;

    function requireArraySet () {
    	if (hasRequiredArraySet) return arraySet;
    	hasRequiredArraySet = 1;
    	/*
    	 * Copyright 2011 Mozilla Foundation and contributors
    	 * Licensed under the New BSD license. See LICENSE or:
    	 * http://opensource.org/licenses/BSD-3-Clause
    	 */

    	var util = /*@__PURE__*/ requireUtil();
    	var has = Object.prototype.hasOwnProperty;
    	var hasNativeMap = typeof Map !== "undefined";

    	/**
    	 * A data structure which is a combination of an array and a set. Adding a new
    	 * member is O(1), testing for membership is O(1), and finding the index of an
    	 * element is O(1). Removing elements from the set is not supported. Only
    	 * strings are supported for membership.
    	 */
    	function ArraySet() {
    	  this._array = [];
    	  this._set = hasNativeMap ? new Map() : Object.create(null);
    	}

    	/**
    	 * Static method for creating ArraySet instances from an existing array.
    	 */
    	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    	  var set = new ArraySet();
    	  for (var i = 0, len = aArray.length; i < len; i++) {
    	    set.add(aArray[i], aAllowDuplicates);
    	  }
    	  return set;
    	};

    	/**
    	 * Return how many unique items are in this ArraySet. If duplicates have been
    	 * added, than those do not count towards the size.
    	 *
    	 * @returns Number
    	 */
    	ArraySet.prototype.size = function ArraySet_size() {
    	  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    	};

    	/**
    	 * Add the given string to this set.
    	 *
    	 * @param String aStr
    	 */
    	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    	  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
    	  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
    	  var idx = this._array.length;
    	  if (!isDuplicate || aAllowDuplicates) {
    	    this._array.push(aStr);
    	  }
    	  if (!isDuplicate) {
    	    if (hasNativeMap) {
    	      this._set.set(aStr, idx);
    	    } else {
    	      this._set[sStr] = idx;
    	    }
    	  }
    	};

    	/**
    	 * Is the given string a member of this set?
    	 *
    	 * @param String aStr
    	 */
    	ArraySet.prototype.has = function ArraySet_has(aStr) {
    	  if (hasNativeMap) {
    	    return this._set.has(aStr);
    	  } else {
    	    var sStr = util.toSetString(aStr);
    	    return has.call(this._set, sStr);
    	  }
    	};

    	/**
    	 * What is the index of the given string in the array?
    	 *
    	 * @param String aStr
    	 */
    	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    	  if (hasNativeMap) {
    	    var idx = this._set.get(aStr);
    	    if (idx >= 0) {
    	        return idx;
    	    }
    	  } else {
    	    var sStr = util.toSetString(aStr);
    	    if (has.call(this._set, sStr)) {
    	      return this._set[sStr];
    	    }
    	  }

    	  throw new Error('"' + aStr + '" is not in the set.');
    	};

    	/**
    	 * What is the element at the given index?
    	 *
    	 * @param Number aIdx
    	 */
    	ArraySet.prototype.at = function ArraySet_at(aIdx) {
    	  if (aIdx >= 0 && aIdx < this._array.length) {
    	    return this._array[aIdx];
    	  }
    	  throw new Error('No element indexed by ' + aIdx);
    	};

    	/**
    	 * Returns the array representation of this set (which has the proper indices
    	 * indicated by indexOf). Note that this is a copy of the internal array used
    	 * for storing the members so that no one can mess with internal state.
    	 */
    	ArraySet.prototype.toArray = function ArraySet_toArray() {
    	  return this._array.slice();
    	};

    	arraySet.ArraySet = ArraySet;
    	return arraySet;
    }

    var mappingList = {};

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredMappingList;

    function requireMappingList () {
    	if (hasRequiredMappingList) return mappingList;
    	hasRequiredMappingList = 1;
    	/*
    	 * Copyright 2014 Mozilla Foundation and contributors
    	 * Licensed under the New BSD license. See LICENSE or:
    	 * http://opensource.org/licenses/BSD-3-Clause
    	 */

    	var util = /*@__PURE__*/ requireUtil();

    	/**
    	 * Determine whether mappingB is after mappingA with respect to generated
    	 * position.
    	 */
    	function generatedPositionAfter(mappingA, mappingB) {
    	  // Optimized for most common case
    	  var lineA = mappingA.generatedLine;
    	  var lineB = mappingB.generatedLine;
    	  var columnA = mappingA.generatedColumn;
    	  var columnB = mappingB.generatedColumn;
    	  return lineB > lineA || lineB == lineA && columnB >= columnA ||
    	         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    	}

    	/**
    	 * A data structure to provide a sorted view of accumulated mappings in a
    	 * performance conscious manner. It trades a neglibable overhead in general
    	 * case for a large speedup in case of mappings being added in order.
    	 */
    	function MappingList() {
    	  this._array = [];
    	  this._sorted = true;
    	  // Serves as infimum
    	  this._last = {generatedLine: -1, generatedColumn: 0};
    	}

    	/**
    	 * Iterate through internal items. This method takes the same arguments that
    	 * `Array.prototype.forEach` takes.
    	 *
    	 * NOTE: The order of the mappings is NOT guaranteed.
    	 */
    	MappingList.prototype.unsortedForEach =
    	  function MappingList_forEach(aCallback, aThisArg) {
    	    this._array.forEach(aCallback, aThisArg);
    	  };

    	/**
    	 * Add the given source mapping.
    	 *
    	 * @param Object aMapping
    	 */
    	MappingList.prototype.add = function MappingList_add(aMapping) {
    	  if (generatedPositionAfter(this._last, aMapping)) {
    	    this._last = aMapping;
    	    this._array.push(aMapping);
    	  } else {
    	    this._sorted = false;
    	    this._array.push(aMapping);
    	  }
    	};

    	/**
    	 * Returns the flat, sorted array of mappings. The mappings are sorted by
    	 * generated position.
    	 *
    	 * WARNING: This method returns internal data without copying, for
    	 * performance. The return value must NOT be mutated, and should be treated as
    	 * an immutable borrow. If you want to take ownership, you must make your own
    	 * copy.
    	 */
    	MappingList.prototype.toArray = function MappingList_toArray() {
    	  if (!this._sorted) {
    	    this._array.sort(util.compareByGeneratedPositionsInflated);
    	    this._sorted = true;
    	  }
    	  return this._array;
    	};

    	mappingList.MappingList = MappingList;
    	return mappingList;
    }

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredSourceMapGenerator;

    function requireSourceMapGenerator () {
    	if (hasRequiredSourceMapGenerator) return sourceMapGenerator;
    	hasRequiredSourceMapGenerator = 1;
    	/*
    	 * Copyright 2011 Mozilla Foundation and contributors
    	 * Licensed under the New BSD license. See LICENSE or:
    	 * http://opensource.org/licenses/BSD-3-Clause
    	 */

    	var base64VLQ = /*@__PURE__*/ requireBase64Vlq();
    	var util = /*@__PURE__*/ requireUtil();
    	var ArraySet =  requireArraySet().ArraySet;
    	var MappingList =  requireMappingList().MappingList;

    	/**
    	 * An instance of the SourceMapGenerator represents a source map which is
    	 * being built incrementally. You may pass an object with the following
    	 * properties:
    	 *
    	 *   - file: The filename of the generated source.
    	 *   - sourceRoot: A root for all relative URLs in this source map.
    	 */
    	function SourceMapGenerator(aArgs) {
    	  if (!aArgs) {
    	    aArgs = {};
    	  }
    	  this._file = util.getArg(aArgs, 'file', null);
    	  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    	  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
    	  this._sources = new ArraySet();
    	  this._names = new ArraySet();
    	  this._mappings = new MappingList();
    	  this._sourcesContents = null;
    	}

    	SourceMapGenerator.prototype._version = 3;

    	/**
    	 * Creates a new SourceMapGenerator based on a SourceMapConsumer
    	 *
    	 * @param aSourceMapConsumer The SourceMap.
    	 */
    	SourceMapGenerator.fromSourceMap =
    	  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    	    var sourceRoot = aSourceMapConsumer.sourceRoot;
    	    var generator = new SourceMapGenerator({
    	      file: aSourceMapConsumer.file,
    	      sourceRoot: sourceRoot
    	    });
    	    aSourceMapConsumer.eachMapping(function (mapping) {
    	      var newMapping = {
    	        generated: {
    	          line: mapping.generatedLine,
    	          column: mapping.generatedColumn
    	        }
    	      };

    	      if (mapping.source != null) {
    	        newMapping.source = mapping.source;
    	        if (sourceRoot != null) {
    	          newMapping.source = util.relative(sourceRoot, newMapping.source);
    	        }

    	        newMapping.original = {
    	          line: mapping.originalLine,
    	          column: mapping.originalColumn
    	        };

    	        if (mapping.name != null) {
    	          newMapping.name = mapping.name;
    	        }
    	      }

    	      generator.addMapping(newMapping);
    	    });
    	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
    	      var sourceRelative = sourceFile;
    	      if (sourceRoot !== null) {
    	        sourceRelative = util.relative(sourceRoot, sourceFile);
    	      }

    	      if (!generator._sources.has(sourceRelative)) {
    	        generator._sources.add(sourceRelative);
    	      }

    	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    	      if (content != null) {
    	        generator.setSourceContent(sourceFile, content);
    	      }
    	    });
    	    return generator;
    	  };

    	/**
    	 * Add a single mapping from original source line and column to the generated
    	 * source's line and column for this source map being created. The mapping
    	 * object should have the following properties:
    	 *
    	 *   - generated: An object with the generated line and column positions.
    	 *   - original: An object with the original line and column positions.
    	 *   - source: The original source file (relative to the sourceRoot).
    	 *   - name: An optional original token name for this mapping.
    	 */
    	SourceMapGenerator.prototype.addMapping =
    	  function SourceMapGenerator_addMapping(aArgs) {
    	    var generated = util.getArg(aArgs, 'generated');
    	    var original = util.getArg(aArgs, 'original', null);
    	    var source = util.getArg(aArgs, 'source', null);
    	    var name = util.getArg(aArgs, 'name', null);

    	    if (!this._skipValidation) {
    	      this._validateMapping(generated, original, source, name);
    	    }

    	    if (source != null) {
    	      source = String(source);
    	      if (!this._sources.has(source)) {
    	        this._sources.add(source);
    	      }
    	    }

    	    if (name != null) {
    	      name = String(name);
    	      if (!this._names.has(name)) {
    	        this._names.add(name);
    	      }
    	    }

    	    this._mappings.add({
    	      generatedLine: generated.line,
    	      generatedColumn: generated.column,
    	      originalLine: original != null && original.line,
    	      originalColumn: original != null && original.column,
    	      source: source,
    	      name: name
    	    });
    	  };

    	/**
    	 * Set the source content for a source file.
    	 */
    	SourceMapGenerator.prototype.setSourceContent =
    	  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    	    var source = aSourceFile;
    	    if (this._sourceRoot != null) {
    	      source = util.relative(this._sourceRoot, source);
    	    }

    	    if (aSourceContent != null) {
    	      // Add the source content to the _sourcesContents map.
    	      // Create a new _sourcesContents map if the property is null.
    	      if (!this._sourcesContents) {
    	        this._sourcesContents = Object.create(null);
    	      }
    	      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    	    } else if (this._sourcesContents) {
    	      // Remove the source file from the _sourcesContents map.
    	      // If the _sourcesContents map is empty, set the property to null.
    	      delete this._sourcesContents[util.toSetString(source)];
    	      if (Object.keys(this._sourcesContents).length === 0) {
    	        this._sourcesContents = null;
    	      }
    	    }
    	  };

    	/**
    	 * Applies the mappings of a sub-source-map for a specific source file to the
    	 * source map being generated. Each mapping to the supplied source file is
    	 * rewritten using the supplied source map. Note: The resolution for the
    	 * resulting mappings is the minimium of this map and the supplied map.
    	 *
    	 * @param aSourceMapConsumer The source map to be applied.
    	 * @param aSourceFile Optional. The filename of the source file.
    	 *        If omitted, SourceMapConsumer's file property will be used.
    	 * @param aSourceMapPath Optional. The dirname of the path to the source map
    	 *        to be applied. If relative, it is relative to the SourceMapConsumer.
    	 *        This parameter is needed when the two source maps aren't in the same
    	 *        directory, and the source map to be applied contains relative source
    	 *        paths. If so, those relative source paths need to be rewritten
    	 *        relative to the SourceMapGenerator.
    	 */
    	SourceMapGenerator.prototype.applySourceMap =
    	  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    	    var sourceFile = aSourceFile;
    	    // If aSourceFile is omitted, we will use the file property of the SourceMap
    	    if (aSourceFile == null) {
    	      if (aSourceMapConsumer.file == null) {
    	        throw new Error(
    	          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
    	          'or the source map\'s "file" property. Both were omitted.'
    	        );
    	      }
    	      sourceFile = aSourceMapConsumer.file;
    	    }
    	    var sourceRoot = this._sourceRoot;
    	    // Make "sourceFile" relative if an absolute Url is passed.
    	    if (sourceRoot != null) {
    	      sourceFile = util.relative(sourceRoot, sourceFile);
    	    }
    	    // Applying the SourceMap can add and remove items from the sources and
    	    // the names array.
    	    var newSources = new ArraySet();
    	    var newNames = new ArraySet();

    	    // Find mappings for the "sourceFile"
    	    this._mappings.unsortedForEach(function (mapping) {
    	      if (mapping.source === sourceFile && mapping.originalLine != null) {
    	        // Check if it can be mapped by the source map, then update the mapping.
    	        var original = aSourceMapConsumer.originalPositionFor({
    	          line: mapping.originalLine,
    	          column: mapping.originalColumn
    	        });
    	        if (original.source != null) {
    	          // Copy mapping
    	          mapping.source = original.source;
    	          if (aSourceMapPath != null) {
    	            mapping.source = util.join(aSourceMapPath, mapping.source);
    	          }
    	          if (sourceRoot != null) {
    	            mapping.source = util.relative(sourceRoot, mapping.source);
    	          }
    	          mapping.originalLine = original.line;
    	          mapping.originalColumn = original.column;
    	          if (original.name != null) {
    	            mapping.name = original.name;
    	          }
    	        }
    	      }

    	      var source = mapping.source;
    	      if (source != null && !newSources.has(source)) {
    	        newSources.add(source);
    	      }

    	      var name = mapping.name;
    	      if (name != null && !newNames.has(name)) {
    	        newNames.add(name);
    	      }

    	    }, this);
    	    this._sources = newSources;
    	    this._names = newNames;

    	    // Copy sourcesContents of applied map.
    	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
    	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    	      if (content != null) {
    	        if (aSourceMapPath != null) {
    	          sourceFile = util.join(aSourceMapPath, sourceFile);
    	        }
    	        if (sourceRoot != null) {
    	          sourceFile = util.relative(sourceRoot, sourceFile);
    	        }
    	        this.setSourceContent(sourceFile, content);
    	      }
    	    }, this);
    	  };

    	/**
    	 * A mapping can have one of the three levels of data:
    	 *
    	 *   1. Just the generated position.
    	 *   2. The Generated position, original position, and original source.
    	 *   3. Generated and original position, original source, as well as a name
    	 *      token.
    	 *
    	 * To maintain consistency, we validate that any new mapping being added falls
    	 * in to one of these categories.
    	 */
    	SourceMapGenerator.prototype._validateMapping =
    	  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
    	                                              aName) {
    	    // When aOriginal is truthy but has empty values for .line and .column,
    	    // it is most likely a programmer error. In this case we throw a very
    	    // specific error message to try to guide them the right way.
    	    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    	    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
    	        throw new Error(
    	            'original.line and original.column are not numbers -- you probably meant to omit ' +
    	            'the original mapping entirely and only map the generated position. If so, pass ' +
    	            'null for the original mapping instead of an object with empty or null values.'
    	        );
    	    }

    	    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
    	        && aGenerated.line > 0 && aGenerated.column >= 0
    	        && !aOriginal && !aSource && !aName) {
    	      // Case 1.
    	      return;
    	    }
    	    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
    	             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
    	             && aGenerated.line > 0 && aGenerated.column >= 0
    	             && aOriginal.line > 0 && aOriginal.column >= 0
    	             && aSource) {
    	      // Cases 2 and 3.
    	      return;
    	    }
    	    else {
    	      throw new Error('Invalid mapping: ' + JSON.stringify({
    	        generated: aGenerated,
    	        source: aSource,
    	        original: aOriginal,
    	        name: aName
    	      }));
    	    }
    	  };

    	/**
    	 * Serialize the accumulated mappings in to the stream of base 64 VLQs
    	 * specified by the source map format.
    	 */
    	SourceMapGenerator.prototype._serializeMappings =
    	  function SourceMapGenerator_serializeMappings() {
    	    var previousGeneratedColumn = 0;
    	    var previousGeneratedLine = 1;
    	    var previousOriginalColumn = 0;
    	    var previousOriginalLine = 0;
    	    var previousName = 0;
    	    var previousSource = 0;
    	    var result = '';
    	    var next;
    	    var mapping;
    	    var nameIdx;
    	    var sourceIdx;

    	    var mappings = this._mappings.toArray();
    	    for (var i = 0, len = mappings.length; i < len; i++) {
    	      mapping = mappings[i];
    	      next = '';

    	      if (mapping.generatedLine !== previousGeneratedLine) {
    	        previousGeneratedColumn = 0;
    	        while (mapping.generatedLine !== previousGeneratedLine) {
    	          next += ';';
    	          previousGeneratedLine++;
    	        }
    	      }
    	      else {
    	        if (i > 0) {
    	          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
    	            continue;
    	          }
    	          next += ',';
    	        }
    	      }

    	      next += base64VLQ.encode(mapping.generatedColumn
    	                                 - previousGeneratedColumn);
    	      previousGeneratedColumn = mapping.generatedColumn;

    	      if (mapping.source != null) {
    	        sourceIdx = this._sources.indexOf(mapping.source);
    	        next += base64VLQ.encode(sourceIdx - previousSource);
    	        previousSource = sourceIdx;

    	        // lines are stored 0-based in SourceMap spec version 3
    	        next += base64VLQ.encode(mapping.originalLine - 1
    	                                   - previousOriginalLine);
    	        previousOriginalLine = mapping.originalLine - 1;

    	        next += base64VLQ.encode(mapping.originalColumn
    	                                   - previousOriginalColumn);
    	        previousOriginalColumn = mapping.originalColumn;

    	        if (mapping.name != null) {
    	          nameIdx = this._names.indexOf(mapping.name);
    	          next += base64VLQ.encode(nameIdx - previousName);
    	          previousName = nameIdx;
    	        }
    	      }

    	      result += next;
    	    }

    	    return result;
    	  };

    	SourceMapGenerator.prototype._generateSourcesContent =
    	  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    	    return aSources.map(function (source) {
    	      if (!this._sourcesContents) {
    	        return null;
    	      }
    	      if (aSourceRoot != null) {
    	        source = util.relative(aSourceRoot, source);
    	      }
    	      var key = util.toSetString(source);
    	      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
    	        ? this._sourcesContents[key]
    	        : null;
    	    }, this);
    	  };

    	/**
    	 * Externalize the source map.
    	 */
    	SourceMapGenerator.prototype.toJSON =
    	  function SourceMapGenerator_toJSON() {
    	    var map = {
    	      version: this._version,
    	      sources: this._sources.toArray(),
    	      names: this._names.toArray(),
    	      mappings: this._serializeMappings()
    	    };
    	    if (this._file != null) {
    	      map.file = this._file;
    	    }
    	    if (this._sourceRoot != null) {
    	      map.sourceRoot = this._sourceRoot;
    	    }
    	    if (this._sourcesContents) {
    	      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    	    }

    	    return map;
    	  };

    	/**
    	 * Render the source map being generated to a string.
    	 */
    	SourceMapGenerator.prototype.toString =
    	  function SourceMapGenerator_toString() {
    	    return JSON.stringify(this.toJSON());
    	  };

    	sourceMapGenerator.SourceMapGenerator = SourceMapGenerator;
    	return sourceMapGenerator;
    }

    var sourceMapConsumer = {};

    var binarySearch = {};

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredBinarySearch;

    function requireBinarySearch () {
    	if (hasRequiredBinarySearch) return binarySearch;
    	hasRequiredBinarySearch = 1;
    	(function (exports) {
    		/*
    		 * Copyright 2011 Mozilla Foundation and contributors
    		 * Licensed under the New BSD license. See LICENSE or:
    		 * http://opensource.org/licenses/BSD-3-Clause
    		 */

    		exports.GREATEST_LOWER_BOUND = 1;
    		exports.LEAST_UPPER_BOUND = 2;

    		/**
    		 * Recursive implementation of binary search.
    		 *
    		 * @param aLow Indices here and lower do not contain the needle.
    		 * @param aHigh Indices here and higher do not contain the needle.
    		 * @param aNeedle The element being searched for.
    		 * @param aHaystack The non-empty array being searched.
    		 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
    		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
    		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
    		 *     closest element that is smaller than or greater than the one we are
    		 *     searching for, respectively, if the exact element cannot be found.
    		 */
    		function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
    		  // This function terminates when one of the following is true:
    		  //
    		  //   1. We find the exact element we are looking for.
    		  //
    		  //   2. We did not find the exact element, but we can return the index of
    		  //      the next-closest element.
    		  //
    		  //   3. We did not find the exact element, and there is no next-closest
    		  //      element than the one we are searching for, so we return -1.
    		  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    		  var cmp = aCompare(aNeedle, aHaystack[mid], true);
    		  if (cmp === 0) {
    		    // Found the element we are looking for.
    		    return mid;
    		  }
    		  else if (cmp > 0) {
    		    // Our needle is greater than aHaystack[mid].
    		    if (aHigh - mid > 1) {
    		      // The element is in the upper half.
    		      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    		    }

    		    // The exact needle element was not found in this haystack. Determine if
    		    // we are in termination case (3) or (2) and return the appropriate thing.
    		    if (aBias == exports.LEAST_UPPER_BOUND) {
    		      return aHigh < aHaystack.length ? aHigh : -1;
    		    } else {
    		      return mid;
    		    }
    		  }
    		  else {
    		    // Our needle is less than aHaystack[mid].
    		    if (mid - aLow > 1) {
    		      // The element is in the lower half.
    		      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    		    }

    		    // we are in termination case (3) or (2) and return the appropriate thing.
    		    if (aBias == exports.LEAST_UPPER_BOUND) {
    		      return mid;
    		    } else {
    		      return aLow < 0 ? -1 : aLow;
    		    }
    		  }
    		}

    		/**
    		 * This is an implementation of binary search which will always try and return
    		 * the index of the closest element if there is no exact hit. This is because
    		 * mappings between original and generated line/col pairs are single points,
    		 * and there is an implicit region between each of them, so a miss just means
    		 * that you aren't on the very start of a region.
    		 *
    		 * @param aNeedle The element you are looking for.
    		 * @param aHaystack The array that is being searched.
    		 * @param aCompare A function which takes the needle and an element in the
    		 *     array and returns -1, 0, or 1 depending on whether the needle is less
    		 *     than, equal to, or greater than the element, respectively.
    		 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
    		 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
    		 *     closest element that is smaller than or greater than the one we are
    		 *     searching for, respectively, if the exact element cannot be found.
    		 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
    		 */
    		exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
    		  if (aHaystack.length === 0) {
    		    return -1;
    		  }

    		  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
    		                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
    		  if (index < 0) {
    		    return -1;
    		  }

    		  // We have found either the exact element, or the next-closest element than
    		  // the one we are searching for. However, there may be more than one such
    		  // element. Make sure we always return the smallest of these.
    		  while (index - 1 >= 0) {
    		    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
    		      break;
    		    }
    		    --index;
    		  }

    		  return index;
    		}; 
    	} (binarySearch));
    	return binarySearch;
    }

    var quickSort = {};

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredQuickSort;

    function requireQuickSort () {
    	if (hasRequiredQuickSort) return quickSort;
    	hasRequiredQuickSort = 1;
    	/*
    	 * Copyright 2011 Mozilla Foundation and contributors
    	 * Licensed under the New BSD license. See LICENSE or:
    	 * http://opensource.org/licenses/BSD-3-Clause
    	 */

    	// It turns out that some (most?) JavaScript engines don't self-host
    	// `Array.prototype.sort`. This makes sense because C++ will likely remain
    	// faster than JS when doing raw CPU-intensive sorting. However, when using a
    	// custom comparator function, calling back and forth between the VM's C++ and
    	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
    	// worse generated code for the comparator function than would be optimal. In
    	// fact, when sorting with a comparator, these costs outweigh the benefits of
    	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
    	// a ~3500ms mean speed-up in `bench/bench.html`.

    	/**
    	 * Swap the elements indexed by `x` and `y` in the array `ary`.
    	 *
    	 * @param {Array} ary
    	 *        The array.
    	 * @param {Number} x
    	 *        The index of the first item.
    	 * @param {Number} y
    	 *        The index of the second item.
    	 */
    	function swap(ary, x, y) {
    	  var temp = ary[x];
    	  ary[x] = ary[y];
    	  ary[y] = temp;
    	}

    	/**
    	 * Returns a random integer within the range `low .. high` inclusive.
    	 *
    	 * @param {Number} low
    	 *        The lower bound on the range.
    	 * @param {Number} high
    	 *        The upper bound on the range.
    	 */
    	function randomIntInRange(low, high) {
    	  return Math.round(low + (Math.random() * (high - low)));
    	}

    	/**
    	 * The Quick Sort algorithm.
    	 *
    	 * @param {Array} ary
    	 *        An array to sort.
    	 * @param {function} comparator
    	 *        Function to use to compare two items.
    	 * @param {Number} p
    	 *        Start index of the array
    	 * @param {Number} r
    	 *        End index of the array
    	 */
    	function doQuickSort(ary, comparator, p, r) {
    	  // If our lower bound is less than our upper bound, we (1) partition the
    	  // array into two pieces and (2) recurse on each half. If it is not, this is
    	  // the empty array and our base case.

    	  if (p < r) {
    	    // (1) Partitioning.
    	    //
    	    // The partitioning chooses a pivot between `p` and `r` and moves all
    	    // elements that are less than or equal to the pivot to the before it, and
    	    // all the elements that are greater than it after it. The effect is that
    	    // once partition is done, the pivot is in the exact place it will be when
    	    // the array is put in sorted order, and it will not need to be moved
    	    // again. This runs in O(n) time.

    	    // Always choose a random pivot so that an input array which is reverse
    	    // sorted does not cause O(n^2) running time.
    	    var pivotIndex = randomIntInRange(p, r);
    	    var i = p - 1;

    	    swap(ary, pivotIndex, r);
    	    var pivot = ary[r];

    	    // Immediately after `j` is incremented in this loop, the following hold
    	    // true:
    	    //
    	    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    	    //
    	    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    	    for (var j = p; j < r; j++) {
    	      if (comparator(ary[j], pivot) <= 0) {
    	        i += 1;
    	        swap(ary, i, j);
    	      }
    	    }

    	    swap(ary, i + 1, j);
    	    var q = i + 1;

    	    // (2) Recurse on each half.

    	    doQuickSort(ary, comparator, p, q - 1);
    	    doQuickSort(ary, comparator, q + 1, r);
    	  }
    	}

    	/**
    	 * Sort the given array in-place with the given comparator function.
    	 *
    	 * @param {Array} ary
    	 *        An array to sort.
    	 * @param {function} comparator
    	 *        Function to use to compare two items.
    	 */
    	quickSort.quickSort = function (ary, comparator) {
    	  doQuickSort(ary, comparator, 0, ary.length - 1);
    	};
    	return quickSort;
    }

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredSourceMapConsumer;

    function requireSourceMapConsumer () {
    	if (hasRequiredSourceMapConsumer) return sourceMapConsumer;
    	hasRequiredSourceMapConsumer = 1;
    	/*
    	 * Copyright 2011 Mozilla Foundation and contributors
    	 * Licensed under the New BSD license. See LICENSE or:
    	 * http://opensource.org/licenses/BSD-3-Clause
    	 */

    	var util = /*@__PURE__*/ requireUtil();
    	var binarySearch = /*@__PURE__*/ requireBinarySearch();
    	var ArraySet =  requireArraySet().ArraySet;
    	var base64VLQ = /*@__PURE__*/ requireBase64Vlq();
    	var quickSort =  requireQuickSort().quickSort;

    	function SourceMapConsumer(aSourceMap, aSourceMapURL) {
    	  var sourceMap = aSourceMap;
    	  if (typeof aSourceMap === 'string') {
    	    sourceMap = util.parseSourceMapInput(aSourceMap);
    	  }

    	  return sourceMap.sections != null
    	    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    	    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    	}

    	SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    	  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    	};

    	/**
    	 * The version of the source mapping spec that we are consuming.
    	 */
    	SourceMapConsumer.prototype._version = 3;

    	// `__generatedMappings` and `__originalMappings` are arrays that hold the
    	// parsed mapping coordinates from the source map's "mappings" attribute. They
    	// are lazily instantiated, accessed via the `_generatedMappings` and
    	// `_originalMappings` getters respectively, and we only parse the mappings
    	// and create these arrays once queried for a source location. We jump through
    	// these hoops because there can be many thousands of mappings, and parsing
    	// them is expensive, so we only want to do it if we must.
    	//
    	// Each object in the arrays is of the form:
    	//
    	//     {
    	//       generatedLine: The line number in the generated code,
    	//       generatedColumn: The column number in the generated code,
    	//       source: The path to the original source file that generated this
    	//               chunk of code,
    	//       originalLine: The line number in the original source that
    	//                     corresponds to this chunk of generated code,
    	//       originalColumn: The column number in the original source that
    	//                       corresponds to this chunk of generated code,
    	//       name: The name of the original symbol which generated this chunk of
    	//             code.
    	//     }
    	//
    	// All properties except for `generatedLine` and `generatedColumn` can be
    	// `null`.
    	//
    	// `_generatedMappings` is ordered by the generated positions.
    	//
    	// `_originalMappings` is ordered by the original positions.

    	SourceMapConsumer.prototype.__generatedMappings = null;
    	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
    	  configurable: true,
    	  enumerable: true,
    	  get: function () {
    	    if (!this.__generatedMappings) {
    	      this._parseMappings(this._mappings, this.sourceRoot);
    	    }

    	    return this.__generatedMappings;
    	  }
    	});

    	SourceMapConsumer.prototype.__originalMappings = null;
    	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
    	  configurable: true,
    	  enumerable: true,
    	  get: function () {
    	    if (!this.__originalMappings) {
    	      this._parseMappings(this._mappings, this.sourceRoot);
    	    }

    	    return this.__originalMappings;
    	  }
    	});

    	SourceMapConsumer.prototype._charIsMappingSeparator =
    	  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    	    var c = aStr.charAt(index);
    	    return c === ";" || c === ",";
    	  };

    	/**
    	 * Parse the mappings in a string in to a data structure which we can easily
    	 * query (the ordered arrays in the `this.__generatedMappings` and
    	 * `this.__originalMappings` properties).
    	 */
    	SourceMapConsumer.prototype._parseMappings =
    	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    	    throw new Error("Subclasses must implement _parseMappings");
    	  };

    	SourceMapConsumer.GENERATED_ORDER = 1;
    	SourceMapConsumer.ORIGINAL_ORDER = 2;

    	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

    	/**
    	 * Iterate over each mapping between an original source/line/column and a
    	 * generated line/column in this source map.
    	 *
    	 * @param Function aCallback
    	 *        The function that is called with each mapping.
    	 * @param Object aContext
    	 *        Optional. If specified, this object will be the value of `this` every
    	 *        time that `aCallback` is called.
    	 * @param aOrder
    	 *        Either `SourceMapConsumer.GENERATED_ORDER` or
    	 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
    	 *        iterate over the mappings sorted by the generated file's line/column
    	 *        order or the original's source/line/column order, respectively. Defaults to
    	 *        `SourceMapConsumer.GENERATED_ORDER`.
    	 */
    	SourceMapConsumer.prototype.eachMapping =
    	  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    	    var context = aContext || null;
    	    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    	    var mappings;
    	    switch (order) {
    	    case SourceMapConsumer.GENERATED_ORDER:
    	      mappings = this._generatedMappings;
    	      break;
    	    case SourceMapConsumer.ORIGINAL_ORDER:
    	      mappings = this._originalMappings;
    	      break;
    	    default:
    	      throw new Error("Unknown order of iteration.");
    	    }

    	    var sourceRoot = this.sourceRoot;
    	    mappings.map(function (mapping) {
    	      var source = mapping.source === null ? null : this._sources.at(mapping.source);
    	      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
    	      return {
    	        source: source,
    	        generatedLine: mapping.generatedLine,
    	        generatedColumn: mapping.generatedColumn,
    	        originalLine: mapping.originalLine,
    	        originalColumn: mapping.originalColumn,
    	        name: mapping.name === null ? null : this._names.at(mapping.name)
    	      };
    	    }, this).forEach(aCallback, context);
    	  };

    	/**
    	 * Returns all generated line and column information for the original source,
    	 * line, and column provided. If no column is provided, returns all mappings
    	 * corresponding to a either the line we are searching for or the next
    	 * closest line that has any mappings. Otherwise, returns all mappings
    	 * corresponding to the given line and either the column we are searching for
    	 * or the next closest column that has any offsets.
    	 *
    	 * The only argument is an object with the following properties:
    	 *
    	 *   - source: The filename of the original source.
    	 *   - line: The line number in the original source.  The line number is 1-based.
    	 *   - column: Optional. the column number in the original source.
    	 *    The column number is 0-based.
    	 *
    	 * and an array of objects is returned, each with the following properties:
    	 *
    	 *   - line: The line number in the generated source, or null.  The
    	 *    line number is 1-based.
    	 *   - column: The column number in the generated source, or null.
    	 *    The column number is 0-based.
    	 */
    	SourceMapConsumer.prototype.allGeneratedPositionsFor =
    	  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    	    var line = util.getArg(aArgs, 'line');

    	    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    	    // returns the index of the closest mapping less than the needle. By
    	    // setting needle.originalColumn to 0, we thus find the last mapping for
    	    // the given line, provided such a mapping exists.
    	    var needle = {
    	      source: util.getArg(aArgs, 'source'),
    	      originalLine: line,
    	      originalColumn: util.getArg(aArgs, 'column', 0)
    	    };

    	    needle.source = this._findSourceIndex(needle.source);
    	    if (needle.source < 0) {
    	      return [];
    	    }

    	    var mappings = [];

    	    var index = this._findMapping(needle,
    	                                  this._originalMappings,
    	                                  "originalLine",
    	                                  "originalColumn",
    	                                  util.compareByOriginalPositions,
    	                                  binarySearch.LEAST_UPPER_BOUND);
    	    if (index >= 0) {
    	      var mapping = this._originalMappings[index];

    	      if (aArgs.column === undefined) {
    	        var originalLine = mapping.originalLine;

    	        // Iterate until either we run out of mappings, or we run into
    	        // a mapping for a different line than the one we found. Since
    	        // mappings are sorted, this is guaranteed to find all mappings for
    	        // the line we found.
    	        while (mapping && mapping.originalLine === originalLine) {
    	          mappings.push({
    	            line: util.getArg(mapping, 'generatedLine', null),
    	            column: util.getArg(mapping, 'generatedColumn', null),
    	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
    	          });

    	          mapping = this._originalMappings[++index];
    	        }
    	      } else {
    	        var originalColumn = mapping.originalColumn;

    	        // Iterate until either we run out of mappings, or we run into
    	        // a mapping for a different line than the one we were searching for.
    	        // Since mappings are sorted, this is guaranteed to find all mappings for
    	        // the line we are searching for.
    	        while (mapping &&
    	               mapping.originalLine === line &&
    	               mapping.originalColumn == originalColumn) {
    	          mappings.push({
    	            line: util.getArg(mapping, 'generatedLine', null),
    	            column: util.getArg(mapping, 'generatedColumn', null),
    	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
    	          });

    	          mapping = this._originalMappings[++index];
    	        }
    	      }
    	    }

    	    return mappings;
    	  };

    	sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;

    	/**
    	 * A BasicSourceMapConsumer instance represents a parsed source map which we can
    	 * query for information about the original file positions by giving it a file
    	 * position in the generated source.
    	 *
    	 * The first parameter is the raw source map (either as a JSON string, or
    	 * already parsed to an object). According to the spec, source maps have the
    	 * following attributes:
    	 *
    	 *   - version: Which version of the source map spec this map is following.
    	 *   - sources: An array of URLs to the original source files.
    	 *   - names: An array of identifiers which can be referrenced by individual mappings.
    	 *   - sourceRoot: Optional. The URL root from which all sources are relative.
    	 *   - sourcesContent: Optional. An array of contents of the original source files.
    	 *   - mappings: A string of base64 VLQs which contain the actual mappings.
    	 *   - file: Optional. The generated file this source map is associated with.
    	 *
    	 * Here is an example source map, taken from the source map spec[0]:
    	 *
    	 *     {
    	 *       version : 3,
    	 *       file: "out.js",
    	 *       sourceRoot : "",
    	 *       sources: ["foo.js", "bar.js"],
    	 *       names: ["src", "maps", "are", "fun"],
    	 *       mappings: "AA,AB;;ABCDE;"
    	 *     }
    	 *
    	 * The second parameter, if given, is a string whose value is the URL
    	 * at which the source map was found.  This URL is used to compute the
    	 * sources array.
    	 *
    	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
    	 */
    	function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
    	  var sourceMap = aSourceMap;
    	  if (typeof aSourceMap === 'string') {
    	    sourceMap = util.parseSourceMapInput(aSourceMap);
    	  }

    	  var version = util.getArg(sourceMap, 'version');
    	  var sources = util.getArg(sourceMap, 'sources');
    	  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    	  // requires the array) to play nice here.
    	  var names = util.getArg(sourceMap, 'names', []);
    	  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    	  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    	  var mappings = util.getArg(sourceMap, 'mappings');
    	  var file = util.getArg(sourceMap, 'file', null);

    	  // Once again, Sass deviates from the spec and supplies the version as a
    	  // string rather than a number, so we use loose equality checking here.
    	  if (version != this._version) {
    	    throw new Error('Unsupported version: ' + version);
    	  }

    	  if (sourceRoot) {
    	    sourceRoot = util.normalize(sourceRoot);
    	  }

    	  sources = sources
    	    .map(String)
    	    // Some source maps produce relative source paths like "./foo.js" instead of
    	    // "foo.js".  Normalize these first so that future comparisons will succeed.
    	    // See bugzil.la/1090768.
    	    .map(util.normalize)
    	    // Always ensure that absolute sources are internally stored relative to
    	    // the source root, if the source root is absolute. Not doing this would
    	    // be particularly problematic when the source root is a prefix of the
    	    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    	    .map(function (source) {
    	      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
    	        ? util.relative(sourceRoot, source)
    	        : source;
    	    });

    	  // Pass `true` below to allow duplicate names and sources. While source maps
    	  // are intended to be compressed and deduplicated, the TypeScript compiler
    	  // sometimes generates source maps with duplicates in them. See Github issue
    	  // #72 and bugzil.la/889492.
    	  this._names = ArraySet.fromArray(names.map(String), true);
    	  this._sources = ArraySet.fromArray(sources, true);

    	  this._absoluteSources = this._sources.toArray().map(function (s) {
    	    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
    	  });

    	  this.sourceRoot = sourceRoot;
    	  this.sourcesContent = sourcesContent;
    	  this._mappings = mappings;
    	  this._sourceMapURL = aSourceMapURL;
    	  this.file = file;
    	}

    	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

    	/**
    	 * Utility function to find the index of a source.  Returns -1 if not
    	 * found.
    	 */
    	BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
    	  var relativeSource = aSource;
    	  if (this.sourceRoot != null) {
    	    relativeSource = util.relative(this.sourceRoot, relativeSource);
    	  }

    	  if (this._sources.has(relativeSource)) {
    	    return this._sources.indexOf(relativeSource);
    	  }

    	  // Maybe aSource is an absolute URL as returned by |sources|.  In
    	  // this case we can't simply undo the transform.
    	  var i;
    	  for (i = 0; i < this._absoluteSources.length; ++i) {
    	    if (this._absoluteSources[i] == aSource) {
    	      return i;
    	    }
    	  }

    	  return -1;
    	};

    	/**
    	 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
    	 *
    	 * @param SourceMapGenerator aSourceMap
    	 *        The source map that will be consumed.
    	 * @param String aSourceMapURL
    	 *        The URL at which the source map can be found (optional)
    	 * @returns BasicSourceMapConsumer
    	 */
    	BasicSourceMapConsumer.fromSourceMap =
    	  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    	    var smc = Object.create(BasicSourceMapConsumer.prototype);

    	    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    	    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    	    smc.sourceRoot = aSourceMap._sourceRoot;
    	    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
    	                                                            smc.sourceRoot);
    	    smc.file = aSourceMap._file;
    	    smc._sourceMapURL = aSourceMapURL;
    	    smc._absoluteSources = smc._sources.toArray().map(function (s) {
    	      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    	    });

    	    // Because we are modifying the entries (by converting string sources and
    	    // names to indices into the sources and names ArraySets), we have to make
    	    // a copy of the entry or else bad things happen. Shared mutable state
    	    // strikes again! See github issue #191.

    	    var generatedMappings = aSourceMap._mappings.toArray().slice();
    	    var destGeneratedMappings = smc.__generatedMappings = [];
    	    var destOriginalMappings = smc.__originalMappings = [];

    	    for (var i = 0, length = generatedMappings.length; i < length; i++) {
    	      var srcMapping = generatedMappings[i];
    	      var destMapping = new Mapping;
    	      destMapping.generatedLine = srcMapping.generatedLine;
    	      destMapping.generatedColumn = srcMapping.generatedColumn;

    	      if (srcMapping.source) {
    	        destMapping.source = sources.indexOf(srcMapping.source);
    	        destMapping.originalLine = srcMapping.originalLine;
    	        destMapping.originalColumn = srcMapping.originalColumn;

    	        if (srcMapping.name) {
    	          destMapping.name = names.indexOf(srcMapping.name);
    	        }

    	        destOriginalMappings.push(destMapping);
    	      }

    	      destGeneratedMappings.push(destMapping);
    	    }

    	    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    	    return smc;
    	  };

    	/**
    	 * The version of the source mapping spec that we are consuming.
    	 */
    	BasicSourceMapConsumer.prototype._version = 3;

    	/**
    	 * The list of original sources.
    	 */
    	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
    	  get: function () {
    	    return this._absoluteSources.slice();
    	  }
    	});

    	/**
    	 * Provide the JIT with a nice shape / hidden class.
    	 */
    	function Mapping() {
    	  this.generatedLine = 0;
    	  this.generatedColumn = 0;
    	  this.source = null;
    	  this.originalLine = null;
    	  this.originalColumn = null;
    	  this.name = null;
    	}

    	/**
    	 * Parse the mappings in a string in to a data structure which we can easily
    	 * query (the ordered arrays in the `this.__generatedMappings` and
    	 * `this.__originalMappings` properties).
    	 */
    	BasicSourceMapConsumer.prototype._parseMappings =
    	  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    	    var generatedLine = 1;
    	    var previousGeneratedColumn = 0;
    	    var previousOriginalLine = 0;
    	    var previousOriginalColumn = 0;
    	    var previousSource = 0;
    	    var previousName = 0;
    	    var length = aStr.length;
    	    var index = 0;
    	    var cachedSegments = {};
    	    var temp = {};
    	    var originalMappings = [];
    	    var generatedMappings = [];
    	    var mapping, str, segment, end, value;

    	    while (index < length) {
    	      if (aStr.charAt(index) === ';') {
    	        generatedLine++;
    	        index++;
    	        previousGeneratedColumn = 0;
    	      }
    	      else if (aStr.charAt(index) === ',') {
    	        index++;
    	      }
    	      else {
    	        mapping = new Mapping();
    	        mapping.generatedLine = generatedLine;

    	        // Because each offset is encoded relative to the previous one,
    	        // many segments often have the same encoding. We can exploit this
    	        // fact by caching the parsed variable length fields of each segment,
    	        // allowing us to avoid a second parse if we encounter the same
    	        // segment again.
    	        for (end = index; end < length; end++) {
    	          if (this._charIsMappingSeparator(aStr, end)) {
    	            break;
    	          }
    	        }
    	        str = aStr.slice(index, end);

    	        segment = cachedSegments[str];
    	        if (segment) {
    	          index += str.length;
    	        } else {
    	          segment = [];
    	          while (index < end) {
    	            base64VLQ.decode(aStr, index, temp);
    	            value = temp.value;
    	            index = temp.rest;
    	            segment.push(value);
    	          }

    	          if (segment.length === 2) {
    	            throw new Error('Found a source, but no line and column');
    	          }

    	          if (segment.length === 3) {
    	            throw new Error('Found a source and line, but no column');
    	          }

    	          cachedSegments[str] = segment;
    	        }

    	        // Generated column.
    	        mapping.generatedColumn = previousGeneratedColumn + segment[0];
    	        previousGeneratedColumn = mapping.generatedColumn;

    	        if (segment.length > 1) {
    	          // Original source.
    	          mapping.source = previousSource + segment[1];
    	          previousSource += segment[1];

    	          // Original line.
    	          mapping.originalLine = previousOriginalLine + segment[2];
    	          previousOriginalLine = mapping.originalLine;
    	          // Lines are stored 0-based
    	          mapping.originalLine += 1;

    	          // Original column.
    	          mapping.originalColumn = previousOriginalColumn + segment[3];
    	          previousOriginalColumn = mapping.originalColumn;

    	          if (segment.length > 4) {
    	            // Original name.
    	            mapping.name = previousName + segment[4];
    	            previousName += segment[4];
    	          }
    	        }

    	        generatedMappings.push(mapping);
    	        if (typeof mapping.originalLine === 'number') {
    	          originalMappings.push(mapping);
    	        }
    	      }
    	    }

    	    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    	    this.__generatedMappings = generatedMappings;

    	    quickSort(originalMappings, util.compareByOriginalPositions);
    	    this.__originalMappings = originalMappings;
    	  };

    	/**
    	 * Find the mapping that best matches the hypothetical "needle" mapping that
    	 * we are searching for in the given "haystack" of mappings.
    	 */
    	BasicSourceMapConsumer.prototype._findMapping =
    	  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
    	                                         aColumnName, aComparator, aBias) {
    	    // To return the position we are searching for, we must first find the
    	    // mapping for the given position and then return the opposite position it
    	    // points to. Because the mappings are sorted, we can use binary search to
    	    // find the best mapping.

    	    if (aNeedle[aLineName] <= 0) {
    	      throw new TypeError('Line must be greater than or equal to 1, got '
    	                          + aNeedle[aLineName]);
    	    }
    	    if (aNeedle[aColumnName] < 0) {
    	      throw new TypeError('Column must be greater than or equal to 0, got '
    	                          + aNeedle[aColumnName]);
    	    }

    	    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    	  };

    	/**
    	 * Compute the last column for each generated mapping. The last column is
    	 * inclusive.
    	 */
    	BasicSourceMapConsumer.prototype.computeColumnSpans =
    	  function SourceMapConsumer_computeColumnSpans() {
    	    for (var index = 0; index < this._generatedMappings.length; ++index) {
    	      var mapping = this._generatedMappings[index];

    	      // Mappings do not contain a field for the last generated columnt. We
    	      // can come up with an optimistic estimate, however, by assuming that
    	      // mappings are contiguous (i.e. given two consecutive mappings, the
    	      // first mapping ends where the second one starts).
    	      if (index + 1 < this._generatedMappings.length) {
    	        var nextMapping = this._generatedMappings[index + 1];

    	        if (mapping.generatedLine === nextMapping.generatedLine) {
    	          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
    	          continue;
    	        }
    	      }

    	      // The last mapping for each line spans the entire line.
    	      mapping.lastGeneratedColumn = Infinity;
    	    }
    	  };

    	/**
    	 * Returns the original source, line, and column information for the generated
    	 * source's line and column positions provided. The only argument is an object
    	 * with the following properties:
    	 *
    	 *   - line: The line number in the generated source.  The line number
    	 *     is 1-based.
    	 *   - column: The column number in the generated source.  The column
    	 *     number is 0-based.
    	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
    	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
    	 *     closest element that is smaller than or greater than the one we are
    	 *     searching for, respectively, if the exact element cannot be found.
    	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
    	 *
    	 * and an object is returned with the following properties:
    	 *
    	 *   - source: The original source file, or null.
    	 *   - line: The line number in the original source, or null.  The
    	 *     line number is 1-based.
    	 *   - column: The column number in the original source, or null.  The
    	 *     column number is 0-based.
    	 *   - name: The original identifier, or null.
    	 */
    	BasicSourceMapConsumer.prototype.originalPositionFor =
    	  function SourceMapConsumer_originalPositionFor(aArgs) {
    	    var needle = {
    	      generatedLine: util.getArg(aArgs, 'line'),
    	      generatedColumn: util.getArg(aArgs, 'column')
    	    };

    	    var index = this._findMapping(
    	      needle,
    	      this._generatedMappings,
    	      "generatedLine",
    	      "generatedColumn",
    	      util.compareByGeneratedPositionsDeflated,
    	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    	    );

    	    if (index >= 0) {
    	      var mapping = this._generatedMappings[index];

    	      if (mapping.generatedLine === needle.generatedLine) {
    	        var source = util.getArg(mapping, 'source', null);
    	        if (source !== null) {
    	          source = this._sources.at(source);
    	          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
    	        }
    	        var name = util.getArg(mapping, 'name', null);
    	        if (name !== null) {
    	          name = this._names.at(name);
    	        }
    	        return {
    	          source: source,
    	          line: util.getArg(mapping, 'originalLine', null),
    	          column: util.getArg(mapping, 'originalColumn', null),
    	          name: name
    	        };
    	      }
    	    }

    	    return {
    	      source: null,
    	      line: null,
    	      column: null,
    	      name: null
    	    };
    	  };

    	/**
    	 * Return true if we have the source content for every source in the source
    	 * map, false otherwise.
    	 */
    	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
    	  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    	    if (!this.sourcesContent) {
    	      return false;
    	    }
    	    return this.sourcesContent.length >= this._sources.size() &&
    	      !this.sourcesContent.some(function (sc) { return sc == null; });
    	  };

    	/**
    	 * Returns the original source content. The only argument is the url of the
    	 * original source file. Returns null if no original source content is
    	 * available.
    	 */
    	BasicSourceMapConsumer.prototype.sourceContentFor =
    	  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    	    if (!this.sourcesContent) {
    	      return null;
    	    }

    	    var index = this._findSourceIndex(aSource);
    	    if (index >= 0) {
    	      return this.sourcesContent[index];
    	    }

    	    var relativeSource = aSource;
    	    if (this.sourceRoot != null) {
    	      relativeSource = util.relative(this.sourceRoot, relativeSource);
    	    }

    	    var url;
    	    if (this.sourceRoot != null
    	        && (url = util.urlParse(this.sourceRoot))) {
    	      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
    	      // many users. We can help them out when they expect file:// URIs to
    	      // behave like it would if they were running a local HTTP server. See
    	      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
    	      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
    	      if (url.scheme == "file"
    	          && this._sources.has(fileUriAbsPath)) {
    	        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
    	      }

    	      if ((!url.path || url.path == "/")
    	          && this._sources.has("/" + relativeSource)) {
    	        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
    	      }
    	    }

    	    // This function is used recursively from
    	    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    	    // don't want to throw if we can't find the source - we just want to
    	    // return null, so we provide a flag to exit gracefully.
    	    if (nullOnMissing) {
    	      return null;
    	    }
    	    else {
    	      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    	    }
    	  };

    	/**
    	 * Returns the generated line and column information for the original source,
    	 * line, and column positions provided. The only argument is an object with
    	 * the following properties:
    	 *
    	 *   - source: The filename of the original source.
    	 *   - line: The line number in the original source.  The line number
    	 *     is 1-based.
    	 *   - column: The column number in the original source.  The column
    	 *     number is 0-based.
    	 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
    	 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
    	 *     closest element that is smaller than or greater than the one we are
    	 *     searching for, respectively, if the exact element cannot be found.
    	 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
    	 *
    	 * and an object is returned with the following properties:
    	 *
    	 *   - line: The line number in the generated source, or null.  The
    	 *     line number is 1-based.
    	 *   - column: The column number in the generated source, or null.
    	 *     The column number is 0-based.
    	 */
    	BasicSourceMapConsumer.prototype.generatedPositionFor =
    	  function SourceMapConsumer_generatedPositionFor(aArgs) {
    	    var source = util.getArg(aArgs, 'source');
    	    source = this._findSourceIndex(source);
    	    if (source < 0) {
    	      return {
    	        line: null,
    	        column: null,
    	        lastColumn: null
    	      };
    	    }

    	    var needle = {
    	      source: source,
    	      originalLine: util.getArg(aArgs, 'line'),
    	      originalColumn: util.getArg(aArgs, 'column')
    	    };

    	    var index = this._findMapping(
    	      needle,
    	      this._originalMappings,
    	      "originalLine",
    	      "originalColumn",
    	      util.compareByOriginalPositions,
    	      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    	    );

    	    if (index >= 0) {
    	      var mapping = this._originalMappings[index];

    	      if (mapping.source === needle.source) {
    	        return {
    	          line: util.getArg(mapping, 'generatedLine', null),
    	          column: util.getArg(mapping, 'generatedColumn', null),
    	          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
    	        };
    	      }
    	    }

    	    return {
    	      line: null,
    	      column: null,
    	      lastColumn: null
    	    };
    	  };

    	sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

    	/**
    	 * An IndexedSourceMapConsumer instance represents a parsed source map which
    	 * we can query for information. It differs from BasicSourceMapConsumer in
    	 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
    	 * input.
    	 *
    	 * The first parameter is a raw source map (either as a JSON string, or already
    	 * parsed to an object). According to the spec for indexed source maps, they
    	 * have the following attributes:
    	 *
    	 *   - version: Which version of the source map spec this map is following.
    	 *   - file: Optional. The generated file this source map is associated with.
    	 *   - sections: A list of section definitions.
    	 *
    	 * Each value under the "sections" field has two fields:
    	 *   - offset: The offset into the original specified at which this section
    	 *       begins to apply, defined as an object with a "line" and "column"
    	 *       field.
    	 *   - map: A source map definition. This source map could also be indexed,
    	 *       but doesn't have to be.
    	 *
    	 * Instead of the "map" field, it's also possible to have a "url" field
    	 * specifying a URL to retrieve a source map from, but that's currently
    	 * unsupported.
    	 *
    	 * Here's an example source map, taken from the source map spec[0], but
    	 * modified to omit a section which uses the "url" field.
    	 *
    	 *  {
    	 *    version : 3,
    	 *    file: "app.js",
    	 *    sections: [{
    	 *      offset: {line:100, column:10},
    	 *      map: {
    	 *        version : 3,
    	 *        file: "section.js",
    	 *        sources: ["foo.js", "bar.js"],
    	 *        names: ["src", "maps", "are", "fun"],
    	 *        mappings: "AAAA,E;;ABCDE;"
    	 *      }
    	 *    }],
    	 *  }
    	 *
    	 * The second parameter, if given, is a string whose value is the URL
    	 * at which the source map was found.  This URL is used to compute the
    	 * sources array.
    	 *
    	 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
    	 */
    	function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
    	  var sourceMap = aSourceMap;
    	  if (typeof aSourceMap === 'string') {
    	    sourceMap = util.parseSourceMapInput(aSourceMap);
    	  }

    	  var version = util.getArg(sourceMap, 'version');
    	  var sections = util.getArg(sourceMap, 'sections');

    	  if (version != this._version) {
    	    throw new Error('Unsupported version: ' + version);
    	  }

    	  this._sources = new ArraySet();
    	  this._names = new ArraySet();

    	  var lastOffset = {
    	    line: -1,
    	    column: 0
    	  };
    	  this._sections = sections.map(function (s) {
    	    if (s.url) {
    	      // The url field will require support for asynchronicity.
    	      // See https://github.com/mozilla/source-map/issues/16
    	      throw new Error('Support for url field in sections not implemented.');
    	    }
    	    var offset = util.getArg(s, 'offset');
    	    var offsetLine = util.getArg(offset, 'line');
    	    var offsetColumn = util.getArg(offset, 'column');

    	    if (offsetLine < lastOffset.line ||
    	        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
    	      throw new Error('Section offsets must be ordered and non-overlapping.');
    	    }
    	    lastOffset = offset;

    	    return {
    	      generatedOffset: {
    	        // The offset fields are 0-based, but we use 1-based indices when
    	        // encoding/decoding from VLQ.
    	        generatedLine: offsetLine + 1,
    	        generatedColumn: offsetColumn + 1
    	      },
    	      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    	    }
    	  });
    	}

    	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

    	/**
    	 * The version of the source mapping spec that we are consuming.
    	 */
    	IndexedSourceMapConsumer.prototype._version = 3;

    	/**
    	 * The list of original sources.
    	 */
    	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
    	  get: function () {
    	    var sources = [];
    	    for (var i = 0; i < this._sections.length; i++) {
    	      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
    	        sources.push(this._sections[i].consumer.sources[j]);
    	      }
    	    }
    	    return sources;
    	  }
    	});

    	/**
    	 * Returns the original source, line, and column information for the generated
    	 * source's line and column positions provided. The only argument is an object
    	 * with the following properties:
    	 *
    	 *   - line: The line number in the generated source.  The line number
    	 *     is 1-based.
    	 *   - column: The column number in the generated source.  The column
    	 *     number is 0-based.
    	 *
    	 * and an object is returned with the following properties:
    	 *
    	 *   - source: The original source file, or null.
    	 *   - line: The line number in the original source, or null.  The
    	 *     line number is 1-based.
    	 *   - column: The column number in the original source, or null.  The
    	 *     column number is 0-based.
    	 *   - name: The original identifier, or null.
    	 */
    	IndexedSourceMapConsumer.prototype.originalPositionFor =
    	  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    	    var needle = {
    	      generatedLine: util.getArg(aArgs, 'line'),
    	      generatedColumn: util.getArg(aArgs, 'column')
    	    };

    	    // Find the section containing the generated position we're trying to map
    	    // to an original position.
    	    var sectionIndex = binarySearch.search(needle, this._sections,
    	      function(needle, section) {
    	        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
    	        if (cmp) {
    	          return cmp;
    	        }

    	        return (needle.generatedColumn -
    	                section.generatedOffset.generatedColumn);
    	      });
    	    var section = this._sections[sectionIndex];

    	    if (!section) {
    	      return {
    	        source: null,
    	        line: null,
    	        column: null,
    	        name: null
    	      };
    	    }

    	    return section.consumer.originalPositionFor({
    	      line: needle.generatedLine -
    	        (section.generatedOffset.generatedLine - 1),
    	      column: needle.generatedColumn -
    	        (section.generatedOffset.generatedLine === needle.generatedLine
    	         ? section.generatedOffset.generatedColumn - 1
    	         : 0),
    	      bias: aArgs.bias
    	    });
    	  };

    	/**
    	 * Return true if we have the source content for every source in the source
    	 * map, false otherwise.
    	 */
    	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
    	  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    	    return this._sections.every(function (s) {
    	      return s.consumer.hasContentsOfAllSources();
    	    });
    	  };

    	/**
    	 * Returns the original source content. The only argument is the url of the
    	 * original source file. Returns null if no original source content is
    	 * available.
    	 */
    	IndexedSourceMapConsumer.prototype.sourceContentFor =
    	  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    	    for (var i = 0; i < this._sections.length; i++) {
    	      var section = this._sections[i];

    	      var content = section.consumer.sourceContentFor(aSource, true);
    	      if (content) {
    	        return content;
    	      }
    	    }
    	    if (nullOnMissing) {
    	      return null;
    	    }
    	    else {
    	      throw new Error('"' + aSource + '" is not in the SourceMap.');
    	    }
    	  };

    	/**
    	 * Returns the generated line and column information for the original source,
    	 * line, and column positions provided. The only argument is an object with
    	 * the following properties:
    	 *
    	 *   - source: The filename of the original source.
    	 *   - line: The line number in the original source.  The line number
    	 *     is 1-based.
    	 *   - column: The column number in the original source.  The column
    	 *     number is 0-based.
    	 *
    	 * and an object is returned with the following properties:
    	 *
    	 *   - line: The line number in the generated source, or null.  The
    	 *     line number is 1-based. 
    	 *   - column: The column number in the generated source, or null.
    	 *     The column number is 0-based.
    	 */
    	IndexedSourceMapConsumer.prototype.generatedPositionFor =
    	  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    	    for (var i = 0; i < this._sections.length; i++) {
    	      var section = this._sections[i];

    	      // Only consider this section if the requested source is in the list of
    	      // sources of the consumer.
    	      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
    	        continue;
    	      }
    	      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
    	      if (generatedPosition) {
    	        var ret = {
    	          line: generatedPosition.line +
    	            (section.generatedOffset.generatedLine - 1),
    	          column: generatedPosition.column +
    	            (section.generatedOffset.generatedLine === generatedPosition.line
    	             ? section.generatedOffset.generatedColumn - 1
    	             : 0)
    	        };
    	        return ret;
    	      }
    	    }

    	    return {
    	      line: null,
    	      column: null
    	    };
    	  };

    	/**
    	 * Parse the mappings in a string in to a data structure which we can easily
    	 * query (the ordered arrays in the `this.__generatedMappings` and
    	 * `this.__originalMappings` properties).
    	 */
    	IndexedSourceMapConsumer.prototype._parseMappings =
    	  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    	    this.__generatedMappings = [];
    	    this.__originalMappings = [];
    	    for (var i = 0; i < this._sections.length; i++) {
    	      var section = this._sections[i];
    	      var sectionMappings = section.consumer._generatedMappings;
    	      for (var j = 0; j < sectionMappings.length; j++) {
    	        var mapping = sectionMappings[j];

    	        var source = section.consumer._sources.at(mapping.source);
    	        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
    	        this._sources.add(source);
    	        source = this._sources.indexOf(source);

    	        var name = null;
    	        if (mapping.name) {
    	          name = section.consumer._names.at(mapping.name);
    	          this._names.add(name);
    	          name = this._names.indexOf(name);
    	        }

    	        // The mappings coming from the consumer for the section have
    	        // generated positions relative to the start of the section, so we
    	        // need to offset them to be relative to the start of the concatenated
    	        // generated file.
    	        var adjustedMapping = {
    	          source: source,
    	          generatedLine: mapping.generatedLine +
    	            (section.generatedOffset.generatedLine - 1),
    	          generatedColumn: mapping.generatedColumn +
    	            (section.generatedOffset.generatedLine === mapping.generatedLine
    	            ? section.generatedOffset.generatedColumn - 1
    	            : 0),
    	          originalLine: mapping.originalLine,
    	          originalColumn: mapping.originalColumn,
    	          name: name
    	        };

    	        this.__generatedMappings.push(adjustedMapping);
    	        if (typeof adjustedMapping.originalLine === 'number') {
    	          this.__originalMappings.push(adjustedMapping);
    	        }
    	      }
    	    }

    	    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    	    quickSort(this.__originalMappings, util.compareByOriginalPositions);
    	  };

    	sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
    	return sourceMapConsumer;
    }

    var sourceNode = {};

    /* -*- Mode: js; js-indent-level: 2; -*- */

    var hasRequiredSourceNode;

    function requireSourceNode () {
    	if (hasRequiredSourceNode) return sourceNode;
    	hasRequiredSourceNode = 1;
    	/*
    	 * Copyright 2011 Mozilla Foundation and contributors
    	 * Licensed under the New BSD license. See LICENSE or:
    	 * http://opensource.org/licenses/BSD-3-Clause
    	 */

    	var SourceMapGenerator =  requireSourceMapGenerator().SourceMapGenerator;
    	var util = /*@__PURE__*/ requireUtil();

    	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
    	// operating systems these days (capturing the result).
    	var REGEX_NEWLINE = /(\r?\n)/;

    	// Newline character code for charCodeAt() comparisons
    	var NEWLINE_CODE = 10;

    	// Private symbol for identifying `SourceNode`s when multiple versions of
    	// the source-map library are loaded. This MUST NOT CHANGE across
    	// versions!
    	var isSourceNode = "$$$isSourceNode$$$";

    	/**
    	 * SourceNodes provide a way to abstract over interpolating/concatenating
    	 * snippets of generated JavaScript source code while maintaining the line and
    	 * column information associated with the original source code.
    	 *
    	 * @param aLine The original line number.
    	 * @param aColumn The original column number.
    	 * @param aSource The original source's filename.
    	 * @param aChunks Optional. An array of strings which are snippets of
    	 *        generated JS, or other SourceNodes.
    	 * @param aName The original identifier.
    	 */
    	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    	  this.children = [];
    	  this.sourceContents = {};
    	  this.line = aLine == null ? null : aLine;
    	  this.column = aColumn == null ? null : aColumn;
    	  this.source = aSource == null ? null : aSource;
    	  this.name = aName == null ? null : aName;
    	  this[isSourceNode] = true;
    	  if (aChunks != null) this.add(aChunks);
    	}

    	/**
    	 * Creates a SourceNode from generated code and a SourceMapConsumer.
    	 *
    	 * @param aGeneratedCode The generated code
    	 * @param aSourceMapConsumer The SourceMap for the generated code
    	 * @param aRelativePath Optional. The path that relative sources in the
    	 *        SourceMapConsumer should be relative to.
    	 */
    	SourceNode.fromStringWithSourceMap =
    	  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    	    // The SourceNode we want to fill with the generated code
    	    // and the SourceMap
    	    var node = new SourceNode();

    	    // All even indices of this array are one line of the generated code,
    	    // while all odd indices are the newlines between two adjacent lines
    	    // (since `REGEX_NEWLINE` captures its match).
    	    // Processed fragments are accessed by calling `shiftNextLine`.
    	    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    	    var remainingLinesIndex = 0;
    	    var shiftNextLine = function() {
    	      var lineContents = getNextLine();
    	      // The last line of a file might not have a newline.
    	      var newLine = getNextLine() || "";
    	      return lineContents + newLine;

    	      function getNextLine() {
    	        return remainingLinesIndex < remainingLines.length ?
    	            remainingLines[remainingLinesIndex++] : undefined;
    	      }
    	    };

    	    // We need to remember the position of "remainingLines"
    	    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    	    // The generate SourceNodes we need a code range.
    	    // To extract it current and last mapping is used.
    	    // Here we store the last mapping.
    	    var lastMapping = null;

    	    aSourceMapConsumer.eachMapping(function (mapping) {
    	      if (lastMapping !== null) {
    	        // We add the code from "lastMapping" to "mapping":
    	        // First check if there is a new line in between.
    	        if (lastGeneratedLine < mapping.generatedLine) {
    	          // Associate first line with "lastMapping"
    	          addMappingWithCode(lastMapping, shiftNextLine());
    	          lastGeneratedLine++;
    	          lastGeneratedColumn = 0;
    	          // The remaining code is added without mapping
    	        } else {
    	          // There is no new line in between.
    	          // Associate the code between "lastGeneratedColumn" and
    	          // "mapping.generatedColumn" with "lastMapping"
    	          var nextLine = remainingLines[remainingLinesIndex] || '';
    	          var code = nextLine.substr(0, mapping.generatedColumn -
    	                                        lastGeneratedColumn);
    	          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
    	                                              lastGeneratedColumn);
    	          lastGeneratedColumn = mapping.generatedColumn;
    	          addMappingWithCode(lastMapping, code);
    	          // No more remaining code, continue
    	          lastMapping = mapping;
    	          return;
    	        }
    	      }
    	      // We add the generated code until the first mapping
    	      // to the SourceNode without any mapping.
    	      // Each line is added as separate string.
    	      while (lastGeneratedLine < mapping.generatedLine) {
    	        node.add(shiftNextLine());
    	        lastGeneratedLine++;
    	      }
    	      if (lastGeneratedColumn < mapping.generatedColumn) {
    	        var nextLine = remainingLines[remainingLinesIndex] || '';
    	        node.add(nextLine.substr(0, mapping.generatedColumn));
    	        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
    	        lastGeneratedColumn = mapping.generatedColumn;
    	      }
    	      lastMapping = mapping;
    	    }, this);
    	    // We have processed all mappings.
    	    if (remainingLinesIndex < remainingLines.length) {
    	      if (lastMapping) {
    	        // Associate the remaining code in the current line with "lastMapping"
    	        addMappingWithCode(lastMapping, shiftNextLine());
    	      }
    	      // and add the remaining lines without any mapping
    	      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    	    }

    	    // Copy sourcesContent into SourceNode
    	    aSourceMapConsumer.sources.forEach(function (sourceFile) {
    	      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
    	      if (content != null) {
    	        if (aRelativePath != null) {
    	          sourceFile = util.join(aRelativePath, sourceFile);
    	        }
    	        node.setSourceContent(sourceFile, content);
    	      }
    	    });

    	    return node;

    	    function addMappingWithCode(mapping, code) {
    	      if (mapping === null || mapping.source === undefined) {
    	        node.add(code);
    	      } else {
    	        var source = aRelativePath
    	          ? util.join(aRelativePath, mapping.source)
    	          : mapping.source;
    	        node.add(new SourceNode(mapping.originalLine,
    	                                mapping.originalColumn,
    	                                source,
    	                                code,
    	                                mapping.name));
    	      }
    	    }
    	  };

    	/**
    	 * Add a chunk of generated JS to this source node.
    	 *
    	 * @param aChunk A string snippet of generated JS code, another instance of
    	 *        SourceNode, or an array where each member is one of those things.
    	 */
    	SourceNode.prototype.add = function SourceNode_add(aChunk) {
    	  if (Array.isArray(aChunk)) {
    	    aChunk.forEach(function (chunk) {
    	      this.add(chunk);
    	    }, this);
    	  }
    	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    	    if (aChunk) {
    	      this.children.push(aChunk);
    	    }
    	  }
    	  else {
    	    throw new TypeError(
    	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    	    );
    	  }
    	  return this;
    	};

    	/**
    	 * Add a chunk of generated JS to the beginning of this source node.
    	 *
    	 * @param aChunk A string snippet of generated JS code, another instance of
    	 *        SourceNode, or an array where each member is one of those things.
    	 */
    	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    	  if (Array.isArray(aChunk)) {
    	    for (var i = aChunk.length-1; i >= 0; i--) {
    	      this.prepend(aChunk[i]);
    	    }
    	  }
    	  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    	    this.children.unshift(aChunk);
    	  }
    	  else {
    	    throw new TypeError(
    	      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    	    );
    	  }
    	  return this;
    	};

    	/**
    	 * Walk over the tree of JS snippets in this node and its children. The
    	 * walking function is called once for each snippet of JS and is passed that
    	 * snippet and the its original associated source's line/column location.
    	 *
    	 * @param aFn The traversal function.
    	 */
    	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    	  var chunk;
    	  for (var i = 0, len = this.children.length; i < len; i++) {
    	    chunk = this.children[i];
    	    if (chunk[isSourceNode]) {
    	      chunk.walk(aFn);
    	    }
    	    else {
    	      if (chunk !== '') {
    	        aFn(chunk, { source: this.source,
    	                     line: this.line,
    	                     column: this.column,
    	                     name: this.name });
    	      }
    	    }
    	  }
    	};

    	/**
    	 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
    	 * each of `this.children`.
    	 *
    	 * @param aSep The separator.
    	 */
    	SourceNode.prototype.join = function SourceNode_join(aSep) {
    	  var newChildren;
    	  var i;
    	  var len = this.children.length;
    	  if (len > 0) {
    	    newChildren = [];
    	    for (i = 0; i < len-1; i++) {
    	      newChildren.push(this.children[i]);
    	      newChildren.push(aSep);
    	    }
    	    newChildren.push(this.children[i]);
    	    this.children = newChildren;
    	  }
    	  return this;
    	};

    	/**
    	 * Call String.prototype.replace on the very right-most source snippet. Useful
    	 * for trimming whitespace from the end of a source node, etc.
    	 *
    	 * @param aPattern The pattern to replace.
    	 * @param aReplacement The thing to replace the pattern with.
    	 */
    	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    	  var lastChild = this.children[this.children.length - 1];
    	  if (lastChild[isSourceNode]) {
    	    lastChild.replaceRight(aPattern, aReplacement);
    	  }
    	  else if (typeof lastChild === 'string') {
    	    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    	  }
    	  else {
    	    this.children.push(''.replace(aPattern, aReplacement));
    	  }
    	  return this;
    	};

    	/**
    	 * Set the source content for a source file. This will be added to the SourceMapGenerator
    	 * in the sourcesContent field.
    	 *
    	 * @param aSourceFile The filename of the source file
    	 * @param aSourceContent The content of the source file
    	 */
    	SourceNode.prototype.setSourceContent =
    	  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    	    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    	  };

    	/**
    	 * Walk over the tree of SourceNodes. The walking function is called for each
    	 * source file content and is passed the filename and source content.
    	 *
    	 * @param aFn The traversal function.
    	 */
    	SourceNode.prototype.walkSourceContents =
    	  function SourceNode_walkSourceContents(aFn) {
    	    for (var i = 0, len = this.children.length; i < len; i++) {
    	      if (this.children[i][isSourceNode]) {
    	        this.children[i].walkSourceContents(aFn);
    	      }
    	    }

    	    var sources = Object.keys(this.sourceContents);
    	    for (var i = 0, len = sources.length; i < len; i++) {
    	      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    	    }
    	  };

    	/**
    	 * Return the string representation of this source node. Walks over the tree
    	 * and concatenates all the various snippets together to one string.
    	 */
    	SourceNode.prototype.toString = function SourceNode_toString() {
    	  var str = "";
    	  this.walk(function (chunk) {
    	    str += chunk;
    	  });
    	  return str;
    	};

    	/**
    	 * Returns the string representation of this source node along with a source
    	 * map.
    	 */
    	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    	  var generated = {
    	    code: "",
    	    line: 1,
    	    column: 0
    	  };
    	  var map = new SourceMapGenerator(aArgs);
    	  var sourceMappingActive = false;
    	  var lastOriginalSource = null;
    	  var lastOriginalLine = null;
    	  var lastOriginalColumn = null;
    	  var lastOriginalName = null;
    	  this.walk(function (chunk, original) {
    	    generated.code += chunk;
    	    if (original.source !== null
    	        && original.line !== null
    	        && original.column !== null) {
    	      if(lastOriginalSource !== original.source
    	         || lastOriginalLine !== original.line
    	         || lastOriginalColumn !== original.column
    	         || lastOriginalName !== original.name) {
    	        map.addMapping({
    	          source: original.source,
    	          original: {
    	            line: original.line,
    	            column: original.column
    	          },
    	          generated: {
    	            line: generated.line,
    	            column: generated.column
    	          },
    	          name: original.name
    	        });
    	      }
    	      lastOriginalSource = original.source;
    	      lastOriginalLine = original.line;
    	      lastOriginalColumn = original.column;
    	      lastOriginalName = original.name;
    	      sourceMappingActive = true;
    	    } else if (sourceMappingActive) {
    	      map.addMapping({
    	        generated: {
    	          line: generated.line,
    	          column: generated.column
    	        }
    	      });
    	      lastOriginalSource = null;
    	      sourceMappingActive = false;
    	    }
    	    for (var idx = 0, length = chunk.length; idx < length; idx++) {
    	      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
    	        generated.line++;
    	        generated.column = 0;
    	        // Mappings end at eol
    	        if (idx + 1 === length) {
    	          lastOriginalSource = null;
    	          sourceMappingActive = false;
    	        } else if (sourceMappingActive) {
    	          map.addMapping({
    	            source: original.source,
    	            original: {
    	              line: original.line,
    	              column: original.column
    	            },
    	            generated: {
    	              line: generated.line,
    	              column: generated.column
    	            },
    	            name: original.name
    	          });
    	        }
    	      } else {
    	        generated.column++;
    	      }
    	    }
    	  });
    	  this.walkSourceContents(function (sourceFile, sourceContent) {
    	    map.setSourceContent(sourceFile, sourceContent);
    	  });

    	  return { code: generated.code, map: map };
    	};

    	sourceNode.SourceNode = SourceNode;
    	return sourceNode;
    }

    /*
     * Copyright 2009-2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE.txt or:
     * http://opensource.org/licenses/BSD-3-Clause
     */

    var hasRequiredSourceMap;

    function requireSourceMap () {
    	if (hasRequiredSourceMap) return sourceMap;
    	hasRequiredSourceMap = 1;
    	sourceMap.SourceMapGenerator =  requireSourceMapGenerator().SourceMapGenerator;
    	sourceMap.SourceMapConsumer =  requireSourceMapConsumer().SourceMapConsumer;
    	sourceMap.SourceNode =  requireSourceNode().SourceNode;
    	return sourceMap;
    }

    /* global define, require */

    var hasRequiredCodeGen;

    function requireCodeGen () {
    	if (hasRequiredCodeGen) return codeGen.exports;
    	hasRequiredCodeGen = 1;
    	(function (module, exports) {

    		exports.__esModule = true;

    		var _utils = /*@__PURE__*/ requireUtils();

    		var SourceNode = undefined;

    		try {
    		  /* istanbul ignore next */
    		  if (typeof undefined !== 'function' || !undefined.amd) {
    		    // We don't support this in AMD environments. For these environments, we assume that
    		    // they are running on the browser and thus have no need for the source-map library.
    		    var SourceMap = /*@__PURE__*/ requireSourceMap();
    		    SourceNode = SourceMap.SourceNode;
    		  }
    		} catch (err) {}
    		/* NOP */

    		/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
    		if (!SourceNode) {
    		  SourceNode = function (line, column, srcFile, chunks) {
    		    this.src = '';
    		    if (chunks) {
    		      this.add(chunks);
    		    }
    		  };
    		  /* istanbul ignore next */
    		  SourceNode.prototype = {
    		    add: function add(chunks) {
    		      if (_utils.isArray(chunks)) {
    		        chunks = chunks.join('');
    		      }
    		      this.src += chunks;
    		    },
    		    prepend: function prepend(chunks) {
    		      if (_utils.isArray(chunks)) {
    		        chunks = chunks.join('');
    		      }
    		      this.src = chunks + this.src;
    		    },
    		    toStringWithSourceMap: function toStringWithSourceMap() {
    		      return { code: this.toString() };
    		    },
    		    toString: function toString() {
    		      return this.src;
    		    }
    		  };
    		}

    		function castChunk(chunk, codeGen, loc) {
    		  if (_utils.isArray(chunk)) {
    		    var ret = [];

    		    for (var i = 0, len = chunk.length; i < len; i++) {
    		      ret.push(codeGen.wrap(chunk[i], loc));
    		    }
    		    return ret;
    		  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
    		    // Handle primitives that the SourceNode will throw up on
    		    return chunk + '';
    		  }
    		  return chunk;
    		}

    		function CodeGen(srcFile) {
    		  this.srcFile = srcFile;
    		  this.source = [];
    		}

    		CodeGen.prototype = {
    		  isEmpty: function isEmpty() {
    		    return !this.source.length;
    		  },
    		  prepend: function prepend(source, loc) {
    		    this.source.unshift(this.wrap(source, loc));
    		  },
    		  push: function push(source, loc) {
    		    this.source.push(this.wrap(source, loc));
    		  },

    		  merge: function merge() {
    		    var source = this.empty();
    		    this.each(function (line) {
    		      source.add(['  ', line, '\n']);
    		    });
    		    return source;
    		  },

    		  each: function each(iter) {
    		    for (var i = 0, len = this.source.length; i < len; i++) {
    		      iter(this.source[i]);
    		    }
    		  },

    		  empty: function empty() {
    		    var loc = this.currentLocation || { start: {} };
    		    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
    		  },
    		  wrap: function wrap(chunk) {
    		    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

    		    if (chunk instanceof SourceNode) {
    		      return chunk;
    		    }

    		    chunk = castChunk(chunk, this, loc);

    		    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
    		  },

    		  functionCall: function functionCall(fn, type, params) {
    		    params = this.generateList(params);
    		    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
    		  },

    		  quotedString: function quotedString(str) {
    		    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
    		    .replace(/\u2029/g, '\\u2029') + '"';
    		  },

    		  objectLiteral: function objectLiteral(obj) {
    		    // istanbul ignore next

    		    var _this = this;

    		    var pairs = [];

    		    Object.keys(obj).forEach(function (key) {
    		      var value = castChunk(obj[key], _this);
    		      if (value !== 'undefined') {
    		        pairs.push([_this.quotedString(key), ':', value]);
    		      }
    		    });

    		    var ret = this.generateList(pairs);
    		    ret.prepend('{');
    		    ret.add('}');
    		    return ret;
    		  },

    		  generateList: function generateList(entries) {
    		    var ret = this.empty();

    		    for (var i = 0, len = entries.length; i < len; i++) {
    		      if (i) {
    		        ret.add(',');
    		      }

    		      ret.add(castChunk(entries[i], this));
    		    }

    		    return ret;
    		  },

    		  generateArray: function generateArray(entries) {
    		    var ret = this.generateList(entries);
    		    ret.prepend('[');
    		    ret.add(']');

    		    return ret;
    		  }
    		};

    		exports['default'] = CodeGen;
    		module.exports = exports['default'];
    		
    	} (codeGen, codeGen.exports));
    	return codeGen.exports;
    }

    var hasRequiredJavascriptCompiler;

    function requireJavascriptCompiler () {
    	if (hasRequiredJavascriptCompiler) return javascriptCompiler.exports;
    	hasRequiredJavascriptCompiler = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		// istanbul ignore next

    		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    		var _base = /*@__PURE__*/ requireBase$1();

    		var _exception = /*@__PURE__*/ requireException();

    		var _exception2 = _interopRequireDefault(_exception);

    		var _utils = /*@__PURE__*/ requireUtils();

    		var _codeGen = /*@__PURE__*/ requireCodeGen();

    		var _codeGen2 = _interopRequireDefault(_codeGen);

    		function Literal(value) {
    		  this.value = value;
    		}

    		function JavaScriptCompiler() {}

    		JavaScriptCompiler.prototype = {
    		  // PUBLIC API: You can override these methods in a subclass to provide
    		  // alternative compiled forms for name lookup and buffering semantics
    		  nameLookup: function nameLookup(parent, name /*,  type */) {
    		    return this.internalNameLookup(parent, name);
    		  },
    		  depthedLookup: function depthedLookup(name) {
    		    return [this.aliasable('container.lookup'), '(depths, ', JSON.stringify(name), ')'];
    		  },

    		  compilerInfo: function compilerInfo() {
    		    var revision = _base.COMPILER_REVISION,
    		        versions = _base.REVISION_CHANGES[revision];
    		    return [revision, versions];
    		  },

    		  appendToBuffer: function appendToBuffer(source, location, explicit) {
    		    // Force a source as this simplifies the merge logic.
    		    if (!_utils.isArray(source)) {
    		      source = [source];
    		    }
    		    source = this.source.wrap(source, location);

    		    if (this.environment.isSimple) {
    		      return ['return ', source, ';'];
    		    } else if (explicit) {
    		      // This is a case where the buffer operation occurs as a child of another
    		      // construct, generally braces. We have to explicitly output these buffer
    		      // operations to ensure that the emitted code goes in the correct location.
    		      return ['buffer += ', source, ';'];
    		    } else {
    		      source.appendToBuffer = true;
    		      return source;
    		    }
    		  },

    		  initializeBuffer: function initializeBuffer() {
    		    return this.quotedString('');
    		  },
    		  // END PUBLIC API
    		  internalNameLookup: function internalNameLookup(parent, name) {
    		    this.lookupPropertyFunctionIsUsed = true;
    		    return ['lookupProperty(', parent, ',', JSON.stringify(name), ')'];
    		  },

    		  lookupPropertyFunctionIsUsed: false,

    		  compile: function compile(environment, options, context, asObject) {
    		    this.environment = environment;
    		    this.options = options;
    		    this.stringParams = this.options.stringParams;
    		    this.trackIds = this.options.trackIds;
    		    this.precompile = !asObject;

    		    this.name = this.environment.name;
    		    this.isChild = !!context;
    		    this.context = context || {
    		      decorators: [],
    		      programs: [],
    		      environments: []
    		    };

    		    this.preamble();

    		    this.stackSlot = 0;
    		    this.stackVars = [];
    		    this.aliases = {};
    		    this.registers = { list: [] };
    		    this.hashes = [];
    		    this.compileStack = [];
    		    this.inlineStack = [];
    		    this.blockParams = [];

    		    this.compileChildren(environment, options);

    		    this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
    		    this.useBlockParams = this.useBlockParams || environment.useBlockParams;

    		    var opcodes = environment.opcodes,
    		        opcode = undefined,
    		        firstLoc = undefined,
    		        i = undefined,
    		        l = undefined;

    		    for (i = 0, l = opcodes.length; i < l; i++) {
    		      opcode = opcodes[i];

    		      this.source.currentLocation = opcode.loc;
    		      firstLoc = firstLoc || opcode.loc;
    		      this[opcode.opcode].apply(this, opcode.args);
    		    }

    		    // Flush any trailing content that might be pending.
    		    this.source.currentLocation = firstLoc;
    		    this.pushSource('');

    		    /* istanbul ignore next */
    		    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
    		      throw new _exception2['default']('Compile completed with content left on stack');
    		    }

    		    if (!this.decorators.isEmpty()) {
    		      this.useDecorators = true;

    		      this.decorators.prepend(['var decorators = container.decorators, ', this.lookupPropertyFunctionVarDeclaration(), ';\n']);
    		      this.decorators.push('return fn;');

    		      if (asObject) {
    		        this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
    		      } else {
    		        this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
    		        this.decorators.push('}\n');
    		        this.decorators = this.decorators.merge();
    		      }
    		    } else {
    		      this.decorators = undefined;
    		    }

    		    var fn = this.createFunctionContext(asObject);
    		    if (!this.isChild) {
    		      var ret = {
    		        compiler: this.compilerInfo(),
    		        main: fn
    		      };

    		      if (this.decorators) {
    		        ret.main_d = this.decorators; // eslint-disable-line camelcase
    		        ret.useDecorators = true;
    		      }

    		      var _context = this.context;
    		      var programs = _context.programs;
    		      var decorators = _context.decorators;

    		      for (i = 0, l = programs.length; i < l; i++) {
    		        if (programs[i]) {
    		          ret[i] = programs[i];
    		          if (decorators[i]) {
    		            ret[i + '_d'] = decorators[i];
    		            ret.useDecorators = true;
    		          }
    		        }
    		      }

    		      if (this.environment.usePartial) {
    		        ret.usePartial = true;
    		      }
    		      if (this.options.data) {
    		        ret.useData = true;
    		      }
    		      if (this.useDepths) {
    		        ret.useDepths = true;
    		      }
    		      if (this.useBlockParams) {
    		        ret.useBlockParams = true;
    		      }
    		      if (this.options.compat) {
    		        ret.compat = true;
    		      }

    		      if (!asObject) {
    		        ret.compiler = JSON.stringify(ret.compiler);

    		        this.source.currentLocation = { start: { line: 1, column: 0 } };
    		        ret = this.objectLiteral(ret);

    		        if (options.srcName) {
    		          ret = ret.toStringWithSourceMap({ file: options.destName });
    		          ret.map = ret.map && ret.map.toString();
    		        } else {
    		          ret = ret.toString();
    		        }
    		      } else {
    		        ret.compilerOptions = this.options;
    		      }

    		      return ret;
    		    } else {
    		      return fn;
    		    }
    		  },

    		  preamble: function preamble() {
    		    // track the last context pushed into place to allow skipping the
    		    // getContext opcode when it would be a noop
    		    this.lastContext = 0;
    		    this.source = new _codeGen2['default'](this.options.srcName);
    		    this.decorators = new _codeGen2['default'](this.options.srcName);
    		  },

    		  createFunctionContext: function createFunctionContext(asObject) {
    		    // istanbul ignore next

    		    var _this = this;

    		    var varDeclarations = '';

    		    var locals = this.stackVars.concat(this.registers.list);
    		    if (locals.length > 0) {
    		      varDeclarations += ', ' + locals.join(', ');
    		    }

    		    // Generate minimizer alias mappings
    		    //
    		    // When using true SourceNodes, this will update all references to the given alias
    		    // as the source nodes are reused in situ. For the non-source node compilation mode,
    		    // aliases will not be used, but this case is already being run on the client and
    		    // we aren't concern about minimizing the template size.
    		    var aliasCount = 0;
    		    Object.keys(this.aliases).forEach(function (alias) {
    		      var node = _this.aliases[alias];
    		      if (node.children && node.referenceCount > 1) {
    		        varDeclarations += ', alias' + ++aliasCount + '=' + alias;
    		        node.children[0] = 'alias' + aliasCount;
    		      }
    		    });

    		    if (this.lookupPropertyFunctionIsUsed) {
    		      varDeclarations += ', ' + this.lookupPropertyFunctionVarDeclaration();
    		    }

    		    var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

    		    if (this.useBlockParams || this.useDepths) {
    		      params.push('blockParams');
    		    }
    		    if (this.useDepths) {
    		      params.push('depths');
    		    }

    		    // Perform a second pass over the output to merge content when possible
    		    var source = this.mergeSource(varDeclarations);

    		    if (asObject) {
    		      params.push(source);

    		      return Function.apply(this, params);
    		    } else {
    		      return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
    		    }
    		  },
    		  mergeSource: function mergeSource(varDeclarations) {
    		    var isSimple = this.environment.isSimple,
    		        appendOnly = !this.forceBuffer,
    		        appendFirst = undefined,
    		        sourceSeen = undefined,
    		        bufferStart = undefined,
    		        bufferEnd = undefined;
    		    this.source.each(function (line) {
    		      if (line.appendToBuffer) {
    		        if (bufferStart) {
    		          line.prepend('  + ');
    		        } else {
    		          bufferStart = line;
    		        }
    		        bufferEnd = line;
    		      } else {
    		        if (bufferStart) {
    		          if (!sourceSeen) {
    		            appendFirst = true;
    		          } else {
    		            bufferStart.prepend('buffer += ');
    		          }
    		          bufferEnd.add(';');
    		          bufferStart = bufferEnd = undefined;
    		        }

    		        sourceSeen = true;
    		        if (!isSimple) {
    		          appendOnly = false;
    		        }
    		      }
    		    });

    		    if (appendOnly) {
    		      if (bufferStart) {
    		        bufferStart.prepend('return ');
    		        bufferEnd.add(';');
    		      } else if (!sourceSeen) {
    		        this.source.push('return "";');
    		      }
    		    } else {
    		      varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

    		      if (bufferStart) {
    		        bufferStart.prepend('return buffer + ');
    		        bufferEnd.add(';');
    		      } else {
    		        this.source.push('return buffer;');
    		      }
    		    }

    		    if (varDeclarations) {
    		      this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
    		    }

    		    return this.source.merge();
    		  },

    		  lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
    		    return '\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    '.trim();
    		  },

    		  // [blockValue]
    		  //
    		  // On stack, before: hash, inverse, program, value
    		  // On stack, after: return value of blockHelperMissing
    		  //
    		  // The purpose of this opcode is to take a block of the form
    		  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
    		  // replace it on the stack with the result of properly
    		  // invoking blockHelperMissing.
    		  blockValue: function blockValue(name) {
    		    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
    		        params = [this.contextName(0)];
    		    this.setupHelperArgs(name, 0, params);

    		    var blockName = this.popStack();
    		    params.splice(1, 0, blockName);

    		    this.push(this.source.functionCall(blockHelperMissing, 'call', params));
    		  },

    		  // [ambiguousBlockValue]
    		  //
    		  // On stack, before: hash, inverse, program, value
    		  // Compiler value, before: lastHelper=value of last found helper, if any
    		  // On stack, after, if no lastHelper: same as [blockValue]
    		  // On stack, after, if lastHelper: value
    		  ambiguousBlockValue: function ambiguousBlockValue() {
    		    // We're being a bit cheeky and reusing the options value from the prior exec
    		    var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
    		        params = [this.contextName(0)];
    		    this.setupHelperArgs('', 0, params, true);

    		    this.flushInline();

    		    var current = this.topStack();
    		    params.splice(1, 0, current);

    		    this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
    		  },

    		  // [appendContent]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: ...
    		  //
    		  // Appends the string value of `content` to the current buffer
    		  appendContent: function appendContent(content) {
    		    if (this.pendingContent) {
    		      content = this.pendingContent + content;
    		    } else {
    		      this.pendingLocation = this.source.currentLocation;
    		    }

    		    this.pendingContent = content;
    		  },

    		  // [append]
    		  //
    		  // On stack, before: value, ...
    		  // On stack, after: ...
    		  //
    		  // Coerces `value` to a String and appends it to the current buffer.
    		  //
    		  // If `value` is truthy, or 0, it is coerced into a string and appended
    		  // Otherwise, the empty string is appended
    		  append: function append() {
    		    if (this.isInline()) {
    		      this.replaceStack(function (current) {
    		        return [' != null ? ', current, ' : ""'];
    		      });

    		      this.pushSource(this.appendToBuffer(this.popStack()));
    		    } else {
    		      var local = this.popStack();
    		      this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
    		      if (this.environment.isSimple) {
    		        this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
    		      }
    		    }
    		  },

    		  // [appendEscaped]
    		  //
    		  // On stack, before: value, ...
    		  // On stack, after: ...
    		  //
    		  // Escape `value` and append it to the buffer
    		  appendEscaped: function appendEscaped() {
    		    this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
    		  },

    		  // [getContext]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: ...
    		  // Compiler value, after: lastContext=depth
    		  //
    		  // Set the value of the `lastContext` compiler value to the depth
    		  getContext: function getContext(depth) {
    		    this.lastContext = depth;
    		  },

    		  // [pushContext]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: currentContext, ...
    		  //
    		  // Pushes the value of the current context onto the stack.
    		  pushContext: function pushContext() {
    		    this.pushStackLiteral(this.contextName(this.lastContext));
    		  },

    		  // [lookupOnContext]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: currentContext[name], ...
    		  //
    		  // Looks up the value of `name` on the current context and pushes
    		  // it onto the stack.
    		  lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
    		    var i = 0;

    		    if (!scoped && this.options.compat && !this.lastContext) {
    		      // The depthed query is expected to handle the undefined logic for the root level that
    		      // is implemented below, so we evaluate that directly in compat mode
    		      this.push(this.depthedLookup(parts[i++]));
    		    } else {
    		      this.pushContext();
    		    }

    		    this.resolvePath('context', parts, i, falsy, strict);
    		  },

    		  // [lookupBlockParam]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: blockParam[name], ...
    		  //
    		  // Looks up the value of `parts` on the given block param and pushes
    		  // it onto the stack.
    		  lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
    		    this.useBlockParams = true;

    		    this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
    		    this.resolvePath('context', parts, 1);
    		  },

    		  // [lookupData]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: data, ...
    		  //
    		  // Push the data lookup operator
    		  lookupData: function lookupData(depth, parts, strict) {
    		    if (!depth) {
    		      this.pushStackLiteral('data');
    		    } else {
    		      this.pushStackLiteral('container.data(data, ' + depth + ')');
    		    }

    		    this.resolvePath('data', parts, 0, true, strict);
    		  },

    		  resolvePath: function resolvePath(type, parts, i, falsy, strict) {
    		    // istanbul ignore next

    		    var _this2 = this;

    		    if (this.options.strict || this.options.assumeObjects) {
    		      this.push(strictLookup(this.options.strict && strict, this, parts, i, type));
    		      return;
    		    }

    		    var len = parts.length;
    		    for (; i < len; i++) {
    		      /* eslint-disable no-loop-func */
    		      this.replaceStack(function (current) {
    		        var lookup = _this2.nameLookup(current, parts[i], type);
    		        // We want to ensure that zero and false are handled properly if the context (falsy flag)
    		        // needs to have the special handling for these values.
    		        if (!falsy) {
    		          return [' != null ? ', lookup, ' : ', current];
    		        } else {
    		          // Otherwise we can use generic falsy handling
    		          return [' && ', lookup];
    		        }
    		      });
    		      /* eslint-enable no-loop-func */
    		    }
    		  },

    		  // [resolvePossibleLambda]
    		  //
    		  // On stack, before: value, ...
    		  // On stack, after: resolved value, ...
    		  //
    		  // If the `value` is a lambda, replace it on the stack by
    		  // the return value of the lambda
    		  resolvePossibleLambda: function resolvePossibleLambda() {
    		    this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
    		  },

    		  // [pushStringParam]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: string, currentContext, ...
    		  //
    		  // This opcode is designed for use in string mode, which
    		  // provides the string value of a parameter along with its
    		  // depth rather than resolving it immediately.
    		  pushStringParam: function pushStringParam(string, type) {
    		    this.pushContext();
    		    this.pushString(type);

    		    // If it's a subexpression, the string result
    		    // will be pushed after this opcode.
    		    if (type !== 'SubExpression') {
    		      if (typeof string === 'string') {
    		        this.pushString(string);
    		      } else {
    		        this.pushStackLiteral(string);
    		      }
    		    }
    		  },

    		  emptyHash: function emptyHash(omitEmpty) {
    		    if (this.trackIds) {
    		      this.push('{}'); // hashIds
    		    }
    		    if (this.stringParams) {
    		      this.push('{}'); // hashContexts
    		      this.push('{}'); // hashTypes
    		    }
    		    this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
    		  },
    		  pushHash: function pushHash() {
    		    if (this.hash) {
    		      this.hashes.push(this.hash);
    		    }
    		    this.hash = { values: {}, types: [], contexts: [], ids: [] };
    		  },
    		  popHash: function popHash() {
    		    var hash = this.hash;
    		    this.hash = this.hashes.pop();

    		    if (this.trackIds) {
    		      this.push(this.objectLiteral(hash.ids));
    		    }
    		    if (this.stringParams) {
    		      this.push(this.objectLiteral(hash.contexts));
    		      this.push(this.objectLiteral(hash.types));
    		    }

    		    this.push(this.objectLiteral(hash.values));
    		  },

    		  // [pushString]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: quotedString(string), ...
    		  //
    		  // Push a quoted version of `string` onto the stack
    		  pushString: function pushString(string) {
    		    this.pushStackLiteral(this.quotedString(string));
    		  },

    		  // [pushLiteral]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: value, ...
    		  //
    		  // Pushes a value onto the stack. This operation prevents
    		  // the compiler from creating a temporary variable to hold
    		  // it.
    		  pushLiteral: function pushLiteral(value) {
    		    this.pushStackLiteral(value);
    		  },

    		  // [pushProgram]
    		  //
    		  // On stack, before: ...
    		  // On stack, after: program(guid), ...
    		  //
    		  // Push a program expression onto the stack. This takes
    		  // a compile-time guid and converts it into a runtime-accessible
    		  // expression.
    		  pushProgram: function pushProgram(guid) {
    		    if (guid != null) {
    		      this.pushStackLiteral(this.programExpression(guid));
    		    } else {
    		      this.pushStackLiteral(null);
    		    }
    		  },

    		  // [registerDecorator]
    		  //
    		  // On stack, before: hash, program, params..., ...
    		  // On stack, after: ...
    		  //
    		  // Pops off the decorator's parameters, invokes the decorator,
    		  // and inserts the decorator into the decorators list.
    		  registerDecorator: function registerDecorator(paramSize, name) {
    		    var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
    		        options = this.setupHelperArgs(name, paramSize);

    		    this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
    		  },

    		  // [invokeHelper]
    		  //
    		  // On stack, before: hash, inverse, program, params..., ...
    		  // On stack, after: result of helper invocation
    		  //
    		  // Pops off the helper's parameters, invokes the helper,
    		  // and pushes the helper's return value onto the stack.
    		  //
    		  // If the helper is not found, `helperMissing` is called.
    		  invokeHelper: function invokeHelper(paramSize, name, isSimple) {
    		    var nonHelper = this.popStack(),
    		        helper = this.setupHelper(paramSize, name);

    		    var possibleFunctionCalls = [];

    		    if (isSimple) {
    		      // direct call to helper
    		      possibleFunctionCalls.push(helper.name);
    		    }
    		    // call a function from the input object
    		    possibleFunctionCalls.push(nonHelper);
    		    if (!this.options.strict) {
    		      possibleFunctionCalls.push(this.aliasable('container.hooks.helperMissing'));
    		    }

    		    var functionLookupCode = ['(', this.itemsSeparatedBy(possibleFunctionCalls, '||'), ')'];
    		    var functionCall = this.source.functionCall(functionLookupCode, 'call', helper.callParams);
    		    this.push(functionCall);
    		  },

    		  itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
    		    var result = [];
    		    result.push(items[0]);
    		    for (var i = 1; i < items.length; i++) {
    		      result.push(separator, items[i]);
    		    }
    		    return result;
    		  },
    		  // [invokeKnownHelper]
    		  //
    		  // On stack, before: hash, inverse, program, params..., ...
    		  // On stack, after: result of helper invocation
    		  //
    		  // This operation is used when the helper is known to exist,
    		  // so a `helperMissing` fallback is not required.
    		  invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
    		    var helper = this.setupHelper(paramSize, name);
    		    this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
    		  },

    		  // [invokeAmbiguous]
    		  //
    		  // On stack, before: hash, inverse, program, params..., ...
    		  // On stack, after: result of disambiguation
    		  //
    		  // This operation is used when an expression like `{{foo}}`
    		  // is provided, but we don't know at compile-time whether it
    		  // is a helper or a path.
    		  //
    		  // This operation emits more code than the other options,
    		  // and can be avoided by passing the `knownHelpers` and
    		  // `knownHelpersOnly` flags at compile-time.
    		  invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
    		    this.useRegister('helper');

    		    var nonHelper = this.popStack();

    		    this.emptyHash();
    		    var helper = this.setupHelper(0, name, helperCall);

    		    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

    		    var lookup = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
    		    if (!this.options.strict) {
    		      lookup[0] = '(helper = ';
    		      lookup.push(' != null ? helper : ', this.aliasable('container.hooks.helperMissing'));
    		    }

    		    this.push(['(', lookup, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
    		  },

    		  // [invokePartial]
    		  //
    		  // On stack, before: context, ...
    		  // On stack after: result of partial invocation
    		  //
    		  // This operation pops off a context, invokes a partial with that context,
    		  // and pushes the result of the invocation back.
    		  invokePartial: function invokePartial(isDynamic, name, indent) {
    		    var params = [],
    		        options = this.setupParams(name, 1, params);

    		    if (isDynamic) {
    		      name = this.popStack();
    		      delete options.name;
    		    }

    		    if (indent) {
    		      options.indent = JSON.stringify(indent);
    		    }
    		    options.helpers = 'helpers';
    		    options.partials = 'partials';
    		    options.decorators = 'container.decorators';

    		    if (!isDynamic) {
    		      params.unshift(this.nameLookup('partials', name, 'partial'));
    		    } else {
    		      params.unshift(name);
    		    }

    		    if (this.options.compat) {
    		      options.depths = 'depths';
    		    }
    		    options = this.objectLiteral(options);
    		    params.push(options);

    		    this.push(this.source.functionCall('container.invokePartial', '', params));
    		  },

    		  // [assignToHash]
    		  //
    		  // On stack, before: value, ..., hash, ...
    		  // On stack, after: ..., hash, ...
    		  //
    		  // Pops a value off the stack and assigns it to the current hash
    		  assignToHash: function assignToHash(key) {
    		    var value = this.popStack(),
    		        context = undefined,
    		        type = undefined,
    		        id = undefined;

    		    if (this.trackIds) {
    		      id = this.popStack();
    		    }
    		    if (this.stringParams) {
    		      type = this.popStack();
    		      context = this.popStack();
    		    }

    		    var hash = this.hash;
    		    if (context) {
    		      hash.contexts[key] = context;
    		    }
    		    if (type) {
    		      hash.types[key] = type;
    		    }
    		    if (id) {
    		      hash.ids[key] = id;
    		    }
    		    hash.values[key] = value;
    		  },

    		  pushId: function pushId(type, name, child) {
    		    if (type === 'BlockParam') {
    		      this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
    		    } else if (type === 'PathExpression') {
    		      this.pushString(name);
    		    } else if (type === 'SubExpression') {
    		      this.pushStackLiteral('true');
    		    } else {
    		      this.pushStackLiteral('null');
    		    }
    		  },

    		  // HELPERS

    		  compiler: JavaScriptCompiler,

    		  compileChildren: function compileChildren(environment, options) {
    		    var children = environment.children,
    		        child = undefined,
    		        compiler = undefined;

    		    for (var i = 0, l = children.length; i < l; i++) {
    		      child = children[i];
    		      compiler = new this.compiler(); // eslint-disable-line new-cap

    		      var existing = this.matchExistingProgram(child);

    		      if (existing == null) {
    		        this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
    		        var index = this.context.programs.length;
    		        child.index = index;
    		        child.name = 'program' + index;
    		        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
    		        this.context.decorators[index] = compiler.decorators;
    		        this.context.environments[index] = child;

    		        this.useDepths = this.useDepths || compiler.useDepths;
    		        this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
    		        child.useDepths = this.useDepths;
    		        child.useBlockParams = this.useBlockParams;
    		      } else {
    		        child.index = existing.index;
    		        child.name = 'program' + existing.index;

    		        this.useDepths = this.useDepths || existing.useDepths;
    		        this.useBlockParams = this.useBlockParams || existing.useBlockParams;
    		      }
    		    }
    		  },
    		  matchExistingProgram: function matchExistingProgram(child) {
    		    for (var i = 0, len = this.context.environments.length; i < len; i++) {
    		      var environment = this.context.environments[i];
    		      if (environment && environment.equals(child)) {
    		        return environment;
    		      }
    		    }
    		  },

    		  programExpression: function programExpression(guid) {
    		    var child = this.environment.children[guid],
    		        programParams = [child.index, 'data', child.blockParams];

    		    if (this.useBlockParams || this.useDepths) {
    		      programParams.push('blockParams');
    		    }
    		    if (this.useDepths) {
    		      programParams.push('depths');
    		    }

    		    return 'container.program(' + programParams.join(', ') + ')';
    		  },

    		  useRegister: function useRegister(name) {
    		    if (!this.registers[name]) {
    		      this.registers[name] = true;
    		      this.registers.list.push(name);
    		    }
    		  },

    		  push: function push(expr) {
    		    if (!(expr instanceof Literal)) {
    		      expr = this.source.wrap(expr);
    		    }

    		    this.inlineStack.push(expr);
    		    return expr;
    		  },

    		  pushStackLiteral: function pushStackLiteral(item) {
    		    this.push(new Literal(item));
    		  },

    		  pushSource: function pushSource(source) {
    		    if (this.pendingContent) {
    		      this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
    		      this.pendingContent = undefined;
    		    }

    		    if (source) {
    		      this.source.push(source);
    		    }
    		  },

    		  replaceStack: function replaceStack(callback) {
    		    var prefix = ['('],
    		        stack = undefined,
    		        createdStack = undefined,
    		        usedLiteral = undefined;

    		    /* istanbul ignore next */
    		    if (!this.isInline()) {
    		      throw new _exception2['default']('replaceStack on non-inline');
    		    }

    		    // We want to merge the inline statement into the replacement statement via ','
    		    var top = this.popStack(true);

    		    if (top instanceof Literal) {
    		      // Literals do not need to be inlined
    		      stack = [top.value];
    		      prefix = ['(', stack];
    		      usedLiteral = true;
    		    } else {
    		      // Get or create the current stack name for use by the inline
    		      createdStack = true;
    		      var _name = this.incrStack();

    		      prefix = ['((', this.push(_name), ' = ', top, ')'];
    		      stack = this.topStack();
    		    }

    		    var item = callback.call(this, stack);

    		    if (!usedLiteral) {
    		      this.popStack();
    		    }
    		    if (createdStack) {
    		      this.stackSlot--;
    		    }
    		    this.push(prefix.concat(item, ')'));
    		  },

    		  incrStack: function incrStack() {
    		    this.stackSlot++;
    		    if (this.stackSlot > this.stackVars.length) {
    		      this.stackVars.push('stack' + this.stackSlot);
    		    }
    		    return this.topStackName();
    		  },
    		  topStackName: function topStackName() {
    		    return 'stack' + this.stackSlot;
    		  },
    		  flushInline: function flushInline() {
    		    var inlineStack = this.inlineStack;
    		    this.inlineStack = [];
    		    for (var i = 0, len = inlineStack.length; i < len; i++) {
    		      var entry = inlineStack[i];
    		      /* istanbul ignore if */
    		      if (entry instanceof Literal) {
    		        this.compileStack.push(entry);
    		      } else {
    		        var stack = this.incrStack();
    		        this.pushSource([stack, ' = ', entry, ';']);
    		        this.compileStack.push(stack);
    		      }
    		    }
    		  },
    		  isInline: function isInline() {
    		    return this.inlineStack.length;
    		  },

    		  popStack: function popStack(wrapped) {
    		    var inline = this.isInline(),
    		        item = (inline ? this.inlineStack : this.compileStack).pop();

    		    if (!wrapped && item instanceof Literal) {
    		      return item.value;
    		    } else {
    		      if (!inline) {
    		        /* istanbul ignore next */
    		        if (!this.stackSlot) {
    		          throw new _exception2['default']('Invalid stack pop');
    		        }
    		        this.stackSlot--;
    		      }
    		      return item;
    		    }
    		  },

    		  topStack: function topStack() {
    		    var stack = this.isInline() ? this.inlineStack : this.compileStack,
    		        item = stack[stack.length - 1];

    		    /* istanbul ignore if */
    		    if (item instanceof Literal) {
    		      return item.value;
    		    } else {
    		      return item;
    		    }
    		  },

    		  contextName: function contextName(context) {
    		    if (this.useDepths && context) {
    		      return 'depths[' + context + ']';
    		    } else {
    		      return 'depth' + context;
    		    }
    		  },

    		  quotedString: function quotedString(str) {
    		    return this.source.quotedString(str);
    		  },

    		  objectLiteral: function objectLiteral(obj) {
    		    return this.source.objectLiteral(obj);
    		  },

    		  aliasable: function aliasable(name) {
    		    var ret = this.aliases[name];
    		    if (ret) {
    		      ret.referenceCount++;
    		      return ret;
    		    }

    		    ret = this.aliases[name] = this.source.wrap(name);
    		    ret.aliasable = true;
    		    ret.referenceCount = 1;

    		    return ret;
    		  },

    		  setupHelper: function setupHelper(paramSize, name, blockHelper) {
    		    var params = [],
    		        paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
    		    var foundHelper = this.nameLookup('helpers', name, 'helper'),
    		        callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : (container.nullContext || {})');

    		    return {
    		      params: params,
    		      paramsInit: paramsInit,
    		      name: foundHelper,
    		      callParams: [callContext].concat(params)
    		    };
    		  },

    		  setupParams: function setupParams(helper, paramSize, params) {
    		    var options = {},
    		        contexts = [],
    		        types = [],
    		        ids = [],
    		        objectArgs = !params,
    		        param = undefined;

    		    if (objectArgs) {
    		      params = [];
    		    }

    		    options.name = this.quotedString(helper);
    		    options.hash = this.popStack();

    		    if (this.trackIds) {
    		      options.hashIds = this.popStack();
    		    }
    		    if (this.stringParams) {
    		      options.hashTypes = this.popStack();
    		      options.hashContexts = this.popStack();
    		    }

    		    var inverse = this.popStack(),
    		        program = this.popStack();

    		    // Avoid setting fn and inverse if neither are set. This allows
    		    // helpers to do a check for `if (options.fn)`
    		    if (program || inverse) {
    		      options.fn = program || 'container.noop';
    		      options.inverse = inverse || 'container.noop';
    		    }

    		    // The parameters go on to the stack in order (making sure that they are evaluated in order)
    		    // so we need to pop them off the stack in reverse order
    		    var i = paramSize;
    		    while (i--) {
    		      param = this.popStack();
    		      params[i] = param;

    		      if (this.trackIds) {
    		        ids[i] = this.popStack();
    		      }
    		      if (this.stringParams) {
    		        types[i] = this.popStack();
    		        contexts[i] = this.popStack();
    		      }
    		    }

    		    if (objectArgs) {
    		      options.args = this.source.generateArray(params);
    		    }

    		    if (this.trackIds) {
    		      options.ids = this.source.generateArray(ids);
    		    }
    		    if (this.stringParams) {
    		      options.types = this.source.generateArray(types);
    		      options.contexts = this.source.generateArray(contexts);
    		    }

    		    if (this.options.data) {
    		      options.data = 'data';
    		    }
    		    if (this.useBlockParams) {
    		      options.blockParams = 'blockParams';
    		    }
    		    return options;
    		  },

    		  setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
    		    var options = this.setupParams(helper, paramSize, params);
    		    options.loc = JSON.stringify(this.source.currentLocation);
    		    options = this.objectLiteral(options);
    		    if (useRegister) {
    		      this.useRegister('options');
    		      params.push('options');
    		      return ['options=', options];
    		    } else if (params) {
    		      params.push(options);
    		      return '';
    		    } else {
    		      return options;
    		    }
    		  }
    		};

    		(function () {
    		  var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

    		  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

    		  for (var i = 0, l = reservedWords.length; i < l; i++) {
    		    compilerWords[reservedWords[i]] = true;
    		  }
    		})();

    		/**
    		 * @deprecated May be removed in the next major version
    		 */
    		JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
    		  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
    		};

    		function strictLookup(requireTerminal, compiler, parts, i, type) {
    		  var stack = compiler.popStack(),
    		      len = parts.length;
    		  if (requireTerminal) {
    		    len--;
    		  }

    		  for (; i < len; i++) {
    		    stack = compiler.nameLookup(stack, parts[i], type);
    		  }

    		  if (requireTerminal) {
    		    return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ', ', JSON.stringify(compiler.source.currentLocation), ' )'];
    		  } else {
    		    return stack;
    		  }
    		}

    		exports['default'] = JavaScriptCompiler;
    		module.exports = exports['default'];
    		
    	} (javascriptCompiler, javascriptCompiler.exports));
    	return javascriptCompiler.exports;
    }

    var hasRequiredHandlebars;

    function requireHandlebars () {
    	if (hasRequiredHandlebars) return handlebars.exports;
    	hasRequiredHandlebars = 1;
    	(function (module, exports) {

    		exports.__esModule = true;
    		// istanbul ignore next

    		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    		var _handlebarsRuntime = /*@__PURE__*/ requireHandlebars_runtime();

    		var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);

    		// Compiler imports

    		var _handlebarsCompilerAst = /*@__PURE__*/ requireAst();

    		var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);

    		var _handlebarsCompilerBase = /*@__PURE__*/ requireBase();

    		var _handlebarsCompilerCompiler = /*@__PURE__*/ requireCompiler();

    		var _handlebarsCompilerJavascriptCompiler = /*@__PURE__*/ requireJavascriptCompiler();

    		var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);

    		var _handlebarsCompilerVisitor = /*@__PURE__*/ requireVisitor();

    		var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);

    		var _handlebarsNoConflict = /*@__PURE__*/ requireNoConflict();

    		var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

    		var _create = _handlebarsRuntime2['default'].create;
    		function create() {
    		  var hb = _create();

    		  hb.compile = function (input, options) {
    		    return _handlebarsCompilerCompiler.compile(input, options, hb);
    		  };
    		  hb.precompile = function (input, options) {
    		    return _handlebarsCompilerCompiler.precompile(input, options, hb);
    		  };

    		  hb.AST = _handlebarsCompilerAst2['default'];
    		  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
    		  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
    		  hb.Parser = _handlebarsCompilerBase.parser;
    		  hb.parse = _handlebarsCompilerBase.parse;
    		  hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;

    		  return hb;
    		}

    		var inst = create();
    		inst.create = create;

    		_handlebarsNoConflict2['default'](inst);

    		inst.Visitor = _handlebarsCompilerVisitor2['default'];

    		inst['default'] = inst;

    		exports['default'] = inst;
    		module.exports = exports['default'];
    		
    	} (handlebars, handlebars.exports));
    	return handlebars.exports;
    }

    var handlebarsExports = /*@__PURE__*/ requireHandlebars();
    var Handlebars$1 = /*@__PURE__*/getDefaultExportFromCjs(handlebarsExports);

    const htmx$1 = htmxLib;
    if (typeof window !== 'undefined') {
        window.htmx = htmx$1;
        window.Handlebars = Handlebars$1;
        registerHelpers();
    }
    /* -------------------------------------------------------------------------- */
    /* ANCHOR                      FlowPlater module                              */
    /* -------------------------------------------------------------------------- */
    /**
     * @namespace FlowPlater
     * @description Core FlowPlater module that provides template processing and dynamic content management.
     * Integrates with HTMX and Handlebars to provide a seamless templating and interaction experience.
     * @author JWSLS
     */
    const VERSION = "1.5.1";
    const AUTHOR = "JWSLS";
    const LICENSE = "Flowplater standard licence";
    // Set default configuration without logging
    ConfigManager.setDefaultConfig(ConfigManager.getDefaultConfig());
    // Queue meta tag config if present
    const metaElement = document.querySelector('meta[name="fp-config"]');
    if (metaElement) {
        try {
            const metaConfig = JSON.parse(metaElement.content);
            // Queue the meta config - will be applied with other queued configs
            ConfigManager.setConfig(metaConfig);
        }
        catch (e) {
            Debug.error("Error parsing fp-config meta tag content:", metaElement.content, e);
        }
    }
    // Initialize request handling
    RequestHandler.setupEventListeners();
    defineHtmxExtension();
    /* -------------------------------------------------------------------------- */
    /* ANCHOR                 process(element = document)                         */
    /* -------------------------------------------------------------------------- */
    /**
     * @namespace ProcessingChain
     * @description Handles the sequential processing of FlowPlater elements through various transformation phases.
     * Each processor in the chain performs a specific modification or setup task on the element.
     */
    const ProcessingChain = {
        /**
         * @type {Array<Object>}
         * @property {string} name - Name of the processor
         * @property {Function} process - Processing function
         */
        processors: [
            {
                name: "customTags",
                process: replaceCustomTags,
            },
            {
                name: "htmxAttributes",
                process: translateCustomHTMXAttributes,
            },
            {
                name: "htmxExtensionAttribute",
                process: addHtmxExtensionAttribute,
            },
            {
                name: "urlAffixes",
                process: processUrlAffixes,
            },
            {
                name: "animation",
                process: setupAnimation,
            },
            {
                name: "preload",
                process: processPreload,
            },
            {
                name: "htmxProcess",
                process: (element) => {
                    htmx$1.process(element);
                    return element;
                },
            },
        ],
        get FP_SELECTOR() {
            return ConfigManager.getConfig()
                .selectors.fp.map((selector) => AttributeMatcher._getAllAttributeNames(selector)
                .map((name) => `[${name}]`)
                .join(","))
                .join(",");
        },
        /**
         * @function processElement
         * @param {HTMLElement} element - The DOM element to process
         * @returns {HTMLElement} The processed element
         * @description Processes a single FlowPlater element through all registered processors.
         * Handles errors and maintains processing state throughout the chain.
         */
        processElement: function (element) {
            // Clean up any existing preload listeners
            if (element._preloadCleanup) {
                element._preloadCleanup();
            }
            let processingResults = {
                success: true,
                errors: [],
                warnings: [],
                finalElement: element,
            };
            // Run through all processors
            processingResults.finalElement = this.processors.reduce((currentElement, processor, index) => {
                if (!currentElement) {
                    processingResults.errors.push({
                        phase: processor.name,
                        error: `Element became undefined at processor index ${index}`,
                        processor: this.processors[index - 1],
                    });
                    processingResults.success = false;
                    return element; // Return original element to allow chain to continue
                }
                try {
                    const result = processor.process(currentElement);
                    return result;
                }
                catch (error) {
                    const err = error;
                    processingResults.errors.push({
                        phase: processor.name,
                        error: err.message,
                        stack: err.stack,
                    });
                    // Log the error
                    Debug.error(`Error in processor ${processor.name}: ${err.message}`, err);
                    // Attempt recovery based on error type
                    if (error instanceof TemplateError) {
                        // Template errors might need special handling
                        processingResults.warnings.push({
                            phase: processor.name,
                            message: "Falling back to original template",
                        });
                        return currentElement;
                    }
                    // For other errors, return the current element state
                    return currentElement;
                }
            }, element);
            // Emit events based on processing results
            if (processingResults.errors.length > 0) {
                EventSystem.publish("processingChain:error", processingResults);
            }
            if (processingResults.warnings.length > 0) {
                EventSystem.publish("processingChain:warning", processingResults);
            }
            return processingResults.finalElement;
        },
    };
    /**
     * @function process
     * @param {HTMLElement} [element=document] - The root element to process
     * @description Processes FlowPlater elements within the given element or document.
     * If the element itself matches FlowPlater selectors, processes just that element.
     * Otherwise, finds and processes all matching child elements.
     */
    function process(element = document) {
        Debug.debug("Processing with FP_SELECTOR:", ProcessingChain.FP_SELECTOR);
        if (element === document || !element.matches(ProcessingChain.FP_SELECTOR)) {
            const fpElements = element.querySelectorAll(ProcessingChain.FP_SELECTOR);
            Debug.debug("Found elements to process:", fpElements.length);
            fpElements.forEach((el) => ProcessingChain.processElement(el));
        }
        else {
            ProcessingChain.processElement(element);
        }
    }
    /* -------------------------------------------------------------------------- */
    /* ANCHOR                      Handlebars integration                         */
    /* -------------------------------------------------------------------------- */
    // Note: Handlebars integration is now handled after making it globally available
    // See the window availability check above where we unregister and register helpers
    /* -------------------------------------------------------------------------- */
    /* ANCHOR                          Public API                                 */
    /* -------------------------------------------------------------------------- */
    // Create the base FlowPlater object
    const FlowPlaterObj = {
        compileTemplate,
        render,
        getInstance,
        getInstances,
        getOrCreateInstance(instanceName, initialData = {}) {
            // Try to find any element with this instance name first
            const element = AttributeMatcher.findElementByInstanceName(instanceName);
            if (!element) {
                Debug.error(`Element not found for instance: ${instanceName}`);
                return null;
            }
            // InstanceManager will handle finding the template element if this isn't one
            return InstanceManager.getOrCreateInstance(element, initialData);
        },
        /**
         * Get a group by name
         * @param {string} groupName - The name of the group to retrieve
         * @returns {Object|null} The group object or null if not found
         */
        getGroup(groupName) {
            return GroupManager.getGroup(groupName);
        },
        /**
         * Get or create a group
         * @param {string} groupName - The name of the group to retrieve
         * @returns {Object} The group object. This will be a proxy to the group data.
         */
        getOrCreateGroup(groupName, initialData = {}) {
            return GroupManager.getOrCreateGroup(groupName, initialData);
        },
        /**
         * Get all groups
         * @returns {Object} All groups
         */
        getGroups() {
            return GroupManager.getAllGroups();
        },
        /**
         * Update data for a group
         * @param {string} groupName - Name of the group to update
         * @param {Object} data - Data to merge into the group
         * @returns {Object|null} The updated group or null if not found
         */
        updateGroup(groupName, data) {
            return GroupManager.updateGroup(groupName, data);
        },
        /**
         * Remove a group
         * @param {string} groupName - Name of the group to remove
         */
        removeGroup(groupName) {
            return GroupManager.removeGroup(groupName);
        },
        /**
         * Remove all groups
         */
        removeAllGroups() {
            return GroupManager.removeAllGroups();
        },
        // Logging API
        log(level, ...args) {
            args.unshift(`[PLUGIN]`);
            Debug.log(level, ...args);
            return this;
        },
        // Log levels for use with the log method
        logLevels: Debug.levels,
        // Plugin management methods
        registerPlugin(plugin, config = {}) {
            return PluginManager.registerPlugin(plugin, config);
        },
        removePlugin(name) {
            return PluginManager.removePlugin(name);
        },
        removeAllPlugins() {
            return PluginManager.destroyAll();
        },
        getPlugin(name) {
            return PluginManager.getPlugin(name);
        },
        getAllPlugins() {
            return PluginManager.getSortedPlugins();
        },
        enablePlugin(name) {
            return PluginManager.enablePlugin(name);
        },
        disablePlugin(name) {
            return PluginManager.disablePlugin(name);
        },
        pluginConfig(name) {
            return PluginManager.pluginConfig(name);
        },
        on: (...args) => EventSystem.subscribe(...args),
        off: (...args) => EventSystem.unsubscribe(...args),
        emit: (...args) => EventSystem.publish(...args),
        debug(level) {
            ConfigManager.setConfig({ debug: { level } });
            return this;
        },
        templateCache: TemplateCache,
        /**
         * @function init
         * @param {HTMLElement} [element=document] - Root element to initialize
         * @param {Object} [options={ render: true }] - Initialization options
         * @returns {FlowPlaterObj} The FlowPlater instance
         * @description Initializes FlowPlater functionality for the given element or entire document.
         * Processes templates, loads configuration, and sets up event handling.
         */
        init(element = document, options = { render: true }) {
            // If already initialized, just process the element
            if (_state.initialized) {
                if (element !== document) {
                    Performance.start("init-element");
                    Debug.info("Re-initializing FlowPlater for element:", element);
                    process(element);
                    Performance.end("init-element");
                }
                else {
                    Debug.debug("FlowPlater already initialized, skipping document re-initialization");
                }
                return this;
            }
            // Submit any queued configuration changes before initialization begins
            ConfigManager.submitQueuedConfig();
            Performance.start("init");
            Debug.info("Initializing FlowPlater...");
            // Process forms and other elements FIRST
            // This ensures filters and other components are initialized before any rendering
            process(element);
            // Create all instances from templates
            InstanceManager.createAllInstances(element);
            // Perform initial rendering if requested
            if (options.render) {
                InstanceManager.renderAll();
            }
            // Mark as initialized and ready
            _state.initialized = true;
            _readyState.isReady = true;
            Debug.info("FlowPlater initialized successfully");
            Performance.end("init");
            // Process any queued operations
            _readyState.processQueue();
            EventSystem.publish("initialized");
            PluginManager.executeHook("initComplete", this, _state.instances);
            return this;
        },
        /**
         * @function ready
         * @param {Function} callback - Function to execute when FlowPlater is ready
         * @returns {FlowPlaterObj} The FlowPlater instance
         */
        ready(callback) {
            if (_readyState.isReady) {
                callback(this);
            }
            else {
                _readyState.queue.push(() => callback(this));
            }
            return this;
        },
        /**
         * @function cleanup
         * @param {string} [instanceName] - Name of instance to clean up
         * @returns {FlowPlaterObj} The FlowPlater instance
         * @description Cleans up FlowPlater instances and their associated resources.
         * If no instanceName is provided, cleans up all instances.
         */
        cleanup(instanceName) {
            if (instanceName) {
                const instance = _state.instances[instanceName];
                if (instance) {
                    // Clean up preload listeners
                    instance.elements.forEach((element) => {
                        if (element._preloadCleanup) {
                            element._preloadCleanup();
                        }
                        if (element.removeEventListeners) {
                            element.removeEventListeners();
                        }
                    });
                    // Remove instance
                    delete _state.instances[instanceName];
                    Debug.info(`Cleaned up instance: ${instanceName}`);
                }
            }
            else {
                // Clean up all instances
                Object.keys(_state.instances).forEach((name) => {
                    this.cleanup(name);
                });
                _state.initialized = false;
                Debug.info("Cleaned up all instances");
            }
            return this;
        },
        // Public version info
        VERSION: VERSION,
        AUTHOR: AUTHOR,
        LICENSE: LICENSE,
        // Use ConfigManager for setting custom tags
        setCustomTags: setCustomTags,
        /**
         * @function config
         * @param {FlowPlaterConfig} [newConfig={}] - Configuration options to apply
         * @returns {FlowPlaterObj} The FlowPlater instance
         * @description Configures FlowPlater with new settings. Deep merges with existing configuration.
         */
        config: function (newConfig = {}) {
            // Delegate to ConfigManager
            ConfigManager.setConfig(newConfig);
            return this;
        },
        /**
         * Get the current configuration
         * @returns {Object} The current configuration
         */
        getConfig: function () {
            // Delegate to ConfigManager
            return ConfigManager.getConfig();
        },
        /**
         * Register a Handlebars helper
         * @param {string} name - The name of the helper
         * @param {Handlebars.HelperDelegate} helperFn - The helper function
         * @returns {FlowPlaterObj} The FlowPlater instance
         * @description Registers a new Handlebars helper and clears the template cache
         * to ensure all templates are recompiled with the new helper.
         */
        registerTag: function (name, helperFn) {
            // Register the helper with Handlebars
            Handlebars$1.registerHelper(name, helperFn);
            // Clear the template cache to ensure all templates are recompiled
            this.templateCache.clear();
            // Clear compiled templates stored in instances
            Object.keys(_state.instances).forEach((instanceName) => {
                const instance = _state.instances[instanceName];
                if (instance.templateId) {
                    // Recompile the template for this instance
                    instance.template = compileTemplate(instance.templateId, true);
                }
            });
            // Log the registration
            Debug.info(`Registered Handlebars helper: ${name}`);
            return this;
        },
        /**
         * @function trigger
         * @param {string} name - The name of the event to trigger
         * @param {string | FlowPlaterElement | Document} element - The element(s) to trigger the event on
         * @param {Object} detail - The detail object to pass to the event
         */
        trigger: function (name, element = document, detail = {}) {
            if (typeof element === "string") {
                const elements = document.querySelectorAll(element);
                elements.forEach(el => {
                    const htmlElement = el;
                    EventSystem.publish(name, { element: htmlElement, detail });
                    htmx$1.trigger(htmlElement, name, detail);
                });
                return;
            }
            EventSystem.publish(name, { element, detail });
            if (element) {
                htmx$1.trigger(element, name, detail);
            }
        },
        /**
         * Destroy the FlowPlater instance
         * @description Cleans up all instances and their associated resources.
         * Also clears the template cache and event listeners.
         */
        destroy: function () {
            // Clean up all instances
            Object.keys(_state.instances).forEach((name) => {
                this.cleanup(name);
            });
            // Clean up template cache
            TemplateCache.clear();
            _state.instances = {};
            // Clean up event listeners
            EventSystem.unsubscribeAll();
            Debug.info("Cleaned up all instances");
        },
        /**
         * @function create
         * @param {string} instanceName - Name or selector for the new instance
         * @param {Object} [options={ refresh: true }] - Creation options
         * @returns {Object} The created FlowPlater instance
         * @throws {FlowPlaterError} If element cannot be found or instance creation fails
         * @description Creates a new FlowPlater instance for the specified element.
         */
        create: function (instanceName, options = { refresh: true }) {
            Performance.start(`createInstance:${instanceName}`);
            Debug.info(`Creating FlowPlater instance: ${instanceName}`);
            // Find any element with the instance name - InstanceManager will find the template element
            const element = AttributeMatcher.findElementByInstanceName(instanceName);
            if (!element) {
                throw new FlowPlaterError(`Could not find element for instance: ${instanceName}`);
            }
            // Clear any existing template cache for this instance
            const templateId = AttributeMatcher._getRawAttribute(element, "template");
            if (templateId) {
                this.templateCache.clear(templateId);
            }
            // Use init() to process the element, but skip initial render
            this.init(element);
            // Get the instance from state
            const instance = getInstance(instanceName);
            if (!instance) {
                throw new FlowPlaterError(`Failed to create instance: ${instanceName}`);
            }
            // Execute newInstance hook
            PluginManager.executeHook("newInstance", instance);
            if (options.refresh) {
                instance.refresh();
            }
            Debug.info(`Instance created successfully: ${instanceName}`);
            Performance.end(`createInstance:${instanceName}`);
            return instance;
        },
        /**
         * Finds an attribute value on an element, checking both direct attributes and inheritance
         * @param {HTMLElement} element - The element to search on
         * @param {string} attributeName - The name of the attribute (with or without prefix)
         * @returns {string|null} The attribute value or null if not found
         */
        findAttribute(element, attributeName) {
            return AttributeMatcher.findAttribute(element, attributeName);
        },
        /**
         * Add a custom transformer function for a specific transformation type
         * @param {string} transformationType - The type of transformation (e.g. 'transformDataBeforeRender', 'transformResponse', 'transformRequest')
         * @param {TransformerFunction | RequestTransformerFunction} transformerFn - The transformer function with signature (instance, data, dataType) => transformedData
         *                                  - instance: The FlowPlater instance that triggered the transformation
         *                                  - data: The data to transform
         *                                  - dataType: The type of data being transformed ('json', 'html', or 'xml')
         * @param {string} [transformerName] - Optional name for the transformer. If not provided, one will be auto-generated.
         * @returns {FlowPlaterObj} The FlowPlater instance for chaining
         * @example
         * FlowPlater.addTransformer('transformDataBeforeRender', (instance, data, dataType) => {
         *   // Transform the data before it's rendered
         *   return { ...data, timestamp: Date.now() };
         * }, 'myCustomTransformer');
         */
        addTransformer(transformationType, transformerFn, transformerName) {
            if (typeof transformerFn !== "function") {
                throw new FlowPlaterError("Transformer must be a function");
            }
            PluginManager.addTransformer(transformationType, transformerFn, transformerName);
            return this;
        },
        /**
         * Remove a custom transformer function by name
         * @param {string} transformationType - The type of transformation
         * @param {string} transformerName - The name of the transformer to remove
         * @returns {boolean} True if the transformer was found and removed, false otherwise
         * @example
         * FlowPlater.addTransformer('transformDataBeforeRender', myTransformer, 'myCustomTransformer');
         * // Later...
         * FlowPlater.removeTransformer('transformDataBeforeRender', 'myCustomTransformer');
         */
        removeTransformer(transformationType, transformerName) {
            return PluginManager.removeTransformer(transformationType, transformerName);
        },
        /**
         * Clear all custom transformers for a specific type or all types
         * @param {string} [transformationType] - The type of transformation to clear. If not provided, clears all transformers.
         * @returns {FlowPlaterObj} The FlowPlater instance for chaining
         * @example
         * // Clear all transformDataBeforeRender transformers
         * FlowPlater.clearTransformers('transformDataBeforeRender');
         *
         * // Clear all transformers of all types
         * FlowPlater.clearTransformers();
         */
        clearTransformers(transformationType) {
            PluginManager.clearTransformers(transformationType || "");
            return this;
        },
        /**
         * List all custom transformers for a specific type or all types
         * @param {string} [transformationType] - The type of transformation to list. If not provided, lists all transformers.
         * @returns {Object|Array} Object with transformer types as keys and arrays of NamedTransformers as values, or array of NamedTransformers for specific type
         * @example
         * // List all transformDataBeforeRender transformers
         * const transformers = FlowPlater.listTransformers('transformDataBeforeRender');
         *
         * // List all transformers of all types
         * const allTransformers = FlowPlater.listTransformers();
         */
        listTransformers(transformationType) {
            return PluginManager.listTransformers(transformationType);
        },
    };
    EventSystem.publish("loaded");
    /* -------------------------------------------------------------------------- */
    /* ANCHOR                   Process Pre-loaded Queue                          */
    /* -------------------------------------------------------------------------- */
    /**
     * @description Processes any callbacks that were queued before FlowPlater loaded.
     * This supports the pattern: FlowPlater = FlowPlater || []; FlowPlater.push(callback);
     */
    if (typeof window !== 'undefined') {
        const queuedCallbacks = window.FlowPlater;
        if (Array.isArray(queuedCallbacks) && queuedCallbacks.length > 0) {
            Debug.info(`Processing ${queuedCallbacks.length} pre-loaded FlowPlater callbacks`);
            // Process each queued callback
            queuedCallbacks.forEach((callback) => {
                if (typeof callback === 'function') {
                    // Add to ready queue - will be processed after initialization
                    _readyState.queue.push(() => callback(FlowPlaterObj));
                }
                else {
                    Debug.warn('Invalid callback in FlowPlater queue:', callback);
                }
            });
        }
    }
    // Make FlowPlater globally available
    if (typeof window !== 'undefined') {
        window.FlowPlater = FlowPlaterObj;
    }
    /* -------------------------------------------------------------------------- */
    /* ANCHOR                          Auto init                                  */
    /* -------------------------------------------------------------------------- */
    /**
     * @description Automatically initializes FlowPlater when the DOM is ready.
     * Uses the ready state system to ensure proper initialization order.
     */
    if (document.readyState === "complete" || document.readyState === "interactive") {
        FlowPlaterObj.init();
    }
    else {
        document.addEventListener("DOMContentLoaded", () => FlowPlaterObj.init());
    }

    return FlowPlaterObj;

})();
