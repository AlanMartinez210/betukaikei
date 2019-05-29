'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    postcode: DataTypes.STRING,
    prefecture: DataTypes.INTEGER,
    city: DataTypes.STRING,
    section: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    getterMethods:{
      createdAt(){ return dateHelper.getDate(this.created_at) },
      updatedAt(){ return dateHelper.getDate(this.updated_at) }
    },
    timestamps: false
  });
  Shop.associate = function(models) {
    this.hasMany(models.Menu, { foreignKey: "shop_id", targetKey: "id" })
  };

  return Shop;
};