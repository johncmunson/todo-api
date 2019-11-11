const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  const todos = await req.context.models.Todo.readAll()
  return res.status(200).json(todos)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const todo = await req.context.models.Todo.readById(id)
  return res.status(200).json(todo)
})

router.post('/', async (req, res) => {
  const { body } = req
  const todo = await req.context.models.Todo.create(body)
  res.status(201).json(todo)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await req.context.models.Todo.delete(id)
  return res.status(204).json()
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const updatedTodo = await req.context.models.Todo.patch(id, body)
  res.status(200).json(updatedTodo)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const newTodo = await req.context.models.Todo.update(id, body)
  res.status(200).json(newTodo)
})

module.exports = router
