"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Review } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 4,
          review: "An absolutely amazing experience! I highly recommend!",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 2,
          review:
            "Outstanding location, extremely clean and comfortable. Would love to return!",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 3,
          review:
            "Great private place to relax, me and my husband enjoyed this home.",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 1,
          review:
            "Edina and her family are lovely!! If we got the chance, we'd definitely come back again. Thanks for having us!",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 3,
          review:
            "Perfect for what we were looking for as you can easily walk to Ambleside.",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 4,
          review:
            "We had a wonderful stay and it truly felt like home after only a few days.",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 1,
          review:
            "The house was clean and spacious and had everything we need.",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 2,
          review:
            "Nice, clean place, very close to market for easy access. Good communication.",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 5,
          review: "Thank you for letting us stay in your place! Lovely place!",
          stars: 5,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.dropTable(options);
  },
};
