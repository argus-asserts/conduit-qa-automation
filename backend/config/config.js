/** @type {import('sequelize').Options} */
const env = require("./env");

module.exports = {
  development: {
    username: env.DEV_DB_USERNAME,
    password: env.DEV_DB_PASSWORD,
    database: env.DEV_DB_NAME,
    host: env.DEV_DB_HOSTNAME,
    dialect: env.DEV_DB_DIALECT,
    logging: env.DEV_DB_LOGGING ? console.log : false,
  },
  test: {
    username: env.TEST_DB_USERNAME,
    password: env.TEST_DB_PASSWORD,
    database: env.TEST_DB_NAME,
    host: env.TEST_DB_HOSTNAME,
    dialect: env.TEST_DB_DIALECT,
    logging: env.TEST_DB_LOGGING ? console.log : false,
  },
  production: {
    username: env.PROD_DB_USERNAME,
    password: env.PROD_DB_PASSWORD,
    database: env.PROD_DB_NAME,
    host: env.PROD_DB_HOSTNAME,
    dialect: env.PROD_DB_DIALECT,
    logging: env.PROD_DB_LOGGING ? console.log : false,
  },
};
