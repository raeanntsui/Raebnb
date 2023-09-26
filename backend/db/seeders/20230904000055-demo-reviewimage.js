"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { ReviewImage } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: "firstreviewimage.com",
        },
        {
          reviewId: 2,
          url: "secondreviewimage.com",
        },
        {
          reviewId: 3,
          url: "thirdreviewimage.com",
        },
        {
          reviewId: 4,
          url: "fourthreviewimage.com",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.dropTable(options);
  },
};
