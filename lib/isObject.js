import { isArray } from './isArray.js';

export function isObject(value) {
  return typeof value === 'object' && value !== null && !isArray(value);
};
