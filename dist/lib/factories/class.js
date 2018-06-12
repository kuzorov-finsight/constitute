'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    var _this = _possibleConstructorReturn(this, (ClassFactory.__proto__ || Object.getPrototypeOf(ClassFactory)).call(this, constitutor));

    _this.Class = Class;
    return _this;
  }

  _createClass(ClassFactory, [{
    key: 'createInstance',
    value: function createInstance(container, params) {
      // Provide the dependencies to the constructor
      return new (Function.prototype.bind.apply(this.Class, [null].concat(params)))();
    }
  }, {
    key: 'getCacheKey',
    value: function getCacheKey() {
      // Classes are cached per class (even if there are multiple factories for the same class)
      return this.Class;
    }
  }]);

  return ClassFactory;
}(NullFactory);

module.exports = ClassFactory;