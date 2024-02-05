/**
 * Creates a debounced version of a function which postpones execution
 * until specified wait time since the function was last invoked
 *
 * @param fn   - function to debounce
 * @param wait - time in milliseconds
 */
export function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
};
