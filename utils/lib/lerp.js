/**
 * Performs linear interpolation between two values
 *
 * @param  {number} a current value
 * @param  {number} b target value
 * @param  {number} n progress
 * @return {number}   interpolated value
 */
export function lerp(a, b, n) {
  return a * (1 - n) + b * n;
};
