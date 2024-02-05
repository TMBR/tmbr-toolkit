import { isFunction } from './isFunction.js';

/**
 * Binds functions to a context or instance, including class getters and setters
 * (based on {@link https://www.npmjs.com/package/auto-bind auto-bind})
 *
 * @param self    - target instance to be `this`
 * @param methods - optional method(s) to bind as a string or array of names
 *
 * @return self for chaining
 */
export function bind(self, methods) {

  if (methods) {
    [].concat(methods).forEach(fn => isFunction(self[fn]) && (self[fn] = self[fn].bind(self)));
    return self;
  }

  const properties = new Set();
  let object = self.constructor.prototype;

  do {

    for (const key of Reflect.ownKeys(object)) {
      if (key === 'constructor') continue;
      properties.add([object, key]);
    }

  } while ((object = Reflect.getPrototypeOf(object)) && object !== Object.prototype);

  for (const [object, key] of properties) {
    const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
    if (descriptor && isFunction(descriptor.value)) self[key] = self[key].bind(self);
  }

  return self;
};
