import { isElement } from './isElement.js';
import { isObject } from './isObject.js';
import { isString } from './isString.js';
import { isArray } from './isArray.js';

/**
 * Conditionally toggles classes on an element or generates a string of classes,
 * similar to {@link https://www.npmjs.com/package/classnames classnames})
 */
export function cx(...args) {

  const node = isElement(args[0]) ? args.shift() : null;

  if (node && args.length === 0) {
    return node.classList;
  }

  const classes = args.reduce((result, item) => {
    if (isArray(item))  item = item.filter(Boolean).map(value => [value, true]);
    if (isObject(item)) item = Object.entries(item);
    if (isString(item)) item = [[item, true]];
    return item ? result.concat(item) : result;
  }, []);

  return node
    ? classes.forEach(([name, bool]) => node.classList[bool ? 'add' : 'remove'](name))
    : classes.filter (([name, bool]) => bool).map(([name]) => name).join(' ');
};
