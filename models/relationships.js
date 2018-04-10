'use strict';

module.exports = (sequelize, DataTypes) => {
  const Relationships = sequelize.define('Relationships', {
    'id': {
      'type': DataTypes.INTEGER,
      'autoIncrement': true,
      'primaryKey': true
    },
    'name': {
      'type': DataTypes.STRING
    }
  });

  Relationships.associate = (models) => {
    Relationships.belongsToMany(models.Products, {
      'as'        : 'relationships',
      'through'   : 'products_relationships',
      'foreignKey': 'relationshipId'
    });
  };

  return Relationships;
};
