'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('usuario', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      nome: {
        type: Sequelize.DataTypes.STRING(30)
      },
      email: {
        type: Sequelize.DataTypes.STRING(30),
        unique: true
      },
      senha: {
        type: Sequelize.DataTypes.STRING(50)
      },
      data_nascimento: {
        type: Sequelize.DataTypes.DATEONLY,
      },
      cidade: {
        type: Sequelize.DataTypes.STRING(50)
      },
      estado: {
        type: Sequelize.DataTypes.CHAR(4)
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('usuario');
  }
};
