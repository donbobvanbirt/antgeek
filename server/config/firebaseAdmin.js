const admin = require('firebase-admin');
const path = require('path');

const configPath = path.join(__dirname, '../../firebase-config.json');

admin.initializeApp({
  credential: admin.credential.cert(configPath),
  databaseURL: "https://antgeek-aca8d.firebaseio.com",
});

module.exports = admin;
