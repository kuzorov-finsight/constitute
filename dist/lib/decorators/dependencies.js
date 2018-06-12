'use strict';

var Constitutor = require('../constitutors/base');
var Singleton = require('../constitutors/singleton');

/**
 * Constitute decorator for classes.
 */
module.exports = function Dependencies(constitutor0) {
  var constitutor = void 0;
  if (constitutor0 instanceof Constitutor) {
    constitutor = constitutor0;
  } else {
    var dependencies = Array.prototype.slice.call(arguments);
    constitutor = Singleton.create(dependencies);
  }
  return function (Class) {
    Class.constitute = constitutor;
  };
};