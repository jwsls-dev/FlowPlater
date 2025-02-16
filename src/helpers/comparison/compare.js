import { TemplateError } from "../../core/Debug.js";

export function compare(left, operator, right) {
  // Convert string numbers to actual numbers for comparison
  if (!isNaN(left)) left = Number(left);
  if (!isNaN(right)) right = Number(right);

  function isNullOrUndefined(value) {
    return value === null || value === undefined;
  }

  // Handle null/undefined comparisons
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
        return false;
    }
  }

  // String comparisons
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
        );
    }
  }

  // Numeric and boolean comparisons
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
      throw new TemplateError("Unsupported operator: " + operator);
  }
}
