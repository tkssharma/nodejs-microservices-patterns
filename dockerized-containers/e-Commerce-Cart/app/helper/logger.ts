const log = require('loglevel');

log.setLevel(global.configuration.logLevel);
const logger = log;
export default  logger;