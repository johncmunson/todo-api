let axios = require('axios')
const getPort = require('get-port')
const { app } = require('../../index')
const { Todo } = require('../../models')

let server

beforeAll(async () => {
  const port = await getPort()
  axios = axios.create({ baseURL: `http://localhost:${port}` })
  server = app.listen(port)
})

afterAll(() => {
  server.close()
})

describe('GET /todos', () => {
  it('returns a list of todos', async () => {
    const { data: todos } = await axios.get('/todos')
    todos.forEach(todo => {
      expect(() => Todo.fromJson(todo)).not.toThrow()
    })
  })
})
