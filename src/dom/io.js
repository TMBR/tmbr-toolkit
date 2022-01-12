import { isFunction } from '..';

export function io(el, enter, leave, once = false) {

  io.instance ??= new IntersectionObserver(all => all.forEach(e => {
      if (e.isIntersecting) {
        isFunction(enter) && enter(e);
        once && unobserve();
      } else {
        isFunction(leave) && leave(e);
      }
  }));

  io.instance.observe(el);
  const unobserve = () => io.instance.unobserve(el);

  return unobserve;
};
