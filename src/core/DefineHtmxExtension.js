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
import { PluginManager } from "./PluginManager";
import { GroupManager } from "./GroupManager";
import { InstanceManager } from "./InstanceManager";
import { EventSystem } from "./EventSystem";
import { FormStateManager } from "../utils/FormStateManager";
import { AttributeMatcher } from "../utils/AttributeMatcher";
import { ConfigManager } from "./ConfigManager";

// function isHTML(string) {
//   return Array.from(
//     new DOMParser().parseFromString(string, "text/html").body.childNodes,
//   ).some(({ nodeType }) => nodeType == 1);
// }

export function defineHtmxExtension() {
  htmx.defineExtension("flowplater", {
    transformResponse: async function (text, xhr, elt) {
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

      // Get the instance first to apply transformations
      const instance = InstanceManager.getOrCreateInstance(elt);

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

        // Update isJson flag based on transformed data type
        isJson =
          typeof processedText === "object" ||
          (typeof processedText === "string" &&
            (() => {
              try {
                JSON.parse(processedText);
                return true;
              } catch {
                return false;
              }
            })());
        Debug.debug(`[transformResponse] isJson: ${isJson}`);
      } else {
        Debug.debug(
          `[transformResponse] No instance found for elt ${elt.id}. Skipping transformations.`,
        );
      }

      Debug.debug(`[transformResponse] Processed text: ${processedText}`);

      const requestId = xhr.requestId;

      const currentInfo = RequestHandler.processingElements.get(elt);

      if (!currentInfo || currentInfo.requestId !== requestId) {
        return processedText;
      }

      if (isJson) {
        Debug.debug(`[transformResponse] Processed text is JSON`);

        if (instance) {
          const instanceName = instance.instanceName;
          Debug.debug(`[transformResponse] Setting data for ${instanceName}`);

          try {
            // Mark this request as processed
            RequestHandler.handleRequest(elt, requestId, "process");

            // Flag that this instance is getting updated directly via HTMX
            instance._htmxUpdateInProgress = true;

            // Set the data which triggers updates via proxy
            let jsonData = processedText;
            if (typeof processedText === "string") {
              jsonData = JSON.parse(processedText);
            }
            instance.setData(jsonData);

            // Clear the flag
            instance._htmxUpdateInProgress = false;

            // Return empty string to prevent HTMX default swap
            return ""; // Return empty string instead of "DO_NOT_SWAP"
          } catch (error) {
            Debug.error(`[transformResponse] Error: ${error.message}`);
            instance._htmxUpdateInProgress = false;
            return ""; // Return empty string to prevent swap errors
          }
        }
        return ""; // Return empty string for any JSON response
      }
      return processedText;
    },

    handleSwap: function (swapStyle, target, fragment, settleInfo) {
      Debug.debug(`[handleSwap] Swap style: ${swapStyle}`);

      const isEmptySignal = fragment.textContent?.trim() === "";

      // Check if this is a JSON response
      const contentType =
        settleInfo.xhr?.getResponseHeader("Content-Type") || "";
      const isJson =
        !contentType.startsWith("text/html") &&
        !contentType.startsWith("text/xml");

      if (isJson) {
        Debug.debug(
          `[handleSwap] Detected JSON response for target ${
            target.id || "[no id]"
          }. Preventing htmx swap.`,
        );
        return true;
      }

      const hasDataExtractorPlugin =
        PluginManager.getPlugin("data-extractor") !== null;
      const fragmentContainsFpData =
        AttributeMatcher.findMatchingElements(
          "data",
          null,
          false,
          fragment,
          true,
        ).length > 0;

      if (hasDataExtractorPlugin && fragmentContainsFpData) {
        Debug.debug(
          `[handleSwap] Detected data-extractor plugin and fp-data attribute. Processing through data extractor.`,
        );
        return true;
      } else if (hasDataExtractorPlugin) {
        Debug.info(
          `[handleSwap] Detected data-extractor plugin but no fp-data attribute. Skipping data extraction.`,
        );
        return false;
      } else if (fragmentContainsFpData) {
        Debug.warn(
          `[handleSwap] Detected fp-data attribute but no data-extractor plugin. Skipping data extraction.`,
        );
        return false;
      }

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
          if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
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
            "transformRequest",
            "json",
          );

          // Set default Content-Type header
          evt.detail.headers["Content-Type"] =
            "application/x-www-form-urlencoded; charset=UTF-8";
          break;

        case "htmx:beforeRequest":
          if (!evt.detail.xhr.requestId) {
            evt.detail.xhr.requestId = requestId;
          }
          RequestHandler.handleRequest(triggeringElt, requestId, "start");

          // Execute hooks if it's a template element
          if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
            PluginManager.executeHook("beforeRequest", instance || null, evt);
          }
          break;

        case "htmx:beforeSwap":
          executeHtmxHook("beforeSwap", triggeringElt, evt);
          if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
            if (instance) {
              EventSystem.publish("beforeSwap", {
                instanceName: instance.instanceName,
                ...evt.detail,
              });
            }
          }
          break;

        case "htmx:afterSwap":
          executeHtmxHook("afterSwap", triggeringElt, evt);
          if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
            if (instance) {
              EventSystem.publish("afterSwap", {
                instanceName: instance.instanceName,
                ...evt.detail,
              });
            }
          }
          const formsToCleanup = getAllRelevantForms(triggeringElt);
          formsToCleanup.forEach(cleanupFormChangeListeners);
          break;

        case "htmx:afterRequest":
          if (AttributeMatcher._hasAttribute(triggeringElt, "template")) {
            const instance = InstanceManager.getOrCreateInstance(triggeringElt);
            if (instance) {
              PluginManager.executeHook("afterRequest", instance, evt);
              EventSystem.publish("requestEnd", {
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
              `has fp-template: ${AttributeMatcher._hasAttribute(
                triggeringElt,
                "template",
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
  if (
    AttributeMatcher._hasAttribute(target, "instance") ||
    target.hasAttribute("id")
  ) {
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
