export function request(method, url, data, headers = {}) {

  const config = {method};
  config.headers = Object.assign({'content-type': 'application/json'}, headers);

  if ( ! url.startsWith('http')) {
    url = `/${url.startsWith('/') ? url.slice(1) : url}`;
  }

  if (method.toUpperCase() === 'GET') {
    const params = new URLSearchParams(data).toString();
    params && (url += `${url.includes('&') ? '&' : '?'}${params}`);
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(url, config)
    .then(res => res.json().then(json => res.ok ? json : Promise.reject(json)));
};

['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach(method => {
  request[method.toLocaleLowerCase()] = (...args) => request(method, ...args);
});
