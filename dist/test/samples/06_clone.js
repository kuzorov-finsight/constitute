'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clone = require('../../').Clone;
var Transient = require('../../').Transient;

module.exports = function () {
  var data = { foo: 'bar' };
  var B = new Clone(data);

  var A = function () {
    A.constitute = function constitute() {
      return Transient.with([B]);
    };

    function A(b) {
      _classCallCheck(this, A);

      this.b = b;
    }

    return A;
  }();

  return { data: data, A: A, B: B };
};