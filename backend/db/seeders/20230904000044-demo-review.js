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
        // Nook's Cranny
        {
          spotId: 1,
          userId: 4,
          review:
            "Nook's Cranny is a lifesaver! Timmy and Tommy have everything I need, and their friendly service makes shopping a joy.",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 8,
          review: "Made lots of money selling tarantulas here...",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 7,
          review: "I got my loan here, it was okay.",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 3,
          review: "This shop is a staple in Serenity. Can't live without it!",
          stars: 5,
        },
        // Museum
        {
          spotId: 2,
          userId: 1,
          review:
            "The museum is a true gem on Serenity island. Would visit again!",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 3,
          review: "There were so many cool dinosaurs to see!",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 5,
          review: "The bug area was kind of scary.",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 7,
          review: "It was fun meeting Blathers.",
          stars: 4,
        },
        // Resident Services
        {
          spotId: 3,
          userId: 1,
          review: "I got cool new DIY recipes here.",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 2,
          review: "Isabelle is always so busy at work.",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 4,
          review: "My house got moved in the middle of night by someone here.",
          stars: 4,
        },
        // The Roost
        {
          spotId: 4,
          userId: 2,
          review: "Delicious coffee, perfect start to my day!",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 5,
          review: "Smooth, rich, and satisfying. Love it!",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 8,
          review: "Great coffee, makes me feel alive!",
          stars: 4,
        },
        // Able Sisters Shop
        {
          spotId: 5,
          userId: 8,
          review: "Able Sisters has awesome clothes!",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 4,
          review: "I got my tuxedo tailored here by Sable.",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 6,
          review: "I got my sunglasse here! So cool.",
          stars: 4,
        },
        // Dodo Airlines
        {
          spotId: 6,
          userId: 2,
          review:
            "Dodo Airlines makes island-hopping a breeze. Quick, friendly service.",
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
