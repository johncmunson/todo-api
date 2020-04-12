exports.up = knex => {
  return knex.schema.createTable('todo_tag', table => {
    table.increments('id')
    table.timestamps(false, true)
    table.integer('todo_id')
      .unsigned()
      .references('id')
      .inTable('todo')
      .onDelete('CASCADE')
    table.integer('tag_id')
      .unsigned()
      .references('id')
      .inTable('tag')
      .onDelete('CASCADE')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('todo_tag')
}
