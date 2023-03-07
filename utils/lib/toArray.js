import { isArray } from './isArray.js';

export function toArray(value) {
  return isArray(value) ? value : (
    value instanceof NodeList ||
    value instanceof DOMTokenList ||
    value instanceof HTMLCollection
  ) ? Array.from(value) : [value];
};
