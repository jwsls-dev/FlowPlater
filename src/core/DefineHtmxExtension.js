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
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/LocalStorage";
import PluginManager from "./PluginManager";
import { InstanceManager } from "./InstanceManager";
import { EventSystem } from "./EventSystem";
import { trackChanges } from "../utils/DataChanges";

// function isHTML(string) {
//   return Array.from(
//     new DOMParser().parseFromString(string, "text/html").body.childNodes,
//   ).some(({ nodeType }) => nodeType == 1);
// }

export function defineHtmxExtension() {
  htmx.defineExtension("flowplater", {
    transformResponse: function (text, xhr, elt) {
      // Add debug logging for response

      const isHtml = xhr
        .getResponseHeader("Content-Type")
        ?.startsWith("text/html");

      Debug.log(Debug.levels.DEBUG, "Response received:", {
        text: text,
        contentType: xhr.getResponseHeader("Content-Type"),
        isHtmlLike: isHtml,
      });

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

      // Check if response looks like HTML (more permissive check)
      if (isHtml) {
        Debug.log(
          Debug.levels.DEBUG,
          "Detected HTML response, passing through",
        );

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
        // Mark request as processed for HTML responses
        RequestHandler.handleRequest(elt, requestId, "process");
        return text;
      }

      // Parse response data
      let data;
      try {
        if (xhr.getResponseHeader("Content-Type")?.startsWith("text/xml")) {
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(text, "text/xml");
          data = parseXmlToJson(xmlDoc);
        } else {
          data = JSON.parse(text);
        }
      } catch (error) {
        errorLog("Failed to parse response:", error);
        return text;
      }

      const templateId = elt.getAttribute("fp-template");
      log("Response received for request " + requestId + ": ", data);

      const instanceName = elt.getAttribute("fp-instance") || elt.id;
      const instance = InstanceManager.getOrCreateInstance(elt);

      if (instance) {
        // Calculate data changes
        const oldData = instance.data;
        const changes = trackChanges(oldData, data);

        // Execute updateData hook with the tracked changes
        PluginManager.executeHook("updateData", instance, {
          data: data,
          changes,
          source: "htmx",
          requestId: requestId,
        });

        // Store data if storage is enabled
        if (_state.config?.storage?.enabled) {
          saveToLocalStorage(instanceName, data, "instance");
        }

        // Update instance data
        Object.assign(instance.data, data);
        Object.assign(instance.proxy, data);

        // Render template without triggering a new request
        try {
          let rendered;
          if (templateId) {
            log("Rendering html to " + templateId + " based on htmx response");
            rendered = instance.template(instance.proxy);
          } else {
            if (!elt.id) {
              errorLog(
                "No template found. If the current element is a template, it must have an id.",
              );
              return text;
            }
            log("Rendering html to current element based on htmx response");
            rendered = instance.template(instance.proxy);
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
            "<div class='fp-error'>Error rendering template: " +
            error +
            "</div>"
          );
        }
      }
      return text;
    },

    handleSwap: function (swapStyle, target, fragment, settleInfo) {
      // Debug.log(Debug.levels.DEBUG, "handleSwap called with:", {
      //   swapStyle,
      //   hasTemplate: target.hasAttribute("fp-template"),
      //   fragmentType: fragment.nodeType,
      //   fragmentContent: fragment.textContent || fragment.innerHTML,
      // });

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

        // Only handle non-HTML responses
        const isHtmlResponse =
          fragment.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
          fragment.nodeType === Node.ELEMENT_NODE ||
          (typeof fragment.textContent === "string" &&
            (fragment.textContent.trim().startsWith("<!DOCTYPE") ||
              fragment.textContent.trim().startsWith("<html") ||
              fragment.textContent.trim().startsWith("<div") ||
              fragment.textContent.trim().startsWith("<")));

        if (isHtmlResponse) {
          Debug.log(
            Debug.levels.DEBUG,
            "HTML response detected, letting htmx handle swap",
          );
          return false;
        }

        // For non-HTML responses with fp-template, we want to handle the swap
        Debug.log(
          Debug.levels.DEBUG,
          "Non-HTML response with fp-template detected, handling swap",
        );
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
          // Mark request as processed
          RequestHandler.handleRequest(target, requestId, "process");
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

          // Restore form states if necessary
          restoreFormIfNecessary(target, true, evt);
          break;

        case "htmx:afterSettle":
          // Execute afterSettle hook
          executeHtmxHook("afterSettle", target, evt);

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

/**
 * Helper function to restore form states if necessary
 * @param {HTMLElement} target - The target element
 * @param {boolean} [checkFailed=true] - Whether to check if the request failed
 * @param {Object} [event] - The event object containing failure status
 */
function restoreFormIfNecessary(target, checkFailed = true, event) {
  // Skip if already restoring
  if (RequestHandler.isRestoringFormStates) {
    Debug.log(Debug.levels.DEBUG, "Already restoring form states, skipping");
    return;
  }

  // Skip if request failed and we're checking for failures
  if (checkFailed && event?.detail?.failed) {
    return;
  }

  RequestHandler.isRestoringFormStates = true;
  restoreFormStates(target);
  RequestHandler.isRestoringFormStates = false;
}
