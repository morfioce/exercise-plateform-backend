const userDao = require('./user-dao.js')

function initUser (app) {
  app.get('/users/:userName', (req, res, next) => {
    const userName = req.params.userName
    userDao.getUserByUserName(userName)
      .then((user) => {
        // remove password field until fix projection issue
        delete user.password
        res.send(user)
      })
      .catch((err) => {
        next(err)
      })
  })
}

module.exports = initUser
