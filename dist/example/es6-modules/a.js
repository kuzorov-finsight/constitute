function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import B from './b';
import C from './c';

var A = function () {
  A.constitute = function constitute() {
    return [B, C];
  };

  function A(b, c) {
    _classCallCheck(this, A);

    this.b = b;
    this.c = c;
  }

  return A;
}();

export { A as default };