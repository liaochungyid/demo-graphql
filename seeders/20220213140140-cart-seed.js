'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Carts',
      Array.from({ length:50 }).map((val, ind) => {
        return {
          id: ind + 1,
          UserId: ( ind % 10 ) + 1,
          ProductId: Math.ceil(Math.random() * 50),
          createdAt: new Date(),
          updatedAt: new Date()
        }
    }),
    {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Carts', null, {});
  }
};
