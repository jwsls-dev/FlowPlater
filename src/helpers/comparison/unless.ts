import { evaluateConditionString } from "./condition";

export function unlessHelper() {
  const Handlebars = window.Handlebars;
  Handlebars.unregisterHelper("unless");
  Handlebars.registerHelper("unless", function (this: Handlebars.HelperDelegate, expressionString: string, options: any) {
    const result = evaluateConditionString(expressionString, options, this);
    return result ? options.inverse(this) : options.fn(this);
  });
}


