import { lerp } from './lerp.js';
import { normalize } from './normalize.js';

/**
 * Maps a value from one range to another
 *
 * @param {number} value  - original value
 * @param {number} inMin  - lower bound of the current range
 * @param {number} inMax  - upper bound of the current range
 * @param {number} outMin - lower bound of the target range
 * @param {number} outMax - upper bound of the target range
 *
 * @return {number} new value mapped to the target range
 */
export function map(value, inMin, inMax, outMin, outMax) {
  return lerp(normalize(value, inMin, inMax), outMin, outMax);
};
