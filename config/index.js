// required environment variables
['NODE_ENV', 'PORT'].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`)
  }
})

const config = {
  env: process.env.NODE_ENV,
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    enabled: process.env.BOOLEAN ?
      process.env.BOOLEAN.toLowerCase() === 'true' :
      false
  },
  database: {
    db_url: 'mongodb://localhost:27017',
    db_name: 'gmc-exercise-platform'
  },
  server: {
    port: Number(process.env.PORT)
  }
}

module.exports = config
