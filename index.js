const app = require('./app')
const config = require('./config')
const port = config.server.port || 3000

app.listen(port, function (err) {
  if (err) {
    throw err
  }

  console.log(`server is listening on ${port}...`)
})
