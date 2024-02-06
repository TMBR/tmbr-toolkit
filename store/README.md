# Store

A simple state management class.

```bash
npm install @tmbr/store
```

```js
import Store from '@tmbr/store';

// create an instance with the initial state
const store = new Store({
  greeting: 'Hello',
  name: 'World'
});

function callback(state) {
  console.log(`${state.greeting}, ${state.name}!`);
}

// subscribe to all state changes
store.subscribe(callback);

// subscribe to a single state key
store.subscribe('greeting', callback);

// subscribe to a multiple state keys
store.subscribe(['greeting', 'name'], callback);

// set a single property
store.set('greeting', 'Hi');

// set with a partial object
store.set({greeting: 'Howdy'});

// set with a function that returns a partial object
store.set(state => ({greeting: 'Aloha'});

// get a single property
store.get('name');
store.get().name;

// get a copy of the full state object
store.get();
store.state;

// unsubscribe
store.subscribe(callback);
store.subscribe('greeting', callback);
store.subscribe(['greeting', 'name'], callback);

// unsubscribe with returned cleanup function
const unsubscribe = store.subscribe('name', callback);
unsubscribe();

// reset to initial state
store.reset();
```
