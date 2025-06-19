import { sortFunction } from "./_sort";
import { DEFAULTS } from "../../core/DefaultConfig";

export function eachHelper() {
  const Handlebars = (window as any).Handlebars;
  Handlebars.unregisterHelper("each");
  Handlebars.registerHelper("each", function (this: any, context: any, options: any) {
    // Accepts an array or object and iterates through it
    // Returns the value of the current iteration
    // Example: {{#each myArray}} returns the current item in the array

    // Allows for optional arguments, e.g. {{#each myArray limit=10 startAt=5}}
    // limit: limit the number of iterations. Leave blank for no limit
    // startAt: start at a specific index
    // sortBy: sort by a key
    // descending: sort descending
    // sortBeforeLimit: sort before limiting (default: true)

    var result = "";
      var limit = options.hash.limit || undefined;
  var startAt = options.hash.startAt || DEFAULTS.HELPERS.EACH.START_AT;
  var key = options.hash.sortBy || DEFAULTS.HELPERS.EACH.SORT_KEY;
  var descending = options.hash.descending || DEFAULTS.HELPERS.EACH.DESCENDING;
  var sortBeforeLimit = options.hash.sortBeforeLimit || DEFAULTS.HELPERS.EACH.SORT_BEFORE_LIMIT;
    var inverse = options.inverse;
    var fn = options.fn;
    var data;
    var contextPath;

    // convert map to array if it exists
    if (context instanceof Map) {
      context = Array.from(context.values());
    }

    sortBeforeLimit =
      typeof sortBeforeLimit === "boolean" ? sortBeforeLimit : true;

    if (options.data && options.ids) {
      contextPath = (options.data.contextPath || "") + options.ids[0] + ".";
    }

    if (Handlebars.Utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = Handlebars.createFrame(options.data);
    }

    if (!Array.isArray(context) && typeof context !== "object") {
      return inverse(this);
    }

    var processedArray = Array.isArray(context)
      ? context.slice()
      : Object.entries(context);

    if (limit === undefined) {
      limit = processedArray.length;
    }

    // Apply sorting and limiting logic
    if (sortBeforeLimit) {
      processedArray.sort(sortFunction(key, descending));
      processedArray = processedArray.slice(startAt, limit + startAt);
    } else {
      processedArray = processedArray.slice(startAt, limit + startAt);
      processedArray.sort(sortFunction(key, descending));
    }

    for (var i = 0; i < processedArray.length; i++) {
      var value = Array.isArray(context)
        ? processedArray[i]
        : processedArray[i][1];
      data.key = Array.isArray(context) ? i : processedArray[i][0];
      data.index = i;
      data.first = i === 0;
      data.last = i === processedArray.length - 1;

      if (contextPath) {
        data.contextPath = contextPath + data.key;
      }

      result += fn(value, {
        data: data,
        blockParams: Handlebars.Utils.blockParams(
          [value, data.key],
          [contextPath + data.key, null],
        ),
      });
    }

    if (i === 0) {
      result = inverse(this);
    }

    return result;
  });
}
