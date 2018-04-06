'use strict';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./env/config');
const cors = require('cors')

module.exports = (app, cb) => {
  // Configure the request logger middleware
  //  Only if we're not in a test environment
  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({'extended': false}));
  app.use(cors())
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, OPTIONS");
    next();
  });

  // 404 if none of the routes were hit
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Error Response
  app.use((err, req, res, next) => {
    console.log(err);
    // res.locals.message = err.message;
    // res.locals.error = err || {};
    // res.statusCode = err.status || 500;
    // res.status(res.statusCode).send('error:', err);
    // next();
  });

   cb();
};
