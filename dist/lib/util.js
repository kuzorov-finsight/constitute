'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Util = exports;

exports.convertSetToArray = function (set) {
  var arr = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = set[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var v = _step.value;

      arr.push(v);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return arr;
};

exports.isClass = function (candidate) {
  return typeof candidate === 'function' && /^\s*class\s+/.test(candidate.toString());
};

exports.printPrettyKey = function (key) {
  switch (typeof key === 'undefined' ? 'undefined' : _typeof(key)) {
    case 'function':
      return key.name || (Util.isClass(key) ? '[anonymous class]' : '[anonymous fn]');
    case 'object':
      return key === null ? '[null]' : '{}';
    case 'boolean':
      return '[' + key + ']';
    default:
      return key.toString();
  }
};