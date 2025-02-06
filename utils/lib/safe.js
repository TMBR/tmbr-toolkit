/**
 * {@link https://wesbos.com/javascript/12-advanced-flow-control/71-async-await-error-handling Async/Await Error Handling}
 *
 * @param fn           - try function
 * @param errorHandler - catch function
 */
export function safe(fn, errorHandler) {
  return () => fn().catch(errorHandler);
};
