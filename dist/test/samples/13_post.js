'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = require('../../').Container;

module.exports = function () {
  // Example of using a post-constructor to resolve a cyclic dependency

  var A = function () {
    A.constitute = function constitute() {
      return [Container];
    };

    function A(container) {
      _classCallCheck(this, A);

      // Assigning b in a post-constructor allows both objects to be constructed
      // first, resolving the cyclic dependency.
      //
      // Note that the post-constructor still runs synchronously, before this
      // object is returned to any third-party consumers.
      container.schedulePostConstructor(function (b) {
        this.b = b;
      }, [B]);
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