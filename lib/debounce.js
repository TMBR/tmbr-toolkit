export function debounce(fn, delay) {
  let timeout;
  return () => {
    const self = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(self, args), delay);
  };
};
