import { Calc } from "./jscalc";
import { TemplateError, Debug } from "../../core/Debug";

export function mathHelper() {
  Handlebars.registerHelper("math", function (expression, options) {
    // First, identify and protect function names
    const functionNames = [
      "min",
      "max",
      "sqrt",
      "abs",
      "log",
      "ln",
      "sin",
      "cos",
      "tan",
    ];

    // First pass: resolve forced variable references like @{max}
    const resolvedForced = expression.replace(
      /@{([^}]+)}/g,
      (match, varPath) => {
        try {
          let value;
          if (varPath.includes(".")) {
            value = varPath
              .split(".")
              .reduce((acc, part) => acc[part], options.data.root);
          } else {
            value = options.data.root[varPath] || options.hash[varPath];
          }
          return value;
        } catch (error) {
          console.warn(`Could not resolve ${varPath}`);
          return NaN;
        }
      },
    );

    // Second pass: normal variable resolution with function name protection
    const resolvedExpression = resolvedForced.replace(
      /[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*/g,
      (match) => {
        // Skip if it's a standalone function name (not part of a property path)
        if (functionNames.includes(match) && !match.includes(".")) {
          return match;
        }

        try {
          // Resolve context paths like 'this.data' or 'object.sum'
          let value;
          if (match.includes(".")) {
            value = match
              .split(".")
              .reduce((acc, part) => acc[part], options.data.root);
          } else {
            value = options.data.root[match] || options.hash[match];
          }
          return value;
        } catch (error) {
          console.warn(`Could not resolve ${match}`);
          return NaN;
        }
      },
    );

    Debug.log(Debug.levels.DEBUG, "Evaluating expression:", resolvedExpression);

    try {
      // Evaluate the expression using jscalc
      const c = new Calc();
      const result = c.exec(resolvedExpression);
      return result;
    } catch (error) {
      // Only log and throw once
      if (!(error instanceof TemplateError)) {
        throw new TemplateError(
          `Error evaluating expression: ${error.message}`,
          error.stack,
        );
      }
      throw error; // Re-throw TemplateErrors without wrapping
    }
  });
}
