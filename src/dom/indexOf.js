/**
 * Get the index of the provided element
 *
 * @param {HTMLElement}
 * @return {number}
 */
export function indexOf(el) {
  return Array.from(el.parentNode.children).indexOf(el);
};
