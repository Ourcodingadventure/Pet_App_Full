const getMessages = (req, res) => {
  MessageModel.find({}, (err, messages) => {
    if (!err && messages) {
      res.status(200).send({
        message: "message successfully",
        messages,
      });
    } else {
      res.status(500).send({
        message: "server error" + err,
      });
    }
  });
};
module.exports = getMessages;
