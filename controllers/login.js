'use strict';

const exceptions = require('../lib/exceptions');
const logger = require('../lib/logger');
const loginService = require('../service').loginService;
const Promise = require('bluebird');

module.exports = {
  'login': (req, res) => {
    logger.info('admin login');
    return Promise.attempt(() => loginService
      .login(req.body))
      .then((output) =>
          res.status(200).send(simpleRes(true, 'Login Success', output))
      )
      .catch(exceptions.InvalidInputError, (err) => res.status(401).send(invalidInputRes(false, err.errors)))
      .catch((err) => {
        logger.error(err);
        return res.status(500).send();
      });
  }
};

const invalidInputRes = (status, err) => ({
  'status' : status,
  'message': err
});


const simpleRes = (status, message, data) => ({
  'status': status,
  'message': message,
  'data'   : data
});
