'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    
    return queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin@fyies.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {
      email: 'admin@fyies.com'
    }, {});
  }
};