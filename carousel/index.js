import Embla from 'embla-carousel';
import EmblaClassNames from 'embla-carousel-class-names';
import { isString, isEmpty, findOne, findAll, attr, bind, fill, html } from '@tmbr/utils';

class Carousel {

  constructor(root, options = {}, plugins = []) {

    bind(this, ['select']);

    const {
      node = Carousel.options.node || '[data-carousel-node]',
      dots = Carousel.options.dots || '[data-carousel-dots]',
      prev = Carousel.options.next || '[data-carousel-prev]',
      next = Carousel.options.next || '[data-carousel-next]',
      ...rest
    } = options;

    this.embla = new Embla(this.#find(node, root) || root.firstElementChild, {
      ...Carousel.options,
      ...rest
    }, [
      ...Carousel.plugins,
      ...plugins
    ]);

    this.#init({
      dots: this.#find(dots, root),
      prev: this.#find(prev, root),
      next: this.#find(next, root),
    });

    return new Proxy(this, {
      get: (self, key) => self[key] ?? self.embla[key]
    });
  }

  get index() {
    return this.embla.selectedScrollSnap();
  }

  get slides() {
    return this.embla.slideNodes();
  }

  #init({dots, prev, next}) {

    const length = this.slides.length;
    attr(this.embla.rootNode(), 'aria-label', `carousel, ${length} slides`);

    this.dots = isEmpty(dots) ? [] : dots.children.length
      ? findAll('button', dots)
      : fill(length, i => dots.appendChild(html`<button type="button" aria-label="Slide ${i + 1} of ${length}"></button>`));

    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.embla.scrollTo(i));
    });

    this.embla.on('select', this.select);
    this.select();

    if (prev) {
      attr(prev, 'aria-label', 'Previous Slide');
      prev.addEventListener('click', this.embla.scrollPrev);
    }

    if (next) {
      attr(next, 'aria-label', 'Next Slide');
      next.addEventListener('click', this.embla.scrollNext);
    }
  }

  #find(el, root) {
    return isString(el) ? findOne(el, root) : el;
  }

  select() {
    const current = this.index;
    this.dots.forEach((dot, i) => attr(dot, 'aria-current', i === current ? 'true' : false));
  }
}

Carousel.options = {
  // https://www.embla-carousel.com/api/options/
  loop: true
};

Carousel.plugins = [
  // https://www.embla-carousel.com/plugins/
  EmblaClassNames({inView: null})
];

export default Carousel;
