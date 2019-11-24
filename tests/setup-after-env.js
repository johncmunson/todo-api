const request = require('supertest')
const { app } = require('../index')
const knex = require('../db')

global.request = request
global.app = app

afterAll(async () => {
  await knex.destroy()
})
