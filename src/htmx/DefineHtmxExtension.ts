import { RequestHandler } from "../events/RequestHandler";
import { EventSystem } from "../events/EventSystem";
import { Debug } from "../core/Debug";
import { parseXmlToJson } from "../utils/ParseXmlToJson";
import { _state } from "../core/State";
import {
  setupFormSubmitHandlers,
  cleanupFormChangeListeners,
  getAllRelevantForms,
  restoreFormStates
} from "../forms/FormPersistence";
import { PluginManager } from "../core/PluginManager";
import { InstanceManager } from "../instance/InstanceManager";
import { AttributeMatcher } from "../dom/AttributeMatcher";

import { FlowPlaterElement, FlowPlaterInstance } from "../types";

declare const htmx: any;

export function defineHtmxExtension() {
  htmx.defineExtension("flowplater", {
    transformResponse: async function (text: string, xhr: any, elt: FlowPlaterElement) {
      // First, check if the data is XML and transform it to JSON if needed
      const contentType = xhr.getResponseHeader("Content-Type") || "";
      const isXml = contentType.startsWith("text/xml");
      const isHtml = contentType.startsWith("text/html");

      let processedText = text;
      let isJson = false;

      if (isXml) {
        try {
          // First validate that we have valid XML content
          if (!text || typeof text !== 'string') {
            throw new Error('Invalid XML content: empty or non-string response');
          }

          // Parse the XML string using DOMParser
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");
          
          // Check for XML parsing errors - DOMParser doesn't throw, but creates error documents
          const parserError = xmlDoc.querySelector("parsererror");
          if (parserError) {
            throw new Error(`XML parsing failed: ${parserError.textContent || 'Unknown parser error'}`);
          }

          // Validate that we have a valid document with a root element
          if (!xmlDoc.documentElement) {
            throw new Error('XML parsing failed: no document element found');
          }

          // Convert XML to JSON using our utility function (which expects the original string)
          const jsonData = parseXmlToJson(text);
          processedText = JSON.stringify(jsonData);
          isJson = true;
          
          Debug.debug('[transformResponse] Successfully converted XML to JSON:', jsonData);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown XML parsing error';
          Debug.error("Failed to parse XML response:", errorMessage, {
            originalText: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
            contentType: contentType
          });
          
          // Keep the original text if XML parsing fails - don't try to process as JSON
          processedText = text;
          isJson = false;
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
            let jsonData: Record<string, any>;
            
            if (typeof processedText === "string") {
              try {
                jsonData = JSON.parse(processedText);
              } catch (parseError) {
                const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown JSON parsing error';
                Debug.error(`[transformResponse] Failed to parse JSON data for instance ${instanceName}:`, errorMessage, {
                  originalText: processedText.substring(0, 200) + (processedText.length > 200 ? '...' : ''),
                  contentType: xhr.getResponseHeader("Content-Type") || "unknown"
                });
                
                // Clear the flag and return early to prevent further processing
                instance._htmxUpdateInProgress = false;
                return ""; // Return empty string to prevent swap errors
              }
            } else if (typeof processedText === "object") {
              jsonData = processedText;
            } else {
              Debug.error(`[transformResponse] Invalid data type for JSON processing: ${typeof processedText}`, {
                processedText: processedText,
                instanceName: instanceName
              });
              instance._htmxUpdateInProgress = false;
              return "";
            }
            
            // Validate that we have valid data before setting
            if (jsonData === null || jsonData === undefined) {
              Debug.warn(`[transformResponse] Received null/undefined data for instance ${instanceName}, skipping update`);
              instance._htmxUpdateInProgress = false;
              return "";
            }
            
            instance.setData(jsonData);

            // Clear the flag
            instance._htmxUpdateInProgress = false;

            // Return empty string to prevent HTMX default swap
            return ""; // Return empty string instead of "DO_NOT_SWAP"
          } catch (error: any) {
            Debug.error(`[transformResponse] Error processing JSON data for instance ${instanceName}:`, error.message, {
              stack: error.stack,
              processedText: typeof processedText === 'string' ? processedText.substring(0, 200) + (processedText.length > 200 ? '...' : '') : processedText
            });
            instance._htmxUpdateInProgress = false;
            
            return ""; // Return empty string to prevent swap errors
          }
        }
        return ""; // Return empty string for any JSON response
      }
      return processedText;
    },

    handleSwap: function (swapStyle: string, target: FlowPlaterElement, fragment: HTMLElement, settleInfo: any) {
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
        fragment && (AttributeMatcher.findMatchingElements(
          "data",
          null,
          false,
          fragment,
          true,
        ) as Element[]).length > 0;

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

    onEvent: function (name: string, evt: any) {
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
              instance as FlowPlaterInstance,
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
            instance as FlowPlaterInstance,
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

function executeHtmxHook(hookName: string, target: FlowPlaterElement, event: any) {
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
function restoreFormIfNecessary(target: FlowPlaterElement, checkFailed: boolean = true, event: any) {
  if (checkFailed && event?.detail?.failed) {
    return;
  }

  restoreFormStates(target, 'htmx.restoreFormIfNecessary');
}
