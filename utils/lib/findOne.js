export function findOne(selector, parent) {
  return (parent || document).querySelector(selector);
};
