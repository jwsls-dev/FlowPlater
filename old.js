//////////////////////////////////////////////////////////////////////////////!/

/* -------------------------------------------------------------------------- */
/* SECTION                       Main functions                               */
/* ANCHOR       Template translation from FlowPlater to Handlebars            */
/* -------------------------------------------------------------------------- */

// Converts <tag fp="value"> to {{#tag value}} and </tag> to {{/tag}}
// Takes a template id (e.g. "#my-template") and returns a compiled template
const compileTemplate = memoize(function (templateId) {
  Performance.start("compile:" + templateId);
  // Check if the template is already cached or if fp-dynamic is true
  var templateElement = document.querySelector(templateId);

  log("Trying to compile template: " + templateId); //!log

  if (!templateElement) {
    errorLog("Template not found: " + templateId); //!error
    Performance.end("compile:" + templateId);
    return null;
  }

  if (
    !_state.templateCache[templateId] ||
    (templateElement.hasAttribute("fp-dynamic") &&
      templateElement.getAttribute("fp-dynamic") !== "false")
  ) {
    log("compiling template: " + templateId); //!log
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
          // Directly append text nodes
          result += child.textContent;
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.hasAttribute("fp")) {
            // Process as a Handlebars helper
            const helperName = child.tagName.toLowerCase();
            const args = child
              .getAttribute("fp")
              .split(" ")
              .map((arg) => {
                return arg.replace(/&quot;/g, '"');
              })
              .join(" ");

            // Recursively process inner content
            const innerContent = processNode(child);

            // Construct the Handlebars helper syntax
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
              // Escape double quotes in args to prevent syntax errors
              const escapedArgs = args.replace(/"/g, '\\"');
              result += `{{#${helperName} "${escapedArgs}"}}${innerContent}{{/${helperName}}}`;
            } else if (helperName === "else") {
              result += `{{${helperName}}}${innerContent}`;
            } else if (helperName === "math") {
              if (innerContent) {
                console.warn(
                  `FlowPlater: The <${helperName}> helper does not accept inner content.`,
                );
              }
              result += `{{#${helperName} "${args}"}}`;
            } else {
              result += `{{#${helperName} ${args}}}${innerContent}{{/${helperName}}}`;
            }
          } else if (child.tagName === "else") {
            // Process as an else block
            const innerContent = processNode(child);
            result += `{{${child.tagName.toLowerCase()}}}${innerContent}`;
          } else if (
            child.tagName === "template" ||
            child.tagName === "fptemplate" ||
            child.hasAttribute("fp-template")
          ) {
            // return node as is
            result += child.outerHTML;
          } else {
            // Recursively process non-helper elements
            const childContent = processNode(child);
            // Construct the tag with attributes and include the child's content
            const startTag = constructTagWithAttributes(child);
            let endTagName = child.tagName.toLowerCase();
            // Replace all custom tags
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
    log("Compiling Handlebars template: " + handlebarsTemplate); //!log

    try {
      _state.templateCache[templateId] = Handlebars.compile(handlebarsTemplate);
      Performance.end("compile:" + templateId);
      return _state.templateCache[templateId];
    } catch (e) {
      errorLog(
        "Template not valid: " + handlebarsTemplate + " | Error: " + e.message,
      );
      Performance.end("compile:" + templateId);
      return null;
    } finally {
      // Remove this line - we don't want to remove the template element
      // templateElement.remove();
    }
  }
  Performance.end("compile:" + templateId);
  return _state.templateCache[templateId];
});

/* -------------------------------------------------------------------------- */
/* ANCHOR                        Render function                              */
/* -------------------------------------------------------------------------- */

