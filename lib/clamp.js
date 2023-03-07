/**
 * Clamp a value between two bounds
 * @param  {number} v   Value to clamp
 * @param  {number} min Minimum boundary
 * @param  {number} max Maximum boundary
 * @return {number}     Clamped value
 */
export function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
};
