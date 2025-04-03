import { RequestHandler } from "./RequestHandler";
import { Debug, errorLog, log } from "./Debug";
import { parseXmlToJson } from "../utils/ParseXmlToJson";
import { _state } from "./State";
import {
  setupFormSubmitHandlers,
  cleanupFormChangeListeners,
  getAllRelevantForms,
  restoreFormStates,
} from "../utils/FormPersistence";
import { saveToLocalStorage } from "../utils/LocalStorage";
import PluginManager from "./PluginManager";
import { InstanceManager } from "./InstanceManager";
import { EventSystem } from "./EventSystem";

// function isHTML(string) {
//   return Array.from(
//     new DOMParser().parseFromString(string, "text/html").body.childNodes,
//   ).some(({ nodeType }) => nodeType == 1);
// }

export function defineHtmxExtension() {
  htmx.defineExtension("flowplater", {
    transformResponse: function (text, xhr, elt) {
      const isHtml = xhr
        .getResponseHeader("Content-Type")
        ?.startsWith("text/html");

      const requestId = xhr.requestId;
      const currentInfo = RequestHandler.processingElements.get(elt);

      if (!currentInfo || currentInfo.requestId !== requestId) {
        return text;
      }

      if (isHtml) {
        if (_state.config?.storage?.enabled) {
          const instanceName = elt.getAttribute("fp-instance") || elt.id;
          if (instanceName) {
            saveToLocalStorage(
              instanceName,
              {
                data: text,
                isHtml: true,
                timestamp: Date.now(),
              },
              "instance",
            );
          }
        }
        return text;
      }

      let newData;
      try {
        if (xhr.getResponseHeader("Content-Type")?.startsWith("text/xml")) {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(text, "text/xml");
          newData = parseXmlToJson(xmlDoc);
        } else {
          newData = JSON.parse(text);
        }
      } catch (error) {
        errorLog("Failed to parse response:", error);
        return text;
      }
      if (!newData) return text;

      const instance = InstanceManager.getOrCreateInstance(elt);

      if (instance) {
        const instanceName = instance.instanceName;

        // Use setData for Reconciliation
        Debug.log(
          Debug.levels.DEBUG,
          `[transformResponse] Calling instance.setData for ${instanceName} with new data.`,
        );
        instance.setData(newData); // This handles delete/assign and triggers proxy handler (debounced)

        // Execute Hooks/Events - REMOVED - Handled by proxy debounce
        /*
        PluginManager.executeHook("updateData", instance, {
          data: instance.data,
          changes: null,
          source: "htmx",
        });
        EventSystem.publish("updateData", {
          instanceName,
          data: instance.data,
          changes: null,
          source: "htmx",
        });
        */

        // Signal completion by returning empty string
        Debug.log(
          Debug.levels.DEBUG,
          `[transformResponse] setData called for request ${requestId} on elt ${elt.id}. Returning empty string.`,
        );
        return "";
      }
      return text;
    },

    handleSwap: function (swapStyle, target, fragment, settleInfo) {
      const isEmptySignal = fragment.textContent?.trim() === "";

      if (isEmptySignal) {
        Debug.log(
          Debug.levels.DEBUG,
          `[handleSwap] Detected empty string signal for target ${
            target.id || "[no id]"
          }. Preventing htmx default swap.`,
        );
        return true;
      } else {
        Debug.log(
          Debug.levels.DEBUG,
          `[handleSwap] Fragment is not empty signal for target ${
            target.id || "[no id]"
          }. Letting htmx swap.`,
        );
        return false;
      }
    },

    onEvent: function (name, evt) {
      const triggeringElt = evt.detail.elt;
      if (!triggeringElt) {
        Debug.log(
          Debug.levels.WARN,
          `[onEvent] Event ${name} has no triggering element (evt.detail.elt). Skipping.`,
        );
        return;
      }

      const requestId =
        evt.detail.requestId || RequestHandler.generateRequestId();
      if (!evt.detail.requestId) evt.detail.requestId = requestId;

      switch (name) {
        case "htmx:beforeRequest":
          if (!evt.detail.xhr.requestId) {
            evt.detail.xhr.requestId = requestId;
          }
          RequestHandler.handleRequest(triggeringElt, requestId, "start");
          if (triggeringElt.hasAttribute("fp-template")) {
            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
            if (instance) {
              PluginManager.executeHook("beforeRequest", instance, evt);
            }
          }
          break;

        case "htmx:beforeSwap":
          executeHtmxHook("beforeSwap", triggeringElt, evt);
          break;

        case "htmx:afterSwap":
          executeHtmxHook("afterSwap", triggeringElt, evt);
          const formsToCleanup = getAllRelevantForms(triggeringElt);
          formsToCleanup.forEach(cleanupFormChangeListeners);
          break;

        case "htmx:afterRequest":
          if (triggeringElt.hasAttribute("fp-template")) {
            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
            if (instance) {
              PluginManager.executeHook("afterRequest", instance, evt);
              EventSystem.publish("request-end", {
                instanceName: instance.instanceName,
                ...evt.detail,
              });
            }
          }
          RequestHandler.handleRequest(triggeringElt, requestId, "cleanup");
          restoreFormIfNecessary(triggeringElt, true, evt);
          break;

        case "htmx:afterSettle":
          executeHtmxHook("afterSettle", triggeringElt, evt);
          Debug.log(
            Debug.levels.DEBUG,
            `Setting up form handlers after DOM settle for target: ${
              triggeringElt.id || "unknown"
            }, ` +
              `has fp-template: ${triggeringElt.hasAttribute(
                "fp-template",
              )}, ` +
              `parent form: ${triggeringElt.closest("form")?.id || "none"}`,
          );
          setupFormSubmitHandlers(triggeringElt);
          break;
      }
    },
  });
}

function executeHtmxHook(hookName, target, event) {
  if (target.hasAttribute("fp-instance") || target.hasAttribute("id")) {
    const instance = InstanceManager.getOrCreateInstance(target);
    if (instance) {
      PluginManager.executeHook(hookName, instance, event?.detail);
    }
  }
}

/**
 * Helper function to restore form states if necessary
 * @param {HTMLElement} target - The target element
 * @param {boolean} [checkFailed=true] - Whether to check if the request failed
 * @param {Object} [event] - The event object containing failure status
 */
function restoreFormIfNecessary(target, checkFailed = true, event) {
  if (RequestHandler.isRestoringFormStates) {
    Debug.log(Debug.levels.DEBUG, "Already restoring form states, skipping");
    return;
  }

  if (checkFailed && event?.detail?.failed) {
    return;
  }

  RequestHandler.isRestoringFormStates = true;
  restoreFormStates(target);
  RequestHandler.isRestoringFormStates = false;
}
