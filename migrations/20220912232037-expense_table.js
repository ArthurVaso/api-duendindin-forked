'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('gasto', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      categoriaID: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      nome: {
        type: Sequelize.DataTypes.STRING(30)
      },
      recorrencia: {
        type: Sequelize.DataTypes.BOOLEAN
      },
      vencimento: {
        type: Sequelize.DataTypes.DATEONLY
      },
      valor: {
        type: Sequelize.DataTypes.DECIMAL(10, 2)
      },
      descricao: {
        type: Sequelize.DataTypes.STRING(50)
      },
      data_pagamento: {
        type: Sequelize.DataTypes.DATEONLY
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('ganho');
  }
};
