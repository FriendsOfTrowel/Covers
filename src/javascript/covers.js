import jump from '../../node_modules/jump.js';

export default class TrowelCovers {
  constructor(elements, options = {}) {
    [].slice.call(elements).forEach(function(element, index) {
      let element_obj = new TrowelCover(element, options);
    })
  }
}

class TrowelCover {
  constructor(element, customOptions = {}) {
    this.element = element;
    this.scrollDownTriggers = [].slice.call(this.element.querySelectorAll('[data-cover-scrolldown]'));
    this.options = customOptions;

    this.events = this.events();
    this.listener();
    this.element.dispatchEvent(this.events.mounted);
    return;
  }

  set options(customOptions) {
    const defaultOptions = {
      scrollDuration: 500,
      offset: 0,
    };

    return this._options = Object.keys(defaultOptions).reduce((options, option) => {
      options[option] = customOptions[option] ? customOptions[option] : defaultOptions[option];
      return options;
    }, {})
  }

  get options() {
    return this._options;
  }

  scrollDown() {
    this.element.dispatchEvent(this.events.jump);
    jump(this.element, {
      duration: this.options.scrollDuration,
      offset: this.element.offsetHeight + this.options.offset,
    });
    this.element.dispatchEvent(this.events.jumped);
    return;
  }

  listener() {
    this.scrollDownTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.scrollDown())
    });
  }

  events() {
    const jump = new Event('trowel.cover.jump');
    const jumped = new Event('trowel.cover.jumped');
    const mounted = new Event('trowel.cover.mounted');

    return { jump, jumped, mounted };
  }
}
