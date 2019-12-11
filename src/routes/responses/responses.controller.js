const _get = require('lodash/get');
const db = require("./../../db/index");

// Organize Response Object from Slack API
const postResponses = function (req, res) {
  const body = JSON.parse(req.body.payload);
  const response = {
    responseSelected: _get(body, 'actions[0].text.text', ''),
    id: _get(body, 'actions[0].block_id', '')
  };

  res.set('Content-Type', 'application/json');
  res.send(`Received new Poll: ${response}`);

  updateDatabase(response);
}

const getData = response => {
  return (
    db
      .collection("SLACKBOT_TEST")
      .doc(response.id)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          return doc.data();
        }
      })
  );
};

const updateDatabase = async (response) => {
  await getData(response)
    .then(data => {
      const initialResponse = data.responses[response.responseSelected];

      db.collection("SLACKBOT_TEST").doc(response.id).update({
        responses: {
          ...data.responses,
          [`${[response.responseSelected]}`]: initialResponse + 1
        }
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Something broke!");
    });
};

module.exports = { postResponses };

