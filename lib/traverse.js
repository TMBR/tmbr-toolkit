export function traverse(node, callback) {
  callback(node);
  node = node.firstElementChild;
  while (node) {
    traverse(node, callback);
    node = node.nextElementSibling;
  }
};
