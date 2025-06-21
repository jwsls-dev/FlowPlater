import { Debug } from "../../core/Debug";

export function setHelper() {
  const Handlebars = window.Handlebars;
  Handlebars.registerHelper("set", function (this: Handlebars.HelperDelegate, varName: string, varValue: any, options: any) {
    if (!varName || !varValue) {
      Debug.error("setHelper: varName and varValue are required");
      return "";
    }
    //check if varName is a valid variable name
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(varName)) {
      Debug.error(`setHelper: varName ${varName} is not a valid variable name`);
      return "";
    }

    options.data.root[varName] = varValue;
  });
}
