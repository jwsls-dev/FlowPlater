export function evaluate(left, operator, right) {
  function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  // Convert strings to numbers if applicable
  if (isNumeric(left)) left = parseFloat(left);
  if (isNumeric(right)) right = parseFloat(right);

  // check if left and right are numbers
  if (typeof left !== "number" || typeof right !== "number") {
    throw new Error("Invalid operands");
  }
  if (right === 0 && operator === "/") {
    throw new Error(
      "Division by zero. Please do not attempt to create a black hole.",
    );
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
      throw new Error("Invalid operator");
  }
}
