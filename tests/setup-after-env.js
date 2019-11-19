const request = require('supertest')
const { app } = require('../index')

global.request = request
global.server = app
