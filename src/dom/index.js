/**
 * Get the index of the provided element
 *
 * @param {HTMLElement}
 * @return {number}
 */
export function index(el) {
  return Array.from(el.parentNode.children).indexOf(el);
};
