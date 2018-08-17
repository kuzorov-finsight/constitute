'use strict';

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

    FaultyClass.constitute = function constitute() {
      return [{}];
    };

    return FaultyClass;
  }();

  var ExampleClass = function () {
    ExampleClass.constitute = function constitute() {
      return [FaultyClass];
    };

    function ExampleClass(b) {
      _classCallCheck(this, ExampleClass);

      this.b = b;
    }

    return ExampleClass;
  }();

  FaultyFactory.constitute = [{}];
  function FaultyFactory() {}

  var FaultyPostClass = function () {
    FaultyPostClass.constitute = function constitute() {
      return [Container];
    };

    function FaultyPostClass(container) {
      _classCallCheck(this, FaultyPostClass);

      container.schedulePostConstructor(function () {}, [{}]);
    }

    return FaultyPostClass;
  }();

  return { FaultyClass: FaultyClass, ExampleClass: ExampleClass, FaultyFactory: FaultyFactory, FaultyPostClass: FaultyPostClass };
};