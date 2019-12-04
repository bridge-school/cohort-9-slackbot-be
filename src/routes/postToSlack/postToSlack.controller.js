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

postToSlack(channelID, message);

module.exports = { postToSlack };
