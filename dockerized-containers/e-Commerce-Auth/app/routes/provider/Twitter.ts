
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
import userController from '../../controller/UserController';


passport.use(new TwitterStrategy(
  {
    consumerKey: global.configuration.twitter.client_id,
    consumerSecret: global.configuration.twitter.client_secret,
    callbackURL: 'http://127.0.0.1:3005/auth/callback/twitter'
  },
  (token, tokenSecret, profile, done) => {
    console.log('data>>>', profile);
    const data = profile;
    userController.registerSocial({
      provider: 'twitter',
      username: data.username,
      email: data.email || 'raam.yaadav@gmail.com',
      mobno: '5436785432',
      meta: {
        provider: 'twitter',
        id: data.id,
        token,
      }
    }, (err, profileData) => {
      if (err) {
        done(err, null);
      }
      done(null, profileData);
    });
  }
));

const TwitterRoutes = {
  authenticate: () => passport.authenticate('twitter'),
  callback: () => passport.authenticate('twitter', { failureRedirect: '/auth/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
};


export default  TwitterRoutes;
