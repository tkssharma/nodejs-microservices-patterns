
export {}
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import userController from '../../controller/UserController';
/* eslint no-underscore-dangle: 0 */

passport.use(new GoogleStrategy(
  {
    clientID: global.configuration.google.client_id,
    clientSecret: global.configuration.google.client_secret,
    callbackURL: `${global.configuration.url.API}/auth/callback/google`,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    const data = profile._json;
    console.log(data);
    userController.registerSocial({
      provider: 'google',
      username: data.displayName,
      email: data.emails[0].value,
      phone: '5436785432',
      picture : data.image.url,
      meta: {
        provider: 'google',
        id: data.id,
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


const GoogleRoutes = {
  authenticate: () => passport.authenticate('google', { scope: ['profile', 'email'] }),

  callback: () => passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
};


export default GoogleRoutes;
