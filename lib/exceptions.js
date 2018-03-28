'use strict';

class InvalidInputError extends Error {
  constructor(errors = [], ...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidInputError);

    this.errors = errors;
  }
}

module.exports = {InvalidInputError};
