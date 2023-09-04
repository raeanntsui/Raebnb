'use strict';


const { SpotImage } = require('../models');


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
    await queryInterface.dropTable("SpotImages")
  }
};



