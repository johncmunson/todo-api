const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  let tags
  if (req.query.relations) {
    const relations = req.query.relations.split(',')
    tags = await req.context.models.Tag.readAll({ relations })
  } else {
    tags = await req.context.models.Tag.readAll()
  }
  return res.status(200).json(tags)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  let tag
  if (req.query.relations) {
    const relations = req.query.relations.split(',')
    tag = await req.context.models.Tag.readById(id, { relations })
  } else {
    tag = await req.context.models.Tag.readById(id)
  }
  return res.status(200).json(tag)
})

router.post('/', async (req, res) => {
  const { body } = req
  const tag = await req.context.models.Tag.create(body)
  return res.status(201).json(tag)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await req.context.models.Tag.delete(id)
  return res.status(204).json()
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const updatedTag = await req.context.models.Tag.edit(id, body)
  return res.status(200).json(updatedTag)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req
  const newTag = await req.context.models.Tag.replace(id, body)
  return res.status(200).json(newTag)
})

module.exports = router
