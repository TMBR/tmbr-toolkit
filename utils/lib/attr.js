import { isBoolean } from './isBoolean.js';

/**
 * Gets, sets or removes an attribute from an element
 *
 * @param el    - element
 * @param name  - attribute name
 * @param value - attribute value
 *
 * @returns value (if getting) or undefined
 */
export function attr(el, name, value) {
  if (arguments.length < 3) {
    return el.getAttribute(name);
  } else if (value) {
    el.setAttribute(name, isBoolean(value) ? '' : value);
  } else {
    el.removeAttribute(name);
  }
};
