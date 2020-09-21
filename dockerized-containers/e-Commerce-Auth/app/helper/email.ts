const path = require('path');
declare function require(name:string);

const nodemailer = require('nodemailer');
const url = global['configuration'].url;
const mailConfig = global['configuration'].email;

import emailConfig from '../config/email';
import { EmailTemplate } from 'email-templates';
// const Twillo = require('./twillo');

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // type: 'OAuth2',
      user: mailConfig.auth.user,
      pass:  mailConfig.auth.pass
    },
  });
const Email = {
  welcome(user) {
    if (user.email) {
      let templateDir = path.join('app/global/templates', 'emails', 'welcome-email');
      let welcomeEmail = new EmailTemplate(templateDir);
      welcomeEmail.render({ user: user, activate_url: `${url.API}/auth/activate/${user.uuid}` }, (err, result) => {
        transport.sendMail(
          {
            from: emailConfig.global.from,
            to: user.email,
            subject: emailConfig.welcome.subject,
            html: result.html,
          }, (err, info) => {
            // some error occoured...
            console.log(err);
          }
        );
      });
    }
  },
  password_reset(user, password) {
    if (user.email) {
      let templateDir = path.join('app/global/templates', 'emails', 'password-reset-email');
      let passwordResetEmail = new EmailTemplate(templateDir);
      passwordResetEmail.render({ user: user, login_url: `${url.FE}/#/auth/login`, password: password }, (err, result) => {
        transport.sendMail(
          {
            from: emailConfig.global.from,
            to: user.email,
            subject: emailConfig.password_reset.subject,
            html: result.html,
          }, (err, info) => {
            // some error occoured...
          }
        );
      });
    }
    if (user.phone_verified) {
      // Twillo.password_reset_notification(user.phone);
    }

  },
};
export default Email;
