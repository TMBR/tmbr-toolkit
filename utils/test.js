import { suite } from 'uvu';
import { JSDOM } from 'jsdom';
import { snoop } from 'snoop';
import * as assert from 'uvu/assert';

import {
  cx,
  findAll,
  findOne,
  html,
  isObject,
  on,
  noop,
  toJSON,
  traverse
} from './index.js';

const test = suite('utils');

let div;

test.before(async () => {
  const { window } = await JSDOM.fromFile('./utils/test.html');
  global.window = window;
  global.document = window.document;
  global.DocumentFragment = window.DocumentFragment;
  global.HTMLElement = window.HTMLElement;
  global.NodeFilter = window.NodeFilter;
});

test.before.each(() => {
  div = document.createElement('div');
});

test('cx', () => {
  const classes = cx('one', {'two': true, 'three': 0}, [true && 'four', null && 'five']);
  /********/ cx(div, 'one', {'two': true, 'three': 0}, [true && 'four', null && 'five']);
  assert.is(classes, 'one two four');
  assert.is(classes, div.className);
  assert.is(cx(div), div.classList);
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

test('on', () => {

  const [ a, b ] = findAll('#on button');

  let callback = snoop(noop);
  let off;

  function trigger(el, event) {
    el.dispatchEvent(new window.Event(event));
  }

  // on | off : event with selector
  // on | off : event with element
  // on | off : event with array
  // on | off : multiple events with selector
  // on | off : multiple events with element
  // on | off : multiple events with array

  off = on('click', '#on button', callback.fn);
  // on('click', a, callback.fn);
  // on('click', [a, b], callback.fn);
  // on('mouseenter mouseleave', '#on button', callback.fn);
  // on('mouseenter mouseleave', a, callback.fn);
  // on('mouseenter mouseleave', [a, b], callback.fn);

  trigger(a, 'click');
  off();
  trigger(a, 'click');
  assert.equal(callback.firstCall.arguments[0].target, a);
  assert.ok(callback.calledOnce);

  // b1.dispatchEvent(new window.Event('mouseenter'));
  // assert.equal(callback.calls[1].arguments[0].target, b1);
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
  const node = document.getElementById('traverse');
  const tags = [];
  const text = [];
  traverse(node, el => tags.push(el.nodeName.toLowerCase()));
  traverse(node, el => text.push(el.wholeText?.trim()), NodeFilter.SHOW_TEXT);
  assert.equal(tags.join(' '), 'div header h1 main p strong ul li li');
  assert.equal(text.filter(Boolean).join(' '), 'Hello Lorem ipsum dolor testing Minnesota Colorado');
});

test.run();
