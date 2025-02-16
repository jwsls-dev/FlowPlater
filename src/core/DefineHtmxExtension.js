import { RequestHandler } from "./RequestHandler";
import { Debug } from "./Debug";
import { render } from "./Template";
import { parseXmlToJson } from "../utils/ParseXmlToJson";

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
        Debug.log(Debug.levels.ERROR, "Failed to parse response:", e);
        return text;
      }

      var templateId = elt.getAttribute("fp-template");
      Debug.log(
        Debug.levels.INFO,
        "Response received for request " + requestId + ": " + text,
      );

      // Render template
      try {
        let rendered;
        if (templateId) {
          Debug.log(
            Debug.levels.INFO,
            "Rendering html to " + templateId + " based on htmx response",
          );
          rendered = render({
            template: templateId,
            data: data,
            target: elt,
            returnHtml: true,
          });
        } else {
          if (!elt.id) {
            Debug.log(
              Debug.levels.ERROR,
              "No template found. If the current element is a template, it must have an id.",
            );
            return text;
          }
          Debug.log(
            Debug.levels.INFO,
            "Rendering html to current element based on htmx response",
          );
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
        Debug.log(Debug.levels.ERROR, "Error rendering template:", error);
        return text;
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
          break;
      }
    },
  });
}
