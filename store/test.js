import * as assert from 'uvu/assert';
import { suite } from 'uvu';
import { snoop } from 'snoop';
import { JSDOM } from 'jsdom';
import Store from './index.js';

const test = suite('store');
const { window } = new JSDOM();

global.NodeList = window.NodeList;
global.DOMTokenList = window.DOMTokenList;
global.HTMLCollection = window.HTMLCollection;

let callback;
test.before.each(() => callback = snoop(state => state));

test('create an instance with empty state', () => {
  const store = new Store();
  assert.instance(store, Store);
  assert.type(store.get(), 'object');
});

test('get single key', () => {
  const store = new Store({key: 'value'});
  assert.is(store.get('key'), 'value');
  assert.is(store.get().key, 'value');
});

test('get full state object', () => {
  const state = {foo: 'bar', bool: false, count: 42};
  const store = new Store(state);
  assert.equal(store.get(), state);
});

test('state object returns a copy', () => {
  const state = {hello: 'world'};
  const store = new Store(state);
  assert.is.not(store.state, state);
  assert.is.not(store.get(), state);
});

test('state object only accessible via getter', () => {
  const store = new Store({foo: 'bar'});
  assert.throws(() => store.state = {});
  assert.equal(store.state, store.get());
});

test('state is immutable', () => {
  const store = new Store({name: 'Colorado'});
  const state = store.get();
  state.name = 'Minnesota';
  assert.is(store.get('name'), 'Colorado');
});

test('set single property', () => {
  const store = new Store({greeting: 'Hello'});
  store.set('greeting', 'Howdy');
  assert.is(store.get('greeting'), 'Howdy');
});

test('set via partial object', () => {
  const store = new Store({name: 'Nik', age: 24});
  store.set({age: 42});
  assert.equal(store.get(), {name: 'Nik', age: 42});
});

test('set via function with current state', () => {
  const store = new Store({count: 5})
  store.set(state => ({count: state.count * 8 + 2}));
  assert.equal(store.get(), {count: 42});
});

test('subscribe to state changes by key', () => {
  const store = new Store({toggle: false});
  store.subscribe('toggle', callback.fn);
  store.set(state => ({toggle: !state.toggle}));
  assert.ok(callback.calledOnce);
  assert.ok(store.get('toggle'));
});

test('subscribe to all state changes', () => {
  const store = new Store({a: null, b: null});
  store.subscribe(callback.fn);
  store.set({a: 'foo'});
  store.set({b: 'bar'});
  assert.is(callback.callCount, 2);
});

test('subscribe to multiple keys', () => {
  const store = new Store({a: null, b: null});
  store.subscribe(['a', 'b'], callback.fn);
  store.set({a: 'a', b: 'b'});
  assert.is(callback.callCount, 2);
});

test('subscribe receives latest state', () => {
  const store = new Store({a: false});
  store.subscribe('a', callback.fn);
  store.set('a', true);
  store.set('b', 'should not trigger callback');
  assert.ok(callback.calledOnce);
  assert.ok(callback.firstCall.result.a);
});

test('subscribe only fires for changed values', () => {
  const store = new Store({count: 0});
  store.subscribe('count', callback.fn);
  store.set('count', 43);
  store.set('count', 43);
  assert.ok(callback.calledOnce);
});

test('subscribe with initial emit', () => {
  const store = new Store({a: 'a', b: 'b'});
  store.subscribe(callback.fn, true);
  store.subscribe((['a','b']), callback.fn, true);
  assert.is(callback.callCount, 2);
});

test('unsubscribe via key', () => {
  const store = new Store({status: 'idle'});
  store.subscribe('status', callback.fn);
  store.set('status', 'loading');
  store.unsubscribe('status', callback.fn);
  store.set('status', 'complete');
  assert.ok(callback.calledOnce);
});

test('unsubscribe via returned function', () => {
  const store = new Store({key: 'a'});
  const unsubscribe = store.subscribe('key', callback.fn);
  store.set('key', 'b');
  unsubscribe();
  store.set('key', 'c');
  assert.ok(callback.calledOnce);
});

test('reset to initial state', () => {
  const initial = {key: 'foo'};
  const store = new Store(initial);
  store.set('key', 'poo');
  store.reset();
  assert.equal(store.get(), initial);
});

test.run();
