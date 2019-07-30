const express = require("express");

const { healthRouter } = require("../routes/health/health.router");

const router = express.Router();
router.use("/health", healthRouter);

module.exports = router;
