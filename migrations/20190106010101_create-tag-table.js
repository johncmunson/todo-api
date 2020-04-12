exports.up = knex => {
  return knex.schema.createTable('tag', table => {
    table.increments('id')
    table.string('name').notNullable().unique()
    table.timestamps(false, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable('tag')
}
