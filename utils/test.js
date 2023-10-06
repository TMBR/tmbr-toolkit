import { suite } from 'uvu';
import { JSDOM } from 'jsdom';
import * as assert from 'uvu/assert';

import {
  cx,
  html,
  isObject,
  toJSON,
  traverse
} from './index.js';

const test = suite('utils');

const { window } = new JSDOM();
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.HTMLElement = window.HTMLElement;
global.NodeFilter = window.NodeFilter;

let div;

test.before.each(() => {
  div = document.createElement('div');
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
  assert.is(list.children[2].firstElementChild, div);

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
  assert.equal(o, toJSON(' null '));
  assert.equal(o, toJSON('undefined'));
  assert.equal(o, toJSON(null));
  assert.equal(o, toJSON(false));
  assert.equal(a, toJSON(undefined, a));
});

test('traverse', () => {

  const div = html`
    <div>
      <header>
        <h1>Hello</h1>
      </header>
      <main>
        <p>Lorem ipsum dolor <strong>testing</strong></p>
        <ul>
          <li>Minnesota</li>
          <li>Colorado</li>
        </ul>
      </main>
    </div>`;

  const tags = [];
  traverse(div, el => tags.push(el.nodeName.toLowerCase()));
  assert.equal(tags.join(' '), 'div header h1 main p strong ul li li');

  const text = [];
  traverse(div, el => text.push(el.wholeText?.trim()), NodeFilter.SHOW_TEXT);
  assert.equal(text.filter(Boolean).join(' '), 'Hello Lorem ipsum dolor testing Minnesota Colorado');
});

test.run();
