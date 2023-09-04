'use strict';

// const { query } = require('express-validator');
const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await ReviewImage.bulkCreate([
    {
      url: "firstreviewimage.com"
    },
    {
      url: "secondreviewimage.com"
    },
    {
      url: "thirdreviewimage.com"
    }
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.dropTable(options);
    // await queryInterface.dropTable("ReviewImages")
  }
};
