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
    this.options = this._setOptions(customOptions);

    this._listener();
  }

  _setOptions(customOptions) {
    const defaultOptions = {
      scrollDuration: 500,
      offset: 0,
    };

    let options = {};

    Object.keys(defaultOptions).forEach(option => {
      if (customOptions[option]) return options[option] = customOptions[option];
      return options[option] = defaultOptions[option];
    });

    return options;
  }

  _listener() {
    this.scrollDownTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.scrollDown())
    });
  }

  scrollDown() {
    return jump(this.element, {
      duration: this.options.scrollDuration,
      offset: this.element.offsetHeight + this.options.offset,
    });
  }
}
