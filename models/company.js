'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Product)
      Company.hasMany(models.Account)
    }
  }
  Company.init({
    name: DataTypes.STRING,
    service: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};