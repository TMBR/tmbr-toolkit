export function traverse(node, callback, filter) {
  const walker = document.createTreeWalker(node, filter || NodeFilter.SHOW_ELEMENT);
  callback(node);
  while (walker.nextNode()) callback(walker.currentNode);
};
