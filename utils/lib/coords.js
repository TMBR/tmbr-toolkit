import { isElement } from './isElement.js';

/**
 * Gets the x and y coordinates of a pointer event,
 * optionally relative to a target element
 *
 * @param event  - event object
 * @param target - optional target element
 *
 * @return object with x and y properties
 */
export function coords(event, target) {

  const point = {
    x: event.touches?.[0].pageX || event.clientX,
    y: event.touches?.[0].pageY || event.clientY
  };

  if (isElement(target)) {
    const rect = target.getBoundingClientRect();
    point.x -= rect.left;
    point.y -= rect.top;
    point.px = point.x / (rect.right - rect.left);
    point.py = point.y / (rect.bottom - rect.top);
  }

  return point;
};
