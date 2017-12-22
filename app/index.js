const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// require('./authentication').init(app)
require('./user').init(app)
require('./classroom').init(app)

module.exports = app
