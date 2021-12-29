const { PetModel } = require(`../models`);
const { io } = require("../index");
const returnPet = (req, res) => {
  const { id } = req.body.jToken;
  if (!req.params.id) {
    return res.status(409).send(
      `
      and pet id in params
    `
    );
  }
  PetModel.findByIdAndUpdate(
    req.params.id,
    {
      userID: null,
      adoptionStatus: "ready for adoption",
    },
    { new: true },
    function (err, pet) {
      if (!err && pet) {
        io.emit("available", { message: `Pet ${pet.petName}` });

        res.send({
          message: `${pet.petName} is available `,
          pet,
        });
      } else {
        res.status(500).send({
          message: "server error" + err,
        });
      }
    }
  );
};
module.exports = returnPet;
