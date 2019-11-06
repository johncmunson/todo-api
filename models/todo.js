const { Model } = require('objection')
const Base = require('./base')

class Todo extends Base {

  static get tableName() {
    return 'todo'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [ 'title', 'complete', 'archived', 'priority' ],
      properties: {
        title: { type: 'string' },
        complete: { type: 'boolean' },
        archived: { type: 'boolean' },
        note: { type: 'string' },
        due_date: { type: 'string' },
        priority: { type: 'string' },
        category_id: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/category`,
        join: {
          from: 'todo.category_id',
          to: 'category.id'
        }
      }
    }
  }

}

module.exports = Todo
