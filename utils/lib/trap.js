import { findAll } from './findAll.js';
import { focusables } from './focusables.js';
import { isFunction } from './isFunction.js';
import { wrap } from './wrap.js';

/**
 * Traps focus on the given element with an optional callback to modify the array of [focusable](#focusables) elements
 *
 * @return function to untrap
 */
export function trap(el, callback) {

  const previous = document.activeElement;

  let elements = findAll(focusables.join(','), el);
  if (isFunction(callback)) elements = callback(elements);

  elements[0].focus();
  let index = 0;

  function keydown(event) {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    index = wrap(event.shiftKey ? index - 1 : index + 1, elements);
    elements[index].focus();
  }

  window.addEventListener('keydown', keydown);

  return () => {
    window.removeEventListener('keydown', keydown);
    previous?.focus();
  };
};
