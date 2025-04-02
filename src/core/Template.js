import { Debug, log, errorLog, TemplateError } from "./Debug";
import { EventSystem } from "./EventSystem";
import { _state } from "./State";
import { Performance } from "../utils/Performance";
import { InstanceManager } from "./InstanceManager";

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
      // Check if stored data is HTML
      if (persistedData.isHtml) {
        // Get swap specification from element
        const swapSpec = {
          swapStyle:
            elements[0].getAttribute("hx-swap")?.split(" ")[0] || "innerHTML",
          swapDelay: 0,
          settleDelay: 0,
          transition:
            elements[0].getAttribute("hx-swap")?.includes("transition:true") ||
            false,
        };

        // Use htmx.swap with proper swap specification
        if (returnHtml) {
          return persistedData.data;
        }
        elements.forEach((element) => {
          htmx.swap(element, persistedData.data, swapSpec);
        });
        return _state.instances[instanceName];
      }
      // Otherwise merge with current data, prioritizing new data
      data = { ...persistedData, ...data };
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

    // Create or update instance using InstanceManager
    const instance = InstanceManager.getOrCreateInstance(elements[0], data);
    if (instance) {
      instance.elements = new Set(elements);
      instance.template = compiledTemplate;
      instance.templateId = elements[0].getAttribute("fp-template") || template;
      instance.proxy = proxy;
      instance.data = data;

      // Save initial instance data to storage
      if (_state.config?.storage?.enabled) {
        const storageId = instanceName.replace("#", "");
        saveToLocalStorage(storageId, data, "instance");
      }
    }
  }

  const instance = _state.instances[instanceName];
  log("Proxy created: ", instance.proxy);

  /* -------------------------------------------------------------------------- */
  /*                               Render template                              */
  /* -------------------------------------------------------------------------- */

  try {
    if (returnHtml) {
      return compiledTemplate(target);
    }

    elements.forEach((element) => {
      updateDOM(element, compiledTemplate(target), animate, instance);
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
