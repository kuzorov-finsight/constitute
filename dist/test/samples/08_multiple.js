'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  var E = function E() {
    _classCallCheck(this, E);
  };

  var F = function F() {
    _classCallCheck(this, F);
  };

  var B = function B() {
    _classCallCheck(this, B);
  };

  var C = function () {
    _createClass(C, null, [{
      key: 'constitute',
      value: function constitute() {
        return [E];
      }
    }]);

    function C(e) {
      _classCallCheck(this, C);

      this.e = e;
    }

    return C;
  }();

  var D = function () {
    _createClass(D, null, [{
      key: 'constitute',
      value: function constitute() {
        return [E, F];
      }
    }]);

    function D(e, f) {
      _classCallCheck(this, D);

      this.e = e;
      this.f = f;
    }

    return D;
  }();

  var A = function () {
    _createClass(A, null, [{
      key: 'constitute',
      value: function constitute() {
        return [B, C, D];
      }
    }]);

    function A(b, c, d) {
      _classCallCheck(this, A);

      this.b = b;
      this.c = c;
      this.d = d;
    }

    return A;
  }();

  return { A: A, B: B, C: C, D: D, E: E, F: F };
};