import { isObject } from './isObject.js';

/**
 * Gets or sets a dot-notated path within a nested object
 *
 * @param object - target object
 * @param path   - string path
 * @param value  - optional value to set
 *
 * @returns target object if setting (for chaining) or value if getting
 */
export function dot(object, path, value) {
  return arguments.length === 3 ? set(object, path, value) : get(object, path);
};

function get(object, path) {

  const keys = path.split('.');
  let target = object;

  for (const key of keys) {
    target = target?.[key];
  }

  return target;
}

function set(object, path, value) {

  const keys = path.split('.');
  const last = keys.pop();
  let target = object;

  for (const key of keys) {
    target = isObject(target[key]) ? target[key] : (target[key] = {});
  }

  target[last] = value;
  return object;
}
