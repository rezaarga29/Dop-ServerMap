"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ServicePoints", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      phone: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.FLOAT,
      },
      longitude: {
        type: Sequelize.FLOAT,
      },
      open: {
        type: Sequelize.TIME,
      },
      closed: {
        type: Sequelize.TIME,
      },
      type: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      ServiceCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ServiceCategories",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ServicePoints");
  },
};
