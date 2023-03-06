import { isFunction } from '..';

export function isClass(fn) {
  return isFunction(fn) && /^class\s/.test(Function.prototype.toString.call(fn));
};
