exports.up = knex => {
  return knex.schema.createTable('todo', table => {
    table.increments('id')
    table.string('title').notNullable()
    table.boolean('complete').notNullable().defaultTo(false)
    table.boolean('archived').notNullable().defaultTo(false)
    table.text('note')
    table.datetime('due_date')
    table.enum('priority', ['low', 'medium', 'high'])
      .notNullable()
      .defaultTo('medium')
    table.timestamps(false, true)
    table.integer('category_id')
      .unsigned()
      .references('id')
      .inTable('category')
      .onDelete('SET NULL')
  })
}

exports.down = knex => {
  return knex.schema.dropTable('todo')
}
