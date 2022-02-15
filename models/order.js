'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User)
      Order.belongsTo(models.Product)
      Order.belongsTo(models.Transaction)
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    productInfo: DataTypes.STRING,
    TransactionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};