import { isEmpty } from './isEmpty.js';

export function cookie(name, value, expires) {

  if (arguments.length === 1) {
    return document.cookie.split('; ').find(pair => pair.startsWith(`${name}=`))?.split('=')[1];
  }

  if (arguments.length === 2 && isEmpty(value)) {
    document.cookie = `${name}=; max-age=0; path=/`;
    return;
  }

  switch (typeof expires) {
    case 'string': expires = new Date(expires); break;
    case 'number': expires = new Date( + new Date + 1000 * 60 * 60 * 24 * expires); break;
  }

  if ('toUTCString' in expires) {
    expires = expires.toUTCString();
  }

  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
};
