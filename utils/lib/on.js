import { isString } from './isString.js';

export function on(type, target, callback, scope = document) {

  const controller = new AbortController();
  const signal = controller.signal;
  const events = type.split(' ');

  if (isString(target)) {

    const selector = target;

    function listener(event) {
      const match = event.bubbles
        ? event.target.closest && event.target.closest(selector)
        : event.target.matches && event.target.matches(selector);
      match && callback(event);
    }

    events.forEach(e => {
      scope.addEventListener(e, listener, {signal, capture: true});
    });

  } else {

    const elements = [].concat(target);

    events.forEach(e => {
      elements.forEach(el => el.addEventListener(e, callback, {signal}));
    });
  }

  return () => controller.abort();
};
