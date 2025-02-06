/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch fetch} wrapper with some conveniences:
 *
 * - defaults to sending `'Content-Type': 'application/json'` headers
 * - defaults to resolving with the returned JSON response or rejecting with `errors` and `status`
 * - prefixes relative URLs with a preceeding slash
 * - converts the data argument to a JSON string or URL params for `GET` requests
 * - exposes `request.headers` for overriding the default headers
 * - exposes `request.handler` for overriding the default response handler passed to `fetch(...).then(request.handler)`
 * - creates `request[method]()`
 *
 * @param method  - HTTP method (if calling `request()` directly)
 * @param url     - URL of the resource you want to fetch
 * @param data    - request data to be sent
 * @param options - {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch#options fetch options}
 *
 * @example
 * request.get('https://api.example.com/users?limit=10');
 * request.get('users', {limit: 10});
 *
 * request.headers['Authorization'] = `Bearer ${token}`;
 * request.post('/login', {username, password});
 *
 * @return {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise Promise} that resolves with JSON or the response from a custom handler
 *
 * @alias request
 */

function req(method, url, data, options = {}) {

  options.method = method.toUpperCase();
  options.headers = Object.assign({...request.headers}, options.headers);

  if (!url.startsWith('http')) {
    url = `/${url.startsWith('/') ? url.slice(1) : url}`;
  }

  if (options.method === 'GET') {
    const params = new URLSearchParams(data || '').toString();
    params && (url += `${url.includes('?') ? '&' : '?'}${params}`);
  } else {
    options.body = JSON.stringify(data || {});
  }

  return fetch(url, options).then(request.handler);
}

const headers = {
  'Content-Type': 'application/json'
};

const handler = res => new Promise((resolve, reject) => {
  res.text().then(body => {
    const data = JSON.parse(body || null);
    res.ok ? resolve(data) : reject({errors: data, status: res.status});
  });
});

export const request = /* @__PURE__ */ Object.assign(req, {
  headers,
  handler,
  get:    (...args) => req('GET', ...args),
  post:   (...args) => req('POST', ...args),
  put:    (...args) => req('PUT', ...args),
  patch:  (...args) => req('PATCH', ...args),
  delete: (...args) => req('DELETE', ...args)
});
