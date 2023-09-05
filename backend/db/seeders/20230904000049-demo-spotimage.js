'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { SpotImage } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "atest.com",
        preview: true
      },
      {
        spotId: 2,
        url: "btest.com",
        preview: true
      },
      {
        spotId: 3,
        url: "ctest.com",
        preview: true
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.dropTable(options);
  }
};



