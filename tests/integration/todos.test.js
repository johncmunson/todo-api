const { Todo, Category, Tag } = require('../../models')

describe('GET /todos', () => {
  it('returns a list of todos', async () => {
    const { body: todos } = await request(app).get('/todos')

    expect(todos.length).not.toEqual(0)
    todos.forEach(todo => {
      expect(() => Todo.fromJson(todo)).not.toThrow()
    })
  })

  it('returns a list of todos with relations', async () => {
    const { body: todos } = await request(app).get('/todos?relations=category,tags')

    expect(todos.length).not.toEqual(0)
    todos.forEach(todo => {
      expect(() => Todo.fromJson(todo)).not.toThrow()
      if (todo.category) {
        expect(() => Category.fromJson(todo.category)).not.toThrow()
      }
      todo.tags.forEach(tag => {
        expect(() => Tag.fromJson(tag)).not.toThrow()
      })
    })
  })
})

describe('GET /todos/:id', () => {
  it('returns a todo', async () => {
    const { body: todo } = await request(app).get('/todos/1')

    expect(() => Todo.fromJson(todo)).not.toThrow()
  })

  it('returns a todo with relations', async () => {
    const { body: todo } = await request(app).get('/todos/1?relations=category,tags')

    expect(() => Todo.fromJson(todo)).not.toThrow()
    expect(() => Category.fromJson(todo.category)).not.toThrow()
    todo.tags.forEach(tag => {
      expect(() => Tag.fromJson(tag)).not.toThrow()
    })
  })
})

describe('POST /todos', () => {
  it('creates a new todo', async () => {
    const { body: newTodo, status } =
      await request(app).post('/todos').send({ title: 'Setup for the party' })
    const { body: fetchedTodo } =
      await request(app).get(`/todos/${newTodo.id}`)

    expect(status).toEqual(201)
    expect(() => Todo.fromJson(newTodo)).not.toThrow()
    expect(newTodo).toEqual(fetchedTodo)
  })

  it('returns error when given invalid todo', async () => {
    const { body: error, status } =
      await request(app).post('/todos').send({})

    expect(status).toEqual(400)
    expect(error.type).toEqual('ModelValidation')
  })
})

describe('DELETE /todos/:id', () => {
  it('deletes a todo', async () => {
    const { body: newTodo } =
      await request(app).post('/todos').send({ title: 'Return some videotapes' })

    const { status } =
      await request(app).delete(`/todos/${newTodo.id}`)

    expect(status).toEqual(204)
  })

  it('returns error when deleting a todo that does not exist', async () => {
    const { body: error, status } =
      await request(app).delete('/todos/ry7634y8r374')

    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})

describe('PATCH /todos/:id', () => {
  it('edits a todo', async () => {
    const { body: newTodo } = await request(app)
      .post('/todos')
      .send({ title: 'Lift some weights' })

    const { body: patchedTodo, status } =
      await request(app)
        .patch(`/todos/${newTodo.id}`)
        .send({ complete: true })

    expect(status).toEqual(200)
    expect(patchedTodo.complete).toEqual(true)
    expect(patchedTodo.id).toEqual(newTodo.id)
    expect(() => Todo.fromJson(patchedTodo)).not.toThrow()
  })

  it('returns error when given invalid todo', async () => {
    const { body: newTodo } = await request(app)
      .post('/todos')
      .send({ title: 'Buy some flowers' })

    const { body: error, status } =
      await request(app)
        .patch(`/todos/${newTodo.id}`)
        .send({ foo: 'bar' })

    expect(status).toEqual(500)
    expect(error.type).toEqual('UnknownDatabaseError')
  })

  it('returns error when editing a todo that does not exist', async () => {
    const { body: error, status } =
      await request(app).patch('/todos/783y4f87y38sf').send({ complete: true })

    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})

describe('PUT /todos/:id', () => {
  it('replaces a todo', async () => {
    const { body: newTodo } = await request(app)
      .post('/todos')
      .send({ title: 'Wash the car' })

    const { body: replacedTodo, status } =
      await request(app)
        .put(`/todos/${newTodo.id}`)
        .send({ title: 'Get an oil change' })

    expect(status).toEqual(200)
    expect(replacedTodo.title).toEqual('Get an oil change')
    expect(replacedTodo.id).toEqual(newTodo.id)
    expect(() => Todo.fromJson(replacedTodo)).not.toThrow()
  })

  it('returns error when given invalid todo', async () => {
    const { body: newTodo } = await request(app)
      .post('/todos')
      .send({ title: 'Read a book' })

    const { body: error, status } =
      await request(app)
        .put(`/todos/${newTodo.id}`)
        .send({ foo: 'bar' })

    expect(status).toEqual(400)
    expect(error.type).toEqual('ModelValidation')
  })

  it('returns error when replacing a todo that does not exist', async () => {
    const { body: error, status } =
      await request(app)
        .put('/todos/s7d8h8wf87s')
        .send({ title: 'Drink some water' })

    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})
