const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const axios = require("axios");
const { logger } = require("../../utils/logger");

const testPaylod = {
  question: "coffee in the morning?",
  responses: ["Yes", "No", "Tea"],
  channel: "slackbot-9-test",
  channelID: "CQR54FVUZ",
  channelSize: 3
};
const { channelID, question, responses } = testPaylod;

const postToSlack = async (channelID, messageText) => {
  const url = `${process.env.SLACK_POST_MESSAGE_API}`;
  const post = {
    channel: channelID,
    blocks: messageText
  };
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${process.env.BOT_USER_ACCESS_TOKEN}`
  };
  try {
    const response = await axios.post(url, post, { headers: headers });
    console.log(` Response code: `, response.data);
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
  console.log(res);

  res.status(200).send("OK");
};

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
postToSlack(channelID, message);

module.exports = { postToSlack };
