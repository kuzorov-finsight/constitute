'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseFactory = require('./base');
var Singleton = require('../constitutors/singleton');

var NullFactory = function (_BaseFactory) {
  _inherits(NullFactory, _BaseFactory);

  function NullFactory(constitutor) {
    _classCallCheck(this, NullFactory);

    var _this = _possibleConstructorReturn(this, (NullFactory.__proto__ || Object.getPrototypeOf(NullFactory)).call(this));

    _this.constitutor = Singleton.create(constitutor);
    return _this;
  }

  _createClass(NullFactory, [{
    key: 'createInstance',
    value: function createInstance() {
      return null;
    }
  }, {
    key: 'getCacheKey',
    value: function getCacheKey() {
      return this;
    }
  }, {
    key: 'instantiate',
    value: function instantiate(container) {
      return this.constitutor.constitute(container, this.getCacheKey(), this.createInstance.bind(this, container));
    }
  }, {
    key: 'getCachedInstance',
    value: function getCachedInstance(container) {
      return this.constitutor.getCachedInstance(container, this.getCacheKey());
    }
  }]);

  return NullFactory;
}(BaseFactory);

module.exports = NullFactory;