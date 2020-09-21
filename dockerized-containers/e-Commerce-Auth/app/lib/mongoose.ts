/* eslint no-undef: 0 */
/* eslint import/no-dynamic-require: 0 */

// Bring Mongoose into the app
const env = process.env.NODE_ENV || 'dev';
const global1 = require(`../config/environments/${env}`);
const mongoConfig = global1['db'].mongo;
const mongoose = require('mongoose');
// Build the connection string
let dbURI = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;
//if(env === 'test' || env === 'dev'){
//  dbURI += '?authSource=admin'
//}
const authOptions = {
  auth: {
    user: mongoConfig.uername,
    password: mongoConfig.password
  }
};
const connect  = () => {
// Create the database connection
mongoose.connect(dbURI, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Mongoose Connected! to Database');
  }
});


// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
}); 

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
}


export default connect;