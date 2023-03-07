/**
 * Multi-purpose random function. If no arguments are passed, return
 * a random float 0-1 (via Math.random()). If an array is passed,
 * return a random element from the array. If min, or min and max are
 * passed, return a random float within that range.
 * @param  {number} min   low end of range
 * @param  {number} max   high end of range
 * @return {mixed}        random number within range or random element from array
 */
export function random(min, max) {

  if (arguments.length === 0) {
    return Math.random();
  }

  if (Array.isArray(min)) {
    return min[ Math.floor(Math.random() * min.length) ];
  }

  if (min === undefined) min = 1;
  if (max === undefined) max = min || 1, min = 0;

  return min + Math.random() * (max - min);
};