// * Render a template with data
// Takes a template id (e.g. "#my-template"), data, and a target selector (e.g. "#target")
// If returnHtml is true, returns the rendered HTML instead of rendering it to the target
function render({
  template,
  data,
  target,
  returnHtml,
  onRender = _state.defaults.onRender,
  onRendered = _state.defaults.onRendered,
  instanceName,
  animate = _state.defaults.animation,
}) {
  Performance.start("render:" + (instanceName || "anonymous"));

  EventSystem.publish("beforeRender", {
    instanceName,
    template,
    data,
    target,
    returnHtml,
  });

  /* -------------------------------------------------------------------------- */
  /*                                initial setup                               */
  /* -------------------------------------------------------------------------- */

  var elements;

  // Get the target elements. If target is a string, use querySelectorAll.
  // If target is a jQuery object, use toArray. If target is node or NodeList, use it directly.
  if (typeof target === "string") {
    elements = document.querySelectorAll(target);
  } else if (typeof target === "object" && target.jquery) {
    elements = target.toArray();
  } else if (typeof target === "object") {
    elements = target;
  } else {
    errorLog("Invalid target type: " + typeof target); //!error
    return;
  }
  // make elements an array if it's a NodeList
  if (elements.length === undefined) {
    elements = [elements];
  }

  // Get the instance name.
  // If the instanceName is the same as the length, it means it's not specified.
  if (instanceName) {
    instanceName = instanceName;
  } else if (elements[0].hasAttribute("fp-instance")) {
    instanceName = elements[0].getAttribute("fp-instance");
  } else if (elements[0].id) {
    instanceName = elements[0].id;
  } else {
    instanceName = _state.length;
  }

  log("Rendering instance: " + instanceName, template, data, target); //!log

  elements.forEach(function (element) {
    onRender.call(element);
  });

  /* -------------------------------------------------------------------------- */
  /*                              Compile template                              */
  /* -------------------------------------------------------------------------- */

  // Compile the template if it's not already cached
  // If the template is not cached, it will be compiled and cached, and length will be incremented
  if (!_state.templateCache[template]) {
    compileTemplate(template);
    _state.length++;
  }
  var template = _state.templateCache[template];
  if (!template) {
    errorLog("Template not found: " + template); //!error
    return;
  }

  if (elements.length === 0) {
    errorLog("Target not found: " + target); //!error
    return;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Proxy creation                               */
  /* -------------------------------------------------------------------------- */

  // Create a reactive data proxy if it doesn't exist or if data has changed
  if (
    !_state.instances[instanceName] ||
    _state.instances[instanceName].data !== data
  ) {
    var proxy = new Proxy(data, {
      set: function (target, prop, value) {
        target[prop] = value;
        // Re-render the template with the updated data
        elements.forEach(function (element) {
          element.innerHTML = template(target);
        });
        return true;
      },
    });
    // Store the proxy and elements in instances for future reference
    _state.instances[instanceName] = {
      elements: elements,
      template: template,
      proxy: proxy,
      data: data,
      ...instanceMethods(instanceName),
    };
  }

  log("Proxy created: ", _state.instances[instanceName].proxy); //!log

  /* -------------------------------------------------------------------------- */
  /*                               Render template                              */
  /* -------------------------------------------------------------------------- */

  // Render the template with the current data
  if (returnHtml) {
    try {
      var html = template(_state.instances[instanceName].proxy);
      return html;
    } catch (error) {
      const errorMessage = `<div class="fp-error">Error rendering template: ${error.message}</div>`;
      Debug.log(
        Debug.levels.ERROR,
        `Failed to render template: ${error.message}`,
      );
      return errorMessage;
    } finally {
      elements.forEach(function (element) {
        onRendered.call(element);
      });

      EventSystem.publish("afterRender", {
        instanceName,
        template,
        data,
        target,
        elements,
        returnHtml,
      });

      log("Rendered instance: " + instanceName, template, data, target);
      Performance.end("render:" + (instanceName || "anonymous"));
    }
  } else {
    try {
      elements.forEach(function (element) {
        try {
          element.innerHTML = template(_state.instances[instanceName].proxy);
        } catch (error) {
          element.innerHTML = `<div class="fp-error">Error rendering template: ${error.message}</div>`;
          Debug.log(
            Debug.levels.ERROR,
            `Failed to render template: ${error.message}`,
          );
        }
      });
      return _state.instances[instanceName];
    } catch (error) {
      Debug.log(
        Debug.levels.ERROR,
        `Failed to render template: ${error.message}`,
      );
      throw error;
    } finally {
      elements.forEach(function (element) {
        onRendered.call(element);
      });

      EventSystem.publish("afterRender", {
        instanceName,
        template,
        data,
        target,
        elements,
        returnHtml,
      });

      log("Rendered instance: " + instanceName, template, data, target);
      Performance.end("render:" + (instanceName || "anonymous"));
    }
  }
}

// * Register built-in helpers for FlowPlater
registerHelper({
  /* -------------------------------------------------------------------------- */
  /* ANCHOR                          <if> helper                                */
  /* -------------------------------------------------------------------------- */

  if: function (expressionString, options) {
    function resolveValue(token, dataContext, currentContext) {
      // Handle string literals
      if (
        (token.startsWith('"') && token.endsWith('"')) ||
        (token.startsWith("'") && token.endsWith("'"))
      ) {
        return token.slice(1, -1);
      }

      // Handle numeric literals
      if (!isNaN(token)) {
        return parseFloat(token);
      }

      // Handle 'this' references
      if (token === "this") {
        return currentContext;
      }

      if (token.startsWith("this.")) {
        const path = token.split(".").slice(1);
        let value = currentContext;
        for (const part of path) {
          if (value && typeof value === "object" && part in value) {
            value = value[part];
          } else {
            return undefined;
          }
        }
        return value;
      }

      // Handle nested object paths
      const path = token.split(".");
      let value = dataContext;

      for (const part of path) {
        if (value && typeof value === "object" && part in value) {
          value = value[part];
        } else {
          return undefined;
        }
      }

      return value;
    }

    try {
      // Parse expression
      const expression = expressionString.trim();
      const [leftToken, operator, rightToken] = expression.split(
        /\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/,
      );

      if (!leftToken || !operator || !rightToken) {
        throw new TemplateError(`Invalid expression format: ${expression}`);
      }

      // Resolve values
      const leftValue = resolveValue(leftToken, options.data.root, this);
      const rightValue = resolveValue(rightToken, options.data.root, this);

      // Log resolved values for debugging
      Debug.log(Debug.levels.INFO, "Evaluating expression:", {
        raw: expression,
        leftValue,
        operator,
        rightValue,
      });

      // Evaluate the condition first
      const result = compare(leftValue, operator, rightValue);

      // Now execute the appropriate branch, letting any errors propagate up
      if (result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    } catch (error) {
      // Only catch and handle errors related to the condition evaluation itself
      if (error instanceof TemplateError) {
        Debug.log(Debug.levels.ERROR, "Error evaluating if condition:", error);
        throw error; // Re-throw to maintain error state
      }
      Debug.log(Debug.levels.ERROR, "Error in if helper:", error);
      throw error; // Re-throw other errors to maintain error state
    }
  },

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                          <each> helper                              */
  /* -------------------------------------------------------------------------- */

  each: function (context, options) {
    // Accepts an array or object and iterates through it
    // Returns the value of the current iteration
    // Example: {{#each myArray}} returns the current item in the array

    // Allows for optional arguments, e.g. {{#each myArray limit=10 startAt=5}}
    // limit: limit the number of iterations. Leave blank for no limit
    // startAt: start at a specific index
    // sortBy: sort by a key
    // descending: sort descending
    // sortBeforeLimit: sort before limiting (default: true)

    var result = "";
    var limit = options.hash.limit;
    var startAt = options.hash.startAt || 0;
    var key = options.hash.sortBy;
    var descending = options.hash.descending;
    var sortBeforeLimit = options.hash.sortBeforeLimit;
    var inverse = options.inverse;
    var fn = options.fn;
    var data;
    var contextPath;

    sortBeforeLimit =
      typeof sortBeforeLimit === "boolean" ? sortBeforeLimit : true;

    if (options.data && options.ids) {
      contextPath =
        Handlebars.Utils.appendContextPath(
          options.data.contextPath,
          options.ids[0],
        ) + ".";
    }

    if (Handlebars.Utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = Handlebars.createFrame(options.data);
    }

    if (!Array.isArray(context) && typeof context !== "object") {
      return inverse(this);
    }

    var processedArray = Array.isArray(context)
      ? context.slice()
      : Object.entries(context);

    if (limit === undefined) {
      limit = processedArray.length;
    }

    // Apply sorting and limiting logic
    if (sortBeforeLimit) {
      processedArray.sort(sortFunction(key, descending));
      processedArray = processedArray.slice(startAt, limit + startAt);
    } else {
      processedArray = processedArray.slice(startAt, limit + startAt);
      processedArray.sort(sortFunction(key, descending));
    }

    for (var i = 0; i < processedArray.length; i++) {
      var value = Array.isArray(context)
        ? processedArray[i]
        : processedArray[i][1];
      data.key = Array.isArray(context) ? i : processedArray[i][0];
      data.index = i;
      data.first = i === 0;
      data.last = i === processedArray.length - 1;

      if (contextPath) {
        data.contextPath = contextPath + data.key;
      }

      result += fn(value, {
        data: data,
        blockParams: Handlebars.Utils.blockParams(
          [value, data.key],
          [contextPath + data.key, null],
        ),
      });
    }

    if (i === 0) {
      result = inverse(this);
    }

    return result;
  },

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                       <execute> helper                              */
  /* -------------------------------------------------------------------------- */

  execute: function (fn, ...args) {
    // Accepts a function name and arguments
    // Executes the function with the arguments
    // Example: {{execute myFunction arg1 arg2 arg3}} returns myFunction(arg1, arg2, arg3)
    args.pop();

    const fnName = String(fn);
    const functionToExecute = this[fnName] || window[fnName];

    // Execute the function if it exists
    if (typeof functionToExecute === "function") {
      return functionToExecute(...args);
    } else {
      // Log an error if the function is not found
      errorLog("Function not found or is not a function: " + fn);
    }
  },

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                          <sum> helper                               */
  /* -------------------------------------------------------------------------- */

  sum: function () {
    // Accepts multiple arguments, can be either numbers or arrays of numbers
    // Returns the sum of all arguments
    // Example: {{sum 1 2 3 4 5 (array 6 7 8 9 10)}} returns 55
    var sum = 0;
    for (var i = 0; i < arguments.length - 1; i++) {
      var arg = arguments[i];
      if (Array.isArray(arg)) {
        arg.forEach(function (item) {
          sum += item;
        });
      } else {
        sum += arg;
      }
    }
    return sum;
  },

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                         <math> helper                               */
  /* -------------------------------------------------------------------------- */

  math: function (expression, options) {
    // Accepts a math expression and evaluates it
    // Returns the result
    // Example: {{math "1 + 2 * 3"}} returns 7

    // Define operator precedence
    const precedence = {
      "^": 1,
      "*": 2,
      "/": 2,
      "%": 2, // Added "%" operator for remainder
      "+": 3,
      "-": 3,
      min: 4,
      max: 4,
      abs: 4,
    };

    // Tokenize the expression
    const tokens = expression
      .trim()
      .match(/(?!.*\.\.\/)(?:\(|\)|\^|\*|\/|\+|-|min|max|abs|%|\b\S+\b)/g)
      .map((token) => {
        // Resolve context paths like 'this.data' or 'object.sum'
        if (/^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)+$/.test(token)) {
          return token
            .split(".")
            .reduce((acc, part) => acc[part], options.data.root);
        }
        return token;
      });

    // Rest of the math function logic remains the same...
    // (Convert infix to postfix, evaluate postfix expression)

    // Evaluate the postfix expression
    const outputQueue = [];
    const operatorStack = [];
    tokens.forEach((token) => {
      if (token in precedence) {
        while (
          operatorStack.length > 0 &&
          precedence[operatorStack[operatorStack.length - 1]] <=
            precedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      } else if (token === "(") {
        operatorStack.push(token);
      } else if (token === ")") {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          outputQueue.push(operatorStack.pop());
        }
        if (operatorStack.pop() !== "(") {
          throw new TemplateError("Mismatched parentheses"); //!error
        }
      } else {
        outputQueue.push(token);
      }
    });

    while (operatorStack.length > 0) {
      if (["(", ")"].includes(operatorStack[operatorStack.length - 1])) {
        throw new TemplateError("Mismatched parentheses"); //!error
      }
      outputQueue.push(operatorStack.pop());
    }

    // Evaluate the postfix expression
    const stack = [];
    outputQueue.forEach((token) => {
      if (token in precedence) {
        const right = stack.pop();
        const left = stack.pop();
        if (left === undefined || right === undefined) {
          throw new TemplateError(
            `Missing operand! Error in expression: ${left} ${token} ${right}`,
          ); //!error
        }
        stack.push(evaluate(left, token, right));
      } else {
        stack.push(parseFloat(token));
      }
    });

    if (stack.length !== 1) {
      throw new TemplateError("Invalid expression"); //!error
    }

    return stack.pop();
  },

  /* -------------------------------------------------------------------------- */
  /* ANCHOR                        <bunny> helper                               */
  /* -------------------------------------------------------------------------- */

  bunny: function () {
    // Returns a cute bunny
    // It gives out hearts! <3
    // Example: {{bunny}}

    var bunny = `
        &nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>
        ପ(˶•-•˶)ଓ ♡<br>
        &nbsp;&nbsp;&nbsp;/づ  づ
      `;

    var bunnyFlipped = `
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>
        &nbsp;&nbsp;ପ(˶•-•˶)ଓ<br>
        &nbsp;&nbsp;♡じ  じ\\
      `;

    // Create wrapper with unique class for animation targeting
    var wrapper = `<span class="fp-bunny" data-bunny-state="normal">${bunny}</span>`;

    // Add animation script if not already present
    if (!window.bunnyAnimation) {
      window.bunnyAnimation = function () {
        if (window.bunnyAnimationIntervalId) {
          clearInterval(window.bunnyAnimationIntervalId);
        }
        window.bunnyAnimationIntervalId = setInterval(function () {
          document.querySelectorAll(".fp-bunny").forEach(function (element) {
            const currentState = element.getAttribute("data-bunny-state");
            if (currentState === "normal") {
              element.innerHTML = bunnyFlipped;
              element.setAttribute("data-bunny-state", "flipped");
            } else {
              element.innerHTML = bunny;
              element.setAttribute("data-bunny-state", "normal");
            }
          });
        }, 1000);
      };

      // Start animation immediately
      window.bunnyAnimation();
    }

    return new SafeString(wrapper);
  },
});

/* -------------------------------------------------------------------------- */
/* ANCHOR                         <each> sorter                               */
/* -------------------------------------------------------------------------- */

// Sort function used in the while helper
function sortFunction(key, descending) {
  return function (a, b) {
    var left = key && a[key] ? a[key] : a;
    var right = key && b[key] ? b[key] : b;

    if (typeof left === "string" && typeof right === "string") {
      return descending ? right.localeCompare(left) : left.localeCompare(right);
    }

    if (left < right) {
      return descending ? 1 : -1;
    }
    if (left > right) {
      return descending ? -1 : 1;
    }
    return 0;
  };
}

/* -------------------------------------------------------------------------- */
/* ANCHOR                       <math> evaluator                              */
/* -------------------------------------------------------------------------- */

function evaluate(left, operator, right) {
  function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  // Convert strings to numbers if applicable
  if (isNumeric(left)) left = parseFloat(left);
  if (isNumeric(right)) right = parseFloat(right);

  // check if left and right are numbers
  if (typeof left !== "number" || typeof right !== "number") {
    throw new TemplateError("Invalid operands"); //!error
  }
  if (right === 0 && operator === "/") {
    throw new TemplateError(
      "Division by zero. Please do not attempt to create a black hole.",
    ); //!error
  }

  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "^":
      return Math.pow(left, right);
    case "%":
      return left % right;
    case "min":
      return Math.min(left, right);
    case "max":
      return Math.max(left, right);
    case "abs":
      return Math.abs(left);
    default:
      throw new TemplateError("Invalid operator"); //!error
  }
}

