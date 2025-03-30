import { RequestHandler } from "./RequestHandler";
import { Debug, errorLog, log } from "./Debug";
import { render } from "./Template";
import { parseXmlToJson } from "../utils/ParseXmlToJson";
import { updateDOM } from "../utils/UpdateDom";
import { _state } from "./State";
import {
  setupFormSubmitHandlers,
  cleanupFormChangeListeners,
  getAllRelevantForms,
} from "../utils/FormPersistence";
import { loadFromLocalStorage } from "../utils/LocalStorage";

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
        return text; // Return HTML as-is
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
      const storedData = loadFromLocalStorage(instanceName, "instance");

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
        // Get instance name from element
        const instanceName = target.getAttribute("fp-instance") || target.id;
        if (!instanceName) {
          Debug.log(
            Debug.levels.DEBUG,
            "No instance name found for element, falling back to default swap",
          );
          return false;
        }

        // Get the instance from state
        const instance = _state.instances[instanceName];
        if (!instance) {
          Debug.log(
            Debug.levels.DEBUG,
            "No instance found for name: " + instanceName,
          );
          return false;
        }

        const supportedSwapStyles = ["innerHTML"];
        if (!supportedSwapStyles.includes(swapStyle)) {
          Debug.log(
            Debug.levels.DEBUG,
            "Unsupported swap style for smart DOM swap: " +
              swapStyle +
              ", falling back to default swap",
          );

          const breakingSwapStyles = [
            "outerHTML",
            "beforebegin",
            "afterbegin",
            "afterend",
          ];
          if (breakingSwapStyles.includes(swapStyle)) {
            Debug.log(
              Debug.levels.WARN,
              "Breaking swap style: " +
                swapStyle +
                ", instance methods will not work as expected. Target container was removed from the DOM.",
            );
          }

          return false;
        }

        Debug.log(
          Debug.levels.DEBUG,
          "Using updateDOM for swap with config:",
          _state.config,
        );

        // Use updateDOM which handles all form persistence and setup internally
        updateDOM(target, fragment.innerHTML, instance.animate);

        Debug.log(
          Debug.levels.DEBUG,
          "HTMX smart innerHTML swap completed for instance: " + instanceName,
        );

        // Return true to tell HTMX we've handled the swap
        return true;
      } catch (e) {
        errorLog("Error in handleSwap:", e);
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
          break;

        case "htmx:afterSwap":
          RequestHandler.handleRequest(target, requestId, "cleanup");
          // Clean up form listeners before setting up new ones
          const formsToCleanup = getAllRelevantForms(target);
          formsToCleanup.forEach(cleanupFormChangeListeners);
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
