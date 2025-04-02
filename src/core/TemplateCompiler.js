import { Debug, log, errorLog } from "./Debug";
import { _state } from "./State";
import { Performance } from "../utils/Performance";
import { memoize } from "../utils/Memoize";
import { currentCustomTags } from "./ReplaceCustomTags";

export function compileTemplate(templateId, recompile = false) {
  if (!recompile) {
    return memoizedCompile(templateId);
  }

  // For recompile=true:
  // 1. Clear template cache
  delete _state.templateCache[templateId];
  // 2. Compile without memoization
  const compiledTemplate = memoizedCompile.original(templateId);
  // 3. Update the memoized cache with the new template
  memoizedCompile.cache.set(JSON.stringify([templateId]), compiledTemplate);

  return compiledTemplate;
}

export const memoizedCompile = memoize(function (templateId) {
  // if templateId is empty or "self", use the current element
  Performance.start("compile:" + templateId);

  // Add # prefix if templateId doesn't start with it
  const selector = templateId.startsWith("#") ? templateId : "#" + templateId;
  var templateElement = document.querySelector(selector);

  Debug.log(Debug.levels.DEBUG, "Trying to compile template: " + templateId);

  if (!templateElement) {
    errorLog("Template not found: " + templateId);
    Performance.end("compile:" + templateId);
    return null;
  }

  // Check if template needs compilation
  if (
    !_state.templateCache[templateId] ||
    (templateElement.hasAttribute("fp-dynamic") &&
      templateElement.getAttribute("fp-dynamic") !== "false")
  ) {
    Debug.log(Debug.levels.DEBUG, "compiling template: " + templateId);

    // Function to construct tag with attributes
    function constructTagWithAttributes(element) {
      let tagName = element.tagName.toLowerCase();
      // Replace all custom tags
      currentCustomTags.forEach((tag) => {
        if (tagName === tag.tag) {
          tagName = tag.replaceWith;
        }
      });
      let attributes = "";
      for (let attr of element.attributes) {
        attributes += ` ${attr.name}="${attr.value}"`;
      }
      return `<${tagName}${attributes}>`;
    }

    function processNode(node) {
      let result = "";

      // Loop through each child node
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          result += child.textContent;
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.hasAttribute("fp")) {
            // Process as a Handlebars helper
            const helperName = child.tagName.toLowerCase();
            const args = child
              .getAttribute("fp")
              .split(" ")
              .map((arg) => arg.replace(/&quot;/g, '"'))
              .join(" ");

            const innerContent = processNode(child);

            if (
              helperName === "log" ||
              helperName === "lookup" ||
              helperName === "execute"
            ) {
              if (innerContent) {
                result += `{{${helperName} ${innerContent} ${args}}}`;
              } else {
                result += `{{${helperName} ${args}}}`;
              }
            } else if (helperName === "comment") {
              result += `{{!-- ${args} --}}`;
            } else if (helperName === "if") {
              const escapedArgs = args.replace(/"/g, '\\"');
              result += `{{#${helperName} "${escapedArgs}"}}${innerContent}{{/${helperName}}}`;
            } else if (helperName === "else") {
              result += `{{${helperName}}}${innerContent}`;
            } else if (helperName === "math") {
              if (innerContent) {
                Debug.log(
                  Debug.levels.WARN,
                  `FlowPlater: The <${helperName}> helper does not accept inner content.`,
                );
              }
              result += `{{#${helperName} "${args}"}}`;
            } else {
              result += `{{#${helperName} ${args}}}${innerContent}{{/${helperName}}}`;
            }
          } else if (child.tagName === "else") {
            const innerContent = processNode(child);
            result += `{{${child.tagName.toLowerCase()}}}${innerContent}`;
          } else if (
            child.tagName === "template" ||
            child.tagName === "fptemplate" ||
            child.hasAttribute("fp-template")
          ) {
            result += child.outerHTML;
          } else {
            const childContent = processNode(child);
            const startTag = constructTagWithAttributes(child);
            let endTagName = child.tagName.toLowerCase();
            currentCustomTags.forEach((tag) => {
              if (endTagName === tag.tag) {
                endTagName = tag.replaceWith;
              }
            });
            const endTag = `</${endTagName}>`;
            result += `${startTag}${childContent}${endTag}`;
          }
        }
      });
      return result;
    }

    const handlebarsTemplate = processNode(templateElement);
    Debug.log(
      Debug.levels.DEBUG,
      "Compiling Handlebars template: " + handlebarsTemplate,
    );

    try {
      const compiledTemplate = Handlebars.compile(handlebarsTemplate);

      // Check cache size limit before adding new template
      const cacheSize = _state.config?.templates?.cacheSize || 100; // Default to 100 if not configured
      if (Object.keys(_state.templateCache).length >= cacheSize) {
        // Remove oldest template
        const oldestKey = Object.keys(_state.templateCache)[0];
        delete _state.templateCache[oldestKey];
        Debug.log(
          Debug.levels.INFO,
          "Cache limit reached. Removed template: " + oldestKey,
        );
      }

      // Add new template to cache
      _state.templateCache[templateId] = compiledTemplate;
      Performance.end("compile:" + templateId);
      return compiledTemplate;
    } catch (e) {
      errorLog(
        "Template not valid: " + handlebarsTemplate + " | Error: " + e.message,
      );
      Performance.end("compile:" + templateId);
      return null;
    }
  }
  Performance.end("compile:" + templateId);
  return _state.templateCache[templateId];
});
