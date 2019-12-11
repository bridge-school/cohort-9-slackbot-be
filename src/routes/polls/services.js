const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });
const db = require("./../../db/index");
const axios = require("axios");

// Create block message
const blockMessage = ({ question, responses }, firebaseID) => {
  const buttons = Object.keys(responses).map(response => ({
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
      block_id: firebaseID,
      elements: buttons
    }
  ];
};

// Send poll to slack
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
  } catch (err) {
    console.log(`Error posting message: `, err);
  }
};

// Function to insert question to Firebase
const insertDataToFB = async (col, data) => {
  try {
    const doc = await db.collection(col).doc();
    const id = doc.id;
    const messagePayload = blockMessage(data, id);
    doc
      .set(data)
      .then(() => postToSlack(data.channelID, messagePayload))
      .catch(err => console.log("Error", err));
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = { insertDataToFB };
