/**
 * Recursively passes a DOM element's children to the provided callback
 *
 * @param el       - root element to travese
 * @param callback - function to be called for each child element
 * @param filter   - filter passed to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker createTreeWalker} (defaults to `NodeFilter.SHOW_ELEMENT`)
 */
export function traverse(el, callback, filter) {
  const walker = document.createTreeWalker(el, filter || NodeFilter.SHOW_ELEMENT);
  callback(el);
  while (walker.nextNode()) callback(walker.currentNode);
};
