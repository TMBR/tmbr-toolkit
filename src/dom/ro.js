import { isUndefined, isFunction } from '..';

let instance;
let map;

function handleAll(entries) {
  entries.forEach(handleOne);
}

function handleOne(entry) {
  map.get(entry.target).forEach(fn => {
    isFunction(fn) && fn(entry);
  });
}

export function ro(el, cb) {

  if (isUndefined(instance)) {
    instance = new ResizeObserver(handleAll);
    map = new Map();
  }

  if (!map.has(el)) {
    instance.observe(el);
  }

  const callbacks = map.get(el) || [];
  callbacks.push(cb);
  map.set(el, callbacks);

  return () => {

    const index = callbacks.indexOf(cb);
    callbacks.splice(index, 1);

    if (callbacks.length === 0) {
      instance.unobserve(el);
      map.delete(el);
    }
  }
};
