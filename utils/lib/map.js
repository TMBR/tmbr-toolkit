import { lerp } from './lerp.js';
import { normalize } from './normalize.js';

/**
 * Maps a value from one range to another
 *
 * @param  {number} value  original value
 * @param  {number} inMin  Lower bound of the current range
 * @param  {number} inMax  Upper bound of the current range
 * @param  {number} outMin Lower bound of the target range
 * @param  {number} outMax Upper bound of the target range
 * @return {number}        new value mappted to the target range
 */
export function map(value, inMin, inMax, outMin, outMax) {
  return lerp(normalize(value, inMin, inMax), outMin, outMax);
};
