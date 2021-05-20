function throttle(fn, limit) {
  let throttled;
  return function() {
    if (!throttled) {
      fn.apply(this, arguments);
      throttled = true;
      setTimeout(() => throttled = false, limit);
    }
  }
}
