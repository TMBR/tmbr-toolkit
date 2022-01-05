import { isUndefined } from '..';

export function setProperty(target, name, value) {
  if (isUndefined(value)) {
    setProperty(document.documentElement, ...arguments);
  } else {
    target.style.setProperty(name, value);
  }
};
