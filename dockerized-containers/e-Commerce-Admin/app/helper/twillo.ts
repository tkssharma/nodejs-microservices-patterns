const twilioConfig = global['configuration'].twilio;
// import twilio from 'twilio';

const twillo = require('twilio')
const client = new twillo(twilioConfig.sid, twilioConfig.token);

let TwilioHelper = {

  phone_verification(phone_number, code, callback) {
    client.sendMessage({
      to: phone_number,
      from: twilioConfig.phone,
      body: `Hello from Bal Bla e-Commerce-Hub\nYour verification code is ${code}`,
    }, (err, message) => {
      callback(message);
    });
  },
  password_reset_notification(phone) {
    client.sendMessage({
      to: phone,
      from: twilioConfig.phone,
      body: `Bla Bla\nYour password has been successfully reset.`,
    }, (err, message) => {
      // 
    });
  },

  default_notification(phone, message) {
    console.log(client);
    client.sendMessage({
      to: phone,
      from: twilioConfig.phone,
      body: `e-Commerce-Hub-TM\n${message}`,
    }, (err, message) => {
      // 
    });
  }
}
export default TwilioHelper;


