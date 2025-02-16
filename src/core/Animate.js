export function animate(element, callback) {
  var shouldAnimate =
    element.getAttribute("fp-animation") || _state.defaults.animation;
  if (!shouldAnimate) {
    callback();
    return;
  } else {
    var transition = document.startViewTransition(callback);
  }
}
