'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        url: "atest.com",
        preview: true
      },
      {
        url: "btest.com",
        preview: true
      },
      {
        url: "ctest.com",
        preview: true
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.dropTable(options);
    // await queryInterface.dropTable("SpotImages")
  }
};



