'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    shop_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  Menu.associate = function(models) {
    this.belongsTo(models.Shop, {as: "shop"});
  };
  return Menu;
};