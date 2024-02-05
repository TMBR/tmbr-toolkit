/**
 * Normalizes a value between two bounds
 *
 * @param {number} value - value to normalize
 * @param {number} min   - minimum boundary
 * @param {number} max   - maximum boundary
 *
 * @return {number} normalized value
 */
export function normalize(value, min, max) {
  return (value - min) / (max - min);
};
