import { evaluate } from "./evaluate";
import { TemplateError } from "../../core/Debug.js";

export function mathHelper() {
  Handlebars.registerHelper("math", function (expression, options) {
    // Accepts a math expression and evaluates it
    // Returns the result
    // Example: {{math "1 + 2 * 3"}} returns 7
    // Define operator precedence
    const precedence = {
      "^": 1,
      "*": 2,
      "/": 2,
      "%": 2,
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

    // Convert infix to postfix and evaluate
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
  });
}
