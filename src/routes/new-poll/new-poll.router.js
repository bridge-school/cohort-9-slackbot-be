const express = require("express");

const { newPollRouter } = require("./new-poll.controller");

const router = express.Router();

router.post("", newPollRouter);

module.exports = {
  newPollRouter: router
};