$(document).ready(function () {
  // Define an array of strings to match
  var containsStrings;

  var storedArray = localStorage.getItem("containsStrings");
  if (storedArray) {
    containsStrings = JSON.parse(storedArray);
  } else {
    containsStrings = [
      "Each",
      "If",
      "Else",
      "Unless",
      "With",
      "Math",
      "Bunny",
      "Template",
      "fp-template",
      "Execute",
      "Sum",
      "Lookup",
      "Log",
      "Toast",
      "Comment",
    ];
  }

  // Append the style only once
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
        .fp-element-highlight {
            content: "";
            width: 100%;
            height: calc(100% - 2px);
            background-color: rgba(197, 66, 66, 0.12);
            border: rgba(197, 66, 66, 1) 1px solid;
            border-radius: 4px;
            left: -1rem;
            top: 1px;
            bottom: 1px;
            right: 0px;
            position: absolute;
            pointer-events: none;
        }
    `,
    )
    .appendTo("head");

  // Function to apply styles and prepend the highlight element
  function applyStyles(element) {
    element
      .css({
        color: "rgba(197, 66, 66, 1)",
        position: "relative",
        overflow: "visible",
      })
      .parent()
      .css({ overflow: "visible", "font-weight": "700" })
      .parent()
      .css("overflow", "visible")
      .find("svg")
      .css("color", "rgba(197, 66, 66, 1)");

    if (element.children(".fp-element-highlight").length === 0) {
      element.prepend('<div class="fp-element-highlight"></div>');
    }
  }

  function removeStyles(element) {
    element.find(".fp-element-highlight").remove();
    element.css({
      color: "", // Reset to default
      position: "", // Reset to default
      overflow: "", // Reset to default
    });
    element.parent().css({ overflow: "", "font-weight": "400" }); // Reset parent overflow
    element.parent().parent().css("overflow", ""); // Reset grandparent overflow
    element.parent().find("svg").css("color", ""); // Reset SVG color
  }

  // Function to check and apply styles
  function checkAndApplyStyles() {
    // Iterate over children of #react-navigator
    $(
      "#react-navigator div:not([data-depth],[data-automation-id],:empty)",
    ).each(function () {
      // Get direct text content of the div
      var directTextContent = $(this)
        .contents()
        .filter(function () {
          return this.nodeType === 3; // Node type 3 is a text node
        });

      // Check if there is direct text content
      if (directTextContent.length > 0) {
        var directText = directTextContent.text().trim().toLowerCase(); // Trim whitespace and convert to lowercase

        // Check if the direct text is an exact match with any of the strings in containsStrings
        var isExactMatch = containsStrings.some(function (string) {
          return directText === string.toLowerCase();
        });

        if (isExactMatch) {
          // Apply styles if there's an exact match
          applyStyles($(this).parent());
        } else {
          // Remove styles and .fp-element-highlight element if the string no longer matches
          removeStyles($(this).parent());
        }
      }
    });
  }

  // Mutation Observer to watch for changes in #react-navigator
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        checkAndApplyStyles();
      }
    });
  });

  // Configuration of the observer
  var observerConfig = {
    childList: true,
    subtree: true,
  };

  // Start observing #react-navigator for configured mutations
  var targetNode = document.getElementById("react-navigator");
  if (targetNode) {
    observer.observe(targetNode, observerConfig);
  }

  setInterval(checkAndApplyStyles, 250);

  function waitForElement() {
    var checkExist = setInterval(function () {
      var targetNode = document.getElementById("react-navigator");
      if (targetNode) {
        clearInterval(checkExist);
        // Set up your MutationObserver here
        observer.observe(targetNode, observerConfig);
      }
    }, 100); // check every 100ms
  }

  waitForElement();

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.action === "addString") {
        containsStrings.push(request.string);
        localStorage.setItem(
          "containsStrings",
          JSON.stringify(containsStrings),
        );
        // Update DOM or perform actions as necessary
        sendResponse({ updatedArray: containsStrings });
      } else if (request.action === "removeString") {
        const index = containsStrings.indexOf(request.string);
        if (index > -1) {
          containsStrings.splice(index, 1);
          // Update DOM or perform actions as necessary
        }
        localStorage.setItem(
          "containsStrings",
          JSON.stringify(containsStrings),
        );
      } else if (request.action === "toggleHighlight") {
        const highlights = document.querySelectorAll(".fp-element-highlight");
        highlights.forEach((el) => {
          el.style.display = request.status ? "block" : "none";
        });
      } else if (request.action === "getStringArray") {
        sendResponse({ updatedArray: containsStrings });
      }
    },
  );
});
