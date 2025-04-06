import { compare } from "./compare";
import { Debug, TemplateError } from "../../core/Debug";

export function ifHelper() {
  Handlebars.registerHelper("if", function (expressionString, options) {
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
      Debug.info("Evaluating expression:", {
        raw: expression,
        leftValue,
        operator,
        rightValue,
      });

      // Evaluate the condition
      const result = compare(leftValue, operator, rightValue);

      // Execute the appropriate branch
      if (result) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    } catch (error) {
      // Log the error stack for better debugging
      if (!(error instanceof TemplateError)) {
        Debug.error("Error evaluating if condition:", error.stack);
      }
      throw error; // Re-throw to maintain error state
    }
  });
}
