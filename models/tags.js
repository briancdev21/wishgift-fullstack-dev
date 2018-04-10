'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    'id': {
      'type': DataTypes.INTEGER,
      'autoIncrement': true,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING
    }
  });

  Tags.associate = (models) => {
    Tags.belongsToMany(models.Products, {
      'as'        : 'products',
      'through'   : 'products_tags',
      'foreignKey': 'tagId'
    });
  };

  return Tags;
};
