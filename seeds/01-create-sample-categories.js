exports.seed = knex => {
  return knex('category').insert([
    { name: 'Home' },
    { name: 'Work' },
    { name: 'School' }
  ])
}
