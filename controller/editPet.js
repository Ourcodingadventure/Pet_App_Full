const { PetModel } = require("../models");
const bucket = require('../config/storage');
const fs = require('fs');
const editPet = (req, res) => {

  bucket.upload(
    req.files[0].path,
    function (err, file, apiResponse) {
      if (!err) {
        // console.log("api resp: ", apiResponse);

        // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
        file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        }).then((urlData, err) => {
          if (!err) {
            console.log("public downloadable url: ",) // this is public downloadable url 
            req.body = { ...req.body, picture: urlData[0] };
            const { id } = req.params;
            PetModel.findByIdAndUpdate(id, req.body, { new: true }, function (err, pet) {
              if (!err && pet) {
                res.send({
                  message: "edited pet successfully",
                  pet,
                });
              } else {
                console.log(err);
                res.status(500).send({
                  message: "server error" + err,
                });
              }
            });
            try {
              fs.unlinkSync(req.files[0].path)
              //file removed
            } catch (err) {
              console.error(err)
            }
          }
        })
      } else {
        console.log("err: ", err)
        res.status(500).send({
          message: "an error occured",
        });
      }
    });




};
module.exports = editPet;
