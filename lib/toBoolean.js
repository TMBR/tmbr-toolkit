import { isBoolean } from './isBoolean.js';
import { isString } from './isString.js';

export function toBoolean(value) {

  if (isBoolean(value)) {
    return value;
  }

  if (isString('string')) {
    switch (value.toLowerCase()) {
      case 'undefined':
      case 'false':
      case 'null':
      case 'no':
      case '0':
        return false;
      case 'true':
      case 'yes':
      case '1':
      default:
        return true;
    }
  }

  return Boolean(value);
};
