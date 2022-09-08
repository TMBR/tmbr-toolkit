import { findAll, isFunction, wrap } from '..';

const focusables = [
  'a[href]',
  'audio[controls]',
  'video[controls]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  '[tabindex="0"]:not([disabled])',
  '[contenteditable]',
  'iframe'
].join(', ');

export function trap(node, callback) {

  let elements = findAll(focusables, node);
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
