export function walk(node, callback) {
  callback(node);
  node = node.firstElementChild;
  while (node) {
    walk(node, callback);
    node = node.nextElementSibling;
  }
};
