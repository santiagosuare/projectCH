const admin = require("firebase-admin");
const serviceAccount = require("./coderhousebackendfirebase.json");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coderhouse-backend.firebaseio.com",
});

const firebaseDb = firebase.firestore();
console.log("\u001b[1;34m", "⚙ Configuring Firebase");

module.exports = {
  firebaseDb,
  admin,
};
