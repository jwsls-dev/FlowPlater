import { RequestHandler } from "./RequestHandler";
import { Debug } from "./Debug";
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
          Debug.error("Failed to parse XML response:", error);
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
        Debug.debug(
          `[transformResponse] No instance found for elt ${elt.id}. Skipping transformations.`,
        );
      }

      const requestId = xhr.requestId;

      // Mark this request as processed regardless of outcome
      // This ensures cleanup will work properly
      RequestHandler.handleRequest(elt, requestId, "process");

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
        Debug.error("Failed to parse JSON response:", error);
        return processedText;
      }

      if (!newData) return processedText;

      if (instance) {
        const instanceName = instance.instanceName;
        Debug.debug(`[transformResponse] Setting data for ${instanceName}`);

        try {
          // Mark this request as processed
          RequestHandler.handleRequest(elt, requestId, "process");

          // Flag that this instance is getting updated directly via HTMX
          instance._htmxUpdateInProgress = true;

          // Set the data which triggers updates
          instance.setData(newData);

          // If this instance is in a group but the group is currently updating,
          // we need to make sure this instance gets updated
          if (instance.groupName) {
            const group = _state.groups[instance.groupName];
            if (group && group._isEvaluating) {
              // Force immediate update of this instance with a small delay
              // to avoid conflicts with any currently executing group updates
              Promise.resolve().then(async () => {
                Debug.debug(
                  `[transformResponse] Forcing update for ${instanceName}`,
                );
                await instance._updateDOM();
                Debug.debug(
                  `[transformResponse] Forced update completed for ${instanceName}`,
                );
                instance._htmxUpdateInProgress = false;
              });
            } else {
              // Not being updated by group, clear the flag
              instance._htmxUpdateInProgress = false;
            }
          } else {
            // Not in a group, clear the flag
            instance._htmxUpdateInProgress = false;
          }

          // Return empty string to prevent HTMX default swap
          return "";
        } catch (error) {
          Debug.error(`[transformResponse] Error: ${error.message}`);
          instance._htmxUpdateInProgress = false;
          return processedText;
        }
      }
      return processedText;
    },

    handleSwap: function (swapStyle, target, fragment, settleInfo) {
      const isEmptySignal = fragment.textContent?.trim() === "";

      if (isEmptySignal) {
        Debug.debug(
          `[handleSwap] Detected empty string signal for target ${
            target.id || "[no id]"
          }. Preventing htmx default swap.`,
        );
        return true;
      } else {
        Debug.debug(
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
        Debug.warn(
          `[onEvent] Event ${name} has no triggering element (evt.detail.elt). Skipping.`,
        );
        return;
      }

      const requestId =
        evt.detail.requestId || RequestHandler.generateRequestId();
      if (!evt.detail.requestId) evt.detail.requestId = requestId;

      switch (name) {
        case "htmx:confirm":
          if (triggeringElt.hasAttribute("fp-template")) {
            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
            // Apply plugin transformations to the confirm event
            evt = PluginManager.applyTransformations(
              instance || null,
              evt,
              "confirm",
              "json",
            );
          }
          break;

        case "htmx:configRequest":
          // Apply transformations regardless of fp-template attribute
          const instance = InstanceManager.getOrCreateInstance(triggeringElt);
          evt = PluginManager.applyTransformations(
            instance || null,
            evt,
            "configRequest",
            "json",
          );
          break;

        case "htmx:beforeRequest":
          if (!evt.detail.xhr.requestId) {
            evt.detail.xhr.requestId = requestId;
          }
          RequestHandler.handleRequest(triggeringElt, requestId, "start");

          // Execute hooks if it's a template element
          if (triggeringElt.hasAttribute("fp-template")) {
            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
            PluginManager.executeHook("beforeRequest", instance || null, evt);
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
          Debug.debug(
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
    Debug.debug("Already restoring form states, skipping");
    return;
  }

  if (checkFailed && event?.detail?.failed) {
    return;
  }

  FormStateManager.restoreFormStates(target);
}
