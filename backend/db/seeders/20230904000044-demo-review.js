'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Review } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Review.bulkCreate([
    {
      spotId: 1,
      userId: 1,
      review: "This place is great!",
      stars: 5,
    },
    {
      spotId: 2,
      userId: 2,
      review: "This place is ok.",
      stars: 3,
    },
    {
      spotId: 3,
      userId: 3,
      review: "This place is good.",
      stars: 4,
    }
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.dropTable(options);
  }
};
