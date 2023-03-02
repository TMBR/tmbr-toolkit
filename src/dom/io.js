import { isUndefined, isFunction } from '..';

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

  console.warn('@tmbr/utils: io function signature will be changing to io(el, {enter, leave, once}, ...rest)');

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
