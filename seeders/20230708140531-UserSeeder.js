"use strict";

const { User: UserModel } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // CheckEmailAlreadyExist
    const dataUserByEmail = await UserModel.findOne({
      where: {
        email: "email@email.com",
      },
    });
    if (dataUserByEmail) {
      return console.log(`User with email: email@email.com Already Exist`);
    }
    // End CheckEmailAlreadyExist

    return await UserModel.create({
      id: uuidv4(),
      email: "email@email.com",
      fullname: "Jon Heri",
      password: await bcrypt.hash("admin", 10),
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
