import { compare } from "./_compare";
import { Debug, TemplateError } from "../../core/Debug";

export function ifHelper() {
  const Handlebars = (window as any).Handlebars;
  Handlebars.unregisterHelper("if");
  Handlebars.registerHelper("if", function (this: any, expressionString: string, options: any) {
    function resolveValue(token: string, dataContext: any, currentContext: any) {
      // Handle string literals
      if (
        (token.startsWith('"') && token.endsWith('"')) ||
        (token.startsWith("'") && token.endsWith("'"))
      ) {
        return token.slice(1, -1);
      }

      // Handle numeric literals
      if (!isNaN(Number(token))) {
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
          if (value && typeof value === "object") {
            // Check if property exists using hasOwnProperty
            if (Object.prototype.hasOwnProperty.call(value, part)) {
              value = value[part];
            } else {
              return undefined;
            }
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
        if (value && typeof value === "object") {
          // Check if property exists using hasOwnProperty
          if (Object.prototype.hasOwnProperty.call(value, part)) {
            value = value[part];
            // Property exists, return the value even if falsy
            continue;
          }
          return undefined;
        } else {
          return undefined;
        }
      }

      return value;
    }

    try {
      // If expressionString is a simple property name (no operators)
      if (!expressionString.match(/\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/)) {
        // Get the value and check if property exists
        const value = resolveValue(expressionString, options.data.root, this);
        // Return true if the property exists, regardless of its value
        return value !== undefined ? options.fn(this) : options.inverse(this);
      }

      // Parse expression for complex conditions
      const expression = expressionString.trim();
      let [leftToken, operator, rightToken] = expression.split(
        /\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/,
      );

      if (!leftToken || (operator && !rightToken) || (!leftToken && operator)) {
        throw new TemplateError(`Invalid expression format: ${expression}`);
      }

      // Resolve values
      const leftValue = resolveValue(leftToken, options.data.root, this);
      const rightValue = rightToken
        ? resolveValue(rightToken, options.data.root, this)
        : true;

      operator = operator || "==";

      // Log resolved values for debugging
      Debug.info("Evaluating expression:", {
        raw: expression,
        leftValue,
        operator,
        rightValue,
      });

      // Special handling for existence checks
      if (operator === "==" && !rightToken) {
        return leftValue !== undefined
          ? options.fn(this)
          : options.inverse(this);
      }

      // Evaluate the condition
      const result = compare(leftValue, operator, rightValue);

      // Execute the appropriate branch
      if (result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    } catch (error: any) {
      // Log the error stack for better debugging
      if (!(error instanceof TemplateError)) {
        Debug.error("Error evaluating if condition:", error.stack);
      }
      throw error; // Re-throw to maintain error state
    }
  });
}
