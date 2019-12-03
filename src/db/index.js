const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

let serviceAccount;
if (process.env.NODE_ENV === "development") {
  serviceAccount = require("../firebase-credentials.json");
} else {
  serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
  };
}

// initialize firebase store
// try {
//   const serviceAccount =
//     process.env.NODE_ENV === "development"
//       ? require("../../firebase-credentials.json")
//       : SERVICE_ACCOUNT;
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
// } catch (e) {
//   console.log(e);
//   throw new Error(
//     "Please add the firebase-credentials.json file to your root folder found in your project's Slack channel"
//   );
// }

// const db = admin.firestore();

let _db;
const database = () => {
  if (!_db) {
    admin.initializeApp({
      // authenticate with firebase using the serviceAccount via firebase-admin
      credential: admin.credential.cert(serviceAccount)
    });
    // gets the firestore (database service of firebase) object
    _db = admin.firestore();
    _db.settings({
      ssl: true,
      timestampsInSnapshots: true
    });
  }
  return _db;
};
const db = database();
module.exports = db;
