import { Debug } from "../core/Debug";
import { _state } from "../core/State";
import { Performance } from "../utils/Performance";
import { memoize } from "../utils/Memoize";
import { currentCustomTags } from "./ReplaceCustomTags";
import { AttributeMatcher } from "../dom";
import { ConfigManager } from "../core/ConfigManager";

export function compileTemplate(templateId: string, recompile: boolean = false) {
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

  const helpers = Handlebars.helpers;

  // Add # prefix if templateId doesn't start with it
  const selector = templateId.startsWith("#") ? templateId : "#" + templateId;
  var templateElement = document.querySelector(selector);

  Debug.debug("Trying to compile template: " + templateId);

  if (!templateElement) {
    Debug.error("Template not found: " + templateId);
    Performance.end("compile:" + templateId);
    return null;
  }

  // Check if template needs compilation
  if (
    !_state.templateCache[templateId] ||
    (AttributeMatcher._hasAttribute(templateElement, "dynamic") &&
      AttributeMatcher._getRawAttribute(templateElement, "dynamic") !== "false")
  ) {
    Debug.debug("compiling template: " + templateId);

    // Function to construct tag with attributes
    function constructTagWithAttributes(element: HTMLElement) {
      let tagName = element.tagName.toLowerCase();
      let fpTag = AttributeMatcher._getRawAttribute(element, "tag");
      if (fpTag) {
        tagName = fpTag;
      }
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

    function processNode(node: HTMLElement) {
      let result = "";

      // Loop through each child node
      node.childNodes.forEach((child: ChildNode) => {
        if (child.nodeType === Node.TEXT_NODE) {
          result += child.textContent;
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const element = child as HTMLElement;
          let childTagName = element.tagName.toLowerCase();
          let fpTag = AttributeMatcher._getRawAttribute(element, "tag");
          if (fpTag) {
            childTagName = fpTag;
          }
          if (element.hasAttribute("fp") || childTagName in helpers) {
            // Process as a Handlebars helper
            const helperName = childTagName;
            const fpAttr = element.getAttribute("fp");
            const args = fpAttr
              ? fpAttr
                  .split(" ")
                  .map((arg: string) => arg.replace(/&quot;/g, '"'))
                  .join(" ")
              : "";

            const innerContent = processNode(element);

            switch (helperName) {
              case "log":
              case "lookup":
              case "execute":
                if (innerContent) {
                  result += `{{${helperName} ${innerContent} ${args}}}`;
                } else {
                  result += `{{${helperName} ${args}}}`;
                }
                break;

              case "comment":
                result += `{{!-- ${args} --}}`;
                break;

              case "if":
                const escapedArgs = args.replace(/"/g, '\\"');
                result += `{{#${helperName} "${escapedArgs}"}}${innerContent}{{/${helperName}}}`;
                break;

              case "else":
                result += `{{${helperName}}}${innerContent}`;
                break;

              case "math":
                if (innerContent) {
                  Debug.warn(
                    `FlowPlater: The <${helperName}> helper does not accept inner content.`,
                  );
                }
                result += `{{#${helperName} "${args}"}}`;
                break;

              default:
                result += `{{#${helperName} ${args}}}${innerContent}{{/${helperName}}}`;
                break;
            }
          } else if (element.tagName === "else") {
            const innerContent = processNode(element);
            result += `{{${element.tagName.toLowerCase()}}}${innerContent}`;
          } else if (
            element.tagName === "template" ||
            element.tagName === "fptemplate" ||
            AttributeMatcher._hasAttribute(element, "template")
          ) {
            result += element.outerHTML;
          } else {
            const childContent = processNode(element);
            const startTag = constructTagWithAttributes(element);
            const fpValAttribute = AttributeMatcher._getRawAttribute(
              element,
              "val",
            );
            let processedContent = childContent;
            if (fpValAttribute) {
              processedContent = `{{{default ${fpValAttribute} "${childContent.replace(
                /"/g,
                '\\"',
              )}"}}}`;
            }
            let endTagName = childTagName;
            currentCustomTags.forEach((tag) => {
              if (endTagName === tag.tag) {
                endTagName = tag.replaceWith;
              }
            });
            const endTag = `</${endTagName}>`;
            result += `${startTag}${processedContent}${endTag}`;
          }
        }
      });
      return result;
    }

    const handlebarsTemplate = processNode(templateElement);
    Debug.debug("Compiling Handlebars template: " + handlebarsTemplate);

    try {
      const compiledTemplate = Handlebars.compile(handlebarsTemplate);

      // Check cache size limit before adding new template
      const cacheSize = ConfigManager.getConfig().templates?.cacheSize || 100; // Default to 100 if not configured
      if (Object.keys(_state.templateCache).length >= cacheSize) {
        // Remove oldest template
        const oldestKey = Object.keys(_state.templateCache)[0];
        delete _state.templateCache[oldestKey];
        Debug.info("Cache limit reached. Removed template: " + oldestKey);
      }

      // Add new template to cache
      _state.templateCache[templateId] = compiledTemplate;
      Performance.end("compile:" + templateId);
      return compiledTemplate;
    } catch (e: unknown) {
      Debug.error(
        "Template not valid: " + handlebarsTemplate + " | Error: " + (e as Error).message,
      );
      Performance.end("compile:" + templateId);
      return null;
    }
  }
  Performance.end("compile:" + templateId);
  return _state.templateCache[templateId];
});
