/**
 * Converts a string to JSON with optional defaults
 */
export function toJSON(string, defaults) {
  let result;
  try {
    result = Function(`"use strict"; return ${string}`)();
  } catch (e) {
    result = {};
  }
  return Object.assign(result || {}, defaults);
};
