import { isFunction } from './isFunction.js';

/**
 * Combines functions into a single callback
 *
 * @param fns - individual function arguments
 */
export function combine(...fns) {
  return (...args) => fns.forEach(fn => isFunction(fn) && fn(...args));
};
