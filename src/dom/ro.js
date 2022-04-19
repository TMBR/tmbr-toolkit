import { isUndefined, isFunction } from '..';

let instance;
let elements;

function handleAll(entries) {
  entries.forEach(handleOne);
}

function handleOne(entry) {
  elements.get(entry.target).forEach(fn => {
    isFunction(fn) && fn(entry);
  });
}

export function ro(el, cb) {

  if (isUndefined(instance)) {
    instance = new ResizeObserver(handleAll);
    elements = new Map();
  }

  if (!elements.has(el)) {
    instance.observe(el);
  }

  const callbacks = elements.get(el) || [];
  callbacks.push(cb);
  elements.set(el, callbacks);

  return () => {

    const index = callbacks.indexOf(cb);
    callbacks.splice(index, 1);

    if (callbacks.length === 0) {
      instance.unobserve(el);
      elements.delete(el);
    }
  }
};
