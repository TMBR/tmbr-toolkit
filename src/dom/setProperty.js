import { isUndefined } from '..';

export function setProperty(target, name, value) {
  console.warn('@tmbr/utils: setProperty is deprecated in favor of prop(el, name[, value])');
  if (isUndefined(value)) {
    setProperty(document.documentElement, ...arguments);
  } else {
    target.style.setProperty(name, value);
  }
};
