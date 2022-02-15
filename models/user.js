'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Card)
      User.hasMany(models.Cart)
    }
  }
  User.init({
    account: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address_zipCode: DataTypes.STRING,
    address_street: DataTypes.STRING,
    address_city: DataTypes.STRING,
    address_suite: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};