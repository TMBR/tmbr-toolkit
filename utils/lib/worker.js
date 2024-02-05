import { isFunction } from './isFunction.js';

/**
 * Creates a {@link https://developer.mozilla.org/en-US/docs/Web/API/Worker Web Worker} instance with the provided `function` or `string`
 */
export function worker(code) {
  if (isFunction(code)) {
    code = `(${code.toString()})()`;
  }
  return new Worker(
    URL.createObjectURL(new Blob([code]))
  );
};
