import { isFunction } from './isFunction.js';

/**
 * Tracks enter and leave events on the provided element
 *
 * @param el      - element to observe
 * @param options - object with optional `enter` and `leave` callbacks, `once` boolean and `...rest` args passed to the underlying {@link https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver IntersectionObserver}
 *
 * @return unobserve cleanup function
 */
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
