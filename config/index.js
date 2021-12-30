require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  SERVER_SECRET: process.env.SERVER_SECRET,
  databaseURL: process.env.databaseURL,
  FBDBURL: process.env.databaseURL,
  bucketURL: process.env.bucketURL,
};
