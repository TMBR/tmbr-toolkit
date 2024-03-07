# Carousel

An extension of [Embla Carousel](https://www.embla-carousel.com/) that adds options for adding previous, next and pagination functionality.

## Differences from Embla

The primary difference from Embla is the first argument, which expects a parent DOM element vs the target carousel element. This is used as the default context for finding the carousel, previous, next and pagination dots elements. Note that `aria-label` attributes will automatically be added where needed.

```html
<div id="example">

  <div data-carousel-node>
    <ul>
      <li>Slide 1</li>
      <li>Slide 2</li>
      <li>Slide 3</li>
    </ul>
  </div>

  <button type="button" data-carousel-prev></button>
  <button type="button" data-carousel-next></button>

  <div data-carousel-dots></div>

</div>
```

Base styles with [zero specificity](https://polypane.app/css-specificity-calculator/#selector=%3Awhere(%5Bdata-carousel-node%5D%20%3E%20*)) to be overridden as needed within different components:

```css
:where([data-carousel-node]) {
  overflow: hidden;
}
:where([data-carousel-node] > *) {
  display: flex;
}
:where([data-carousel-node] > * > *) {
  flex: 0 0 100%;
  min-width: 0;
}
```

## Options
There are four custom options in addition to what [Embla Carousel](https://www.embla-carousel.com/api/options/) supports.

| Option | Type                  | Description |
| ------ | --------------------- | ----------- |
| `node` | `String` or `Element` | CSS selector or DOM element.<br>Defaults to `[data-carousel-node]` or the first element child of the root element. |
| `dots` | `String` or `Element` | CSS selector or DOM element. Defaults to `[data-carousel-dots]`.<br>Looks for `button` elements or populates them if empty. |
| `prev` | `String` or `Element` | CSS selector or DOM element. Defaults to `[data-carousel-prev]` |
| `next` | `String` or `Element` | CSS selector or DOM element. Defaults to `[data-carousel-next]` |

These can be overriden on a per-instance basis:

```js
const root = document.getElementById('example');

const carousel = new Carousel(root, {
  node: '.carousel > :first-child',
  prev: '.carousel-prev',
  prev: '.carousel-next',
  dots: '.carousel-dots',
});
```
Or globally, which can also be used to set Embla's [`globalOptions`](https://www.embla-carousel.com/api/options/#global-options):

```js
Carousel.options = {
  node: '.carousel-node',
  dots: '.carousel-dots',
  prev: '.carousel-prev',
  next: '.carousel-next',
};
```

## Plugins

This carousel automatically uses the [Class Names](https://www.embla-carousel.com/plugins/class-names/) plugin with the default settings, meant to be paired with the utility classes below. Additional plugins can be passed in as a third argument, or overridden globally via the `Carousel.plugins` array.

```css
.is-draggable { cursor: grab }
.is-dragging  { cursor: grabbing }
```

## Properties

All of Embla's [methods](https://www.embla-carousel.com/api/methods/) are proxied, however, if you need to access the Embla instance it is available via `carousel.embla`. There are also two conveinece properties that access underlying Embla methods:

* `carousel.slides` = `embla.slideNodes()`
* `carousel.index` = `embla.selectedScrollSnap()`

