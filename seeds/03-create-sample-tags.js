exports.seed = knex => {
  return knex('tag').insert([
    { name: 'someday' },
    { name: 'eventually' },
    { name: 'never' }
  ])
}
