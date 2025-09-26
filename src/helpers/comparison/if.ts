import { evaluateConditionString } from "./condition";

export function ifHelper() {
  const Handlebars = window.Handlebars;
  Handlebars.unregisterHelper("if");
  Handlebars.registerHelper("if", function (this: Handlebars.HelperDelegate, expressionString: string, options: any) {
    const result = evaluateConditionString(expressionString, options, this);
    return result ? options.fn(this) : options.inverse(this);
  });
}
