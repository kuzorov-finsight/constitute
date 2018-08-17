var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import B from './b';
import C from './c';
import { Dependencies } from 'constitute';

var A = (_dec = Dependencies(B, C), _dec(_class = function A(b, c) {
  _classCallCheck(this, A);

  this.b = b;
  this.c = c;
}) || _class);
export { A as default };