const methods = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
];

methods.forEach(method => {
  request[method.toLocaleLowerCase()] = (...args) => request(method, ...args);
});

request.headers = {
  'Content-Type': 'application/json'
};

request.handler = res => new Promise((resolve, reject) => {
  res.text().then(body => {
    const data = JSON.parse(body || null);
    res.ok ? resolve(data) : reject({errors: data, status: res.status});
  });
});

export function request(method, url, data, options = {}) {

  options.method = method;
  options.headers = Object.assign(request.headers, options.headers);

  if ( ! url.startsWith('http')) {
    url = `/${url.startsWith('/') ? url.slice(1) : url}`;
  }

  if (method.toUpperCase() === 'GET') {
    const params = new URLSearchParams(data || '').toString();
    params && (url += `${url.includes('?') ? '&' : '?'}${params}`);
  } else {
    options.body = JSON.stringify(data || {});
  }

  return fetch(url, options).then(request.handler);
};
