import { isObject } from './isObject.js';

export function cx(node, ...classes) {

  if (!cx.warned) {
    console.warn('@tmbr/utils: cx will be changing to return a npmjs.com/classnames style string if the first arg is not an element');
    cx.warned = true;
  }

  classes.reduce((res, val) => res.concat(isObject(val)
    ? Object.keys(val).map(c => [c, val[c]])
    : [[val, true]]
  ), []).map(def => node.classList[def[1] ? 'add' : 'remove'](def[0]));
};
