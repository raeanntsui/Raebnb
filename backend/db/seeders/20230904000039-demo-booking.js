"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Booking } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2023/01/02",
          endDate: "2023/01/22",
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2021/01/02",
          endDate: "2021/01/22",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2022/01/02",
          endDate: "2022/01/22",
        },
        {
          spotId: 4,
          userId: 4,
          startDate: "2023/01/02",
          endDate: "2023/01/22",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.dropTable(options);
  },
};
