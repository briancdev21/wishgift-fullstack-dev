'use strict';

const exceptions = require('../lib/exceptions');
const logger = require('../lib/logger');
const loginService = require('../service').loginService;
const _ = require('lodash');
const SequelizeEmptyResultError = require('../models').Sequelize.EmptyResultError;

module.exports = {
  'login': (req, res) => {
    logger.info('Admin Login');
    return loginService
      .checkEmail(req.body)
      .then((output) => res.status(201).send(simpleRes('Successfully Login', output)))
      .catch(exceptions.InvalidInputError, (err) => res.status(400).send(invalidInputRes(0, err.errors)))
      .catch((err) => {
        logger.error(err);
        return res.status(500).send();
      });
  }
};


const invalidInputRes = (code, err) => ({
  'status' : 400,
  'code'   : code,
  'message': 'Invalid Input(s)',
  'errors' : err
});


const simpleRes = (message, data) => ({
  'message': message,
  'data'   : data
});


const searchRes = (datas, total, offset, limit) => ({
  'message': total > 0 ? `Found ${total} result(s)` : 'No results found',
  'total'  : total,
  'offset' : offset,
  'limit'  : limit,
  'results': datas
});
