'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var expect = require('chai').expect;
var Util = require('../').Util;

describe('Util', function () {
  beforeEach(function () {
    this.minimal = require('./samples/01_minimal')();
  });

  describe('convertSetToArray', function () {
    it('should return elements in order', function () {
      var set = new Set();
      set.add('a');
      set.add(9);
      set.add('boo');
      set.add(Util);

      var arr = Util.convertSetToArray(set);

      expect(arr).to.deep.equal(['a', 9, 'boo', Util]);
    });
  });

  describe('printPrettyKey', function () {
    it('should print classes by their name', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('A');
    });

    it('should print functions by their name', function () {
      function A() {}

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('A');
    });

    it('should print anonymous classes as [anonymous class]', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('[anonymous class]');
    });

    it('should print anonymous functions as [anonymous fn]', function () {
      var A = function A() {};

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('[anonymous fn]');
    });

    it('should print numbers as the number itself', function () {
      var A = 1337;

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('1337');
    });

    it('should print 0 as 0', function () {
      var A = 0;

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('0');
    });

    it('should print null as [null]', function () {
      var A = null;

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('[null]');
    });

    it('should print true as [true]', function () {
      var A = true;

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('[true]');
    });

    it('should print false as [false]', function () {
      var A = false;

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('[false]');
    });

    it('should print objects as {}', function () {
      var A = { foo: 'bar' };

      var pretty = Util.printPrettyKey(A);

      expect(pretty).to.be.a('string');
      expect(pretty).to.equal('{}');
    });
  });
});