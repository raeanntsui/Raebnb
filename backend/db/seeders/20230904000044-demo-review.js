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
      review: "This place is great!",
      stars: 5,
    },
    {
      review: "This place is ok.",
      stars: 3,
    },
    {
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
