const mongoDriver = require('mongodb').MongoClient
const assert = require('assert')
const path = require('path')

const data = require('./data.json')
const DB_URL = 'mongodb://localhost:27017'
const DB_NAME = 'gmc-exercise-platform'

mongoDriver.connect(DB_URL, (err, dbHandler) => {
  // make sure there is no error
  assert.equal(null, err)

  const db = dbHandler.db(DB_NAME)
  const Users = db.collection('users')
  const Classrooms = db.collection('classrooms')

  // remove all documents
  Users.drop()
  Classrooms.drop()

  // insert test data
  Users.insertMany(data.users)
    .then((result) => {
      console.log(result)
    })
  Classrooms.insertMany(data.classrooms)
    .then((result) => {
      console.log(result)
      dbHandler.close()
    })
})
