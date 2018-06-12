'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _b = require('./b');

var _b2 = _interopRequireDefault(_b);

var _c = require('./c');

var _c2 = _interopRequireDefault(_c);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = function () {
  _createClass(A, null, [{
    key: 'constitute',
    value: function constitute() {
      return [_b2.default, _c2.default];
    }
  }]);

  function A(b, c) {
    _classCallCheck(this, A);

    this.b = b;
    this.c = c;
  }

  return A;
}();

exports.default = A;