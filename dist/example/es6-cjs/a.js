'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var B = require('./b');
var C = require('./c');

var A = function () {
  _createClass(A, null, [{
    key: 'constitute',
    value: function constitute() {
      return [B, C];
    }
  }]);

  function A(b, c) {
    _classCallCheck(this, A);

    this.b = b;
    this.c = c;
  }

  return A;
}();

module.exports = A;