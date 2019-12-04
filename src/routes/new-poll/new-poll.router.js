const express = require("express");

const { newPolls } = require("./new-poll.controller");

const router = express.Router();

router.post("", newPolls);

module.exports = {
  newPollRouter: router
};