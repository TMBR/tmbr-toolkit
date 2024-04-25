import * as assert from 'uvu/assert';
import { suite } from 'uvu';
import { snoop } from 'snoop';
import Emitter from './index.js';

const test = suite('emitter');
const noop = o => o;
let events;

test.before.each(() => {
  events = new Emitter();
});

test('subscribe to an event', () => {
  const func = snoop(noop);
  events.on('test', func.fn);
  events.emit('test');
  assert.ok(func.called);
});

test('subscribe to an event with context', () => {
  const self = {};
  const func = function() { assert.is(this, self); }
  events.on('test', func.bind(self));
  events.emit('test');
});

test('emit an event with data', () => {
  const data = {foo: 'bar', a: true, b: null};
  const func = snoop(noop);
  events.on('test', func.fn);
  events.emit('test', data);
  assert.equal(func.firstCall.result, data);
});

test('emit an event with multiple arguments', () => {
  const a = {count: 1};
  const b = 'hello';
  let c;
  const func = snoop(noop);
  events.on('test', func.fn);
  events.emit('test', a, b, c);
  assert.equal(func.firstCall.arguments[0].count, 1);
  assert.equal(func.firstCall.arguments[1], 'hello');
  assert.equal(func.firstCall.arguments[2], undefined);
});

test('unsubscribe via return function', () => {
  const func = snoop(noop);
  const off = events.on('test', func.fn);
  events.emit('test');
  off();
  events.emit('test');
  assert.ok(func.calledOnce);
});

test('unsubscribe from an event', () => {
  const func = snoop(noop);
  events.on('test', func.fn);
  events.emit('test');
  events.off('test', func.fn);
  events.emit('test');
  assert.ok(func.calledOnce);
});

test('unsubscribe and emit fail silently', () => {
  events.off('foo', noop);
  events.emit('bar', noop);
});

test('check if an event has a callback', () => {
  assert.ok(events.has('key') === false);
  events.on('key', noop);
  assert.ok(events.has('key') === true);
  events.off('key', noop);
  assert.ok(events.has('key') === false);
});

test('destroy instance', () => {
  const func = snoop(noop);
  events.on('test', func.fn);
  events.emit('test');
  events.destroy();
  events.emit('test');
  assert.ok(func.calledOnce);
});

test.run();
