/* eslint quote-props: 0 */
export { }
const configuration: any = {};

configuration.db = {
  mysql: {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    connectTimeout: 100000
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    uername: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE
  }
};

configuration.URL = {
  frontEnd: process.env.FE_URL
}
configuration.facebook = {
  client_id: process.env.F_CLIENTID,
  client_secret: process.env.F_CLIENTSECRET,
  callback_url: process.env.F_CALLBACK
};
configuration.google = {
  client_id: process.env.G_CLIENTID,
  client_secret: process.env.G_CLIENTSECRET,
  callback_url: process.env.G_CALLBACK
};
configuration.linkedin = {
  client_id: process.env.L_CLIENTID,
  client_secret: process.env.L_CLIENTSECRET,
  callback_url: process.env.L_CALLBACK
};
configuration.twitter = {
  client_id: process.env.T_CLIENTID,
  client_secret: process.env.T_CLIENTSECRET,
  callback_url: process.env.T_CALLBACK
};
configuration.email = {
  apiKey: process.env.API_KEY,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
}
configuration.twilio = {
  sid: process.env.SID,
  token: process.env.TOKEN,
  phone: process.env.PHONE,
}
configuration.url = {
  FE: process.env.FE,
  API: process.env.API,
}
configuration.uploadpath = {
  uploaddir: process.env.UPLOAD_DIR,
  profiledir: process.env.PROFILE_PICTURE_DIR
}

module.exports = configuration;