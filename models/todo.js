const { Model } = require('objection')
const Base = require('./base')

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
        title: { type: 'string' },
        complete: { type: 'boolean', default: false },
        archived: { type: 'boolean', default: false },
        note: { type: ['string', 'null'], default: null },
        due_date: { type: ['string', 'null'], default: null },
        priority: { type: 'string', default: 'medium' },
        category_id: { type: ['integer', 'null'], default: null }
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
