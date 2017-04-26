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
      topOffset: 0,
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
    const scrollTop = this.element.offsetTop + this.element.offsetHeight - this.options.topOffset;
    return this._smoothScrollTo(document.body, scrollTop, this.options.scrollDuration);
  }

  _smoothScrollTo(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);

    if (duration < 0) return Promise.reject("bad duration");

    if (duration === 0) {
      element.scrollTop = target;
      return Promise.resolve();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollTop;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point) {
      if (point <= start) return 0;
      if (point >= end) return 1;
      var x = (point - start) / (end - start); // interpolation
      return x * x * (3 - 2 * x);
    }

    return new Promise(function(resolve, reject) {
      // This is to keep track of where the element's scrollTop is
      // supposed to be, based on what we're doing
      var previous_top = element.scrollTop;

      // This is like a think function from a game loop
      var scroll_frame = function() {
        if(element.scrollTop != previous_top) {
          reject("interrupted");
          return;
        }

        // set the scrollTop for this frame
        var now = Date.now();
        var point = smooth_step(start_time, end_time, now);
        var frameTop = Math.round(start_top + (distance * point));
        element.scrollTop = frameTop;

        // check if we're done!
        if(now >= end_time) {
          resolve();
          return;
        }

        // If we were supposed to scroll but didn't, then we
        // probably hit the limit, so consider it done; not
        // interrupted.
        if(element.scrollTop === previous_top
          && element.scrollTop !== frameTop) {
            resolve();
            return;
          }
          previous_top = element.scrollTop;

          // schedule next frame for execution
          setTimeout(scroll_frame, 0);
        }

        // boostrap the animation process
        setTimeout(scroll_frame, 0);
      });
    }
  }
