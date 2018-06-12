'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseResolver = function () {
  function BaseResolver() {
    _classCallCheck(this, BaseResolver);

    if (this.constructor === BaseResolver) {
      throw new Error('BaseResolver cannot be instantiated directly');
    }
  }

  _createClass(BaseResolver, null, [{
    key: 'of',
    value: function of(key) {
      return new this(key);
    }
  }]);

  return BaseResolver;
}();

module.exports = BaseResolver;