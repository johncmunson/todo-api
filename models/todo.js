const Base = require('./base')

class Todo extends Base {

  static get tableName() {
    return 'todo'
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
