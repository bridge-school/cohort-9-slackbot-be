const express = require("express");

const { getPreviousPolls } = require("./previous-polls.controller");

const router = express.Router();

router.get("", getPreviousPolls);

module.exports = {
  previousPollsRouter: router
};
