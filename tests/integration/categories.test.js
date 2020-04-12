const { Category, Todo } = require('../../models')

describe('GET /categories', () => {
  it('returns a list of categories', async () => {
    const { body: categories } = await request(app).get('/categories')

    expect(categories.length).not.toEqual(0)
    categories.forEach(category => {
      expect(() => Category.fromJson(category)).not.toThrow()
    })
  })

  it('returns a list of categories with relations', async () => {
    const { body: categories } = await request(app).get('/categories?relations=todos')

    expect(categories.length).not.toEqual(0)
    categories.forEach(category => {
      expect(() => Category.fromJson(category)).not.toThrow()
      category.todos.forEach(todo => {
        expect(() => Todo.fromJson(todo)).not.toThrow()
      })
    })
  })
})

describe('GET /categories/:id', () => {
  it('returns a category', async () => {
    const { body: category } = await request(app).get('/categories/1')

    expect(() => Category.fromJson(category)).not.toThrow()
  })

  it('returns a category with relations', async () => {
    const { body: category } = await request(app).get('/categories/1?relations=todos')

    expect(() => Category.fromJson(category)).not.toThrow()
    category.todos.forEach(todo => {
      expect(() => Todo.fromJson(todo)).not.toThrow()
    })
  })
})

describe('POST /categories', () => {
  it('creates a new category', async () => {
    const { body: newCategory, status } =
      await request(app).post('/categories').send({ name: 'Goals' })
    const { body: fetchedCategory } =
      await request(app).get(`/categories/${newCategory.id}`)

    expect(status).toEqual(201)
    expect(() => Category.fromJson(newCategory)).not.toThrow()
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
  it('deletes a category, and sets categoryId to null on related todos', async () => {
    const { body: newCategory } =
      await request(app).post('/categories').send({ name: 'Aspirations' })
    const { body: todoWithCategory } =
      await request(app).post('/todos').send({ title: 'Run a marathon', categoryId: newCategory.id })

    const { status } =
      await request(app).delete(`/categories/${newCategory.id}`)
    const { body: todoWithoutCategory } =
      await request(app).get(`/todos/${todoWithCategory.id}`)

    expect(status).toEqual(204)
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
  it('edits a category', async () => {
    const { body: newCategory } = await request(app)
      .post('/categories')
      .send({ name: 'Someday' })

    const { body: patchedCategory, status } =
      await request(app)
        .patch(`/categories/${newCategory.id}`)
        .send({ name: 'Delegate' })

    expect(status).toEqual(200)
    expect(patchedCategory.name).toEqual('Delegate')
    expect(patchedCategory.id).toEqual(newCategory.id)
    expect(() => Category.fromJson(patchedCategory)).not.toThrow()
  })

  it('returns error when given invalid category', async () => {
    const { body: newCategory } = await request(app)
      .post('/categories')
      .send({ name: 'Never' })

    const { body: error, status } =
      await request(app)
        .patch(`/categories/${newCategory.id}`)
        .send({ foo: 'bar' })

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
  it('replaces a category', async () => {
    const { body: newCategory } = await request(app)
      .post('/categories')
      .send({ name: 'Christmas' })

    const { body: replacedCategory, status } =
      await request(app)
        .put(`/categories/${newCategory.id}`)
        .send({ name: 'Easter' })

    expect(status).toEqual(200)
    expect(replacedCategory.name).toEqual('Easter')
    expect(replacedCategory.id).toEqual(newCategory.id)
    expect(() => Category.fromJson(replacedCategory)).not.toThrow()
  })

  it('returns error when given invalid category', async () => {
    const { body: newCategory } = await request(app)
      .post('/categories')
      .send({ name: 'Thanksgiving' })

    const { body: error, status } =
      await request(app)
        .put(`/categories/${newCategory.id}`)
        .send({ foo: 'bar' })

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
