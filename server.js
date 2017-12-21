const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const db = require('./db')

// Configure the local strategy for use by Passport.
passport.use(new Strategy(
  function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) { return cb(err) }
      if (!user) { return cb(null, false) }
      if (user.password != password) { return cb(null, false) }
      return cb(null, user)
    })
  }))

// serialize users into session
passport.serializeUser(function (user, cb) {
  cb(null, user.id)
})

// deserialize users out of the session
passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err) }
    cb(null, user)
  })
})

// Create Express application
let app = express()

// Use application-level middleware for logging, parsing, and session handling
app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize())
app.use(passport.session())

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.send('succes login')
  })

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.listen(8000, () => {
  console.log('server listening in 8000')
})
