const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const axios = require("axios");
const payload = {
  question: "Coffee in the morning",
  responses: ["Yes", "Nah", "tea"],
  channel: "slackbot-9-test",
  channelID: "CQR54FVUZ",
  channelSize: 3
};
const blockMessage = ({ question, responses }) => {
  const buttons = responses.map(response => ({
    type: "button",
    text: {
      type: "plain_text",
      text: response,
      emoji: true
    }
  }));
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${question}*`
      }
    },
    {
      type: "actions",
      block_id: "FIREBASE ID",
      elements: buttons
    }
  ];
};

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
    console.log(response.data);
    console.log(response.data.message.blocks);
  } catch (err) {
    console.log(`Error posting message: `, err);
  }
};

postToSlack(payload.channelID, blockMessage(payload));
module.exports = { blockMessage, postToSlack };
