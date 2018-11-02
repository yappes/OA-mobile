'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  debounce: function debounce(func, wait, immediate) {
    var timeout = void 0;

    return function () {
      var context = this;
      var args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  },
  isArray: function isArray(arg) {
    return Array.isArray(arg);
  },
  isFunction: function isFunction(arg) {
    return typeof arg === 'function';
  },
  isString: function isString(arg) {
    return typeof arg === 'string' || arg instanceof String;
  }
};