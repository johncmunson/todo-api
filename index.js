const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const { Model } = require('objection')
const Knex = require('knex')
const knexConfig = require('./knexfile')
const routes = require('./routes')
const models = require('./models')
const {
  createContext,
  errorHandler
} = require('./middleware')

const knex = Knex(knexConfig.development)
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

app.listen(port, () =>
  console.log(`Backend connected to database and listening on port ${port} 😋`)
)
