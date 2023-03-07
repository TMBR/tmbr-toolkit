export function ro(el, fn) {
  const observer = new ResizeObserver(entries => fn(entries[0]));
  observer.observe(el);
  return () => observer.disconnect();
};
