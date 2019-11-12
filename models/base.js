const { Model } = require('objection')
const { DBErrors } = require ('objection-db-errors')
const { isNullOrUndefined } = require('../utils')

class Base extends DBErrors(Model) {
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
  static create(data) {
    return this.query().insertAndFetch(data)
  }
  static readAll() {
    return this.query()
  }
  static readById(id) {
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
