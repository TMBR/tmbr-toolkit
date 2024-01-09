export function pipe(...fns) {
  return input => fns.reduce((acc, fn) => fn(acc), input);
};
