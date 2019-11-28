const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const axios = require("axios");
const { logger } = require("../utils/logger");

const postMessage = async (channelID, messageText) => {
  const url = "https://slack.com/api/chat.postMessage";
  const post = {
    channel: channelID,
    text: messageText
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.BOT_USER_ACCESS_TOKEN}`
  };
  try {
    const response = await axios.post(url, post, { headers: headers });
    logger.info(` Response code: ${response.status}`);
  } catch (e) {
    logger.info(`Error posting message: ${e}`);
  }
};

module.exports = { postMessage };
