const { logger } = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
};

module.exports = {
  errorHandler
};
