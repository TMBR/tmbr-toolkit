import { isString } from './isString.js';

/**
 * Validates data against a set of rules
 *
 * @param data
 * @param rules
 *
 * @returns errors object or null if all keys passed validation
 *
 * @example
 * const data = {
 *   email: 'hello@example.com',
 *   password: 'password',
 *   confirm: null
 * };
 *
 * const rules = {
 *   email(value) {
 *     return /.+\@.+\..+/.test(value) || 'Invalid email';
 *   },
 *   password(value) {
 *     if (!value) return 'Required';
 *     return value.length >= 8 || 'Must be at least 8 characters';
 *   },
 *   confirm(value, data) {
 *     if (!value) return 'Required';
 *     return value === data.password || 'Must match your password';
 *   },
 * };
 *
 * const errors = validate(data, rules);
 */
export function validate(data, rules) {
  const errors = {};

  for (let key in rules) {
    const value = data[key];
    const error = rules[key](value, data);
    isString(error) && (errors[key] = error);
  }

  return Object.keys(errors).length ? errors : null;
};
