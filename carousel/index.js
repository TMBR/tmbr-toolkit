import EmblaCarousel from 'embla-carousel';
import EmblaCarouselClassNames from 'embla-carousel-class-names';
import { isString, isEmpty, findAll, findAll, attr, bind, fill, html } from '@tmbr/utils';

class Carousel {

  constructor(root, options, plugins = []) {

    bind(this);

    const {
      node = Carousel.customOptions.node,
      prev = Carousel.customOptions.next,
      next = Carousel.customOptions.next,
      dots = Carousel.customOptions.dots,
      ...rest
    } = options;

    this.embla = new EmblaCarousel(this.find(node, root) || root.firstElementChild, {
      ...Carousel.globalOptions,
      ...rest
    }, [
      ...Carousel.plugins,
      ...plugins
    ]);

    this.init({
      dots: this.find(dots, root),
      prev: this.find(prev, root),
      next: this.find(next, root),
    });

    return new Proxy(this, {
      get: (self, key) => self[key] || self.embla[key]
    });
  }

  get index() {
    return this.embla.selectedScrollSnap();
  }

  get slides() {
    return this.embla.slideNodes();
  }

  init({dots, prev, next}) {

    const length = this.slides.length;

    this.dots = isEmpty(dots) ? [] : dots.children.length
      ? findAll('button', dots)
      : fill(length, i => dots.appendChild(html`<button type="button" aria-label="Slide ${i + 1} of ${length}"></button>`));

    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.embla.scrollTo(i));
    });

    this.embla.on('select', this.select);
    this.select();

    prev?.addEventListener('click', this.embla.scrollPrev);
    next?.addEventListener('click', this.embla.scrollNext);
  }

  find(el, root) {
    return isString(el) ? findOne(el, root) : el;
  }

  select() {
    const current = this.index;
    this.dots.forEach((dot, i) => attr(dot, 'aria-current', i === current ? 'true' : false));
  }
}

Carousel.globalOptions = {
  // https://www.embla-carousel.com/api/options/
};

Carousel.customOptions = {
  node: null,
  prev: '.carousel-prev',
  next: '.carousel-next',
  dots: '.carousel-dots',
};

Carousel.plugins = [
  EmblaCarouselClassNames({draggable: 'cursor-grab', dragging: 'cursor-grabbing'})
];

export default Carousel;
