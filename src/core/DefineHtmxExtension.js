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
import { FormStateManager } from "../utils/FormStateManager";

// function isHTML(string) {
//   return Array.from(
//     new DOMParser().parseFromString(string, "text/html").body.childNodes,
//   ).some(({ nodeType }) => nodeType == 1);
// }

export function defineHtmxExtension() {
  htmx.defineExtension("flowplater", {
    transformResponse: function (text, xhr, elt) {
      // Get the instance first to apply transformations
      const instance = InstanceManager.getOrCreateInstance(elt);

      // First, check if the data is XML and transform it to JSON if needed
      const contentType = xhr.getResponseHeader("Content-Type") || "";
      const isXml = contentType.startsWith("text/xml");
      const isHtml = contentType.startsWith("text/html");

      let processedText = text;
      let isJson = false;

      if (isXml) {
        try {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(text, "text/xml");
          processedText = JSON.stringify(parseXmlToJson(xmlDoc));
          isJson = true;
        } catch (error) {
          errorLog("Failed to parse XML response:", error);
          // Keep the original text if XML parsing fails
        }
      } else if (!isHtml) {
        // If not HTML and not XML, assume it's JSON
        isJson = true;
      }

      // Determine the dataType for transformations
      const dataType = isHtml ? "html" : "json";

      // Apply plugin transformations to the response text
      if (instance) {
        processedText = PluginManager.applyTransformations(
          instance,
          processedText,
          "transformResponse",
          dataType,
        );
      } else {
        Debug.log(
          Debug.levels.DEBUG,
          `[transformResponse] No instance found for elt ${elt.id}. Skipping transformations.`,
        );
      }

      const requestId = xhr.requestId;
      const currentInfo = RequestHandler.processingElements.get(elt);

      if (!currentInfo || currentInfo.requestId !== requestId) {
        return processedText;
      }

      // If the transformed data is HTML, handle it accordingly
      if (!isJson) {
        if (_state.config?.storage?.enabled) {
          const instanceName = instance
            ? instance.instanceName
            : elt.getAttribute("fp-instance") || elt.id;
          if (instanceName) {
            saveToLocalStorage(
              instanceName,
              {
                data: processedText,
                isHtml: true,
                timestamp: Date.now(),
              },
              "instance",
            );
          }
        }
        return processedText;
      }

      // Process JSON data
      let newData;
      try {
        newData = JSON.parse(processedText);
      } catch (error) {
        errorLog("Failed to parse JSON response:", error);
        return processedText;
      }

      if (!newData) return processedText;

      if (instance) {
        const instanceName = instance.instanceName;
        Debug.log(
          Debug.levels.DEBUG,
          `[transformResponse] Calling instance.setData for ${instanceName} with new data.`,
        );

        // Store the raw data in the instance
        instance.setData(newData);
        Debug.log(
          Debug.levels.DEBUG,
          `[transformResponse] setData called for request ${requestId} on elt ${elt.id}. Returning empty string.`,
        );
        return "";
      }
      return processedText;
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
  if (FormStateManager.isRestoringFormStates) {
    Debug.log(Debug.levels.DEBUG, "Already restoring form states, skipping");
    return;
  }

  if (checkFailed && event?.detail?.failed) {
    return;
  }

  FormStateManager.restoreFormStates(target);
}
