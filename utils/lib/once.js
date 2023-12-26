import { on } from './on.js';

export function once(type, target, callback, scope) {

  function listener(event) {
    off();
    callback(event);
  }

  const off = on(type, target, listener, scope);
  return off;
};
