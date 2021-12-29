const { PetModel } = require("../models");
const bucket = require('../config/storage');
const fs = require('fs');
function createPet(req, res) {
  const {
    type,
    petName,
    adoptionStatus,
    height,
    weight,
    color,
    bio,
    allergies,
    dietaryRestrictions,
    breed,
  } = req.body;
  // jToken inside req.bod

  //  multer empties our req.body you wont find jtoken there


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
            console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 

            PetModel.create({
              type,
              petName,
              adoptionStatus,
              picture: urlData[0],
              height,
              weight,
              color,
              bio,
              allergies,
              dietaryRestrictions,
              breed,
            }).then((Pet) => {
              res.send({
                message: "Pet has been created",
                Pet: Pet,
              })
            }).catch((err) => {
              res.send({
                message: "an error occured",
              })
            })
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



}

module.exports = createPet;
