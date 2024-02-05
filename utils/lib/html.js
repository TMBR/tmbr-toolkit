/**
 * Creates DOM elements using template literals
 * (based on {@link https://www.npmjs.com/package/facon facon}))
 *
 * @example
 * const img = html`<img src="https://placehold.co/600x400" alt="">`;
 * const div = html`<div>${img}</div>`;
 */
export function html(strings, ...vars) {

  let result = '';
  const appends = [];

  for (let i = 0; i < vars.length; i++) {
    if (vars[i] instanceof HTMLElement || vars[i] instanceof DocumentFragment) {
      appends.push(vars[i]);
      result += strings[i] + `<div append="${i}"></div>`;
    } else {
      result += strings[i] + vars[i];
    }
  }

  result += strings[strings.length - 1];

  const template = document.createElement('template');
  template.innerHTML = result.trim();

  const content = template.content;

  [...content.querySelectorAll('[append]')].forEach((node, i) => {
    node.before(appends[i]);
    node.remove()
  });

  return content.childElementCount === 1 ? content.firstElementChild : content;
};
