exports.seed = knex => {
  return knex('todo_tag').insert([
    { todo_id: 1, tag_id: 1 },
    { todo_id: 2, tag_id: 2 },
    { todo_id: 3, tag_id: 3 }
  ])
}
