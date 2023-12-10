class Emitter {

  #events = {};

  on(type, callback, context) {
    const map = this.#events[type] || (this.#events[type] = new Map());
    map.set(callback, context);
    return () => this.off(type, callback);
  }

  off(type, callback) {
    const map = this.#events[type];
    map && map.delete(callback);
  }

  emit(type, data) {
    if (this.#events === null) return;
    const map = this.#events[type];
    map && map.forEach((context, callback) => callback.call(context, data));
  }

  has(type) {
    return this.#events.hasOwnProperty(type) && this.#events[type].size > 0;
  }

  destroy() {
    Object.values(this.#events).forEach(map => map.clear());
    this.#events = null;
  }
}

export default Emitter;
