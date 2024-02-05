/**
 * Rounds a value to the specificed number of decimal places
 *
 * @param n         - number to round
 * @param precision - decimal places
 *
 * @return rounded value
 */
export function round(n, precision = 2) {
  const d = 10 ** precision;
  return Math.round(n * d) / d;
};
