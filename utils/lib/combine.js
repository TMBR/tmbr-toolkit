import { isFunction } from './isFunction.js';

export function combine(...fns) {
  return (...args) => fns.forEach(fn => isFunction(fn) && fn(...args));
};
