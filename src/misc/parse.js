export function parse(string) {
  try { return new Function(
    'string',
    `var object; with (string) { object = ${string} }; return object;`
  )(string || '{}'); } catch (e) { return {}; }
};
