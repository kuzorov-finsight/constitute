'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assert = require('assert');

var Factory = require('./factories/base');
var NullFactory = require('./factories/null');
var AliasFactory = require('./factories/alias');
var ClassFactory = require('./factories/class');
var ValueFactory = require('./factories/value');
var MethodFactory = require('./factories/method');
var Singleton = require('./constitutors/singleton');
var Util = require('./util');

var ERROR_ADDED_DEBUG_INFO = Symbol('constitute/ERROR_ADDED_DEBUG_INFO');

var Container = function () {
  function Container() {
    _classCallCheck(this, Container);

    this._factories = new Map();
    this._parent = null;
    this._stack = new Set();
    this._postConstructors = new Set();

    // Cache ourselves as the Container instance in our own cache
    Singleton.setCachedInstance(this, Container, this);
  }

  Container.prototype._getOrCreateEntry = function _getOrCreateEntry(key) {
    var entry = this._factories.get(key);
    if (!entry) {
      this._factories.set(key, entry = new Set());
    }
    return entry;
  };

  Container.prototype.bindNull = function bindNull(key) {
    return this.bindCustom(key, new NullFactory());
  };

  Container.prototype.bindAlias = function bindAlias(key, destinationKey) {
    return this.bindCustom(key, new AliasFactory(destinationKey));
  };

  Container.prototype.bindClass = function bindClass(key, Class, constitutor) {
    return this.bindCustom(key, new ClassFactory(Class, constitutor));
  };

  Container.prototype.bindValue = function bindValue(key, value) {
    return this.bindCustom(key, new ValueFactory(value));
  };

  Container.prototype.bindMethod = function bindMethod(key, fn, constitutor) {
    return this.bindCustom(key, new MethodFactory(fn, constitutor));
  };

  Container.prototype.bindCustom = function bindCustom(key, factory) {
    var entry = this._getOrCreateEntry(key);
    if (!(factory instanceof Factory)) {
      throw new Error('Container#bindCustom expects a Factory object');
    }
    entry.add(factory);
    entry.mostRecent = factory;
    return this;
  };

  Container.prototype.findBestFactory = function findBestFactory(key) {
    var entry = this._factories.get(key);
    if (!entry && this._parent) {
      return this._parent.findBestFactory(key);
    }
    return entry ? entry.mostRecent : null;
  };

  Container.prototype.findAllFactories = function findAllFactories(key) {
    var parentEntries = this._parent ? this._parent.findAllFactories(key) : [];

    var entry = this._factories.get(key);
    if (entry) {
      var array = parentEntries;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = entry[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          array.push(v);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return array;
    }

    return parentEntries;
    // TODO With new ES6 array methods we can just do this
    // return entry ? Array.from(entry) : []
  };

  Container.prototype.resolveFactory = function resolveFactory(key) {
    // First, try to find a local binding
    var binding = this.findBestFactory(key);

    if (binding) return binding;

    // Next, try the parent container
    // TODO: Implement container hierarchy

    // Finally, default to the key itself
    if (key instanceof Factory) {
      // Nothing to do
      return key;
    } else if (typeof key === 'function') {
      // Key is a function, we'll assume it's a class constructor
      return new ClassFactory(key);
    } else {
      throw new Error('Cannot constitute a value of type ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
    }
  };

  Container.prototype.constitute = function constitute(key) {
    // Detect circular dependencies by tracking the stack of requested instantiations
    // TODO: Should the pretty printing show the key, the factory or both?
    if (this._stack.has(key)) {
      var stackArray = Util.convertSetToArray(this._stack);
      stackArray.push(key);
      var prettyStack = stackArray.map(Util.printPrettyKey).join(' => ');
      throw new Error('Circular dependency detected: ' + prettyStack);
    }

    this._stack.add(key);
    try {
      var factory = this.resolveFactory(key);
      var instance = void 0;
      try {
        instance = factory.instantiate(this);
      } catch (err) {
        if (err && (typeof err === 'undefined' ? 'undefined' : _typeof(err)) === 'object' && typeof err.message === 'string' && !err[ERROR_ADDED_DEBUG_INFO]) {
          err.message += ' (while constituting ' + Util.printPrettyKey(key) + ')';
          err[ERROR_ADDED_DEBUG_INFO] = true;
        }
        throw err;
      }
      this._stack.delete(key);

      if (this._postConstructors.size) {
        // We need to copy the post constructors to a local variable so that any
        // instantiations that happen inside of them don't retrigger our's
        var postConstructors = this._postConstructors;
        this._postConstructors = new Set();

        // The post-constructors should be run on a separate stack since
        // B => A (post => B) is actually ok
        var stack = this._stack;
        this._stack = new Set();
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = postConstructors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var postConstructor = _step2.value;

            // Set this in the post constructor to the instance being built
            postConstructor.fn = postConstructor.fn.bind(instance);

            try {
              postConstructor.instantiate(this);
            } catch (err) {
              if (err && (typeof err === 'undefined' ? 'undefined' : _typeof(err)) === 'object' && typeof err.message === 'string' && !err[ERROR_ADDED_DEBUG_INFO]) {
                err.message += ' (while constituting post constructor for ' + Util.printPrettyKey(key) + ')';
                err[ERROR_ADDED_DEBUG_INFO] = true;
              }
              throw err;
            }

            assert.equal(this._stack.size, 0);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this._stack = stack;
      }

      return instance;
    } catch (err) {
      // We need to catch errors to unwind the circular dependency stack
      this._stack.delete(key);
      throw err;
    }
  };

  Container.prototype.constituteAll = function constituteAll(key) {
    var self = this;
    var factories = this.findAllFactories(key);

    return factories.map(function (factory) {
      return factory.instantiate(self);
    });
  };

  Container.prototype.getCachedInstance = function getCachedInstance(key) {
    var factory = this.resolveFactory(key);
    return factory.getCachedInstance(this);
  };

  Container.prototype.createChild = function createChild() {
    var container = new Container();
    container._parent = this;
    return container;
  };

  Container.prototype.schedulePostConstructor = function schedulePostConstructor(callback, constitutor) {
    var postConstructor = new MethodFactory(callback, constitutor);

    this._postConstructors.add(postConstructor);
  };

  return Container;
}();

module.exports = Container;