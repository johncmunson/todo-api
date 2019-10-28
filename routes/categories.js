const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  const categories = await req.context.models.Category.findAll()
  return res.status(200).json(categories)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const category = await req.context.models.Category.findByPk(id)
  return res.status(200).json(category)
})

module.exports = router
