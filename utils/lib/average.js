/**
 * Calculates the average from an array of numbers
 *
 * @param values
 *
 * @returns number
 */
export function average(values) {
  return values.reduce((result, value) => result + value, 0) / values.length;
};
