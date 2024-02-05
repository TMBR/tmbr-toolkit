/**
 * Shuffles an array
 *
 * @param array - optional array to be shuffled in place
 *
 * @return shuffled array or a random number to be used as a sort compare
 */
export function shuffle(array) {
  const rand = () => 0.5 - Math.random();
  return (arguments.length === 1) ? array.sort(rand) : rand();
};
