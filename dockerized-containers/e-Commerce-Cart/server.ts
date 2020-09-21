import * as http from 'http';
import * as debug from 'debug';
// After you declare "app"
const env = process.env.NODE_ENV || 'dev'
console.log(` using ${process.env.NODE_ENV} to run application`);
global.configuration = require(`./app/config/environments/${env}`);
import App from './express';
import eventEmitter from './app/events/processEvent'
const port = (process.env.PORT);
import logger from './app/lib/logger';
import mysql from './app/lib/mysql';
global['connection'] = mysql

const appServer = http.createServer(App);

appServer.on('error', onError);
appServer.on('listening', onListening);


if (!module.parent) {
  eventEmitter.on('dbReady', (connection) => {
    const port = process.env.PORT;
     appServer.listen(process.env.PORT,
      () => {
        logger.info(`API running in environment ${process.env.NODE_ENV}`);
        logger.info(`API running at http://localhost:${port}`);
      },
    );
    appServer.setTimeout(200000);
    if (process['parent']) process.send('ready');
  });
}


function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const gracefulStopServer = function () {
  // Wait 10 secs for existing connection to close and then exit.
  setTimeout(() => {
    logger.info('Shutting down server');
    process.exit(0);
  }, 1000);
};

process.on('uncaughtException', (err) => {
  logger.error(err, 'Uncaught exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error({
    promise,
    reason
  }, 'unhandledRejection');
  process.exit(1);
});

process.on('SIGINT', gracefulStopServer);
process.on('SIGTERM', gracefulStopServer);

function onListening(): void {
  let addr = appServer.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}