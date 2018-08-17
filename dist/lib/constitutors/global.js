'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Singleton = require('./singleton');

var GlobalConstitutor = function (_Singleton) {
  _inherits(GlobalConstitutor, _Singleton);

  function GlobalConstitutor() {
    _classCallCheck(this, GlobalConstitutor);

    return _possibleConstructorReturn(this, _Singleton.apply(this, arguments));
  }

  GlobalConstitutor.getCachedInstance = function getCachedInstance(container, Class) {
    return GlobalConstitutor._instances.get(Class);
  };

  GlobalConstitutor.setCachedInstance = function setCachedInstance(container, Class, instance) {
    return GlobalConstitutor._instances.set(Class, instance);
  };

  return GlobalConstitutor;
}(Singleton);

GlobalConstitutor._instances = new Map();

module.exports = GlobalConstitutor;