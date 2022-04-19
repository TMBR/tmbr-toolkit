import { isUndefined, isFunction } from '..';

let instance;
let elements;

function handleAll(entries) {
  entries.forEach(handleOne);
}

function handleOne(entry) {
  elements.get(entry.target).forEach(obj => {
    entry.isIntersecting ? obj.enter(entry) : obj.leave(entry);
  });
}

export function io(el, enter, leave, once = false) {

  if (isUndefined(instance)) {
    instance = new IntersectionObserver(handleAll);
    elements = new Map();
  }

  if (!elements.has(el)) {
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

  const callbacks = elements.get(el) || [];
  callbacks.push(obj);
  elements.set(el, callbacks);

  const unobserve = () => {

    const index = callbacks.indexOf(obj);
    callbacks.splice(index, 1);

    if (callbacks.length === 0) {
      instance.unobserve(el);
      elements.delete(el);
    }
  };

  return unobserve;
};
