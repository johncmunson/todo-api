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

router.post('/', async (req, res) => {
  const todo = await req.context.models.Todo
    .query()
    .insert(req.body);
  res.status(200).json(todo)
})

module.exports = router
