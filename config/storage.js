const admin = require('firebase-admin')
const serviceAccount = require("./firebase.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://webmobile-48ab0.firebaseio.com"
});

const bucket = admin.storage().bucket("gs://webmobile-48ab0.appspot.com");

module.exports = bucket;

