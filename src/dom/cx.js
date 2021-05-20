export function cx(node, ...classes) {
  classes.reduce((res, val) => res.concat(typeof val === 'object'
    ? Object.keys(val).map(c => [c, val[c]])
    : [[val, true]]
  ), []).map(def => node.classList[def[1] ? 'add' : 'remove'](def[0]));
};
