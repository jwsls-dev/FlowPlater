export function bunnyHelper() {
  Handlebars.registerHelper("bunny", function () {
    // Returns a cute bunny
    // It gives out hearts! <3
    // Example: {{bunny}}

    var bunny = `
        &nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>
        ପ(˶•-•˶)ଓ ♡<br>
        &nbsp;&nbsp;&nbsp;/づ  づ
      `;

    var bunnyFlipped = `
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>
        &nbsp;&nbsp;ପ(˶•-•˶)ଓ<br>
        &nbsp;&nbsp;♡じ  じ\\
      `;

    // Create wrapper with unique class for animation targeting
    var wrapper = `<span class="fp-bunny" data-bunny-state="normal">${bunny}</span>`;

    // Add animation script if not already present
    if (!window.bunnyAnimation) {
      window.bunnyAnimation = function () {
        if (window.bunnyAnimationIntervalId) {
          clearInterval(window.bunnyAnimationIntervalId);
        }
        window.bunnyAnimationIntervalId = setInterval(function () {
          document.querySelectorAll(".fp-bunny").forEach(function (element) {
            const currentState = element.getAttribute("data-bunny-state");
            if (currentState === "normal") {
              element.innerHTML = bunnyFlipped;
              element.setAttribute("data-bunny-state", "flipped");
            } else {
              element.innerHTML = bunny;
              element.setAttribute("data-bunny-state", "normal");
            }
          });
        }, 1000);
      };

      // Start animation immediately
      window.bunnyAnimation();
    }

    return new Handlebars.SafeString(wrapper);
  });
}
