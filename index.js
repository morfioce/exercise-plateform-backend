const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')

const PORT = process.argv[2] || 3000

const app = express()

// Define thrid party middelwares
app.use(logger('dev'))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('working')
})


app.use(errorHandler())

app.listen(PORT, (err) => {
  if (err) return console.error(err)
  else console.log(`server is running at port ${PORT}`)
})
