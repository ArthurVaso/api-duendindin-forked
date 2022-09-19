'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuario', [{
      nome: 'Jorge',
      email: 'jorge@email.com',
      senha: '123456',
      data_nascimento: new Date(),
      cidade: 'São Paulo',
      estado: 'SP'
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuario', null, {});
  }
};
