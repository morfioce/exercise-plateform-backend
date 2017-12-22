const config = require('../../config')
const mongoClient = require('mongodb').MongoClient

const DB_URL = config.database.db_url
const DB_NAME = config.database.db_name

const dbConnect = () => {
  return mongoClient.connect(DB_URL)
    .then((databaseHandler) => {
      return databaseHandler.db(DB_NAME)
    })
    .catch((err) => {
      return Error(err)
    })
}

// close the connection

module.exports = dbConnect
