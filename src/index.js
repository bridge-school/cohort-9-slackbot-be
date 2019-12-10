// Load environment variables
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// Import Packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import Routes
const router = require("./api");
const { logger } = require("./utils/logger");
const { postTestMessage } = require("./middleware/postTestMessage");
const { errorHandler } = require("./middleware/error-handler");
const { channelRouter } = require("./routes/channels/channels.router");
const { pollsRouter } = require("./routes/polls/polls.router");
const { resultRouter } = require("./routes/result/result.router");

// Firebase Imports
const Timestamp = require("firebase-admin").firestore.Timestamp;
const db = require("./db/index");

// Create a new express application instance
const app = express();

// The port the express app will listen on
const port = process.env.PORT;
logger.info("🤖 Initializing middleware");

// This piece of middleware creates the logs that you see when
// you hit an endpoint in your terminal. It's here to help you debug.
app.use(morgan("tiny", { stream: logger.stream }));
app.use(
  cors({
    // regex to allow all urls from our FE netlify.
    origin: [`http://localhost:3000`, /slackbot-9.netlify.com/]
  })
);

// Add channels
// app.use("/", router);
// app.use(errorHandler);
app.use(bodyParser());
app.use("/channels", channelRouter);
// // app.get("/", );
app.use("/polls", pollsRouter);
app.use("/result/:id", resultRouter);
// postTestMessage(
//   process.env.SLACKBOT_TEST_CHANNEL,
//   "Changed this to postTestMessage 123"
// );

// Serve the application at the given port
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`🎧 Listening at http://localhost:${port}/`);
  });
}

module.exports = {
  app
};
