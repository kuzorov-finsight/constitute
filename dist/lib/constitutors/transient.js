'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Singleton = require('./singleton');

var TransientConstitutor = function (_Singleton) {
  _inherits(TransientConstitutor, _Singleton);

  function TransientConstitutor() {
    _classCallCheck(this, TransientConstitutor);

    return _possibleConstructorReturn(this, (TransientConstitutor.__proto__ || Object.getPrototypeOf(TransientConstitutor)).apply(this, arguments));
  }

  _createClass(TransientConstitutor, null, [{
    key: 'getCachedInstance',
    value: function getCachedInstance() {
      // Instances are never cached in this constitutor
      return null;
    }
  }, {
    key: 'setCachedInstance',
    value: function setCachedInstance() {
      // Instances are never cached in this constitutor
    }
  }]);

  return TransientConstitutor;
}(Singleton);

module.exports = TransientConstitutor;