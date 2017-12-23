const dbManager = require('../db-helper')

const buildQuery = (key, value) => {
  return {
    [key]: value
  }
}

const getUserByProp = (query, projection) => {
  return new Promise((fulfill, reject) => {
    dbManager.connect().then((db) => {
      db.collection('users')
        .findOne(query, projection)
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
const getUserByEmail = (email) => {
  const query = buildQuery('email', prop)
  const projection = {password: 0}
  return getUserByProp(query, projection)
}

const getUserByUserName = (userName) => {
  const query = buildQuery('userName', userName)
  const projection = {password: 0}
  return getUserByProp(query, projection)
}

const getUserById = (id) => {
  const query = buildQuery('_id', id)
  const projection = {password: 0}
  return getUserByProp(query, projection)
}

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByUserName
}
