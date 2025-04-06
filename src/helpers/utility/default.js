/**
 * Returns the first non-falsy value from the arguments
 * @param {*} value - The primary value to check
 * @param {*} defaultValue - The fallback value if primary is falsy
 * @returns {*} - The first non-falsy value or the defaultValue
 */
export function defaultHelper() {
  Handlebars.registerHelper("default", function (value, defaultValue) {
    return value || defaultValue;
  });
}
