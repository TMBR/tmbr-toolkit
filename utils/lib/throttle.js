/**
 * Creates a throttled version of a function which will
 * only be called once per the specified wait time
 *
 * @param fn   - function to throttle
 * @param wait - time in milliseconds
 */
export function throttle(fn, wait) {
  let throttled;
  return function(...args) {
    if (!throttled) {
      fn.apply(this, args);
      throttled = true;
      setTimeout(() => throttled = false, wait);
    }
  }
};
