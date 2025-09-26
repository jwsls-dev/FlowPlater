import { compare } from "./_compare";
import { Debug, TemplateError } from "../../core/Debug";
import { DEFAULTS } from "../../core/DefaultConfig";
import { verifyContext } from "../utility/VerifyContext";

export function resolveValue(token: string, dataContext: any, currentContext: any) {
  if (
    (token.startsWith('"') && token.endsWith('"')) ||
    (token.startsWith("'") && token.endsWith("'"))
  ) {
    return token.slice(1, -1);
  }

  if (!isNaN(Number(token))) {
    return parseFloat(token);
  }

  if (token === "this") {
    return currentContext;
  }

  if (token.startsWith("this.")) {
    const path = token.split(".").slice(1);
    let value: any = currentContext;
    for (const part of path) {
      if (value && typeof value === "object") {
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

  const path = token.split(".");
  let value: any = dataContext;

  for (const part of path) {
    if (value && typeof value === "object") {
      if (Object.prototype.hasOwnProperty.call(value, part)) {
        value = value[part];
        continue;
      }
      verifyContext(part, value, dataContext, currentContext);
      return undefined;
    } else {
      return undefined;
    }
  }

  return value;
}

export function evaluateConditionString(expressionString: string, options: any, currentContext: any): boolean {
  try {
    if (!expressionString.match(/\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/)) {
      const value = resolveValue(expressionString, options.data.root, currentContext);
      return Boolean(value);
    }

    const expression = expressionString.trim();
    let [leftToken, operator, rightToken] = expression.split(
      /\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/,
    );

    if (!leftToken || (operator && !rightToken) || (!leftToken && operator)) {
      throw new TemplateError(`Invalid expression format: ${expression}`);
    }

    const leftValue = resolveValue(leftToken, options.data.root, currentContext);
    const rightValue = rightToken ? resolveValue(rightToken, options.data.root, currentContext) : true;

    operator = operator || DEFAULTS.HELPERS.COMPARISON.DEFAULT_OPERATOR;

    Debug.info("Evaluating expression:", {
      raw: expression,
      leftValue,
      operator,
      rightValue,
    });

    if (operator === "==" && !rightToken) {
      return leftValue !== undefined;
    }

    return compare(leftValue, operator, rightValue);
  } catch (error: any) {
    if (!(error instanceof TemplateError)) {
      Debug.error("Error evaluating condition:", error.stack);
    }
    throw error;
  }
}