/* -------------------------------------------------------------------------- */
/* ANCHOR                         <if> comparer                               */
/* -------------------------------------------------------------------------- */

function compare(left, operator, right) {
  // Convert string numbers to actual numbers for comparison
  if (!isNaN(left)) left = Number(left);
  if (!isNaN(right)) right = Number(right);

  // Function to check if a value is undefined or null
  function isNullOrUndefined(value) {
    return value === null || value === undefined;
  }

  // Handle cases where left or right is undefined or null
  if (isNullOrUndefined(left) || isNullOrUndefined(right)) {
    switch (operator) {
      case "==":
        return left == right;
      case "!=":
        return left != right;
      case "&&":
        return Boolean(left) && Boolean(right);
      case "||":
        return Boolean(left) || Boolean(right);
      default:
        // For other operators, undefined or null values cannot be compared
        return false;
    }
  }

  // If both operands are strings, use localeCompare
  if (typeof left === "string" && typeof right === "string") {
    switch (operator) {
      case "==":
        return left.localeCompare(right) === 0;
      case "!=":
        return left.localeCompare(right) !== 0;
      case "<":
        return left.localeCompare(right) < 0;
      case ">":
        return left.localeCompare(right) > 0;
      case "<=":
        return left.localeCompare(right) <= 0;
      case ">=":
        return left.localeCompare(right) >= 0;
      default:
        throw new TemplateError(
          "Unsupported operator for strings: " + operator,
        ); //!error
    }
  } else {
    // Handle numeric and boolean comparisons
    switch (operator) {
      case "==":
        return left == right;
      case "!=":
        return left != right;
      case "<":
        return left < right;
      case ">":
        return left > right;
      case "<=":
        return left <= right;
      case ">=":
        return left >= right;
      case "&&":
        return Boolean(left) && Boolean(right);
      case "||":
        return Boolean(left) || Boolean(right);
      case "regex":
        return new RegExp(right).test(left);
      default:
        throw new TemplateError("Unsupported operator: " + operator); //!error
    }
  }
}
