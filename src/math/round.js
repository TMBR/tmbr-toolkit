/**
 * Rounds a value to the specificed number of decimal places.
 *
 * @param  {number} n         number to round
 * @param  {number} precision decimal places
 * @return {number}           rounded value
 */
export function round(n, precision = 2) {
  const d = 10 ** precision;
  return Math.round(n * d) / d;
};
