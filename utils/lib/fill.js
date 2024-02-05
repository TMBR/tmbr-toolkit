import { isFunction } from './isFunction.js';

/**
 * Fills an array of a specified length using a callback or value
 *
 * @param n     - length of array
 * @param value - single value or callback that should return the value for the given index
 *
 * @return {array}
 */
export function fill(n, value) {
	const fn = isFunction(value) ? (undef, i) => value(i) : () => value;
	return [...Array(n)].map(fn);
};
