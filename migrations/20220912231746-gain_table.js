'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('ganho', {
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
    data: {
        type: Sequelize.DataTypes.DATEONLY
    },
    valor: {
        type: Sequelize.DataTypes.DECIMAL(10, 2)
    },
    descricao: {
        type: Sequelize.DataTypes.STRING(50)
    },
    recorrencia: {
        type: Sequelize.DataTypes.BOOLEAN
    }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('ganho');
  }
};