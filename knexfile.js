// Initialize .env file here, in addition to index.js, so that it is picked up
// when running `npm run migrate` or `npm run seed`
require('dotenv').config()
const { knexSnakeCaseMappers } = require('objection')

const baseConfig = {
  client: 'sqlite3',
  migrations: {
    tableName: 'knex_migrations'
  },
  // See Footnote #1
  useNullAsDefault: false,
  pool: {
    afterCreate: (conn, cb) => {
      // See Footnote #2
      conn.run('PRAGMA foreign_keys = ON', cb)
    }
  },
  ...knexSnakeCaseMappers()
}

module.exports = {

  development: {
    ...baseConfig,
    connection: {
      filename: './dev-db.sqlite3'
    }
  },

  test: {
    ...baseConfig,
    connection: {
      filename: './test-db.sqlite3'
    }
  },

  staging: {
    ...baseConfig,
    connection: {
      filename: './staging-db.sqlite3'
    }
  },

  production: {
    ...baseConfig,
    connection: {
      filename: './prod-db.sqlite3'
    }
  }

}

/*
 * Footnote #1:
 *
 * In the example below, the `complete` column has a default value of `false`,
 * and the `title` column is required. When useNullAsDefault is set to false,
 * the example will fail. When set to true, knex will insert null for the second
 * todo item. Because SQLite allows columns to have default values, but it does
 * not support a DEFAULT keyword in queries, this means that it is not possible
 * to do a bulk insert where some rows explicity set a column value and other
 * rows rely on the default column value. See this question on stack overflow
 * for more details.
 * https://stackoverflow.com/questions/58695302/how-to-insert-rows-in-sqlite-using-default-values/58695642
 *
 * exports.seed = function(knex) {
 *  return knex('todo').insert([{
 *    title: 'Pickup dry cleaning',
 *    complete: true
 *  }, {
 *    title: 'Finish homework'
 *  }])
 * }
 *
 */

/*
 * Footnote #2:
 *
 * Foreign keys are turned off by default in SQLite. Alternatively, rather than
 * turning on FKs in the knexfile, you could do it right after instantiating
 * knex.
 *
 * const knex = Knex(knexConfig.development)
 * knex.client.pool.on('createSuccess', (eventId, resource) => {
 *   resource.run('PRAGMA foreign_keys = ON', () => {})
 * })
 * Model.knex(knex)
 *
 */
