import { Debug, log, errorLog, TemplateError } from "./Debug";
import { EventSystem } from "./EventSystem";
import { _state } from "./State";
import { Performance } from "../utils/Performance";
import { instanceMethods } from "./InstanceMethods";
import { currentCustomTags } from "./ReplaceCustomTags";
import { updateDOM } from "../utils/UpdateDom";
import { loadFromLocalStorage } from "../utils/LocalStorage";
import { saveToLocalStorage } from "../utils/LocalStorage";
import { compileTemplate, memoizedCompile } from "./TemplateCompiler";

export { compileTemplate, memoizedCompile };

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

  // Handle empty or "self" template
  if (!template || template === "self") {
    const targetElement =
      typeof target === "string" ? document.querySelector(target) : target;
    template = "#" + targetElement.id;
  }

  // Normalize target to array
  let elements = [];
  if (target instanceof NodeList) {
    elements = Array.from(target);
  } else if (typeof target === "string") {
    elements = Array.from(document.querySelectorAll(target));
  } else if (target instanceof Element) {
    elements = [target];
  }

  if (elements.length === 0) {
    errorLog("No target elements found");
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
    const persistedData = loadFromLocalStorage(instanceName, "instance");
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

    // Save initial instance data to storage
    if (_state.config?.storage?.enabled) {
      const storageId = instanceName.replace("#", "");
      saveToLocalStorage(storageId, data, "instance");
    }
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
