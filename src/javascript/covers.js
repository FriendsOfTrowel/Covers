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

    return this.listener();
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
    return jump(this.element, {
      duration: this.options.scrollDuration,
      offset: this.element.offsetHeight + this.options.offset,
    });
  }

  listener() {
    this.scrollDownTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.scrollDown())
    });
  }
}
