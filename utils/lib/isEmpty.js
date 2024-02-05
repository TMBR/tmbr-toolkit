import { isArray } from './isArray.js';
import { isObject } from './isObject.js';
import { isString } from './isString.js';
import { isUndefined } from './isUndefined.js';

/**
 * Checks if a value is:
 *
 * - `undefined`, `null`, `false` or `0`
 * - an array or string with a length of 0
 * - an object without keys
 */
export function isEmpty(value) {

  if (isUndefined(value) || value === null || value === false || value === 0) {
    return true;
  }
  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }
  if (isObject(value)) {
    return value.constructor === Object && Object.keys(value).length === 0;
  }

  return false;
};
