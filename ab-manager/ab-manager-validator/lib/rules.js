'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  email: {
    test: /.+@.+\..+/,
    errorMsg: '邮箱格式错误'
  },
  required: {
    test: function test(value) {
      return !!value;
    },

    errorMsg: '必填项'
  },
  mobilePhoneNumber: {
    test: /^1[34578]\d{9}$/,
    errorMsg: '手机号码格式错误'
  },
  zip: {
    test: /^[1-9][0-9]{5}$/,
    errorMsg: '邮编格式错误'
  },
  add: function add(rules) {
    var _this = this;

    Object.keys(rules).forEach(function (rule) {
      if (!_this[rule]) {
        _this[rule] = rules[rule];
      } else {
        console.warn('[validator] rule exists:', rule);
      }
    });
  }
};