export function wait(ms, fn) {

  const start = performance.now();
  const frame = () => {
    if (performance.now() - start >= ms) return fn();
    frame.raf = requestAnimationFrame(frame);
  };

  frame.raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(frame.raf);
};
