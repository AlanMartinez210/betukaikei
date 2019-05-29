'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    name_key: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    this.belongsTo(models.Group, {as: "group"});
    this.belongsTo(models.Menu, {as: "menu"});
  };
  return Order;
};