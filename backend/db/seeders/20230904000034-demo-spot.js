"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Spot } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "123 Gardenview Drive",
          city: "Maple Heights",
          state: "OH",
          country: "USA",
          lat: 41.41841,
          lng: -81.53903,
          name: "Raeann's Home",
          description: "A cardboard house",
          price: 5.0,
        },
        {
          ownerId: 2,
          address: "405 Rhea Ave",
          city: "Hamilton",
          state: "OH",
          country: "USA",
          lat: 39.4109,
          lng: -84.57056,
          name: "Hamilton",
          description: "A home in Hamilton",
          price: 50.0,
        },
        {
          ownerId: 3,
          address: "2022 Parkamo Avenue",
          city: "Village Of Indian Springs",
          state: "OH",
          country: "USA",
          lat: 39.37306,
          lng: -84.5399,
          name: "Village of Indian Springs",
          description: "A home in Indian Springs",
          price: 50.0,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  },
};
