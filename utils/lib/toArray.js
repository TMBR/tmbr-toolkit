export function toArray(value) {
  return (
    value instanceof NodeList ||
    value instanceof DOMTokenList ||
    value instanceof HTMLCollection
  ) ? Array.from(value) : [].concat(value);
};
