'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseResolver = function () {
  function BaseResolver() {
    _classCallCheck(this, BaseResolver);

    if (this.constructor === BaseResolver) {
      throw new Error('BaseResolver cannot be instantiated directly');
    }
  }

  BaseResolver.of = function of(key) {
    return new this(key);
  };

  return BaseResolver;
}();

module.exports = BaseResolver;