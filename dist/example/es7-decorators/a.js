'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _class;

var _b = require('./b');

var _b2 = _interopRequireDefault(_b);

var _c = require('./c');

var _c2 = _interopRequireDefault(_c);

var _constitute = require('constitute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = (_dec = (0, _constitute.Dependencies)(_b2.default, _c2.default), _dec(_class = function A(b, c) {
  _classCallCheck(this, A);

  this.b = b;
  this.c = c;
}) || _class);
exports.default = A;