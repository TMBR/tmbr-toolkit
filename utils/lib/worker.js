import { isFunction } from './isFunction.js';

export function worker(code) {
  if (isFunction(code)) {
    code = `(${code.toString()})()`;
  }
  return new Worker(
    URL.createObjectURL(new Blob([code]))
  );
};
