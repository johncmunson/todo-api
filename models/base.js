const { Model } = require('objection')
const { DBErrors } = require ('objection-db-errors')

class Base extends DBErrors(Model) {}

module.exports = Base
