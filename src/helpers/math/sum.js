export function sumHelper() {
  Handlebars.registerHelper("sum", function () {
    // Accepts multiple arguments, can be either numbers or arrays of numbers
    // Returns the sum of all arguments
    // Example: {{sum 1 2 3 4 5 (array 6 7 8 9 10)}} returns 55
    var sum = 0;
    for (var i = 0; i < arguments.length - 1; i++) {
      var arg = arguments[i];
      if (Array.isArray(arg)) {
        arg.forEach(function (item) {
          sum += item;
        });
      } else {
        sum += arg;
      }
    }
    return sum;
  });
}
