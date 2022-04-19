"use strict";
const env = process.env.NODE_ENV || "development";
const dotenv = require("dotenv-flow").config().parsed;

module.exports = {
  ...dotenv,
  ENV: env,
  username: dotenv.DB_USERNAME,
  password: dotenv.DB_PASSWORD,
  database: dotenv.DB_DATABASE,
  host: dotenv.DB_HOST,
  dialect: dotenv.DB_CONNECTION,
  logging: false,
};
