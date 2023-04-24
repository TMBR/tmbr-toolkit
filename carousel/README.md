# Carousel

An extension of [Embla Carousel](https://www.embla-carousel.com/) that adds options for basic previous, next and pagination functionality.

## Differences from Embla

The only difference to Embla is the first option, which expects a parent DOM element vs the target carousel element. This is used as the default context for finding the carousel, previous, next and pagination elements.

```html
<div class="carousel" id="example">

  <div>
    <ul class="carousel-track">
      <li class="carousel-slide">Slide 1</li>
      <li class="carousel-slide">Slide 2</li>
      <li class="carousel-slide">Slide 3</li>
    </ul>
  </div>

  <button type="button" class="carousel-prev" aria-label="Previous Slide"></button>
  <button type="button" class="carousel-next" aria-label="Next Slide"></button>

  <div class="carousel-dots"></div>

</div>
```

```css
.carousel-track {
  display: flex;
}
.carousel-slide {
  flex: 0 0 100%;
  min-width: 0;
}
```

```js
const root = document.getElementById('example');

const carousel = new Carousel(root, {
  node: '.carousel > :first-child',
  prev: '.carousel-prev',
  prev: '.carousel-next',
  dots: '.carousel-dots',
});
```

## Options
There are four custom options in addition to the [Embla Carousel](https://www.embla-carousel.com/api/options/) defaults. Similar to Embla's [`globalOptions`](https://www.embla-carousel.com/api/options/#global-options) feature, these can all be overriden via:

```js
Carousel.customOptions = {
  node: '.my-carousel-node',
  prev: '.my-carousel-prev',
  next: '.my-carousel-next',
  dots: '.my-carousel-dots',
};
```

| Option | Type | Description |
| ------ | ---- | ----------- |
| `node` | `String` or `Element` | CSS selector or DOM element.<br>Defaults to the first element child of the root carousel element. |
| `prev` | `String` or `Element` | CSS selector or DOM element. Defaults to `.carousel-prev` |
| `next` | `String` or `Element` | CSS selector or DOM element. Defaults to `.carousel-next` |
| `dots` | `String` or `Element` | CSS selector or DOM element. Defaults to `.carousel-dots`.<br>Looks for `button` elements or populates them if empty. |

## Plugins

This carousel automatically includes the [Class Names](https://www.embla-carousel.com/plugins/class-names/) plugin with `cursor-grab` and `cursor-grabbing`, meant for use with the utility classes below. Additional plugins can be passeed in or overridden globaly via the `Carousel.plugins` array.

```css
.cursor-grab {
  cursor: grab;
}
.cursor-grabbing {
  cursor: grabbing;
}
```

## Properties

All of Embla's [methods](https://www.embla-carousel.com/api/methods/) are available, however, if you need to access the Embla instance it is available via `carousel.embla`.
There are also two conveinece properties that access underlying Embla methods:

* `carousel.slides` = `embla.slideNodes()`
* `carousel.index` = `embla.selectedScrollSnap()`

