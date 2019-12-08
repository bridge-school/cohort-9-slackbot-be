const db = require("./../../db/index");
const { postToSlack, blockMessage } = require("./services");
const payload = {
  question: "Coffee in the morning",
  responses: ["Yes", "Nah", "tea"],
  channel: "slackbot-9-test",
  channelID: "CQR54FVUZ",
  channelSize: 3
};
const postPolls = function(req, res) {
  const body = req.body;
  console.log(body);
  res.set("Content-Type", "application/json");
  res.send(`Received new Poll: ${body.message}`);
  postToSlack(payload.channelID, blockMessage(payload));
};

const getData = col => {
  return (
    db
      // Table
      .collection(col)
      .get()
      // table is an object that will contain the data if it exists
      .then(querySnapshot => {
        const allData = [];
        querySnapshot.forEach(doc => allData.push(doc.data()));
        return allData;
      })
  );
};

const getPolls = async (req, res) => {
  getData("SLACKBOT_TEST")
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Something broke!");
    });
};

module.exports = { postPolls, getPolls };
