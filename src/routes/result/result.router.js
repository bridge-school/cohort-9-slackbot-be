const express = require("express");

const { getResult } = require("./result.controller");

const router = express.Router({ mergeParams: true });

router.get("", getResult);

module.exports = {
  resultRouter: router
};
