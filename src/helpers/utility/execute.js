import { Debug } from "../../core/Debug";

export function executeHelper() {
  Handlebars.registerHelper("execute", function (fn, ...args) {
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
      Debug.error("Function not found or is not a function: " + fn);
    }
  });
}
