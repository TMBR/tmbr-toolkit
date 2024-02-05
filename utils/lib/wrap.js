import { isArray } from './isArray.js';

/**
 * Wraps an index around the given length using the modulo operator.
 *
 * @example
 * wrap(1, 3);  // 1
 * wrap(3, 3);  // 0
 * wrap(-1, 3); // 2
 *
 * @param  {number} i index
 * @param  {number} n length
 * @return {number}   looped index
 */
export function wrap(index, n) {
  isArray(n) && (n = n.length);
  return index < 0 ? n + (index % n) : index >= n ? index % n : index;
};
