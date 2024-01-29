/**
 * Clamp a value between two bounds
 *
 * @param  {number} value - value to clamp
 * @param  {number} min   - minimum boundary
 * @param  {number} max   - maximum boundary
 * @return {number} clamped value
 */
export function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
};
