// export function lerp (p1, p2, t) {
//   return p1 + (p2 - p1) * t
// };

// export function interpolate (start, end, value) {
//   return (start * (1.0 - value)) + (end * value)
// };

/**
 * Performs linear interpolation between two values
 * @param  {number} value normalized value to interpolate
 * @param  {number} min   low end of range
 * @param  {number} max   high end of range
 * @return {number}       interpolated value between min and max
 */
// export function lerp(value, min, max) {
//   return min + value * (max - min);
// };

/**
 * Linear interpolation (lerp)
 *
 * @param  {number} v0 current value
 * @param  {number} v1 target value
 * @param  {number} t  progress
 * @return {number}    Interpolated value
 */
export let lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t
