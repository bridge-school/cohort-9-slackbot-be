const express = require("express");

const {
  getPreviousPollsController,
  createPollController
} = require("./polls.controller");

const router = express.Router();

router.get("", getPreviousPollsController);
router.post("", createPollController);

module.exports = {
  pollsRouter: router
};
