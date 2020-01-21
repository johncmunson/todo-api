const Knex = require('knex')
// Knexfile needs to stay at root level I think for knex cli commands to work.
// Perhaps this can be changed with config? This restriction is preventing
// a lot of the source code from being moved into a src directory.
const knexConfig = require('../knexfile')

const env = process.env.NODE_ENV || 'development'
const knex = Knex(knexConfig[env])

module.exports = knex
