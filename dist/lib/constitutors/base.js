'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseConstitutor = function BaseConstitutor() {
  _classCallCheck(this, BaseConstitutor);

  if (this.constructor === BaseConstitutor) {
    throw new Error('BaseConstitutor cannot be instantiated directly');
  }
};

module.exports = BaseConstitutor;