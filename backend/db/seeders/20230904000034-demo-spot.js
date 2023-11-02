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
          address: "100 Serenity Lane",
          city: "Serenity",
          state: "AC",
          country: "New Horizons",
          lat: 41.41841,
          lng: -81.53903,
          name: "Nook's Cranny",
          description:
            "Come check out our store! We have a rotating selection of furniture and housing decorations alongside a generous selection of DIY recipes! Don't miss out. Stop by today!",
          price: 99,
        },
        {
          //2
          ownerId: 2,
          address: "200 Serenity Lane",
          city: "Serenity",
          state: "AC",
          country: "New Horizons",
          lat: 39.4109,
          lng: -84.57056,
          name: "Museum",
          description:
            "The museum is a vibrant hub of knowledge and culture. It showcases fossils, art, insects, fish, and more, creating a delightful space for players to explore and appreciate the natural and historical wonders of their virtual island.",
          price: 59,
        },
        {
          //3
          ownerId: 3,
          address: "300 Serenity Lane",
          city: "Serenity",
          state: "AC",
          country: "New Horizons",
          lat: 39.37306,
          lng: -84.5399,
          name: "Resident Services",
          description:
            "The town hall is at the heart of the island, where you find the mayor's office and essential services. A bustling, informative hub for players, talk to Isabelle for more information. Stop by in the morning and join the villagers for a group stretch activity!",
          price: 29,
        },
        {
          //4
          ownerId: 4,
          address: "400 Serenity Lane",
          city: "Serenity",
          state: "AC",
          country: "New Horizons",
          lat: 39.37306,
          lng: -84.5399,
          name: "The Roost",
          description:
            "Enjoy a warm cup of coffee for 200 bells handcrafted by Brewster! The Roost in Animal Crossing is a charming café where you can sip coffee, listen to music, and interact with your favorite villagers. It's a warm and inviting spot to relax and enjoy the company of your animal neighbors.",
          price: 200,
        },
        {
          //5
          ownerId: 4,
          address: "500 Serenity Lane",
          city: "Serenity",
          state: "AC",
          country: "New Horizons",
          lat: 39.37306,
          lng: -84.5399,
          name: "Able Sisters Shop",
          description:
            "The Able Sisters shop in Animal Crossing is a popular fashion boutique run by the hedgehog sisters, Mabel and Sabel. It offers a wide variety of clothing, accessories, and even custom designs. See what designs you come up with and let the Able sisters make it a reality. Come check it out!",
          price: 99,
        },
        {
          //6
          ownerId: 4,
          address: "600 Serenity Lane",
          city: "Serenity",
          state: "AC",
          country: "New Horizons",
          lat: 39.37306,
          lng: -84.5399,
          name: "Dodo Airlines",
          description:
            "Dodo Airlines in Animal Crossing: New Horizons is your gateway to adventure. Operated by Wilbur and Orville, this quirky airline service connects you with friends on other islands and lets you explore distant lands. It's the go-to place when you're ready to embark on exciting journeys, whether it's visiting friends, traveling for special events, or embarking on mystery tours to discover new resources and experiences.",
          price: 459,
        },
        {
          //7
          ownerId: 4,
          address: "700 Serenity Lane",
          city: "Serenity",
          state: "AC",
          country: "New Horizons",
          lat: 39.37306,
          lng: -84.5399,
          name: "Merengue's House",
          description:
            "Discover comfort and convenience in Merengue's studio home. Fully equipped kitchen, cozy living space, and a great location. Your perfect home away from home!",
          price: 250.0,
        },
        {
          //8
          ownerId: 4,
          address: "800 Serenity Lane",
          city: "Serenity",
          state: "AC",
          country: "New Horizons",
          lat: 39.37306,
          lng: -84.5399,
          name: "Campsite",
          description:
            "Situated on the peninsula, enjoy a rustic retreat in our charming tent in Serenity. Nestled in nature, it offers a comfortable, back-to-basics experience with modern amenities.",
          price: 39,
        },
        // {
        //   //9
        //   ownerId: 1,
        //   address: "4382 Randy Drive",
        //   city: "Burnaby",
        //   state: "BC",
        //   country: "Canada",
        //   lat: 39.37306,
        //   lng: -84.5399,
        //   name: "Home away from home",
        //   description:
        //     "Your cozy retreat in Burnaby! Our 2-bed Raebnb offers comfort, convenience, and a warm atmosphere. Book now for an unforgettable stay!",
        //   price: 190.0,
        // },
        // {
        //   //10
        //   ownerId: 1,
        //   address: "36 Forest Road",
        //   city: "Vancouver",
        //   state: "BC",
        //   country: "Canada",
        //   lat: 39.37306,
        //   lng: -84.5399,
        //   name: "Brand new and modern 3 bedroom home",
        //   description:
        //     "Retreat to the deck of this sustainable getaway and gaze at the twinkling constellations under a cosy tartan blanket. AirShip 2 is an iconic, insulated aluminum pod designed by Roderick James with views of the Sound of Mull from dragonfly windows.",
        //   price: 225.0,
        // },
        // {
        //   //11
        //   ownerId: 1,
        //   address: "3872 Bourbon Court",
        //   city: "Vancouver",
        //   state: "BC",
        //   country: "Canada",
        //   lat: 39.37306,
        //   lng: -84.5399,
        //   name: "Brand new and modern 3 bedroom home",
        //   description:
        //     "Retreat to the deck of this sustainable getaway and gaze at the twinkling constellations under a cosy tartan blanket. AirShip 2 is an iconic, insulated aluminum pod designed by Roderick James with views of the Sound of Mull from dragonfly windows.",
        //   price: 200.0,
        // },
        // {
        //   //12
        //   ownerId: 5,
        //   address: "50 Melon Park",
        //   city: "Vancouver",
        //   state: "BC",
        //   country: "Canada",
        //   lat: 39.37306,
        //   lng: -84.5399,
        //   name: "Entire guest suite",
        //   description:
        //     "The whole group will enjoy easy access to everything from this centrally located place. Few blocks to the beach, Park Royal mall and short drive to downtown Vancouver and Whistler, as well as Grouse and Cypress ski mountains.",
        //   price: 315.0,
        // },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  },
};
