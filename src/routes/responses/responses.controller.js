const _get = require("lodash/get");
const db = require("./../../db/index");
const { removeUser, addUser, getData } = require("./services");

// Organize Response Object from Slack API
const postResponses = function (req, res) {
  const body = JSON.parse(req.body.payload);
  const response = {
    responseSelected: _get(body, 'actions[0].text.text', ''),
    firebaseID: _get(body, 'actions[0].block_id', ''),
    userID: _get(body, 'user.id', '')
  };
  console.log(response);

  res.set('Content-Type', 'application/json');
  res.send(`Received new Response: ${response}`);

  updateDatabase(response);
}

const createNewResponses = (obj, payload) => {
  const newObj = removeUser(obj, payload);
  return addUser(newObj, payload);
};

const updateDatabase = async (response) => {
  await getData(response)
    .then(data => {

      const initialResponseObj = data.responses;

      const newResponseObj = createNewResponses(initialResponseObj, response);

      db.collection("SLACKBOT_TEST").doc(response.firebaseID).update({
        responses: newResponseObj
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Something broke!");
    });
};

module.exports = { postResponses };

