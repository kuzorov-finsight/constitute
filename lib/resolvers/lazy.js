'use strict'

const InstanceResolver = require('./instance')

class LazyResolver extends InstanceResolver {
  resolve (container) {
    const key = this.key
    return function () {
      return container.constitute(key)
    }
  }

  static of(key) {
    return new this(key)
  }
}

module.exports = LazyResolver
