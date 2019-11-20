const express = require("express");

const { getChannels } = require("./channels.controller");

const router = express.Router();

router.get("", getChannels);

module.exports = {
  channelRouter: router
};
