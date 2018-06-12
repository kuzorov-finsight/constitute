'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var Container = require('../').Container;
var ValueFactory = require('../').Value;
var ClassFactory = require('../').Class;

describe('Container', function () {
  beforeEach(function () {
    this.container = new Container();
  });

  describe('findBestFactory', function () {
    it('should find a bound item', function () {
      var container = new Container();
      var symbol = Symbol();
      container.bindValue(Container, symbol);
      var value = container.findBestFactory(Container);

      expect(value).to.be.instanceOf(ValueFactory);
      expect(value.value).to.equal(symbol);
    });

    it('should find the most recently bound item', function () {
      var container = new Container();
      var symbol = Symbol();
      container.bindValue(Container, symbol);
      var symbol2 = Symbol();
      container.bindValue(Container, symbol2);
      var value = container.findBestFactory(Container);

      expect(value).to.be.instanceOf(ValueFactory);
      expect(value.value).to.equal(symbol2);
    });
  });

  describe('findAllFactories', function () {
    it('should find all factories in insertion order', function () {
      var container = new Container();

      var A = function A() {
        _classCallCheck(this, A);
      };

      var facA = new ValueFactory(10);
      var facB = new ValueFactory(20);
      container.bindCustom(A, facA);
      container.bindCustom(A, facB);

      var factories = container.findAllFactories(A);
      expect(factories).to.deep.equal([facA, facB]);
    });

    it('should return an empty array if there are no factories', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var container = new Container();
      var factories = container.findAllFactories(A);
      expect(factories).to.be.instanceOf(Array);
      expect(factories).to.be.empty;
    });
  });

  describe('constitute', function () {
    beforeEach(function () {
      this.container = new Container();
      this.container2 = new Container();
    });

    it('should instantiate classes when called', function () {
      this.env = require('./samples/01_minimal')();
      var a = this.container.constitute(this.env.A);

      expect(a).to.be.instanceOf(this.env.A);
      expect(a.b).to.be.instanceOf(this.env.B);
    });

    it('should instantiate classes when called on classes with multiple dependencies', function () {
      this.env = require('./samples/08_multiple')();
      var a = this.container.constitute(this.env.A);

      expect(a).to.be.instanceOf(this.env.A);
      expect(a.b).to.be.instanceOf(this.env.B);
      expect(a.c).to.be.instanceOf(this.env.C);
      expect(a.d).to.be.instanceOf(this.env.D);
      expect(a.c.e).to.be.instanceOf(this.env.E);
      expect(a.d.e).to.be.instanceOf(this.env.E);
      expect(a.d.f).to.be.instanceOf(this.env.F);
    });

    it('should instantiate only one singleton when called twice', function () {
      this.env = require('./samples/01_minimal')();
      var a1 = this.container.constitute(this.env.A);
      var a2 = this.container.constitute(this.env.A);

      expect(a1).to.be.instanceOf(this.env.A);
      expect(a1.b).to.be.instanceOf(this.env.B);
      expect(a1).to.equal(a2);
      expect(a1.b).to.equal(a2.b);
    });

    it('should instantiate different singletons when called twice on different containers', function () {
      this.env = require('./samples/01_minimal')();
      var a1 = this.container.constitute(this.env.A);
      var a2 = this.container2.constitute(this.env.A);

      expect(a1).to.be.instanceOf(this.env.A);
      expect(a2).to.be.instanceOf(this.env.A);
      expect(a1.b).to.be.instanceOf(this.env.B);
      expect(a2.b).to.be.instanceOf(this.env.B);
      expect(a1).to.not.equal(a2);
      expect(a1.b).to.not.equal(a2.b);
    });

    it('should instantiate new instances of transient classes when called twice', function () {
      this.env = require('./samples/02_transient')();
      var a1 = this.container.constitute(this.env.A);
      var a2 = this.container.constitute(this.env.A);

      expect(a1).to.not.equal(a2);
      expect(a1).to.be.instanceOf(this.env.A);
      expect(a2).to.be.instanceOf(this.env.A);
      expect(a1.b).to.be.instanceOf(this.env.B);
      expect(a1.b).to.equal(a2.b);
    });

    it('should always use the same instance on global classes', function () {
      this.env = require('./samples/03_global')();
      var a1 = this.container.constitute(this.env.A);
      var a2 = this.container2.constitute(this.env.A);

      expect(a1).to.be.instanceOf(this.env.A);
      expect(a2).to.be.instanceOf(this.env.A);
      expect(a1).to.equal(a2);
      expect(a1.b).to.equal(a2.b);
    });

    it('should be able to resolve a value factory', function () {
      this.env = require('./samples/04_value')();
      var a = this.container.constitute(this.env.A);

      expect(a).to.be.instanceOf(this.env.A);
      expect(a.b).to.equal(42);
    });

    it('should follow aliases when using an alias factory', function () {
      this.env = require('./samples/05_alias')();
      var a = this.container.constitute(this.env.A);

      expect(a).to.be.instanceOf(this.env.A);
      expect(a.b).to.be.instanceOf(this.env.C);
    });

    it('should return a copy of the data when using the clone factory', function () {
      this.env = require('./samples/06_clone')();

      var a = this.container.constitute(this.env.A);

      expect(a).to.be.instanceOf(this.env.A);
      expect(a.b).to.deep.equal(this.env.data);
      expect(a.b).to.not.equal(this.env.data);
    });

    it('should return independent instances when using the clone factory', function () {
      this.env = require('./samples/06_clone')();

      var a1 = this.container.constitute(this.env.A);
      var a2 = this.container.constitute(this.env.A);

      a2.b.foo = 'baz';

      expect(a1.b).to.not.equal(a2.b);
      expect(a1).to.be.instanceOf(this.env.A);
      // Check against static data also in case we somehow modified the original object
      expect(a1.b).to.deep.equal({ foo: 'bar' });
      expect(a1.b).to.deep.equal(this.env.data);
      expect(a2).to.be.instanceOf(this.env.A);
      expect(a2.b).to.deep.equal({ foo: 'baz' });
    });

    it('should call factory method when using a method factory', function () {
      this.env = require('./samples/07_method')();
      var a = this.container.constitute(this.env.A);

      expect(a).to.be.instanceOf(this.env.A);
      expect(a.b.c).to.be.instanceOf(this.env.C);
    });

    it('should automatically detect annotations on method factories', function () {
      var B = function B() {
        _classCallCheck(this, B);
      };

      A.constitute = [B];
      function A(b) {
        return { b: b };
      }

      this.container.bindMethod(A, A);
      var a = this.container.constitute(A);

      expect(a).to.be.an('object');
      expect(a.b).to.be.instanceOf(B);
    });

    it('should throw when an anonymous method factory has an invalid annotation', function () {
      var container = this.container;
      expect(function () {
        var A = function A(b) {
          return { b: b };
        };
        A.constitute = function () {
          return 'bleh';
        };

        container.bindMethod(A, A);
        container.constitute(A);
      }).to.throw(Error, /The constitute annotation in factory \[anonymous\] returned an invalid value of type string \(should have been an array or a constitutor function\)/);
    });

    it('should let you mock a class via binding', function () {
      var MockB = function MockB() {
        _classCallCheck(this, MockB);
      };

      var env = require('./samples/01_minimal')();
      this.container.bindClass(env.B, MockB);
      var a = this.container.constitute(env.A);

      expect(a).to.be.instanceOf(env.A);
      expect(a.b).to.be.instanceOf(MockB);
    });

    it('should instantiate all classes when using the All resolver', function () {
      this.env = require('./samples/09_plugin')();
      this.container.bindClass(this.env.Plugin, this.env.A);
      this.container.bindClass(this.env.Plugin, this.env.B);

      var app = this.container.constitute(this.env.App);

      expect(app).to.be.instanceOf(this.env.App);
      expect(app.plugins).to.have.length(2);
      expect(app.plugins[0]).to.be.instanceOf(this.env.A);
      expect(app.plugins[1]).to.be.instanceOf(this.env.B);
    });

    it('should create lazy resolver methods when using the Lazy resolver', function () {
      this.env = require('./samples/10_lazy')();

      var a = this.container.constitute(this.env.A);

      expect(a).to.be.instanceOf(this.env.A);
      expect(a.b).to.be.a('function');
      expect(a.b()).to.be.instanceOf(this.env.B);
    });

    it('should return undefined for uncached instances when using the Optional resolver', function () {
      this.env = require('./samples/11_optional')();

      var a = this.container.constitute(this.env.A);

      expect(a).to.be.instanceOf(this.env.A);
      expect(a.b).to.be.undefined;
    });

    it('should return cached instances when using the Optional resolver', function () {
      this.env = require('./samples/11_optional')();

      this.container.constitute(this.env.B);
      var a = this.container.constitute(this.env.A);

      expect(a).to.be.instanceOf(this.env.A);
      expect(a.b).to.be.instanceOf(this.env.B);
    });

    it('should return itself when asking for a Container', function () {
      var container = this.container.constitute(Container);

      expect(container).to.equal(this.container);
    });

    it('should throw when detecting a circular dependency', function () {
      var self = this;
      this.env = require('./samples/12_circular')();

      expect(function () {
        self.container.constitute(self.env.A);
      }).to.throw(Error, /Circular dependency detected: A => B => A/);
    });

    it('should unwind circular dependency stack when a constructor throws', function () {
      var self = this;

      expect(function () {
        var A = function A() {
          _classCallCheck(this, A);

          throw new Error('test');
        };

        self.container.constitute(A);
      }).to.throw(Error, /test/);

      expect(this.container._stack.size).to.equal(0);
    });

    it('should produce a useful error message when a class instantiation fails', function () {
      var env = require('./samples/14_debug')();
      var self = this;

      expect(function () {
        self.container.constitute(env.ExampleClass);
      }).to.throw(Error, /Cannot constitute a value of type object \(while constituting FaultyClass\)/);
    });

    it('should produce a useful error message when a factory instantiation fails', function () {
      var env = require('./samples/14_debug')();
      var self = this;

      expect(function () {
        self.container.constitute(env.FaultyFactory);
      }).to.throw(Error, /Cannot constitute a value of type object \(while constituting FaultyFactory\)/);
    });

    it('should produce a useful error message when a post constructor instantiation fails', function () {
      var env = require('./samples/14_debug')();
      var self = this;

      expect(function () {
        self.container.constitute(env.FaultyPostClass);
      }).to.throw(Error, /Cannot constitute a value of type object \(while constituting post constructor for FaultyPostClass\)/);
    });
  });

  describe('bindNull', function () {
    beforeEach(function () {
      this.container = new Container();
    });

    it('should create a null factory', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      this.container.bindNull(A);

      var a = this.container.constitute(A);
      expect(a).to.equal(null);
    });
  });

  describe('bindAlias', function () {
    beforeEach(function () {
      this.container = new Container();
    });

    it('should redirect a key to another key', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function B() {
        _classCallCheck(this, B);
      };

      this.container.bindAlias(A, B);

      var a = this.container.constitute(A);
      expect(a).to.be.instanceOf(B);
    });

    it('should redirect through several levels', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function B() {
        _classCallCheck(this, B);
      };

      var C = function C() {
        _classCallCheck(this, C);
      };

      this.container.bindAlias(A, B);
      this.container.bindAlias(B, C);

      var a = this.container.constitute(A);
      expect(a).to.be.instanceOf(C);
    });

    it('should follow remaps', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function B() {
        _classCallCheck(this, B);
      };

      var C = function C() {
        _classCallCheck(this, C);
      };

      this.container.bindAlias(A, B);
      this.container.bindClass(B, C);

      var a = this.container.constitute(A);
      expect(a).to.be.instanceOf(C);
    });
  });

  describe('bindValue', function () {
    beforeEach(function () {
      this.container = new Container();
    });

    it('should create a value factory', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      this.container.bindValue(A, 42);

      var a = this.container.constitute(A);
      expect(a).to.equal(42);
    });
  });

  describe('bindMethod', function () {
    beforeEach(function () {
      this.container = new Container();
    });

    it('should create a method factory', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function B() {
        _classCallCheck(this, B);
      };

      this.container.bindMethod(A, function () {
        return new B();
      });

      var a = this.container.constitute(A);
      expect(a).to.be.instanceOf(B);
    });

    it('should throw when given an invalid constitutor', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function B() {
        _classCallCheck(this, B);
      };

      var container = this.container;
      expect(function () {
        container.bindMethod(A, function () {
          return new B();
        }, {});
      }).to.throw(/Invalid constitutor of type object/);
    });
  });

  describe('bindClass', function () {
    beforeEach(function () {
      this.container = new Container();
    });

    it('should create a class factory', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function B() {
        _classCallCheck(this, B);
      };

      this.container.bindClass(A, B);

      var a = this.container.constitute(A);
      expect(a).to.be.instanceOf(B);
    });

    it('should throw when the class exports invalid metadata', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function () {
        function B() {
          _classCallCheck(this, B);
        }

        _createClass(B, null, [{
          key: 'constitute',
          value: function constitute() {
            return {};
          }
        }]);

        return B;
      }();

      var container = this.container;
      expect(function () {
        container.bindClass(A, B);
      }).to.throw(/The constitute annotation in class B returned an invalid value of type object \(should have been an array or a constitutor function\)/);
    });

    it('should throw when an anonymous class exports invalid metadata', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function B() {};
      B.constitute = function () {
        return {};
      };

      var container = this.container;
      expect(function () {
        container.bindClass(A, B);
      }).to.throw(/The constitute annotation in class \[anonymous\] returned an invalid value of type object \(should have been an array or a constitutor function\)/);
    });
  });

  describe('bindCustom', function () {
    beforeEach(function () {
      this.container = new Container();
    });

    it('should use a custom factory', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var counter = 0;

      var IncrementFactory = function (_ValueFactory) {
        _inherits(IncrementFactory, _ValueFactory);

        function IncrementFactory() {
          _classCallCheck(this, IncrementFactory);

          return _possibleConstructorReturn(this, (IncrementFactory.__proto__ || Object.getPrototypeOf(IncrementFactory)).apply(this, arguments));
        }

        _createClass(IncrementFactory, [{
          key: 'instantiate',
          value: function instantiate() {
            return counter++;
          }
        }]);

        return IncrementFactory;
      }(ValueFactory);

      this.container.bindCustom(A, new IncrementFactory());

      var a1 = this.container.constitute(A);
      expect(a1).to.equal(0);

      var a2 = this.container.constitute(A);
      expect(a2).to.equal(1);
    });

    it('should throw when the factory is not a subclass of BaseFactory', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var container = this.container;
      expect(function () {
        container.bindCustom(A, new A());
      }).to.throw(/Container#bindCustom expects a Factory object/);
    });
  });

  describe('resolveFactory', function () {
    beforeEach(function () {
      this.container = new Container();
    });

    it('should default to the key itself', function () {
      var fac = new ValueFactory(10);
      var a = this.container.resolveFactory(fac);
      expect(a).to.equal(fac);
    });

    it('should create a class factory automatically', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var a = this.container.resolveFactory(A);
      expect(a).to.be.instanceOf(ClassFactory);
    });

    it('should resolve to the most recent binding', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var facA = new ValueFactory(10);
      var facB = new ValueFactory(20);
      this.container.bindCustom(A, facA);
      this.container.bindCustom(A, facB);
      var a = this.container.resolveFactory(A);
      expect(a).to.equal(facB);
    });

    it('should throw when the key is undefined and invalid as a default', function () {
      var A = {};
      var container = this.container;
      expect(function () {
        container.resolveFactory(A);
      }).to.throw(/Cannot constitute a value of type object/);
      this.container.resolveFactory;
    });

    it('should not throw when the key is defined even when it is invalid as a default', function () {
      var A = {};
      this.container.bindNull(A);
      var a = this.container.resolveFactory(A);
      expect(a).to.be.a('object');
    });
  });

  describe('createChild', function () {
    it('should return a valid container', function () {
      var masterContainer = new Container();
      var subContainer = masterContainer.createChild();

      expect(subContainer).to.be.instanceOf(Container);
    });

    it('should inherit mapping from the parent', function () {
      var masterContainer = new Container();
      var subContainer = masterContainer.createChild();

      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function B() {
        _classCallCheck(this, B);
      };

      masterContainer.bindClass(A, B);

      expect(masterContainer.constitute(A)).to.be.instanceOf(B);
      expect(subContainer.constitute(A)).to.be.instanceOf(B);
    });

    it('should not propagate mappings to the parent', function () {
      var masterContainer = new Container();
      var subContainer = masterContainer.createChild();

      var A = function A() {
        _classCallCheck(this, A);
      };

      var B = function B() {
        _classCallCheck(this, B);
      };

      subContainer.bindClass(A, B);

      expect(masterContainer.constitute(A)).to.be.instanceOf(A);
      expect(subContainer.constitute(A)).to.be.instanceOf(B);
    });

    it('should accumulate All resolvers with the parent', function () {
      var masterContainer = new Container();
      var subContainer = masterContainer.createChild();

      this.env = require('./samples/09_plugin')();
      masterContainer.bindClass(this.env.Plugin, this.env.A);
      masterContainer.bindClass(this.env.Plugin, this.env.B);

      var C = function (_env$Plugin) {
        _inherits(C, _env$Plugin);

        function C() {
          _classCallCheck(this, C);

          return _possibleConstructorReturn(this, (C.__proto__ || Object.getPrototypeOf(C)).apply(this, arguments));
        }

        return C;
      }(this.env.Plugin);

      subContainer.bindClass(this.env.Plugin, C);

      var app = subContainer.constitute(this.env.App);

      expect(app).to.be.instanceOf(this.env.App);
      expect(app.plugins).to.have.length(3);
      expect(app.plugins[0]).to.be.instanceOf(this.env.A);
      expect(app.plugins[1]).to.be.instanceOf(this.env.B);
      expect(app.plugins[2]).to.be.instanceOf(C);
    });

    it('should use parent cache', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var masterContainer = new Container();
      var subContainer = masterContainer.createChild();

      var a1 = masterContainer.constitute(A);
      var a2 = subContainer.constitute(A);

      expect(a1).to.equal(a2);
    });

    it('should not influence parent cache, but should stick to own if already populated', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var masterContainer = new Container();
      var subContainer = masterContainer.createChild();

      var a2 = subContainer.constitute(A);
      var a1 = masterContainer.constitute(A);
      var a3 = subContainer.constitute(A);

      expect(a1).to.not.equal(a2);
      expect(a2).to.equal(a3);
    });
  });

  describe('schedulePostConstructor', function () {
    beforeEach(function () {
      this.container = new Container();
    });

    it('should run the post-constructor before finishing constitution', function () {
      var postConstructor = sinon.spy();

      var A = function () {
        _createClass(A, null, [{
          key: 'constitute',
          value: function constitute() {
            return [Container];
          }
        }]);

        function A(container) {
          _classCallCheck(this, A);

          container.schedulePostConstructor(postConstructor);
        }

        return A;
      }();

      var a = this.container.constitute(A);

      expect(postConstructor).to.have.been.calledOnce;
      expect(postConstructor).to.have.been.calledOn(a);
      expect(postConstructor).to.have.been.calledWithExactly();
    });

    it('should run the post-constructor with dependencies', function () {
      var postConstructor = sinon.spy();

      var A = function () {
        _createClass(A, null, [{
          key: 'constitute',
          value: function constitute() {
            return [Container];
          }
        }]);

        function A(container) {
          _classCallCheck(this, A);

          container.schedulePostConstructor(postConstructor, [Container]);
        }

        return A;
      }();

      var a = this.container.constitute(A);

      expect(postConstructor).to.have.been.calledOnce;
      expect(postConstructor).to.have.been.calledOn(a);
      expect(postConstructor).to.have.been.calledWithExactly(this.container);
    });

    it('should run the post-constructor even if class depends on itself', function () {
      var postConstructor = sinon.spy();

      var A = function () {
        _createClass(A, null, [{
          key: 'constitute',
          value: function constitute() {
            return [Container];
          }
        }]);

        function A(container) {
          _classCallCheck(this, A);

          container.schedulePostConstructor(postConstructor, [A]);
        }

        return A;
      }();

      var a = this.container.constitute(A);

      expect(postConstructor).to.have.been.calledOnce;
      expect(postConstructor).to.have.been.calledOn(a);
      expect(postConstructor).to.have.been.calledWithExactly(a);
    });

    it('should solve circular dependencies forward', function () {
      var env = require('./samples/13_post')();

      var a = this.container.constitute(env.A);

      expect(a).to.be.instanceOf(env.A);
      expect(a.b).to.be.instanceOf(env.B);
    });

    it('should solve circular dependencies backward', function () {
      var env = require('./samples/13_post')();

      var b = this.container.constitute(env.B);

      expect(b).to.be.instanceOf(env.B);
      expect(b.a).to.be.instanceOf(env.A);
    });
  });
});