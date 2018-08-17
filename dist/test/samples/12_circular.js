'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
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

  var B = function () {
    B.constitute = function constitute() {
      return [A];
    };

    function B(a) {
      _classCallCheck(this, B);

      this.a = a;
    }

    return B;
  }();

  return { A: A, B: B };
};