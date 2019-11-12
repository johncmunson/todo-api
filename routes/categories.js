const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  const categories = await req.context.models.Category.readAll()
  return res.status(200).json(categories)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const category = await req.context.models.Category.readById(id)
  return res.status(200).json(category)
})

router.post('/', async (req, res) => {
  const { body } = req
  const category = await req.context.models.Category.create(body)
  res.status(201).json(category)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await req.context.models.Category.delete(id)
  return res.status(204).json()
})

module.exports = router
