'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Company)
      Product.hasMany(models.Cart)
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    color: DataTypes.STRING,
    type: DataTypes.STRING,
    material: DataTypes.STRING,
    description: DataTypes.STRING,
    CompanyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};