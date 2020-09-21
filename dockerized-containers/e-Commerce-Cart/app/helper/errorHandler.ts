import  logger from '../lib/logger';
import  ResponseTemplate from './responseTemplate';
/* eslint class-methods-use-this:0 */
const env = process.env.NODE_ENV;
const onDevEnv = env === 'dev' || env === 'test' || env === 'local';
class errorHandler {
  public internalServerError(err, req, res, next) {
    logger.log('info',err);
    if (err.isBoom) {
      // Error From  joi express validator
      const error = {
        message: err.output.payload.error,
        error: err.output.payload.message
      };
      res.status(400).json(ResponseTemplate.BadRequestFromJoi(error));
    } else { // internalServerError
      res.status(500).json({
        success: false,
        message: err.message,
        error: (onDevEnv) ? err.stack : {}
      });
    }
  }
  public PageNotFound(req, res, err) {
    res.status(404).json({ message: 'api not found' });
  }
}

export default new errorHandler();
