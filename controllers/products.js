'use strict';

const exceptions = require('../lib/exceptions');
const logger = require('../lib/logger');
const productService = require('../service').productService;
const _ = require('lodash');
const SequelizeEmptyResultError = require('../models').Sequelize.EmptyResultError;

module.exports = {
  'createProduct': (req, res) => {
    logger.info('Creating product');
    return productService
        .create(req.body)
      .then((newProduct) => productService.fullRes(newProduct))
      .then((output) => res.status(201).send(simpleRes('Successfully Created Product', output)))
      .catch(exceptions.InvalidInputError, (err) => res.status(400).send(invalidInputRes(0, err.errors)))
      .catch((err) => {
        logger.error(err);
        return res.status(500).send();
      });
  },
  'getProducts': (req, res) => {
    logger.info('Searching Products');
    const limit = req.swagger.params.limit.value;
    const offset = req.swagger.params.offset.value;
    const fields = req.swagger.params.fields.value;

    const options = {
      'fields'     : fields,
      'limit'      : req.swagger.params.limit.value,
      'offset'     : req.swagger.params.offset.value
    };
    const parsedProducts = [];
    let searchResult;
    return productService
          .search(options)
      .then((result) => {
        searchResult = result;
        const promises = [];
        if (_.find(fields, (field) => _.trim(field) === '*')) {
          _.forEach(searchResult.objects, (product) => {
            promises.push(productService.fullRes(product)
              .then((data) => {
                parsedProducts.push(data);
              }));
          });
        } else {
          _.forEach(searchResult.objects, (product) => {
            promises.push(productService.partialRes(product, fields)
              .then((data) => {
                parsedProducts.push(data);
              }));
          });
        }
        return Promise.all(promises);
      })
      .then(() =>
        res.status(200).send(searchRes(parsedProducts, searchResult.count, offset, limit)))
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch((err) => {
        logger.error(err);
        return res.status(500).send(err);
      });
  },
  'getProduct': (req, res) => {
    logger.info('Getting a product');
    const productId = req.swagger.params.productId.value;
    const fields = req.swagger.params.field.value;
    return productService
      .get(productId, {'rejectOnEmpty': true})
      .then((product) => {
        if (_.find(fields, (field) => _.trim(field) === '*')) {
          return productService.fullRes(product);
        }
        return productService.partialRes(product, fields);
      })
      .then((data) => res.status(200).send(simpleRes('Successfully Retrieved Product Task', data)))
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch((err) => {
        logger.error(err);
        res.status(500).send();
      });
  },
  'modifyProduct': (req, res) => {
    logger.info('Modifying a Product');
    const productId = req.swagger.params.productId.value;
    return productService
      .get(productId, {'rejectOnEmpty': true})
      .then(() => productService
        .modify(productId, req.body))
      .then((modifyProduct) =>
        productService.fullRes(modifyProduct)
      )
      .then((data) =>
        res.status(200).send(simpleRes('Successfully Modified Product', data))
      )
      .catch(exceptions.InvalidInputError, (err) => res.status(400).send(invalidInputRes(0, err.errors)))
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch((err) => {
        logger.error(err);
        return res.status(500).send();
      });
  },
  'deleteProduct': (req, res) => {
    logger.info('Deleting a product');
    const productId = req.swagger.params.productId.value;
    return productService
      .get(productId, {'rejectOnEmpty': true})
      .then(() => productService.delete(productId))
      .then((data) =>
        res.status(201).send(simpleRes('Successfully Deleted Product', data))
      )
      .catch(SequelizeEmptyResultError, () => res.status(404).send())
      .catch((err) => {
        logger.error(err);
        res.status(500).send();
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
