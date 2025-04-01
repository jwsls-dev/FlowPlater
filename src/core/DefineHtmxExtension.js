import { RequestHandler } from "./RequestHandler";
import { Debug, errorLog, log } from "./Debug";
import { render } from "./Template";
import { parseXmlToJson } from "../utils/ParseXmlToJson";
import { _state } from "./State";
import {
  setupFormSubmitHandlers,
  cleanupFormChangeListeners,
  getAllRelevantForms,
} from "../utils/FormPersistence";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/LocalStorage";
import PluginManager from "./PluginManager";
import { InstanceManager } from "./InstanceManager";
import { EventSystem } from "./EventSystem";

export function defineHtmxExtension() {
  htmx.defineExtension("flowplater", {
    transformResponse: function (text, xhr, elt) {
      // Get request ID from either xhr or processing elements
      const requestId = xhr.requestId;
      const currentInfo = RequestHandler.processingElements.get(elt);

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

      // Check if response looks like HTML
      if (typeof text === "string" && text.trim().startsWith("<!DOCTYPE")) {
        // Store HTML response if storage is enabled
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
        // For HTML responses, let HTMX handle the swap directly
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
      log("Response received for request " + requestId + ": ", data);

      // Get instance name and load stored data
      const instanceName = elt.getAttribute("fp-instance") || elt.id;
      // Don't load from localStorage here - we want to use fresh data

      // Get or create instance
      const instance = InstanceManager.getOrCreateInstance(elt, data);
      if (!instance) return text;

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
            instanceName: instanceName,
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
          rendered = render({
            template: elementTemplateId,
            data: data,
            target: elt,
            returnHtml: true,
            instanceName: instanceName,
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
        return (
          "<div class='fp-error'>Error rendering template: " + error + "</div>"
        );
      }
    },

    handleSwap: function (swapStyle, target, fragment, settleInfo) {
      // Skip if element doesn't have fp-template
      if (!target.hasAttribute("fp-template")) {
        Debug.log(
          Debug.levels.DEBUG,
          "No fp-template attribute, skipping handleSwap",
        );
        return false; // Let HTMX handle the swap
      }

      try {
        // Get instance
        const instance = InstanceManager.getOrCreateInstance(target);
        if (!instance) return false;

        const supportedSwapStyles = ["innerHTML"];
        if (!supportedSwapStyles.includes(swapStyle)) {
          Debug.log(
            Debug.levels.DEBUG,
            "Unsupported swap style: " +
              swapStyle +
              ", falling back to default swap",
          );
          return false;
        }

        // Update the DOM
        instance._updateDOM();

        return true;
      } catch (error) {
        Debug.log(Debug.levels.ERROR, "Error in handleSwap: " + error.message);
        return false;
      }
    },

    onEvent: function (name, evt) {
      if (evt.detail.handled) return;

      const target = evt.detail.elt;
      const requestId =
        evt.detail.requestId || RequestHandler.generateRequestId();

      switch (name) {
        case "htmx:beforeRequest":
          evt.detail.requestId = requestId;
          evt.detail.xhr.requestId = requestId;
          RequestHandler.handleRequest(target, requestId, "start");

          // Execute beforeRequest hook
          if (target.hasAttribute("fp-template")) {
            const instance = InstanceManager.getOrCreateInstance(target);
            if (instance) {
              PluginManager.executeHook("beforeRequest", instance, evt);
            }
          }
          break;

        case "htmx:beforeSwap":
          const info = RequestHandler.processingElements.get(target);
          if (!info || info.requestId !== requestId) {
            evt.preventDefault();
            Debug.log(
              Debug.levels.DEBUG,
              "Prevented swap - request ID mismatch",
            );
            return;
          }
          // Execute beforeSwap hook
          executeHtmxHook("beforeSwap", target, evt);
          break;

        case "htmx:afterSwap":
          // Execute afterSwap hook
          executeHtmxHook("afterSwap", target, evt);

          // Clean up form listeners before setting up new ones
          const formsToCleanup = getAllRelevantForms(target);
          formsToCleanup.forEach(cleanupFormChangeListeners);
          break;

        case "htmx:afterRequest":
          // Execute afterRequest hook
          if (target.hasAttribute("fp-template")) {
            const instance = InstanceManager.getOrCreateInstance(target);
            if (instance) {
              PluginManager.executeHook("afterRequest", instance, evt);
              EventSystem.publish("request-end", {
                instanceName: instance.instanceName,
                ...evt.detail,
              });
            }
          }
          // Handle request cleanup
          RequestHandler.handleRequest(target, requestId, "cleanup");
          break;

        case "htmx:afterSettle":
          // Re-setup form handlers after the DOM has settled
          Debug.log(
            Debug.levels.DEBUG,
            `Setting up form handlers after DOM settle for target: ${
              target.id || "unknown"
            }, ` +
              `has fp-template: ${target.hasAttribute("fp-template")}, ` +
              `parent form: ${target.closest("form")?.id || "none"}`,
          );
          setupFormSubmitHandlers(target);
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
