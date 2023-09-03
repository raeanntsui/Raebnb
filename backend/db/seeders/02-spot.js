'use strict';

const spot = require('../models/spot');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await Spot.bulkCreate([
    {
      address: "20100 Gardenview Drive",
      city: "Maple Heights",
      state: "OH",
      lat: 41.418410,
      lng: -81.539030,
      name: "Raeann's Home",
      description: "A house.",
      price: 1450
    },
    {
      address: "405 Rhea Ave",
      city: "Hamilton",
      state: "OH",
      lat: 39.410900,
      lng: -84.570560,
      name: "Hamilton Home",
      description: "3 bedroom/ 2 Full Bath.",
      price: 50
    },
    {
      address: "2022 Parkamo Avenue",
      city: "Village Of Indian Springs",
      state: "OH",
      lat: 39.373060,
      lng: -84.539900,
      name: "Village of Indian Springs Home",
      description: "Great home in Fairfield city school district with lots of room.",
      price: 50
    }
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  }
};
