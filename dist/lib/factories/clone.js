'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var clone = require('clone');

var NullFactory = require('./null');
var Transient = require('../constitutors/transient');

var CloneFactory = function (_NullFactory) {
  _inherits(CloneFactory, _NullFactory);

  function CloneFactory(value, constitutor0) {
    _classCallCheck(this, CloneFactory);

    // Alias defaults to the transient constitutor
    var constitutor = constitutor0 || Transient.with([]);

    var _this = _possibleConstructorReturn(this, _NullFactory.call(this, constitutor));

    _this.value = value;
    return _this;
  }

  CloneFactory.prototype.createInstance = function createInstance() {
    return clone(this.value);
  };

  return CloneFactory;
}(NullFactory);

module.exports = CloneFactory;