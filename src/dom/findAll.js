export function findAll(selector, parent) {
  return Array.from((parent || document).querySelectorAll(selector));
};
