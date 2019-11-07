const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  const todos = await req.context.models.Todo.query()
  return res.status(200).json(todos)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const todo = await req.context.models.Todo
    .query()
    .findById(id)
    .throwIfNotFound()
  return res.status(200).json(todo)
})

// See this issue for why we're using .insertAndFetch rather than just .insert
// This makes two database calls, rather than one
// https://github.com/Vincit/objection.js/issues/1550
router.post('/', async (req, res) => {
  const todo = await req.context.models.Todo
    .query()
    .insertAndFetch(req.body)
  res.status(200).json(todo)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await req.context.models.Todo
    .query()
    .deleteById(id)
    .throwIfNotFound()
  return res.status(204).json()
})

module.exports = router
