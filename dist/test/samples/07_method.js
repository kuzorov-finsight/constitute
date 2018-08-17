'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Method = require('../../').Method;

module.exports = function () {
  var C = function C() {
    _classCallCheck(this, C);
  };

  var B = new Method(function (c) {
    return { c: c };
  }, [C]);

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

  return { A: A, B: B, C: C };
};