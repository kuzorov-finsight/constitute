'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  var B = function B() {
    _classCallCheck(this, B);
  };

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