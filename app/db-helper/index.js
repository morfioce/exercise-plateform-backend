const config = require('../../config')
const mongoClient = require('mongodb').MongoClient

const DB_URL = config.database.db_url
const DB_NAME = config.database.db_name

// Open a database connection
const connect = () => {
  return mongoClient.connect(DB_URL)
    .then((databaseHandler) => {
      return {
        dbHandler: databaseHandler,
        db: databaseHandler.db(DB_NAME)
      }
    })
    .catch((err) => {
      return Error(err)
    })
}

// close the connection
const close = (db) => {
  return db.close()
}

module.exports = {
  connect,
  close
}
