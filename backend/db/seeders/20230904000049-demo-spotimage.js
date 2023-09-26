"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { SpotImage } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://media.istockphoto.com/id/524085051/photo/beautiful-exterior-of-new-luxury-home-at-twilight.jpg?s=612x612&w=0&k=20&c=wPqEpJkL22wE3NHSCgdWXq2FC8a-KvSCpP7XRIZHuOU=",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://cdn.houseplansservices.com/product/1nb874s25pue9f9jni1lb6evgi/w620x413.jpg?v=8",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://media.istockphoto.com/id/1269776313/photo/suburban-house.jpg?s=612x612&w=0&k=20&c=iNaSdrxJt7H37rjQZumXYScrmSTRm2fDJrqZzxpDL_k=",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://photos.zillowstatic.com/fp/6ea16928e76d02ff3343c76cb86c4027-uncropped_scaled_within_1344_1008.webp",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://img.zumpercdn.com/489504409/1280x960?dpr=1&fit=crop&h=542&q=76&w=991",
          preview: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.dropTable(options);
  },
};
