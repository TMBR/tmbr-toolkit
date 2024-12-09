/**
 * Efficiently clears the DOM tree from the target element by removing all children,
 * which is can be significantly faster than using `innerHTML`
 *
 * @example
 * const div = document.querySelector('.example');
 * empty(div).append(fragment);
 */
export function empty(el) {
  while (el.firstChild) el.firstChild.remove();
  return el;
};
