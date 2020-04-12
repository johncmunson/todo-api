const { Tag, Todo } = require('../../models')

describe('GET /tags', () => {
  it('returns a list of tags', async () => {
    const { body: tags } = await request(app).get('/tags')

    expect(tags.length).not.toEqual(0)
    tags.forEach(tag => {
      expect(() => Tag.fromJson(tag)).not.toThrow()
    })
  })

  it('returns a list of tags with relations', async () => {
    const { body: tags } = await request(app).get('/tags?relations=todos')

    expect(tags.length).not.toEqual(0)
    tags.forEach(tag => {
      expect(() => Tag.fromJson(tag)).not.toThrow()
      tag.todos.forEach(todo => {
        expect(() => Todo.fromJson(todo)).not.toThrow()
      })
    })
  })
})

describe('GET /tags/:id', () => {
  it('returns a tag', async () => {
    const { body: tag } = await request(app).get('/tags/1')

    expect(() => Tag.fromJson(tag)).not.toThrow()
  })

  it('returns a tag with relations', async () => {
    const { body: tag } = await request(app).get('/tags/1?relations=todos')

    expect(() => Tag.fromJson(tag)).not.toThrow()
    tag.todos.forEach(todo => {
      expect(() => Todo.fromJson(todo)).not.toThrow()
    })
  })
})

describe('POST /tags', () => {
  it('creates a new tag', async () => {
    const { body: newTag, status } =
      await request(app).post('/tags').send({ name: 'Red' })
    const { body: fetchedTag } =
      await request(app).get(`/tags/${newTag.id}`)

    expect(status).toEqual(201)
    expect(() => Tag.fromJson(newTag)).not.toThrow()
    expect(newTag).toEqual(fetchedTag)
  })

  it('returns error when given invalid tag', async () => {
    const { body: error, status } =
      await request(app).post('/tags').send({})

    expect(status).toEqual(400)
    expect(error.type).toEqual('ModelValidation')
  })
})

describe('DELETE /tags/:id', () => {
  xit('deletes a tag, and removes any todo/tag associations', async () => {
    // write this test after the ability to create todo/tag associations through
    // the api has been implemented
  })

  it('returns error when deleting a tag that does not exist', async () => {
    const { body: error, status } =
      await request(app).delete('/tags/ry7634y8r374')

    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})

describe('PATCH /tags/:id', () => {
  it('edits a tag', async () => {
    const { body: newTag } = await request(app)
      .post('/tags')
      .send({ name: 'Green' })

    const { body: patchedTag, status } =
      await request(app)
        .patch(`/tags/${newTag.id}`)
        .send({ name: 'Orange' })

    expect(status).toEqual(200)
    expect(patchedTag.name).toEqual('Orange')
    expect(patchedTag.id).toEqual(newTag.id)
    expect(() => Tag.fromJson(patchedTag)).not.toThrow()
  })

  it('returns error when given invalid tag', async () => {
    const { body: newTag } = await request(app)
      .post('/tags')
      .send({ name: 'Grey' })

    const { body: error, status } =
      await request(app)
        .patch(`/tags/${newTag.id}`)
        .send({ foo: 'bar' })

    expect(status).toEqual(500)
    expect(error.type).toEqual('UnknownDatabaseError')
  })

  it('returns error when editing a tag that does not exist', async () => {
    const { body: error, status } =
      await request(app).patch('/tags/783y4f87y38sf').send({ name: 'Cyan' })

    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})

describe('PUT /tags/:id', () => {
  it('replaces a tag', async () => {
    const { body: newTag } = await request(app)
      .post('/tags')
      .send({ name: 'Pink' })

    const { body: replacedTag, status } =
      await request(app)
        .put(`/tags/${newTag.id}`)
        .send({ name: 'Maroon' })

    expect(status).toEqual(200)
    expect(replacedTag.name).toEqual('Maroon')
    expect(replacedTag.id).toEqual(newTag.id)
    expect(() => Tag.fromJson(replacedTag)).not.toThrow()
  })

  it('returns error when given invalid tag', async () => {
    const { body: newTag } = await request(app)
      .post('/tags')
      .send({ name: 'Purple' })

    const { body: error, status } =
      await request(app)
        .put(`/tags/${newTag.id}`)
        .send({ foo: 'bar' })

    expect(status).toEqual(400)
    expect(error.type).toEqual('ModelValidation')
  })

  it('returns error when replacing a tag that does not exist', async () => {
    const { body: error, status } =
      await request(app)
        .put('/tags/s7d8h8wf87s')
        .send({ name: 'Magenta' })

    expect(status).toEqual(404)
    expect(error.type).toEqual('NotFound')
  })
})
