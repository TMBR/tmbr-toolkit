import { isNumber } from './isNumber.js';

/**
 * Checks if a value is a numeric
 */
export function isNumeric(value) {
  return isNumber(value)
    || /^0x[0-9a-f]+$/i.test(value)
    || (/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/).test(value);
};
