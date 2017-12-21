const express= require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require ('errorhandler')

const PORT = process.argv[2] || 8000
const app  = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(errorhandler())

app.get('/' , (req,res) => {
  res.send('Welcome to GoMyCode Exercise Platform')
})

app.listen(PORT , (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`server is listening at port ${PORT}`)
})
