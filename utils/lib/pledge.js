/**
 * Creates an object with a reference to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise Promise} that can be resolved or rejected externally
 *
 * @return object with a `resolve` function, a `reject` function and the `promise` instance
 */
export function pledge() {

  let resolve, reject;

  const promise = new Promise((pass, fail) => {
    resolve = pass;
    reject = fail;
  });

  return { promise, resolve, reject };
};
