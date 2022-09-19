import { isFunction } from '..';

export function fill(size, value) {
	const fn = isFunction(value) ? (undef, i) => value(i) : () => value;
	return [...Array(size)].map(fn);
};
