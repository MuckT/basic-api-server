'use strict'

// Express setup
const express = require('express')

const app = express()

app.use(express.json())

// Import handlers
const notFound = require('./error-handlers/404')
const error = require('./error-handlers/500')
const clothesRouter = require('./routes/clothes')
const foodRouter = require('./routes/food')

// Import Middleware
const logger = require('./middleware/logger')

// Proof of life
app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!')
})
app.get('/bad', (req, res, next) => {
  next('you\'ve messed up')
});


// DB Routes
app.use(clothesRouter)
app.use(foodRouter)

// Use Handlers
app.use('*', notFound)
app.use(error)

// Use Application Middleware
app.use(logger)

// Export modules
module.exports = {
  server: app,
  start: port => app.listen(port, console.log(`Server started on Port ${port}`))
}
