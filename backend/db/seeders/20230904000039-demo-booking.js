'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Booking } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Booking.bulkCreate([
    {
      startDate: "2023/01/02",
      endDate: "2023/01/22"
    },
    {
      startDate: "2021/01/02",
      endDate: "2021/01/22"
    },
    {
      startDate: "2022/01/02",
      endDate: "2022/01/22"
    }
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.dropTable(options);
  }
};

