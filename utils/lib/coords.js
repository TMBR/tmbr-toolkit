import { isElement } from './isElement.js';

export function coords(event, target) {

  const point = {
    x: event.touches ? event.touches[0].pageX : event.clientX,
    y: event.touches ? event.touches[0].pageY : event.clientY
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
