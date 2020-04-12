const { Model } = require('objection')
const Base = require('./base')

class Tag extends Base {

  static get tableName() {
    return 'tag'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'name' ],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' }
        // Are relational data needed in the schema?
        // todos
      }
    }
  }

  static get relationMappings() {
    return {
      todos: {
        relation: Model.ManyToManyRelation,
        modelClass: 'todo',
        join: {
          from: 'tag.id',
          through: {
            from: 'todo_tag.tagId',
            to: 'todo_tag.todoId'
          },
          to: 'todo.id'
        }
      }
    }
  }

}

module.exports = Tag
