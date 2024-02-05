/**
 * `querySelectorAll` wrapper with an optional parent context that always converts the resulting
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/NodeList NodeList} to an array
 */
export function findAll(selector, parent) {
  return Array.from((parent || document).querySelectorAll(selector));
};
