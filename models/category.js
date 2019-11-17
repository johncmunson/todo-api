const { Model } = require('objection')
const Base = require('./base')

class Category extends Base {

  static get tableName() {
    return 'category'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [ 'name' ],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    return {
      todos: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/todo`,
        join: {
          from: 'category.id',
          to: 'todo.category_id'
        }
      }
    }
  }

}

module.exports = Category
