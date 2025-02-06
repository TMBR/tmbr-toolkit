/**
 * Creates a function that chains multiple function calls by passing the result from one to the next
 *
 * @param fns - individual function arguments
 *
 * @return {function}
 */
export function pipe(...fns) {
  return input => fns.reduce((result, fn) => fn(result), input);
};
