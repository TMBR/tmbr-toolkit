import { suite } from 'uvu';
import { JSDOM } from 'jsdom';
import * as assert from 'uvu/assert';

// import * as fs from 'fs';
// console.log(fs.readFileSync('index.html').toString());
// fs.readdirSync('utils/lib').forEach(file => {
//   file.startsWith('.') || console.log(file.slice(0, -3));
// });

import {
  cx,
  html,
  isObject,
  toJSON,
} from './index.js';

const test = suite('utils');

const { window } = new JSDOM();
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.HTMLElement = window.HTMLElement;

let div;

test.before.each(() => {
  div = window.document.createElement('div');
});

test('cx', () => {
  const classes = cx('one', {'two': true, 'three': 0}, [true && 'four', null && 'five']);
  /********/ cx(div, 'one', {'two': true, 'three': 0}, [true && 'four', null && 'five']);
  assert.is(classes, 'one two four');
  assert.is(classes, div.className);
});

test('html', () => {

  const frag = new DocumentFragment();
  frag.append(html`<li>a</li>`);
  frag.append(html`<li>b</li><li>${div}</li>`);

  const list = html`<ul>${frag}</ul>`;
  assert.is(list.innerHTML, '<li>a</li><li>b</li><li><div></div></li>');
  assert.is(list.children.length, 3);
  assert.is(list.lastElementChild.children[0], div);

  const button = html`<button type="button" class="button">Submit</button>`;
  assert.is(button.className, 'button');
  assert.is(button.textContent, 'Submit');
});

test('isObject', () => {
  assert.ok(isObject({}));
  assert.not.ok(isObject());
  assert.not.ok(isObject(''));
  assert.not.ok(isObject([]));
  assert.not.ok(isObject(null));
  assert.not.ok(isObject(fn => fn));
});

test('toJSON', () => {
  const a =  { string : 'Hello World',  number : 42,  nope : null,  yes : true,  no : false,};
  const b = "{ string : 'Hello World',  number : 42, 'nope': null,  yes : true,  no : false,}";
  const c = '{"string": "Hello World", "number": 42, "nope": null, "yes": true, "no": false,}';
  const o = {};
  assert.equal(a, toJSON(b));
  assert.equal(a, toJSON(c));
  assert.equal(o, toJSON());
  assert.equal(o, toJSON(0));
  assert.equal(o, toJSON(' '));
  assert.equal(o, toJSON(null));
  assert.equal(o, toJSON(false));
  assert.equal(a, toJSON(undefined, a));
});

test.run();
