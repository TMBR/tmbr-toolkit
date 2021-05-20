import { isFunction, isUndefined } from '../';

/**
 * Bind functions to a context or class instance
 *
 * @param  {object}
 * @param  {array}
 * @return {void}
 */
export function bind(context, fns) {
  fns = isUndefined(fns)
    ? Object.getOwnPropertyNames(context).filter(isFunction)
    : [].concat(fns);
  fns.forEach(fn => context[fn] = context[fn].bind(context));
};
