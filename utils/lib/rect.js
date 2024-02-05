/**
 * Gets the size and position of an element relative to the viewport using {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect getBoundingClientRect}
 *
 * @param {HTMLElement}
 *
 * @return {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMRect DOMRect}
 */
export function rect(el) {
  return el.getBoundingClientRect();
};
