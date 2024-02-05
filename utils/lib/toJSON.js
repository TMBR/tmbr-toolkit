/**
 * Converts a string to JSON with optional defaults
 */
export function toJSON(string, defaults) {
  let result;
  try {
    result = new Function('string', `var object; with (string) { object = ${string || ''} }; return object;`)(string || '{}');
  } catch (e) {
    result = {};
  }
  return Object.assign(result || {}, defaults);
};
