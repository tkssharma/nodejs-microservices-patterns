export {}
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin');
import userController from '../../controller/UserController';
/* eslint no-underscore-dangle: 0 */
passport.use(new LinkedInStrategy(
  {
    consumerKey: global.configuration.linkedin.client_id,
    consumerSecret: global.configuration.linkedin.client_secret,
    callbackURL: global.configuration.linkedin.callback_url,
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
  },
  ((token, tokenSecret, profile, done) => {
    console.log(profile);
    const data = profile._json;
    userController.registerSocial({
      provider: 'linkedin',
      name: `${data.firstName} ${data.lastName}`,
      email: data.emailAddress,
      mobno: '5436785432',
      meta: {
        provider: 'linkedin',
        id: data.id,
        token,
      }
    }, (err, profileData) => {
      if (err) {
        done(err, null);
      }
      done(null, profileData);
    });
  })
));

const LinkedinRoutes = {
  authenticate: () => passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }),
  callback: () => passport.authenticate('linkedin', {
    failureRedirect: '/auth/failed'
  })

};

export default LinkedinRoutes;
