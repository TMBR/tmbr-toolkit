import { suite } from 'uvu';
import { JSDOM } from 'jsdom';
import { snoop } from 'snoop';
import * as assert from 'uvu/assert';

import {
  combine,
  cx,
  dot,
  findAll,
  html,
  isObject,
  noop,
  observable,
  on,
  pipe,
  toJSON,
  traverse
} from './index.js';

const test = suite('utils');

let div;

test.before(async () => {
  const { window } = await JSDOM.fromFile('./utils/test.html');

  global.window = window; [
    'document',
    'DocumentFragment',
    'HTMLElement',
    'NodeFilter',
    'AbortController'
  ].forEach(key => global[key] = window[key]);
});

test.before.each(() => {
  div = document.createElement('div');
});

test('combine', () => {
  const b = snoop(noop);
  const a = snoop(noop);
  const combined = combine(a.fn, undefined, null, 0, b.fn);
  combined('foo', 'bar');
  assert.equal(a.calls[0].arguments, ['foo', 'bar']);
  assert.equal(b.calls[0].arguments, ['foo', 'bar']);
});

test('dot', () => {

  const o = {
    u: undefined,
    f: false,
    n: null,
    z: 0,
    a: {b: {c: 'Colorado'}}
  };

  assert.is(dot(o, 'one.two'), undefined);
  dot(o, 'one.two', 3);
  assert.is(dot(o, 'one.two'), 3);

  assert.is(dot(o, 'u'), undefined);
  assert.is(dot(o, 'f'), false);
  assert.is(dot(o, 'n'), null);
  assert.is(dot(o, 'z'), 0);
  assert.is(dot(o, 'x.y.z'), undefined);
  assert.is(dot(o, 'a.poo'), undefined);
  assert.is(dot({}, 'one.two', 3).one.two, 3);

  assert.equal(dot(o, 'a.b'), {c: 'Colorado'});
  assert.equal(dot(o, 'a.b.c', 'Minnesota'), o);
  assert.equal(dot(o, 'a.b.c.d', 'Montana'), o);
  assert.equal(dot(o, 'a.b.c'), {d: 'Montana'});
});

test('cx', () => {
  const classes = cx('one', {'two': true, 'three': 0}, [true && 'four', null && 'five']);
  /*      */ cx(div, 'one', {'two': true, 'three': 0}, [true && 'four', null && 'five']);
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

test('observable', () => {

  const cb1 = snoop(noop);
  const cb2 = snoop(noop);
  const store = observable({count: 0}, cb1.fn);
  const unsubscribe = store.subscribe(cb2.fn);

  store.count = 1;
  store.count = 1;
  unsubscribe();
  store.count = 2;

  // callback passed on creation
  assert.ok(cb1.callCount === 2);
  assert.equal(cb1.firstCall.arguments[0].count, 1);
  assert.equal(cb1.firstCall.arguments[1].count, 0);

  // callback passed to subscribe
  assert.ok(cb2.callCount === 1);
  assert.equal(cb2.firstCall.arguments[0].count, 1);
  assert.equal(cb2.firstCall.arguments[1].count, 0);

  // callbacks receive key that changed
  assert.equal(cb1.calls[0].arguments[2], 'count');
  assert.equal(cb2.calls[0].arguments[2], 'count');

  // subscribe is removed from state arguments
  assert.equal(cb1.calls[0].arguments[0].subscribe, undefined);
  assert.equal(cb1.calls[0].arguments[1].subscribe, undefined);
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
});

test('pipe', () => {
  const fn = pipe(
    value => value.replace(/[^a-zA-Z]/g, ''),
    value => value.toUpperCase(),
    value => `${value}!`
  );
  assert.equal(fn('Hello, World?'), 'HELLOWORLD!');
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
  assert.equal(text.filter(Boolean).join(' '), 'Hello Lorem ipsum dolor Minnesota Colorado');
});

test.run();
