/**
 * Tracks resize events on the provided element
 *
 * @param el - element to observe
 * @param fn - function to call when resized, receives a {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry ResizeObserverEntry}
 *
 * @return unobserve cleanup function
 */
export function ro(el, fn) {
  const observer = new ResizeObserver(entries => fn(entries[0]));
  observer.observe(el);
  return () => observer.disconnect();
};
