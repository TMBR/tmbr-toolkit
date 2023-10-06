import Emitter from '@tmbr/emitter';
import { isFunction, toArray } from '@tmbr/utils';

class Store {

  #emitter;
  #initial;
  #state;

  constructor(initial = {}) {
    this.#emitter = new Emitter();
    this.#initial = {...initial};
    this.#state = {...initial};
  }

  get(key) {
    return key ? this.#state[key] : {...this.#state};
  }

  set(...args) {
    switch (typeof args[0]) {

      case 'function':
        this.set(args[0](this.get()));
        break;

      case 'object':
        const updates = Object.entries(args[0]);
        updates.forEach(([key, value]) => this.set(key, value));
        break;

      default:
        if (this.#state[args[0]] === args[1]) return;
        this.#state[args[0]] = args[1];
        this.#emitter.emit(args[0], this.get());
        this.#emitter.emit('*', this.get());
        break;
    }
  }

  subscribe(key, callback) {
    if (isFunction(key)) return this.subscribe('*', key);
    toArray(key).forEach(k => this.#emitter.on(k, callback));
    return () => this.unsubscribe(key, callback);
  }

  unsubscribe(key, callback) {
    if (isFunction(key)) return this.unsubscribe('*', key);
    toArray(key).forEach(k => this.#emitter.off(k, callback));
  }

  reset() {
    this.set(this.#initial);
  }
}

export default Store;
