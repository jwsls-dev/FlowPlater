import { Debug, log, errorLog, TemplateError } from "./Debug";
import { EventSystem } from "./EventSystem";
import { _state } from "./State";
import { Performance } from "../utils/Performance";
import { memoize } from "../utils/Memoize";
import { instanceMethods } from "./InstanceMethods";
import { currentCustomTags } from "./ReplaceCustomTags";
import { updateDOM } from "../utils/UpdateDom";
import { loadFromLocalStorage } from "../utils/LocalStorage";

export function compileTemplate(templateId, recompile = false) {
  if (!recompile) {
    return memoizedCompile(templateId);
  }

  // For recompile=true:
  // 1. Clear template cache
  delete _state.templateCache[templateId];
  // 2. Compile without memoization
  const compiledTemplate = memoizedCompile.original(templateId);
  // 3. Update the memoized cache with the new template
  memoizedCompile.cache.set(JSON.stringify([templateId]), compiledTemplate);

  return compiledTemplate;
}

export const memoizedCompile = memoize(function (templateId) {
  // if templateId is empty or "self", use the current element
  Performance.start("compile:" + templateId);

  // Add # prefix if templateId doesn't start with it
  const selector = templateId.startsWith("#") ? templateId : "#" + templateId;
  var templateElement = document.querySelector(selector);

  log("Trying to compile template: " + templateId);

  if (!templateElement) {
    errorLog("Template not found: " + templateId);
    Performance.end("compile:" + templateId);
    return null;
  }

  // Check if template needs compilation
  if (
    !_state.templateCache[templateId] ||
    (templateElement.hasAttribute("fp-dynamic") &&
      templateElement.getAttribute("fp-dynamic") !== "false")
  ) {
    log("compiling template: " + templateId);

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
          result += child.textContent;
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.hasAttribute("fp")) {
            // Process as a Handlebars helper
            const helperName = child.tagName.toLowerCase();
            const args = child
              .getAttribute("fp")
              .split(" ")
              .map((arg) => arg.replace(/&quot;/g, '"'))
              .join(" ");

            const innerContent = processNode(child);

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
            const innerContent = processNode(child);
            result += `{{${child.tagName.toLowerCase()}}}${innerContent}`;
          } else if (
            child.tagName === "template" ||
            child.tagName === "fptemplate" ||
            child.hasAttribute("fp-template")
          ) {
            result += child.outerHTML;
          } else {
            const childContent = processNode(child);
            const startTag = constructTagWithAttributes(child);
            let endTagName = child.tagName.toLowerCase();
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
    log("Compiling Handlebars template: " + handlebarsTemplate);

    try {
      const compiledTemplate = Handlebars.compile(handlebarsTemplate);

      // Check cache size limit before adding new template
      const cacheSize = _state.config?.templates?.cacheSize || 100; // Default to 100 if not configured
      if (Object.keys(_state.templateCache).length >= cacheSize) {
        // Remove oldest template
        const oldestKey = Object.keys(_state.templateCache)[0];
        delete _state.templateCache[oldestKey];
        log(`Cache limit reached. Removed template: ${oldestKey}`);
      }

      // Add new template to cache
      _state.templateCache[templateId] = compiledTemplate;
      Performance.end("compile:" + templateId);
      return compiledTemplate;
    } catch (e) {
      errorLog(
        "Template not valid: " + handlebarsTemplate + " | Error: " + e.message,
      );
      Performance.end("compile:" + templateId);
      return null;
    }
  }
  Performance.end("compile:" + templateId);
  return _state.templateCache[templateId];
});

export function render({
  template,
  data,
  target,
  returnHtml = false,
  instanceName,
  animate = _state.defaults.animation,
  recompile = false,
}) {
  Performance.start("render:" + (instanceName || "anonymous"));

  EventSystem.publish("beforeRender", {
    instanceName,
    template,
    data,
    target,
    returnHtml,
    recompile,
  });

  /* -------------------------------------------------------------------------- */
  /*                                initial setup                               */
  /* -------------------------------------------------------------------------- */

  var elements;

  // Get the target elements
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

  if (elements.length === undefined) {
    elements = [elements];
  }

  // Get the instance name
  if (instanceName) {
    instanceName = instanceName;
  } else if (elements[0].hasAttribute("fp-instance")) {
    instanceName = elements[0].getAttribute("fp-instance");
  } else if (elements[0].id) {
    instanceName = elements[0].id;
  } else {
    instanceName = _state.length;
  }

  log("Rendering instance: " + instanceName, template, data, target);

  /* -------------------------------------------------------------------------- */
  /*                              Compile template                              */
  /* -------------------------------------------------------------------------- */

  var compiledTemplate = compileTemplate(template, recompile);
  _state.length++;

  if (!compiledTemplate) {
    errorLog("Template not found: " + template);
    return;
  }

  if (elements.length === 0) {
    errorLog("Target not found: " + target);
    return;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Proxy creation                               */
  /* -------------------------------------------------------------------------- */

  if (
    !_state.instances[instanceName] ||
    _state.instances[instanceName].data !== data
  ) {
    // Load persisted data if available
    const persistedData = loadFromLocalStorage(instanceName);
    if (persistedData) {
      data = { ...data, ...persistedData };
    }

    var proxy = createDeepProxy(data, (target) => {
      // Use WeakRef or maintain a Set of weak references to elements
      const activeElements = elements.filter((el) =>
        document.body.contains(el),
      );
      activeElements.forEach((element) => {
        updateDOM(element, compiledTemplate(target));
      });
    });

    // Store the proxy and elements in instances for future reference
    _state.instances[instanceName] = {
      // Use Set instead of WeakSet to allow iteration
      elements: new Set(elements),
      template: compiledTemplate,
      templateId: elements[0].getAttribute("fp-template") || template,
      proxy: proxy,
      data: data,
      cleanup: () => {
        this.elements.clear();
      },
      ...instanceMethods(instanceName),
    };
  }

  function resolveAttributeBoolean(attribute) {
    if (attribute === "") return true;
    if (attribute === "false") return false;
    return true;
  }

  const instance = _state.instances[instanceName];
  log("Proxy created: ", instance.proxy);

  /* -------------------------------------------------------------------------- */
  /*                               Render template                              */
  /* -------------------------------------------------------------------------- */

  try {
    if (returnHtml) {
      var html = instance.template(instance.proxy);
      return html;
    }

    elements.forEach(function (element) {
      try {
        updateDOM(element, instance.template(instance.proxy), instance.animate);
      } catch (error) {
        element.innerHTML = `<div class="fp-error">Error rendering template: ${error.message}</div>`;
        errorLog(`Failed to render template: ${error.message}`);
      }
    });

    return instance;
  } catch (error) {
    if (!(error instanceof TemplateError)) {
      errorLog(`Failed to render template: ${error.message}`);
    }
    throw error;
  } finally {
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
      handler(target);
      return true;
    },
    deleteProperty(target, property) {
      delete target[property];
      handler(target);
      return true;
    },
  };

  return new Proxy(target, proxyHandler);
}
