import { isString } from './isString.js';

/**
 * Checks if a value is a DOM element, or if an element is a specific tag
 */
export function isElement(value, tag) {
  return !!(value && (isString(tag)
    ? value.nodeName === tag.toUpperCase()
    : value.nodeType === 1
  ));
};
