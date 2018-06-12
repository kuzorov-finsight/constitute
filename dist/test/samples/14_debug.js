'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = require('../../').Container;

module.exports = function () {
  // Example of an instantiation that fails. We want to use this to test and make
  // sure that constitute produces stack traces that enable easy debugging.

  // This tries to instantiate an object, which will fail
  var FaultyClass = function () {
    function FaultyClass() {
      _classCallCheck(this, FaultyClass);
    }

    _createClass(FaultyClass, null, [{
      key: 'constitute',
      value: function constitute() {
        return [{}];
      }
    }]);

    return FaultyClass;
  }();

  var ExampleClass = function () {
    _createClass(ExampleClass, null, [{
      key: 'constitute',
      value: function constitute() {
        return [FaultyClass];
      }
    }]);

    function ExampleClass(b) {
      _classCallCheck(this, ExampleClass);

      this.b = b;
    }

    return ExampleClass;
  }();

  FaultyFactory.constitute = [{}];
  function FaultyFactory() {}

  var FaultyPostClass = function () {
    _createClass(FaultyPostClass, null, [{
      key: 'constitute',
      value: function constitute() {
        return [Container];
      }
    }]);

    function FaultyPostClass(container) {
      _classCallCheck(this, FaultyPostClass);

      container.schedulePostConstructor(function () {}, [{}]);
    }

    return FaultyPostClass;
  }();

  return { FaultyClass: FaultyClass, ExampleClass: ExampleClass, FaultyFactory: FaultyFactory, FaultyPostClass: FaultyPostClass };
};