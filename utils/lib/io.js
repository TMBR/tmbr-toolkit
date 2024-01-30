import { isFunction } from './isFunction.js';

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
};
