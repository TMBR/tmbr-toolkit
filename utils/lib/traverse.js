/**
 * Recursively passes a DOM element's children to the provided callback
 *
 * @param node     - root element to travese
 * @param callback - function to be called for each child element
 * @param filter   - filter passed to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker createTreeWalker} (defaults to `NodeFilter.SHOW_ELEMENT`)
 */
export function traverse(node, callback, filter) {
  const walker = document.createTreeWalker(node, filter || NodeFilter.SHOW_ELEMENT);
  callback(node);
  while (walker.nextNode()) callback(walker.currentNode);
};
