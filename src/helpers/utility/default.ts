
/**
 * Returns the first non-falsy value from the arguments
 * @param {*} value - The primary value to check
 * @param {*} defaultValue - The fallback value if primary is falsy
 * @returns {*} - The first non-falsy value or the defaultValue
 */
export function defaultHelper() {
  const Handlebars = window.Handlebars;
  Handlebars.registerHelper("default", function (this: Handlebars.HelperDelegate, value: any, defaultValue: any) {
    return value || defaultValue;
  });
}
