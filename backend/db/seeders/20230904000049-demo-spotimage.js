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
        // Nook's Cranny
        {
          spotId: 1,
          url: "https://animalcrossingworld.com/wp-content/uploads/2020/02/Switch_ACNH_0220-Direct_Facilities_SCRN_04.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://cdn.vox-cdn.com/thumbor/_DzCjsmMBg-2p2TJiXDUa3tyG8A=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/19811736/2020031615352500_02CB906EA538A35643C1E1484C4B947D.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://i.pinimg.com/474x/da/68/06/da6806aeccd714734c13b4334a0ac575.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://www.gamespot.com/a/uploads/scale_landscape/1552/15524586/3645562-2020030109275400-02cb906ea538a35643c1e1484c4b947d.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://www.gamespot.com/a/uploads/original/1575/15759911/3659574-2020040613095200-02cb906ea538a35643c1e1484c4b947d.jpg",
          preview: false,
        },
        // Museum
        {
          spotId: 2,
          url: "https://www.tz.de/bilder/2020/05/19/13768937/815341824-animal-crossing-horizons-alle-infos-museumstag-stempeljagd-2tyMMSkLieea.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/d/d8/Museum_Entry_Lobby.png?width=1280",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/4/49/Museum_Guide_-_Art_Header.png?width=1280",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/05/Animal-Crossing-New-Horizons-Bug-Catching-Guide.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/e/ec/Museum_Guide_-_Sea_Creatures_Header.png?width=1280",
          preview: false,
        },
        // Resident Services
        {
          spotId: 3,
          url: "https://dodo.ac/np/images/thumb/9/9f/NH_Resident_Services_Building.jpg/1200px-NH_Resident_Services_Building.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://dodo.ac/np/images/8/8a/NH_Resident_Services_Interior.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://www.businessinsider.in/thumb/msid-74813009,width-700,height-525/It-all-starts-with-Tom-Nook-who-basically-runs-the-island-and-is-your-best-resource-if-youre-not-sure-where-to-begin-.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://img.gamewith.net/article/thumbnail/rectangle/17000.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/a/aa/Screen_Shot_2020-03-09_at_1.24.25_AM.png?width=1280",
          preview: false,
        },
        // The Roost
        {
          spotId: 4,
          url: "https://www.digitaltrends.com/wp-content/uploads/2021/11/img_9644.jpg?p=1",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://images.nintendolife.com/96aceea85218b/the-roost.large.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://cdn.vox-cdn.com/thumbor/X6eyz-COUuLJG-lycQeWf3w6sLc=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/70093932/Switch_ACNH_ND20211015_Update_SCRN_42__1_.0.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://techstory.in/wp-content/uploads/2021/09/acnh-roost-blogroll-1632435579709.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/11/Animal-Crossing-Players-Frustrated-By-Missing-Brewster-Cafe-Feature.jpg",
          preview: false,
        },
        // Able Sisters
        {
          spotId: 5,
          url: "https://staticg.sportskeeda.com/editor/2021/10/70865-16332456446990-800.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/0/0a/Tailors_Screenshot_2021-11-20_17-53-54.png?width=1280",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/5/5d/Tailors_Screenshot_2021-11-20_17-56-14.png?width=1280",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://cdn.staticneo.com/ew/thumb/1/1b/ACNH_AB2.jpg/662px-ACNH_AB2.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://cdn.staticneo.com/ew/thumb/8/8b/ACNH_AB3.jpg/662px-ACNH_AB3.jpg",
          preview: false,
        },
        // Dodo Airlines
        {
          spotId: 6,
          url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/12/Animal-Crossing-Dodo.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/3/33/Screen_Shot_2020-03-14_at_8.44.16_PM.png",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://cdn.mos.cms.futurecdn.net/2bmcxKPSunDP5Gej7vhrq5.jpg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://www.belltreeforums.com/attachments/ez2ltckuwaetssg-jpg.270603/",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://mypotatogames.com/wp-content/uploads/2020/06/dodo_airlines.jpg",
          preview: false,
        },
        // Merengue's House
        {
          spotId: 7,
          url: "https://64.media.tumblr.com/40276bc5adc5f2075a0d00f0058fe374/tumblr_q8rcv7sDhm1u1rjwjo1_1280.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://pbs.twimg.com/media/EUsoJaYUcAEC2AZ.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://www.thelostgamer.com/wp-content/uploads/2022/05/merengue-animal-crossing.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://nfccardstore.com/cdn/shop/products/image_b6c51687-a38b-443c-bbba-e1d85d1d3a62_1024x1024@2x.jpg?v=1638717942",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://www.denofgeek.com/wp-content/uploads/2021/04/animal-crossing-merengue.jpg?w=1024",
          preview: false,
        },
        // Campsite
        {
          spotId: 8,
          url: "https://i.pinimg.com/736x/82/53/e3/8253e3243fe1d21313ac2df7716e9294.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://dodo.ac/np/images/thumb/5/5c/NH_Campsite_Interior.png/250px-NH_Campsite_Interior.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/d/d3/Screen_Shot_2020-03-09_at_12.11.23_AM.png?width=1280",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://www.heypoorplayer.com/wp-content/uploads/2020/04/2020033114443000-02CB906EA538A35643C1E1484C4B947D.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://i.pinimg.com/564x/d7/9d/ce/d79dce1b4d3b258fe12a7c2c5622f3dd.jpg",
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
