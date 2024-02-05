/**
 * Multi-purpose random function:
 *
 * - if no arguments are passed, returns random float 0-1 from {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random Math.random()}
 * - if an array is passed, returns a random element from the array
 * - if min is passed, returns a random float in the range 0-min
 * - if min and max are passed, returns a random float in the range min-max

 * @return random number or random element from array
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
