import { on } from './on.js';

/**
 * Wraps [on](#on) to create an event listener that will only fire once
 */
export function once(type, target, callback, scope) {

  function listener(event) {
    off();
    callback(event);
  }

  const off = on(type, target, listener, scope);
  return off;
};
