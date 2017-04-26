(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TrowelCovers", [], factory);
	else if(typeof exports === 'object')
		exports["TrowelCovers"] = factory();
	else
		root["TrowelCovers"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrowelCovers = function TrowelCovers(elements) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, TrowelCovers);

  [].slice.call(elements).forEach(function (element, index) {
    var element_obj = new TrowelCover(element, options);
  });
};

exports.default = TrowelCovers;

var TrowelCover = function () {
  function TrowelCover(element) {
    var customOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TrowelCover);

    this.element = element;
    this.scrollDownTriggers = [].slice.call(this.element.querySelectorAll('[data-cover-scrolldown]'));
    this.options = this._setOptions(customOptions);

    this._listener();
  }

  _createClass(TrowelCover, [{
    key: '_setOptions',
    value: function _setOptions(customOptions) {
      var defaultOptions = {
        scrollDuration: 500,
        topOffset: 0
      };

      var options = {};

      Object.keys(defaultOptions).forEach(function (option) {
        if (customOptions[option]) return options[option] = customOptions[option];
        return options[option] = defaultOptions[option];
      });

      return options;
    }
  }, {
    key: '_listener',
    value: function _listener() {
      var _this = this;

      this.scrollDownTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
          return _this.scrollDown();
        });
      });
    }
  }, {
    key: 'scrollDown',
    value: function scrollDown() {
      var scrollTop = this.element.offsetTop + this.element.offsetHeight - this.options.topOffset;
      return this._smoothScrollTo(document.body, scrollTop, this.options.scrollDuration);
    }
  }, {
    key: '_smoothScrollTo',
    value: function _smoothScrollTo(element, target, duration) {
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
      var smooth_step = function smooth_step(start, end, point) {
        if (point <= start) return 0;
        if (point >= end) return 1;
        var x = (point - start) / (end - start); // interpolation
        return x * x * (3 - 2 * x);
      };

      return new Promise(function (resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        var previous_top = element.scrollTop;

        // This is like a think function from a game loop
        var scroll_frame = function scroll_frame() {
          if (element.scrollTop != previous_top) {
            reject("interrupted");
            return;
          }

          // set the scrollTop for this frame
          var now = Date.now();
          var point = smooth_step(start_time, end_time, now);
          var frameTop = Math.round(start_top + distance * point);
          element.scrollTop = frameTop;

          // check if we're done!
          if (now >= end_time) {
            resolve();
            return;
          }

          // If we were supposed to scroll but didn't, then we
          // probably hit the limit, so consider it done; not
          // interrupted.
          if (element.scrollTop === previous_top && element.scrollTop !== frameTop) {
            resolve();
            return;
          }
          previous_top = element.scrollTop;

          // schedule next frame for execution
          setTimeout(scroll_frame, 0);
        };

        // boostrap the animation process
        setTimeout(scroll_frame, 0);
      });
    }
  }]);

  return TrowelCover;
}();

module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=covers.js.map