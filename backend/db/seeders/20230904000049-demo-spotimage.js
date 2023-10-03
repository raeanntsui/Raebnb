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
          url: "https://a0.muscache.com/im/pictures/b29cf85f-0be2-4be7-84ed-398194fb9111.jpg?im_w=960",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/0a54ea84-71b1-431a-a8a2-7767c6b0bdb1.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/1ffd450f-34da-4e0a-9935-373e7127dd29.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/afb3a5d9-933c-4b0c-bbef-158d1f06087b.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/e722ad32-8a35-464f-b23a-52e2c883fd67.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/636cc221-8ed7-444a-b055-5eef10d7bd35.jpg?im_w=960",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/ebf1a50d-1f37-4cfc-a593-d3a0842e91ff.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/493e7a26-0645-469a-8b3f-af1153f13386.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/32d07c83-fb72-4f3c-8d03-9fe175707d23.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/0d6d8086-bbc8-4917-8d42-7e769912c147.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-763885585696103626/original/779f2d62-505b-482f-8243-0cd8ed8a7df1.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-763885585696103626/original/2e72f931-2b09-48f6-817a-450a4299bda9.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-763885585696103626/original/42d282b9-a5ef-481b-b01f-7f58cb65ac7e.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-763885585696103626/original/65fc8e5f-8b99-4ed1-855f-37fd59bdac20.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-763885585696103626/original/64e35d2b-9d96-4033-bb49-48e4584c8591.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-895985054806353651/original/cedbb508-1a29-4582-8bab-041f7125c262.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-895985054806353651/original/df2867c8-96c1-4a74-b841-1b1064a37a25.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-895985054806353651/original/0704a915-bca8-4e19-9e27-d7eb0ee37812.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-895985054806353651/original/f25556bd-8304-4759-a488-0295e2729b8b.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-895985054806353651/original/93ed1bb7-a3c1-405b-bde0-b178a6722f5b.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/1dc8da6b-09b8-4946-977e-327a8fdc7a7b.jpg?im_w=960",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/4a7bb376-954a-4ecb-a221-57c47f2274a2.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/c1031dd1-a0ab-4a38-a91c-d0375d3f719a.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/cd24d834-4705-45bc-b74d-c35be8c321a6.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/4bee0ffd-0c20-4933-a61b-5f0bf9caf037.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-913780341436109726/original/e6b34143-d676-4250-8cf3-794ae4354def.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-913780341436109726/original/c325064b-2cb6-4a18-a700-661979faa463.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-913780341436109726/original/abfb139f-36ff-4fad-a795-eb1e3bad73b1.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-913780341436109726/original/cc835a63-ff6a-4b28-978f-bea1c7508410.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-913780341436109726/original/53cddbca-0253-4c24-85c6-cdefa2ac4dc2.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-979302104097472904/original/dfe20b3a-0d6b-4399-9229-5b8fa8439b57.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-979302104097472904/original/a729cfc2-82a7-4e55-b0c6-8bd6d27aef67.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-979302104097472904/original/98701065-5f0c-4c80-b422-1faab0c195b5.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-979302104097472904/original/8f871176-4f6e-4921-be26-684f284a1af1.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-979302104097472904/original/9ba922e2-ec6f-41fd-9c6c-257acf053720.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-665281774254913421/original/5c91b70d-6e2a-44f0-9760-b0a6765d988b.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-665281774254913421/original/eaaedde0-b359-4f62-ae1d-b964e451d2b9.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-665281774254913421/original/2a619dca-66b7-4378-b0e9-fcf863177b96.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-665281774254913421/original/35d18525-bae6-4e63-8f7b-8457651147ab.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-665281774254913421/original/b20f680d-269e-49b9-8f4e-8974c29d8e66.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42608254/original/b59aae1e-6022-4f00-b12f-eae4d1c9a868.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42608254/original/6b72f42a-8d83-4458-a04d-396df46c0a68.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42608254/original/f98ab5d5-4570-498e-87e0-658ab9f87828.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42608254/original/ed6be19a-94ce-40b3-aa1d-1b0ddac9f502.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-42608254/original/09503757-9fce-41a2-a8d7-6232a96656cc.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-769123918254654824/original/c1a2f7ef-0791-420c-a6fd-d0fd8ad6aa49.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-769123918254654824/original/f1812bed-59a6-4275-af37-5ed2eaf7d7a4.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-769123918254654824/original/b535e0db-1f9e-45b7-839e-0d665485f64e.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-769123918254654824/original/b951a76b-a82b-428a-9ace-870ef0102f8c.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-769123918254654824/original/71a5cd3c-e61b-4b3e-ba70-c83c9147151a.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/5b2c2e37-58ea-42aa-ac23-40d566510eb7.jpg?im_w=960",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/94db21f5-8f34-4560-a6a3-3f967fe7eb5d.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/a66da3aa-b250-4e1a-a7df-21fe59aab0e1.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/672c784b-d8aa-4ba1-9baf-869099e28749.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/7ff2700e-4d01-4c8e-b2bb-872b4a4ed23b.jpg?im_w=720",
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
