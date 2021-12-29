const mongoose = require("mongoose");
const { databaseURL } = require("../config/index");
const UserModel = require("./UserModel");
const PetModel = require("./PetModel");
const MessageModel = require("./ChatModel");

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// express cors morgan mongoose

mongoose.connection.on("connected", () => {
  console.log("MONGODB connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("MONGODB disconnected");
  process.exit(1);
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB disconnected due to : " + err);
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("App is terminating");
  mongoose.connection.close(() => {
    console.log("MONGODB disconnected");
    process.exit(0);
  });
});

module.exports = {
  UserModel,
  PetModel,
  MessageModel,
};
