const { Category } = require('../../models')

describe('GET /categories', () => {
  it('returns a list of categories', async () => {
    const { body: categories } = await request(app).get('/categories')
    categories.forEach(category => {
      expect(() => Category.fromJson(category)).not.toThrow()
    })
  })
})

describe('POST /categories', () => {
  it('creates a new category', async () => {
    const category = { name: 'Goals' }
    const { body: newCategory, status: newCategoryStatus } =
      await request(app).post('/categories').send(category)
    const { body: fetchedCategory, status: fetchedCategoryStatus } =
      await request(app).get(`/categories/${newCategory.id}`)
    expect(newCategoryStatus).toEqual(201)
    expect(fetchedCategoryStatus).toEqual(200)
    expect(() => Category.fromJson(newCategory)).not.toThrow()
    expect(() => Category.fromJson(fetchedCategory)).not.toThrow()
    expect(newCategory).toEqual(fetchedCategory)
  })
  it('returns error when given invalid category', async () => {
    const { body: error, status } =
      await request(app).post('/categories').send({})
    expect(status).toEqual(400)
    expect(error.type).toEqual('ModelValidation')
  })
})

describe('DELETE /categories/:id', () => {
  it('deletes a category and sets categoryId to null on related todos', async () => {
    const category = { name: 'Aspirations' }
    const { body: newCategory, status: newCategoryStatus } =
      await request(app).post('/categories').send(category)
    const todo = { title: 'Run a marathon', categoryId: newCategory.id }
    const { body: todoWithCategory } =
      await request(app).post('/todos').send(todo)
    const { status: deletedStatus } =
      await request(app).delete(`/categories/${newCategory.id}`)
    const { body: todoWithoutCategory } =
      await request(app).get(`/todos/${todoWithCategory.id}`)
    expect(deletedStatus).toEqual(204)
    expect(todoWithCategory.categoryId).toEqual(newCategory.id)
    expect(todoWithoutCategory.categoryId).toEqual(null)
  })
  it('returns error when deleting a category that does not exist', async () => {
    const { body: error, status } =
      await request(app).delete('/categories/ry7634y8r374')
    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})

describe('PATCH /categories/:id', () => {
  const categoryNames = ['Someday', 'Never']
  let newCategory
  let newCategoryStatus
  beforeEach(async () => {
    if (categoryNames.length) {
      const { body, status } = await request(app)
        .post('/categories')
        .send({ name: categoryNames.shift() })
      newCategory = body
      newCategoryStatus = status
    }
  })
  it('edits a category', async () => {
    const { body: patchedCategory, status: patchedCategoryStatus } =
      await request(app)
        .patch(`/categories/${newCategory.id}`)
        .send({ name: 'Delegate' })
    expect(patchedCategoryStatus).toEqual(200)
    expect(patchedCategory.name).toEqual('Delegate')
    expect(patchedCategory.id).toEqual(newCategory.id)
    expect(() => Category.fromJson(patchedCategory)).not.toThrow()
  })
  it('returns error when given invalid category', async () => {
    const { body: error, status } =
      await request(app)
        .patch(`/categories/${newCategory.id}`)
        .send({ asdf: 'asdf' })
    expect(status).toEqual(500)
    expect(error.type).toEqual('UnknownDatabaseError')
  })
  it('returns error when editing a category that does not exist', async () => {
    const { body: error, status } =
      await request(app).patch('/categories/783y4f87y38sf').send({ name: 'Need Help' })
    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})

describe('PUT /categories/:id', () => {
  const categoryNames = ['Christmas', 'Thanksgiving']
  let newCategory
  let newCategoryStatus
  beforeEach(async () => {
    if (categoryNames.length) {
      const { body, status } = await request(app)
        .post('/categories')
        .send({ name: categoryNames.shift() })
      newCategory = body
      newCategoryStatus = status
    }
  })
  it('replaces a category', async () => {
    const { body: replacedCategory, status: replacedCategoryStatus } =
      await request(app)
        .put(`/categories/${newCategory.id}`)
        .send({ name: 'Easter' })
    expect(replacedCategoryStatus).toEqual(200)
    expect(replacedCategory.name).toEqual('Easter')
    expect(replacedCategory.id).toEqual(newCategory.id)
    expect(() => Category.fromJson(replacedCategory)).not.toThrow()
  })
  it('returns error when given invalid category', async () => {
    const { body: error, status } =
      await request(app)
        .put(`/categories/${newCategory.id}`)
        .send({ qwerty: 'qwerty' })
    expect(status).toEqual(400)
    expect(error.type).toEqual('ModelValidation')
  })
  it('returns error when replacing a category that does not exist', async () => {
    const { body: error, status } =
      await request(app)
        .put('/categories/s7d8h8wf87s')
        .send({ name: 'Halloween' })
    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})
