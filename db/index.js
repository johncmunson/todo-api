const Knex = require('knex')
// Knexfile needs to stay at root level I think for knex cli commands to work.
// Perhaps this can be changed with config?
const knexConfig = require('../knexfile')

const env = process.env.NODE_ENV || 'development'
const knex = Knex(knexConfig[env])

module.exports = knex
