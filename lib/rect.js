/**
 * Get the size and position of an element relative to the viewport
 *
 * @param {HTMLElement}
 * @return {DOMRect}
 */
export function rect(el) {
  return el.getBoundingClientRect();
};
