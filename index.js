const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const { Model } = require('objection')
const Knex = require('knex')
const knexConfig = require('./knexfile')
const routes = require('./routes')
const models = require('./models')

const knex = Knex(knexConfig.development)
Model.knex(knex)

const port = process.env.PORT || 3000
const app = express()

app.use(logger('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.context = {}
  next()
})

app.use((req, res, next) => {
  req.context.models = models
  next()
})

app.use('/', routes.root)
app.use('/todos', routes.todos)
app.use('/categories', routes.categories)

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.statusCode || err.status || 500).json(err.data || err.message || {})
  } else {
    next()
  }
})

app.listen(port, () =>
  console.log(`Backend connected to database and listening on port ${port} 😋`)
)
