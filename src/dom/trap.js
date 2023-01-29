import { findAll, isFunction, wrap, focusables } from '..';

export function trap(node, callback) {

  let elements = findAll(focusables.join(','), node);
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
  return () => window.removeEventListener('keydown', keydown);
};
