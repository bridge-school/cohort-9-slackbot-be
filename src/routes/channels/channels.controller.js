const axios = require("axios");
const { logger } = require("../../utils/logger");

const getChannels = async (req, res) => {
  try {
    const response = await axios({
      url: "https://slack.com/api/conversations.list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BOT_USER_ACCESS_TOKEN}`,
        "Content-type": "application/json"
      }
    });
    // logger.info(process.env.BOT_USER_ACCESS_TOKEN);
    // logger.info(JSON.stringify(channels));
    const channelsData = response.data.channels;
    const channelsInfo = channelsData.map(channel => ({
      name: channel.name,
      id: channel.id,
      size: channel.num_members
    }));
    res.json(channelsInfo);
  } catch (error) {
    logger.info("get channels error", error);
    res.send("get channels error");
  }
};

// getChannels();

module.exports = { getChannels };
