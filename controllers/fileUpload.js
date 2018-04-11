'use strict';

const exceptions = require('../lib/exceptions');
const logger = require('../lib/logger');
const uploadService = require('../service').uploadService;
const Promise = require('bluebird');

module.exports = {
  'upload': (req, res) => {
    logger.info('uploading file');
    return Promise.try(() => uploadService
      .upload(req))
      .then((output) => {
        console.log('resp:', output);
        res.status(200).send(simpleRes(true, 'File Upload Success', output))
      })
      .catch(exceptions.InvalidInputError, (err) => res.status(400).send(invalidInputRes(false, err.errors)))
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
