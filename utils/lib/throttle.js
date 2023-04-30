export function throttle(fn, limit) {
  let throttled;
  return function(...args) {
    if (!throttled) {
      fn.apply(this, args);
      throttled = true;
      setTimeout(() => throttled = false, limit);
    }
  }
};
