/* eslint prefer-destructuring:0 */
const passportModule = require('passport');
const LocalStrategy = require('passport-local');
import userController from '../../controller/UserController';
const User = require('../../models/user');
const helper = require('../../helper/bcrypt');


passportModule.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
  },
  ((req, email, password, done) => {
    // write code here to find user if it exists in system
    User.find({ email }, (err, data) => {
      if (err) {
        return done(null, null);
      } else if (data.length === 0) {
        return done(null, null);
      }
      const flag = helper.comparePassword(password, data[0].password);
      if (!flag) {
        return done(null, null);
      }
      return done(null, data);
    });
  })
));

const localRoutes = {
  authenticate() {
    return passportModule.authenticate('local', { session: false });
  },
  authenticate_with_callback: () => passportModule.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failed'
  }),
};


export default localRoutes;
