'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var expect = require('chai').expect;
var constitute = require('../');
var Singleton = constitute.Singleton;
var Transient = constitute.Transient;

describe('Singleton', function () {
  describe('create', function () {
    it('should pass existing constitutors straight through', function () {
      var constitutor = Transient.with([]);
      var result = Singleton.create(constitutor);
      expect(result).to.be.instanceOf(Transient);
      expect(result).to.equal(constitutor);
    });

    it('should create a Singleton constitutor when passed an array of dependencies', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var result = Singleton.create([A]);
      expect(result).to.be.instanceOf(Singleton);
    });

    it('should execute a constitutor function and use the returned constitutor', function () {
      var constitutor = Transient.with([]);
      var constitutorFn = function constitutorFn() {
        return constitutor;
      };
      var result = Singleton.create(constitutorFn);
      expect(result).to.be.instanceOf(Transient);
      expect(result).to.equal(constitutor);
    });

    it('should execute a constitutor function and create a Singleton constitutor when that function returns an array of dependencies', function () {
      var A = function A() {
        _classCallCheck(this, A);
      };

      var constitutorFn = function constitutorFn() {
        return [A];
      };
      var result = Singleton.create(constitutorFn);
      expect(result).to.be.instanceOf(Singleton);
    });

    it('should throw when a constitutor factory returns invalid results', function () {
      expect(function () {
        Singleton.create(function () {
          return 'blah';
        });
      }).to.throw(Error, /A constitute annotation returned an invalid value of type string \(should have been an array or a constitutor function\)/);
    });
  });
});