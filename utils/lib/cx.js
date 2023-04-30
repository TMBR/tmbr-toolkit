import { isElement } from './isElement.js';
import { isObject } from './isObject.js';
import { isString } from './isString.js';
import { isArray } from './isArray.js';

export function cx(...args) {

  const node = isElement(args[0]) ? args.shift() : null;

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
