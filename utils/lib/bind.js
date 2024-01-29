import { isFunction } from './isFunction.js';

/**
 * Bind functions to a context or class instance, including getters and setters
 * (based on {@link https://www.npmjs.com/package/auto-bind auto-bind}).
 *
 * @param  {object} self    - target instance to be `this`
 * @param  {array}  methods - array of functions or class methods
 * @return {object} target instance for chaining
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
