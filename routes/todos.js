const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  const todos = await req.context.models.Todo.findAll({
    include: [{
      model: req.context.models.Category
    }]
  })
  return res.status(200).json(todos)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const todo = await req.context.models.Todo.findByPk(id, {
    include: [{
      model: req.context.models.Category
    }]
  })
  return res.status(200).json(todo)
})

module.exports = router
