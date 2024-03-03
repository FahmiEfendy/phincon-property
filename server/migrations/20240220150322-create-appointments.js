"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Appointments", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      house_id: {
        type: Sequelize.STRING,
        references: {
          model: "Houses",
          key: "id",
        },
      },
      customer_id: {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "id",
        },
      },
      seller_id: {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "id",
        },
      },
      status: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      message: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Appointments");
  },
};
