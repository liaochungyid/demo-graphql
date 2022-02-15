'use strict';
const { faker } = require('@faker-js/faker')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Accounts',
      Array.from({ length: 4 }).map((val, ind) => {
        const fakeAccount = faker.finance
        return {
          id: ind + 1,
          account: fakeAccount.account(),
          accountName: fakeAccount.accountName(),
          routingNumber: fakeAccount.routingNumber(),
          currencyName: fakeAccount.currencyName(),
          createdAt: new Date(),
          updatedAt: new Date(),
          CompanyId: ind < 3 ? ind + 1 : 1
        }
    }),
    {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};

