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
          address: "123 Garden Drive",
          city: "Maple Heights",
          state: "OH",
          country: "USA",
          lat: 41.41841,
          lng: -81.53903,
          name: "Raeann's Home",
          description:
            "My home is a walk-up townhouse in desirable Fairview Slopes.",
          price: 80.0,
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
          city: "Springs",
          state: "OH",
          country: "USA",
          lat: 39.37306,
          lng: -84.5399,
          name: "Village of Indian Springs",
          description: "A home in Indian Springs",
          price: 50.0,
        },
        {
          ownerId: 4,
          address: "3581 E Kent Ave N #808",
          city: "Vancouver",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Avalon 2",
          description:
            "Welcome to Avalon 2 in the popular community of River District.",
          price: 900.0,
        },
        {
          ownerId: 4,
          address: "7359 Pinnacle Ct",
          city: "Vancouver",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Park Lane",
          description:
            "This is a random description about a house that is on Raebnb.",
          price: 1150.0,
        },
        {
          ownerId: 4,
          address: "298 Waters Park Circle #101",
          city: "Vancouver",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Park Lane",
          description:
            "This is a random description about a house that is on Raebnb.",
          price: 450.0,
        },
        {
          ownerId: 4,
          address: "238 Berry Lane",
          city: "Vancouver",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Park Lane",
          description:
            "This is a random description about a house that is on Raebnb.",
          price: 250.0,
        },
        {
          ownerId: 4,
          address: "100 Circle Drive",
          city: "Vancouver",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Park Lane",
          description: "Situated on the peninsula with proximity.",
          price: 150.0,
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
