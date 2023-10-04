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
          //1
          ownerId: 1,
          address: "201 Gardenview Drive",
          city: "Maple Heights",
          state: "OH",
          country: "USA",
          lat: 41.41841,
          lng: -81.53903,
          name: "A small high rise condo",
          description:
            "Experience luxury living in a high-rise condo with stunning city views for rent. Don't miss out!",
          price: 207.0,
        },
        {
          //2
          ownerId: 2,
          address: "405 Rhea Ave",
          city: "Hamilton",
          state: "OH",
          country: "USA",
          lat: 39.4109,
          lng: -84.57056,
          name: "Quiet stay",
          description:
            "Discover your dream stay in Hamilton, OH! This charming 3-bed, 2-bath house offers modern amenities and a spacious backyard.",
          price: 250.0,
        },
        {
          //3
          ownerId: 3,
          address: "2022 Parkamo Avenue",
          city: "Springs",
          state: "OH",
          country: "USA",
          lat: 39.37306,
          lng: -84.5399,
          name: "Simple living",
          description:
            "Welcome to our cozy 2-bedroom house! Enjoy a comfortable stay with modern amenities, a fully equipped kitchen, and a relaxing backyard.",
          price: 150.0,
        },
        {
          //4
          ownerId: 4,
          address: "3581 E Kent Ave N #808",
          city: "Vancouver",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Avalon 2",
          description:
            "Experience home away from home in our 2-bedroom house. Relax in style with a well-furnished interior, fully equipped kitchen, and a private backyard. Perfect for your next getaway or business trip. Book now and make lasting memories!",
          price: 320.0,
        },
        {
          //5
          ownerId: 4,
          address: "7359 Pinnacle Ct",
          city: "Surrey",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Beautiful accomodation",
          description:
            "Stay in style! Our 2-bed Raebnb offers a comfortable retreat with all the essentials. Ideal for couples or small families. Book now for a relaxing getaway!",
          price: 180.0,
        },
        {
          //6
          ownerId: 4,
          address: "298 Waters Park Circle #101",
          city: "Langley",
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
          //7
          ownerId: 4,
          address: "238 Berry Lane",
          city: "Abbotsford",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Cute and cozy home",
          description:
            "Discover comfort and convenience in our 2-bedroom Raebnb. Fully equipped kitchen, cozy living space, and a great location. Your perfect home away from home!",
          price: 250.0,
        },
        {
          //8
          ownerId: 4,
          address: "100 Circle Drive",
          city: "Burnaby",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Home away from home",
          description: "Situated on the peninsula with proximity.",
          price: 190.0,
        },
        {
          //9
          ownerId: 1,
          address: "4382 Randy Drive",
          city: "Burnaby",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Home away from home",
          description:
            "Your cozy retreat in Burnaby! Our 2-bed Raebnb offers comfort, convenience, and a warm atmosphere. Book now for an unforgettable stay!",
          price: 190.0,
        },
        {
          //10
          ownerId: 1,
          address: "36 Forest Road",
          city: "Vancouver",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Brand new and modern 3 bedroom home",
          description:
            "Retreat to the deck of this sustainable getaway and gaze at the twinkling constellations under a cosy tartan blanket. AirShip 2 is an iconic, insulated aluminum pod designed by Roderick James with views of the Sound of Mull from dragonfly windows.",
          price: 225.0,
        },
        {
          //11
          ownerId: 1,
          address: "3872 Bourbon Court",
          city: "Vancouver",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Brand new and modern 3 bedroom home",
          description:
            "Retreat to the deck of this sustainable getaway and gaze at the twinkling constellations under a cosy tartan blanket. AirShip 2 is an iconic, insulated aluminum pod designed by Roderick James with views of the Sound of Mull from dragonfly windows.",
          price: 200.0,
        },
        {
          //12
          ownerId: 5,
          address: "50 Melon Park",
          city: "Vancouver",
          state: "BC",
          country: "Canada",
          lat: 39.37306,
          lng: -84.5399,
          name: "Entire guest suite",
          description:
            "The whole group will enjoy easy access to everything from this centrally located place. Few blocks to the beach, Park Royal mall and short drive to downtown Vancouver and Whistler, as well as Grouse and Cypress ski mountains.",
          price: 315.0,
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
