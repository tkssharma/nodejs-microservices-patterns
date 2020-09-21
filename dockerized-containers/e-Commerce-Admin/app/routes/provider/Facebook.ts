
import * as passport from 'passport';
const FacebookStrategy = require('passport-facebook');
import userController from '../../controller/UserController';
/* eslint no-underscore-dangle: 0 */

passport.use(new FacebookStrategy(
  {
    clientID: global.configuration.facebook.client_id,
    clientSecret: global.configuration.facebook.client_secret,
    callbackURL: global.configuration.facebook.callback_url,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    const data = profile._json;
    if (!data.email) {
      data.email = 'ramnivas.yadav@srijan.net';
    }
    userController.registerSocial({
      provider: 'facebook',
      name: data.name,
      email: data.email,
      phone: '5436785432',
      meta: {
        provider: 'facebook',
        id: profile.id,
        token: accessToken,
      }
    }, (err, profileData) => {
      if (err) {
        done(err, null);
      }
      done(null, profileData);
    });

  }
));

const FacebookRoutes = {
  authenticate: () => passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_location'] }),
  callback: () => passport.authenticate('facebook', {
    failureRedirect: '/auth/failed'
  })

};

export default  FacebookRoutes;
