import { isFunction } from './isFunction.js';

/**
 * Checks if a function is a class constructor
 */
export function isClass(fn) {
  return isFunction(fn) && /^class\s/.test(Function.prototype.toString.call(fn));
};
