const uuidv4 = require('uuid/v4');
import User from '../models/user';
declare function require(name: string);
import Helper from '../helper/bcrypt';
const jwt = require('jsonwebtoken');
import helper from '../helper/bcrypt';
import mailEvents from '../events/notification';
import logger from '../helper/logger';
import email from '../helper/email';

const saltRounds = 10;
class userController {

  static getUserByEmail(email, cb) {
    User.findOne({ 'email': email }, (error, user) => {
      if (user) {
        cb(null, user);
      } else {
        cb('User does not exist in system', null);
      }
    });
  }
  static validateUser(req, res, cb) {
    const { body } = req;
    User.find({ email: body.email })
      .then((data) => {
        if (data && data.length) {
          const flag = helper.comparePassword(body.password, data[0].password)
          if (flag) {
            jwt.sign(helper.buildUserToken(data[0]), 'secretkey', (tokError, token) => {
              cb(null, token);
            });
          } else {
            cb(new Error('username password does not match'), null);
          }
        }
        else {
          cb(new Error('no user found with this account email'), null);
        }
      }).catch((err)=>{
        console.log(err);
        cb(new Error('no user found with this account email'), null);
      })
  }
  static registerDefault(req, res, cb) {
    const { body } = req;
    const { location } = req;
    const hash = helper.generateSaltValue(body.password);
    return User.find({ email: body.email }).then((user) => {
      if (user && user.length > 0) {
        cb(new Error('user already regitsered with us'), null);
      } else {
        return User.create(this.buildUser(body, hash, location)
          , (error, user) => {
            if (error) {
              cb(error, null);
            } else {
              logger.info('emitting user create event');
              mailEvents.emit("welcome", user);
              cb(null, user);
            }
          });
      }
    });
  }
  static buildUser(body, hash = null, location = null) {

    const build = {
      username: body.username,
      phone: body.phone,
      email: body.email,
      email_verified: false,
      phone_verified: false,
      picture: body.picture ? body.picture : null,
      status: 1,
      gender: null,
      documents: [],
      type: 1,
      social: body.meta,
      uuid: uuidv4()
    }
    return hash ? Object.assign({}, build, { password: hash }) : build;
  }
  static registerSocial(user, callback) {
      User.findOne({ email: user.email }, (error, existingUser) => {
        if (existingUser) {
          callback(null, (existingUser));
        } else {
          User.create(this.buildUser(user, null), (err, user) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, user);
              mailEvents.emit("welcome", user);
            }
          });
        }
      });

  }

  static activateUserAccount(uuid, cb) {
    User.findOne({ 'uuid': uuid }, (error, foundUser) => {
      if (foundUser) {
        foundUser.email_verified = true;
        foundUser.save(function (err) {
          if (err) {
            cb('error occoured while updating record');
          } else {
            cb(null, 'done');
          }
        });
      } else {
        cb('User does not exist in system');
      }
    });
  }
  static resetPassword(email, callback) {
    // just generate password and send new password on mail
    User.findOne({ 'email': email }, (error, foundUser) => {
      if (foundUser) {
        let password = Math.random().toString(36).slice(2);
        const hash = helper.generateSaltValue(password);
        foundUser.password = hash;
        foundUser.save(function (err) {
          if (err) {
            callback('error occoured while updating record');
          } else {
            mailEvents.emit("forgotPassword", foundUser, password);
            callback(null, 'done');
          }
        });
      } else {
        callback('User does not exist in system with this email');
      }
    });
  }

  static changeUserRole(req, callback) {
    const email = req.params.email
    const body = req.body
    User.findOne({ 'email': email }, (error, user) => {
      if (user) {
        user.type = 2;
        user.save(function (err, updated_user) {
          if (err) {
            callback('error occoured while chaging role');
          } else {
            callback(null, updated_user);
          }
        });
      }
      else {
        callback('user not found in system', null);
      }
    });
  }
  static updateUser(email, data, callback) {
    User.findOne({ 'email': email }, (error, user) => {
      if (user) {
        if (data.username) { user.username = data.username; }
        if (data.gender) { user.gender = data.gender; }
        if (data.phone) { user.phone = data.phone; }
        if (data.profile_picture) { user.profile_picture = data.profile_picture; }
        if (data.password && data.password === data.confirm_password) {
          const hash = helper.generateSaltValue(data.password);
          user.password = hash;
        }
        if ( data.picture ) { user.picture = Helper.avatarURL(data.picture) }

        if (data.phone_verified) {
          user.phone_verified = true;
        }
        if (data.document) {
          user.documents.push(data.document);
        }
        if (data.meta) {
          user.meta = {
            about: data.meta.about || '',
            fun_fact: data.meta.fun_fact || '',
            payment: data.meta.payment || '',
          }
        }
        user.save(function (err, updated_user) {
          if (err) {
            callback('error occoured while updating record');
          } else {
            callback(null, updated_user);
          }
        });
      } else {
        callback('user not found', null);
      }
    });
  }
}

export default userController;
