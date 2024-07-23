"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/servicecategory.json").map((e) => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
      return e;
    });
    await queryInterface.bulkInsert("ServiceCategories", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ServiceCategories", null, {});
  },
};
