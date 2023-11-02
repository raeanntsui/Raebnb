"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        //1
        {
          firstName: "Tom",
          lastName: "Nook",
          email: "tom@ac.com",
          username: "tomnook",
          hashedPassword: bcrypt.hashSync("password"),
        },
        //2
        {
          firstName: "Blathers",
          lastName: "Owl",
          email: "user3@user.io",
          username: "FakeUser3",
          hashedPassword: bcrypt.hashSync("password"),
        },
        //3
        {
          firstName: "Isabelle",
          lastName: "Shizue",
          email: "isabelle@ac.com",
          username: "isabelle",
          hashedPassword: bcrypt.hashSync("password"),
        },
        //4
        {
          firstName: "Brewster",
          lastName: "Pigeon",
          email: "brewster@ac.com",
          username: "therooster",
          hashedPassword: bcrypt.hashSync("password"),
        },
        //5
        {
          firstName: "Mabel",
          lastName: "Hedgehog",
          email: "mabel@ac.com",
          username: "mabel",
          hashedPassword: bcrypt.hashSync("password"),
        },
        //6
        {
          firstName: "Orville",
          lastName: "Dodo",
          email: "orville@ac.com",
          username: "orville",
          hashedPassword: bcrypt.hashSync("password"),
        },
        //7
        {
          firstName: "Merengue",
          lastName: "Rhino",
          email: "merengue@ac.com",
          username: "merengue",
          hashedPassword: bcrypt.hashSync("password"),
        },
        //8
        {
          firstName: "Maple",
          lastName: "Bear",
          email: "maple@ac.com",
          username: "maple",
          hashedPassword: bcrypt.hashSync("password"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
