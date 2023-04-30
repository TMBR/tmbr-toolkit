// TODO: use this with 2.0 release

/* import { isFunction } from './isFunction.js';

export function io(el, {enter, leave, once = false, ...rest}) {

  const observer = new IntersectionObserver(([entry]) => {

    if (entry.isIntersecting) {
      isFunction(enter) && enter(entry);
      once && unobserve();
    } else {
      isFunction(leave) && leave(entry);
    }

  }, rest);

  observer.observe(el);

  const unobserve = () => observer.disconnect();
  return unobserve;
}; */

import { isFunction } from './isFunction.js';
import { isUndefined } from './isUndefined.js';

let instance;
let map;

function handleAll(entries) {
  entries.forEach(handleOne);
}

function handleOne(entry) {
  map.get(entry.target).forEach(obj => {
    entry.isIntersecting ? obj.enter(entry) : obj.leave(entry);
  });
}

export function io(el, enter, leave, once = false) {

  if (!io.warned) {
    console.warn('@tmbr/utils: io function signature will be changing to io(el, {enter, leave, once}, ...rest)');
    io.warned = true;
  }

  if (isUndefined(instance)) {
    instance = new IntersectionObserver(handleAll);
    map = new Map();
  }

  if (!map.has(el)) {
    instance.observe(el);
  }

  const obj = {
    enter: entry => {
      isFunction(enter) && enter(entry);
      once && unobserve();
    },
    leave: entry => {
      isFunction(leave) && leave(entry);
    }
  };

  const callbacks = map.get(el) || [];
  callbacks.push(obj);
  map.set(el, callbacks);

  const unobserve = () => {

    const index = callbacks.indexOf(obj);
    callbacks.splice(index, 1);

    if (callbacks.length === 0) {
      instance.unobserve(el);
      map.delete(el);
    }
  };

  return unobserve;
};
