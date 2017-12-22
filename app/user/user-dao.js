const dbManager = require('../db-helper')

const buildQuery = (key, value) => {
  return {key: value}
}

const getUserByProp = (prop) => {
  const query = buildQuery({prop})
  return new Promise((fulfill, reject) => {
    dbManager.connect().then((db) => {
      db.collection('users')
        .findOne(query)
        .then((user) => {
          fulfill(user)
          dbManager.close()
        })
        .catch((err) => {
          reject(err)
          dbManager.close()
        })
    })
    .catch((err) => {
      reject(err)
      dbManager.close()
    })
  })
}
const getUserByEmail = (email) => {
  return getUserByProp(email)
}

const getUserByUserName = (userName) => {
  return getUserByProp(userName)
}

module.exports = {
  getUserByEmail,
  getUserByUserName
}
