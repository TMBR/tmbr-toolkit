import { isArray } from '..';

console.warn('@tmbr/utils: isObject will be changing to return false for arrays');

export function isObject(value) {
  return typeof value === 'object' && value !== null; // && !isArray(value);
};
