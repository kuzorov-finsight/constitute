'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var NullFactory = require('./null');
var Singleton = require('../constitutors/singleton');

var ClassFactory = function (_NullFactory) {
  _inherits(ClassFactory, _NullFactory);

  function ClassFactory(Class, constitutor) {
    _classCallCheck(this, ClassFactory);

    // Find class annotation
    if (Class.constitute && !constitutor) {
      var className = Class.name || '[anonymous]';
      constitutor = Singleton.create(Class.constitute, 'class ' + className);
    }

    var _this = _possibleConstructorReturn(this, _NullFactory.call(this, constitutor));

    _this.Class = Class;
    return _this;
  }

  ClassFactory.prototype.createInstance = function createInstance(container, params) {
    // Provide the dependencies to the constructor
    return new (Function.prototype.bind.apply(this.Class, [null].concat(params)))();
  };

  ClassFactory.prototype.getCacheKey = function getCacheKey() {
    // Classes are cached per class (even if there are multiple factories for the same class)
    return this.Class;
  };

  return ClassFactory;
}(NullFactory);

module.exports = ClassFactory;