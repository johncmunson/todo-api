exports.seed = knex => {
  return knex('todo').insert([
    {
      title: 'Pickup dry cleaning',
      complete: false,
      note: 'They close at 7pm',
      due_date: '2019-11-10 08:30:00',
      priority: 'low',
      category_id: 1
    },
    {
      title: 'Create meeting agenda',
      complete: false,
      note: 'See Jeff\'s email from 8/15',
      due_date: null,
      priority: 'medium',
      category_id: 2
    },
    {
      title: 'Finish math homework',
      complete: false,
      note: 'Only the even problems',
      due_date: '2019-12-15 10:15:00',
      priority: 'high',
      category_id: 3
    },
    {
      title: 'Buy groceries',
      complete: true,
      note: 'Eggs, jelly, and bread',
      due_date: null,
      priority: 'medium',
      category_id: 1
    },
    {
      title: 'Submit vacation days',
      complete: true,
      note: null,
      due_date: '2020-01-01 12:00:00',
      priority: 'low',
      category_id: 2
    },
    {
      title: 'Read Animal Farm chapter 3',
      complete: true,
      note: null,
      due_date: null,
      priority: 'medium',
      category_id: 3
    },
    {
      title: 'Return some videotapes',
      complete: false,
      note: null,
      due_date: null,
      priority: 'medium',
      category_id: null
    }
  ])
}
