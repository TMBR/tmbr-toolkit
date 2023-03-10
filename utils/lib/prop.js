import { isUndefined } from '..';

// TODO: remove this with 2.0 release
export function setProperty(target, name, value) {
  console.warn('@tmbr/utils: setProperty is deprecated in favor of prop(el, name[, value])');
  if (isUndefined(value)) {
    setProperty(document.documentElement, ...arguments);
  } else {
    target.style.setProperty(name, value);
  }
};

export function prop(el, name, value) {
  if (arguments.length < 3) {
    return el.style.getPropertyValue(name);
  } else {
    el.style.setProperty(name, value);
    return value;
  }
};
