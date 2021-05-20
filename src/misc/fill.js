export function fill(size, fn) {
  return [...Array(size)].map((undef, i) => fn(i));
};
