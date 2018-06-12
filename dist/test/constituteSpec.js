'use strict';

var expect = require('chai').expect;
var constitute = require('../');

describe('constitute', function () {
  beforeEach(function () {
    this.minimal = require('./samples/01_minimal')();
  });

  it('should instantiate classes when called', function () {
    var a = constitute(this.minimal.A);

    expect(a).to.be.instanceOf(this.minimal.A);
  });
});