const userDao = require('./user-dao.js')

function initUser (app) {
  app.get('/users/:userName', (req, res, next) => {
    const userName = req.params.userName
    userDao.getUserByUserName(userName)
      .then((user) => {
        if (!user) res.status(404).send(
          {
            error: 404,
            message: 'User not Found'
          }
        )
        else res.send(user)
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
