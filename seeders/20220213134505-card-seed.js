'use strict';
const { faker } = require('@faker-js/faker')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cards',
      Array.from({ length:10 }).map((val, ind) => {
        const fakeCard = faker.finance
        return {
          id: ind + 1,
          cardNumber: fakeCard.creditCardNumber(),
          cardCVV: fakeCard.creditCardCVV(),
          UserId: ind + 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    }),
    {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cards', null, {});
  }
};
