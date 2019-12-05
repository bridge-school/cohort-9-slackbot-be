const axios = require("axios");
const { logger } = require("../../utils/logger");
const db = require("../../db/index");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

// Get poll from firebase

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

const getPreviousPollsController = async (req, res) => {
  getData("SLACKBOT_TEST")
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Something broke!");
    });
};

// POST to slack api

const postToSlack = async (channelID, messageText) => {
  const url = `${process.env.SLACK_POST_MESSAGE_API}`;
  const post = {
    channel: channelID,
    blocks: messageText
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.BOT_USER_ACCESS_TOKEN}`
  };
  try {
    const response = await axios.post(url, post, { headers: headers });
    logger.info(` Response code: `, response);
  } catch (err) {
    logger.info(`Error posting message: `, err);
  }
};

const createPollController = (req, res) => {
  const testPaylod = {
    question: "coffee in the morning?",
    responses: ["Yes", "No", "Tea"],
    channel: "slackbot-9-test",
    channelID: "CQR54FVUZ",
    channelSize: 3
  };

  const { channelID, question, responses } = testPaylod;

  const buttons = responses.map(response => ({
    type: "button",
    text: {
      type: "plain_text",
      text: response,
      emoji: true
    }
  }));

  const message = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${question}*`
      }
    },
    {
      type: "actions",
      elements: buttons
    }
  ];

  // send to firebase

  // send to slack
  postToSlack(channelID, message);
  res.status(200).send("OK");
};
module.exports = { getPreviousPollsController, createPollController };
