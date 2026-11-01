"use strict";

const { bcryptHash } = require("../helper/bcrypt");

module.exports = {
  async up(queryInterface) {
    const users = [];
    for (let i = 1; i <= 5; i++) {
      users.push({
        username: `exampleUser${i}`,
        email: `example${i}@mail.com`,
        password: await bcryptHash(`examplePwd${i}`),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
