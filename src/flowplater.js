/**!
@preserve FlowPlater starts here 
*/

var FlowPlater = (function () {
  "use strict";

  const VERSION = "1.4.5";
  const AUTHOR = "JWSLS";
  const LICENSE = "Flowplater standard licence";

  /* -------------------------------------------------------------------------- */
  /* SECTION                          Initial setup                             */
  /* ANCHOR                      Errors and dependencies                        */
  /* -------------------------------------------------------------------------- */

  class FlowPlaterError extends Error {
    constructor(message) {
      super(message);
      this.name = "FlowPlaterError";
    }
  }

  class TemplateError extends FlowPlaterError {
    constructor(message) {
      super(message);
      this.name = "TemplateError";
    }
  }

  class RenderError extends FlowPlaterError {
    constructor(message) {
      super(message);
      this.name = "RenderError";
    }
  }

  if (typeof Handlebars === "undefined") {
    throw new FlowPlaterError(
      "FlowPlater requires Handlebars. Get it at https://handlebarsjs.com/",
    );
  }
  if (typeof htmx === "undefined") {
    throw new FlowPlaterError(
      "FlowPlater requires htmx. Get it at https://htmx.org/",
    );
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                      Reset htmx headers                             */
  /* -------------------------------------------------------------------------- */

  document.body.addEventListener("htmx:configRequest", function (event) {
    // event.detail.headers = "";
    event.detail.headers["Content-Type"] =
      "application/x-www-form-urlencoded; charset=UTF-8";
  });

  // Add htmx:afterSwap event listener to process new content
  document.body.addEventListener("htmx:afterSwap", function (event) {
    Debug.log(
      Debug.levels.INFO,
      "htmx:afterSwap event detected, processing new content",
    );
    const swappedElement = event.detail.target;
    // Ensure swappedElement is not null before processing
    if (swappedElement) {
      process(swappedElement);
    } else {
      errorLog("Swapped element is null, cannot process.");
    }
  });

  /* -------------------------------------------------------------------------- */
  /* ANCHOR               Initialize defaults and variables                     */
  /* -------------------------------------------------------------------------- */

  // Private state
  const _state = {
    templateCache: {},
    instances: {},
    length: 0,
    defaults: {
      onRender: function () {},
      onRendered: function () {},
      onRemove: function () {},
      onRemoved: function () {},
      animation: false,
      debug: true,
    },
  };

  /* -------------------------------------------------------------------------- */
  /* SECTION                        Event System                                */
  /* -------------------------------------------------------------------------- */

  const EventSystem = (function () {
    const subscribers = new Map();

    return {
      subscribe(event, callback, context = null) {
        if (!subscribers.has(event)) {
          subscribers.set(event, []);
        }
        subscribers.get(event).push({ callback, context });
        return () => this.unsubscribe(event, callback);
      },

      unsubscribe(event, callback) {
        if (!subscribers.has(event)) return;
        const subs = subscribers.get(event);
        subscribers.set(
          event,
          subs.filter((sub) => sub.callback !== callback),
        );
      },

      publish(event, data) {
        if (!subscribers.has(event)) return;
        subscribers.get(event).forEach(({ callback, context }) => {
          callback.call(context, data);
        });
      },
    };
  })();

  /* -------------------------------------------------------------------------- */
  /* SECTION                      Performance Tools                             */
  /* -------------------------------------------------------------------------- */

  const Performance = {
    marks: {},

    start: function (label) {
      this.marks[label] = performance.now();
    },

    end: function (label) {
      if (!this.marks[label]) return;
      const duration = performance.now() - this.marks[label];
      delete this.marks[label];
      if (FlowPlaterObj.config.debug) {
        Debug.log(Debug.levels.INFO, `${label} took ${duration.toFixed(2)}ms`);
      }
      return duration;
    },
  };

  function memoize(fn) {
    const cache = new Map();
    return function (...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        Debug.log(Debug.levels.DEBUG, "Cache hit:", key);
        return cache.get(key);
      }
      Debug.log(Debug.levels.DEBUG, "Cache miss:", key);
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  }

  /* -------------------------------------------------------------------------- */
  /* SECTION                        Debug System                                */
  /* -------------------------------------------------------------------------- */

  const Debug = {
    levels: {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    },

    get level() {
      return FlowPlaterObj.config.debugLevel;
    },
    set level(value) {
      FlowPlaterObj.config.debugLevel = value;
    },

    get debugMode() {
      return FlowPlaterObj.config.debug;
    },
    set debugMode(value) {
      FlowPlaterObj.config.debug = value;
    },

    log: function (level, ...args) {
      if (!this.debugMode) return;
      if (level <= this.level) {
        const prefix = ["ERROR", "WARN", "INFO", "DEBUG"][level];
        console.log(`FlowPlater [${prefix}]:`, ...args);
      }
    },
  };

  // Replace existing log functions with Debug system
  function log(...args) {
    Debug.log(Debug.levels.INFO, ...args);
  }

  function errorLog(...args) {
    Debug.log(Debug.levels.ERROR, ...args);
  }

  // * Listen for htmx request start
  // Send event when htmx request starts if the element has an fp-instance attribute
  document.addEventListener("htmx:beforeRequest", function (event) {
    var element = event.detail.elt;
    if (element.hasAttribute("fp-instance")) {
      var instanceName = element.getAttribute("fp-instance");
      EventSystem.publish("request-start", { instanceName, ...event.detail });
    }
  });
  // * Listen for htmx request end
  // Send event when htmx request ends if the element has an fp-instance attribute
  document.addEventListener("htmx:afterRequest", function (event) {
    var element = event.detail.elt;
    if (element.hasAttribute("fp-instance")) {
      var instanceName = element.getAttribute("fp-instance");
      EventSystem.publish("request-end", { instanceName, ...event.detail });
    }
  });

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                    setupAnimation(element)                          */
  /* -------------------------------------------------------------------------- */

  // * For each element with an fp-animation attribute set to true, or if defaults.animation is true, get the hx-swap attribute.
  // if the value is empty, set it to innerHTML transition:true
  // if the value is not empty, append transition:true
  // if the value is set to false, do nothing

  function setupAnimation(element) {
    var shouldAnimate =
      element.getAttribute("fp-animation") || FlowPlaterObj.config.animation;
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
  /* ANCHOR                   processUrlAffixes(element)                        */
  /* -------------------------------------------------------------------------- */

  function processUrlAffixes(element) {
    const methods = ["get", "post", "put", "patch", "delete"];

    function findAttributeInParents(el, attributeName) {
      while (el) {
        if (el.hasAttribute(attributeName)) {
          return el.getAttribute(attributeName);
        }
        el = el.parentElement;
      }
      return null;
    }

    function processElement(el) {
      methods.forEach(function (method) {
        var attr = "hx-" + method;
        if (el.hasAttribute(attr)) {
          var originalUrl = el.getAttribute(attr);
          log("Original URL: " + originalUrl); // log

          var prepend = findAttributeInParents(el, "fp-prepend");
          var append = findAttributeInParents(el, "fp-append");

          var modifiedUrl = originalUrl;
          if (prepend) {
            modifiedUrl = prepend + modifiedUrl;
          }
          if (append) {
            modifiedUrl += append;
          }

          el.setAttribute(attr, modifiedUrl);
          log("Modified URL: " + modifiedUrl); // log

          if (modifiedUrl !== originalUrl) {
            log("Modification successful for", method, "on element", el); // log
          } else {
            errorLog("Modification failed for", method, "on element", el); // error
          }
        }
      });
    }

    // Process the passed element
    if (
      element.hasAttribute("fp-prepend") ||
      element.hasAttribute("fp-append") ||
      methods.some((method) => element.hasAttribute("hx-" + method))
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
      var proxyUrl = FlowPlaterObj.config.proxyUrl;
    }
    var methods = ["get", "post", "put", "patch", "delete"];
    methods.forEach(function (method) {
      if (element.hasAttribute("hx-" + method)) {
        var url = element.getAttribute("hx-" + method);
        element.setAttribute(
          "hx-" + method,
          proxyUrl + encodeURIComponent(url),
        );
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR             translateCustomHTMXAttributes(element)                  */
  /* -------------------------------------------------------------------------- */

  // prettier-ignore
  const htmxAttributes = ["boost", "get", "post", "on", "push-url", "select", "select-oob",
        "swap", "swap-oob", "target", "trigger", "vals", "confirm", "delete", "disable", 
        "disabled-elt", "disinherit", "encoding", "ext", "headers", "history", "history-elt", 
        "include", "indicator", "params", "patch", "preserve", "prompt", "put", "replace-url", 
        "request", "sync", "validate", "vars",
    ];

  // * For every element with an fp-[htmxAttribute] attribute, translate to hx-[htmxAttribute]
  function translateCustomHTMXAttributes(element) {
    const customPrefix = "fp-";
    const htmxPrefix = "hx-";

    htmxAttributes.forEach((attr) => {
      const customAttr = customPrefix + attr;
      if (element.hasAttribute(customAttr)) {
        const attrValue = element.getAttribute(customAttr);
        element.setAttribute(htmxPrefix + attr, attrValue);
        element.removeAttribute(customAttr);
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                       customTags(element)                           */
  /* -------------------------------------------------------------------------- */

  // Replace all html tags with custom tags
  const customTags = [{ tag: "fpselect", replaceWith: "select" }];

  function replaceCustomTags(element) {
    // Replace all custom tags
    customTags.forEach((tag) => {
      const elements = Array.from(element.getElementsByTagName(tag.tag));
      for (let i = 0; i < elements.length; i++) {
        const customElement = elements[i];
        const newElement = document.createElement(tag.replaceWith);
        newElement.innerHTML = customElement.innerHTML;

        // Copy all attributes from the custom element to the new element
        for (let attr of customElement.attributes) {
          newElement.setAttribute(attr.name, attr.value);
        }

        // Replace the custom element with the new element
        customElement.parentNode.replaceChild(newElement, customElement);
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                     processPreload(element)                         */
  /* -------------------------------------------------------------------------- */

  function preloadUrl(url) {
    if (!url) {
      errorLog("No URL provided for preloading");
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
      errorLog(`Failed to preload URL: ${url}`, e);
      cleanup();
    };

    const timeoutId = setTimeout(cleanup, 3000);
    document.head.appendChild(link);

    return { cleanup, timeoutId };
  }

  function addPreloadListener(element) {
    const preloadEvent = element.getAttribute("fp-preload") || "mouseover";

    if (preloadEvent === "mouseover") {
      let mouseOver = true;
      let timeoutId;
      let preloadInstance;

      const handleMouseOver = () => {
        mouseOver = true;
        timeoutId = setTimeout(() => {
          if (mouseOver) {
            const url =
              element.getAttribute("href") ||
              element.getAttribute("hx-get") ||
              element.getAttribute("fp-get");
            preloadInstance = preloadUrl(url);
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
    } else {
      const handler = () => {
        const url =
          element.getAttribute("href") ||
          element.getAttribute("hx-get") ||
          element.getAttribute("fp-get");
        preloadUrl(url);
      };
      element.addEventListener(preloadEvent, handler);

      // Store cleanup function
      element._preloadCleanup = () => {
        element.removeEventListener(preloadEvent, handler);
      };
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
                element.getAttribute("fp-get"),
            )
          : addPreloadListener(element);
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                 process(element = document)                         */
  /* -------------------------------------------------------------------------- */

  const ProcessingChain = {
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
        name: "urlAffixes",
        process: processUrlAffixes,
      },
      {
        name: "animation",
        process: setupAnimation,
      },
      {
        name: "proxy",
        process: setupProxy,
      },
    ],
    FP_SELECTOR: FlowPlaterObj.config.fpSelector,

    execute(element) {
      ProcessingChain.FP_SELECTOR = FlowPlaterObj.config.fpSelector;
      return this.processors.reduce((element, processor) => {
        try {
          return processor.process(element);
        } catch (error) {
          console.error(`Error in ${processor.name}:`, error);
          return element;
        }
      }, element);
    },
  };

  function process(element = document) {
    if (element === document || !element.matches(ProcessingChain.FP_SELECTOR)) {
      const fpElements = element.querySelectorAll(ProcessingChain.FP_SELECTOR);
      fpElements.forEach(processForElement);
    } else {
      processForElement(element);
    }

    function processForElement(element) {
      // Clean up any existing preload listeners
      if (element._preloadCleanup) {
        element._preloadCleanup();
      }

      ProcessingChain.execute(element);
      processPreload(element);
      htmx.process(element);
    }
  }

  /* -------------------------------------------------------------------------- */
  /* TODO                      Browser transition api                           */
  /* -------------------------------------------------------------------------- */

  // * use the browser view transition api to animate the changing of a target element
  // Takes an element and a callback function
  function animate(element, callback) {
    var shouldAnimate =
      element.getAttribute("fp-animation") || FlowPlaterObj.config.animation;
    if (!shouldAnimate) {
      callback();
      return;
    } else {
      var transition = document.startViewTransition(callback);
    }
  }

  /* -------------------------------------------------------------------------- */
  /* !SECTION                                                                   */
  /* -------------------------------------------------------------------------- */

  //////////////////////////////////////////////////////////////////////////////!/

  /* -------------------------------------------------------------------------- */
  /* SECTION                       Main functions                               */
  /* ANCHOR       Template translation from FlowPlater to Handlebars            */
  /* -------------------------------------------------------------------------- */

  // Converts <tag fp="value"> to {{#tag value}} and </tag> to {{/tag}}
  // Takes a template id (e.g. "#my-template") and returns a compiled template
  const compileTemplate = memoize(function (templateId) {
    Performance.start("compile:" + templateId);
    // Check if the template is already cached or if fp-dynamic is true
    var templateElement = document.querySelector(templateId);

    log("Trying to compile template: " + templateId); //!log

    if (!templateElement) {
      errorLog("Template not found: " + templateId); //!error
      Performance.end("compile:" + templateId);
      return null;
    }

    if (
      !_state.templateCache[templateId] ||
      (templateElement.hasAttribute("fp-dynamic") &&
        templateElement.getAttribute("fp-dynamic") !== "false")
    ) {
      log("compiling template: " + templateId); //!log
      // Function to construct tag with attributes
      function constructTagWithAttributes(element) {
        let tagName = element.tagName.toLowerCase();
        const customTags = [{ tag: "fpselect", replaceWith: "select" }];
        // Replace all custom tags
        customTags.forEach((tag) => {
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

              // Recursively process inner content
              const innerContent = processNode(child);

              // Construct the Handlebars helper syntax
              if (
                helperName === "log" ||
                helperName === "lookup" ||
                helperName === "execute"
              ) {
                if (innerContent) {
                  result += `{{${helperName} ${innerContent} ${args}}}`;
                } else {
                  result += `{{${helperName} ${args}}}`;
                }
              } else if (helperName === "comment") {
                result += `{{!-- ${args} --}}`;
              } else if (helperName === "if") {
                // Escape double quotes in args to prevent syntax errors
                const escapedArgs = args.replace(/"/g, '\\"');
                result += `{{#${helperName} "${escapedArgs}"}}${innerContent}{{/${helperName}}}`;
              } else if (helperName === "else") {
                result += `{{${helperName}}}${innerContent}`;
              } else if (helperName === "math") {
                if (innerContent) {
                  console.warn(
                    `FlowPlater: The <${helperName}> helper does not accept inner content.`,
                  );
                }
                result += `{{#${helperName} "${args}"}}`;
              } else {
                result += `{{#${helperName} ${args}}}${innerContent}{{/${helperName}}}`;
              }
            } else if (child.tagName === "else") {
              // Process as an else block
              const innerContent = processNode(child);
              result += `{{${child.tagName.toLowerCase()}}}${innerContent}`;
            } else if (
              child.tagName === "template" ||
              child.tagName === "fptemplate" ||
              child.hasAttribute("fp-template")
            ) {
              // return node as is
              result += child.outerHTML;
            } else {
              // Recursively process non-helper elements
              const childContent = processNode(child);
              // Construct the tag with attributes and include the child's content
              const startTag = constructTagWithAttributes(child);
              let endTagName = child.tagName.toLowerCase();
              const customTags = [{ tag: "fpselect", replaceWith: "select" }];
              // Replace all custom tags
              customTags.forEach((tag) => {
                if (endTagName === tag.tag) {
                  endTagName = tag.replaceWith;
                }
              });
              const endTag = `</${endTagName}>`;
              result += `${startTag}${childContent}${endTag}`;
            }
          }
        });
        return result;
      }

      const handlebarsTemplate = processNode(templateElement);
      log("Compiling Handlebars template: " + handlebarsTemplate); //!log

      try {
        _state.templateCache[templateId] =
          Handlebars.compile(handlebarsTemplate);
        Performance.end("compile:" + templateId);
        return _state.templateCache[templateId];
      } catch (e) {
        errorLog(
          "Template not valid: " +
            handlebarsTemplate +
            " | Error: " +
            e.message,
        );
        Performance.end("compile:" + templateId);
        return null;
      } finally {
        // remove the template element
        templateElement.remove();
      }
    }
    Performance.end("compile:" + templateId);
    return _state.templateCache[templateId];
  });

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
    onRender = FlowPlaterObj.config.onRender,
    onRendered = FlowPlaterObj.config.onRendered,
    instanceName,
    animate = FlowPlaterObj.config.animation,
  }) {
    Performance.start("render:" + (instanceName || "anonymous"));

    /* -------------------------------------------------------------------------- */
    /*                                initial setup                               */
    /* -------------------------------------------------------------------------- */

    EventSystem.publish("beforeRender", {
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
      instanceName = _state.length;
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
    if (!_state.templateCache[template]) {
      compileTemplate(template);
      _state.length++;
    }
    var template = _state.templateCache[template];
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
    if (
      !_state.instances[instanceName] ||
      _state.instances[instanceName].data !== data
    ) {
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
      _state.instances[instanceName] = {
        elements: elements,
        template: template,
        proxy: proxy,
        data: data,
        ...instanceMethods(instanceName),
      };
    }

    log("Proxy created: ", _state.instances[instanceName].proxy); //!log

    /* -------------------------------------------------------------------------- */
    /*                               Render template                              */
    /* -------------------------------------------------------------------------- */

    // Render the template with the current data
    if (returnHtml) {
      try {
        var html = template(_state.instances[instanceName].proxy);
        return html;
      } catch (error) {
        throw new RenderError(`Failed to render template: ${error.message}`); //!error
      } finally {
        elements.forEach(function (element) {
          onRendered.call(element);
        });
        EventSystem.publish("rendered", {
          instance: instanceName,
          template,
          data,
          target,
          elements,
          returnHtml,
          html,
        });
        log("Rendered HTML: " + html); //!log
        Performance.end("render:" + (instanceName || "anonymous"));
      }
    } else {
      try {
        elements.forEach(function (element) {
          element.innerHTML = template(_state.instances[instanceName].proxy);
        });
        return _state.instances[instanceName];
      } catch (error) {
        throw new RenderError(`Failed to render template: ${error.message}`); //!error
      } finally {
        elements.forEach(function (element) {
          onRendered.call(element);
        });
        EventSystem.publish("afterRender", {
          instance: instanceName,
          template,
          data,
          target,
          elements,
          returnHtml,
        });
        log("Rendered instance: " + instanceName, template, data, target); //!log
        Performance.end("render:" + (instanceName || "anonymous"));
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
        xhr.getResponseHeader("Content-Type") === "text/html" ||
        !elt.hasAttribute("fp-template")
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
        log("Rendering html to " + templateId + " based on htmx response"); //!log
        var data = JSON.parse(text);
        var renderedHtml = render({
          template: templateId,
          data: data,
          target: elt,
          returnHtml: true,
        });
        return renderedHtml;
      } else {
        // assume current element is a template
        log("Rendering html to current element based on htmx response"); //!log
        var data = JSON.parse(text);
        if (elt.id === "" || elt.id === undefined) {
          errorLog(
            "No template found. If the current element is a template, it must have an id.",
          ); //!error
          return null;
        }
        var templateId = "#" + elt.id;
        // Translate custom attributes before rendering
        translateCustomHTMXAttributes(elt);
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
        if (!templateId) {
          return;
        }
        if (
          _state.templateCache[templateId] ||
          _state.templateCache["#" + evt.detail.elt.id]
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
    if (element.hasAttribute("hx-ext")) {
      element.setAttribute(
        "hx-ext",
        element.getAttribute("hx-ext") + ", flowplater",
      );
    } else {
      element.setAttribute("hx-ext", "flowplater");
    }
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
    var instance = _state.instances[instanceKey];
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
  /* ANCHOR                   Refresh and reload method                         */
  /* -------------------------------------------------------------------------- */

  // * Refresh all instances or a specific instance by instance key
  // Takes an optional instance key (e.g. "my-instance")
  function refresh(instanceKeyOrInstance) {
    if (!instanceKeyOrInstance) {
      // Refresh all instances
      for (var key in _state.instances) {
        refreshInstance(_state.instances[key]);
      }
      return;
    }

    if (typeof instanceKeyOrInstance === "string") {
      // Refresh specific instance by key
      var instance = _state.instances[instanceKeyOrInstance];
      if (instance) {
        refreshInstance(instance);
      } else {
        errorLog("Instance not found: " + instanceKeyOrInstance);
      }
    } else if (typeof instanceKeyOrInstance === "object") {
      // Refresh specific instance object
      refreshInstance(instanceKeyOrInstance);
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

    if: function (expressionString, options) {
      //log("Root data: ", options.data.root); //!log

      const expression = expressionString.trim();

      log("comparing expression: " + expression); //!log

      // Define operator precedence
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

      // Updated regular expression to include parentheses
      const tokenRegex =
        /"([^"]*)"|'([^']*)'|\b(?:&&|\|\||==|!=|<=|>=|<|>|regex)\b|\(|\)|\S+/g;

      // Tokenize the expression
      const rawTokens = expression.match(tokenRegex);

      // Process each token
      const tokens = rawTokens;

      // Uses a queue to evaluate the expression in order of operations
      const outputQueue = [];
      const operatorStack = [];
      tokens.forEach((token) => {
        if (precedence.hasOwnProperty(token)) {
          while (
            operatorStack.length > 0 &&
            precedence[operatorStack[operatorStack.length - 1]] >=
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
          if (operatorStack.length === 0 || operatorStack.pop() !== "(") {
            throw new TemplateError(
              "Mismatched parentheses in <if> helper while comparing " +
                expression,
            ); //!error
          }
        } else {
          outputQueue.push(token);
        }
      });

      while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
        if (operator === "(" || operator === ")") {
          throw new TemplateError(
            "Mismatched parentheses in <if> helper while comparing " +
              expression,
          ); //!error
        }
        outputQueue.push(operator);
      }

      // Evaluate the expression
      const stack = [];
      outputQueue.forEach((token) => {
        if (precedence.hasOwnProperty(token)) {
          if (stack.length < 2) {
            throw new TemplateError(
              "Missing operand in <if> helper while comparing " + expression,
            ); //!error
          }
          const rightOperand = stack.pop();
          const leftOperand = stack.pop();
          stack.push(compare(leftOperand, token, rightOperand));
        } else {
          // Resolve variables and literals
          const value = resolveValue(token, options.data.root, this);
          stack.push(value);
        }
      });

      if (stack.length !== 1) {
        throw new TemplateError(
          "Invalid expression in <if> helper while comparing " + expression,
        ); //!error
      }

      return stack.pop() ? options.fn(this) : options.inverse(this);

      // -------------------------------------------------------------------------- */

      function resolveValue(token, dataContext, currentContext) {
        // Check if token is a string literal
        if (
          (token.startsWith('"') && token.endsWith('"')) ||
          (token.startsWith("'") && token.endsWith("'"))
        ) {
          return token.slice(1, -1);
        }

        // Handle 'this' and 'this.property' references
        if (token === "this") {
          return currentContext;
        } else if (token.startsWith("this.")) {
          const path = token.split(".").slice(1); // Remove 'this' from path
          let value = currentContext;

          for (let i = 0; i < path.length; i++) {
            if (value && value.hasOwnProperty(path[i])) {
              value = value[path[i]];
            } else {
              value = undefined;
              break;
            }
          }

          return value;
        }

        // Resolve variable from data context
        const path = token.split(".");
        let value = dataContext;

        for (let i = 0; i < path.length; i++) {
          if (value && value.hasOwnProperty(path[i])) {
            value = value[path[i]];
          } else {
            value = undefined;
            break;
          }
        }

        return value;
      }
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
            options.ids[0],
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

      if (limit === undefined) {
        limit = processedArray.length;
      }

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
            [contextPath + data.key, null],
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

      const fnName = String(fn);
      const functionToExecute = this[fnName] || window[fnName];

      // Execute the function if it exists
      if (typeof functionToExecute === "function") {
        return functionToExecute(...args);
      } else {
        // Log an error if the function is not found
        errorLog("Function not found or is not a function: " + fn);
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
        .match(/(?!.*\.\.\/)(?:\(|\)|\^|\*|\/|\+|-|min|max|abs|%|\b\S+\b)/g)
        .map((token) => {
          // Resolve context paths like 'this.data' or 'object.sum'
          if (/^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)+$/.test(token)) {
            return token
              .split(".")
              .reduce((acc, part) => acc[part], options.data.root);
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
            throw new TemplateError("Mismatched parentheses"); //!error
          }
        } else {
          outputQueue.push(token);
        }
      });

      while (operatorStack.length > 0) {
        if (["(", ")"].includes(operatorStack[operatorStack.length - 1])) {
          throw new TemplateError("Mismatched parentheses"); //!error
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
            throw new TemplateError(
              `Missing operand! Error in expression: ${left} ${token} ${right}`,
            ); //!error
          }
          stack.push(evaluate(left, token, right));
        } else {
          stack.push(parseFloat(token));
        }
      });

      if (stack.length !== 1) {
        throw new TemplateError("Invalid expression"); //!error
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

      var bunny = SafeString(
        "&nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>ପ(˶•-•˶)ଓ ♡<br>&nbsp;&nbsp;&nbsp;/づ  づ",
      );
      var bunnyFlipped = SafeString(
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>&nbsp;&nbsp;ପ(˶•-•˶)ଓ <br>&nbsp;&nbsp;♡ じ  じ\\",
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
            var parents = document.getElementsByClassName("fp-bunny");
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
      throw new TemplateError("Invalid operands"); //!error
    }
    if (right === 0 && operator === "/") {
      throw new TemplateError(
        "Division by zero. Please do not attempt to create a black hole.",
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
        throw new TemplateError("Invalid operator"); //!error
    }
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                         <if> comparer                               */
  /* -------------------------------------------------------------------------- */

  function compare(left, operator, right) {
    // Function to check if a value is undefined or null
    function isNullOrUndefined(value) {
      return value === null || value === undefined;
    }

    // Handle cases where left or right is undefined or null
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
          // For other operators, undefined or null values cannot be compared
          return false;
      }
    }

    // If both operands are strings, use localeCompare
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
          throw new TemplateError(
            "Unsupported operator for strings: " + operator,
          ); //!error
      }
    } else {
      // Handle numeric and boolean comparisons
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
          throw new TemplateError("Unsupported operator: " + operator); //!error
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  /* !SECTION                                                                   */
  //////////////////////////////////////////////////////////////////////////////?/
  /* !SECTION                                                                   */
  /* -------------------------------------------------------------------------- */

  //////////////////////////////////////////////////////////////////////////////!/

  /* -------------------------------------------------------------------------- */
  /* SECTION                             API                                    */
  /* -------------------------------------------------------------------------- */
  /* ANCHOR                       Instance methods                              */
  /* -------------------------------------------------------------------------- */

  var instanceMethods = function (instanceName) {
    // Helper function to resolve a path within the data
    function _resolvePath(path) {
      const pathParts = path.split(/[\.\[\]'"]/);
      let current = this.data;
      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        if (part === "") continue; // Ignore empty parts
        if (
          current === undefined ||
          current === null ||
          !current.hasOwnProperty(part)
        ) {
          return undefined; // Path segment not found
        }
        current = current[part];
      }
      return current; // Return resolved value
    }

    return {
      refresh: function () {
        refresh(instanceName);
      },
      render: function ({
        template = this.template,
        data = this.data,
        target = this.elements,
        returnHtml = false,
        onRender = FlowPlaterObj.config.onRender,
        onRendered = FlowPlaterObj.config.onRendered,
        animate = FlowPlaterObj.config.animation,
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
      set: function (path, value) {
        if (!path) return; // Handle empty path
        const pathParts = path.split(/[\.\[\]'"]/); // Split path here once
        let current = this.data;
        for (let i = 0; i < pathParts.length - 1; i++) {
          const part = pathParts[i];
          if (part === "") continue; // Ignore empty parts
          if (
            current === undefined ||
            current === null ||
            !current.hasOwnProperty(part)
          ) {
            // Check hasOwnProperty
            console.warn(
              `Path segment "${part}" not found in data for path "${path}"`,
            );
            return;
          }
          current = current[part];
        }
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart !== "") {
          current[lastPart] = value;
        }
      },
      update: function (newData) {
        Object.assign(this.data, newData); // Shallow merge for update
      },
      push: function (arrayPath, value) {
        let array;
        if (arrayPath) {
          array = _resolvePath.call({ data: this.data }, arrayPath); // Use helper, call with context
          if (!array) {
            console.warn(`Array path "${arrayPath}" not found.`);
            return;
          }
        } else {
          array = this.data; // Target root data if no path
        }

        if (Array.isArray(array)) {
          array.push(value);
        } else {
          console.error("Target at path is not an array:", array);
        }
      },
      remove: function (arrayPath, index) {
        let array;
        if (arrayPath) {
          array = _resolvePath.call({ data: this.data }, arrayPath); // Use helper, call with context
          if (!array) {
            console.warn(`Array path "${arrayPath}" not found.`);
            return;
          }
        } else {
          array = this.data; // Target root data if no path
        }

        if (Array.isArray(array)) {
          array.splice(index, 1);
        } else {
          console.error("Target at path is not an array:", array);
        }
      },
      get: function (path) {
        if (!path) return this.data; // Handle empty path, return root data
        return _resolvePath.call({ data: this.data }, path); // Use helper, call with context
      },
    };
  };

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                          Public API                                 */
  /* -------------------------------------------------------------------------- */

  // Create the base FlowPlater object
  const FlowPlaterObj = {
    config: {
      debug: false,
      debugLevel: Debug.levels.WARN,
      animation: true,
      proxyUrl: "https://corsproxy.io/?url=",
      customTags: [{ tag: "fpselect", replaceWith: "select" }],
      htmxAttributes: [
        "boost",
        "get",
        "post",
        "on",
        "push-url",
        "select",
        "select-oob",
        "swap",
        "swap-oob",
        "target",
        "trigger",
        "vals",
        "confirm",
        "delete",
        "disable",
        "disabled-elt",
        "disinherit",
        "encoding",
        "ext",
        "headers",
        "history",
        "history-elt",
        "include",
        "indicator",
        "params",
        "patch",
        "preserve",
        "prompt",
        "put",
        "replace-url",
        "request",
        "sync",
        "validate",
        "vars",
      ],
      fpSelector:
        "[fp-template], [fp-get], [fp-post], [fp-put], [fp-delete], [fp-patch]",
      onRender: null,
      onRendered: null,
    },

    options: function (options) {
      // Merge provided options into FlowPlater.config
      for (var key in options) {
        FlowPlaterObj.config[key] = options[key];
      }
      return this;
    },

    compileTemplate: compileTemplate,

    render: function (options) {
      render(options);
      return this;
    },

    refresh: function (instanceKey) {
      refresh(instanceKey);
      return this;
    },

    getInstance: function (instanceName) {
      return _state.instances[instanceName];
    },

    getInstances: function () {
      return _state.instances;
    },

    on: function (...args) {
      EventSystem.subscribe(...args);
      return this;
    },

    off: function (...args) {
      EventSystem.unsubscribe(...args);
      return this;
    },

    emit: function (...args) {
      EventSystem.publish(...args);
      return this;
    },

    debug: function (level) {
      Debug.level = level;
      return this;
    },

    templateCache: _state.templateCache,
    process,
    registerHelper,
    unregisterHelper,
    SafeString,
    escapeExpression,

    init: function () {
      Performance.start("init");
      Debug.log(Debug.levels.INFO, "Initializing FlowPlater...");

      // Load configuration from meta tag if present
      const metaConfig = document.querySelector('meta[name="fp-config"]');
      if (metaConfig) {
        try {
          const config = JSON.parse(metaConfig.content);
          // Merge meta config into FlowPlater.config
          for (const key in config) {
            FlowPlaterObj.config[key] = config[key];
          }
          log("Configuration loaded from meta tag: ", FlowPlaterObj.config); //!log
        } catch (e) {
          errorLog("Error parsing fp-config meta tag: " + e); //!error
        }
      }

      // Apply configuration from FlowPlater.config
      Debug.level = FlowPlaterObj.config.debugLevel;
      Debug.debugMode = FlowPlaterObj.config.debug;
      replaceCustomTags.customTags = FlowPlaterObj.config.customTags;
      translateCustomHTMXAttributes.htmxAttributes =
        FlowPlaterObj.config.htmxAttributes;
      ProcessingChain.FP_SELECTOR = FlowPlaterObj.config.fpSelector;

      process();
      Debug.log(Debug.levels.INFO, "FlowPlater initialized successfully");
      Performance.end("init");
      return this;
    },

    clearTemplateCache: function (templateId) {
      if (templateId) {
        if (_state.templateCache[templateId]) {
          delete _state.templateCache[templateId];
          log(`Cleared template cache for: ${templateId}`);
        }
      } else {
        _state.templateCache = {};
        log("Cleared entire template cache");
      }
      return this;
    },

    isTemplateCached: function (templateId) {
      return !!_state.templateCache[templateId];
    },

    getTemplateCacheSize: function () {
      return Object.keys(_state.templateCache).length;
    },

    cleanup: function (instanceName) {
      if (instanceName) {
        const instance = _state.instances[instanceName];
        if (instance) {
          // Clean up preload listeners
          instance.elements.forEach((element) => {
            if (element._preloadCleanup) {
              element._preloadCleanup();
            }
          });

          // Remove instance
          delete _state.instances[instanceName];
          log(`Cleaned up instance: ${instanceName}`);
        }
      } else {
        // Clean up all instances
        Object.keys(_state.instances).forEach((name) => {
          this.cleanup(name);
        });
        log("Cleaned up all instances");
      }
      return this;
    },
  };

  return FlowPlaterObj;

  /* -------------------------------------------------------------------------- */
  /* !SECTION                                                                   */
  /* -------------------------------------------------------------------------- */
})();
if (document.readyState === "complete" || document.readyState !== "loading") {
  try {
    FlowPlater.init();
  } catch (error) {
    console.error("FlowPlater initialization failed:", error);
  }
} else {
  document.addEventListener("DOMContentLoaded", function () {
    try {
      FlowPlater.init();
    } catch (error) {
      console.error("FlowPlater initialization failed:", error);
    }
  });
}
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
//         translateCustomHTMXAttributes(event.detail.elt);
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
