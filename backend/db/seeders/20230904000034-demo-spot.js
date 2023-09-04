'use strict';


const { Spot } = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Spot.bulkCreate([
    {
      address: "20100 Gardenview Drive",
      city: "Maple Heights",
      state: "OH",
      country: "USA",
      lat: 41.418410,
      lng: -81.539030,
      name: "Raeann Home",
      description: "A house",
      price: 50.00
    },
    {
      address: "405 Rhea Ave",
      city: "Hamilton",
      state: "OH",
      country: "USA",
      lat: 39.410900,
      lng: -84.570560,
      name: "Hamilton Home",
      description: "Cozy house",
      price: 50.00
    },
    {
      address: "2022 Parkamo Avenue",
      city: "Village Of Indian Springs",
      state: "OH",
      country: "USA",
      lat: 39.373060,
      lng: -84.539900,
      name: "Village of Indian Springs Home",
      description: "Another home",
      price: 50.00
    }
   ], { validate: true })
  },




  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
    // await queryInterface.dropTable("Spots")
  }
};

