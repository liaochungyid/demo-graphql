'use strict';
const { faker } = require('@faker-js/faker')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Companies',
      Array.from({ length: 3}).map((val, ind) => {
        const fakeCompany = faker.helpers.userCard()
        return {
          id: ind + 1,
          name: fakeCompany.company.name,
          service: fakeCompany.company.bs,
          address: [fakeCompany.address.suite,
                    fakeCompany.address.street,
                    fakeCompany.address.city,
                    fakeCompany.address.zipcode ].join(' '),
          phone:fakeCompany.phone,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    }),
    {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {});
  }
};
