'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var BaseFactory = require('./base');
var Singleton = require('../constitutors/singleton');

var NullFactory = function (_BaseFactory) {
  _inherits(NullFactory, _BaseFactory);

  function NullFactory(constitutor) {
    _classCallCheck(this, NullFactory);

    var _this = _possibleConstructorReturn(this, _BaseFactory.call(this));

    _this.constitutor = Singleton.create(constitutor);
    return _this;
  }

  NullFactory.prototype.createInstance = function createInstance() {
    return null;
  };

  NullFactory.prototype.getCacheKey = function getCacheKey() {
    return this;
  };

  NullFactory.prototype.instantiate = function instantiate(container) {
    return this.constitutor.constitute(container, this.getCacheKey(), this.createInstance.bind(this, container));
  };

  NullFactory.prototype.getCachedInstance = function getCachedInstance(container) {
    return this.constitutor.getCachedInstance(container, this.getCacheKey());
  };

  return NullFactory;
}(BaseFactory);

module.exports = NullFactory;