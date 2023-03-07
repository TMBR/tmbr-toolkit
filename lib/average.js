export function average(values) {
  return values.reduce((result, value) => result + value, 0) / values.length;
};
