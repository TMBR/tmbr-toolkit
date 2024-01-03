class Emitter {

  #events = {};

  on(type, callback, context) {
    const map = this.#events[type] || (this.#events[type] = new Map());
    map.set(callback, context);
    return () => this.off(type, callback);
  }

  off(type, callback) {
    this.#events[type]?.delete(callback);
  }

  has(type) {
    return this.#events.hasOwnProperty(type) && this.#events[type].size > 0;
  }

  emit(type, data) {
    if (this.#events === null) return;
    this.#events[type]?.forEach((context, callback) => callback.call(context, data));
  }

  destroy() {
    Object.values(this.#events).forEach(map => map.clear());
    this.#events = null;
  }
}

export default Emitter;
