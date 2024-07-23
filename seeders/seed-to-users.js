"use strict";

const { encrypt } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin1",
          password: await encrypt("admin12345"),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     */
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("Users", null, {});
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  },
};
