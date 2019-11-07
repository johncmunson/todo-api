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

router.patch('/:id', async (req, res) => {
  const todo = await req.context.models.Todo
    .query()
    .patchAndFetchById(req.params.id, req.body)
    .throwIfNotFound()
  res.status(200).json(todo)
})

// So far, we're not yet allowing PUT to handle upsert operations, only update.
// This is to avoid any unnecessary complexity, especially since PUT's are not
// a commonly used HTTP verb.
// NOTE: .updateAndFetchById() is not on it's own behaving like a RESTful PUT
// should. A PUT should entirely replace the existing resource. If there's an
// existing todo item with id = 4 and note = 'lorem ipsum', if I do a PUT to
// this resource with only the required properties (i.e. no note), then the note
// should now be set to null, but .updateAndFetchById() is allowing it to keep
// it's old value.
router.put('/:id', async (req, res) => {
  const todo = await req.context.models.Todo
    .query()
    .updateAndFetchById(req.params.id, req.body)
    .throwIfNotFound()
  res.status(200).json(todo)
})

module.exports = router
