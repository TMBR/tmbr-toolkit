// import { isArray } from '..';

/**
 * Wrap an index around the given length using the modulo operator
 *
 * e.g. wrap(1, 3) // 1
 *      wrap(3, 3) // 0
 *      wrap(-1, 3) // 2
 *
 * @param  {number} index  Index
 * @param  {number} length Length
 * @return {number}        Looped index
 */
export function wrap(index, length) {
  // isArray(length) && (length = length.length);
  return index < 0
    ? (index = length + (index % length))
    : index >= length
    ? index % length
    : index;
};
