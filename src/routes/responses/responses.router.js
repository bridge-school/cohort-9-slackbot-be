const express = require("express");

const { postResponses } = require("./responses.controller");

const router = express.Router();

router.post("", postResponses);

module.exports = {
  responsesRouter: router
};