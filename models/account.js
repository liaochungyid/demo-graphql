'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.Company)
    }
  }
  Account.init({
    account: DataTypes.STRING,
    accountName: DataTypes.STRING,
    routingNumber: DataTypes.STRING,
    currencyName: DataTypes.STRING,
    CompanyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};