
'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const exceptions = require('../../lib/exceptions');
const Products = require('../../models').Products;
const Tags = require('../../models').Tags;
const Relationships = require('../../models').Relationships;
const logger = require('../../lib/logger');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  'create': (params) => {
    logger.info('Create product');
    let newProduct = {};
    return Promise.props({
      'tags': Tags.findAll({'where': {'name': {[Op.or]: params.tags}}}),
      'relationships': Relationships.findAll({'where': {'name': {[Op.or]: params.relationships}}}),
      'newProduct': Products.create({
        'name': params.name,
        'createdDate': params.createdDate,
        'visibility': params.visibility,
        'gender': params.gender,
        'url': params.url,
        'productImage': params.productImage,
        'ages': params.ages,
        'price': params.price,
        'clicks': params.clicks,
        'twitterShares': params.twitterShares,
        'facebookShares': params.facebookShares,
        'pinterestShares': params.pinterestShares
      })
    })
    .then((result) => {
      newProduct = result.newProduct;
      return Promise.all([
        result.newProduct.setTags(result.tags),
        result.newProduct.setRelationships(result.relationships)
      ]);
    })
    .then(() => newProduct);
  },
  'search': (options) => {
    logger.info('Get products');
    const where = {};
    const order = [];

    order.push(['id']);
    
    return Promise.props({
      'count': WorkOrder.count({
        'where'  : where
      }),
      'objects': WorkOrder.findAll(
        {
          'where'  : where,
          'limit'  : options.limit,
          'offset' : options.offset,
          'order'  : order
        }
      )
    });
  },
  'get': (productId, options = {}) => {
    logger.info('Get product');
    return Products.findOne({
      'where'        : {'id': productId},
      'rejectOnEmpty': options.rejectOnEmpty ? options.rejectOnEmpty : false
    });
  },
  'modify': (productId, params) => {
    logger.info('Modify product');
    let updateProduct = {};
    return Products.findOne({
      'where': {'id': productId}
    })
      .then((product) => Promise.props({
        'tags': Tags.findAll({'where': {'name': {[Op.or]: params.tags}}}),
        'relationships': Relationships.findAll({'where': {'name': {[Op.or]: params.relationships}}}),'updateProduct': product.update({
          'name': params.name,
          'visibility': params.visibility,
          'gender': params.gender,
          'url': params.url,
          'productImage': params.productImage,
          'ages': params.ages,
          'price': params.price,
          'clicks': params.clicks,
          'twitterShares': params.twitterShares,
          'facebookShares': params.facebookShares,
          'pinterestShares': params.pinterestShares
        })
      }))
      .then((result) => {
        updateProduct = result.updateProduct;
        return Promise.all([
          result.updateProduct.setTags(result.tags),
          result.updateProduct.setRelationships(result.relationships)
        ]);
      })
      .then(() => updateProduct);
  },
  'delete': (productId) => {
    logger.info('Delete product');
    return Products.findOne({
        'where'        : {'id': productId}
      })
      .then((product) => product.destroy());
  },
  'fullRes': (product) => {
    const output = _.clone(productModel);
    return new Promise((resolve) => {
      output.id = product.id;
      output.name = product.name;
      output.createdDate = product.createdDate;
      output.name = product.name;
      output.visibility = product.visibility;
      output.gender = product.gender;
      output.url = product.url;
      output.productImage = product.productImage;
      output.ages = product.ages;
      output.price = product.price;
      output.clicks = product.clicks;
      output.twitterShares = product.twitterShares;
      output.facebookShares = product.facebookShares;
      output.pinterestShares = product.pinterestShares;
      return resolve(output);
    });
  }
};

const productModel = {
  'id': undefined,
  'name': undefined,
  'createdDate': undefined,
  'visibility': undefined,
  'gender': undefined,
  'url': undefined,
  'productImage': undefined,
  'ages': undefined,
  'price': undefined,
  'tags': undefined,
  'relationships': undefined,
  'clicks': undefined,
  'twitterShares': undefined,
  'facebookShares': undefined,
  'pinterestShares': undefined,
};

const and = (where, condition) => {
  if (!_.has(where, '$and')) {
    where.$and = [];
  }
  where.$and.push(condition);
};

