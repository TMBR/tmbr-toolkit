import { isArray } from '..';

export function isObject(value) {
  return typeof value === 'object' && value !== null && !isArray(value);
};
