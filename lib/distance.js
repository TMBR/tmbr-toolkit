import { isUndefined } from '..';

/**
 * Calculates the distance between two points
 * @param  {mixed} x1  x coordinate or object with x and y properties
 * @param  {mixed} y1  y coordinate or object with x and y properties
 * @param  {number} x2 optional, x coordinate of the second point
 * @param  {number} y2 optional, y coordinate of the second point
 * @return {number} distance
 */
export function distance(x1, y1, x2, y2) {
  if (isUndefined(x2) && isUndefined(y2)) {
    x1 = x1.x;
    y1 = x1.y;
    x2 = y1.x;
    y2 = y1.y;
  }
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};
