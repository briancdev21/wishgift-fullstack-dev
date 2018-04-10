'use strict';
const _ = require('lodash');

const enums = {
  'GENDER': {
    'MALE'      : 'MALE',
    'FEMALE'     : 'FEMALE'
  }
};

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    'id': {
      'type': DataTypes.INTEGER,
      'autoIncrement': true,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING
    },
    'createdDate': {
      'type': DataTypes.DATE
    },
    'visibility': {
      'type': DataTypes.BOOLEAN
    },
    'gender': {
      'type': DataTypes.ENUM(_.values(enums.GENDER))
    },
    'url': {
      'type': DataTypes.STRING
    },
    'productImage': {
      'type': DataTypes.STRING
    },
    'ages': {
      'type': DataTypes.STRING
    },
    'price': {
      'type': DataTypes.DOUBLE
    },
    'clicks': {
      'type': DataTypes.INTEGER
    },
    'twitterShares': {
      'type': DataTypes.INTEGER
    },
    'facebookShares': {
      'type': DataTypes.INTEGER
    },
    'pinterestShares': {
      'type': DataTypes.INTEGER
    }
  });


  Products.associate = (models) => {
    Products.belongsToMany(models.Tags, {
      'as'        : 'tags',
      'through'   : 'products_tags',
      'foreignKey': 'productId'
    });
    Products.belongsToMany(models.Relationships, {
      'as'        : 'relationships',
      'through'   : 'products_relationships',
      'foreignKey': 'productId'
    });
  };

  Products.enums = enums;

  return Products;
};
