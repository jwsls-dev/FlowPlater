/**!
@preserve FlowPlater starts here 
*/

var FlowPlater = (function () {
    ("use strict");

    /* -------------------------------------------------------------------------- */
    /* SECTION                          Initial setup                             */
    /* ANCHOR       Check for dependencies and throw error if not found           */
    /* -------------------------------------------------------------------------- */

    if (typeof Handlebars === "undefined") {
        throw new Error(
            "FlowPlater requires Handlebars. Get it at https://handlebarsjs.com/"
        );
    }
    if (typeof htmx === "undefined") {
        throw new Error(
            "FlowPlater requires htmx. Get it at https://htmx.org/"
        );
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                      Reset htmx headers                             */
    /* -------------------------------------------------------------------------- */

    document.body.addEventListener("htmx:configRequest", function (event) {
        event.detail.headers = "";
        event.detail.headers["Content-Type"] =
            "application/x-www-form-urlencoded; charset=UTF-8";
    });

    /* -------------------------------------------------------------------------- */
    /* ANCHOR               Initialize defaults and variables                     */
    /* -------------------------------------------------------------------------- */

    var templateCache = {};
    var instances = {};
    var length = 0;
    var defaults = {
        onRender: function () {},
        onRendered: function () {},
        onRemove: function () {},
        onRemoved: function () {},
        animation: false,
        debug: true,
    };

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                      Events and logging                             */
    /* -------------------------------------------------------------------------- */

    // * Send event
    // Takes an event name and data object
    function sendEvent(eventName, data, target = document) {
        var event; // The custom event that will be created
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent("flowplater:" + eventName, true, true);
            event.eventName = "flowplater:" + eventName;
            event.detail = data;
            target.dispatchEvent(event);
        } else {
            event = document.createEventObject();
            event.eventName = "flowplater:" + eventName;
            event.eventType = "flowplater:" + eventName;
            event.detail = data;
            target.fireEvent("on" + event.eventType, event);
        }
        document.dispatchEvent(event);

        // console.log("event sent: " + eventName);
    }

    // Log data if debug is true
    function log(...args) {
        if (defaults.debug) {
            if (args.length === 1 && typeof args[0] === "string") {
                console.log("Flowplater: ", args[0]);
            } else {
                console.log("Flowplater: ", ...args);
            }
        }
    }

    // Error logging
    function errorLog(...args) {
        if (args.length === 1 && typeof args[0] === "string") {
            console.error("Flowplater: ", args[0]);
        } else {
            console.log("Flowplater: ", ...args);
        }
    }

    // * Listen for htmx request start
    // Send event when htmx request starts if the element has an fp-instance attribute
    document.addEventListener("htmx:beforeRequest", function (event) {
        var element = event.detail.elt;
        if (element.hasAttribute("fp-instance")) {
            var instanceName = element.getAttribute("fp-instance");
            sendEvent("request-start", { instanceName, ...event.detail });
        }
    });
    // * Listen for htmx request end
    // Send event when htmx request ends if the element has an fp-instance attribute
    document.addEventListener("htmx:afterRequest", function (event) {
        var element = event.detail.elt;
        if (element.hasAttribute("fp-instance")) {
            var instanceName = element.getAttribute("fp-instance");
            sendEvent("request-end", { instanceName, ...event.detail });
        }
    });

    /* -------------------------------------------------------------------------- */
    /* SECTION                      Element processing                            */
    /* -------------------------------------------------------------------------- */
    /* ANCHOR             translateCustomTagsAttributes(element)                  */
    /* -------------------------------------------------------------------------- */

    // prettier-ignore
    const htmxAttributes = ["boost", "get", "post", "on", "push-url", "select", "select-oob",
        "swap", "swap-oob", "target", "trigger", "vals", "confirm", "delete", "disable", 
        "disabled-elt", "disinherit", "encoding", "ext", "headers", "history", "history-elt", 
        "include", "indicator", "params", "patch", "preserve", "prompt", "put", "replace-url", 
        "request", "sync", "validate", "vars",
    ];

    // * For every element with an fp-[htmxAttribute] attribute, translate to hx-[htmxAttribute]
    function translateCustomTagsAttributes(element) {
        const customPrefix = "fp-";
        const htmxPrefix = "hx-";

        htmxAttributes.forEach((attr) => {
            const customAttr = customPrefix + attr;
            if (element.hasAttribute(customAttr)) {
                const attrValue = element.getAttribute(customAttr);
                element.setAttribute(htmxPrefix + attr, attrValue);
                element.removeAttribute(customAttr);
            }
            // run translateCustomTagsAttributes on all children
            const children = element.querySelectorAll("*");
            children.forEach((child) => {
                translateCustomTagsAttributes(child);
            });
        });

        // * for every element with an fp-table attribute, convert its children to table rows and the children's children to table cells
        // This is done because Webflow doesn't correctly export tables if they have nested helper tags

        function convertElement(element, newTagName) {
            let newElement = document.createElement(newTagName);
            for (let attr of element.attributes) {
                newElement.setAttribute(attr.name, attr.value);
            }
            while (element.firstChild) {
                newElement.appendChild(element.firstChild);
            }
            element.parentNode.replaceChild(newElement, element);
        }

        function convertChildren(parent, defaultChildTag) {
            Array.from(parent.children).forEach((child) => {
                if (child.tagName.toLowerCase() !== defaultChildTag) {
                    convertElement(child, defaultChildTag);
                }
            });
        }

        element.querySelectorAll("[fp-table]").forEach((table) => {
            convertElement(table, "table");
            convertChildren(table, "tr");

            table.querySelectorAll("[fp-thead]").forEach((thead) => {
                convertElement(thead, "thead");
                convertChildren(thead, "th");
            });

            table.querySelectorAll("[fp-tbody]").forEach((tbody) => {
                convertElement(tbody, "tbody");
                convertChildren(tbody, "tr");
            });

            table.querySelectorAll("[fp-tfoot]").forEach((tfoot) => {
                convertElement(tfoot, "tfoot");
                convertChildren(tfoot, "td");
            });

            table.querySelectorAll("tr").forEach((row) => {
                convertChildren(row, "td");
            });
        });
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                   processUrlAffixes(element)                        */
    /* -------------------------------------------------------------------------- */

    function processUrlAffixes(element) {
        var methods = ["get", "post", "put", "patch", "delete"];

        function processElement(el) {
            methods.forEach(function (method) {
                var attr = "hx-" + method;
                if (el.hasAttribute(attr)) {
                    var originalUrl = el.getAttribute("hx-" + method);
                    log("Original URL: " + originalUrl); // log

                    var modifiedUrl = originalUrl;
                    if (el.hasAttribute("fp-prepend")) {
                        modifiedUrl =
                            el.getAttribute("fp-prepend") + modifiedUrl;
                    }
                    if (el.hasAttribute("fp-append")) {
                        modifiedUrl += el.getAttribute("fp-append");
                    }

                    el.setAttribute(attr, modifiedUrl);
                    log("Modified URL: " + modifiedUrl); // log

                    if (modifiedUrl !== originalUrl) {
                        log(
                            "Modification successful for",
                            method,
                            "on element",
                            el
                        ); // log
                    } else {
                        errorLog(
                            "Modification failed for",
                            method,
                            "on element",
                            el
                        ); // error
                    }

                    el.removeAttribute("fp-prepend");
                    el.removeAttribute("fp-append");
                }
            });
        }

        // Process the passed element
        if (
            element.hasAttribute("fp-prepend") ||
            element.hasAttribute("fp-append")
        ) {
            processElement(element);
        }
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                      setupProxy(element)                            */
    /* -------------------------------------------------------------------------- */

    // * For each element with an fp-proxy attribute, use a proxy for the url
    //use const url = 'https://corsproxy.io/?' + encodeURIComponent([hx-get/post/put/patch/delete] attribute value)]);
    function setupProxy(element) {
        // return if value is false
        if (
            element.hasAttribute("fp-proxy") === false ||
            element.getAttribute("fp-proxy") === "false"
        ) {
            return;
        }
        // if the value is an url, use it as the proxy url
        if (element.getAttribute("fp-proxy").startsWith("http")) {
            var proxyUrl = element.getAttribute("fp-proxy");
        } else {
            // else use corsproxy.io
            var proxyUrl = "https://corsproxy.io/?";
        }
        var methods = ["get", "post", "put", "patch", "delete"];
        methods.forEach(function (method) {
            if (element.hasAttribute("hx-" + method)) {
                var url = element.getAttribute("hx-" + method);
                element.setAttribute(
                    "hx-" + method,
                    proxyUrl + encodeURIComponent(url)
                );
            }
        });
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                    setupTransition(element)                         */
    /* -------------------------------------------------------------------------- */

    // * For each element with an fp-animation attribute set to true, or if defaults.animation is true, get the hx-swap attribute.
    // if the value is empty, set it to innerHTML transition:true
    // if the value is not empty, append transition:true
    // if the value is set to false, do nothing

    function setupTransition(element) {
        var shouldAnimate =
            element.getAttribute("fp-animation") || defaults.animation;
        if (shouldAnimate === "true") {
            var swap = element.getAttribute("hx-swap");
            if (!swap) {
                element.setAttribute("hx-swap", "innerHTML transition:true");
            } else {
                element.setAttribute("hx-swap", swap + " transition:true");
            }
        }
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                     processPreload(element)                         */
    /* -------------------------------------------------------------------------- */

    function preloadUrl(url) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = url;
        link.as = "fetch";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
        setTimeout(() => {
            link.remove();
        }, 3000);
    }

    function addPreloadListener(element) {
        const preloadEvent = element.getAttribute("fp-preload") || "mouseover";
        // if preloadEvent is mouseover, add a timeout to prevent preloading when the user is scrolling
        if (preloadEvent === "mouseover") {
            var mouseOver = true;
            setTimeout(() => {
                if (mouseOver) {
                    preloadUrl(
                        element.getAttribute("href") ||
                            element.getAttribute("hx-get") ||
                            element.getAttribute("fp-get")
                    );
                }
            }, 100);
            element.addEventListener(
                "mouseout",
                () => {
                    mouseOver = false;
                },
                { once: true }
            );
        } else {
            element.addEventListener(preloadEvent, () => {
                preloadUrl(
                    element.getAttribute("href") ||
                        element.getAttribute("hx-get") ||
                        element.getAttribute("fp-get")
                );
            });
        }
    }

    function processPreload(element) {
        // run processPreloadForElement on the passed element and all of its children
        if (element.hasAttribute("fp-preload")) {
            processPreloadForElement(element);
        }

        function processPreloadForElement(element) {
            if (element.hasAttribute("fp-preload")) {
                element.getAttribute("fp-preload") === "pageload"
                    ? preloadUrl(
                          element.getAttribute("href") ||
                              element.getAttribute("hx-get") ||
                              element.getAttribute("fp-get")
                      )
                    : addPreloadListener(element);
            }
        }
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                 process(element = document)                         */
    /* -------------------------------------------------------------------------- */

    function process(element = document) {
        // First, translate custom htmx attributes on the element and all of its children
        translateCustomTagsAttributes(element);
        // Then, process the element and all of its children
        if (element != document || element.hasAttribute("fp-template")) {
            processElement(element);
        }
        const fpElements = element.querySelectorAll("[fp-template]");
        if (fpElements.length !== 0) {
            fpElements.forEach((fpElement) => {
                processElement(fpElement);
            });
        }
        // Lastly, process all elements using htmx
        htmx.process(element);
    }

    function processElement(element) {
        defineExtension(element); // add hx-ext attribute "flowplater"
        processUrlAffixes(element); // add fp-prepend and fp-append to url
        setupProxy(element); // prepends proxy url to url
        setupTransition(element); // adds transition:true to hx-swap if fp-animation is true
        processPreload(element); // adds preload link
    }

    /* -------------------------------------------------------------------------- */
    /* TODO                      Browser transition api                           */
    /* -------------------------------------------------------------------------- */

    // * use the browser view transition api to animate the changing of a target element
    // Takes an element and a callback function
    function animate(element, callback) {
        var shouldAnimate =
            element.getAttribute("fp-animation") || defaults.animation;
        if (!shouldAnimate) {
            callback();
            return;
        } else {
            var transition = document.startViewTransition(element);
            callback();
        }
    }

    /* -------------------------------------------------------------------------- */
    /* !SECTION                                                                   */
    /* !SECTION                                                                   */
    /* -------------------------------------------------------------------------- */

    //////////////////////////////////////////////////////////////////////////////!/

    /* -------------------------------------------------------------------------- */
    /* SECTION                       Main functions                               */
    /* ANCHOR       Template translation from FlowPlater to Handlebars            */
    /* -------------------------------------------------------------------------- */

    // Converts <tag fp="value"> to {{#tag value}} and </tag> to {{/tag}}
    // Takes a template id (e.g. "#my-template") and returns a compiled template
    function compileTemplate(templateId) {
        // Check if the template is already cached or if fp-dynamic is true
        var templateElement = document.querySelector(templateId);

        log("Trying to compile template: " + templateId); //!log

        if (!templateElement) {
            errorLog("Template not found: " + templateId); //!error
            return null;
        }

        if (
            !templateCache[templateId] ||
            (templateElement.hasAttribute("fp-dynamic") &&
                templateElement.getAttribute("fp-dynamic") !== "false")
        ) {
            log("compiling template: " + templateId); //!log
            // Function to construct tag with attributes
            function constructTagWithAttributes(element) {
                const tagName = element.tagName.toLowerCase();
                let attributes = "";
                for (let attr of element.attributes) {
                    attributes += ` ${attr.name}="${attr.value}"`;
                }
                return `<${tagName}${attributes}>`;
            }

            function preProcessArgs(args) {
                // Regular expression to match operators
                const operatorRegex = /(>=|<=|==|!=|&&|\|\||>|<|regex)/g;

                // Replace operators with their quoted versions
                return args.replace(operatorRegex, ' "$1" ');
            }

            function processNode(node) {
                let result = "";

                // Loop through each child node
                node.childNodes.forEach((child) => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        // Directly append text nodes
                        result += child.textContent;
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                        if (child.hasAttribute("fp")) {
                            // Process as a Handlebars helper
                            const helperName = child.tagName.toLowerCase();
                            const args = child
                                .getAttribute("fp")
                                .split(" ")
                                .map((arg) => {
                                    return arg.replace(/&quot;/g, '"');
                                })
                                .join(" ");
                            // Set hash to # if fp-simple is not true, otherwise set to empty string
                            // This determines whether the helper is a block helper or a self-close (simple) helper
                            const hash =
                                child.getAttribute("fp-simple") === "true"
                                    ? ""
                                    : "#";
                            // Recursively process inner content
                            const innerContent = processNode(child);

                            // Warn the user if a self-close helper has inner content
                            if (
                                hash === "" &&
                                innerContent &&
                                innerContent.trim() !== ""
                            ) {
                                console.warn(
                                    `FlowPlater: A <${helperName}> helper with an fp-simple attribute has inner content. Be aware that the inner content will not be rendered.` //!warn
                                );
                            }

                            // Construct the Handlebars helper syntax
                            if (
                                helperName === "log" ||
                                helperName === "lookup" ||
                                helperName === "execute"
                            ) {
                                if (
                                    innerContent &&
                                    innerContent.trim() !== ""
                                ) {
                                    console.warn(
                                        `FlowPlater: The <${helperName}> helper does not accept inner content.` //!warn
                                    );
                                }
                                result += `{{${hash}${helperName} ${args}}}`;
                            } else if (helperName === "comment") {
                                result += `{{!-- ${args} --}}`;
                            } else if (helperName === "if") {
                                const quotedArgs = preProcessArgs(args);
                                if (hash === "") {
                                    console.warn(
                                        "FlowPlater: the <if> helper cannot be a simple helper. Ignoring the fp-simple attribute." //!warn
                                    );
                                }
                                result += `{{#${helperName} ${quotedArgs}}}${innerContent}{{/${helperName}}}`;
                            } else if (helperName === "else") {
                                result += `{{${helperName}}}${innerContent}`;
                            } else if (helperName === "math") {
                                if (
                                    innerContent &&
                                    innerContent.trim() !== ""
                                ) {
                                    console.warn(
                                        `FlowPlater: The <${helperName}> helper does not accept inner content.` //!warn
                                    );
                                }
                                result += `{{${hash}${helperName} "${args}"}}`;
                            } else {
                                if (hash === "#") {
                                    result += `{{#${helperName} ${args}}}${innerContent}{{/${helperName}}}`;
                                } else {
                                    result += `{{${helperName} ${args}}}`;
                                }
                            }
                        } else if (child.tagName === "else") {
                            // Process as an else block
                            // Currently not used because Webflow doesn't support empty attributes on custom elements, and will straight up remove the attribute 🤡
                            // Webflow Technical Support is aware of this issue
                            const innerContent = processNode(child);
                            result += `{{${child.tagName.toLowerCase()}}}${innerContent}`;
                        } else {
                            // Recursively process non-helper elements
                            const childContent = processNode(child);
                            // Construct the tag with attributes and include the child's content
                            const startTag = constructTagWithAttributes(child);
                            const endTag = `</${child.tagName.toLowerCase()}>`;
                            result += `${startTag}${childContent}${endTag}`;
                        }
                    }
                });

                return result;
            }

            const handlebarsTemplate = processNode(templateElement);
            log("Compiling Handlebars template: " + handlebarsTemplate); //!log

            try {
                templateCache[templateId] =
                    Handlebars.compile(handlebarsTemplate);
                return templateCache[templateId];
            } catch (e) {
                errorLog(
                    "Template not valid: " +
                        handlebarsTemplate +
                        " | Error: " +
                        e.message
                );
                return null;
            }
        }
        return templateCache[templateId];
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                        Render function                              */
    /* -------------------------------------------------------------------------- */

    // * Render a template with data
    // Takes a template id (e.g. "#my-template"), data, and a target selector (e.g. "#target")
    // If returnHtml is true, returns the rendered HTML instead of rendering it to the target
    function render({
        template,
        data,
        target,
        returnHtml,
        onRender = defaults.onRender,
        onRendered = defaults.onRendered,
        instanceName,
    }) {
        /* -------------------------------------------------------------------------- */
        /*                                initial setup                               */
        /* -------------------------------------------------------------------------- */

        sendEvent("render", {
            instanceName,
            template,
            data,
            target,
            returnHtml,
        });

        var elements;

        // Get the target elements. If target is a string, use querySelectorAll.
        // If target is a jQuery object, use toArray. If target is node or NodeList, use it directly.
        if (typeof target === "string") {
            elements = document.querySelectorAll(target);
        } else if (typeof target === "object" && target.jquery) {
            elements = target.toArray();
        } else if (typeof target === "object") {
            elements = target;
        } else {
            errorLog("Invalid target type: " + typeof target); //!error
            return;
        }
        // make elements an array if it's a NodeList
        if (elements.length === undefined) {
            elements = [elements];
        }

        // Get the instance name.
        // If the instanceName is the same as the length, it means it's not specified.
        if (instanceName) {
            instanceName = instanceName;
        } else if (elements[0].hasAttribute("fp-instance")) {
            instanceName = elements[0].getAttribute("fp-instance");
        } else if (elements[0].id) {
            instanceName = elements[0].id;
        } else {
            instanceName = length;
        }

        log("Rendering instance: " + instanceName, template, data, target); //!log

        elements.forEach(function (element) {
            onRender.call(element);
        });

        /* -------------------------------------------------------------------------- */
        /*                              Compile template                              */
        /* -------------------------------------------------------------------------- */

        // Compile the template if it's not already cached
        // If the template is not cached, it will be compiled and cached, and length will be incremented
        if (!templateCache[template]) {
            compileTemplate(template);
            length++;
        }
        var template = templateCache[template];
        if (!template) {
            errorLog("Template not found: " + template); //!error
            return;
        }

        if (elements.length === 0) {
            errorLog("Target not found: " + target); //!error
            return;
        }

        /* -------------------------------------------------------------------------- */
        /*                               Proxy creation                               */
        /* -------------------------------------------------------------------------- */

        // Create a reactive data proxy if it doesn't exist or if data has changed
        if (!instances[instanceName] || instances[instanceName].data !== data) {
            var proxy = new Proxy(data, {
                set: function (target, prop, value) {
                    target[prop] = value;
                    // Re-render the template with the updated data
                    elements.forEach(function (element) {
                        element.innerHTML = template(target);
                    });
                    return true;
                },
            });
            // Store the proxy and elements in instances for future reference
            instances[instanceName] = {
                elements: elements,
                template: template,
                proxy: proxy,
                data: data,
                ...instanceMethods(instanceName),
            };
        }

        log("Proxy created: ", instances[instanceName].proxy); //!log

        /* -------------------------------------------------------------------------- */
        /*                               Render template                              */
        /* -------------------------------------------------------------------------- */

        // Render the template with the current data
        if (returnHtml) {
            try {
                var html = template(instances[instanceName].proxy);
                elements.forEach(function (element) {
                    onRendered.call(element);
                });
                sendEvent("rendered", {
                    instance: instanceName,
                    template,
                    data,
                    target,
                    elements,
                    returnHtml,
                    html,
                });
                log("Rendered HTML: " + html); //!log
                return html;
            } catch (error) {
                errorLog("Error rendering template: " + error.message); //!error
            }
        } else {
            try {
                elements.forEach(function (element) {
                    element.innerHTML = template(instances[instanceName].proxy);
                    onRendered.call(element);
                });
                sendEvent("rendered", {
                    instance: instanceName,
                    template,
                    data,
                    target,
                    elements,
                    returnHtml,
                });
                log(
                    "Rendered instance: " + instanceName,
                    template,
                    data,
                    target
                ); //!log
                return instances[instanceName];
            } catch (error) {
                errorLog("Error rendering template: " + error.message); //!error
            }
        }
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                          XML to JSON                                */
    /* -------------------------------------------------------------------------- */

    // * XML to JSON converter
    // Takes an XML document and returns a JSON object
    function parseXmlToJson(xmlString) {
        function xmlToJson(node) {
            var obj = {};

            // Include attributes with prefix '_'
            if (node.attributes) {
                for (var j = 0; j < node.attributes.length; j++) {
                    var attribute = node.attributes.item(j);
                    obj["_" + attribute.nodeName] = attribute.nodeValue;
                }
            }

            // Process child elements
            var children = node.childNodes;
            if (children.length === 1 && children[0].nodeType === 3) {
                // Single text node
                return children[0].nodeValue.trim();
            } else {
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
                        } else {
                            obj[child.nodeName] = json;
                        }
                    }
                }
            }

            return obj;
        }

        var parser = new DOMParser();
        var xml = parser.parseFromString(xmlString, "text/xml"); // Parse the XML string to a DOM
        return xmlToJson(xml.documentElement);
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                        htmx extension                               */
    /* -------------------------------------------------------------------------- */

    // Intercepts htmx requests and renders the response with FlowPlater
    // Takes an element and returns the rendered HTML
    htmx.defineExtension("flowplater", {
        transformResponse: function (text, xhr, elt) {
            // return text if the response is txt or html
            if (
                xhr.getResponseHeader("Content-Type") === "text/plain" ||
                xhr.getResponseHeader("Content-Type") === "text/html"
            ) {
                return text;
            }
            var templateId = elt.getAttribute("fp-template");
            log("Response received: " + text, xhr, elt, templateId); //!log
            // if text is XML, convert to JSON
            if (xhr.getResponseHeader("Content-Type") === "text/xml") {
                var parser = new DOMParser();
                var doc = parser.parseFromString(text, "text/xml");
                text = JSON.stringify(parseXmlToJson(doc));
            }
            if (templateId) {
                log(
                    "Rendering html to " +
                        templateId +
                        " based on htmx response"
                ); //!log
                var data = JSON.parse(text);
                var renderedHtml = render({
                    template: templateId,
                    data: data,
                    target: elt,
                    returnHtml: true,
                });
                return renderedHtml;
            } else {
                //asume current element is a template
                log("Rendering html to current element based on htmx response"); //!log
                var data = JSON.parse(text);
                if (elt.id === "" || elt.id === undefined) {
                    errorLog(
                        "No template found. If the current element is a template, it must have an id."
                    ); //!error
                    return null;
                }
                var templateId = "#" + elt.id;
                var renderedHtml = render({
                    template: templateId,
                    data: data,
                    target: elt,
                    returnHtml: true,
                });
                return renderedHtml;
            }
            return text;
        },
        // * Listen for htmx request start and compile template if it's not already cached
        onEvent: function (name, evt) {
            if (name === "htmx:afterRequest") {
                var templateId = evt.detail.elt.getAttribute("fp-template");
                if (
                    templateCache[templateId] ||
                    templateCache["#" + evt.detail.elt.id]
                ) {
                    log("Template found in cache: " + templateId); //!log
                    //check if template is dynamic
                    if (
                        evt.detail.elt.hasAttribute("fp-dynamic") &&
                        evt.detail.elt.getAttribute("fp-dynamic") != "false"
                    ) {
                        log("Template is dynamic: " + templateId); //!log
                        //if dynamic, re-compile template
                        compileTemplate(templateId);
                    }
                } else if (templateId) {
                    log("Request started: " + templateId); //!log
                    compileTemplate(templateId);
                } else {
                    log("Request started: current element"); //!log
                    compileTemplate("#" + evt.detail.elt.id);
                }
            }
        },
    });

    // * Add hx-ext attribute
    function defineExtension(element) {
        element.setAttribute("hx-ext", "flowplater");
        log("Added hx-ext attribute to " + element.id); //!log
    }

    /* -------------------------------------------------------------------------- */
    /* TODO                         Replace data method                           */
    /* -------------------------------------------------------------------------- */
    // Maybe replace with .set() or .update() method?
    // Would re-compile template if set to dynamic

    // Function to replace data of instance
    // Takes an instance key (e.g. "my-instance") and data
    function replaceData(instanceKey, data) {
        var instance = instances[instanceKey];
        if (instance) {
            instance.data = data;
            instance.proxy = new Proxy(data, {
                set: function (target, prop, value) {
                    target[prop] = value;
                    // Re-render the template with the updated data
                    instance.elements.forEach(function (element) {
                        element.innerHTML = instance.template(target);
                    });
                    return true;
                },
            });
            log("Proxy replaced: ", instance.proxy); //!log
        } else {
            errorLog("Instance not found: " + instanceKey); //!error
        }
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                     Update helper or hash                           */
    /* -------------------------------------------------------------------------- */

    // * Update the arguments of a helper
    // Takes a helper ID (e.g. "#my-helper") and arguments (e.g. "arg1 arg2")
    // Example: updateHelper("#my-helper", "arg1 arg2") will change
    // <helper id="my-helper" fp="arg1 arg3"> to <helper id="my-helper" fp="arg1 arg2">
    function updateHelper(helperId, args, instanceToRerender) {
        var helper = document.querySelector(helperId);
        if (helper) {
            helper.setAttribute("fp", args);
            // find closest template and make it dynamic
            var template = helper.closest("[fp-template]");
            if (template) {
                template.setAttribute("fp-dynamic", "true");
            }
            log("Updated helper: " + helperId); //!log
            if (instanceToRerender) {
                refresh(instanceToRerender);
            }
        } else {
            errorLog("Helper not found: " + helperId); //!error
        }
    }

    // * Update the hash of a helper
    // Takes a helper ID (e.g. "#my-helper"), hash (e.g. "myHash") and value (e.g. "valueB")
    // Example: updateHelperHash("#my-helper", "myHash", "valueB") will change
    // <helper id="my-helper" fp="..args myHash=valueA"> to <helper id="my-helper" fp="...args myHash=valueB">
    function updateHelperHash(helperId, hash, value, instanceToRerender) {
        var helper = document.querySelector(helperId);
        if (helper) {
            var args = helper.getAttribute("fp");
            var regex = new RegExp(hash + "=[^ ]*");
            var newArgs = args.replace(regex, hash + "=" + value);
            helper.setAttribute("fp", newArgs);
            // find closest template and make it dynamic
            var template = helper.closest("[fp-template]");
            if (template) {
                template.setAttribute("fp-dynamic", "true");
            }
            log("Updated helper hash: " + helperId); //!log
            if (instanceToRerender) {
                refresh(instanceToRerender);
            }
        } else {
            errorLog("Helper not found: " + helperId); //!error
        }
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                   Refresh and reload method                         */
    /* -------------------------------------------------------------------------- */

    // * Refresh all instances or a specific instance by instance key
    // Takes an optional instance key (e.g. "my-instance")
    function refresh(instanceKeyOrInstance) {
        if (typeof instanceKeyOrInstance === "string") {
            var instanceKey = instanceKeyOrInstance;
            if (instanceKey) {
                var instance = instances[instanceKey];
                if (instance) {
                    refreshInstance(instance);
                } else {
                    errorLog("Instance not found: " + instanceKey); //!error
                }
            } else {
                for (var key in instances) {
                    var instance = instances[key];
                    refreshInstance(instance);
                }
            }
        } else if (typeof instanceKeyOrInstance === "object") {
            var instance = instanceKeyOrInstance;
            refreshInstance(instance);
        }
        if (instanceKey) {
            var instance = instances[instanceKey];
            if (instance) {
                refreshInstance(instance);
            } else {
                errorLog("Instance not found: " + instanceKey); //!error
            }
        } else {
            for (var key in instances) {
                var instance = instances[key];
                refreshInstance(instance);
            }
        }
        function refreshInstance(instance) {
            // if instance element has hx-get attribute, refresh with htmx
            instance.elements.forEach(function (element) {
                if (element.getAttribute("hx-get")) {
                    htmx.trigger(element, "get");
                } else {
                    element.innerHTML = instance.template(instance.proxy);
                }
            });
        }
    }

    /* -------------------------------------------------------------------------- */
    /* !SECTION                                                                   */
    /* -------------------------------------------------------------------------- */

    //////////////////////////////////////////////////////////////////////////////!/

    /* -------------------------------------------------------------------------- */
    /* SECTION                     Handlebars integration                         */
    /* ANCHOR            attach handlebars methods to FlowPlater                  */
    /* -------------------------------------------------------------------------- */

    // * Register a Handlebars helper
    function registerHelper(name, fn) {
        Handlebars.registerHelper(name, fn);
    }
    // * Unregister a Handlebars helper
    function unregisterHelper(name) {
        Handlebars.unregisterHelper(name);
    }
    // * Prevent escaping of a string
    function SafeString(string) {
        return new Handlebars.SafeString(string);
    }
    // * Escape a string
    function escapeExpression(string) {
        return new Handlebars.escapeExpression(string);
    }

    //////////////////////////////////////////////////////////////////////////////?/

    /* -------------------------------------------------------------------------- */
    /* SECTION                 Flowplater advanced helpers                        */
    /* -------------------------------------------------------------------------- */

    // * Unrister default each/if helpers
    unregisterHelper("each");
    unregisterHelper("if");

    // * Register built-in helpers for FlowPlater
    registerHelper({
        /* -------------------------------------------------------------------------- */
        /* ANCHOR                          <if> helper                                */
        /* -------------------------------------------------------------------------- */

        if: function () {
            // Accepts any number of arguments
            // Returns true if the arguments are true

            const options = arguments[arguments.length - 1];
            const expression = Array.from(arguments, (arg) =>
                typeof arg === "object" ? "" : arg
            )
                .join(" ")
                .trim();

            // Define order of operations for operators
            const precedence = {
                "||": 1,
                "&&": 2,
                "==": 3,
                "!=": 3,
                "<": 4,
                ">": 4,
                "<=": 4,
                ">=": 4,
                regex: 5,
            };

            // Define operators and turn variables into values
            const tokens = expression
                .match(
                    /(?:[a-zA-Z_][a-zA-Z0-9_\.]*|\(|\)|&&|\|\||==|!=|<=|>=|<|>|regex|\b\S+\b)/g
                )
                .map((token) => {
                    // Check if the token is a variable path and resolve it
                    if (/^[a-zA-Z_][a-zA-Z0-9_\.]*$/.test(token)) {
                        return token
                            .split(".")
                            .reduce((context, key) => context[key], this);
                    } else {
                        // Otherwise, return the token as is (operators, parentheses)
                        return token;
                    }
                });

            // Compare two values with an operator
            // Uses a queue to evaluate the expression in order of operations
            const outputQueue = [],
                operatorStack = [];
            // loop through each token and push to outputQueue or operatorStack
            tokens.forEach((token) => {
                if (precedence.hasOwnProperty(token)) {
                    while (
                        operatorStack.length > 0 &&
                        precedence[operatorStack[operatorStack.length - 1]] >=
                            precedence[token]
                        // check if the operator on top of the stack
                        // has higher precedence than the current token
                    ) {
                        outputQueue.push(operatorStack.pop());
                        // pop the operator from the stack and push to the output queue
                    }
                    operatorStack.push(token);
                    // Push the current token to the stack after all operators
                    // with higher precedence have been popped
                } else if (token === "(") {
                    operatorStack.push(token);
                    // if the token is a left parenthesis, push it to the stack
                } else if (token === ")") {
                    // If the token is a right parenthesis, pop operators from the stack
                    // and push to the output queue until a left parenthesis is found
                    while (
                        operatorStack.length > 0 &&
                        operatorStack[operatorStack.length - 1] !== "("
                    ) {
                        outputQueue.push(operatorStack.pop());
                    }
                    // If no left parenthesis is found, throw an error
                    if (
                        operatorStack.length === 0 ||
                        operatorStack.pop() !== "("
                    ) {
                        throw new Error(
                            "Mismatched parentheses in <if> helper"
                        ); //!error
                    }
                } else {
                    // If the token is not an operator or parenthesis,
                    // push to the output queue
                    outputQueue.push(token);
                }
            });
            // After all tokens have been processed, pop any remaining operators
            while (operatorStack.length > 0) {
                const operator = operatorStack.pop();
                if (operator === "(" || operator === ")") {
                    throw new Error("Mismatched parentheses in <if> helper"); //!error
                }
                outputQueue.push(operator);
            }

            // Compare two values with an operator
            const stack = [];
            outputQueue.forEach((token) => {
                if (precedence.hasOwnProperty(token)) {
                    if (stack.length < 2) {
                        throw new Error("Missing operand in <if> helper"); //!error
                    }
                    // Pop two values from the stack and compare them with the operator
                    const rightOperand = stack.pop();
                    const leftOperand = stack.pop();
                    stack.push(compare(leftOperand, token, rightOperand));
                } else {
                    stack.push(token);
                }
            });
            if (stack.length !== 1) {
                throw new Error("Missing operator in <if> helper"); //!error
            }
            // Return true or false
            return stack.pop() ? options.fn(this) : options.inverse(this);
        },

        /* -------------------------------------------------------------------------- */
        /* ANCHOR                          <each> helper                              */
        /* -------------------------------------------------------------------------- */

        each: function (context, options) {
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
            var limit = options.hash.limit;
            var startAt = options.hash.startAt || 0;
            var key = options.hash.sortBy;
            var descending = options.hash.descending;
            var sortBeforeLimit = options.hash.sortBeforeLimit;
            var inverse = options.inverse;
            var fn = options.fn;
            var data;
            var contextPath;

            sortBeforeLimit =
                typeof sortBeforeLimit === "boolean" ? sortBeforeLimit : true;

            if (options.data && options.ids) {
                contextPath =
                    Handlebars.Utils.appendContextPath(
                        options.data.contextPath,
                        options.ids[0]
                    ) + ".";
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

            // Apply sorting and limiting logic
            if (sortBeforeLimit) {
                processedArray.sort(sortFunction(key, descending));
                processedArray = processedArray.slice(startAt, limit + startAt);
            } else {
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
                    blockParams: Handlebars.Utils.blockParams(
                        [value, data.key],
                        [contextPath + data.key, null]
                    ),
                });
            }

            if (i === 0) {
                result = inverse(this);
            }

            return result;
        },

        /* -------------------------------------------------------------------------- */
        /* ANCHOR                       <execute> helper                              */
        /* -------------------------------------------------------------------------- */

        execute: function (fn, ...args) {
            // Accepts a function name and arguments
            // Executes the function with the arguments
            // Example: {{execute myFunction arg1 arg2 arg3}} returns myFunction(arg1, arg2, arg3)
            args.pop();

            if (typeof fn === "function") {
                return fn(...args);
            } else {
                errorLog("Function not found or is not a function: " + fn); //!error
            }
        },

        /* -------------------------------------------------------------------------- */
        /* ANCHOR                          <sum> helper                               */
        /* -------------------------------------------------------------------------- */

        sum: function () {
            // Accepts multiple arguments, can be either numbers or arrays of numbers
            // Returns the sum of all arguments
            // Example: {{sum 1 2 3 4 5 (array 6 7 8 9 10)}} returns 55
            var sum = 0;
            for (var i = 0; i < arguments.length - 1; i++) {
                var arg = arguments[i];
                if (Array.isArray(arg)) {
                    arg.forEach(function (item) {
                        sum += item;
                    });
                } else {
                    sum += arg;
                }
            }
            return sum;
        },

        /* -------------------------------------------------------------------------- */
        /* ANCHOR                         <math> helper                               */
        /* -------------------------------------------------------------------------- */

        math: function (expression, options) {
            // Accepts a math expression and evaluates it
            // Returns the result
            // Example: {{math "1 + 2 * 3"}} returns 7

            // Define operator precedence
            const precedence = {
                "^": 1,
                "*": 2,
                "/": 2,
                "%": 2, // Added "%" operator for remainder
                "+": 3,
                "-": 3,
                min: 4,
                max: 4,
                abs: 4,
            };

            // Tokenize the expression
            const tokens = expression
                .trim()
                .match(
                    /(?!.*\.\.\/)(?:\(|\)|\^|\*|\/|\+|-|min|max|abs|%|\b\S+\b)/g
                )
                .map((token) => {
                    // Resolve context paths like 'this.data' or 'object.sum'
                    if (
                        /^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)+$/.test(token)
                    ) {
                        return token
                            .split(".")
                            .reduce(
                                (acc, part) => acc[part],
                                options.data.root
                            );
                    }
                    return token;
                });

            // Rest of the math function logic remains the same...
            // (Convert infix to postfix, evaluate postfix expression)

            // Evaluate the postfix expression
            const outputQueue = [];
            const operatorStack = [];
            tokens.forEach((token) => {
                if (token in precedence) {
                    while (
                        operatorStack.length > 0 &&
                        precedence[operatorStack[operatorStack.length - 1]] <=
                            precedence[token]
                    ) {
                        outputQueue.push(operatorStack.pop());
                    }
                    operatorStack.push(token);
                } else if (token === "(") {
                    operatorStack.push(token);
                } else if (token === ")") {
                    while (
                        operatorStack.length > 0 &&
                        operatorStack[operatorStack.length - 1] !== "("
                    ) {
                        outputQueue.push(operatorStack.pop());
                    }
                    if (operatorStack.pop() !== "(") {
                        throw new Error("Mismatched parentheses"); //!error
                    }
                } else {
                    outputQueue.push(token);
                }
            });

            while (operatorStack.length > 0) {
                if (
                    ["(", ")"].includes(operatorStack[operatorStack.length - 1])
                ) {
                    throw new Error("Mismatched parentheses"); //!error
                }
                outputQueue.push(operatorStack.pop());
            }

            // Evaluate the postfix expression
            const stack = [];
            outputQueue.forEach((token) => {
                if (token in precedence) {
                    const right = stack.pop();
                    const left = stack.pop();
                    if (left === undefined || right === undefined) {
                        throw new Error("Missing operand"); //!error
                    }
                    stack.push(evaluate(left, token, right));
                } else {
                    stack.push(parseFloat(token));
                }
            });

            if (stack.length !== 1) {
                throw new Error("Invalid expression"); //!error
            }

            return stack.pop();
        },

        /* -------------------------------------------------------------------------- */
        /* ANCHOR                        <bunny> helper                               */
        /* -------------------------------------------------------------------------- */

        bunny: function () {
            // Returns a cute bunny
            // It gives out hearts! <3
            // Example: {{bunny}}

            //     /) /)
            //   ପ(˶•-•˶)ଓ ♡
            //     /づ づ
            var bunny = SafeString(
                "&nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>ପ(˶•-•˶)ଓ ♡<br>&nbsp;&nbsp;&nbsp;/づ  づ"
            );

            //     (\ (\
            //   ପ(˶•-•˶)ଓ
            //   ♡ じ じ\
            var bunnyFlipped = SafeString(
                "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>&nbsp;&nbsp;ପ(˶•-•˶)ଓ <br>&nbsp;&nbsp;♡ じ  じ\\"
            );
            // wrap the bunny in a div with a unique id
            var parent = document.createElement("span");
            parent.className = "fp-bunny";
            parent.innerHTML = bunny.toString();

            // attach a script to the window object that will add the flipping animation
            if (!window.bunnyAnimation) {
                window.bunnyAnimation = function () {
                    // clear the previous interval
                    if (window.bunnyAnimationIntervalId) {
                        clearInterval(window.bunnyAnimationIntervalId);
                    }
                    // start a new interval
                    window.bunnyAnimationIntervalId = setInterval(function () {
                        var parents =
                            document.getElementsByClassName("fp-bunny");
                        for (var i = 0; i < parents.length; i++) {
                            var parent = parents[i];
                            if (parent.innerHTML === bunny.toString()) {
                                parent.innerHTML = bunnyFlipped.toString();
                            } else {
                                parent.innerHTML = bunny.toString();
                            }
                        }
                    }, 1000);
                };
                window.bunnyAnimation();
            }

            return SafeString(parent.outerHTML);
        },
    });

    /* -------------------------------------------------------------------------- */
    /* SECTION                       Helper functions                             */
    /* ANCHOR                         <each> sorter                               */
    /* -------------------------------------------------------------------------- */

    // Sort function used in the while helper
    function sortFunction(key, descending) {
        return function (a, b) {
            var left = key && a[key] ? a[key] : a;
            var right = key && b[key] ? b[key] : b;

            if (typeof left === "string" && typeof right === "string") {
                return descending
                    ? right.localeCompare(left)
                    : left.localeCompare(right);
            }

            if (left < right) {
                return descending ? 1 : -1;
            }
            if (left > right) {
                return descending ? -1 : 1;
            }
            return 0;
        };
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                       <math> evaluator                              */
    /* -------------------------------------------------------------------------- */

    function evaluate(left, operator, right) {
        function isNumeric(str) {
            if (typeof str != "string") return false;
            return !isNaN(str) && !isNaN(parseFloat(str));
        }

        // Convert strings to numbers if applicable
        if (isNumeric(left)) left = parseFloat(left);
        if (isNumeric(right)) right = parseFloat(right);

        // check if left and right are numbers
        if (typeof left !== "number" || typeof right !== "number") {
            throw new Error("Invalid operands"); //!error
        }
        if (right === 0 && operator === "/") {
            throw new Error(
                "Division by zero. Please do not attempt to destroy the universe."
            ); //!error
        }

        switch (operator) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;
            case "^":
                return Math.pow(left, right);
            case "%":
                return left % right;
            case "min":
                return Math.min(left, right);
            case "max":
                return Math.max(left, right);
            case "abs":
                return Math.abs(left);
            default:
                throw new Error("Invalid operator"); //!error
        }
    }

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                         <if> comparer                               */
    /* -------------------------------------------------------------------------- */

    function compare(left, operator, right) {
        // Function to check if a string can be converted to a number
        function isNumeric(str) {
            if (typeof str != "string") return false;
            return !isNaN(str) && !isNaN(parseFloat(str));
        }

        // Convert strings to numbers if applicable
        if (isNumeric(left)) left = parseFloat(left);
        if (isNumeric(right)) right = parseFloat(right);

        log("Comparing: " + left + " " + operator + " " + right); //!log

        switch (operator) {
            case "==":
                return left == right;
            case "!=":
                return left != right;
            case "<":
                if (typeof left === "string" && typeof right === "string") {
                    return left.localeCompare(right) < 0;
                }
                return left < right;
            case ">":
                if (typeof left === "string" && typeof right === "string") {
                    return left.localeCompare(right) > 0;
                }
                return left > right;
            case "<=":
                if (typeof left === "string" && typeof right === "string") {
                    return left.localeCompare(right) <= 0;
                }
                return left <= right;
            case ">=":
                if (typeof left === "string" && typeof right === "string") {
                    return left.localeCompare(right) >= 0;
                }
                return left >= right;
            case "&&":
                return left && right;
            case "||":
                return left || right;
            case "regex":
                return new RegExp(right).test(leftOperand);
            default:
                throw new Error("Unsupported operator: " + operator);
        }
    }

    /* -------------------------------------------------------------------------- */
    /* !SECTION                                                                   */
    /* !SECTION                                                                   */
    /* !SECTION                                                                   */
    /* -------------------------------------------------------------------------- */

    //////////////////////////////////////////////////////////////////////////////!/

    /* -------------------------------------------------------------------------- */
    /* SECTION                             API                                    */
    /* -------------------------------------------------------------------------- */
    /* ANCHOR                       Instance methods                              */
    /* -------------------------------------------------------------------------- */

    var instanceMethods = function (instanceName) {
        return {
            refresh: function () {
                refresh(instanceName);
            },
            render: function ({
                template = this.template,
                data = this.data,
                target = this.elements,
                returnHtml = false,
                onRender = defaults.onRender,
                onRendered = defaults.onRendered,
                animate = defaults.animate,
            }) {
                animate(target, function () {
                    render({
                        template: template,
                        data: data,
                        target: target,
                        returnHtml: returnHtml,
                        onRender: onRender,
                        onRendered: onRendered,
                        animate: animate,
                    });
                });
            },
            updateHelper: function (helperId, args) {
                updateHelper(helperId, args, instanceName);
            },
            updateHelperHash: function (helperId, hash, value) {
                updateHelperHash(helperId, hash, value, instanceName);
            },
        };
    };

    /* -------------------------------------------------------------------------- */
    /* ANCHOR                          Public API                                 */
    /* -------------------------------------------------------------------------- */

    // Public API
    return {
        compileTemplate: compileTemplate,
        render: render,
        refresh: refresh,
        getInstance: function (instanceName) {
            return instances[instanceName];
        },
        getInstances: function () {
            return instances;
        },
        options: function (options) {
            for (var key in options) {
                defaults[key] = options[key];
            }
        },
        templateCache: templateCache,
        process: process,
        registerHelper: registerHelper,
        unregisterHelper: unregisterHelper,
        SafeString: SafeString,
        escapeExpression: escapeExpression,
        updateHelper: updateHelper,
        updateHelperHash: updateHelperHash,
        init: function () {
            process();
        },
    };

    /* -------------------------------------------------------------------------- */
    /* !SECTION                                                                   */
    /* -------------------------------------------------------------------------- */
})();

document.addEventListener("DOMContentLoaded", function () {
    FlowPlater.init();
});

/* -------------------------------------------------------------------------- */
/* SECTION                           Archived                                 */
/* -------------------------------------------------------------------------- */

// trigger the load event on all hx-trigger="load" elements
// takes in an optional target element that defaults to document
// function triggerLoad(target = document) {
//     target.querySelectorAll("[hx-trigger=load]").forEach((element) => {
//         //processUrlAffixes(element);
//         htmx.process(element);
//     });
// }

// // Listen for when the htmx is loaded and trigger the load event on all hx-trigger="load" elements
// document.addEventListener("htmx:load", function (event) {
//     // check if the new content has any elements that need to be translated, and only translate if it does
//     if (event.detail.elt.querySelector(fpElements)) {
//         translateCustomTagsAttributes(event.detail.elt);
//         // Check if the new content has any elements with hx-trigger="load" and trigger the load event on them
//         htmx.process(document);
//         // send "preload-items" event document
//         sendEvent("preload");
//         triggerLoad(event.detail.elt);
//     }
// });

/* -------------------------------------------------------------------------- */
/* !SECTION                                                                   */
/* -------------------------------------------------------------------------- */
