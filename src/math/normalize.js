/**
 * Normalize a value between two bounds
 *
 * @param  {number} value Value to normalize
 * @param  {number} min   Minimum boundary
 * @param  {number} max   Maximum boundary
 * @return {number}       Normalized value
 */
export function normalize(value, min, max) {
  return (value - min) / (max - min);
};
