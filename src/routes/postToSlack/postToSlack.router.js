const express = require("express");

const { postToSlack } = require("./postToSlack.controller");

const router = express.Router();

router.get("", postToSlack);

module.exports = {
  postToSlackrouter: router
};
