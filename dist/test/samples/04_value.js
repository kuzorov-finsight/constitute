'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Value = require('../../').Value;

module.exports = function () {
  var B = new Value(42);

  var A = function () {
    A.constitute = function constitute() {
      return [B];
    };

    function A(b) {
      _classCallCheck(this, A);

      this.b = b;
    }

    return A;
  }();

  return { A: A, B: B };
};