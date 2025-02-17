/**
 * Registers a Handlebars helper that creates an animated bunny ASCII art.
 * The bunny alternates between two states: normal and flipped.
 *
 * Requirements:
 * - Handlebars must be loaded globally before calling this function
 * - Runs in browser environment (uses window and document)
 *
 * The helper creates:
 * - Global window.bunnyStates object storing ASCII art variants
 * - Global window.bunnyAnimation function managing animation
 * - Global window.bunnyAnimationIntervalId for animation control
 *
 * Usage in Handlebars template:
 * {{bunny}}
 *
 * @returns {void}
 */
export function bunnyHelper() {
  if (typeof Handlebars === "undefined") {
    console.error("Handlebars is not loaded yet!");
    return;
  }

  // Only register once
  if (Handlebars.helpers.bunny) {
    return;
  }

  const bunny = `
    &nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>
    ପ(˶•-•˶)ଓ ♡<br>
    &nbsp;&nbsp;&nbsp;/づ  づ
  `;

  const bunnyFlipped = `
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>
    &nbsp;&nbsp;ପ(˶•-•˶)ଓ<br>
    &nbsp;&nbsp;♡じ  じ\\
  `;

  // Store bunny states globally
  window.bunnyStates = {
    bunny,
    bunnyFlipped,
  };

  // Initialize animation function
  window.bunnyAnimation = function () {
    if (window.bunnyAnimationIntervalId) {
      clearInterval(window.bunnyAnimationIntervalId);
    }
    window.bunnyAnimationIntervalId = setInterval(function () {
      document.querySelectorAll(".fp-bunny").forEach(function (element) {
        const currentState = element.getAttribute("data-bunny-state");
        if (currentState === "normal") {
          element.innerHTML = window.bunnyStates.bunnyFlipped;
          element.setAttribute("data-bunny-state", "flipped");
        } else {
          element.innerHTML = window.bunnyStates.bunny;
          element.setAttribute("data-bunny-state", "normal");
        }
      });
    }, 1000);
  };

  // Register the helper
  Handlebars.registerHelper("bunny", function () {
    const wrapper = `<span class="fp-bunny" data-bunny-state="normal">${window.bunnyStates.bunny}</span>`;

    // Start animation on next tick
    setTimeout(window.bunnyAnimation, 0);

    return new Handlebars.SafeString(wrapper);
  });

  // Start animation if there are already bunnies on the page
  if (document.querySelectorAll(".fp-bunny").length > 0) {
    window.bunnyAnimation();
  }
}
