/**!
@preserve FlowPlater starts here 
*/

var FlowPlater = (function () {
  "use strict";

  const VERSION = "1.4.19";
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

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                     Event Listeners                                 */
  /* -------------------------------------------------------------------------- */

  // Track processing state with request IDs
  const processingElements = new Map();
  let currentRequestId = 0;

  function generateRequestId() {
    return `fp-${Date.now()}-${currentRequestId++}`;
  }

  // Single source of truth for event handling
  function handleFlowPlaterRequest(target, requestId, action) {
    if (!target || !target.hasAttribute("fp-template")) return;

    const currentInfo = processingElements.get(target);
    requestId = requestId || generateRequestId();

    switch (action) {
      case "start":
        if (!currentInfo || currentInfo.requestId !== requestId) {
          processingElements.set(target, {
            requestId: requestId,
            timestamp: Date.now(),
            processed: false,
          });
          Debug.log(
            Debug.levels.DEBUG,
            "Added element to processing set",
            target,
            requestId,
          );
        }
        break;

      case "process":
        if (
          currentInfo &&
          currentInfo.requestId === requestId &&
          !currentInfo.processed
        ) {
          currentInfo.processed = true;
          processingElements.set(target, currentInfo);
          return true;
        }
        return false;

      case "cleanup":
        if (currentInfo && currentInfo.requestId === requestId) {
          processingElements.delete(target);
          Debug.log(
            Debug.levels.DEBUG,
            "Cleaned up after request",
            target,
            requestId,
          );
        }
        break;
    }
  }

  // Remove existing listeners
  document.body.removeEventListener("htmx:afterSwap", null);
  document.body.removeEventListener("htmx:beforeSwap", null);
  document.body.removeEventListener("htmx:beforeRequest", null);

  // Add consolidated event listeners
  document.body.addEventListener("htmx:beforeRequest", function (event) {
    const target = event.detail.elt;
    const requestId = event.detail.requestId || generateRequestId();
    event.detail.requestId = requestId; // Ensure requestId is set
    handleFlowPlaterRequest(target, requestId, "start");
  });

  document.body.addEventListener("htmx:beforeSwap", function (event) {
    const target = event.detail.elt;
    const requestId = event.detail.requestId;
    const info = processingElements.get(target);

    if (!info || info.requestId !== requestId) {
      event.preventDefault();
      Debug.log(Debug.levels.DEBUG, "Prevented swap - request ID mismatch");
    }
  });

  htmx.defineExtension("flowplater", {
    transformResponse: function (text, xhr, elt) {
      // Get request ID from either xhr or processing elements
      const requestId = xhr.requestId || processingElements.get(elt)?.requestId;
      const currentInfo = processingElements.get(elt);

      Debug.log(
        Debug.levels.DEBUG,
        "Transform response for request",
        requestId,
        "current info:",
        currentInfo,
      );

      // Skip if element is not in processing set
      if (!currentInfo || currentInfo.requestId !== requestId) {
        Debug.log(
          Debug.levels.DEBUG,
          "Skipping transformation - request ID mismatch",
          { current: currentInfo?.requestId, received: requestId },
        );
        return text;
      }

      // Only process if fp-template is present
      if (!elt.hasAttribute("fp-template")) {
        return text;
      }

      // Parse response data
      let data;
      try {
        if (xhr.getResponseHeader("Content-Type")?.startsWith("text/xml")) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(text, "text/xml");
          data = parseXmlToJson(doc);
        } else {
          data = JSON.parse(text);
        }
      } catch (e) {
        errorLog("Failed to parse response:", e);
        return text;
      }

      var templateId = elt.getAttribute("fp-template");
      log("Response received for request " + requestId + ": " + text);

      // Render template
      try {
        let rendered;
        if (templateId) {
          log("Rendering html to " + templateId + " based on htmx response");
          rendered = render({
            template: templateId,
            data: data,
            target: elt,
            returnHtml: true,
          });
        } else {
          if (!elt.id) {
            errorLog(
              "No template found. If the current element is a template, it must have an id.",
            );
            return text;
          }
          log("Rendering html to current element based on htmx response");
          var elementTemplateId = "#" + elt.id;
          translateCustomHTMXAttributes(elt);
          rendered = render({
            template: elementTemplateId,
            data: data,
            target: elt,
            returnHtml: true,
          });
        }

        if (rendered) {
          Debug.log(
            Debug.levels.DEBUG,
            "Template rendered successfully for request",
            requestId,
          );
          return rendered;
        }
        return text;
      } catch (error) {
        errorLog("Error rendering template:", error);
        return text;
      }
    },

    onEvent: function (name, evt) {
      if (evt.detail.handled) return;

      const target = evt.detail.elt;
      const requestId = evt.detail.requestId || generateRequestId();

      switch (name) {
        case "htmx:beforeRequest":
          evt.detail.requestId = requestId;
          evt.detail.xhr.requestId = requestId;
          handleFlowPlaterRequest(target, requestId, "start");
          break;

        case "htmx:beforeSwap":
          const info = processingElements.get(target);
          if (!info || info.requestId !== requestId) {
            evt.preventDefault();
            Debug.log(
              Debug.levels.DEBUG,
              "Prevented swap - request ID mismatch",
            );
            return;
          }
          break;

        case "htmx:afterSwap":
          handleFlowPlaterRequest(target, requestId, "cleanup");
          break;
      }
    },
  });

  // Cleanup handlers
  document.body.addEventListener("htmx:responseError", function (event) {
    handleFlowPlaterRequest(
      event.detail.elt,
      event.detail.requestId,
      "cleanup",
    );
  });

  function cleanupStaleProcessing() {
    const now = Date.now();
    const staleTimeout = 10000; // 10 seconds

    for (const [target, info] of processingElements.entries()) {
      if (now - info.timestamp > staleTimeout) {
        processingElements.delete(target);
        Debug.log(
          Debug.levels.DEBUG,
          "Cleaned up stale processing entry",
          target,
          info.requestId,
        );
      }
    }
  }

  setInterval(cleanupStaleProcessing, 10000);

  window.addEventListener("unload", function () {
    processingElements.clear();
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

        // Call subscribers for this specific event
        subscribers.get(event).forEach(({ callback, context }) => {
          callback.call(context, data);
        });

        // If data contains instanceName, also trigger instance-specific event
        if (data && data.instanceName) {
          const instanceEvent = `${data.instanceName}:${event}`;
          if (subscribers.has(instanceEvent)) {
            subscribers.get(instanceEvent).forEach(({ callback, context }) => {
              callback.call(context, data);
            });
          }
        }
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
      // Use Debug.debugMode directly - Debug module manages its own setting
      if (Debug.debugMode) {
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

    level: 3,
    debugMode: true,

    log: function (level, ...args) {
      // console.log("Debug.log function called!");
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
    try {
      var shouldAnimate =
        element.getAttribute("fp-animation") || _state.defaults.animation;
      if (shouldAnimate === "true") {
        var swap = element.getAttribute("hx-swap");
        if (!swap) {
          element.setAttribute("hx-swap", "innerHTML transition:true");
        } else {
          element.setAttribute("hx-swap", swap + " transition:true");
        }
      }
      return element;
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error in setupAnimation: ${error.message}`,
      );
      return element;
    }
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                   processUrlAffixes(element)                        */
  /* -------------------------------------------------------------------------- */

  function processUrlAffixes(element) {
    try {
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
            log("Original URL: " + originalUrl);

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
            log("Modified URL: " + modifiedUrl);

            if (modifiedUrl !== originalUrl) {
              log("Modification successful for", method, "on element", el);
            } else {
              errorLog("Modification failed for", method, "on element", el);
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
      return element;
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error in processUrlAffixes: ${error.message}`,
      );
      return element;
    }
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                      setupProxy(element)                            */
  /* -------------------------------------------------------------------------- */

  // * For each element with an fp-proxy attribute, use a proxy for the url
  //use const url = 'https://corsproxy.io/?' + encodeURIComponent([hx-get/post/put/patch/delete] attribute value)]);
  function setupProxy(element) {
    try {
      // Skip if already processed or if fp-proxy is false/not present
      if (
        element.hasAttribute("data-fp-proxy-processed") ||
        !element.hasAttribute("fp-proxy") ||
        element.getAttribute("fp-proxy") === "false"
      ) {
        return element;
      }

      // Get proxy URL
      const proxyUrl = element.getAttribute("fp-proxy").startsWith("http")
        ? element.getAttribute("fp-proxy")
        : "https://corsproxy.io/?";

      // Process htmx methods
      const methods = ["get", "post", "put", "patch", "delete"];
      methods.forEach(function (method) {
        if (element.hasAttribute("hx-" + method)) {
          const url = element.getAttribute("hx-" + method);
          element.setAttribute(
            "hx-" + method,
            proxyUrl + encodeURIComponent(url),
          );
        }
      });

      // Mark as processed
      element.setAttribute("data-fp-proxy-processed", "true");
      return element;
    } catch (error) {
      Debug.log(Debug.levels.ERROR, `Error in setupProxy: ${error.message}`);
      return element;
    }
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
    try {
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
      return element;
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error in translateCustomHTMXAttributes: ${error.message}`,
      );
      return element;
    }
  }

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                       customTags(element)                           */
  /* -------------------------------------------------------------------------- */

  // *** Default customTags - can be overridden via meta config in init() ***
  let customTagList = [{ tag: "fpselect", replaceWith: "select" }];
  let currentCustomTags = customTagList; // Use default list initially - override in init()

  function replaceCustomTags(element) {
    // Replace all custom tags
    currentCustomTags.forEach((tag) => {
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
    return element;
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
    try {
      if (element.hasAttribute("data-fp-preload-processed")) {
        return element;
      }

      if (element.hasAttribute("fp-preload")) {
        addPreloadListener(element);
        element.setAttribute("data-fp-preload-processed", "true");
      }

      return element;
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error in processPreload: ${error.message}`,
      );
      return element;
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
        name: "extension",
        process: defineExtension,
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
      {
        name: "preload",
        process: processPreload,
      },
      {
        name: "htmxProcess",
        process: (element) => {
          htmx.process(element);
          return element;
        },
      },
    ],

    FP_SELECTOR:
      "[fp-template], [fp-get], [fp-post], [fp-put], [fp-delete], [fp-patch]",

    process: function (element = document) {
      // Process the element itself if it matches
      if (element.matches && element.matches(this.FP_SELECTOR)) {
        this.run(element);
      }

      // Process all FlowPlater children
      const fpElements = element.querySelectorAll
        ? element.querySelectorAll(this.FP_SELECTOR)
        : [];
      fpElements.forEach((el) => this.run(el));
    },

    run: function (element) {
      this.processors.reduce((currentElement, processor, index) => {
        if (!currentElement) {
          Debug.log(
            Debug.levels.ERROR,
            `Element became undefined in ProcessingChain at processor index ${index}. Previous processor:`,
            this.processors[index - 1],
          );
          return; // Stop processing if element is undefined
        }
        try {
          return processor.process(currentElement);
        } catch (error) {
          Debug.log(
            Debug.levels.ERROR,
            `Error in processor ${processor.name}: ${error.message}`,
          );
          return currentElement; // Return the element even on error
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

      ProcessingChain.process(element);
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
      element.getAttribute("fp-animation") || _state.defaults.animation;
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
              // Replace all custom tags
              currentCustomTags.forEach((tag) => {
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
        // Remove this line - we don't want to remove the template element
        // templateElement.remove();
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
    onRender = _state.defaults.onRender,
    onRendered = _state.defaults.onRendered,
    instanceName,
    animate = _state.defaults.animation,
  }) {
    Performance.start("render:" + (instanceName || "anonymous"));

    EventSystem.publish("beforeRender", {
      instanceName,
      template,
      data,
      target,
      returnHtml,
    });

    /* -------------------------------------------------------------------------- */
    /*                                initial setup                               */
    /* -------------------------------------------------------------------------- */

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
        const errorMessage = `<div class="fp-error">Error rendering template: ${error.message}</div>`;
        Debug.log(
          Debug.levels.ERROR,
          `Failed to render template: ${error.message}`,
        );
        return errorMessage;
      } finally {
        elements.forEach(function (element) {
          onRendered.call(element);
        });

        EventSystem.publish("afterRender", {
          instanceName,
          template,
          data,
          target,
          elements,
          returnHtml,
        });

        log("Rendered instance: " + instanceName, template, data, target);
        Performance.end("render:" + (instanceName || "anonymous"));
      }
    } else {
      try {
        elements.forEach(function (element) {
          try {
            element.innerHTML = template(_state.instances[instanceName].proxy);
          } catch (error) {
            element.innerHTML = `<div class="fp-error">Error rendering template: ${error.message}</div>`;
            Debug.log(
              Debug.levels.ERROR,
              `Failed to render template: ${error.message}`,
            );
          }
        });
        return _state.instances[instanceName];
      } catch (error) {
        Debug.log(
          Debug.levels.ERROR,
          `Failed to render template: ${error.message}`,
        );
        throw error;
      } finally {
        elements.forEach(function (element) {
          onRendered.call(element);
        });

        EventSystem.publish("afterRender", {
          instanceName,
          template,
          data,
          target,
          elements,
          returnHtml,
        });

        log("Rendered instance: " + instanceName, template, data, target);
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

  // * Add hx-ext attribute
  function defineExtension(element) {
    try {
      // Check if the element already has the flowplater extension
      var currentExt = element.getAttribute("hx-ext") || "";
      if (!currentExt.includes("flowplater")) {
        // Add flowplater to hx-ext
        var newExt = currentExt ? currentExt + ", flowplater" : "flowplater";
        element.setAttribute("hx-ext", newExt);
        Debug.log(Debug.levels.INFO, "Added hx-ext attribute to " + element.id);
      }
      return element;
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Error in defineExtension: ${error.message}`,
      );
      return element;
    }
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
      function resolveValue(token, dataContext, currentContext) {
        // Handle string literals
        if (
          (token.startsWith('"') && token.endsWith('"')) ||
          (token.startsWith("'") && token.endsWith("'"))
        ) {
          return token.slice(1, -1);
        }

        // Handle numeric literals
        if (!isNaN(token)) {
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
            if (value && typeof value === "object" && part in value) {
              value = value[part];
            } else {
              return undefined;
            }
          }
          return value;
        }

        // Handle nested object paths
        const path = token.split(".");
        let value = dataContext;

        for (const part of path) {
          if (value && typeof value === "object" && part in value) {
            value = value[part];
          } else {
            return undefined;
          }
        }

        return value;
      }

      try {
        // Parse expression
        const expression = expressionString.trim();
        const [leftToken, operator, rightToken] = expression.split(
          /\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/,
        );

        if (!leftToken || !operator || !rightToken) {
          throw new TemplateError(`Invalid expression format: ${expression}`);
        }

        // Resolve values
        const leftValue = resolveValue(leftToken, options.data.root, this);
        const rightValue = resolveValue(rightToken, options.data.root, this);

        // Log resolved values for debugging
        Debug.log(Debug.levels.INFO, "Evaluating expression:", {
          raw: expression,
          leftValue,
          operator,
          rightValue,
        });

        // Evaluate the condition first
        const result = compare(leftValue, operator, rightValue);

        // Now execute the appropriate branch, letting any errors propagate up
        if (result) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      } catch (error) {
        // Only catch and handle errors related to the condition evaluation itself
        if (error instanceof TemplateError) {
          Debug.log(
            Debug.levels.ERROR,
            "Error evaluating if condition:",
            error,
          );
          throw error; // Re-throw to maintain error state
        }
        Debug.log(Debug.levels.ERROR, "Error in if helper:", error);
        throw error; // Re-throw other errors to maintain error state
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

      var bunny = `
        &nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>
        ପ(˶•-•˶)ଓ ♡<br>
        &nbsp;&nbsp;&nbsp;/づ  づ
      `;

      var bunnyFlipped = `
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>
        &nbsp;&nbsp;ପ(˶•-•˶)ଓ<br>
        &nbsp;&nbsp;♡じ  じ\\
      `;

      // Create wrapper with unique class for animation targeting
      var wrapper = `<span class="fp-bunny" data-bunny-state="normal">${bunny}</span>`;

      // Add animation script if not already present
      if (!window.bunnyAnimation) {
        window.bunnyAnimation = function () {
          if (window.bunnyAnimationIntervalId) {
            clearInterval(window.bunnyAnimationIntervalId);
          }
          window.bunnyAnimationIntervalId = setInterval(function () {
            document.querySelectorAll(".fp-bunny").forEach(function (element) {
              const currentState = element.getAttribute("data-bunny-state");
              if (currentState === "normal") {
                element.innerHTML = bunnyFlipped;
                element.setAttribute("data-bunny-state", "flipped");
              } else {
                element.innerHTML = bunny;
                element.setAttribute("data-bunny-state", "normal");
              }
            });
          }, 1000);
        };

        // Start animation immediately
        window.bunnyAnimation();
      }

      return new SafeString(wrapper);
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
    // Convert string numbers to actual numbers for comparison
    if (!isNaN(left)) left = Number(left);
    if (!isNaN(right)) right = Number(right);

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
        if (part === "") continue;
        if (
          current === undefined ||
          current === null ||
          !current.hasOwnProperty(part)
        ) {
          return undefined;
        }
        current = current[part];
      }
      return current;
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
        onRender = _state.defaults.onRender,
        onRendered = _state.defaults.onRendered,
        animate = _state.defaults.animation,
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
        let newData = value !== undefined ? value : path;

        // If path is provided, set at path location
        if (path && value !== undefined) {
          let target = this.data;
          const pathParts = path.split(/[\.\[\]'"]/);
          for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i];
            if (part === "") continue;
            if (!target[part]) target[part] = {};
            target = target[part];
          }
          const lastPart = pathParts[pathParts.length - 1];
          if (lastPart !== "") {
            target[lastPart] = value;
          }
        } else {
          // If no path or null/undefined path, replace root data
          this.data = newData;
        }

        // Trigger re-render after update
        this.elements.forEach((element) => {
          element.innerHTML = this.template(this.data);
        });
      },
      merge: function (path, value) {
        let newData = value !== undefined ? value : path;

        // Deep merge function
        function deepMerge(target, source) {
          for (const key in source) {
            if (source.hasOwnProperty(key)) {
              if (Array.isArray(source[key]) && Array.isArray(target[key])) {
                // Merge arrays by matching 'id' field if present
                const targetMap = new Map(
                  target[key].map((item) => [item.id, item]),
                );
                source[key].forEach((sourceItem) => {
                  if (sourceItem.id && targetMap.has(sourceItem.id)) {
                    // Update existing item
                    const targetItem = targetMap.get(sourceItem.id);
                    deepMerge(targetItem, sourceItem);
                  } else {
                    // Add new item
                    target[key].push(sourceItem);
                  }
                });
              } else if (
                source[key] &&
                typeof source[key] === "object" &&
                !Array.isArray(source[key])
              ) {
                target[key] = target[key] || {};
                deepMerge(target[key], source[key]);
              } else {
                target[key] = source[key];
              }
            }
          }
          return target;
        }

        // If path is provided, merge at path location
        if (path && value !== undefined) {
          let target = this.data;
          const pathParts = path.split(/[\.\[\]'"]/);
          for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i];
            if (part === "") continue;
            if (!target[part]) target[part] = {};
            target = target[part];
          }
          const lastPart = pathParts[pathParts.length - 1];
          if (lastPart !== "") {
            if (!target[lastPart]) {
              target[lastPart] = Array.isArray(value) ? [] : {};
            }
            if (Array.isArray(value)) {
              // Ensure target is an array
              if (!Array.isArray(target[lastPart])) {
                target[lastPart] = [];
              }
              // Merge arrays
              const targetArray = target[lastPart];
              value.forEach((item) => {
                if (item.id) {
                  const existingIndex = targetArray.findIndex(
                    (existing) => existing.id === item.id,
                  );
                  if (existingIndex >= 0) {
                    deepMerge(targetArray[existingIndex], item);
                  } else {
                    targetArray.push(item);
                  }
                } else {
                  targetArray.push(item);
                }
              });
            } else if (typeof value === "object") {
              deepMerge(target[lastPart], value);
            } else {
              target[lastPart] = value;
            }
          }
        } else {
          // If no path or null/undefined path, merge with root data
          deepMerge(this.data, newData);
        }

        // Trigger re-render after update
        this.elements.forEach((element) => {
          element.innerHTML = this.template(this.data);
        });
      },
      updateWhere: function (arrayPath, criteria, updates) {
        let array = this.get(arrayPath);
        if (!Array.isArray(array)) {
          console.error("Target at path is not an array:", array);
          return;
        }

        array.forEach((item) => {
          // Check if item matches all criteria
          const matches = Object.entries(criteria).every(
            ([key, value]) => item[key] === value,
          );

          if (matches) {
            // Update the matching item
            Object.assign(item, updates);
          }
        });

        // Trigger re-render after update
        this.elements.forEach((element) => {
          element.innerHTML = this.template(this.data);
        });
      },
      push: function (arrayPath, value) {
        let array;
        if (arrayPath) {
          array = _resolvePath.call({ data: this.data }, arrayPath);
          if (!array) {
            console.warn(`Array path "${arrayPath}" not found.`);
            return;
          }
        } else {
          array = this.data;
        }

        if (Array.isArray(array)) {
          array.push(value);
          // Trigger re-render after update
          this.elements.forEach((element) => {
            element.innerHTML = this.template(this.data);
          });
        } else {
          console.error("Target at path is not an array:", array);
        }
      },
      remove: function (arrayPath, index) {
        let array;
        if (arrayPath) {
          array = _resolvePath.call({ data: this.data }, arrayPath);
          if (!array) {
            console.warn(`Array path "${arrayPath}" not found.`);
            return;
          }
        } else {
          array = this.data;
        }

        if (Array.isArray(array)) {
          array.splice(index, 1);
          // Trigger re-render after update
          this.elements.forEach((element) => {
            element.innerHTML = this.template(this.data);
          });
        } else {
          console.error("Target at path is not an array:", array);
        }
      },
      get: function (path) {
        if (!path) return this.data; // Handle empty path, return root data
        return _resolvePath.call({ data: this.data }, path); // Use helper, call with context
      },
      on: function (eventName, callback) {
        // Create unique event name for this instance
        const instanceEvent = `${instanceName}:${eventName}`;
        EventSystem.subscribe(instanceEvent, callback);
        return this; // Enable chaining
      },
      off: function (eventName, callback) {
        const instanceEvent = `${instanceName}:${eventName}`;
        EventSystem.unsubscribe(instanceEvent, callback);
        return this; // Enable chaining
      },
      emit: function (eventName, data) {
        const instanceEvent = `${instanceName}:${eventName}`;
        EventSystem.publish(instanceEvent, data);
        return this; // Enable chaining
      },
    };
  };

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                          Public API                                 */
  /* -------------------------------------------------------------------------- */

  // Create the base FlowPlater object
  const FlowPlaterObj = {
    options: function (options) {
      // Merge provided options -  ADJUST THIS LATER
      // for (var key in options) {
      //   _fpConfig[key] = options[key]; // Use _fpConfig here - REMOVE THIS
      // }
      return this;
    },

    compileTemplate: compileTemplate,
    render: render,
    refresh: refresh,
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
      // console.log("Debug level set via debug() function:", Debug.level);
      return this;
    },
    templateCache: _state.templateCache,
    process: process,
    registerHelper: registerHelper,
    unregisterHelper: unregisterHelper,
    SafeString: SafeString,
    escapeExpression: escapeExpression,

    init: function () {
      Performance.start("init");
      Debug.log(Debug.levels.INFO, "Initializing FlowPlater...");

      // Process any templates on the page
      const templates = document.querySelectorAll("[fp-template]");
      templates.forEach((template) => {
        const templateId = template.getAttribute("fp-template");
        if (templateId) {
          // Compile the template
          compileTemplate("#" + template.id);
          // Render with empty data if no data is provided
          render({
            template: "#" + template.id,
            data: {},
            target: template,
          });
        }
      });

      // Load configuration from meta tag if present
      const metaConfig = document.querySelector('meta[name="fp-config"]');
      if (metaConfig) {
        try {
          const config = JSON.parse(metaConfig.content);
          // *** Apply meta config overrides to modules ***
          if (config.debugLevel !== undefined) {
            Debug.level = config.debugLevel;
          }
          if (config.debug !== undefined) {
            Debug.debugMode = config.debug;
          }
          if (config.fpSelector !== undefined) {
            ProcessingChain.FP_SELECTOR = config.fpSelector; // Override FP_SELECTOR
          }
        } catch (e) {
          console.error("Error parsing fp-config meta tag: " + e); //error
        }
      }

      // Re-run process to apply potentially updated FP_SELECTOR
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
