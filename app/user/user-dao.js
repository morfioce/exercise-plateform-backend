const dbConnect = require('../db-helper')

const findUserByEmail = (email) => {
  return new Promise((fulfill, reject) => {
    dbConnect().then((db) => {
      db.collection('users')
        .findOne({email})
        .then((user) => {
          fulfill(user)
        })
        .catch((err) => {
          reject(err)
        })
    })
    .catch((err) => {
      reject(err)
    })
  })
}

module.exports = {
  findUserByEmail
}
