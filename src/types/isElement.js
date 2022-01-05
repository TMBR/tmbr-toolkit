import { isString } from '..';

export function isElement(value, tag) {
  return !!(value && (isString(tag)
    ? value.nodeName === tag.toUpperCase()
    : value.nodeType === 1
  ));
};
