import { isArray } from '..';

export function isObject(value) {
  console.warn('@tmbr/utils: isObject will be changing to return false for arrays');
  return typeof value === 'object' && value !== null; // && !isArray(value);
};
