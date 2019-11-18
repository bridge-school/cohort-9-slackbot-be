const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const axios = require('axios');
const { logger } = require("../utils/logger");

const getChannels = async () => {
  try {
    return await axios({
      url: 'https://slack.com/api/conversations.list',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.BOT_USER_ACCESS_TOKEN}`,
        'Content-type': 'application/json',
      }
    }).then(res => {
      logger.info('response', res);
    });
  }
  catch (error) {
    logger.info('error', error);
  }
}

getChannels();

