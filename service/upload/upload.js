'use strict';

const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../../config/env/config');
const exceptions = require('../../lib/exceptions');
const logger = require('../../lib/logger');
const fs = require('fs');
const Promise = require('bluebird');

module.exports = {
  'upload': (req) => {
    if (!req.files) {
      logger.info('No files were uploaded.');
    }
    const sampleFile = req.files.upfile[0];
    const buffer = sampleFile.buffer;
    const newPath = `uploads/${sampleFile.originalname}`;
    return fs.open(newPath, 'w', function(err, fd) {
      if (err) {
        return Promise.reject(new exceptions.InvalidInputError(err));
      }
  
      fs.write(fd, buffer, 0, buffer.length, null, function(err) {
          if (err) {
             return Promise.reject(new exceptions.InvalidInputError('error writing file: ' + err));
          }
          fs.close(fd, function() {
              logger.info('file written');
          })
      });
    });
  }
};
