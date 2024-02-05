/**
 * Clamps a value between two bounds
 *
 * @param value - value to clamp
 * @param min   - minimum boundary (0)
 * @param max   - maximum boundary (1)
 *
 * @return clamped value
 */
export function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
};
