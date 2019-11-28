// Load environment variables
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const router = require("./api");
const { logger } = require("./utils/logger");
const { errorHandler } = require("./middleware/error-handler");
const { channelRouter } = require("./routes/channels/channels.router");
const { postMessage } = require("./middleware/postMessage");

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
    origin: [`http://localhost:3000`, /fervent-lichterman-55cc2b.netlify.com/]
  })
);
// app.use("/", router);
// app.use(errorHandler);
app.use("/channels", channelRouter);
// // app.get("/", );
postMessage(
  process.env.SLACKBOT_TEST_CHANNEL,
  "Testing one, two, three. Is this thing on?"
);

// Serve the application at the given port
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`🎧 Listening at http://localhost:${port}/`);
  });
}

module.exports = {
  app
};
