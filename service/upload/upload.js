'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../../config/env/config');

module.exports = {
  'upload': (input) => {
    if (input.email === 'admin.worthitgifts@mail.com' && !_.isEmpty(input.password)) {
      const payload = {
        admin: input.email
      };
      const token = jwt.sign(payload, config.secret);
      return token;
    }
    const errors = 'Invalid Email or Password';
    return Promise.reject(new exceptions.InvalidInputError(errors));
  }
};
