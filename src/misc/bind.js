import { isFunction, isUndefined } from '..';

/**
 * Bind functions to a context or class instance
 *
 * @param  {object}
 * @param  {array}
 * @return {void}
 */
export function bind(self, fns) {
  fns = isUndefined(fns)
    ? Object.getOwnPropertyNames(Object.getPrototypeOf(self))
    : [].concat(fns);
  fns.forEach(fn => isFunction(self[fn]) && (self[fn] = self[fn].bind(self)));
}
