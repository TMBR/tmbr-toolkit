import { isUndefined } from './isUndefined.js';

/**
 * Checks if a value is defined (opposite of [isUndefined](#isUndefined))
 */
export function isDefined(value) {
  return !isUndefined(value);
};
