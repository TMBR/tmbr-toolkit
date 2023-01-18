import { isBoolean } from '..';

export function attr(el, name, value) {
  if (arguments.length < 3) {
    return el.getAttribute(name);
  } else if (value) {
    el.setAttribute(name, isBoolean(value) ? '' : value);
  } else {
    el.removeAttribute(name);
  }
  return value;
};
