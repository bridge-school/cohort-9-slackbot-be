const winston = require("winston");

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      colorize: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.align(),
        winston.format.simple()
      )
    })
  ]
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: (message) => {
    logger.info(message);
  }
};

module.exports = {
  logger
}
