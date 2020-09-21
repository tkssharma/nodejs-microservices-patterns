const winston = require('winston');

// define the custom settings for each transport (file, console)
const options = {
  console: {
    level: 'info',
    handleExceptions: true,
    json: true,
    colorize: true,
    prettyPrint: true,
    humanReadableUnhandledException: true
  }
};
const logger = new winston.Logger({
  transports: [
  //  new winston.transports.File(options.file),
    new winston
      .transports
      .Console(options.console),
  ],
  exceptionHandlers: [
    // new winston.transports.File(options.errorLog)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message, encoding) {
    logger.info(message);
  }
};
export default logger;
