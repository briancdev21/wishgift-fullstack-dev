
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
      'tags': Tags.findAll().then((tags) => _.map(tags, (tag) => (tag.name))),
      'relationships': Relationships.findAll().then((relationships) => _.map(relationships, (relationship) => (relationship.name))),
    })
    .then((results) => {
      const tags = [];
      _.forEach(params.tags, (tag) => {
        if (!_.includes(results.tags, tag)) {
          tags.push({'name': tag});
        }
      });
      const relationships = [];
      _.forEach(params.relationships, (relationship) => {
        if (!_.includes(results.relationships, relationship)) {
          relationships.push({'name': relationship});
        }
      });
      return {
        'tags': tags,
        'relationships': relationships
      };
    })
    .then((filteredData) => Promise.props({
      'tags': Tags.bulkCreate(filteredData.tags),
      'relationships': Relationships.bulkCreate(filteredData.relationships),
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
    }))
    .then((result) => {
      newProduct = result.newProduct;
      if (params.tags.length === 0) { params.tags = ['*']; }
      if (params.relationships.length === 0) { params.relationships = ['*']; }

      return Promise.props({
        'tags': Tags.findAll({'where': {'name': {[Op.or]: params.tags}}}),
        'relationships': Relationships.findAll({'where': {'name': {[Op.or]: params.relationships}}})
      })
    })
    .then((result) => {
      console.log('result tags:', result.tags);
      return Promise.all([
        newProduct.setTags(result.tags),
        newProduct.setRelationships(result.relationships)
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
      'count': Products.count({
        'where'  : where
      }),
      'objects': Products.findAll(
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
    let filteredData = {};
    return Promise.props({
      'tags': Tags.findAll().then((tags) => _.map(tags, (tag) => (tag.name))),
      'relationships': Relationships.findAll().then((relationships) => _.map(relationships, (relationship) => (relationship.name)))
    })
      .then((results) => {
        const tags = [];
        _.forEach(params.tags, (tag) => {
          if (!_.includes(results.tags, tag)) {
            tags.push({'name': tag});
          }
        });
        const relationships = [];
        _.forEach(params.relationships, (relationship) => {
          if (!_.includes(results.relationships, relationship)) {
            relationships.push({'name': relationship});
          }
        });
        filteredData = {
          'tags': tags,
          'relationships': relationships
        };
        return filteredData;
      })
      .then(() => Products.findOne({
        'where': {'id': productId}
      }))
      .then((product) => Promise.props({
        'tags': Tags.bulkCreate(filteredData.tags),
        'relationships': Relationships.bulkCreate(filteredData.relationships),
        'updateProduct': product.update({
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
        return Promise.props({
          'tags': Tags.findAll({'where': {'name': {[Op.or]: params.tags}}}),
          'relationships': Relationships.findAll({'where': {'name': {[Op.or]: params.relationships}}})
        })
      })
      .then((result) => {
        return Promise.all([
          updateProduct.setTags(result.tags),
          updateProduct.setRelationships(result.relationships)
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
    return Promise.props({
      'tags': product.getTags().then((tags) => _.map(tags, (tag) => (tag.name))),
      'relationships': product.getRelationships().then((relationships) => _.map(relationships, (relationship) => (relationship.name)))
    })
    .then((result) => {
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
      output.tags = result.tags;
      output.relationships = result.relationships;
      output.twitterShares = product.twitterShares;
      output.facebookShares = product.facebookShares;
      output.pinterestShares = product.pinterestShares;
      return output;
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

