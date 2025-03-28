import { errorLog } from "../../core/Debug";

export function setHelper() {
  Handlebars.registerHelper("set", function (varName, varValue, options) {
    if (!varName || !varValue) {
      errorLog("setHelper: varName and varValue are required");
      return "";
    }
    //check if varName is a valid variable name
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
      errorLog(`setHelper: varName ${varName} is not a valid variable name`);
      return "";
    }

    options.data.root[varName] = varValue;
  });
}
