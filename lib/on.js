export function on(type, selector, callback, scope = document) {

  let match;

  function listener(event) {
    match = event.bubbles
      ? event.target.closest && event.target.closest(selector)
      : event.target.matches && event.target.matches(selector);
    match && callback(event);
  }

  scope.addEventListener(type, listener, true);
  return () => scope.removeEventListener(type, listener, true);
};
