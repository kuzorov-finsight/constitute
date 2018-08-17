'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var All = require('../../').All;

module.exports = function () {
  var Plugin = function Plugin() {
    _classCallCheck(this, Plugin);
  };

  var A = function (_Plugin) {
    _inherits(A, _Plugin);

    function A() {
      _classCallCheck(this, A);

      return _possibleConstructorReturn(this, _Plugin.apply(this, arguments));
    }

    return A;
  }(Plugin);

  var B = function (_Plugin2) {
    _inherits(B, _Plugin2);

    function B() {
      _classCallCheck(this, B);

      return _possibleConstructorReturn(this, _Plugin2.apply(this, arguments));
    }

    return B;
  }(Plugin);

  // Note that we also have to call container.bindClass(Plugin, A), but we'll
  // do that in the test case since it is running the code to be tested.

  var App = function () {
    App.constitute = function constitute() {
      return [All.of(Plugin)];
    };

    function App(plugins) {
      _classCallCheck(this, App);

      this.plugins = plugins;
    }

    return App;
  }();

  return { Plugin: Plugin, A: A, B: B, App: App };
};