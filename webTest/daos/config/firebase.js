const admin = require("firebase-admin");
const serviceAccount = require("./firebase-credentials.json");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-test-a8b8b.firebaseio.com",
});

const firebaseDb = firebase.firestore();

module.exports = { firebaseDb, admin };
