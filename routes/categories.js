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
  return res.status(201).json(category)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await req.context.models.Category.delete(id)
  return res.status(204).json()
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const updatedCategory = await req.context.models.Category.edit(id, body)
  return res.status(200).json(updatedCategory)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const newCategory = await req.context.models.Category.replace(id, body)
  return res.status(200).json(newCategory)
})

module.exports = router
