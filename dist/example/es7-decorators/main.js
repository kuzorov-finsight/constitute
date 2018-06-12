'use strict';

var _ = require('../../');

var _2 = _interopRequireDefault(_);

var _a = require('./a');

var _a2 = _interopRequireDefault(_a);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Instantiate a class
// Calling constitute() creates a new dependency injection context
var a = (0, _2.default)(_a2.default);

console.log(a.constructor.name); // --> A
console.log(a.b.constructor.name); // --> B
console.log(a.c.constructor.name); // --> C

// Simple.