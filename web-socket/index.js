const { MessageModel } = require("../models");
module.exports = (io) => {
  io.on("connect", (socket) => {
    console.log("user connected");
    socket.on("sendMessage", async ({ name, message }) => {
      const newMessage = await new MessageModel({
        name,
        message,
      });
      io.emit("newMessage", { name, message });
      newMessage.save();
    });
  });
  io.on("return", ({ petName }) => {
    console.log("returned", petName);
    socket.emit("available", { petName });
  });
};

// what type of chat application are you expecting from us
// Admin can see all of the user, when we contact we can message.
