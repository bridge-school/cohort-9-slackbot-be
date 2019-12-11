const express = require("express");

const {
  getPreviousPollsController,
  createPollController
} = require("./polls.controller");

const router = express.Router();

router.get("", getPreviousPollsController);
router.post("", createPollController);

const { postPolls, getPolls } = require("./polls.controller");

const router = express.Router();

router.get("", getPolls);
router.post("", postPolls);

module.exports = {
  pollsRouter: router
};
