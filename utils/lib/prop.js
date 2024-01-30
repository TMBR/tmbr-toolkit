import { isUndefined } from './isUndefined.js';

export function prop(el, name, value) {
  if (arguments.length < 3) {
    return el.style.getPropertyValue(name);
  } else {
    el.style.setProperty(name, value);
  }
};
