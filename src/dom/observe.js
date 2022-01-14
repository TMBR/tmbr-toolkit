import { io, ro } from '..';

export function observe(el, callbacks = {}) {

  const ioUnobserve = io(el, callbacks.enter, callbacks.leave);
  const roUnobserve = ro(el, callbacks.resize);

  return () => {
    ioUnobserve();
    roUnobserve();
  }
};
