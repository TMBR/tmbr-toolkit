/**
 * Rounds a value
 *
 * @param  {number} v Value to round
 * @param  {number} p Precision
 * @return {number}   Rounded value
 */
export function round(v, p = 1000) {
  return Math.round(v * p) / p;
};
