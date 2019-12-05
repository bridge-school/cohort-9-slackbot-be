const express = require("express");

const { postPolls, getPolls } = require("./polls.controller");

const router = express.Router();

router.get("", getPolls);
router.post("", postPolls);

module.exports = {
  pollsRouter: router
};
