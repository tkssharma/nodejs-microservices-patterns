import User from '../models/user';

const mongoose = require('mongoose');

const dbName = 'blabla';
mongoose.connect(`mongodb://localhost/${dbName}`);
/* eslint quote-props:0 */
/* Aquí vamos a requerir el mongoose, en donde tengo el modelo y la base de datos que creo */

const users = [
  {
    'username': 'tarun',
    'email': 'tarun@gmail.com',
    'email_verified': true,
    'phone_verified': false,
    'gender': null,
    'address': 'goa India',
    'geo': {
      'lat': 15.5377266,
      'lng': 73.8316141
    },
    'password': '$2a$10$S7FH2SqOls7bdAwosDlo0O0fw0wNW7a8e/hF.BqrE.qC9nybWnj0.',
    'documents': [],
    'status': '1',
    'type': '2'
  }, {
    'username': 'tarun1',
    'email': 'tarun1222@gmail.com',
    'email_verified': true,
    'phone_verified': false,
    'gender': null,
    'address': 'goa India',
    'geo': {
      'lat': 15.5377266,
      'lng': 73.8316141
    },
    'password': '$2a$10$S7FH2SqOls7bdAwosDlo0O0fw0wNW7a8e/hF.BqrE.qC9nybWnj0.',
    'documents': [],
    'status': '1',
    'type': '2'
  }, {
    'username': 'tarun1',
    'email': 'tarun22@gmail.com',
    'email_verified': true,
    'phone_verified': false,
    'gender': null,
    'address': 'goa India',
    'geo': {
      'lat': 15.5377266,
      'lng': 73.8316141
    },
    'password': '$2a$10$S7FH2SqOls7bdAwosDlo0O0fw0wNW7a8e/hF.BqrE.qC9nybWnj0.',
    'documents': [],
    'status': '1',
    'type': '2'
  }, {
    'username': 'tarun1',
    'email': 'tarun5@gmail.com',
    'email_verified': true,
    'phone_verified': false,
    'gender': null,
    'address': 'goa India',
    'geo': {
      'lat': 15.5377266,
      'lng': 73.8316141
    },
    'password': '$2a$10$S7FH2SqOls7bdAwosDlo0O0fw0wNW7a8e/hF.BqrE.qC9nybWnj0.',
    'documents': [],
    'status': '1',
    'type': '2'
  }, {
    'username': 'tarun1',
    'email': 'tarun1@gmail.com',
    'email_verified': true,
    'phone_verified': false,
    'gender': null,
    'address': 'goa India',
    'geo': {
      'lat': 15.5377266,
      'lng': 73.8316141
    },
    'password': '$2a$10$S7FH2SqOls7bdAwosDlo0O0fw0wNW7a8e/hF.BqrE.qC9nybWnj0.',
    'documents': [],
    'status': '1',
    'type': '2'
  }, {
    'username': 'tarun1',
    'email': 'tarun6@gmail.com',
    'email_verified': true,
    'phone_verified': false,
    'gender': null,
    'address': 'goa India',
    'geo': {
      'lat': 15.5377266,
      'lng': 73.8316141
    },
    'password': '$2a$10$S7FH2SqOls7bdAwosDlo0O0fw0wNW7a8e/hF.BqrE.qC9nybWnj0.',
    'documents': [],
    'status': '1',
    'type': '2'
  }, {
    'username': 'tarun1',
    'email': 'tarun7@gmail.com',
    'email_verified': true,
    'phone_verified': false,
    'gender': null,
    'address': 'goa India',
    'geo': {
      'lat': 15.5377266,
      'lng': 73.8316141
    },
    'password': '$2a$10$S7FH2SqOls7bdAwosDlo0O0fw0wNW7a8e/hF.BqrE.qC9nybWnj0.',
    'documents': [],
    'status': '1',
    'type': '2'
  }, {
    'username': 'tarun1',
    'email': 'tarun8@gmail.com',
    'email_verified': true,
    'phone_verified': false,
    'gender': null,
    'address': 'goa India',
    'geo': {
      'lat': 15.5377266,
      'lng': 73.8316141
    },
    'password': '$2a$10$S7FH2SqOls7bdAwosDlo0O0fw0wNW7a8e/hF.BqrE.qC9nybWnj0.',
    'documents': [],
    'status': '1',
    'type': '2'
  }
];

User.collection.drop();

User.create(users, (err) => {
  if (err) {
    throw (err);
  }
  console.log(`Created ${users.length} User`);
  mongoose.connection.close();
});


/* Para que se cree esta base de datos tengo que poner en terminal, en otra terminal:
node ./bin/seeds.js. De esta manera se crea la base de datos */
