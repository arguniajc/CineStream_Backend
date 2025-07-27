'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password_hash = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('usuarios', [{
      nombre: 'Admin',
      email: 'admin@cinestream.com',
      password_hash,
      rol: 'admin',
      creado_en: new Date(),
      actualizado_en: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', { email: 'admin@cinestream.com' }, {});
  }
};
