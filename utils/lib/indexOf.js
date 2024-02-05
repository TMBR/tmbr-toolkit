import { toArray } from './toArray.js';

/**
 * Gets the child index of the provided element
 *
 * @param {HTMLElement}
 *
 * @return {number}
 */
export function indexOf(el) {
  return toArray(el.parentNode.children).indexOf(el);
};
