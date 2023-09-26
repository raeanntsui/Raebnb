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
          url: "https://media.istockphoto.com/id/488613191/photo/bed-made-of-cartons-of-a-homeless-man.jpg?s=612x612&w=0&k=20&c=FFioOmWC16MTl0qCiENpB6NOvwIqxqC4Wv6aOjN1cWg=",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://cdn.houseplansservices.com/product/1nb874s25pue9f9jni1lb6evgi/w620x413.jpg?v=8",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxh-UEZzu76rsOsj8eGaMu7HRKgl5Ld8aItXRKuK-ok00IG2UGa4VFMARFckeCZ63d5oM&usqp=CAU",
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
