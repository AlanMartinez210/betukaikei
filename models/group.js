'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    title: DataTypes.STRING,
    host_name: DataTypes.STRING,
    access_key: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    expiration_date: DataTypes.DATE,
    shop_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  Group.associate = function(models) {
    this.belongsTo(models.Shop, {foreignKey: "shop_id", targetKey: "id"});
  };

  Group.findByAccessKey = function(access_key, options = {}){
    options.where = {
      access_key: access_key
    };
    return this.findOne(options);
  }

  return Group;
};