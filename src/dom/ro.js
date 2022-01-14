import { isFunction } from '..';

export function ro(el, callback) {

  ro.instance ??= new ResizeObserver(all => all.forEach(e => {
    isFunction(callback) && callback(e);
  }));

  ro.instance.observe(el);
  return () => ro.instance.unobserve(el);
};
