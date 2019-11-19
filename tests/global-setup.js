const knex = require('../db')

// Jest runs this function once before any of the test suites have run
module.exports = async (globalConfig) => {
  await knex.migrate.rollback(undefined, true)
  await knex.migrate.latest()
  await knex.seed.run()
  await knex.destroy()
}
