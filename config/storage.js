const admin = require("firebase-admin");
const { FBDBURL, bucketURL } = require(".");
const serviceAccount = require("./firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FBDBURL,
});

const bucket = admin.storage().bucket(bucketURL);

module.exports = bucket;
