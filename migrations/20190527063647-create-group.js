'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      host_name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      access_key: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      password: {
        type: Sequelize.STRING(32)
      },
      description: {
        type: Sequelize.STRING(500)
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      shop_id: {
        type: Sequelize.BIGINT.UNSIGNED
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
    }).then(e => {
      queryInterface.addIndex('Groups', ['access_key'], {
        indexName: 'access_key_index',
        indicesType: 'UNIQUE'
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Groups');
  }
};