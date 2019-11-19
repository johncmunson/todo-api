const { Todo } = require('../../models')

describe('GET /todos', () => {
  it('returns a list of todos', async () => {
    const { body: todos } = await request(app).get('/todos')
    expect(todos.length).toEqual(7)
    todos.forEach(todo => {
      expect(() => Todo.fromJson(todo)).not.toThrow()
    })
  })
})

describe('POST /todos', () => {
  it('creates a new todo', async () => {
    const todo = { title: 'Setup for the party' }
    const { body: newTodo, status: newTodoStatus } =
      await request(app).post('/todos').send(todo)
    const { body: fetchedTodo, status: fetchedTodoStatus } =
      await request(app).get(`/todos/${newTodo.id}`)
    expect(newTodoStatus).toEqual(201)
    expect(fetchedTodoStatus).toEqual(200)
    expect(() => Todo.fromJson(newTodo)).not.toThrow()
    expect(() => Todo.fromJson(fetchedTodo)).not.toThrow()
    expect(newTodo).toEqual(fetchedTodo)
  })
  it('returns error when given invalid todo', async () => {
    const { body: error, status } =
      await request(app).post('/todos').send({})
    expect(status).toEqual(400)
    expect(error.type).toEqual('ModelValidation')
  })
})

describe('DELETE /todos/{id}', async () => {
  it('deletes a todo', async () => {
    const todo = { title: 'Return some videotapes' }
    const { body: newTodo, status: newTodoStatus } =
      await request(app).post('/todos').send(todo)
    const { status: deletedStatus } =
      await request(app).delete(`/todos/${newTodo.id}`)
    expect(deletedStatus).toEqual(204)
  })
  it('returns error when deleting a todo that does not exist', async () => {
    const { body: error, status } =
      await request(app).delete('/todos/ry7634y8r374')
    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})
