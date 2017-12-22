const userDao = require('./user-dao.js')

function initUser (app) {
  app.get('/users/:email', (req, res, next) => {
    const email = req.params.email
    userDao.findUserByEmail(email)
      .then((user) => {
        console.log('trying to read the user', user)
        res.send(user)
      })
      .catch((err) => {
        next(err)
      })
  })

  // app.get('/student', passport.authenticationMiddleware(), renderProfile)
  // app.post('/login', passport.authenticate('local', {
  //   successRedirect: '/student',
  //   failureRedirect: '/'
  // }))
}

module.exports = initUser
