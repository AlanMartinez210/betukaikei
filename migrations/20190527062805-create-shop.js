'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      phone_number: {
        type: Sequelize.STRING(15)
      },
      postcode: {
        type: Sequelize.STRING(9)
      },
      prefecture: {
        type: Sequelize.TINYINT.UNSIGNED
      },
      city: {
        type: Sequelize.STRING(20)
      },
      section: {
        type: Sequelize.STRING(20)
      },
      address: {
        type: Sequelize.STRING(256)
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Shops');
  }
};