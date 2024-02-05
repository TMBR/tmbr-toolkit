/**
 * `querySelector` wrapper with an optional parent context
 */
export function findOne(selector, parent) {
  return (parent || document).querySelector(selector);
};
