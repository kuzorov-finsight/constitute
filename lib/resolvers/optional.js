'use strict'

const InstanceResolver = require('./instance')

class OptionalResolver extends InstanceResolver {
  resolve (container) {
    return container.getCachedInstance(this.key)
  }

  static of(key) {
    return new this(key)
  }
}

module.exports = OptionalResolver
