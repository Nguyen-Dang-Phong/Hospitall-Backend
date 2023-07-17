'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'phong@example.com',
      password: '12345',
      firstName: 'John',
      lastName: 'Doe',
      address: 'hcm',
      phonenumber: '0989898989',

      gender: 1,
      image: 'ROL',
      roleId: 'R1',
      positionId: 'hb',


      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
