'use strict';

var expect = require('chai').expect;

var BaseConstitutor = require('../').Constitutor;
var BaseFactory = require('../').Factory;
var BaseResolver = require('../').Resolver;

describe('BaseConstitutor', function () {
  it('cannot be instantiated', function () {
    expect(function () {
      this.constitutor = new BaseConstitutor();
    }).to.throw(/BaseConstitutor cannot be instantiated directly/);
  });
});

describe('BaseFactory', function () {
  it('cannot be instantiated', function () {
    expect(function () {
      this.factory = new BaseFactory();
    }).to.throw(/BaseFactory cannot be instantiated directly/);
  });
});

describe('BaseResolver', function () {
  it('cannot be instantiated', function () {
    expect(function () {
      this.resolver = new BaseResolver();
    }).to.throw(/BaseResolver cannot be instantiated directly/);
  });
});