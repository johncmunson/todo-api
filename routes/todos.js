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
    .insertAndFetch(req.body)
  res.status(201).json(todo)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await req.context.models.Todo
    .query()
    .findById(id) // alternatively, .where('id', id)
    .delete()
    .throwIfNotFound()
  return res.status(204).json()
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const updatedTodo = await req.context.models.Todo
    .query()
    .patchAndFetchById(id, req.body)
    .throwIfNotFound()
  res.status(200).json(updatedTodo)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const payload = req.context.models.Todo.fromJson(req.body)
  const newTodo = await req.context.models.Todo
    .query()
    .updateAndFetchById(id, payload)
    .throwIfNotFound()
  res.status(200).json(newTodo)
})

module.exports = router
