import { isNumber } from './isNumber.js';

/**
 * Gets or sets a cookie with an optional expiration
 *
 * @param name    - name of the cookie
 * @param value   - value to set (use `null` to delete)
 * @param expires - number of days or {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date Date} object (defaults to session cookie)
 *
 * @example
 * cookie('greeting', 'Hello');
 * cookie('greeting'); // Hello
 * cookie('greeting', null);
 *
 * cookie('example', 'Expire in 30 days', 30);
 * cookie('example', 'Expire on this date', new Date(...));
 */
export function cookie(name, value, expires) {

  if (arguments.length === 1) {
    return document.cookie.split('; ').find(pair => pair.startsWith(`${name}=`))?.split('=')[1];
  }

  if (value === null) {
    document.cookie = `${name}=; path=/; max-age=0`;
    return;
  }

  if (isNumber(expires)) {
    expires = new Date( + new Date + 1000 * 60 * 60 * 24 * expires);
  }

  document.cookie = expires?.toUTCString
    ? `${name}=${value}; path=/; expires=${expires.toUTCString()}`
    : `${name}=${value}; path=/`;
};
