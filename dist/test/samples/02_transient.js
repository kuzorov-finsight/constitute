'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var expect = require('chai').expect;
var Transient = require('../../').Transient;

module.exports = function () {
  var B = function B() {
    _classCallCheck(this, B);
  };

  var A = function () {
    A.constitute = function constitute() {
      return Transient.with([B]);
    };

    function A(b) {
      _classCallCheck(this, A);

      expect(b).to.be.instanceOf(B);
      this.b = b;
    }

    return A;
  }();

  return { A: A, B: B };
};