import { isNumber } from './isNumber.js';

export function cookie(name, value, expires) {

  if (arguments.length === 1) {
    return document.cookie.split('; ').find(pair => pair.startsWith(`${name}=`))?.split('=')[1];
  }

  if (value === null) {
    document.cookie = `${name}=; max-age=0`;
    return;
  }

  if (isNumber(expires)) {
    expires = new Date( + new Date + 1000 * 60 * 60 * 24 * expires);
  }

  document.cookie = expires?.toUTCString
    ? `${name}=${value}; expires=${expires.toUTCString()}`
    : `${name}=${value}`;
};
