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
          url: "https://a0.muscache.com/im/pictures/950b5439-cce6-41db-bef6-463e6855fa4f.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/885532ba-9b34-4a34-a712-82b3a77845d7.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/05cbf846-320b-4357-b5ba-d0962b1ee3c1.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/88186409-9534-4d5b-a43d-ccdcb95eebde.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/edc00a90-3053-410b-aeec-cbda0877647d.jpg?im_w=1200",
          preview: false,
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
          url: "https://a0.muscache.com/im/pictures/950b5439-cce6-41db-bef6-463e6855fa4f.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/885532ba-9b34-4a34-a712-82b3a77845d7.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/05cbf846-320b-4357-b5ba-d0962b1ee3c1.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/88186409-9534-4d5b-a43d-ccdcb95eebde.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/edc00a90-3053-410b-aeec-cbda0877647d.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://img.zumpercdn.com/489504409/1280x960?dpr=1&fit=crop&h=542&q=76&w=991",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/950b5439-cce6-41db-bef6-463e6855fa4f.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/885532ba-9b34-4a34-a712-82b3a77845d7.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/05cbf846-320b-4357-b5ba-d0962b1ee3c1.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/88186409-9534-4d5b-a43d-ccdcb95eebde.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://img.zumpercdn.com/489504409/1280x960?dpr=1&fit=crop&h=542&q=76&w=991",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/950b5439-cce6-41db-bef6-463e6855fa4f.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/885532ba-9b34-4a34-a712-82b3a77845d7.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/05cbf846-320b-4357-b5ba-d0962b1ee3c1.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/88186409-9534-4d5b-a43d-ccdcb95eebde.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://img.zumpercdn.com/489504409/1280x960?dpr=1&fit=crop&h=542&q=76&w=991",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/885532ba-9b34-4a34-a712-82b3a77845d7.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/05cbf846-320b-4357-b5ba-d0962b1ee3c1.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/88186409-9534-4d5b-a43d-ccdcb95eebde.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/edc00a90-3053-410b-aeec-cbda0877647d.jpg?im_w=1200",
          preview: false,
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
