import { isNumber } from './isNumber.js';
import { isObject } from './isObject.js';

/**
 * Gets or sets a cookie
 *
 * @param name    - name of the cookie
 * @param value   - value to set (use `null` to delete)
 * @param options - optional expiration days, {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date Date} instance or object of attributes
 *
 * @example
 * cookie('greeting', 'Hello');
 * cookie('greeting'); // Hello
 * cookie('greeting', null);
 *
 * cookie('example', 'Expire in 30 days', 30);
 * cookie('example', 'Expire on this date', new Date(...));
 * cookie('example', 'Custom cookie attributes', {SameSite: 'strict'});
 */
export function cookie(name, value, options) {

  if (arguments.length === 1) {
    return document.cookie.split('; ').find(pair => pair.startsWith(`${name}=`))?.split('=')[1];
  }

  if (value === null) {
    document.cookie = `${name}=; path=/; max-age=0`;
    return;
  }

  let attrs = {[name]: value, path: '/'};

  if (options instanceof Date) {
    attrs.expires = options;
  } else if (isNumber(options)) {
    attrs.expires = new Date( + new Date + 1000 * 60 * 60 * 24 * options);
  } else if (isObject(options)) {
    attrs = Object.assign(attrs, options);
  }

  document.cookie = Object.keys(attrs).map(key => `${key}=${attrs[key]}`).join('; ')
};
