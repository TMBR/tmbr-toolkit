/**
 * Returns a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise Promise}
 * that resolves after the specified delay in milliseconds
 */
export function wait(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
};
