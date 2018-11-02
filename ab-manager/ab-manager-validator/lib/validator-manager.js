'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(rule, field, value, isRulesArray, ruleIndex) {
  var _this = this;

  var errors = this.$validation.errors;
  var requiredRule = 'required';

  if (!errors[field]) {
    _vue2.default.set(errors, field, []);
  }

  if (_utils2.default.isArray(rule)) {
    if (rule.indexOf(requiredRule) > -1 || value) {
      return rule.map(function (item, itemIndex) {
        return validate.call(_this, item, field, value, true, itemIndex);
      }).indexOf(false) === -1;
    } else {
      if (errors[field] && errors[field].length > 0) {
        errors[field] = [];
      }
      return true;
    }
  }

  if (!isRulesArray && rule !== requiredRule && rule.test !== requiredRule && !value) {
    if (errors[field] && errors[field].length > 0) {
      errors[field] = [];
    }
    return true;
  }

  var regex = _utils2.default.isString(rule) ? _rules2.default[rule] : _utils2.default.isString(rule.test) ? _rules2.default[rule.test] : rule;

  if (!regex || !regex.test) {
    console.warn('[validator] rule does not exist: ' + (rule.test || rule));
    return;
  }

  regex.errorMsg = rule.errorMsg || regex.errorMsg;

  var valid = _utils2.default.isFunction(regex.test) ? regex.test.call(this, value) : regex.test.test(value);

  if (valid === undefined) {
    var returnValueError = '[validator] custom rule must return error message or boolean value: ' + JSON.stringify(rule);
    throw new Error(returnValueError);
  }

  if (_utils2.default.isString(valid)) {
    regex.errorMsg = valid;
    valid = false;
  }

  if (!isRulesArray) {
    var error = errors[field];

    if (!valid && error.length <= 0) {
      error.push({
        index: ruleIndex,
        errorMsg: regex.errorMsg
      });
    }

    if (valid && error.length > 0) {
      errors[field] = [];
    }
  } else {
    var _error = errors[field];
    var oldErrorIndex = _error.findIndex(function (item) {
      return item.index === ruleIndex;
    });

    if (valid) {
      oldErrorIndex > -1 && _error.splice(oldErrorIndex, 1);
    } else if (oldErrorIndex < 0) {
      var insertIndex = _error.findIndex(function (item) {
        return ruleIndex < item.index;
      });
      if (insertIndex < 0) {
        insertIndex = _error.length;
      }

      _error.splice(insertIndex, 0, {
        index: ruleIndex,
        errorMsg: regex.errorMsg
      });
    }
  }

  return valid;
}

function setValidators(validators) {
  var _this2 = this;

  Object.keys(validators).forEach(function (field) {
    _this2.$watch(field, function (value) {
      var flag = validate.call(_this2, validators[field], field, value);
    });
  });
}

function parsePath(path) {
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }
    return obj;
  };
}

exports.default = {
  created: function created() {
    var rules = this.$options.validators;
    if (rules) {
      _vue2.default.util.defineReactive(this, '$validation', {
        errors: {}
      });
      setValidators.call(this, rules);
    }
  },

  methods: {
    $validate: function $validate(fields) {
      var _this3 = this;

      var rules = this.$options.validators;
      fields = fields || Object.keys(rules);

      return fields.map(function (field) {
        return validate.call(_this3, rules[field], field, parsePath(field)(_this3));
      }).indexOf(false) === -1;
    },
    $clearValidation: function $clearValidation() {
      this.$validation.errors = {};
    }
  }
};