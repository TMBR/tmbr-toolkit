import { isArray } from './isArray.js';

/**
 * Checks if a value is an object (and not an array or {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null null})
 */
export function isObject(value) {
  return typeof value === 'object' && value !== null && !isArray(value);
};
