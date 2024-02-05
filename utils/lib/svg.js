/**
 * Creates SVG elements using template literals
 *
 * @example
 * const square = svg`
 *   <svg viewBox="0 0 100 100">
 *     <rect fill="#FF0000" width="100" height="100" />
 *   </svg>`;
 *
 * const circle = svg`
 *   <svg viewBox="0 0 100 100">
 *     <circle fill="#FF0000" r="50" cx="50" cy="50" />
 *   </svg>`;
 */
export function svg(strings, ...vars) {
  const string = strings.map((str, i) => `${str}${vars[i] || ''}`).join('');
  const parser = svg.parser || (svg.parser = new DOMParser());
  return parser.parseFromString(string, 'text/html').body.childNodes[0];
};
