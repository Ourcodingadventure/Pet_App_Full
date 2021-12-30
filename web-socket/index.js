const { MessageModel } = require("../models");
module.exports = (io) => {
  console.log("lets see this");
  io.on("connect", (socket) => {
    console.log("user connected");
    socket.on("sendMessage", ({ name, message }) => {
      const newMessage = new MessageModel({
        name,
        message,
      });

      newMessage.save();
      io.emit("newMessage", { name, message });
    });
  });
  io.on("return", ({ petName }) => {
    console.log("returned", petName);
    socket.emit("available", { petName });
  });
};
