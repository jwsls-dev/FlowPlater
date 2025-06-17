import { Calc } from "./_jscalc";
import { TemplateError, Debug } from "../../core/Debug";

export function mathHelper() {
  const Handlebars = (window as any).Handlebars;
  Handlebars.registerHelper("math", function (this: any, expression: string, options: any) {
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
      // @ts-ignore
      (match: string, varPath: string) => {
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
      (match: string) => {
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
              .reduce((acc: any, part: any) => acc[part], options.data.root);
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

    Debug.debug("Evaluating expression:", resolvedExpression);

    try {
      // Evaluate the expression using jscalc
      const c = new Calc();
      const result = c.exec(resolvedExpression);
      return result;
    } catch (error: any) {
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
