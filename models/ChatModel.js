const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
});
const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;
