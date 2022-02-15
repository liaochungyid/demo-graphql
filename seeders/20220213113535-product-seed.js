'use strict';
const { faker } = require('@faker-js/faker')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products',
      Array.from({ length: 50 }).map((val, ind) => {
        const fakeProduct = faker.commerce
        return {
          id: ind + 1,
          name: fakeProduct.productName(),
          price: fakeProduct.price(),
          color: fakeProduct.color(),
          type: fakeProduct.product(),
          material: fakeProduct.productMaterial(),
          description: fakeProduct.productDescription(),
          createdAt: new Date(),
          updatedAt: new Date(),
          CompanyId: ( ind % 3 ) + 1
        }
    }),
    {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
