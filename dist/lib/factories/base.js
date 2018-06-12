'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseFactory = function BaseFactory() {
  _classCallCheck(this, BaseFactory);

  if (this.constructor === BaseFactory) {
    throw new Error('BaseFactory cannot be instantiated directly');
  }
};

module.exports = BaseFactory;