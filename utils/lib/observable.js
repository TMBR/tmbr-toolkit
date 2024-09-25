/**
 * Creates a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy Proxy}
 * instance with a `subscribe` method that can be used to respond to state changes
 *
 * @param initial  - initial state object
 * @param callback - optional subscribed callback function
 *
 * @returns proxied object
 *
 * @example
 * const store = observable({count: 0});
 *
 * const unsubscribe = store.subscribe((newState, oldState, key) => {
 *   console.log(`${key} changed from ${oldState.count} to ${newState.count}`);
 * });
 *
 * store.count = 10;
 * unsubscribe();
 */
export function observable(initial, callback) {

  const subscribers = [];

  const proxy = new Proxy(initial, {
    set(state, key, value) {
      if (state[key] === value) return true;
      const { subscribe: oldSubscribe, ...oldState } = state;
      state[key] = value;
      const { subscribe: newSubscribe, ...newState } = state;
      subscribers.forEach(fn => fn(newState, oldState, key));
      return true;
    }
  });

  proxy.subscribe = function(fn) {
    subscribers.push(fn);
    return () => subscribers.splice(subscribers.indexOf(fn), 1);
  };

  callback && proxy.subscribe(callback);
  return proxy;
};
