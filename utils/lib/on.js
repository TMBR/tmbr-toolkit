import { isEmpty } from './isEmpty.js';
import { isString } from './isString.js';

/**
 * Adds an event listener to a target element or array of elements, or creates a delegate listener for the target selector string
 *
 * @param event    - name of event (or multiple events separated by spaces)
 * @param target   - target element, array of elements or a CSS selector for event delegation
 * @param callback - callback function
 * @param scope    - optional parent scope
 *
 * @returns function to remove all listeners
 */
export function on(type, target, callback, scope = document) {

  const controller = new AbortController();
  const signal = controller.signal;
  const events = type.split(' ');

  if (isString(target)) {

    const selector = target;

    function listener(event) {
      const match = event.bubbles
        ? event.target.closest?.(selector)
        : event.target.matches?.(selector);

      if (isEmpty(match)) {
        return;
      }
      if (event.bubbles && !event.target.matches(selector)) {
        Object.defineProperty(event, 'target', {enumerable: true, value: match});
      }

      callback(event);
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
