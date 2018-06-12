'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseConstitutor = require('./base');
var BaseResolver = require('../resolvers/base');
var InstanceResolver = require('../resolvers/instance');

var INSTANCE_MAP = Symbol('constitute:instance_map');

var SingletonConstitutor = function (_BaseConstitutor) {
  _inherits(SingletonConstitutor, _BaseConstitutor);

  function SingletonConstitutor(constituents) {
    _classCallCheck(this, SingletonConstitutor);

    var _this = _possibleConstructorReturn(this, (SingletonConstitutor.__proto__ || Object.getPrototypeOf(SingletonConstitutor)).call(this));

    _this.constituents = constituents.map(function (constituent) {
      if (constituent instanceof BaseResolver) {
        return constituent;
      }

      return InstanceResolver.of(constituent);
    });
    return _this;
  }

  /**
   * Create a constitutor from the value the caller provided.
   *
   * When passed an array, we create a new SingletonConstitutor using provided
   * array as the dependencies.
   *
   * When passed an existing constitutor, we simply pass it through..
   *
   * When passed a falsy value, we create a default constitutor which is a
   * singleton with no dependencies.
   *
   * Otherwise, we assume something has gone horribly wrong and throw an Error.
   */


  _createClass(SingletonConstitutor, [{
    key: 'constitute',
    value: function constitute(container, key, fn) {
      var instance = this.constructor.getCachedInstance(container, key);
      if (instance) {
        return instance;
      }

      var params = this.constituents.map(function (constituent) {
        return constituent.resolve(container);
      });
      instance = Function.prototype.call.call(fn, null, params);

      this.constructor.setCachedInstance(container, key, instance);

      return instance;
    }
  }, {
    key: 'getCachedInstance',
    value: function getCachedInstance(container, key) {
      return this.constructor.getCachedInstance(container, key);
    }
  }], [{
    key: 'create',
    value: function create(constitutor, contextHint) {
      if (typeof constitutor === 'function') {
        constitutor = constitutor();

        if (Array.isArray(constitutor)) {
          return SingletonConstitutor.with(constitutor);
        } else if (constitutor instanceof BaseConstitutor) {
          return constitutor;
        }

        // Not a valid return value
        var context = contextHint ? 'The constitute annotation in ' + contextHint : 'A constitute annotation';
        throw new Error(context + ' returned an invalid value ' + 'of type ' + (typeof constitutor === 'undefined' ? 'undefined' : _typeof(constitutor)) + ' (should have been an ' + 'array or a constitutor function)');
      } else if (Array.isArray(constitutor)) {
        // Use default constitutor
        return SingletonConstitutor.with(constitutor);
      } else if (constitutor instanceof BaseConstitutor) {
        return constitutor;
      } else if (!constitutor) {
        return SingletonConstitutor.with([]);
      } else {
        throw new Error('Invalid constitutor of type ' + (typeof constitutor === 'undefined' ? 'undefined' : _typeof(constitutor)));
      }
    }
  }, {
    key: 'getInstanceCache',
    value: function getInstanceCache(container) {
      if (!container[INSTANCE_MAP]) {
        container[INSTANCE_MAP] = new Map();
      }
      return container[INSTANCE_MAP];
    }
  }, {
    key: 'getCachedInstance',
    value: function getCachedInstance(container, key) {
      var cachedInstance = this.getInstanceCache(container).get(key);

      // Check parent's cache
      if (!cachedInstance && container._parent) {
        return this.getCachedInstance(container._parent, key);
      }

      return cachedInstance;
    }
  }, {
    key: 'setCachedInstance',
    value: function setCachedInstance(container, key, instance) {
      return this.getInstanceCache(container).set(key, instance);
    }
  }, {
    key: 'with',
    value: function _with(constituents) {
      return new this(constituents);
    }
  }]);

  return SingletonConstitutor;
}(BaseConstitutor);

module.exports = SingletonConstitutor;