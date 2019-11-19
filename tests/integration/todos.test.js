const { Todo } = require('../../models')

describe('GET /todos', () => {
  it('returns a list of todos', async () => {
    const { body: todos } = await request(server).get('/todos')
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
      await request(server).post('/todos').send(todo)
    const { body: fetchedTodo, status: fetchedTodoStatus } =
      await request(server).get(`/todos/${newTodo.id}`)
    expect(newTodoStatus).toEqual(201)
    expect(fetchedTodoStatus).toEqual(200)
    expect(() => Todo.fromJson(newTodo)).not.toThrow()
    expect(() => Todo.fromJson(fetchedTodo)).not.toThrow()
    expect(newTodo).toEqual(fetchedTodo)
  })
  it('returns error when given invalid todo', async () => {
    const { body: error, status } =
      await request(server).post('/todos').send({})
    expect(status).toEqual(400)
    expect(error.type).toEqual('ModelValidation')
  })
})
