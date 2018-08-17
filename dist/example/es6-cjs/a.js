'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var B = require('./b');
var C = require('./c');

var A = function () {
  A.constitute = function constitute() {
    return [B, C];
  };

  function A(b, c) {
    _classCallCheck(this, A);

    this.b = b;
    this.c = c;
  }

  return A;
}();

module.exports = A;