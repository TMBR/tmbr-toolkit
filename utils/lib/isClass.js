import { isFunction } from './isFunction.js';

/**
 * Checks if a function is a class constructor
 */
export function isClass(fn) {
  return isFunction(fn) && fn.prototype?.constructor.toString().startsWith('class');
};
