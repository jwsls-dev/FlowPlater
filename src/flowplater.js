var FlowPlater = (function () {
    // Check for dependencies
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

    // Template cache
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

    // * For each element with an fp-animation attribute set to true, or if defaults.animation is true, get the hx-swap attribute.
    // if the value is empty, set it to innerHTML transition:true
    // if the value is not empty, append transition:true
    // if the value is set to false, do nothing
    document.querySelectorAll("[fp-template]").forEach(function (element) {
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
    });

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

    // * Send event
    // Takes an event name and data object
    function sendEvent(eventName, data) {
        var event = new CustomEvent("flowplater:" + eventName, {
            detail: data,
        });
        document.dispatchEvent(event);
        // console.log("event sent: " + eventName);
    }

    // * Log data if debug is true
    function log(data) {
        if (defaults.debug) {
            console.log("Flowplater: " + data);
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

    // * Compile a template
    // Converts <tag fp="value"> to {{#tag value}} and </tag> to {{/tag}}
    // Takes a template id (e.g. "#my-template") and returns a compiled template
    function compileTemplate(templateId) {
        if (!templateCache[templateId]) {
            var templateElement = document.querySelector(templateId);
            if (!templateElement) {
                errorLog("Template not found: " + templateId);
                return null;
            }
            var templateHtml = templateElement.innerHTML;

            var parser = new DOMParser();
            var doc = parser.parseFromString(templateHtml, "text/html");
            var elementsWithFp = doc.querySelectorAll("[fp]");
            elementsWithFp.forEach(function (element) {
                var tag = element.tagName.toLowerCase();
                if (element.outerHTML.indexOf("/>") !== -1) {
                    errorLog(
                        "Self-closing tag not supported: " + element.outerHTML
                    );
                    return;
                }
                var fpValue = element.getAttribute("fp");
                // Decode HTML entities in the attribute value
                var textArea = document.createElement("textarea");
                textArea.innerHTML = fpValue;
                var decodedFpValue = textArea.value;

                // Replace <tag fp="value"> with {{#tag value}}
                var regex = new RegExp("<" + tag + '(.*?) fp="(.*?)"', "g");
                var helperStart = "{{#" + tag + " " + decodedFpValue + "}}";
                templateHtml = templateHtml.replace(regex, helperStart);

                // Replace </tag> with {{/tag}}
                templateHtml = templateHtml.replace(
                    new RegExp("</" + tag + ">", "g"),
                    "{{/" + tag + "}}"
                );
                log("Template compiled: " + templateHtml);
            });

            // Compile and cache
            try {
                templateCache[templateId] = Handlebars.compile(templateHtml);
                return templateCache[templateId];
            } catch (e) {
                errorLog(
                    "Template not valid: " +
                        templateHtml +
                        " | Error: " +
                        e.message
                );
                return null;
            }
        }
        return templateCache[templateId];
    }

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
        instanceName = length,
    }) {
        elements.forEach(function (element) {
            onRender.call(element);
        });
        sendEvent("render", {
            instanceName,
            template,
            data,
            target,
            returnHtml,
        });
        log("Rendering instance: " + instanceName, template, data, target);

        var elements;
        var instanceName;
        // Get the target elements. If target is a string, use querySelectorAll. If target is a jQuery object, use toArray. If target is node or NodeList, use it directly.
        if (typeof target === "string") {
            elements = document.querySelectorAll(target);
        } else if (typeof target === "object" && target.jquery) {
            elements = target.toArray();
        } else if (typeof target === "object") {
            elements = target;
        } else {
            errorLog("Invalid target type: " + typeof target);
            return;
        }
        // make elements an array if it's a NodeList
        if (elements.length === undefined) {
            elements = [elements];
        }
        if (instanceName !== length) {
            instanceName = instanceName;
        } else if (elements[0].hasAttribute("fp-instance")) {
            instanceName = elements[0].getAttribute("fp-instance");
        } else if (elements[0].id) {
            instanceName = elements[0].id;
        }
        // Compile the template if it's not already cached
        // If the template is not cached, it will be compiled and cached, and length will be incremented
        if (!templateCache[template]) {
            compileTemplate(template);
            length++;
        }
        var template = templateCache[template];
        if (!template) {
            errorLog("Template not found: " + template);
            return;
        }

        if (elements.length === 0) {
            errorLog("Target not found: " + target);
            return;
        }
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

        log("Proxy created: " + instances[instanceName].proxy);

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
                log("Rendered HTML: " + html);
                return html;
            } catch (error) {
                errorLog("Error rendering template: " + error.message);
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
                );
                return instances[instanceName];
            } catch (error) {
                errorLog("Error rendering template: " + error.message);
            }
        }
    }

    // * XML to JSON converter
    // Takes an XML document and returns a JSON object
    function xmlToJson(xml) {
        var obj = {};
        // handle nodeType 1 (element) and 3 (text)
        if (xml.nodeType == 1) {
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] =
                        attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) {
            obj = xml.nodeValue;
        }
        // do children
        if (xml.hasChildNodes()) {
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof obj[nodeName] == "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof obj[nodeName].push == "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    }

    // * htmx extension
    // Intercepts htmx requests and renders the response with FlowPlater
    // Takes an element and returns the rendered HTML
    htmx.defineExtension("flowplater", {
        transformResponse: function (text, xhr, elt) {
            var templateId = elt.getAttribute("fp-template");
            log("Response received: " + text, xhr, elt, templateId);
            // if text is XML, convert to JSON
            if (xhr.getResponseHeader("Content-Type") === "text/xml") {
                var parser = new DOMParser();
                var doc = parser.parseFromString(text, "text/xml");
                text = JSON.stringify(xmlToJson(doc));
            }
            if (templateId) {
                log(
                    "Rendering html to " +
                        templateId +
                        " based on htmx response"
                );
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
                log("Rendering html to current element based on htmx response");
                var data = JSON.parse(text);
                var template = compileTemplate("#" + elt.id);
                if (!template) {
                    errorLog(
                        "No template found. If the current element is a template, it must have an id."
                    );
                    return null;
                }
            }
            return text;
        },
    });

    // * Add hx-ext attribute
    document.querySelectorAll("[fp-template]").forEach(function (element) {
        element.setAttribute("hx-ext", "flowplater");
        log("Added hx-ext attribute to " + element.id);
    });

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
                    errorLog("Instance not found: " + instanceKey);
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
                errorLog("Instance not found: " + instanceKey);
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

    // ! error logging
    function errorLog(message) {
        console.error(
            "%cFlowPlater:%c " + message,
            "font-weight: bold",
            "font-weight: normal"
        );
    }

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
        };
    };

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
    };
})();
