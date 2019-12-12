const db = require("./../../db/index");

const removeUser = (obj, { userID }) => {
  for (let keys in obj) {
    if (obj[keys].indexOf(userID) !== -1) {
      return { ...obj, [keys]: obj[keys].filter(user => userID != user) } || obj;
    } else {
      return obj;
    }
  }
};

const addUser = (obj, { responseSelected, userID }) => ({
  ...obj,
  [responseSelected]: [...obj[responseSelected], userID]
});

const getData = response => {
  return (
    db
      .collection("SLACKBOT_TEST")
      .doc(response.firebaseID)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
          throw 'No such document!';
        } else {
          return doc.data();
        }
      })
  );
};

module.exports = { removeUser, addUser, getData };