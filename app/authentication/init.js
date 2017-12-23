const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const userDao = require('../user/user-dao.js')

// Configure the local strategy for use by Passport.
passport.use(new Strategy(
  function(username, password, done) {
    userDao.getUserByUserName(username)
      .then((user) => {
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            return done(err)
          }
          if (!isValid) {
            console.log('passwords do not match')
            return done(null, false)
          }
          return done(null, user)
        })
        // if (user.password != password) { return done(null, false); }
        // return done(null, user);
      })
      .catch((err) => {
        done(err)
      })
}));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  userDao.getUserById(id)
    .then(function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
});

const initPassport = (app) => {
  app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/login', passport.authenticate(
    'local', { failureRedirect: '/login' }), (req, res) => {
    delete req.user.password
    res.send(req.user);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.send('User logged out successfuly');
  });

  // to use for routes that require authentication
  passport.authenticattionMiddelware = require('./authenticate')
}

module.exports = initPassport
