const { Model } = require('objection')
const Base = require('./base')
const Category = require('./category')

class Todo extends Base {

  static get tableName() {
    return 'todo'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      // A property is required if it's absence would cause Model.$validate()
      // to fail. Note that this does not necessarily mean that the property is
      // required when instantiating a new model, as it could have a default
      // value. In other words, not nullable properties go here.
      required: [ 'title', 'complete', 'archived', 'priority' ],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        complete: { type: 'boolean', default: false },
        archived: { type: 'boolean', default: false },
        note: { type: [ 'string', 'null' ], default: null },
        dueDate: { type: [ 'string', 'null' ], default: null },
        priority: {
          type: 'string',
          enum: [ 'low', 'medium', 'high' ],
          default: 'medium'
        },
        categoryId: { type: [ 'integer', 'null' ], default: null }
        // Are relational data needed in the schema?
        // category, tags
      }
    }
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json)
    json = this.castValues({ complete: 'boolean', archived: 'boolean' }, json)
    return json
  }

  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json)
    // SQLite will convert booleans to an integer representation automatically,
    // but I like to be explicit about it.
    json = this.castValues({ complete: 'integer', archived: 'integer' }, json)
    return json
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'category',
        join: {
          from: 'todo.categoryId',
          to: 'category.id'
        }
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: 'tag',
        join: {
          from: 'todo.id',
          through: {
            from: 'todo_tag.todoId',
            to: 'todo_tag.tagId'
          },
          to: 'tag.id'
        }
      }
    }
  }

}

module.exports = Todo
