var admin = require("firebase-admin");
var serviceAccount = require("./firebaseKey/to/serviceAccount.json");
var https = require("./firebaseKey/https/index.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: https["https"]
});


const db = admin.database();

module.exports = db;