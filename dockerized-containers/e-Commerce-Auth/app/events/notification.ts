
import Email from '../helper/email';
declare function require(name: string);

const events = require('events');
const winston = require('winston');
// import Twillo from '../helper/twillo';

const eventEmitter = new events.EventEmitter();
eventEmitter.on('welcome', (user) => {
  winston.log('info', `sending welcome email to ${user.email}`);
  // Twillo.default_notification(user.phone, 'welcome')
  Email.welcome(user);
});
eventEmitter.on('forgotPassword', (user, password, uuid) => {
  winston.log('info', `sending forgotPassword email to ${user.email}`);
  Email.password_reset(user, password);
  // Twillo.default_notification(user.phone, 'welcome')
});

export default eventEmitter;
