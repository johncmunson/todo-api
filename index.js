require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const { Model } = require('objection')
const knex = require('./db')
const routes = require('./routes')
const models = require('./models')
const {
  createContext,
  errorHandler
} = require('./middleware')

Model.knex(knex)

const port = process.env.PORT || 3000
const app = express()

app.use(logger('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(createContext({ models }))

app.use('/', routes.root)
app.use('/todos', routes.todos)
app.use('/categories', routes.categories)

app.use(errorHandler)

// Unless using the --runInBand flag, jest tests run in parallel. If the app is
// listening on a netwrok port we will get "EADDRINUSE - port already in use"
// errors while running integration tests. Luckily, we don't need to be
// listening on a port at all for supertest to work. Internally, supertest will
// take the app and run it on port 0, which is how you tell Unix "randomly
// select the first available port you find".
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () =>
    console.log(`Backend connected to database and listening on port ${port} 😋`)
  )
}

module.exports = {
  app
}
