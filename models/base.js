const { Model } = require('objection')
const { DBErrors } = require ('objection-db-errors')
const { isNullOrUndefined } = require('../utils')

class Base extends DBErrors(Model) {

  static get modelPaths() {
    return [ __dirname ]
  }

  castValues(valuesDict, json) {
    Object.keys(valuesDict).forEach(key => {
      const type = valuesDict[key]
      if (!isNullOrUndefined(json[key])) {
        switch (type) {
          case 'boolean':
            json[key] = Boolean(json[key])
            break
          case 'integer':
            switch (typeof json[key]) {
              case 'boolean':
                json[key] = json[key] ? 1 : 0
                break
              case 'string':
                json[key] = parseInt(json[key])
              default:
            }
            break
          default:
        }
      }
    })
    return json
  }

  static formatRelations(relations) {
    return relations.reduce((obj, relation) => {
      obj[relation] = {}
      return obj
    }, {})
  }

  static removeRelationalIdsFromItem(item, relations) {
    relations.forEach(relation => {
      delete item[`${relation}Id`]
    })
    return item
  }

  static removeRelationalIdsFromItems(items, relations) {
    items.forEach(item => this.removeRelationalIdsFromItem(item, relations))
    return items
  }

  static create(data) {
    return this.query().insertAndFetch(data)
  }

  static readAll(options = {}) {
    const defaults = { relations: [] }
    options = { ...defaults, ...options }
    if (options.relations.length) {
      const relations = this.formatRelations(options.relations)
      return this.query()
        .withGraphFetched(relations)
        .then(items => this.removeRelationalIdsFromItems(items, options.relations))
    }
    return this.query()
  }

  static readById(id, options = {}) {
    const defaults = { relations: [] }
    options = { ...defaults, ...options }
    if (options.relations.length) {
      const relations = this.formatRelations(options.relations)
      return this.query()
        .findById(id)
        .throwIfNotFound()
        .withGraphFetched(relations)
        .then(item => this.removeRelationalIdsFromItem(item, options.relations))
    }
    return this.query().findById(id).throwIfNotFound()
  }

  static replace(id, data) {
    const newResource = this.fromJson(data)
    return this.query().updateAndFetchById(id, newResource).throwIfNotFound()
  }

  static edit(id, data) {
    return this.query().patchAndFetchById(id, data).throwIfNotFound()
  }

  static delete(id) {
    return this.query().findById(id).delete().throwIfNotFound()
  }

}

module.exports = Base
