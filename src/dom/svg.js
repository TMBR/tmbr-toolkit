export function svg(strings, ...vars) {
  const string = strings.map((str, i) => `${str}${vars[i] || ''}`).join('');
  const parser = svg.parser || (svg.parser = new DOMParser());
  return parser.parseFromString(string, 'text/html').body.childNodes[0];
};
