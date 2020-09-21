const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
import helper from '../helper/bcrypt';
const { Schema } = mongoose;
import timestampPlugin from './plugin/plugin';
import Helper from '../../app/helper/bcrypt';
const userSchema = new Schema({
  provider: {
    type: String
  },
  username: {
    type: String
  },
  password: { type: String },
  email: {
    index: { unique: true },
    type: String
  },
  address: {
    type: String
  },
  meta: mongoose.Schema.Types.Mixed,
  picture : mongoose.Schema.Types.Mixed,
  /*
  reviews : [{
    type: mongoose.Schema.ObjectId,
    ref: 'Review'
  }],
  booking :  [{
    type: mongoose.Schema.ObjectId,
    ref: 'Booking'
  }],
  vehicles: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Vehicle'
  }], */
  uuid: {
    type: String
  },
  type: {
    type: String,
    default: 1
  },
  status: {
    type: String,
    default: 1
  },
  profile_picture: mongoose.Schema.Types.Mixed,
  phone: String,
  email_verified: Boolean,
  phone_verified: Boolean,
  social: mongoose.Schema.Types.Mixed,
  documents: [mongoose.Schema.Types.Mixed],
  gender: Number, // 1: Male, 2: Female, 3: Unspecified
},{ toJSON: { virtuals: true } });

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
userSchema.plugin(timestampPlugin)

const User = mongoose.model('User', userSchema);

export default User;

