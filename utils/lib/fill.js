import { isFunction } from './isFunction.js';

export function fill(n, value) {
	const fn = isFunction(value) ? (undef, i) => value(i) : () => value;
	return [...Array(n)].map(fn);
};