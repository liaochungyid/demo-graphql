'use strict';
const { faker } = require('@faker-js/faker')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',
      Array.from({ length:10 }).map((val, ind) => {
        const fakeUser = faker.helpers.userCard()
        return {
          id: ind + 1,
          account: fakeUser.username,
          name: fakeUser.name,
          email: fakeUser.email,
          address_zipCode: fakeUser.address.zipcode,
          address_street: fakeUser.address.street,
          address_city: fakeUser.address.city,
          address_suite: fakeUser.address.suite,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    }),
    {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};